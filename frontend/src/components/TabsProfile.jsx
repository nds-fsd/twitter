import React from "react";
import styles from "./TabsProfile.module.css";

const TabsProfile = ({ tabs, setMeowsLiked, setMeowsFeed }) => {
  return (
    <ul className={styles.tab}>
      {tabs.map((tab, index) => (
        <li key={index} className={styles.tab}>
          <span
            onClick={(e) => {
              if (e.target.innerHTML === "Likes") {
                setMeowsLiked(true);
                setMeowsFeed(false);
              }
              console.log(e.target.innerHTML);
              if (e.target.innerHTML === "Meows") {
                setMeowsFeed(true);
                setMeowsLiked(false);
              }
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
