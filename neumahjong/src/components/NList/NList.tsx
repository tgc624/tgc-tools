import React from "react";
import styles from "./NList.module.css";

export default ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <section className={styles.list}>{children}</section>;
};
