<template>
    <div class="column col-xs-12 main padded">
      <h5>Create Chat</h5>
      <p>
        <small>Create a chat and invite people to chat. Connections are peer 2 peer, the person with the best connection should host.</small>
      </p> 
      <button 
        class="btn btn-lg btn-success" 
        id="dc"
        v-on:click="createHost">Create Room</button>
      <br>
      <br>
      <hr class="break">
      <br>
      <h5>Join Chat</h5>
      <p>
        <small>Enter a chat code provided from a friend to connect and chat.</small>
      </p>
      <div class="form-group">
        <input 
          class="form-input" 
          type="text" 
          id="input-example-1" 
          v-bind:value="roomCode"  
          v-on:input="$emit('update:roomCode', $event.target.value)"
          placeholder="Enter Room Code">
      </div>
      <button v-if="roomCode.length === 7" class="btn btn-lg btn-success" id="dc" v-on:click="joinHost">Connect</button>
      <button v-else disabled class="btn btn-lg btn-success" id="dc" v-on:click="joinHost">Connect</button>
    </div> 
</template>
<script src="./Landing.js"></script>