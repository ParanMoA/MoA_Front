import {atom} from 'recoil';

export interface ChatRoomTypes {
  chatRoomId: string;
}

const chatRoomState = atom<ChatRoomTypes>({
  key: 'chatRoomState',
  default: {chatRoomId: ''},
});

export default chatRoomState;
