// Chatbot.js
import { useDispatch, useSelector } from "react-redux";
import { hideChatbot, showChatbot } from "../redux/chatbotslice";

import { useState } from "react";
import ChatbotPopUp from "./ChatbotPopUp";





const Chatbot = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.chatbotslice.visible)
  console.log(currentState);



  const [isOpen, setIsOpen] = useState(false);

  const handleChatbotClick = () => {
    if (!isOpen) {
      dispatch(showChatbot());
    } else {
      dispatch(hideChatbot());
    }
    setIsOpen(!isOpen);
  };

  return (
    <>

      
      <div
        className=" flex  fixed bottom-12 right-4 text-white p-3 rounded-full cursor-pointer items-center justify-center" style={{ width: "5rem", height: "5rem", fontSize: "2rem", backgroundColor: "#43b9e8" }}
        onClick={handleChatbotClick}
      >
        🤖
      </div>
      {isOpen && <ChatbotPopUp isOpen={isOpen} setIsOpen={setIsOpen} handleChatbotClick={handleChatbotClick}/>}
    </>
  );
};

export default Chatbot;