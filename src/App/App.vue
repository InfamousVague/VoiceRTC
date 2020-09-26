<template>
  <div id="app">
    <Navbar />
    <div class="container main-container">
      <div v-if="callEnded">
        <div id="callEndedFace"></div>
        <div id="callEnded">
          <h1><i class="fas fa-skull"></i></h1>
          <h5>Host Left.</h5>
          <button 
            class="btn btn-lg btn-primary" 
            id="dc"
            v-on:click="confirmCallEnded">
            Alright
          </button>
        </div>
      </div>
      <div class="columns">
        <div class="column col-xs-12 main" v-if="activeConnection">
          <Voice 
            v-if="activeConnection && selectedInputDevice && selectedOutputDevice"
            :peer="peer" 
            :bitrate="bitrate"
            :peerIds="peerIds" 
            :muted="muted"
            :selectedInputDevice="selectedInputDevice"
            :selectedOutputDevice="selectedOutputDevice"
            :registerDisconnect="setVoiceDCHandler"
            :domElementCleanup="domElementCleanup" />
          <div id="header">
            <Users :peerIds="peerIds"/>
            <span v-if="host" class="conntype label label-primary">Host</span>
            <span v-else class="conntype label label-primary">Client</span>
            <Mic :muted="muted" :togglemute="togglemute" :peer="peer" :connected="connected" />
            <QualitySelector 
              :bitrate="bitrate"
              :qualityChanged="qualityChanged" />
            <div id="code">
                <h5>Room Code</h5>
                <h3>{{roomCode}}</h3>
            </div>
            <Stats :uptime="uptime" :latency="latency"/>
          </div>
          <canvas v-if="activeConnection" class="section__canvas" id="canvas" resize></canvas>
          <div id="body">
            <Settings 
              :disconnect="disconnect" 
              :host="host" 
              :muted="muted" 
              :hoistSelectedInput="hoistSelectedInput"
              :hoistSelectedOutput="hoistSelectedOutput"
              :disconnecting="disconnecting" />
          </div>
          <div>
            <Peer :peer="peer" :host="host" />
          </div>
        </div>
        <Landing 
          v-else
          v-model="roomCode" 
          :joinHost="joinHost" 
          :createHost="createHost"
          :roomCode="roomCode"
          v-on:update:roomCode="roomCode = $event"/>
      </div>
    </div>
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
