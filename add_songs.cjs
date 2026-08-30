const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "src/components/SongListPopup.jsx");
let content = fs.readFileSync(filePath, "utf8");

let newSongs = "";
for (let i = 1; i <= 100; i++) {
  newSongs += `    { id: ${100 + i}, title: 'Demo Song ${11 + i}', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },\n`;
}

content = content.replace(
  "    { id: 10, title: 'Chogada', artist: 'Loveyatri', duration: '4:16', cover: '/chogada-cover.jpg', src: '/songs/chogada.mp3' },\n  ];",
  "    { id: 10, title: 'Chogada', artist: 'Loveyatri', duration: '4:16', cover: '/chogada-cover.jpg', src: '/songs/chogada.mp3' },\n" + newSongs + "  ];"
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Done adding 100 demo songs!");
