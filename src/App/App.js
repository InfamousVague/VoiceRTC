import Navbar from '../components/Navbar/Navbar.vue'
import Landing from '../components/Landing/Landing.vue'
import Mic from '../components/Mic/Mic.vue'
import Users from '../components/Users/Users.vue'
import Stats from '../components/Stats/Stats.vue'
import Settings from '../components/Settings/Settings.vue'
import Voice from '../components/Voice/Voice.vue'
import Peer from '../components/Peer/Peer.vue'

import randomString from 'random-string'
import PeerJS from 'peerjs'
import moment from 'moment'

// Sounds
const joinAudio = new Audio('sounds/user-join.ogg')
const leaveAudio = new Audio('sounds/user-left.ogg')
const connectedAudio = new Audio('sounds/connected.ogg')
const muteAudio = new Audio('sounds/mute.ogg')
const unmuteAudio = new Audio('sounds/unmute.ogg')

// Imported Methods
import { blob } from './methods/blob'

Array.prototype.unique = function() {
    var a = this.concat()
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1)
        }
    }
    return a
}

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
            // UI
            callEnded: false,
            disconnecting: false,
            connected: false,
            activeConnection: false,
            muted: false,
            // Stats
            connectedAt: false,
            uptime: 0,
            host: false,
            latency: {
                start: 0,
                stop: 0,
                time: 0
            },
            // Connections
            clients: [],
            peerIds: [],
            peer: false,
            hostConn: false,
            updateInterval: false,
            roomCode: ''
        }
    },
    methods: {
        // ----------------
        // UI
        // ----------------
        togglemute() {
            this.muted = !this.muted
            if (this.muted) {
                muteAudio.play()
            } else {
                unmuteAudio.play()
            }
        },
        blob() {
            // Imported
            blob()
        },
        confirmCallEnded() {
            this.callEnded = false
        },
        updateUptime() {
            this.updateInterval = setInterval(() => {
                this.uptime = moment.unix(((Date.now() - this.connectedAt) / 1000))
                    .format('m;s:')
                    .replace(';', 'm ')
                    .replace(':', 's')
                if (this.hostConn) this.ping()
            }, 1000)
        },
        // ----------------
        // Peer Connections
        // ----------------
        connect(host = false, cb = () => {}) {
            this.activeConnection = true
            this.host = host
            this.peer = new PeerJS(randomString({ length: 7 }))
            this.peerIds = [this.peer.id]

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
        // ----------------
        // Peer Setup
        // ----------------
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
        // ------------------
        // Handle Connections
        // ------------------
        handleNewPeer(conn) {
            this.clients = [...this.clients, conn].unique()
            this.peerIds = [...this.clients.map(c => c.peer), this.peer.id].unique()
            joinAudio.play()
            conn.on('open', () => {
                this.broadcastToPeers(
                    JSON.stringify({
                        type: 'clients_changed',
                        data: this.peerIds
                    })
                )
            })
        },
        handlePeerLeft(conn) {
            this.clients = this.clients.filter(c => c.peer !== conn.peer)
            this.peerIds = [...this.clients.map(c => c.peer), this.peer.id].unique()
            leaveAudio.play()
            this.broadcastToPeers(
                JSON.stringify({
                    type: 'clients_changed',
                    data: this.peerIds
                })
            )
        },
        broadcastToPeers(message) {
            this.clients.forEach(c => {
                c.send(message)
            })
        },
        // ----------------
        // Parse Messages
        // ----------------
        parsePeerMessage(message, conn) {
            const msg = JSON.parse(message)
            switch (msg.type) {
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
            switch (msg.type) {
                case 'disconnect':
                    this.disconnect()
                    this.callEnded = true
                    break;
                case 'pong':
                    this.latency.stop = Date.now()
                    this.latency.time = this.latency.stop - this.latency.start
                    break;
                case 'clients_changed':
                    if (!this.clientIds || msg.data.length + 1 > this.clientIds.length)
                        joinAudio.play()
                    this.peerIds = this.peerIds.concat(msg.data).unique()
                    this.ping()
                    break;
                default:
                    break;
            }
        },
        // ------------------
        // Misc
        // ------------------
        cleanup() {
            this.disconnecting = false
            this.peer.disconnect()
            this.activeConnection = false
            this.peerIds = []
            this.roomCode = ''
            this.latency.time = 0
            this.peer = false
            clearInterval(this.updateInterval)
        },
        disconnect() {
            leaveAudio.play()
            if (this.hostConn) this.hostConn.send(JSON.stringify({ type: 'disconnect' }))
            if (!this.hostConn) this.broadcastToPeers(JSON.stringify({ type: 'disconnect' }))
                // We're giving some time here for users to disconnect, if they take longer than 1000ms
                // to leave, they are currently a lost cause...
            this.disconnecting = true
            setTimeout(this.cleanup, 1000)
        },
        ping() {
            this.latency.start = Date.now()
            this.hostConn.send(JSON.stringify({ type: 'ping' }))
        },
    }
}