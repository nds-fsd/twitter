import { useEffect, useState } from "react";
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

  useEffect(() => {
    socket.on("connection", () => {
      setMessages((current) => [
        ...current,
        { user: "Bot", message: "Bienvenidx a la sala de chat 👋" },
      ]);
    });

    socket.on("chat", ({ user, message }) => {
      setMessages((current) => [...current, { user, message }]);
    });

    return () => {
      socket.off("chat");
    };
  }, []);

  const handleClick = () => {
    if (!userProp || !messageToSend) return;
    socket.emit("chat", { user: userProp, message: messageToSend });
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
