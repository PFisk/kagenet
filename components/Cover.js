import React from "react";
import styles from "../styles/Home.module.css";

const Cover = (props) => {

    const data = props.data;

    return (
        <div className={styles.card}>
            <h2>
                {data.id}
            </h2>
            <div className={styles.card_image}>
            <img
                className={styles.image}
                src={data.image_url}
                alt="album cover"
              />
                
            </div>
            <div className={styles.card_body}>
                <p>
                    {data.id}
                </p>
            </div>
        </div>

    );

};

export default Cover;