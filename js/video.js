
// video controls
$('video').mediaelementplayer( {
  features: ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen'],
});

const video = document.querySelector('video');
const markers = [0.24, 4.13, 7.535, 11.27, 13.96, 17.94, 22.37, 26.88, 32.1, 34.73, 39.43, 42.35, 46.3, 49.27, 53.76, 57.78];

const transcriptLines = document.getElementsByClassName('transcript-line')

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
