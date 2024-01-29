import { useState } from "react";
import { meowApi } from "../apis/apiWrapper";
import { getUserSession } from "../local-storage";
import { getUserToken } from "../local-storage";

const RepostMeow = ({ meow }) => {
  const token = getUserToken();
  const [repost, setRepost] = useState(meow);
  const repostMeow = async () => {
    try {
      console.log(repost);
      const res = await meowApi.post(
        "/",
        { meow: repost.text, date: Date.now() },
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
