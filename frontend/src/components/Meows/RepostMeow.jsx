import { useContext } from "react";
import { meowApi } from "../../functions/apiWrapper";
import { getUserToken } from "../../functions/localStorage";
import { context } from "../../App";

const RepostMeow = ({ meow }) => {
  const reload = useContext(context);
  const token = getUserToken();

  const repostMeow = async () => {
    try {
      const res = await meowApi().post(
        "/repost",
        { ...meow, date: Date.now() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reload.setReload(!reload.reload);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <span>{meow.reposts} </span>
      <span style={{ cursor: "pointer" }} onClick={repostMeow}>
        🔁
      </span>
    </>
  );
};

export default RepostMeow;
