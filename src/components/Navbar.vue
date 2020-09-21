<template>
  <div id="navbar">
    <h3><i class="fa fa-wifi inactive"></i> &nbsp; VoiceRTC</h3>
    <i class="nav-button icon icon-minus"></i>
    <i class="nav-button icon icon-cross"></i>
  </div>
</template>
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
</style>