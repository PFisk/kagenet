import Parse from "parse";

const albums = Parse.Object.extend("album_data");

export default async function getAlbumData() {
    const Query = new Parse.Query(albums);
    Query.limit(200);   
    const allAlbums = await Query.find();

    return allAlbums
}