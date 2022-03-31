import React, { useState } from "react";
import styles from '../styles/Home.module.css'
import Parse from "parse";

export const Album = () => {
  const [album, setAlbum] = useState(null);

  async function fetchAlbum() {

    const query = new Parse.Query("images");
    const album = await query.first();
    setAlbum(album);
  }

  return (
    <div className={styles.image_container}>
      {album && <img className={styles.image} src={album.get("image").url()} alt="album cover" />}
      <button onClick={fetchAlbum}>Fetch Album</button>
    </div>
  );
};