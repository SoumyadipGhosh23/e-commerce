/* eslint-disable react/prop-types */
// ChatbotPopUp.js
import { useSelector } from "react-redux";
import "./ChatbotPopUp.css";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import authService from "../appwrite/auth";








const ChatbotPopUp = ({handleChatbotClick}) => {
    const visible = useSelector((state) => state.chatbotslice.visible);
    const [messages, setMessages] = useState([
        { text: 'Welcome user', sender: 'user2' }
    ]);
    const [userName, setUserName] = useState("")
    const getFirstName = (fullName) => {
        // Assuming names are separated by a space
        const names = fullName.split(' ');

        // Extract the first name
        const firstName = names.length > 0 ? names[0] : '';

        return firstName;
    };
    const fetchData = async () => {
        try {
            const userData = await authService.getCurrentUser();

            if (userData) {
                const firstName = getFirstName(userData.name);
               
                setUserName(firstName);
            } else {
                setUserName("User");
            }
        } catch (error) {
            console.error("Fetching data failed:", error);
        }
    };


    useEffect(() => {
        setMessages([
            { text: `Welcome ${userName}`, sender: 'user2' }
        ])
    }, [visible, userName])

    useEffect(() => {
        fetchData()
    }, [])




    return (
        userName &&
        <div className={`chatbot-popup ${visible ? "chatbot-popup-show" : ""}`}>
            <div className="chatbot-popup-inner" >
               <Chat messages={messages} setMessages={setMessages} handleChatbotClick={handleChatbotClick}/>
            </div>
        </div>

    );
};

export default ChatbotPopUp;