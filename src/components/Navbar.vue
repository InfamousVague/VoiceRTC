<template>
  <div id="navbar">
    <h3>VoiceRTC <span class="small">by RetroPronghorn</span></h3>
    <span class="nav-button">
        <i class="icon icon-minus" id="minimize"></i>
    </span>
    <span class="nav-button">
        <i class="nav-button icon icon-cross" id="maximize"></i>
    </span>
  </div>
</template>
<script>
import InputMeter from './InputMeter.vue'

export default {
  name: 'settings',
  components: {
      InputMeter
  },
  methods: {
    async minimize() {
        // not yet
    }
  },
  async mounted() {

  }
}
</script>
<style>
    #navbar {
        z-index: 2;
        height: 24px;
        color: #fff;
        background: #19192d;
        text-align: right;
        position: relative;
        -webkit-user-select: none;
        -webkit-app-region: drag;
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
    .nav-button {
        font-size: 12px;
        margin-right: 0.5rem;
        -webkit-app-region: no-drag;
        cursor: pointer;
        z-index: 10;
    }
    #navbar h3 {
        position: absolute;
        font-weight: bold;
        left: 0.7rem;
        top: 0.3rem;
        font-size: 12px;
        -webkit-user-select: none;
        -webkit-app-region: drag;
    }
    .inactive {
        color: #fff;
    }
    .small {
        font-size: 8px;
        color: rgba(255,255,255,.7);
    }
    .nav-button:hover {
        cursor: pointer;
        color: yellowgreen;
    }
</style>