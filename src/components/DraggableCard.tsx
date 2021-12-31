import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  font-weight: 400;
  font-size: 14px;
  background-color: ${(props) =>
    props.isDragging ? '#e4f2ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none'};
  :hover {
    background-color: #e4f2ff;
  }
`;

interface IDraggableCardProps {
  cardId: number;
  cardText: string;
  index: number;
}
const DragabbleCard = ({ cardId, cardText, index }: IDraggableCardProps) => {
  return (
    // beautifiul dnd에서는 key = draggableId(보통은 key를 인덱스로 두지만)
    <Draggable key={cardId} draggableId={cardId + ''} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {cardText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
