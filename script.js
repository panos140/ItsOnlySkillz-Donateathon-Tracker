let shorts = [];

let currentClip = 0;


const clipPlayer =
document.getElementById("clipPlayer");


const clipTitle =
document.getElementById("clipTitle");


const clipNumber =
document.getElementById("clipNumber");



async function loadShorts(){


const response =
await fetch("shorts.json");


shorts =
await response.json();



shorts.sort(() =>
Math.random() - 0.5
);



showClip();

}



function showClip(){


const short =
shorts[currentClip];


clipPlayer.src =
`https://www.youtube.com/embed/${short.id}`;


clipTitle.textContent =
short.title;


clipNumber.textContent =
`${currentClip+1} / ${shorts.length}`;


}



function nextClip(){

currentClip++;


if(currentClip >= shorts.length)
currentClip=0;


showClip();

}



function previousClip(){

currentClip--;


if(currentClip < 0)
currentClip=shorts.length-1;


showClip();

}



loadShorts();
