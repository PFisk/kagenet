import styles from '../styles/Home.module.css'
import getSurveyResponses from '../data/surveyData';
import getAlbumData from '../data/albumData';
import getAllImages from "../data/imageData.js";
import Cover from '../components/Cover.js';
import React, { useEffect } from 'react';

function getAlbumGuesses(albumData, surveyResponses, imageData) {

    const albumGuessData = [];

    albumData.forEach(album => {
        const albumID = album.get('album_id');
        const isAlbumReal = album.get('real');
        const genre = album.get('album_genre');
        const albumGuesses = surveyResponses.filter(response => response.get('cover_name') === albumID);
        const albumImage = imageData.filter(image => image.id === albumID)[0].image_url;

        if (!albumGuessData.some(e => e.albumID === albumID)) {

            albumGuessData.push({
                albumID: albumID,
                real: isAlbumReal,
                genre: [genre],
                image: albumImage,
                albumGuesses: albumGuesses
            });

        } else {
            albumGuessData.map(e => {
                if (e.albumID === albumID) {
                    e.genre.push(genre)
                }
            })

        }

    })

    console.log(albumGuessData);

    return albumGuessData;

}

export default function Facts() {

    const [surveyData, setSurveyData] = React.useState({});
    const [albumData, setAlbumData] = React.useState({});
    const [imageData, setImageData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [finalCardData, setFinalCardData] = React.useState({});

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
        setFinalCardData(getAlbumGuesses(albumData, surveyData, imageData));
    }, [imageData])


    return (
        <div>
            {loading ? <div>Loading...</div> :

                <div className={styles.container}>
                    <div className={styles.title}>
                        <h2>
                            Facts
                        </h2>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.factgrid}>
                            {Object.keys(finalCardData).map((key) => {
                                return (
                                    <Cover key={key} data={finalCardData[key]} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}