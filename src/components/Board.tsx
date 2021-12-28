import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;

  h2 {
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

interface IBoardProps {
  todos: string[];
  boardId: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
  return (
    <Wrapper>
      <h2>{boardId}</h2>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              // beautifiul dnd에서는 key = draggableId(보통은 key를 인덱스로 두지만)
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {/* 보드가 밖에 나가도 원사이즈 일정하게 유지 */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
