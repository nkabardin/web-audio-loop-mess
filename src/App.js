import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import BassLoop from './bass.mp3';
import BeatLoop from './beat.mp3';
import Texture1 from './texture1.mp3';
import Texture2 from './texture2.mp3';
import Tone from 'tone';


import seb from './seb';

const evelopeSettings = {"attack": 0.1,
	"decay": 0.4,
	"sustain": 2.0,
	"release": 0.8}

let envelope1;
let envelope2;
let envelope3;
let envelope4;


let playerBassLoop;
let playerBeatLoop;
let playerTexture1;
let playerTexture2

let initEverything = () => {
  envelope1 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();

  playerBassLoop = new Tone.Player({
    "url" : BassLoop,
    "autostart" : false,
    "loop": true,
    "volume": 0,
    "onload": () => playerBassLoop.start()
  }).connect(envelope1)

  envelope2 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();

  playerBeatLoop = new Tone.Player({
    "url" : BeatLoop,
    "autostart" : false,
    "loop": true,
    "volume": 0,
    "onload": () => playerBeatLoop.start()
  }).connect(envelope2)

  envelope3 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();

  playerTexture1 = new Tone.Player({
    "url" : Texture1,
    "autostart" : false,
    "loop": true,
    "volume": 0,
    "onload": () => playerTexture1.start()
  }).connect(envelope3)

  envelope4 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();


  playerTexture2 = new Tone.Player({
    "url" : Texture2,
    "autostart" : false,
    "loop": true,
    "volume": 0,
    "onload": () => playerTexture2.start()
  }).connect(envelope4)

}

class LoopPlayer {
  constructur(loop) {}
}

let started = false;

const init = () => {
  initEverything();

  started = true;

  function step(timestamp) {
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

const onMessage = (message) => {
  if(!started) {
    return
  }

  const data = JSON.parse(message.data)

  seb(data);

  console.log(data.event)
  if (data.event === "job_updated") {
    envelope4.triggerAttackRelease('4t')
  }

  if (data.event === "job_finished") {
    envelope3.triggerAttackRelease('4t')
  }

  if (data.event === "build") {
    envelope2.triggerAttackRelease('4t')
  }

  if (data.event === "job") {
    envelope1.triggerAttackRelease('4t')
  }
}

const ws = new WebSocket("wss://travis.durieux.me");
ws.onmessage = onMessage;


function App() {
  useEffect(() => {

  })
  return (
    <div className="App">
      <button style={{fontSize: '50px'}} onClick={() => init()}>run it</button>
    </div>
  );
}

export default App;
