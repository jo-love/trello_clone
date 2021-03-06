import { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ICard, boardState } from '../atoms';
import DraggableCard from './DraggableCard';
import { Button } from './AddAList';
import { close } from '../img';
import React from 'react';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 120px;

  h2 {
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 15px;
  }
`;
const AddBtn = styled.button`
  margin-top: 8px;
  text-align: left;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  line-height: 2;
  height: 30px;
  font-weight: 500;
  font-size: 14px;
  color: grey;
  :hover {
    background-color: rgba(9, 30, 66, 0.08);
    cursor: pointer;
  }
`;
const Form = styled.form`
  width: 100%;
  textarea {
    resize: none;
    outline: none;
    overflow-wrap: break-word;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px,
      rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  }
`;
const Area = styled.div<IAreaProps>`
  margin-top: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#FFEBE6'
      : props.draggingFromThisWith
      ? '#E6FCFF'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;
const ItemContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  img {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

interface IForm {
  toDo: string;
}
interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
interface IBoardProps {
  cards: ICard[];
  boardId: string;
  index: number;
}

const Board = ({ cards, boardId, index }: IBoardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(boardState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = { id: Date.now(), text: toDo };
    setToDos((allBoards) => {
      return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
    });
    setValue('toDo', '');
  };
  //keyDown -> keyPress(????????? ???????????? ?????? ????????? ?????? ????????? ????????? ??????)
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onValid)();
    }
  };
  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <div>
      <Draggable draggableId={boardId} index={index}>
        {(provided) => (
          <Wrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h2>{boardId}</h2>
            <Droppable droppableId={boardId} type="card">
              {(provided, snapshot) => (
                <Area
                  isDraggingOver={snapshot.isDraggingOver}
                  draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cards.map((card, index) => (
                    // beautifiul-dnd????????? key = draggableId(?????? ???????????? key??? ?????????)
                    <DraggableCard
                      key={card.id}
                      cardId={card.id}
                      cardText={card.text}
                      index={index}
                    />
                  ))}
                  {/* ????????? ?????? ????????? ???????????? ???????????? ?????? */}
                  {provided.placeholder}
                </Area>
              )}
            </Droppable>
            {isClicked ? (
              <Form onSubmit={handleSubmit(onValid)}>
                <textarea
                  onKeyPress={handleKeyPress}
                  {...register('toDo', { required: true })}
                  placeholder={`Add task on ${boardId}...`}
                />
                <ItemContainer>
                  <Button type="submit">Add card</Button>
                  <img
                    alt="close"
                    src={close}
                    onClick={() => setIsClicked(false)}
                  />
                </ItemContainer>
              </Form>
            ) : (
              <AddBtn onClick={handleClick}>+ Add a card</AddBtn>
            )}
          </Wrapper>
        )}
      </Draggable>
    </div>
  );
};

export default React.memo(Board);
