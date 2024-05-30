// chatbotSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    visible: false,
  },
  reducers: {
    showChatbot: (state) => {
      state.visible = true;
    },
    hideChatbot: (state) => {
      state.visible = false;
    },
  },
});

export const { showChatbot, hideChatbot } = chatbotSlice.actions;

export default chatbotSlice.reducer;