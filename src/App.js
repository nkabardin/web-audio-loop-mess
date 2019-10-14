import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import BassLoop from './bass.mp3';
import BeatLoop from './beat.mp3';
import Texture1 from './texture1.mp3';
import Texture2 from './texture2.mp3';
import Sergey1 from './sergey1.mp3'
import Sergey2 from './sergey2.mp3'
import Sergey3 from './sergey3.mp3'
import Radio1 from './radio1.mp3';
import Radio2 from './radio2.mp3';
import Radio3 from './radio3.mp3';
import Radio4 from './radio4.mp3';
import Radio5 from './radio5.mp3';
import Tone from 'tone';


import seb from './seb';

const evelopeSettings = {
  "attack": 1,
	"decay": 2,
	"sustain": 3,
	"release": 10
}

class LoopPlayer {
  constructor(url) {
    this.envelope = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();
    this.player = new Tone.Player({
      "url" : url,
      "autostart" : true,
      "loop": true,
      "volume": 0,
    }).connect(this.envelope)
  }

  play(mod) {
    if (this.player.loaded === true) {
      this.envelope.triggerAttackRelease('5');
    }

  }
}

const radio1 = new LoopPlayer(Radio1);
const radio2 = new LoopPlayer(Radio2);
const radio3 = new LoopPlayer(Radio3);
const radio4 = new LoopPlayer(Radio4);
const radio5 = new LoopPlayer(Radio5);

const radios = [radio1, radio2, radio3, radio4, radio5]

const sergey1 = new LoopPlayer(Sergey1);
const sergey2 = new LoopPlayer(Sergey2);
const sergey3 = new LoopPlayer(Sergey3);

const sergeys = [sergey1, sergey2, sergey3]

const getRandomRadio = () => radios[Math.floor(Math.random()*radios.length)];
const getRandomSergey = () => sergeys[Math.floor(Math.random()*sergeys.length)];

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

let started = false;

let frames = 0;
let updates = 0;
let finishes = 0;
let builds = 0;
let jobs = 0;

const hej = (a, b, c, d) => {
  console.log(a, b, c, d)
  if (a > 10) {
    getRandomRadio().play()
  }

  if (a > 20) {
    getRandomSergey().play()
  }

  if (b > 1) { 
    envelope4.triggerAttackRelease(2)
  }

  if (c > 2) {
    envelope3.triggerAttackRelease(2)
  }

  if (d > 2) {
    envelope2.triggerAttackRelease(2)
  }

  if (d > 20) {
    getRandomSergey().play()
  }
}

const init = () => {
  initEverything();

  started = true;

  function step(timestamp) {
    frames += 1;
    if (frames === 100) {
      frames = 0;
      hej(updates, finishes, builds, jobs);
      updates = 0;
      finishes = 0;
      builds = 0;
      jobs = 0;
    }
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}



const onMessage = (message) => {
  if(!started) {
    return
  }

  const data = JSON.parse(message.data)


  const mod = data.data.id ? (data.data.id % 100) : 0;

  seb(data);

  if (data.event === "job_updated") {
    updates += 1;
  }

  if (data.event === "job_finished") {
    finishes += 1;
  }

  if (data.event === "build") {
    builds += 1
  }

  if (data.event === "job") {
    jobs += 1;
  }
}

const ws = new WebSocket("wss://travis.durieux.me");
ws.onmessage = onMessage;


function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="App">

      { !started && <button style={{fontSize: '50px'}} onClick={() => {setStarted(true); init()}}>run it</button> }
    </div>
  );
}

export default App;
