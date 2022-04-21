import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import getAllImages from "../data/imageData.js";
import Parse from "parse";
import ProgressBar from "@ramonak/react-progress-bar"
import Modal from "./Modal.js";

let albumcount = 0;
let responseThreshold = false;
const threshold = 20;

export const Album = () => {

  const [imageData, setImageData] = useState(null);
  const [album, setAlbum] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showThreshold, setShowThreshold] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const allAlbums = await getAllImages();
      const shuffledArray = shuffle(allAlbums);
      setImageData(shuffledArray);
    }
    function genID() {
      const crypto = require("crypto");
      const id = crypto.randomBytes(20).toString('hex');
      setUserID(id);
    }

    fetchData();
    genID();
    
  }, [])

  function shuffle(array) {
    const shuffledArray = array.map(value => ({value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    return shuffledArray;
  }

  async function setNextAlbum() {
    setAlbum(imageData[albumcount % imageData.length]);
    setProgress(Math.round(albumcount / threshold * 100))
    
    if (albumcount >= threshold) {
      setShowThreshold(true);
    }
    
    if ((albumcount / imageData.length) * 100 >= 100) {
      setShowComplete(true);
    }

    albumcount++;
  }

  function surveyThreshold() {
    setShowThreshold(false);
    responseThreshold = true;
  }

  async function response(guess) {
    const Response = Parse.Object.extend("survey_responses")
    const newResponse = new Response()

    newResponse.set("cover_name", album.id)
    newResponse.set("guess", guess.toLowerCase())
    newResponse.set("user_id", userID)

    newResponse.save().then((response) => {
      console.log("genre guessed: ", response.get("guess"))
      setNextAlbum()
    }, (error) => {
      console.log("Error: ", error)
    })
  }

  return (
    <div>
      {!album && (
        <div>
        <div className={styles.survey_info}>
        <h1 className={styles.title}>
                KageNet Album Cover Survey ✍
              </h1>
          <p>
            This survey is part of a master thesis project in which we are researching potential connections between music and its corresponding album cover art.
            One part of the project is focused on understanding associations using machine learning, while the other is focused on human evaluation.
            <br />
            <br />
            You will be shown album covers that are purposefully in low resolution.
            <br />
            <br />
            The survey is simple - answer what you think is the correct genre for the album cover shown.
            <br />
            <br />
            Thanks a lot for your time!
          </p>
          <button onClick={setNextAlbum} className={styles.button_alt}>Lets go!</button>
        </div>
        </div>
      )}
      {!responseThreshold && <Modal title="Thank you!" onClose={() => surveyThreshold()} show={showThreshold} hasButton={true}
        body="Your contribution is much appreciated. The survey is now done, but you can keep going if you want! Any additional responses help 🙏"
      />}
      <Modal title="Survey complete!" onClose={setShowComplete} show={showComplete} hasButton={false}
        body="You completed the entire survey! Thanks a lot &#10084;&#65039;"
      />
      {album && (
        <div>
          <h1 className={styles.title}>
            Which genre?
          </h1>
          <div className={styles.image_wrapper}>
            <div className={styles.image_container}>
              <img
                className={styles.image}
                src={album.image_url}
                alt="album cover"
              />

            </div>
          </div>
        </div>)}
      {album && <div>
        <div className={styles.button_container}>
          <button onClick={() => response("rock")} className={styles.button} type="button">
            Rock
          </button>
          <button onClick={() => response("pop")} className={styles.button} type="button">
            Pop
          </button>
          <button onClick={() => response("hip hop")} className={styles.button} type="button">
            Hip-Hop
          </button>
          <button onClick={() => response("electronic")} className={styles.button} type="button">
            Electronic
          </button>
          <button onClick={() => response("jazz")} className={styles.button} type="button">
            Jazz
          </button>
          <button onClick={() => response("folk / country")} className={styles.button} type="button">
            Folk and Country
          </button>
          <button onClick={() => response("funk / soul")} className={styles.button} type="button">
            Funk and Soul
          </button>
          <button onClick={() => response("classical")} className={styles.button} type="button">
            Classical
          </button>
          <button onClick={() => response("blues")} className={styles.button} type="button">
            Blues
          </button>
          <button onClick={() => response("reggae")} className={styles.button} type="button">
            Reggae
          </button>
          <button onClick={() => response("latin")} className={styles.button} type="button">
            Latin
          </button>
        </div>
        <div>
          {!responseThreshold && <ProgressBar bgColor={"#109933"} completed={progress}/>}
        </div>
      </div>
      }
    </div>
  );
};
