import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import getAllImages from "../data/imageData.js";
import Parse from "parse";
import ProgressBar from "@ramonak/react-progress-bar"

let albumcount = 0;

export const Album = () => {

  const [imageData, setImageData] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const allAlbums = await getAllImages();
      setImageData(allAlbums);
    }
    fetchData();
  }, [])

  async function setNextAlbum() {
    setAlbum(imageData[albumcount % imageData.length]);
    albumcount++;
  }

  async function response(guess) {
    const Response = Parse.Object.extend("survey_responses")
    const newResponse = new Response()

    newResponse.set("cover_name", album.id)
    newResponse.set("guess", guess.toLowerCase())

    newResponse.save().then((response) => {
      console.log("genre guessed: ", response.get("guess"))
      setNextAlbum()
    }, (error) => {
      console.log("Error: ", error)
    })
  }

/*   function getProgress() {
    return albumcount / imageData.length * 100;
  } */

  return (
    <div>
      {!album && (
        <div className={styles.survey_info}>
          <p>The album covers shown are purposefully in low resolution, as this is the same resolution as the machine learning models are training on.
            <br />
            <br />
            The survey is simple - answer what you think are the correct genre for the album covers shown.
          </p>
          <button onClick={setNextAlbum} className={styles.button_alt}>Lets go!</button>
        </div>
      )}
      {album && (
        <div>
          <p className={styles.description}>
            Can you guess the correct genre?
          </p>
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
          <button onClick={() => response("hip-hop")} className={styles.button} type="button">
            Hip-Hop
          </button>
          <button onClick={() => response("electronic")} className={styles.button} type="button">
            Electronic
          </button>
          <button onClick={() => response("jazz")} className={styles.button} type="button">
            Jazz
          </button>
          <button onClick={() => response("folk, country")} className={styles.button} type="button">
            Folk and Country
          </button>
          <button onClick={() => response("funk, soul")} className={styles.button} type="button">
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
          {/* <ProgressBar completed={() => getProgress}/> */}
        </div>
      </div>
      }
    </div>
  );
};
