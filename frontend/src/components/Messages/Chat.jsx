import { useEffect, useState } from "react";
import { getUserSession } from "../../functions/localStorage.js";
import Message from "./Message.jsx";
import styles from "./Chat.module.css";
import io from "socket.io-client";

const socket = io("ws://localhost:3001");

const Chat = ({}) => {
  const logedUser = getUserSession();
  const userProp = logedUser.username;
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    socket.on("msg", ({ user, message }) => {
      setMessages((current) => [...current, { user, message }]);
    });

    return () => {
      socket.off("msg");
    };
  }, []);

  const handleClick = () => {
    if (!userProp || !messageToSend) return;
    socket.emit("msg", { user: userProp, message: messageToSend });
    console.log(socket);
    setMessageToSend("");
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
