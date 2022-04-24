import styles from '../styles/Home.module.css'
import Parse from "parse";
import getSurveyResponses from '../data/surveyData';
import getAlbumData from '../data/albumData';
import React, { useState, useEffect } from 'react';

const thresholdPct = 50;


function getUniqueResponseIDs(surveyResponses) {
    const uniqueResponseIDs = [];
    surveyResponses.forEach(response => {
        if (!uniqueResponseIDs.includes(response.get('user_id'))) {
            uniqueResponseIDs.push(response.get('user_id'));
        }
    })
    return uniqueResponseIDs;
}

function getGuessCorrectness(albumData, surveyResponses, thresholdPct) {
    let realPoints = 0;
    let fakePoints = 0;
    const realOverThreshold = [];
    const fakeOverThreshold = [];

    albumData.forEach(album => {
        const albumID = album.get('album_id');
        const isAlbumReal = album.get('real');
        const genre = album.get('album_genre');
        const albumGuesses = surveyResponses.filter(response => response.get('cover_name') === albumID);

        let addedRealPoints = 0;
        let addedFakePoints = 0;

        albumGuesses.forEach(guess => {
            if (guess.get('guess') === genre) {
                if (isAlbumReal) {
                    addedRealPoints++;
                } else {
                    addedFakePoints++;
                }
            }
    
        })

        if ((addedRealPoints/albumGuesses.length)*100 > thresholdPct) {
            realOverThreshold.push(albumID);
        }
        if ((addedFakePoints/albumGuesses.length)*100 > thresholdPct) {
            fakeOverThreshold.push(albumID);
        }

        realPoints += addedRealPoints;
        fakePoints += addedFakePoints;

    })

    const realOverOutput = realOverThreshold.length;
    const fakeOverOutput = fakeOverThreshold.length;


    return { realPoints, fakePoints, realOverOutput, fakeOverOutput };
}


export default function Stats() {

    const [data, setData] = React.useState({});
    const [albumData, setAlbumData] = React.useState({});
    const [uniqueIDs, setUniqueIDs] = React.useState([]);
    const [guessCorrectness, setGuessCorrectness] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        async function fetchData() {
            console.log('fetching data');
            await getSurveyResponses().then((res) => {
                setData(res);
                setLoading(false);
            });
            console.log("Got survey data")

            await getAlbumData().then((res) => {
                setAlbumData(res);
            });
            console.log("Got album data")
        }

        fetchData();
    }, [])

    useEffect(() => {
        if (Object.keys(data).length === 0) return
        setUniqueIDs(getUniqueResponseIDs(data));
    }, [data])

    useEffect(() => {
        if (Object.keys(albumData).length === 0) return
        setGuessCorrectness(getGuessCorrectness(albumData, data, thresholdPct));
    }, [albumData])


    return (
        <div>
            {loading ? <div>Loading...</div> :
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Statistics
                    </h1>
                    <main className={styles.main}>
                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h2>
                                    Survey Responses
                                </h2>
                                <p>Total responses = {data.length}</p>
                                <p>Unique response IDs = {uniqueIDs.length} </p>
                                <p>Average per ID = {Math.round(data.length / uniqueIDs.length)}</p>
                            </div>
                            <div className={styles.card}>
                                <h2>
                                    Correctness
                                </h2>
                                <p>Total correct guesses = {guessCorrectness.realPoints + guessCorrectness.fakePoints} </p>
                                <p>Correctness = {Math.round(((guessCorrectness.realPoints + guessCorrectness.fakePoints) / data.length) * 100)}% </p>
                                <p>Real albums = {guessCorrectness.realPoints}</p>
                                <p>Fake albums = {guessCorrectness.fakePoints}</p>
                            </div>
                            <div className={styles.card}>
                                <h2>
                                    Artist agreement
                                </h2>
                                <p>Real albums with {'>'} 50% agreement = {guessCorrectness.realOverOutput} </p>
                                <p>Fake albums with {'>'} 50% agreement = {guessCorrectness.fakeOverOutput} </p>
                            </div>
                        </div>
                    </main>
                </div>
            }
        </div>
    );
}