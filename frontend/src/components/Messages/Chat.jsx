import { useEffect, useState } from "react";
import { getUserSession } from "../../functions/localStorage.js";
import Message from "./Message.jsx";
import styles from "./Chat.module.css";

const Chat = ({ socket }) => {
  const logedUser = getUserSession();
  const userProp = logedUser.username;
  const [messages, setMessages] = useState([]);
  const [textToSend, setTextToSend] = useState("");

  
  
  useEffect(() => {
    socket.on("connect", () => {
      setMessages((current) => [
        ...current,
        { user: "Bot", text: "Bienvenidx a la sala de chat 👋" },
      ]);
    });

    socket.on("msg", ({ user, text }) => {
      setMessages((current) => [...current, { user, text }]);
    });

    return () => {
      socket.off("msg");
    };
  }, []);

  const handleClick = () => {
    if (!userProp || !textToSend) return;
    socket.emit("msg", { user: userProp, text: textToSend });
  };

  return (
    <div className={styles.container}>
      <div>
        <ul>
          {messages.length > 0 &&
            messages.map((message) => (
              <li>
                <Message user={message.user} text={message.text} />
              </li>
            ))}
        </ul>
        <input
          placeholder="Tu mensaje"
          type="text"
          onChange={(e) => setTextToSend(e.target.value)}
        />
        <button onClick={handleClick}>Enviar mensaje</button>
      </div>
    </div>
  );
};

export default Chat;
