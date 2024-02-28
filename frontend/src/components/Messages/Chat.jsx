import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserSession } from "../../functions/localStorage.js";
import Message from "./Message.jsx";
import styles from "./Chat.module.css";
import io from "socket.io-client";
import { getUserToken } from "../../functions/localStorage.js";

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

  useEffect(() => {
    socket.on("reply", ({ message }) => {
      setMessages((current) => [...current, { message }]);
    });

    return () => {
      socket.off("reply");
    };
  }, []);

  const handleClick = () => {
    if (!userProp || !messageToSend) return;
    socket.emit("chat", {
      // user: userProp,
      message: messageToSend,
      room: chatId,
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <ul>
          {messages.length > 0 &&
            messages.map((message) => (
              <li>
                <Message user={message.user} text={message.message} />
              </li>
            ))}
        </ul>
        <input
          placeholder="Tu mensaje"
          type="text"
          onChange={(e) => setMessageToSend(e.target.value)}
        />
        <button onClick={handleClick}>Send message</button>
      </div>
    </div>
  );
};

export { Chat, socket };
