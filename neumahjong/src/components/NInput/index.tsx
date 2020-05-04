import React from "react";
import styles from "./NInput.module.css";

export default <T extends number | string>(props: {
  value: T;
  setValue: (newValue: T) => void;
}) => {
  const [type, setValue] =
    typeof props.value === "number"
      ? ["number", (newValue: string) => props.setValue(+newValue as T)]
      : ["string", (newValue: string) => props.setValue(newValue as T)];
  return (
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
        setValue(event.target.value);
      }}
    />
  );
};
