const songs = [
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        src: "songs/song1.mp3",
        image: "images/cover1.png"
    },
    {
        title: "Believer",
        artist: "Imagine Dragons",
        src: "songs/song2.mp3",
        image: "images/cover2.png"
    }, 
    {
        title: "Faded",
        artist: "Alan Walker",
        src: "songs/song3.mp3",
        image: "images/cover3.png"
    }
];

const audio = document.getElementById('audio');
const songImg = document.getElementById('song-cover');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const playPauseBtn = document.getElementById('play-pause-button');
const prevBtn = document.getElementById('previous-button');
const nextBtn = document.getElementById('next-button');
const progressBar = document.getElementById('progress');
const volumeSlider = document.getElementById('volume');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const playlistSongs = document.getElementsByClassName('ind-song');
const ppBtn = document.getElementsByClassName('ppbtn')

let isPlaying = false;

playPauseBtn.addEventListener('click', function() {
    if(audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

let currentIndex = -1;
for(let i = 0; i<playlistSongs.length; i++){
    playlistSongs[i].addEventListener('click', function(){
        if(currentIndex == i){
            if(audio.paused){
                audio.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }
            else {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }
        else {
            currentIndex = i;
            audio.src = songs[i].src;
            audio.play();
            songTitle.innerHTML = songs[i].title;
            artistName.innerText = songs[i].artist;
            songImg.src = songs[i].image;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }

        for(let j = 0; j<playlistSongs.length; j++){
            playlistSongs[j].classList.remove('active');
        }
        
        playlistSongs[i].classList.add('active');
    });
}

audio.addEventListener('timeupdate', function(){

    if(!isNaN(audio.duration)){
        let percentage = (audio.currentTime/audio.duration)*100;
        progressBar.value = percentage;
        progressBar.style.background = `linear-gradient(to right, 
            purple 0%, 
            purple ${percentage}%, 
            grey ${percentage}%,
            grey 100%
        )`;

    }

    let d = Math.floor(audio.duration);
    let min = Math.floor(d/60);
    let sec = d - (min)*60;
    if(!isNaN(audio.duration)){
        if(sec < 10){
            duration.innerHTML = `${(min)}:0${sec}`;
        }
        else{
            duration.innerHTML = `${(min)}:${sec}`;
        }
    }

    let ac = Math.floor(audio.currentTime);
    let i = Math.floor(ac/60);
    let sec1 = ac % 60;
    if(sec1<10){
        currentTime.innerHTML = `${i}:0${sec1}`;
    }
    else{
        currentTime.innerHTML = `${i}:${sec1}`;
    }
});

progressBar.addEventListener('input', function() {
    audio.currentTime = audio.duration * (progressBar.value / 100);
});

prevBtn.addEventListener('click', function() {
    if(currentIndex>0){
        currentIndex--;
        audio.src = songs[currentIndex].src;
        songTitle.innerHTML = songs[currentIndex].title;
        artistName.innerText = songs[currentIndex].artist;
        songImg.src = songs[currentIndex].image;
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
});

function playNext(){
    if(currentIndex<songs.length-1){
        currentIndex++;
        audio.src = songs[currentIndex].src;
        songTitle.innerHTML = songs[currentIndex].title;
        artistName.innerText = songs[currentIndex].artist;
        songImg.src = songs[currentIndex].image;
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
}

nextBtn.addEventListener('click', playNext);
audio.addEventListener('ended', playNext);

volumeSlider.addEventListener('input', function(){
    audio.volume = volumeSlider.value/100;
    volumeSlider.style.background = `linear-gradient(to right, 
        purple 0%, 
        purple ${volumeSlider.value}%, 
        grey ${volumeSlider.value}%,
        grey 100%
    )`;
});