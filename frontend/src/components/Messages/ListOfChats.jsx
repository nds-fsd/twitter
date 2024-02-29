import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "../../functions/localStorage.js";
import { chatApi, userApi } from "../../functions/apiWrapper.js";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import { socket } from "./Chat.jsx";
import styles from "./ListOfChats.module.css";

const ListOfChats = () => {
  const logedUser = getUserSession();
  const navigate = useNavigate();
  const [username, setUsername] = useState({});
  const [chat, setChat] = useState([]);
  const photoStyle = "meow";

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await chatApi().get(`/user/${logedUser.id}`);
        const chats = response.data;
        setChat(chats);
        const usernamesObj = {};
        for (const chat of chats) {
          const user1Name = await getUserName(chat.user1);
          const user2Name = await getUserName(chat.user2);
          usernamesObj[chat.id] =
            logedUser.id === chat.user1 ? user2Name : user1Name;
        }
        setUsername(usernamesObj);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [logedUser.id]);

  const getUserName = async (userId) => {
    const userResponse = await userApi().get(`/id/${userId}`);
    return userResponse.data.username;
  };

  const joinChatRoom = (chatId) => {
    socket.emit("joinRoom", chatId.toString());
    navigate(`/messages/${logedUser.username}/chat/${chatId}`);
  };

  return (
    <div>
      <div className={styles.tittleContainer}>
        <h2 className={styles.tittle}>Chats</h2>
      </div>

      <div className={styles.chatsContainer}>
        {chat.map((chat) => (
          <div
            key={chat.id}
            onClick={() => joinChatRoom(chat.id)}
            className={styles.chatList}
          >
            <PhotoUserProfile
              usernamePhoto={username[chat.id]}
              photoStyle={photoStyle}
            />
            <p className={styles.chatUsername}>{username[chat.id]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfChats;
