export type RootStackParamList = {
  Auth: undefined;
  BottomTab: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  LoginHomeScreen: undefined;
  ChatRoomScreen: undefined;
  ChatScreen: undefined;
};

export type TabParamList = {
  ChatTab: undefined;
  HomeTab: undefined;
  MyTab: undefined;
};

export type MainParamList = {
  IngredientScreen: undefined;
  HomeScreen: undefined;
  RecruitScreen: undefined;
  MyPageScreen: undefined;
};

export type ChatParamList = {
  ChatRoomScreen: undefined;
  ChatScreen: {chatRoomId: string};
};

export type TopTabParamList = {
  ListViewTab: undefined;
  MyRecruitTab: undefined;
};