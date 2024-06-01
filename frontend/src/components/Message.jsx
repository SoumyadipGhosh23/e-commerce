/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";


const Message = ({handleChatbotClick,text, sender, image, rootId }) => {
  console.log(image);
  const navigate = useNavigate();
  const redirectToProduct = () => {
    navigate(`/product/${rootId}`);
    handleChatbotClick()
  }
  return (
    <div className={`message ${sender}`}>
      <div className="message-text">
        {text}
        {image && (
          <div className="message-image" style={{ cursor: "pointer" }}>

            <img src={image} alt={text} onClick={redirectToProduct} />

          </div>
        )}
      </div>
    </div>
  );
};

export default Message;