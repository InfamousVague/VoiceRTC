<template>
  <div id="qualitySelector">
    <div class="form-group">
        <select 
            class="form-input" 
            type="text" 
            id="input-example-1" 
            placeholder="Name" 
            :value="bitrate"
            v-on:change="qualityChanged($event.target.value)">
            <option :selected="bitrate === '8kbps'" value="8kbps">8kbps</option>
            <option :selected="bitrate === '48kbps'" value="48kbps">48kbps</option>
            <option :selected="bitrate === '96kbps'" value="96kbps">96kbps</option>
            <option :selected="bitrate === '192kbps'" value="192kbps">192kbps</option>
            <option :selected="bitrate === '240kbps'" value="240kbps">240kbps</option>
            <option :selected="bitrate === '320kbps'" value="320kbps">320kbps</option>
            <option :selected="bitrate === '420kbps'" value="420kbps">420kbps</option>
        </select>
    </div>
  </div>
</template>
<script src="./QualitySelector.js"></script>
<style>
    @import url("./QualitySelector.css");
</style>