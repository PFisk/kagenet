import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import getAllImages from "../data/imageData.js";
import Parse from "parse";

export const Album = () => {

  let albumcount = 0;

  const [imageData, setImageData] = useState(null);
  const [album, setAlbum] = useState(null);
  async function fetchAlbum() {
    
    console.log(imageData[albumcount].image_url);
    console.log(imageData[albumcount].id);

    setAlbum(imageData[albumcount]);
    console.log(albumcount);
    albumcount++;
  }

  useEffect(() => {
    async function fetchData() {
      const allAlbums = await getAllImages();
      setImageData(allAlbums);
    }
    fetchData();
  },[])

  async function response(guess) {
    const Response = Parse.Object.extend("survey_responses")
    const newResponse = new Response()

    newResponse.set("cover_name", album.id)
    newResponse.set("guess", guess.toLowerCase())

    newResponse.save().then((response) => {
      console.log("created new entry: ", response.id)
      console.log("genre guessed: ", response.get("guess"))
  }, (error) => {
      console.log("Error: ", error)
  })

/*   setAlbum(imageData[albumcount]);
  albumcount++; */
};

  return (
    <div>
      <div className={styles.image_wrapper}>
        <div className={styles.image_container}>
          {album && (
            <img
              className={styles.image}
              src={album.image_url}
              alt="album cover"
            />
          )}
        </div>
      </div>
      <button onClick={fetchAlbum}>Fetch Album</button>
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
      </div>
    </div>
  );
};
