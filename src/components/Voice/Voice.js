export default {
    name: 'voice',
    props: [
        'peer',
        'peerIds',
        'muted',
        'bitrate',
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
            this.peer.on('call', (call) => {
                call.answer(this.audioStream)
                call.on('stream', (remoteStream) => {
                    this.playRemoteStream(remoteStream)
                })
                call.on('disconnected', () => {
                    console.log('disconnected from', call)
                })
            })
        },
        async connectToNewPeer(peerId) {
            this.calls[peerId] = this.peer.call(peerId, this.audioStream)
        },
        playRemoteStream(e) {
            this.audioStreams[e.id] = new Audio();
            this.audioStreams[e.id].muted = false;
            this.audioStreams[e.id].srcObject = e;
            this.audioStreams[e.id].play()
        },
        async updateAudioStream() {
            const device = this.audioInputDevices.filter(
                d => d.label === this.selectedInputDevice
            )[0]
            const constraints = {
                video: false,
                audio: {
                    deviceId: device.deviceId,
                    autoGainControl: false,
                    channelCount: 2,
                    echoCancellation: false,
                    latency: 0,
                    noiseSuppression: false,
                    sampleRate: parseInt(this.bitrate.replace('kbps', '000')),
                    sampleSize: 24,
                    volume: 1.0
                }
            }
            this.audioStream = await navigator.mediaDevices.getUserMedia(constraints)
        },
        async refresh() {
            this.disconnect()
            await this.updateAudioStream()
            this.peerIds.forEach(peerId => {
                this.connectToNewPeer(peerId)
            })
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
            immediate: true,
            handler: function(val, prevVal) {
                if (!prevVal) {
                    this.selectedInputDevice = val
                } else {
                    this.refresh()
                }
                // Disconnect from calls and re call using new devices
            }
        },
        selectedOutputDevice: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler: function(val) {
                this.selectedOutputDevice = val
                Object.keys(this.audioStreams).forEach(key => {
                    const audioDeviceId = this.audioOutputDevices.filter(
                        dev => dev.label === this.selectedOutputDevice
                    )[0]
                    this.audioStreams[key].setSinkId(audioDeviceId.deviceId)
                })
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