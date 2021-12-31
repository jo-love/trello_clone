import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardState, IBoardState } from './atoms';
import AddAList from './components/AddAList';
import Board from './components/Board';
import TrashCan from './components/TrashCan';

const Container = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 160px;
  gap: 10px;
`;
const Boards = styled.main`
  display: flex;
  gap: 10px;
`;

function App() {
  const [boards, setBoards] = useRecoilState(boardState);
  useEffect(() => {
    localStorage.setItem('BOARD', JSON.stringify(boards));
  }, [boards]);

  // drag 끝나면 실행되는 함수
  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log(result, 'result');
    if (!destination) return;
    if (destination.droppableId === 'trashBoard') {
      setBoards((prev) => {
        const newBoard = { ...prev };
        delete newBoard[result.draggableId];
        return newBoard;
      });
      return;
    }
    if (destination.droppableId === 'trashCard') {
      setBoards((prev) => {
        const newBoard = [...prev[source.droppableId]];
        newBoard.splice(source.index, 1);
        return { ...prev, [source.droppableId]: newBoard };
      });
    }
    if (type === 'board') {
      setBoards((prev) => {
        const keyArr = [...Object.keys(prev)];
        keyArr.splice(source.index, 1);
        keyArr.splice(destination.index, 0, Object.keys(prev)[source.index]);
        const newObj: IBoardState = {};
        keyArr.forEach((title) => {
          newObj[title] = prev[title];
        });
        return newObj;
      });
    }
    if (type === 'card' && destination.droppableId !== 'trashCard') {
      if (destination?.droppableId === source.droppableId) {
        setBoards((prev) => {
          const boardCopy = [...prev[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination.index, 0, taskObj);
          return { ...prev, [source.droppableId]: boardCopy };
        });
        // 다른 보드로 카드를 옮길 때
      } else {
        setBoards((prev) => {
          const sourceBoard = [...prev[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...prev[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, taskObj);
          return {
            ...prev,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columm" direction="horizontal" type="board">
          {(provided) => (
            <Boards {...provided.droppableProps} ref={provided.innerRef}>
              {Object.keys(boards).map((board, index) => (
                <Board
                  key={board}
                  boardId={board}
                  cards={boards[board]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
      </DragDropContext>
      <AddAList />
    </Container>
  );
}

export default App;
