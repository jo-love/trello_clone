import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);

  // drag 끝나면 실행되는 함수
  const onDragEnd = (info: DropResult) => {
    console.log(info);

    const { destination, draggableId, source } = info;
    if (destination?.droppableId === source.droppableId) {
      setTodos((prev) => {
        console.log(prev, 'prev');
        const boardCopy = [...prev[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {...prev,[source.droppableId]:boardCopy};
      });
    }

    // if (!destination) return;
    // setTodos((prev) => {
    //   const copyTodos = [...prev];
    //   copyTodos.splice(source.index, 1);
    //   copyTodos.splice(destination?.index, 0, draggableId);
    //   return copyTodos;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((category) => (
            <Board key={category} boardId={category} todos={todos[category]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
