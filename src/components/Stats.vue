<template>
    <p id="stats">
      <span>Uptime</span><br>
      <b>{{uptime}}</b><br>
      <span v-if="latency.time !== 0">
        <span>Latency</span><br>
        <b>{{latency.time}}ms</b>
      </span>
    </p>  
</template>
<script>

export default {
  name: 'stats',
  props: ['uptime', 'latency', 'host']
}
</script>
<style>
  #stats {
    position: absolute;
    top: 4.5rem;
    left: 1.5rem;
    font-size: 12px;
    margin: 0;
    padding: 0;
    margin-top: -0.88rem;
    text-align: left;
  }
</style>