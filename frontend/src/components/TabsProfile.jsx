import React from "react";
import styles from "./TabsProfile.module.css";
import { getUserSession } from "../local-storage";

const TabsProfile = ({ tabs, setMeowsLiked }) => {
  const { username } = getUserSession();
  return (
    <ul className={styles.tab}>
      {tabs.map((tab, index) => (
        <li key={index} className={styles.tab}>
          <span
            onClick={(e) => {
              if (e.target.innerHTML === "Likes") {
                setMeowsLiked(true);
              }
              console.log(e.target.innerHTML);
            }}
          >
            {tab.text}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TabsProfile;
