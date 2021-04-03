// Embed Video Page Config File
var config = {
  pageSize:3,
  toPage:undefined,
  mylogo: "",
  mybanner: "", // (html accept)
  myfooter: "" // (html accept)
}
// var
const pageControl = document.querySelector("#pagination-control-container");
const pageControlButton = document.querySelector("#pagination-control-button");
const pageData = document.querySelector("#pagination-data-container");
const body = document.querySelector("body");
var pageNumber;
var myJsonVideo = [];
// eventlistener
pageControlButton.addEventListener("click",clickPaginationControl);
// json and onload
var requestFile = "./video-data.json"
var request = new XMLHttpRequest();
request.open('GET', requestFile);
request.responseType = 'json';
request.send();
request.onload = function() {
  var myJsonData = request.response;
  var videos = myJsonData['videos'];
  for (var i = 0; i < videos.length; i++) {
    myJsonVideo.unshift(videos[i]);
  }
  splitMyUrl();
}
function splitMyUrl(){
  let url = location.href.split("#");
  url = url[0].split("?");
  let argline = url[1];
  if (argline != "" && argline != undefined){
    let args = argline.split("&");
    for (let i = 0; i < args.length; i++) {
      let [tag, value] = args[i].split("=");
      if (tag == "p") {
        if (value != "" && value != undefined) {
          config.toPage = Number(value);
        }else {
          config.toPage = 1;
        }
      }else if (tag == "pageSize") {
        config.pageSize = value;
      }
    }
  }
  pageNumber = Math.ceil(myJsonVideo.length/config.pageSize);
  showPaginationControler();
  showPaginationData(config.toPage, config.pageSize);
}
function showPaginationControler() {
  const paginationul = document.querySelector("#pagination-control-button");
  paginationul.innerHTML += '<li class="page-item"><a class="page-link">&laquo;</a></li>';
  for (var i = 0; i < pageNumber; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    var num = i+1
    a.innerText = num;
    a.classList.add("page-link");
    if (!config.toPage) {
      config.toPage = 1 ;
    }
    if (i == config.toPage-1) {
      li.classList.add("active");
    }
    li.classList.add("page-item");
    li.appendChild(a);
    paginationul.appendChild(li);
  }
  paginationul.innerHTML += '<li class="page-item"><a class="page-link">&raquo;</a></li>';
  // pageControl.innerHTML += '<input type="number" name="pagination-control-gotopage" id="pagination-control-gotopage" class="form-control">';
}
function clickPaginationControl(e) {
  e.preventDefault();
  const item = e.target;
  const num = item.innerText;
  if (num == "«") {
    if (config.toPage > 1) {
      window.location.href = "./?p="+(config.toPage-1)+"&"+"pageSize="+config.pageSize;
    }
  }else if (num == "»") {
    if (config.toPage < pageNumber) {
      window.location.href = "./?p="+(config.toPage+1)+"&"+"pageSize="+config.pageSize;
    }
  }else {
    window.location.href = "./?p="+num+"&"+"pageSize="+config.pageSize;
  }
}

function showPaginationData(page_idx, page_size) {
  // fixme: check page_idx range
  for (let i=0; i<page_size; i++) {
    let vidx = (page_idx-1)*page_size + i;
    if (vidx >= myJsonVideo.length) {
      break;
    }
    // generate video link
    let videoIframe;
    if (myJsonVideo[vidx].videoPlatform == "youtube") {
      videoIframe = generateYoutubeEmbedHtml(myJsonVideo[vidx].videoID);
    }
    let videoTitle = '<div class="videoTitle">'+myJsonVideo[vidx].videoTitle+'</div>';
    let imgsrc;
    if (!myJsonVideo[vidx].imgsrc) {
      imgsrc = "./alsonow_icon.png";
    }else {
      imgsrc = myJsonVideo[vidx].imgsrc;
    }
    let userName = '<div class="userName">'+myJsonVideo[vidx].userName+'</div>';
    let tags = '<div class="tags">'+myJsonVideo[vidx].tags.join(",")+'</div>';
    let fullScreenButton;
    if (config.pageSize == 1) {
      fullScreenButton = '<button class="btn btn-primary" onclick="toggleFullScreen()">toggle full screen</button>';
    }
    pageData.innerHTML += '<div class="videoAndDescriptionDiv">'+videoTitle+"<hr>"+videoIframe+'<img src='+imgsrc+' class="userImg" width=50px>'+userName+tags+fullScreenButton+'</div>';
  }
}
// function showPaginationData() {
//   if (config.toPage && config.pageSize) {
//     var before = (config.toPage-1)*config.pageSize+1;
//     var after = (config.toPage*config.pageSize);
//     var lastPage = myJsonVideo.length%config.pageSize;
//     var mymath = Math.floor(myJsonVideo.length/config.pageSize);
//   }
//   for (var i = before-1 ; i < after; i++) {
//     const videoDiv = document.createElement("div");
//     videoDiv.classList.add("videoDiv");
//     if (myJsonVideo[i].videoPlatform == "youtube") {
//       var videoIframe = generateYoutubeEmbedHtml(myJsonVideo[i].videoID);
//     }
//     videoDiv.innerHTML += videoIframe;
//     pageData.innerHTML += videoDiv;
//   }
// }
function generateYoutubeEmbedHtml(url) {
  let myID = url.split("https://youtu.be/");
  let iframe = '<div class="videoDiv"><iframe src="https://www.youtube-nocookie.com/embed/'+myID[1]+'" class="responsive-iframe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
  return iframe;
}
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen && config.pageSize == 1) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  body.classList.toggle("full-screen-mode-div");
}
// function fullScreen() {
//   var elem = document.getElementsByClassName("videoAndDescriptionDiv")[0];
//   if (elem.requestFullscreen && config.pageSize == 1) {
//     elem.requestFullscreen();
//   } else if (elem.msRequestFullscreen) {
//     elem.msRequestFullscreen();
//   } else if (elem.mozRequestFullScreen) {
//     elem.mozRequestFullScreen();
//   } else if (elem.webkitRequestFullscreen) {
//     elem.webkitRequestFullscreen();
//   }
//   const mydiv = document.querySelector(".videoAndDescriptionDiv");
//   mydiv.classList.toggle("full-screen-mode");
// }
