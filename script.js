var wordSearched = document.getElementById("wordSearched");
var button = document.getElementById("submit-btn");
var songName = document.getElementById("song-name");
var audioBar = document.getElementById("audio-bar");
var coverArt = document.getElementById("cover-art");
var artist = document.getElementById("artist");
var showDiv = document.getElementById("hide");

const spotify = (word) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b57c3846b9msh17018c25c4c6f33p1c5692jsn0f18df506b4d',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    fetch("https://shazam.p.rapidapi.com/search?term=" + word + "&locale=en-US&offset=0&limit=5", options)
        .then((response) => { return response.json() })
        .then((response) => {
            //unhiding the div
            showDiv.style.display = "block";

            //deleting previous search
            audioBar.innerHTML = "";
            songName.innerHTML = "";

            //adding cover art
            coverArt.src = response.tracks.hits[0].track.share.image;

            //adding artist photo
            artist.src = response.tracks.hits[0].track.share.avatar;

            //adding song name and artist
            songName.innerHTML = response.tracks.hits[0].track.share.subject;

            //adding the audio tag
            var sound = document.createElement('audio');
            sound.id = 'audio-player';
            sound.controls = 'controls';
            sound.src = response.tracks.hits[0].track.hub.actions[1].uri;
            sound.type = 'audio/mpeg';
            sound.style.cssText += 'width: 100%;';
            audioBar.appendChild(sound);
        })
        .catch(err => console.error(err));
};

button.addEventListener("click", (e) => {
    //this will not let the page to reload and let the changes disappear
    e.preventDefault();
    
    spotify(wordSearched.value);
});
