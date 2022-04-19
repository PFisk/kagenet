import Parse from "parse/node.js";
import path from "path";
import fs from "fs";

const PARSE_APPLICATION_ID = "gUPBqgnbUo0OwlGsGUWEtg7UoztT24u3kA7kOGLc"
const PARSE_HOST_URL = "https://parseapi.back4app.com/"
const PARSE_JAVASCRIPT_KEY = "hNDbHwGSyxgi20nBNsRc7pHs96pWVki0QWP3EvGM"

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL

const dataDirectory = path.join(process.cwd(), 'data/Samples.json')

function fillDatabase() {    

    const data = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'))

    const formattedData = formatData(data);

    //Uncomment for populating database
    formattedData.forEach((item) => {
        console.log(item);
        //sendAlbumItem(item);
        //sendImageItem(item);
    });
}


//Add all needed attributes here
function formatData(data) {
    const formattedData = data.map((item) => {
        return {
            id: item.id,
            genre: "rock",
            uri: item.uri,
            img_path: item.img_path,
        };
    });

    return formattedData;
}

function sendAlbumItem(item) {
    const AlbumData = Parse.Object.extend("album_data");
    const addAlbum = new AlbumData();

    addAlbum.set("album_id", item.id);
    addAlbum.set("album_genre", item.genre);
    addAlbum.set("track_uri", item.uri);

    addAlbum.save().then(
        (response) => {
            console.log("Album item added: ", response.get("album_id"));
        },
        (error) => {
            console.log("Error: ", error);
        }
    );
}

fillDatabase();

function sendImageItem(item) {
    const ImageData = new Parse.Object("images");

    const imgPath = path.join(process.cwd(), 'data/', item.img_path);
    console.log("imgPath", imgPath);

    const image = fs.readFileSync(imgPath).toString("base64");

    ImageData.set("album_id", item.id);
    ImageData.set('image', new Parse.File(item.id + ".png", { base64: image }));

    ImageData.save().then(
        (response) => {
            console.log("Image item added: ", response.get("album_id"));
        },
        (error) => {
            console.log("Error: ", error);
        }
    );
}