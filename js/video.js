function resetHighlights() {
  //select all spans
  let allSpans = document.querySelectorAll('span');

  //if span is highlighted yellow then set its colour to grey
  for (i = 0; i < allSpans.length; i += 1) {
    let indivSpan = allSpans[i];
    if (indivSpan.style.color = '#FFAB40') {
      indivSpan.style.color = '#383938';
    }
  }
}

//add markers to the progress bar
const markers = [0.24, 4.13, 7.535, 11.27, 13.96, 17.94, 22.37, 26.88, 32.1, 34.73, 39.43, 42.35, 46.3, 49.27, 53.76, 57.78];


// video controls
$('video').mediaelementplayer( {
  features: ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen', 'markers'],
  markers: markers,
  markerCallback:
    function(media,time){

      //remove prev highlight
      resetHighlights();

      //in safari - currentTime only logged properly when const video inside function
      const video = document.querySelector('video');

      // find out current time when vid hits a marker

      const currentMarker = video.currentTime;

      for (j = 0; j < markers.length; j += 1) {
        let markerTime = markers[j];
        //markers seem to change their time by a few milliseconds each time so work out the position of the marker in the array so it can be matched with a transcript span id
        if (currentMarker > markerTime - 1 && currentMarker < markerTime + 1) {
          let markerPosition = j;
          //get corresponding part of transcript via its id and highlight yellow
          let id = 'span' + markerPosition;
          let highlightSpan = document.getElementById(id);
          highlightSpan.style.color = '#ffab40';
        }
      }

    }
});

const video = document.querySelector('video');


video.onseeked = function() {
  resetHighlights();

  //find out current time when seek ends
  const currentTime  = video.currentTime;

  for (k = 0; k < markers.length; k += 1) {
    let markerTime = markers[k];
    //if reset to 0, highlight span0
    if (currentTime === 0) {
      document.getElementById('span0').style.color = '#ffab40';
    }
    //or if not, find next marker
    else if (currentTime < markerTime) {
      let markerPosition = k - 1;
      //get span
      let id = 'span' + markerPosition;
      //highlight span
      let highlightSpan = document.getElementById(id);
      highlightSpan.style.color = '#ffab40';
      //break loop
      break;
    }
  }

}


// click on a span in transcript and jump to that time cue in video

document.addEventListener('click', function(e) {
  if (e.target.className == 'transcript-line') {
    //get the id of the clicked span
    const id = e.target.id;
    console.log(id);
    //split the id to get the number
    const split = id.split("n");
    //store just the number
    const arrayNumber = split[1];
    //fimd out the time marker associated with that span
    const newTime = markers[arrayNumber];
    console.log(newTime);
    //set the video to that marker
    video.currentTime = newTime;
    //if video had been paused, or hadn't started yet - play on clicking the transcript
    video.play();
  }
});
