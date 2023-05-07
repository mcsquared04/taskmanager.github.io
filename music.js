// nintendo source: https://youtu.be/PrVgdrsp-b8
// ghibli source: https://youtu.be/uCHuTxVYtsk 
// new jeans jazz source: https://youtu.be/xRqPBkklonM

// Create new audio objects for each audio file
const audio1 = new Audio('nintendo.mp3');
const audio2 = new Audio('ghibli.mp3');
const audio3 = new Audio('new-jeans-jazz.mp3');

// Get references to each button
const music1Btn = document.getElementById('music1');
const music2Btn = document.getElementById('music2');
const music3Btn = document.getElementById('music3');

// Add event listeners to each button to play the corresponding audio file
music1Btn.addEventListener('click', function() {
  audio1.play();
});

music2Btn.addEventListener('click', function() {
  audio2.play();
});

music3Btn.addEventListener('click', function() {
  audio3.play();
});
