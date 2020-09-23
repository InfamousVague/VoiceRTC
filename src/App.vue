<template>
  <div id="app">
    <Navbar />
    <div class="container main-container">
      <div class="columns">
        <div class="column col-xs-12 main" v-if="activeConnection">
          <Voice :clientIds="clientIds" :muted="muted"/>
          <div id="header">
            <Users :peerCount="peerCount"/>
            <span v-if="host" class="conntype label label-primary">Host</span>
            <span v-else class="conntype label label-primary">Client</span>
            <Mic :muted="muted" :togglemute="togglemute" :peer="peer" :connected="connected" />
            <div id="code">
                <h5>Room Code</h5>
                <h3>{{roomCode}}</h3>
            </div>
            <Stats :uptime="uptime" :latency="latency"/>
          </div>
          <canvas v-if="activeConnection" class="section__canvas" id="canvas" resize></canvas>
          <div id="body">
            <Settings :disconnect="disconnect" :host="host" />
          </div>
          <div>
            <Peer :peer="peer" :host="host" />
          </div>
        </div>
        <Landing 
          v-else
          v-model="roomCode" 
          :joinHost="joinHost" 
          :createHost="createHost"
          :roomCode="roomCode"
          v-on:update:roomCode="roomCode = $event"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Settings from './components/Settings.vue'
import Peer from './components/Peer.vue'
import Users from './components/Users.vue'
import Mic from './components/Mic.vue'
import Stats from './components/Stats.vue'
import Landing from './components/Landing.vue'
import Voice from './components/Voice.vue'

import randomString from 'random-string'
import paper from 'paper'
import PeerJS from 'peerjs'
import moment from 'moment'
// Sounds
const joinAudio = new Audio('sounds/user-join.ogg')
const leaveAudio = new Audio('sounds/user-left.ogg')
const connectedAudio = new Audio('sounds/connected.ogg')
const muteAudio = new Audio('sounds/mute.ogg')
const unmuteAudio = new Audio('sounds/unmute.ogg')


export default {
  name: 'app',
  components: {
    Navbar,
    Settings,
    Users,
    Mic,
    Stats,
    Landing,
    Peer,
    Voice
  },
  data: () => {
    return {
      connected: false,
      activeConnection: false,
      connectedAt: false,
      uptime: 0,
      host: false,
      clients: [],
      clientIds: [],
      hostConn: false,
      muted: false,
      peerCount: 1,
      updateInterval: false,
      peer: false,
      roomCode: '',
      latency: {
        start: 0,
        stop: 0,
        time: 0
      }
    }
  },
  methods: {
    togglemute() {
      this.muted = !this.muted
      if (this.muted) {
        muteAudio.play()
      } else {
        unmuteAudio.play()
      }
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
          closed: true
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
    updateUptime() {
      this.updateInterval = setInterval(() => {
        this.uptime = moment.unix(((Date.now() - this.connectedAt) / 1000)).format('m;s:').replace(';','m ').replace(':', 's')
        if (this.hostConn) this.ping()
      }, 1000)
    },
    connect(host = false, cb = () => {}) {
      this.activeConnection = true
      this.host = host
      this.peer = new PeerJS(randomString({length: 7}))
      if (host) this.roomCode = this.peer.id
      this.peer.on('open', () => {
          connectedAudio.play()
          this.connectedAt = Date.now()
          this.updateUptime()
          this.peer.on('connection', (conn) => {
            this.handleNewPeer(conn)
            conn.on('data', (data) => {
              this.parsePeerMessage(data, conn)
            })
          })
          cb()
      })
      setTimeout(() => {
        this.blob()
      }, 10)
    },
    createHost() {
      this.connect(true, () => {
        this.connected = true
      })
    },
    joinHost() {
      this.connect(false, () => {
        this.hostConn = this.peer.connect(this.roomCode)
        // on open will be launch when you successfully connect to PeerServer
        this.hostConn.on('open', () => {
          // here you have conn.id
          this.connected = true
          this.hostConn.on('data', (data) => {
            this.parseHostMessage(data)
          })
        })
      })
    },
    handleNewPeer(conn) {
      this.peerCount = this.peerCount + 1
      this.clients.push(conn)
      this.clientIds = this.clients.map(c => c.peer)
      joinAudio.play()
      conn.on('open', () => {
        this.broadcastToPeers(
          JSON.stringify({
            type: 'clients_changed',
            data: this.clients.map(c => c.peer)
          })
        )
      })
    },
    handlePeerLeft(conn) {
      this.peerCount = this.peerCount - 1
      this.clients = this.clients.filter(c => c.peer !== conn.peer)
      this.clientIds = this.clients.map(c => c.peer)
      leaveAudio.play()
      this.broadcastToPeers(
        JSON.stringify({
          type: 'clients_changed',
          data: this.clients.map(c => c.peer)
        })
      )
    },
    broadcastToPeers(message) {
      this.clients.forEach(c => {
        c.send(message)
      })
    },
    disconnect() {
      clearInterval(this.updateInterval)
      leaveAudio.play()
      if (this.hostConn) this.hostConn.send(JSON.stringify({type: 'disconnect'}))
      if (!this.hostConn) this.broadcastToPeers(JSON.stringify({type: 'disconnect'}))
      this.peer.disconnect()
      this.peer = false
      this.activeConnection = false
      this.roomCode = ''
      this.latency.time = 0
    },
    ping() {
      this.latency.start = Date.now()
      this.hostConn.send(JSON.stringify({type: 'ping'}))
    },
    parsePeerMessage(message, conn) {
      const msg = JSON.parse(message)
      switch(msg.type) {
        case 'disconnect':
          this.handlePeerLeft(conn)
          break;
        case 'ping':
          conn.send(JSON.stringify({
            type: 'pong'
          }))
          break;
        default:
          break;
      }
    },
    parseHostMessage(message) {
      const msg = JSON.parse(message)
      switch(msg.type) {
        case 'disconnect':
          this.disconnect()
          break;
        case 'pong':
          this.latency.stop = Date.now()
          this.latency.time = this.latency.stop - this.latency.start
          break;
        case 'clients_changed':
          if (msg.data.length + 1 > this.peerCount) 
            joinAudio.play()
          this.peerCount = msg.data.length + 1
          this.clientIds = msg.data
          this.ping()
          break;
        default:
          break;
      }
    },
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
