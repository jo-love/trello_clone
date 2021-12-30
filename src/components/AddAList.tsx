import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { boardState } from '../atoms';

const Wrapper = styled.div`
  background-color: #ffffff3d;
  border-radius: 5px;
  color: white;
  font-weight: 400;
  width: 250px;
  height: 120px;
  padding-left: 10px;

  h2 {
    padding: 10px 0;
  }

  input {
    width: 90%;
    height: 30px;
    margin: 0 auto;
    border-radius: 5px;
    border: none;
  }
`;
export const Button = styled.button`
  margin: 10px 0;
  border: none;
  background-color: #0079bf;
  border-radius: 5px;
  height: 30px;
  width: 70px;
  color: white;
  cursor: pointer;
`;
interface IForm {
  boardName: string;
}
const AddAList = () => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [board, setBoards] = useRecoilState(boardState);

  const onSubmit = ({ boardName }: IForm) => {
    setBoards((prev) => {
      return { ...prev, [boardName]: [] };
    });
    setValue('boardName', '');
  };
  return (
    <Wrapper>
      <h2>
        {Object.keys(board).length !== 0 ? 'Add another list' : 'Add a list'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('boardName', { required: true })}
          type="text"
          placeholder="Enter list title..."
          autoComplete="off"
        />
        <Button>Add list</Button>
      </form>
    </Wrapper>
  );
};

export default AddAList;
