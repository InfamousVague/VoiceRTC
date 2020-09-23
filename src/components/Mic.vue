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
<script>
export default {
  name: 'app',
  props: ['muted', 'togglemute', 'peer']
}
</script>
<style>
  .pulse-button {
    position: absolute;
    left: calc(50% - 10px);
    width: 20px;
    height: 20px;
    border: none;
    top: 3.5rem;
    box-shadow: 0 0 0 0 rgba(255,255,255,0.75);
    border-radius: 50%;
    background-size:cover;
    background-repeat: no-repeat;
    cursor: pointer;
    -webkit-animation: pulse 4.25s infinite cubic-bezier(0.06, 0, 0, 1);
  }

  .pulse-button-red {
    box-shadow: 0 0 0 0 #e67e22;
  }
  .pulse-button i {
    position: absolute;
    top: -0.4rem;
    left: -0.15rem;
  }
  #mic {
    padding-top: 1rem;
    font-size: 40px;
    margin: 0;
    color: #fff;
    text-align: center;
  }
  * > .fa-hover-show,
  *:hover > .fa-hover-hidden {
    display: none;
  }
  *:hover > .fa-hover-show {
    display: inline-block;
  }
</style>