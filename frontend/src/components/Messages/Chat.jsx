import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserSession } from "../../functions/localStorage.js";
import Message from "./Message.jsx";
import styles from "./Chat.module.css";
import io from "socket.io-client";
import { getUserToken } from "../../functions/localStorage.js";
import { messageApi } from "../../functions/apiWrapper.js";
import { formatDate } from "../../functions/dateFormat.js";
import { ArrowLeft } from "lucide-react";

const socket = io("http://localhost:3001", {
  reconnection: false,
  auth: {
    token: getUserToken(),
  },
});

const Chat = ({}) => {
  const logedUser = getUserSession();
  const userProp = logedUser.username;
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const { chatId: chatId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messageApi().get(`/${chatId}`);
        const data = await response.data.map((message) => formatDate(message));
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    socket.on("chat", async ({ username, text, createdAt }) => {
      const formattedMessage = formatDate({ username, text, createdAt });
      setMessages((current) => [...current, formattedMessage]);
    });

    fetchMessages();
  }, [chatId]);

  const handleClick = async () => {
    if (!userProp || !messageToSend) return;
    try {
      const data = {
        user: logedUser.id,
        username: userProp,
        text: messageToSend,
        chat: parseInt(chatId),
      };
      socket.emit("chat", data);
      setMessages((current) => [...current, data]);
      setMessageToSend("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <>
      <div className={styles.backContainer}>
        <ArrowLeft absoluteStrokeWidth />
        <p onClick={() => navigate("/home")} className={styles.backText}>
          Back
        </p>
      </div>
      <div className={styles.chatContainer}>
        <ul>
          {messages.length > 0 &&
            messages.map((message, index) => (
              <li key={index}>
                <Message
                  user={message.username}
                  text={message.text}
                  date={message.createdAt}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.sendMessageContainer}>
        <input
          placeholder="Write your message"
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          className={styles.messageInput}
        />
        <button onClick={handleClick} className={styles.sendButton}>
          Send message
        </button>
      </div>
    </>
  );
};

export { Chat, socket };
