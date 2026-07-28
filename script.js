const CHANNEL_ID = "UC66IdZuclrQIoR5lf6nuQDA";


const RSS_URL =
`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;



// Latest stream elements

const player = document.getElementById("livePlayer");

const title = document.getElementById("streamTitle");

const date = document.getElementById("streamDate");

const liveDot = document.getElementById("liveDot");

const liveText = document.getElementById("liveText");



// Shorts TV elements

const clipPlayer = document.getElementById("clipPlayer");

const clipTitle = document.getElementById("clipTitle");

const clipNumber = document.getElementById("clipNumber");



let shorts = [];

let currentClip = 0;




// ===============================
// GET LATEST STREAM
// ===============================

async function loadLatestStream(){

    try{

        const response = await fetch(RSS_URL);

        const data = await response.json();

        const latest = data.items[0];


        if(!latest){

            throw "No stream found";

        }


        const id = latest.guid.split(":").pop();



        player.src =
        `https://www.youtube.com/embed/${id}?rel=0`;



        title.textContent =
        latest.title;



        date.textContent =
        "Published: " +
        new Date(latest.pubDate)
        .toLocaleString();



        liveDot.classList.add("live");


        liveText.textContent =
        "Latest stream loaded";


    }


    catch(error){

        console.error(error);

        liveText.textContent =
        "Failed loading stream";

    }

}






// ===============================
// LOAD SHORTS TV
// ===============================

async function loadShorts(){

    try{


        const response = await fetch("shorts.json");


        shorts = await response.json();



        if(shorts.length === 0){

            throw "No shorts";

        }



        // random TV order

        shorts.sort(() => Math.random() - 0.5);



        currentClip = 0;


        showClip();


    }


    catch(error){


        console.error(error);


        clipTitle.textContent =
        "Failed loading Shorts";


    }

}







function showClip(){


    if(shorts.length === 0){

        return;

    }



    const short = shorts[currentClip];



    clipPlayer.src =
    `https://www.youtube.com/embed/${short.id}?rel=0`;



    clipTitle.textContent =
    short.title;



    clipNumber.textContent =
    `${currentClip + 1} / ${shorts.length}`;


}







function nextClip(){


    if(shorts.length === 0)
        return;



    currentClip++;



    if(currentClip >= shorts.length){

        currentClip = 0;

    }



    showClip();


}







function previousClip(){


    if(shorts.length === 0)
        return;



    currentClip--;



    if(currentClip < 0){

        currentClip = shorts.length - 1;

    }



    showClip();


}







// START

loadLatestStream();

loadShorts();



// Refresh every 10 minutes

setInterval(loadLatestStream, 600000);

setInterval(loadShorts, 600000);
