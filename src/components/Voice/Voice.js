export default {
    name: 'voice',
    props: [
        'peer',
        'peerIds',
        'muted',
        'registerDisconnect',
        'selectedInputDevice',
        'selectedOutputDevice',
        'domElementCleanup'
    ],
    data: function() {
        return {
            calls: {},
            audioStream: {},
            audioInputDevices: [],
            audioOutputDevices: [],
            audioStreams: []
        }
    },
    methods: {
        async getAudioDevices() {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const audioInputDevices = devices.filter(d => d.kind === 'audioinput')
            const audioOutputDevices = devices.filter(d => d.kind === 'audiooutput')
            this.audioInputDevices = audioInputDevices
            this.audioOutputDevices = audioOutputDevices
        },
        listenForCalls() {
            // console.log('listen to peer', peer)
            this.peer.on('call', (call) => {
                call.answer(this.audioStream)
                call.on('stream', (remoteStream) => {
                    this.playRemoteStream(remoteStream)
                })
            })
        },
        async connectToNewPeer(peerId) {
            this.calls[peerId] = this.peer.call(peerId, this.audioStream)
            this.calls[peerId].on('stream', (remoteStream) => {
                console.log('call answered')
                console.log('remoteStream', remoteStream)
                    //this.playRemoteStream(remoteStream)
            })
            console.log('peerId', peerId)
        },
        playRemoteStream(e) {
            this.audioStreams[e.id] = new Audio();
            this.audioStreams[e.id].muted = false;
            this.audioStreams[e.id].srcObject = e;
            this.audioStreams[e.id].play()
        },
        async updateAudioStream() {
            const constraints = {
                video: false,
                audio: {
                    //TODO: use selected device
                    deviceId: this.audioInputDevices[1].deviceId
                }
            }
            this.audioStream = await navigator.mediaDevices.getUserMedia(constraints)
        },
        disconnect() {
            Object.keys(this.calls).forEach(callId => {
                this.calls[callId].close()
            })
            this.domElementCleanup(this.audioStreams)
            this.calls = []
            this.audioStreams = []
        }
    },
    watch: {
        peerIds: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler: function(val, prevVal) {
                const newPeers = prevVal ?
                    val.map(v => {
                        if (prevVal.indexOf(v) === -1) return v
                    }).filter(v => v != undefined) : val

                newPeers.forEach(p => {
                    if (p != this.peer.id)
                        this.connectToNewPeer(p)
                })
            }
        },
        selectedInputDevice: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler: function(val) {
                console.log('input changed', val)
                this.selectedInputDevice = val
                    // Disconnect from calls and re call using new devices
            }
        },
        selectedOutputDevice: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler: function(val) {
                this.selectedOutputDevice = val
                Object.keys(this.audioStreams).forEach(key => {
                    const audioDeviceId = this.audioOutputDevices.filter(dev => dev.label === this.selectedOutputDevice)[0]
                    console.log('audioDevice', audioDeviceId)
                    this.audioStreams[key].setSinkId(audioDeviceId.deviceId)
                })
                console.log('output changed', val)
            }
        }
    },
    async mounted() {
        await this.getAudioDevices()
        await this.updateAudioStream()
        this.listenForCalls()
        this.registerDisconnect(this.disconnect)
    }
}