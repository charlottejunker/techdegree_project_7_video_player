
// video controls
$('video').mediaelementplayer( {
  features: ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen'],
});

const video = document.querySelector('video');
const transcriptLines = document.getElementsByClassName('transcript-line');

//listen for the video playing
video.addEventListener("timeupdate", function(e) {
  //loop through the spans
  for (i = 0; i < transcriptLines.length; i += 1)
    //compare data-start and end to the current time of the video
    if (video.currentTime > transcriptLines[i].getAttribute('data-start') && video.currentTime < transcriptLines[i].getAttribute('data-end')) {
      //if they match -
      transcriptLines[i].style.color = '#ffab40';
    } else {
      //if they don't match
      transcriptLines[i].style.color = '#383938';
    }
});

//listen for click on span
document.addEventListener('click', function(e) {
  if (e.target.className == 'transcript-line') {
    //get the data start of the clicked span
    const newTime = e.target.getAttribute('data-start');
    //update time to match
    video.currentTime = newTime;
    //if video had been paused, or hadn't started yet - play on clicking the transcript - doesn't work in safari though...
    video.play();
  }
});
