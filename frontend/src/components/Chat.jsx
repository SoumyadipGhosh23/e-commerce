/* eslint-disable react/prop-types */

import { useState } from 'react';
import { pants, shirt, skirts } from '../util/imageURL';
import ChatInput from './ChatInput';
import Message from './Message';



const Chat = ({ messages, setMessages, isOpen, setIsOpne, handleChatbotClick }) => {
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (text, sender) => {
    const newMessage = { text, sender };
    setMessages([...messages, newMessage]);
    handleResponse(newMessage);
  };

  const handleResponse = (message) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (message.sender === 'user1') {
        const textLower = message.text.toLowerCase();

        if (textLower.includes('shirt')) {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              text: 'Check out this shirt!',
              image: shirt, // replace with actual URL
              link: {
                _id: 'shirt',
                img:
                  'https://cloud.appwrite.io/v1/storage/buckets/65d3672d7f1a65bb7265/files/6655a080be883d8ba608/preview?project=65804aa9a44bb3ce522f',
                productName: 'Shirt',
                price: '399',
                color: 'Black',
                badge: true,
                des: 'Men Regular Fit Checkered Spread Collar Casual Shirt'

              }, // replace with actual link
              sender: 'user2',
              rootId: 'shirt'
            }
          ]);
        } else if (textLower.includes('jeans') || textLower.includes('pant')) {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              text: 'Check out these pants!',
              image: pants, // replace with actual URL
              link: {
                _id: 'dark-blue-high-rise-skinny-jeans',
                img: 
                  'https://cloud.appwrite.io/v1/storage/buckets/65d3672d7f1a65bb7265/files/665622fc2d5da61dd90c/preview?project=65804aa9a44bb3ce522f',
                productName: 'DARK BLUE HIGH RISE SKINNY JEANS',
                price: '900',
                color: 'Blue',
                badge: true,
                des: 'MATERIALS, FABRIC & ORIGIN'
              }, // replace with actual link
              sender: 'user2',
              rootId: 'darkbluehighriseskinnyjeans'
            }
          ]);
        } else if (textLower.includes('skirt')) {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              text: 'Check out these skirts!',
              image: skirts, // replace with actual URL
              link: {

                _id: 'skirt',
                img:
                  'https://cloud.appwrite.io/v1/storage/buckets/65d3672d7f1a65bb7265/files/6655a3c551037d28c6b2/preview?project=65804aa9a44bb3ce522f',
                productName: 'Skirt',
                price: '700',
                color: 'Black',
                badge: true,
                des:
                  'KLART Checkered Skirt | Skirt for Women | Pleated Skirt | Tennis Skirt | Mini Skirt | Girls Skirts | Midi Skirt | Short Skirt \n' +
                  ''

              }, // replace with actual link
              sender: 'user2',
              rootId: 'skirt'
            }
          ]);
        } else if (textLower.includes('hi') || textLower.includes('hello')) {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Hello!', sender: 'user2' }
          ]);
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
          <Message isOpen={isOpen} setIsOpne={setIsOpne} handleChatbotClick={handleChatbotClick} key={index} text={msg.text} sender={msg.sender} image={msg.image} link={msg.link} rootId={msg.rootId} />
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
