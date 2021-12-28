import { atom } from 'recoil';

interface ITodoState {
  [key: string]: string[];
}
export const todoState = atom<ITodoState>({
  key: 'todo',
  default: {
    To_do: ['공부하기', '강아지 산책'],
    Doing: ['레포트쓰기'],
    Done: ['밥먹기', '샤워하기'],
  },
}); 
