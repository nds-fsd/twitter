import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const notify = () => toast("Here is your toast.");

const Toast = ({ socket }) => {
  const [notification, setNotification] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on('successful submission', (data) => {
        toast.success('Opponent Successfully Submitted')
    })
}, [])

  return (
    <Toaster onChange={notify} position="top-right" reverseOrder={false} />
  );
};

export default Toast;

