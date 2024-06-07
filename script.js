let classifier;
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/WXzsavL4D/';

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  noCanvas();
  const uploadButton = select('#uploadButton');
  uploadButton.mousePressed(classifyUploadedImage);
}

function classifyUploadedImage() {
  const input = document.getElementById('imageUpload').files[0];
  if (input) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function() {
        const uploadedImage = document.getElementById('uploadedImage');
        const resultLabel = document.getElementById('resultLabel');

        uploadedImage.src = img.src;
        classifier.classify(img, function(err, results) {
          if (err) {
            console.error(err);
            return;
          }
          resultLabel.innerHTML = `${results[0].label}: ${results[0].confidence.toFixed(2)}`;
          document.getElementById('resultCard').style.display = 'block';
        });
      };
    };
    reader.readAsDataURL(input);
  }
}

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json', modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
}
