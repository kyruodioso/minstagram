'use strict'

window.onload=()=>{
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureImage = document.getElementById("captureImage");
    const errorMsgElement = document.querySelector('span#errorMsg');
    
    const constraints = {
      audio: false,
      video: {
        width: 250, height: 220
      }
    };
    
    //init webcam
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
      } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
      }
    }
    
    function handleSuccess(stream) {
      window.stream = stream;
      video.srcObject = stream;
    }
    
    init();
    
    var context = canvas.getContext('2d');
    captureImage.addEventListener("click", function() {
            context.drawImage(video, 0, 0, 250, 220);
    });
}