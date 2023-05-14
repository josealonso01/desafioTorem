import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ChatsState, ChatTabProps } from '../types/chat';
import { Messages } from '../types/types';

const initialState: ChatsState = {
  chats: [],
  isAllowedExpand: true
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsData: (state, action: PayloadAction<Array<ChatTabProps>>) => {
      state.chats = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ chatId: string; message: Messages }>) => {
      const { chatId, message } = action.payload;
      const chatIndex = state.chats.findIndex((chat) => chat.chatId === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].messages.push(message);
      }
    }
  }
});

export const { setChatsData, setIsAllowedExpand, addMessage } = chatsSlice.actions;

export const getChats = (state: RootState) => state.chats;
export const getIsAllowedExpand = (state: RootState) => state.chats.isAllowedExpand;

export default chatsSlice.reducer;
