<template>
  <div id="app">
    <Navbar />
    <div class="container main-container">
      <div class="columns">
        <div class="column col-xs-12 main" v-if="activeConnection">
          <div id="header">
            <Users />
            <span v-if="host" class="conntype label label-primary">Host</span>
            <span v-else class="conntype label label-primary">Client</span>
            <Mic :muted="muted" :togglemute="togglemute" :peer="peer" />
            <div id="code">
                <h5>Room Code</h5>
                <h3>{{roomCode}}</h3>
            </div>
            <p id="stats">
              <span>Uptime</span><br>
              <b>{{uptime}}</b>
            </p>  
          </div>
          <canvas v-if="activeConnection" class="section__canvas" id="canvas" resize></canvas>
          <div id="body">
            <Settings :disconnect="disconnect" />
          </div>
          <div v-if="host">
            <Peer :peer="peer" :isHost="host"/>
          </div>
        </div>
        <div class="column col-xs-12 main padded" v-else>
          <h5>Create Chat</h5>
          <p>
            <small>Your chat will be hosted off your connection so consider this when chosing your desired audio quality.</small>
          </p>
          <button 
            class="btn btn-lg btn-success" 
            id="dc"
            v-on:click="createHost">Create Room</button>
          <br>
          <br>
          <hr class="break">
          <br>
          <h5>Join Chat</h5>
          <p>
            <small>Enter a chat code provided from a friend to connect and chat.</small>
          </p>
          <div class="form-group">
            <input class="form-input" type="text" id="input-example-1" v-model="roomCode" placeholder="Room Code">
          </div>
          <button class="btn btn-lg btn-success" id="dc" v-on:click="joinHost">Connect</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Selector from './components/Selector.vue'
import Settings from './components/Settings.vue'
import Peer from './components/Peer.vue'
import Users from './components/Users.vue'
import Mic from './components/Mic.vue'

import randomString from 'random-string'
import paper from 'paper'
import PeerJS from 'peerjs'
import moment from 'moment'
// Sounds
const joinAudio = new Audio('sounds/user-join.ogg')
const leaveAudio = new Audio('sounds/user-left.ogg')
const connectedAudio = new Audio('sounds/connected.ogg')

export default {
  name: 'app',
  components: {
    Navbar,
    Selector,
    Settings,
    Users,
    Mic,
    Peer
  },
  data: () => {
    return {
      activeConnection: false,
      connectedAt: false,
      uptime: 0,
      host: false,
      muted: false,
      updateInterval: false,
      peer: false,
      roomCode: ''
    }
  },
  methods: {
    togglemute() {
      this.muted = !this.muted
    },
    blob() {
      /* ====================== *
      *  0. Initiate Canvas    *
      * ====================== */
      paper.install(window)
      paper.setup(document.getElementById("canvas"))
      /* ====================== *
      *                        *
      * ====================== */
      var wave;
      var segmentAmount = 4;
      var waveHeight = 4;

      function initiateWave() {
        // eslint-disable-next-line
        wave = new Path({
          fillColor: '#19192d',
          strokeColor: '#19192d',
          strokeWidth: 5,
          closed: true,
        });
        for (var i = 0; i <= segmentAmount; i++) {
          // eslint-disable-next-line
          wave.add(new Point((i / segmentAmount) * view.size.width, view.size.height));
        }
        // Complete Shape
        // eslint-disable-next-line
        wave.add(new Point(view.size.width, view.size.height));
        // eslint-disable-next-line
        wave.add(new Point(0, view.size.height));
      }
      initiateWave();


      /* ====================== *
      * Animation              *
      * ====================== */
      // eslint-disable-next-line
      view.onFrame = function(event) {
        for (var i = 0; i <= segmentAmount; i++) {
          var segment = wave.segments[i];
          var sinus = Math.sin(event.time * 2 + i);
          segment.point.y = sinus * waveHeight + 30;
        }
        wave.smooth();
      }
      // eslint-disable-next-line
      view.onResize = function() {
        wave.remove();
        initiateWave();
      };
    },
    connect(host = false) {
      this.activeConnection = true
      this.host = host
      this.peer = new PeerJS(randomString({length: 7}))
      this.roomCode = this.peer.id
      this.peer.on('open', () => {
          connectedAudio.play()
          this.connectedAt = Date.now()
          this.updateUptime()
      })
      setTimeout(() => {
        this.blob()
      }, 10)
    },
    createHost() {
      this.connect(true)
    },
    joinHost() {
      this.connect(false)
    },
    updateUptime() {
      this.updateInterval = setInterval(() => {
        this.uptime = moment.unix(((Date.now() - this.connectedAt) / 1000)).format('m;s:').replace(';','m ').replace(':', 's')
      }, 1000)
    },
    disconnect() {
      clearInterval(this.updateInterval)
      leaveAudio.play()
      this.peer.disconnect()
      this.peer = false
      this.activeConnection = false
    }
  },
  mounted () {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}
#header {
  height: 200px;
  width: calc(100% + 16px);
  background: #19192d;
  margin: 0 -8px;
  padding-top: 4.5rem;
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
}
#code {
  position: absolute;
  top: 6.5rem;
  left: 0;
  right: 0;
  text-align: center;
}
#code h5 {
  font-size: 12px;
  line-height: 0;
  color:#fff;
}
#code h3{
  color: #fff;
  font-weight: bold;
  font-size: 26px;
}
#stats {
  position: absolute;
  top: 4.5rem;
  left: 1.5rem;
  font-size: 12px;
  margin: 0;
  padding: 0;
  margin-top: -0.88rem;
}
hr {
  border: none;
  border-top: 1px solid #2f2f57;
}
.conntype {
  position: absolute;
  top: 2rem;
  left: 1.5rem;
}
.padded {
  padding: 2rem;
}
.red {
  color: #e85600;
  cursor: pointer;
}
.main-container {
  height: 100%;
}
.main-container .columns {
  height: 100%;
}
.main {
  background: #19192d;
  height: 100%;
}
.settings { 
  background: #23252f;
}
#canvas{
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  width: 100%;
}
#body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 40%
}
.form-input {
  background: #2f2f57;
  border: 1px solid #000;
  color: #fff;
}
.input-label {
  font-size: 17px;
  display: inline-block;
  width: 100%;
}

@-webkit-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
@-moz-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
@-ms-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
@keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
</style>
