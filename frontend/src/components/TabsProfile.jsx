import React from "react";
import styles from "./TabsProfile.module.css";

const TabsProfile = ({ tabs }) => {
  return (
    <ul className={styles.tab}>
      {tabs.map((tab, index) => (
        <li key={index} className={styles.tab}>
          <a href={tab.href}>{tab.text}</a>
        </li>
      ))}
    </ul>
  );
};

export default TabsProfile;
