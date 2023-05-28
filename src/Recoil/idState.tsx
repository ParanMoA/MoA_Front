import {atom} from 'recoil';

export interface IAuthTypes {
  email: string;
  password: string;
}

const AuthState = atom <IAuthTypes[]>({
  key: 'AuthState',
  default: [],
});

export default AuthState;
