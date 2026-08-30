const fs = require("fs");
const buffer = fs.readFileSync("public/songs/dugga-ma.mp3");

// Very rough approximation for MP3 duration based on file size and 128kbps bitrate
// Duration (seconds) = Size (bytes) / (128000 bits/sec / 8 bits/byte)
const size = buffer.length;
const durationSeconds = Math.floor(size / 16000); 

const mins = Math.floor(durationSeconds / 60);
const secs = durationSeconds % 60;
console.log(`Estimated duration: ${mins}:${secs.toString().padStart(2, "0")}`);
