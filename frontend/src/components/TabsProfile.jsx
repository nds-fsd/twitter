import React from "react";
import styles from "./TabsProfile.module.css";

const TabsProfile = ({ tabs, setMeowsLiked, setMeowsFilter }) => {
  return (
    <ul className={styles.tab}>
      {tabs.map((tab, index) => (
        <li key={index} className={styles.tab}>
          <span
            onClick={(e) => {
              if (e.target.innerHTML === "Likes") {
                setMeowsLiked(true);
                setMeowsFilter(false);
              }
              console.log(e.target.innerHTML);
              if (e.target.innerHTML === "Meows") {
                setMeowsFilter(true);
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
