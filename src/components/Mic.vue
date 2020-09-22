<template>
    <div v-if="peer && peer.open">
      <h3 id="mic" class="pulse-button" v-if="!muted" v-on:click="togglemute">
        <i class="fa fa-microphone fa-hover-hidden"></i>
        <i class="fa fa-microphone-slash fa-hover-show red" style="margin-left: -3px;"></i>
      </h3>
      <h3 id="mic" class="pulse-button pulse-button-red" v-else v-on:click="togglemute">
        <i class="fa fa-microphone fa-hover-show" style="color: #fff;"></i>
        <i class="fa fa-microphone-slash fa-hover-hidden red" style="margin-left: -3px;"></i>
      </h3>
    </div>
    <div v-else>
      <h3 id="mic" class="pulse-button" style="box-shadow:none;">
        <i class="fa fa-refresh fa-spin" style="color:#fff;"></i>
      </h3>
    </div>
</template>
<script>
export default {
  name: 'app',
  props: ['muted', 'togglemute', 'peer']
}
</script>
<style>
  #mic {
    padding-top: 1rem;
    font-size: 40px;
    margin: 0;
    color: #fff;
  }
  * > .fa-hover-show,
  *:hover > .fa-hover-hidden {
    display: none;
  }
  *:hover > .fa-hover-show {
    display: inline-block;
  }
</style>