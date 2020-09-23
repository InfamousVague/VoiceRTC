<template>
    <div id="settings">
        <InputMeter v-bind:level="level" />
        <div class="form-group">
            <label class="form-label" for="input-example-1">Input Device</label>
            <select 
                class="form-input" 
                type="text" 
                id="input-example-1" 
                placeholder="Name" 
                v-model="selectedInputDevice"
                v-on:change="inputDeviceChanged">
                <option v-for="device in audioInputDevices" v-bind:key="device.deviceId">{{device.label}}</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label" for="input-example-1">Output Device</label>
            <select 
                class="form-input" 
                type="text" 
                id="input-example-1" 
                placeholder="Name"
                v-model="selectedOutputDevice"
                v-on:change="outputDeviceChanged">
                <option v-for="device in audioOutputDevices" v-bind:key="device.deviceId">{{device.label}}</option>
            </select>
        </div>
        <br>
                <!--
        <button class="btn btn-lg btn-success" id="dc">Connect</button>        -->
        <button 
            class="btn btn-lg btn-error" 
            id="dc"
            v-on:click="disconnect">Disconnect</button>
    </div>
</template>
<script>
import InputMeter from './InputMeter.vue'
let audioContext = new AudioContext()
let analyser = audioContext.createAnalyser()

export default {
  name: 'settings',
  props: ['disconnect'],
  components: {
      InputMeter
  },
  data: function () {
    return {
      level: {
          average: 3
      },
      selectedInputDevice: localStorage.getItem('selectedInputDevice') || false,
      selectedOutputDevice: localStorage.getItem('selectedOutputDevice') || false,
      audioInputDevices: [],
      audioOutputDevices: [],
      audioStream: { active: false },
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
    async connectMicrophone() {
        const constraints = {
            audio: { 
                deviceId: this.audioInputDevices.filter(d => d.label === this.selectedInputDevice)[0].deviceId
            }
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        this.audioStream = stream
    },
    inputDeviceChanged() {
        localStorage.selectedInputDevice = this.selectedInputDevice
        this.checkInputLevels()
    },
    outputDeviceChanged() {
        localStorage.selectedOutputDevice = this.selectedOutputDevice
    },
    async checkInputLevels() {
        let microphone = audioContext.createMediaStreamSource(this.audioStream)
        this.javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 2048;

        microphone.connect(analyser);
        analyser.connect(this.javascriptNode);
        this.javascriptNode.connect(audioContext.destination);

        this.javascriptNode.onaudioprocess = () => {
            var array =  new Uint8Array(analyser.frequencyBinCount);
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
    await this.connectMicrophone()
    this.checkInputLevels()
  }
}
</script>
<style>
    #settings {
        width: 82.5%;
        margin-top: 0.7rem;
        margin-left: calc(8.5%);
        text-align: left;
    }
    #settings .btn-group {
        width: 100%;
    }
    #settings select {
        width: 100%;
    }
    #dc {
        width: 100%;
    }
</style>