import React from "react";
import styles from "../styles/Home.module.css";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={props.onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modal_title}>{props.title}</h2>
        <div className={styles.modal_body}>
          <p>
              {props.body}
          </p>
          {props.hasButton && <button onClick={props.onClose} className={styles.button_alt}>
            Continue
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
