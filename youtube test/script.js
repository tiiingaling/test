const API_URL = 'https://www.googleapis.com/youtube/v3'
const API_KEY = 'AIzaSyBrcSLe2BDt-9iUh6lzXLy1Ncg17_sLdX4'

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  var apiURL = `${API_URL}/search?key=${API_KEY}&type=video&part=snippet&q=${term}`
  var term = searchTerms[0].term

  fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(result => console.log("Search Results", result))
    .catch(error => console.log('error', error));

var getVideoCode = (result) => {
  
  var searchData = result.items;
  var vidCode = searchData[0].id.videoId;

  console.log('video code', vidCode)
}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {

  getVideoCode(vidCode);

  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: ` `,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}