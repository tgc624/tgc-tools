import React from "react";
import styles from "./NInput.module.css";

export default <T extends number | string>(props: {
  value: T;
  label?: string;
  onChange: (newValue: T) => void;
}) => {
  const [type] = typeof props.value === "number" ? ["number"] : ["string"];
  return (
    <>
      {(() => {
        if (props.label) {
          return <p className={styles.label}>{props.label}</p>;
        }
      })()}
      <input
        className={`concave box ${styles.input}`}
        style={{
          borderRadius: 32,
          border: "none",
          padding: 8,
          fontSize: 16,
        }}
        type={type}
        value={props.value}
        onChange={(event) => {
          event.persist();
          props.onChange(event.target.value as T);
        }}
      />
    </>
  );
};
