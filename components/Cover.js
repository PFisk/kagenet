import React from "react";
import styles from "../styles/Home.module.css";


const Cover = (props) => {

    const data = props.data;

    function dataFormatter(data) {
        const formattedData = [];

        formattedData.push({
            rock: data.albumGuesses.filter(e => e.get('guess') === 'rock').length,
            pop: data.albumGuesses.filter(e => e.get('guess') === 'pop').length,
            hip_hop: data.albumGuesses.filter(e => e.get('guess') === 'hip hop').length,
            electronic: data.albumGuesses.filter(e => e.get('guess') === 'electronic').length,
            jazz: data.albumGuesses.filter(e => e.get('guess') === 'jazz').length,
            folk_country: data.albumGuesses.filter(e => e.get('guess') === 'folk / country').length,
            funk_soul: data.albumGuesses.filter(e => e.get('guess') === 'funk / soul').length,
            classical: data.albumGuesses.filter(e => e.get('guess') === 'classical').length,
            blues: data.albumGuesses.filter(e => e.get('guess') === 'blues').length,
            reggae: data.albumGuesses.filter(e => e.get('guess') === 'reggae').length,
            latin: data.albumGuesses.filter(e => e.get('guess') === 'latin').length,
            total: data.albumGuesses.length
        })

        return formattedData;
    }

    const guesses = dataFormatter(data);

    console.log(guesses);


    return (
        <div className={styles.factcard}>
            <h2>
                {data.albumID}
            </h2>
            <div className={styles.card_image}>
                <img
                    className={styles.image}
                    src={data.image}
                    alt="album cover"
                />

            </div>
            <div className={styles.card_body}>
                <p>
                    Rock: {guesses[0].rock}
                </p>
            </div>
        </div>
    );

};

export default Cover;