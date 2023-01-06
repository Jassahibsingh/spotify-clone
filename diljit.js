console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/diljit/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "G.O.A.T.", filePath: "songs/diljit/1.mp3", coverPath: "covers/diljit/1.jpg" },
    { songName: "Born to Shine", filePath: "songs/diljit/2.mp3", coverPath: "covers/diljit/2.jpg" },
    { songName: "Clash", filePath: "songs/diljit/3.mp3", coverPath: "covers/diljit/3.jpg" },
    { songName: "Lover", filePath: "songs/diljit/4.mp3", coverPath: "covers/diljit/4.jpg" },
    { songName: "Umbrella", filePath: "songs/diljit/5.mp3", coverPath: "covers/diljit/5.jpg" },
    { songName: "High End", filePath: "songs/diljit/6.mp3", coverPath: "covers/diljit/6.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/diljit/${songIndex + 1}.mp3`;
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/diljit/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 5
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/diljit/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
}) 