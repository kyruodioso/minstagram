document.addEventListener('DOMContentLoaded', () => {
  const startCameraButton = document.getElementById('startCamera');
  const video = document.getElementById('video');
  const captureImageButton = document.getElementById('captureImage');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const postText = document.getElementById('postText');
  const dateTimeDisplay = document.getElementById('dateTimeDisplay');
  const imageInput = document.getElementById('imageInput');

  

  let stream;

  // Solicitar permiso para acceder a la cámara
  async function startCamera() {
      try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          startCameraButton.style.display = 'none';
      } catch (error) {
          console.error('Error al acceder a la cámara:', error);
      }
  }

  // Capturar imagen desde la cámara o cargar imagen desde el dispositivo
  function captureImage() {
      if (stream) {
          // Capturar imagen desde la cámara
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
      } else if (imageInput.files.length > 0) {
          // Cargar imagen desde el dispositivo
          const file = imageInput.files[0];
          const reader = new FileReader();
          reader.onload = function (event) {
              const img = new Image();
              img.src = event.target.result;
              img.onload = function () {
                  context.drawImage(img, 0, 0, canvas.width, canvas.height);
              };
          };
          reader.readAsDataURL(file);
      }

      // Obtener la fecha y hora actual
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
      dateTimeDisplay.textContent = `${formattedDate}`;
  }

  // Event listeners
  startCameraButton.addEventListener('click', startCamera);
  captureImageButton.addEventListener('click', captureImage);
  imageInput.addEventListener('change', captureImage);
});

//Manejo de api



