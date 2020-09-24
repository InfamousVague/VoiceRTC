<template>
    <div v-if="peer && peer.open">
      <h3 id="mic" class="pulse-button" v-if="!muted" v-on:click="togglemute">
        <i class="fas fa-microphone-alt fa-hover-hidden"></i>
        <i class="fa fa-microphone-alt-slash fa-hover-show" style="margin-left: -11.4px;"></i>
      </h3>
      <h3 id="mic" class="pulse-button pulse-button-red" v-else v-on:click="togglemute">
        <i class="fas fa-microphone-alt fa-hover-show red"></i>
        <i class="fas fa-microphone-alt-slash fa-hover-hidden red" style="margin-left: -11.4px;"></i>
      </h3>
    </div>
    <div v-else>
      <h3 id="mic" class="pulse-button" style="box-shadow:none;">
        <i class="fas fa-circle-notch fa-spin" style="margin-left: -5.4px; color: #fff;"></i>
      </h3>
    </div>
</template>
<script src="./Mic.js"></script>
<style>
  @import url('./Mic.css');
</style>