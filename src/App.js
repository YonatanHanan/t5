import React, { Component } from 'react';
import Slide from './components/Slide';
import SlideShow from './components/SlideShow';
import './App.css';
const RecordRTC = window.RecordRTC;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: []
    };
  }

  componentDidMount() {
    let slides = [
      {
        text: "מדריד: המלכה האם של ערי ספרד",
        img: 'https://images.pexels.com/photos/2120101/pexels-photo-2120101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        length: 5,
        drawn: false,
        index: 0
      }, {
        text: "ולנסיה: כמו ברצלונה רק בלי העומס של התיירים",
        img: 'https://images.pexels.com/photos/2100387/pexels-photo-2100387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        length: 5,
        drawn: false,
        index: 1
      },
      {
        text: "פלמה דה מיורקה: המלדיבים של ספרד",
        img: 'https://images.pexels.com/photos/2113368/pexels-photo-2113368.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        length: 5,
        drawn: false,
        index: 2
      }, {
        text: "סיביליה: ללמוד פלמנקו במקום הכי טוב בעולם",
        img: 'https://images.pexels.com/photos/2097103/pexels-photo-2097103.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        length: 5,
        drawn: false,
        index: 3
      },
      {
        text: "סן סבסטיאן: חופים, נופים ומאכלים שתמצאו רק בחבל הבאסקים",
        img: 'https://images.pexels.com/photos/2111987/pexels-photo-2111987.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        length: 5,
        drawn: false,
        index: 4
      }
    ];
    const SlideShow = this.refs.SlideShow;

    SlideShow.componentDidMount = () =>{
      SlideShow.Clear();
    }

    SlideShow.Start(slides.map(slide => {
      return new Slide(slide);
    }));
    /*let img = new Image();
    let canvas = document.getElementById("canvas");
    var AudioContext = window.AudioContext || window.webkitAudioContext;

    let audioCtx = new AudioContext();
    var gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = 0; // don't play for self
    let recorder = {};
    getData((audioStream) => {

      var finalStream = new MediaStream();
      window.getTracks(audioStream, 'audio').forEach(function (track) {
        finalStream.addTrack(track);
      });
      window.getTracks(canvas.captureStream(), 'video').forEach(function (track) {
        finalStream.addTrack(track);
      });

      console.log(finalStream)

      recorder = RecordRTC(finalStream, {
        type: 'video',
        mimeType: 'video/webm;codecs=h264',
      });
      //recorder.startRecording();
    });

    function getData(callback) {
      let source = audioCtx.createBufferSource();

      var myRequest = new Request('music.mp3');

      fetch(myRequest).then(function (response) {
        return response.arrayBuffer();
      }).then(function (buffer) {
        audioCtx.decodeAudioData(buffer, function (decodedData) {
          source.buffer = decodedData;

          source.start(0, 0 / 1000);
          source.connect(gainNode);
          source.loop = true;

          var destination = audioCtx.createMediaStreamDestination();
          source.connect(destination);
          callback(destination);
        });
      });
    };

    let ctx = canvas.getContext("2d");

    img.onload = function () {
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);       // draw in image
      ctx.font = `400 ${FONT_SIZE}px Assistant`;
      ctx.fillStyle = "white";
      ctx.textBaseline = "bottom";

      ctx.direction = 'rtl';
      let string = slides[counter].text;
      let rows = stringToRows(ctx, string, WIDTH_MARGIN);
      rows.push(counter + 1);
      drawRows(ctx, rows);
    };
    img.crossOrigin = "";
    img.src = slides[0].img;
    let counter = 0;

    let intervalId = setInterval(function () {
      img.src = slides[counter + 1].img;
      counter++;
      if (counter === 4) {
        clearInterval(intervalId);
        setTimeout(() => {
          /*encoder.compile(false, (output) => {
            var url = (window.webkitURL || window.URL).createObjectURL(output);
            document.getElementById('video').src = url;
          });*/
    /*recorder.stopRecording(function (url) {
      console.log(url)
      //window.open(url);
      document.body.innerHTML = '<video controls src="' + url + '" autoplay loop></video>';

    });
  }, 5000);
}
}, 5000);*/
  }

  render() {
    return (
      <div className="App">
        <SlideShow ref="SlideShow" width={470} height={500} fontSize={48} widthMargin={5} />
      </div>
    );
  }
}

export default App;
