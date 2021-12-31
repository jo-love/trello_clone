import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { opentrash, bin } from '../img';

const TrashCanWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 50%;
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
const Area = styled.div`
  width: 50px;
  height: 100px;
`;
const TrashCan = () => {
  return (
    <TrashCanWrapper>
      <Droppable droppableId="trashBoard" type="board">
        {(provided) => (
          <Area ref={provided.innerRef} {...provided.droppableProps}>
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      <span>
        <img alt="" src={bin} width={35} height={35} />
        <img alt="" src={opentrash} width={40} height={40} />
      </span>
      <Droppable droppableId="trashCard" type="card">
        {(p) => (
          <Area ref={p.innerRef} {...p.droppableProps}>
            {p.placeholder}
          </Area>
        )}
      </Droppable>
    </TrashCanWrapper>
  );
};

export default TrashCan;
