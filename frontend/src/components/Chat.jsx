/* eslint-disable react/prop-types */

import { useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import { useSelector } from 'react-redux';



const Chat = ({ messages, setMessages, isOpen, setIsOpne, handleChatbotClick }) => {
  const [isTyping, setIsTyping] = useState(false)
  const allProducts = useSelector(state => state.allProducts.products)
  const allProductImages = useSelector(state => state.allProducts.imageArray)
  console.log(allProducts);
  console.log(allProductImages);

  const handleSendMessage = (text, sender) => {
    const newMessage = { text, sender };
    setMessages([...messages, newMessage]);
    handleResponse(newMessage);
  };

  function haveCommonWords(str1, str2) {
    // Split the strings into words
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);

    // Create a set for words in the first string

    console.log(words2);
   

    // Check if any word from the second string exists in the set
    for (const word2 of words2) {
      for (const word1 of words1) {
        if (word1.includes(word2)) {
          return true
        }
      }
    }

    // No common words found
    return false;
  }

  const handleResponse = (message) => {
    let productDetails = {};
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      if (message.sender === 'user1') {
        const textLower = message.text.toLowerCase();
        console.log(textLower);

        for (let [index, ele] of allProducts.entries()) {
          console.log(index);
          if (haveCommonWords(textLower, ele.productName)) {
            console.log(ele);
            productDetails = ele;
            break;
          }
        }
        if (productDetails._id) {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              text: `Checkout this ${productDetails.productName}, There may be some mismatch between what you want to see and what you are seeing, so please consider this.`,
              img: productDetails.img,
              sender: 'user2',
              rootId: productDetails._id
            },
          ])

        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Sorry we cannot give you an exact response for this. For more information, visit qshop', sender: 'user2' }
          ]);
        }
      }
    }, 1000); // simulate delay
  };






  return (
    messages &&
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <Message isOpen={isOpen} setIsOpne={setIsOpne} handleChatbotClick={handleChatbotClick} key={index} text={msg.text} sender={msg.sender} image={msg.img} rootId={msg.rootId} />
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <img src="../../public/loadingChat.gif" alt="User2 is typing..." /> {/* replace with actual typing indicator GIF URL */}
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>

  );
};

export default Chat;
