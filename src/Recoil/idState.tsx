import {atom} from 'recoil';

export interface IAuthTypes {
  email: string;
  password: string;
}

const authState = atom<IAuthTypes[]>({
  key: 'authState',
  default: [],
});

export default authState;
