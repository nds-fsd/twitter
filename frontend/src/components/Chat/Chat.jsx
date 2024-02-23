import io from "socket.io-client";

const Chat = () => {
  const socket = io("ws://localhost:3001");
  console.log(socket);
  return (
    <div>
      <h2>Chat</h2>
    </div>
  );
};

export default Chat;
