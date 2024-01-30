import { useState } from "react";
import { meowApi } from "../apis/apiWrapper";
import { getUserSession } from "../local-storage";
import { getUserToken } from "../local-storage";

const RepostMeow = ({ meow }) => {
  const token = getUserToken();
  const [repost, setRepost] = useState(meow);
  //   tienes que hacer elmismo meow updateado!!!!! pero mismo id del meow?
  const repostMeow = async () => {
    try {
      console.log(repost);
      const res = await meowApi.post(
        "/",
        { meow: repost.text, date: Date.now(), repostedMeowId: meow._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log("error reposting meow", error);
    }
  };
  return <button onClick={repostMeow}>🔁Repost</button>;
};

export default RepostMeow;
