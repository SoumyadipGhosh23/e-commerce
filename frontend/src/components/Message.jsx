/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";


const Message = ({handleChatbotClick,text, sender, image, link, rootId }) => {
  const navigate = useNavigate();
  const redirectToProduct = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: link,
      },
    });
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