const CHANNEL_ID = "UC66IdZuclrQIoR5lf6nuQDA";


const RSS_URL =
`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;



const player = document.getElementById("livePlayer");

const title = document.getElementById("streamTitle");

const date = document.getElementById("streamDate");

const liveDot = document.getElementById("liveDot");

const liveText = document.getElementById("liveText");



const clipPlayer = document.getElementById("clipPlayer");

const clipTitle = document.getElementById("clipTitle");

const clipNumber = document.getElementById("clipNumber");



let tvVideos = [];

let currentClip = 0;





function getVideoID(video){

    return video.guid.split(":").pop();

}





function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}






async function loadVideos(){


    try{


        const response = await fetch(RSS_URL);


        const data = await response.json();


        const videos = data.items;



        if(!videos || videos.length === 0){

            throw "No videos found";

        }





        // ==========================
        // LATEST STREAM
        // ==========================


        const latest = videos[0];


        const videoID = getVideoID(latest);



        player.src =
        `https://www.youtube.com/embed/${videoID}?rel=0`;



        title.textContent =
        latest.title;



        date.textContent =
        "Published: " +
        new Date(latest.pubDate)
        .toLocaleString();



        liveDot.classList.add("live");


        liveText.textContent =
        "Latest stream loaded";







        // ==========================
        // TV CHANNEL
        // ==========================


        tvVideos = [...videos];


        shuffle(tvVideos);



        currentClip = 0;



        showClip();



    }



    catch(error){


        console.error(error);


        liveText.textContent =
        "Failed loading YouTube feed";


    }


}







function showClip(){


    if(tvVideos.length === 0){

        return;

    }



    const video = tvVideos[currentClip];



    const id = getVideoID(video);



    clipPlayer.src =
    `https://www.youtube.com/embed/${id}?rel=0`;



    clipTitle.textContent =
    video.title;



    clipNumber.textContent =
    `${currentClip + 1} / ${tvVideos.length}`;


}







function nextClip(){


    if(tvVideos.length === 0){

        return;

    }



    currentClip++;



    if(currentClip >= tvVideos.length){

        currentClip = 0;

    }



    showClip();


}








function previousClip(){


    if(tvVideos.length === 0){

        return;

    }



    currentClip--;



    if(currentClip < 0){

        currentClip = tvVideos.length - 1;

    }



    showClip();


}







loadVideos();


// Refresh every 5 minutes

setInterval(loadVideos, 300000);
