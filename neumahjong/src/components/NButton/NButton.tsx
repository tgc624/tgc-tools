import React from "react";
import styles from "./NButton.module.css";

export default (props: { children: string; onClick: () => void }) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <div>{props.children}</div>
    </button>
  );
};
