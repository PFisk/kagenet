import Parse from "parse";

const images = Parse.Object.extend("images");

export default async function getAllImages() {
    const allImagesQuery = new Parse.Query(images);   
    const allImages = await allImagesQuery.find();

    const allImagesFormatted = allImages.map(album => {
        return {
        image_url: album.get('image').url(),
        id: album.get('album_id')
        }
    })

  return allImagesFormatted;
}