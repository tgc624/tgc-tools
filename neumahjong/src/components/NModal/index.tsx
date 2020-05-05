import React, { useEffect, useRef } from "react";
import styles from "./NModal.module.css";

type DialogClickEvent = React.MouseEvent<HTMLDialogElement, MouseEvent> & {
  target: { localName: string };
};

export default (props: {
  children?: JSX.Element;
  open: boolean;
  toggleOpen: () => void;
}) => {
  const ref = useRef<HTMLDialogElement>();
  const dialog = (
    <dialog
      // @ts-ignore
      ref={ref}
      style={{ padding: 0, border: 0 }}
      className={styles.NModal}
      onClick={(event: DialogClickEvent) => {
        event.persist();
        event.target?.localName === "dialog" && props.toggleOpen();
      }}
    >
      {props.children}
    </dialog>
  );
  useEffect(() => {
    // useEffectを使うことについて→https://github.com/Availity/react-block-ui/issues/40
    if (props.open) {
      ref.current?.close?.(); // close()せずにshowModal()するとエラーになるので、close()する
      ref.current?.showModal?.();
    } else {
      ref.current?.close?.();
    }
  }, [props.open]);
  return dialog;
};
