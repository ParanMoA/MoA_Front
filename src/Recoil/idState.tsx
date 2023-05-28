import {atom} from 'recoil';

export interface IAuthTypes {
  email: any;
  password: any;
}

const idState = atom<IAuthTypes[]>({
  key: 'idState',
  default: [],
});

export default idState;
