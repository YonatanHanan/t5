import React, { Component } from 'react';
import './App.css';
const Whammy = window.Whammy;

const FONT_SIZE = 48;
const WIDTH_MARGIN = 5;

const stringToRows = (context, string) => {
  let rows = [];
  const width = context.canvas.width;
  const splitString = string.split(" ");
  let end = splitString.length;
  let start = end - 1;

  let row = splitString.slice(start, end).join(" ");
  let rowWidth = context.measureText(row).width + WIDTH_MARGIN;

  while (end > 0 && start > -1) {
    while (rowWidth < width && start > -1 && end > 0) {
      let temprow = splitString.slice(start, end).join(" ");
      rowWidth = context.measureText(temprow).width + WIDTH_MARGIN;
      if (rowWidth < width && start > -1 && end > 0) {
        row = temprow;
        start--;
      }
    }
    rows.push(row);
    end = start + 1;
    rowWidth = 0;
    row = "";
  }
  return rows;
};

const drawRows = (context, rows) => {
  context.fillStyle = "#1f202245";
  context.fillRect(0, context.canvas.height - ((rows.length - 1) * FONT_SIZE) - 30, context.canvas.width, context.canvas.height);

  context.fillStyle = "white";

  rows.slice(0, rows.length - 1).forEach((row, index) => {
    context.direction = 'rtl';

    context.fillText(row, context.canvas.width - WIDTH_MARGIN, context.canvas.height - (index * FONT_SIZE) - 20);
  });

  context.font = `800 ${FONT_SIZE + 10}px Assistant`;
  context.fillText(rows[rows.length - 1], context.canvas.width - WIDTH_MARGIN, context.canvas.height - (rows.length * FONT_SIZE) + 20);
};

class App extends Component {
  componentDidMount() {
    let slides = [
      {
        text: "מדריד: המלכה האם של ערי ספרד",
        img: 'https://images.pexels.com/photos/2120101/pexels-photo-2120101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      }, {
        text: "ולנסיה: כמו ברצלונה רק בלי העומס של התיירים",
        img: 'https://images.pexels.com/photos/2100387/pexels-photo-2100387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      },
      {
        text: "פלמה דה מיורקה: המלדיבים של ספרד",
        img: 'https://images.pexels.com/photos/2113368/pexels-photo-2113368.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      }, {
        text: "סיביליה: ללמוד פלמנקו במקום הכי טוב בעולם",
        img: 'https://images.pexels.com/photos/2097103/pexels-photo-2097103.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      },
      {
        text: "סן סבסטיאן: חופים, נופים ומאכלים שתמצאו רק בחבל הבאסקים",
        img: 'https://images.pexels.com/photos/2111987/pexels-photo-2111987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      }
    ];

    var img = new Image();
    var c = document.getElementById("canvas");
    c.width = 470;     // update canvas size to match image
    c.height = 500;
    let ctx = c.getContext("2d");

    img.onload = function () {
      ctx.drawImage(this, 0, 0, c.width, c.height);       // draw in image
      c.toBlob(function (blob) {        // get content as JPEG blob
        // here the image is a blob
        //console.log(blob)
      }, "image/jpeg", 1);

      ctx.font = `400 ${FONT_SIZE}px Assistant`;
      ctx.fillStyle = "white";
      ctx.textBaseline = "bottom";

      ctx.direction = 'rtl';
      let string = slides[counter].text;
      let rows = stringToRows(ctx, string);
      rows.push(counter + 1);
      drawRows(ctx, rows);
    };
    img.crossOrigin = "";
    img.src = slides[0].img;
    let counter = 0;
    let play = true;

    let intervalId = setInterval(function () {
      img.src = slides[counter + 1].img;
      counter++;
      if (counter === 4) {
        clearInterval(intervalId);
        setTimeout(() => {
          play = false;
          encoder.compile(false, (output) => {
            var url = (window.webkitURL || window.URL).createObjectURL(output);
            document.getElementById('video').src = url;
          });
        }, 5000);
      }
    }, 5000);

    var encoder = new Whammy.Video(25);
    encoder.add(ctx);
    var fps = 25;
    function animate() {
      encoder.add(ctx);
      if (play) {
      setTimeout(function () {
          requestAnimationFrame(animate);
        }, 1000 / fps);
      }
    }

    window.requestAnimationFrame(animate);

  }

  render() {
    return (
      <div className="App">
        <canvas id="canvas" dir="rtl"></canvas>
        <video id="video" controls autoPlay loop></video>
      </div>
    );
  }
}

export default App;
