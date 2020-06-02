import React from "react";
import styles from "./NButton.module.css";

export default (props: {
  children: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
    >
      <div>{props.children}</div>
    </button>
  );
};
