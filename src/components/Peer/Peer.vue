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
        <span>
          <i class="fas fa-server spacer"></i> {{peer.options.host}}
        </span>
        <span v-if="peer.options.secure">
          <i class="fa fa-lock spacer"></i> Secured
          <span class="spacer"></span>
        </span>
      </small>
    </div>
</template>
<script src="./Peer.js"></script>
<style>
  @import url("./Peer.css");
</style>