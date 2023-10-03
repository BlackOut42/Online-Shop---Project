const { response } = require("express");
const imgbbUploader = require("imgbb-uploader");

async function uploadToImgbb(imagePath, imageName) {
  const options = {
    apiKey: process.env.IMGBB_API_KEY,
    imagePath: imagePath,
    name: imageName,
  };
  try {
    const response = await imgbbUploader(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = uploadToImgbb;
