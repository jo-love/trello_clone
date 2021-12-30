import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardState } from './atoms';
import AddAList from './components/AddAList';
import Board from './components/Board';

import { opentrash, bin } from './img';

const Container = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 130px;
  gap: 10px;
`;
const Boards = styled.main`
  display: flex;
  gap: 10px;
`;
const TrashBag = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  div {
    width: 50px;
    height: 50px;
  }

  span {
    position: absolute;
    top: 0;
  }
  span img:last-child {
    display: none;
  }
  span:hover {
    img:first-child {
      display: none;
    }
    img:last-child {
      display: inline-block;
    }
  }
`;
function App() {
  const [boards, setBoards] = useRecoilState(boardState);

  useEffect(() => {
    localStorage.setItem('BOARD', JSON.stringify(boards));
  }, [boards]);

  // drag 끝나면 실행되는 함수
  const onDragEnd = (data: DropResult) => {
    const { destination, source } = data;
    // console.log(data, 'data');
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setBoards((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return { ...prev, [source.droppableId]: boardCopy };
      });
    } else {
      if (destination.droppableId === 'trash_board') {
        setBoards((prev) => {
          const sourceBoard = [...prev[source.droppableId]];
          console.log(sourceBoard, 'boa');
          sourceBoard.splice(source.index, 1);
          return { ...prev, [source.droppableId]: sourceBoard };
        });
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
        <Boards>
          {Object.keys(boards).map((category, index) => (
            <Board key={index} boardId={category} todos={boards[category]} />
          ))}
        </Boards>
        <TrashBag>
          <Droppable droppableId="trash_board">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <span>
            <img alt="" src={bin} width={35} height={35} />
            <img alt="" src={opentrash} width={40} height={40} />
          </span>
        </TrashBag>
      </DragDropContext>
      <AddAList />
    </Container>
  );
}

export default App;
