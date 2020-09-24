import InputMeter from '../InputMeter/InputMeter.vue'
let audioContext = new AudioContext()
let analyser = audioContext.createAnalyser()

export default {
    name: 'settings',
    props: ['disconnect', 'muted', 'disconnecting'],
    components: {
        InputMeter
    },
    data: function() {
        return {
            level: {
                average: 3
            },
            selectedInputDevice: localStorage.getItem('selectedInputDevice') || false,
            selectedOutputDevice: localStorage.getItem('selectedOutputDevice') || false,
            audioInputDevices: [],
            stream: false,
            microphone: false,
            audioOutputDevices: [],
            javascriptNode: false
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
        inputDeviceChanged() {
            localStorage.selectedInputDevice = this.selectedInputDevice
            this.checkInputLevels()
        },
        outputDeviceChanged() {
            localStorage.selectedOutputDevice = this.selectedOutputDevice
        },
        async checkInputLevels() {
            if (this.microphone) this.microphone.disconnect()
            if (analyser) analyser.disconnect()
            if (this.javascriptNode) this.javascriptNode.disconnect()

            const constraints = {
                audio: {
                    deviceId: this.audioInputDevices.filter(d => d.label === this.selectedInputDevice)[0].deviceId
                }
            }
            this.stream = await navigator.mediaDevices.getUserMedia(constraints)
            this.microphone = audioContext.createMediaStreamSource(this.stream)
            this.javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)
            analyser.smoothingTimeConstant = 0.3;
            analyser.fftSize = 2048;

            this.microphone.connect(analyser);
            analyser.connect(this.javascriptNode);
            this.javascriptNode.connect(audioContext.destination);

            this.javascriptNode.onaudioprocess = () => {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;

                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += array[i];
                }

                var average = values / length;
                this.level = { average: average / 5 }
            }
        },
    },
    async mounted() {
        await this.getAudioDevices()
        this.selectedInputDevice = localStorage.getItem('selectedInputDevice') || this.audioInputDevices[0].label
        this.selectedOutputDevice = localStorage.getItem('selectedOutputDevice') || this.audioOutputDevices[0].label
        if (this.audioInputDevices.filter(d => d.label === this.selectedInputDevice).length === 0) {
            this.selectedInputDevice = this.audioInputDevices[0].label
            this.inputDeviceChanged()
        }
        if (this.audioOutputDevices.filter(d => d.label === this.selectedOutputDevice).length === 0) {
            this.selectedOutputDevice = this.audioOutputDevices[0].label
            this.outputDeviceChanged()
        }
        this.checkInputLevels()
    }
}