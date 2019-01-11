const fs = require('fs');
const readline = require('readline');

const id = process.argv[2];
const rl = readline.createInterface({
  input: fs.createReadStream(`./public/resources/${id}/subtitle.txt`)
});

const ws = fs.createWriteStream(`./public/resources/${id}/subtitle.json`);

const sentences = [
  {
    startTime: 0,
    endTime: 0,
    content: []
  }
];
let startTime;
let endTime;
let i = 0;
rl.on('line', line => {
  if (line.match(/^\d+$/)) {
    i++;
    return;
  } else if (line === '') {
    return;
  } else if (line.includes('-->')) {
    const reg = /^(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})$/;
    const matches = line.match(reg);

    if (matches && matches.length >= 3) {
      startTime = parseToSecond(matches[1]);
      endTime = parseToSecond(matches[2]);
      sentences[i] = {
        startTime,
        endTime,
        content: []
      };
    }
    return;
  } else {
    if (sentences[i]) {
      sentences[i].content.push(line);
    }
  }
});

rl.on('close', () => {
  ws.write(JSON.stringify(sentences, null, 4));
  ws.close();
});

function parseToSecond(time) {
  const matches = time.match(/^(\d{2}):(\d{2}):(\d{2}),(\d{3})$/);
  if (matches && matches.length == 5) {
    const hour = parseInt(matches[1]);
    const minute = parseInt(matches[2]);
    const second = parseInt(matches[3]);
    const ms = parseInt(matches[4]);
    return (hour * 3600 + minute * 60 + second + ms / 1000).toFixed(3) * 1;
  }
}
