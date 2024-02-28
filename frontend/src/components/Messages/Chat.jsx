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
    socket.on("connect", () => {
      console.log("Socket connected successfully");
      setMessages((current) => [
        ...current,
        { user: "Bot", text: "Bienvenidx a la sala de chat 👋" },
      ]);
    });

    socket.on("chat", ({ user, text }) => {
      console.log("Received from back:", { user, text });
      setMessages((current) => [...current, { user, text }]);
    });
  }, []);

  const handleClick = () => {
    if (!userProp || !messageToSend) return;
    console.log("Sending to back:", {
      user: userProp,
      text: messageToSend,
      room: chatId,
    });
    socket.emit("reply", {
      user: userProp,
      text: messageToSend,
      room: chatId,
    });
    setMessageToSend("");
  };

  return (
    <div className={styles.container}>
      <div>
        <ul>
          {messages.length > 0 &&
            messages.map((message, index) => (
              <li key={index}>
                <Message user={message.user} text={message.text} />
              </li>
            ))}
        </ul>
        <input
          placeholder="Tu mensaje"
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
        />
        <button onClick={handleClick}>Send message</button>
      </div>
    </div>
  );
};

export { Chat, socket };
