import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "../../functions/localStorage.js";
import { chatApi, userApi } from "../../functions/apiWrapper.js";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import { socket } from "./Chat.jsx";

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
    socket.emit("joinRoom", { room: chatId });
    navigate(`/messages/${logedUser.username}/chat/${chatId}`);
  };

  return (
    <div>
      <h2>Chats</h2>
      <div>
        {chat.map((chat) => (
          <div key={chat.id} onClick={() => joinChatRoom(chat.id)}>
            <PhotoUserProfile
              usernamePhoto={username[chat.id]}
              photoStyle={photoStyle}
            />
            {username[chat.id]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfChats;
