import { atom } from 'recoil';

export interface ICard {
  id: number;
  text: string;
}

interface IBoardState {
  [key: string]: ICard[];
}
const loadItem = () => {
  return JSON.parse(localStorage.getItem('BOARD') as string);
};
export const boardState = atom<IBoardState>({
  key: 'Board',
  default: loadItem(),
});
