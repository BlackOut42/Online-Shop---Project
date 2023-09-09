const imagePicker = document.querySelector("#image-upload-control input");
const imagePreview = document.querySelector("#image-upload-control img");

function chanageImagePreview(){
    const files = imagePicker.files;

    if(!files || files.length === 0)
    {
        imagePreview.style.display = "none";
        return;
    }
    const pickedImage = files[0];
    const imageURL = URL.createObjectURL(pickedImage);
    imagePreview.src = imageURL;
    imagePreview.style.display = "block";
}


imagePicker.addEventListener("change",chanageImagePreview);