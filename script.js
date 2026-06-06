var wordSearched = document.getElementById("wordSearched");
var button = document.getElementById("submit-btn");
var songName = document.getElementById("song-name");
var audioBar = document.getElementById("audio-bar");
var coverArt = document.getElementById("cover-art");
var artist = document.getElementById("artist");
var showDiv = document.getElementById("hide");

const spotify = async (word) => {
    const url = `https://shazam-api6.p.rapidapi.com/shazam/search_track/?query=${encodeURIComponent(word)}&limit=5`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b57c3846b9msh17018c25c4c6f33p1c5692jsn0f18df506b4d',
            'x-rapidapi-host': 'shazam-api6.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);

        const response = await res.json();

        // Target the precise array array path based on your payload structure
        const songData = response.results?.songs?.data;

        if (songData && songData.length > 0) {
            // Pick the first/top matching song object
            const track = songData[0];
            const attrs = track.attributes;

            // Unhide the card presentation container
            showDiv.style.display = "block";

            // Clean layout slates before appending new items
            audioBar.innerHTML = "";
            songName.innerHTML = "";

            // 1. Map Song Title & Artist Text
            songName.innerHTML = `${attrs.name} — <small style="font-size: 0.7em; color: #b3b3b3;">${attrs.artistName}</small>`;

            // 2. Handle Artwork Placeholder Dimensions
            if (attrs.artwork && attrs.artwork.url) {
                // Dynamically transform templates like "{w}x{h}" into a clean 500x500px resolution URL
                let formattedImgUrl = attrs.artwork.url.replace('{w}', '500').replace('{h}', '500');
                
                coverArt.src = formattedImgUrl;
                artist.src = formattedImgUrl; // Reusing high-quality artwork since this payload lacks standalone avatar icons
            }

            // 3. Map Streaming Audio Snippet URL
            const previewUrl = attrs.previews?.[0]?.url;

            if (previewUrl) {
                var sound = document.createElement('audio');
                sound.id = 'audio-player';
                sound.controls = 'controls';
                sound.src = previewUrl;
                sound.type = 'audio/mpeg';
                sound.style.cssText += 'width: 100%;';
                audioBar.appendChild(sound);
            } else {
                console.warn("An audio preview stream target is missing for this track entry.");
            }

        } else {
            // Handle valid API runs that yield no query results
            showDiv.style.display = "block";
            songName.innerHTML = "No results found matching your query.";
            coverArt.src = "";
            artist.src = "";
            audioBar.innerHTML = "";
        }

    } catch (err) {
        console.error("Fetch Routine Fail:", err);
        showDiv.style.display = "block";
        songName.innerHTML = "An API routing error occurred.";
    }
};

// Form submission listener matching your index.html target button
button.addEventListener("click", (e) => {
    e.preventDefault();
    if (wordSearched.value.trim() !== "") {
        spotify(wordSearched.value);
    }
});
