import React from "react";
import styles from "./Tabs.module.css";

const Tabs = ({ tabs }) => {
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

export default Tabs;
