<template>
    <div class="peer-connector">
      <small class="muted" v-if="peer">
        <span v-if="peer.open">
          <i class="fa fa-plug"></i> Connected
        </span>
        <span v-if="peer.disconnected">
          <i class="fa fa-times"></i> Disconnected
        </span>
        <span v-if="!peer.open && !peer.disconnected">
          <i class="fa fa-spin fa-spinner"></i> Connecting...
        </span>
        <i class="fa fa-bolt"></i> {{peer.options.host}}
        <span v-if="peer.options.secure">
          <i class="fa fa-lock"></i> Secured
        </span>
      </small>
    </div>
</template>
<script>
// import Peer from 'peerjs'

export default {
  name: 'peerhost',
  props: ['peer', 'isHost'],
  methods: {
    async connect() {
      // console.log(this.peer)
    },
    async setupHost() {
      // console.log('im a host')
    }
  },
  async mounted() {
    await this.connect()
    if (this.isHost) 
      await this.setupHost()
  }
}
</script>
<style>
  .peer-connector {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    background: transparent;
    z-index: 100;
    padding: 0.2rem;
  }
  .muted {
    color: rgba(255,255,255,0.6);
  }
  .green {
    color: greenyellow;
  }
</style>