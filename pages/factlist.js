import styles from '../styles/Home.module.css'
import getSurveyResponses from '../data/surveyData';
import getAlbumData from '../data/albumData';
import getAllImages from "../data/imageData.js";
import Cover from '../components/Cover.js';
import React, { useEffect } from 'react';

export default function Facts() {

    const [surveyData, setSurveyData] = React.useState({});
    const [albumData, setAlbumData] = React.useState({});
    const [imageData, setImageData] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        async function fetchData() {
            console.log('fetching data');
            await getSurveyResponses().then((res) => {
                setSurveyData(res);
            });
            console.log("Got survey data")

            await getAlbumData().then((res) => {
                setAlbumData(res);
            });
            console.log("Got album data")
            
            await getAllImages().then((res) => {
                setImageData(res);
                setLoading(false);
            });
            console.log("Got image data")
        }

        fetchData();
    }, [])

    useEffect(() => {
        if (Object.keys(surveyData).length === 0) return
        //setUniqueIDs(getUniqueResponseIDs(surveyData));
    }, [surveyData])

    useEffect(() => {
        if (Object.keys(albumData).length === 0) return
        //setGuessCorrectness(getGuessCorrectness(albumData, data, thresholdPct));
    }, [albumData])

    useEffect(() => {
        if (Object.keys(imageData).length === 0) return

    }, [imageData])


    return (
        <div>
            {loading ? <div>Loading...</div> :

                <div className={styles.container}>
                    <div className={styles.title}>
                        <h1>
                            Facts
                        </h1>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.grid}>
                        {Object.keys(imageData).map((key) => {
                            return (
                                <Cover key={key} data={imageData[key]} />
                            )
                        })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}