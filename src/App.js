import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import BassLoop from './bass.mp3';
import BeatLoop from './beat.mp3';
import Texture1 from './texture1.mp3';
import Texture2 from './texture2.mp3';
import Tone from 'tone';

const evelopeSettings = {"attack": 0.1,
	"decay": 0.4,
	"sustain": 2.0,
	"release": 0.8}

const envelope1 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();

const playerBassLoop = new Tone.Player({
  "url" : BassLoop,
  "autostart" : false,
  "loop": true,
  "volume": 0
}).connect(envelope1)

const envelope2 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();


const playerBeatLoop = new Tone.Player({
  "url" : BeatLoop,
  "autostart" : false,
  "loop": true,
  "volume": 0
}).connect(envelope2)

const envelope3 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();

const playerTexture1 = new Tone.Player({
  "url" : Texture1,
  "autostart" : false,
  "loop": true,
  "volume": 0
}).connect(envelope3)

const envelope4 = new Tone.AmplitudeEnvelope(Object.assign({}, evelopeSettings)).toMaster();


const playerTexture2 = new Tone.Player({
  "url" : Texture2,
  "autostart" : false,
  "loop": true,
  "volume": 0
}).connect(envelope4)

const play = () => {
  playerBassLoop.start(1)
  playerBeatLoop.start(1)
  playerTexture1.start(1)
  playerTexture2.start(1)
}

class LoopPlayer {
  constructur(loop) {}
}

const init = () => {
  function step(timestamp) {
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}


function App() {
  useEffect(() => {
    init();
  })
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          onClick={() => play()}
          href="#"
        >
          play dis shit
        </a>
        <div style={{
          cursor: "pointer",
          width: "100px",
          height: "100px",
          backgroundColor: "#430578"
        }}
        onClick={() => {envelope1.triggerAttackRelease('4t')}}> </div>
        <div style={{
          cursor: "pointer",
          width: "100px",
          height: "100px",
          backgroundColor: "#111439"
        }}
        onClick={() => {envelope2.triggerAttackRelease('4t')}}> </div>
        <div style={{
          cursor: "pointer",
          width: "100px",
          height: "100px",
          backgroundColor: "#FFC0C0"
        }}
        onClick={() => {envelope3.triggerAttackRelease('4t')}}> </div>
        <div style={{
          cursor: "pointer",
          width: "100px",
          height: "100px",
          backgroundColor: "#12F0C5"
        }}
        onClick={() => {envelope4.triggerAttackRelease('4t')}}> </div>
      </header>
    </div>
  );
}

export default App;
