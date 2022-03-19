const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput")
const browseBtn = document.querySelector(".browseBtn");

const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");
const percentDiv = document.querySelector("#percent");

const host = "https://innshare.herokuapp.com/";
const uploadURL = `${host}api/files`

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dropZone.classList.contains("dragged")) {
        dropZone.classList.add("dragged")
    }
})

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragged")
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragged");

    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        uploadFile()
    }
});

fileInput.addEventListener("change", () => {
    uploadFile();
})

browseBtn.addEventListener("click", () => {
    fileInput.click();
});

const uploadFile = () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myFile", file);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
        }
    };
    xhr.upload.onprogress = updateProgress;

    xhr.open("POST", uploadURL);
    xhr.send(formData);
};


const updateProgress = (e) => {
    let percent = Math.round((e.loaded / e.total) * 100);
    console.log(percent);
    // bgProgress.style.transform = 'scaleX($percent)';
    bgProgress.style.width = `${percent}%`;
    percentDiv.innerText = percent;
    progressBar.style.transform = `scaleX(${percent / 100})`
}


