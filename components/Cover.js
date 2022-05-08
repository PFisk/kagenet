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

        const sortedData = Object.entries(formattedData[0]).sort((a, b) => b[1] - a[1]);

        return sortedData;

    }

    function getCorrectGuesses(data, sortedData) {
        let correctAns = 0;

        data.genre.forEach(genre => {

            let fixedgenre = "";

            if (genre === 'folk / country') {
                fixedgenre = 'folk_country';
            } else if (genre === 'funk / soul') {
                fixedgenre = 'funk_soul';
            } else if (genre === 'hip hop') {
                fixedgenre = 'hip_hop';
            } else {
                fixedgenre = genre;
            }

            sortedData.forEach(e => {
                if (e[0] === fixedgenre) {
                    correctAns += e[1];
                }

            })

        })

        return correctAns;
    }

    const guesses = dataFormatter(data);
    const correctGuesses = getCorrectGuesses(data, guesses);

    const correctnessPct = Math.round((correctGuesses/guesses[0][1])*100)

    function getBorderColor() {
        if (correctnessPct > 50 && data.real) {
            return styles.factcard_highlight_real;
        } else if (correctnessPct > 50 && !data.real) {
            return styles.factcard_highlight_fake;
        } else {
            return styles.factcard;
        }
    }

    //correctnessPct >= 50 && data.real ? styles.factcard_highlight_real : correctnessPct >= 50 && !data.real ? styles.factcard_highligt_fake : styles.factcard

    return (
        <div className={getBorderColor()}>
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
                <h4>
                    Correct genres:
                    {data.genre.map((genre, index) => {
                        return <li key={index}>{genre}</li>
                    })}
                </h4>

                <p>
                    <b>Responses:</b>
                    {guesses.map((e, i) => {
                        return <div key={i}>
                            <span>{e[0]}: </span>
                            <span>{e[1]}</span>
                        </div>
                    })}
                    <br/>
                    <b>Correct guesses: {correctGuesses}</b>
                    <br/>
                    <b>Correctness: {correctnessPct} %</b>
                </p>
            </div>
        </div>
    );

};

export default Cover;