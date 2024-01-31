import { useState, useContext } from "react";
import { meowApi } from "../apis/apiWrapper";
import { getUserSession } from "../local-storage";
import { getUserToken } from "../local-storage";
import { context } from "../App";

const RepostMeow = ({ meow }) => {
  // --------------------------------------------------Variables-------------------------------------------------------------------
  const reload = useContext(context);
  const token = getUserToken();

  // --------------------------------------------------Repost del Meow-------------------------------------------------------------
  const repostMeow = async () => {
    try {
      console.log(meow);
      const res = await meowApi.post(
        "/repost",
        { ...meow, date: Date.now() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      reload.setReload(!reload.reload);
    } catch (error) {
      console.log("error reposting meow", error);
    }
  };
  return (
    <>
      <span style={{ cursor: "pointer" }} onClick={repostMeow}>
        🔁
      </span>
      <span>{meow.reposts}</span>
    </>
  );
};

export default RepostMeow;
