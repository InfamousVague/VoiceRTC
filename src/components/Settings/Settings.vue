<template>
    <div id="settings">
        <InputMeter v-bind:level="level" :muted="muted"/>
        <div class="form-group">
            <label class="form-label" for="input-example-1">Input Device</label>
            <select 
                class="form-input" 
                type="text" 
                id="input-example-1" 
                placeholder="Name" 
                v-model="selectedInputDevice"
                v-on:change="inputDeviceChanged">
                <option v-for="device in audioInputDevices" v-bind:key="device.deviceId">{{device.label}}</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label" for="input-example-1">Output Device</label>
            <select 
                class="form-input" 
                type="text" 
                id="input-example-1" 
                placeholder="Name"
                v-model="selectedOutputDevice"
                v-on:change="outputDeviceChanged">
                <option v-for="device in audioOutputDevices" v-bind:key="device.deviceId">{{device.label}}</option>
            </select>
        </div>
        <br>
        <button 
            class="btn btn-lg btn-error" 
            id="dc"
            :disabled="disconnecting"
            v-on:click="disconnect">
            <span v-if="!disconnecting">
                <small><i class="fas fa-phone-slash"></i></small>
                Disconnect
            </span>
            <span v-else>
                <small><i class="fas fa-circle-notch fa-spin"></i></small>
                Disconnecting...
            </span>
        </button>
    </div>
</template>
<script src="./Settings.js"></script>
<style>
    @import url("./Settings.css");
</style>