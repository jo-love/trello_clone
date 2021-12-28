import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
  todo: string;
  index: number;
}
const DragabbleCard = ({ todo, index }: IDraggableCardProps) => {
  return (
    // beautifiul dnd에서는 key = draggableId(보통은 key를 인덱스로 두지만)
    <Draggable key={todo} draggableId={todo} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {todo}
        </Card>
      )} 
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
