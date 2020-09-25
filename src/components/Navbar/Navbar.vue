<template>
  <div id="navbar">
    <h3>VoiceRTC <span class="small"><span style="color:red;">BETA</span> by RetroPronghorn</span></h3>
    <span class="nav-button" v-on:click="minimize">
        <i class="icon icon-minus" id="minimize"></i>
    </span>
    <span class="nav-button" v-on:click="close">
        <i class="nav-button icon icon-cross" id="maximize"></i>
    </span>
  </div>
</template>
<script src="./Navbar.js"></script>
<style>
    @import url("./Navbar.css");
</style>