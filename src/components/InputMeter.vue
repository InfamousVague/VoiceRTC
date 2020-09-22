<template>
    <div class="input-meter">
        <span class="input-label">Voice Level</span>
        <br>
        <div class="input-bars">
          <div v-bind:class="level.average >= 1 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 2 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 3 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 4 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 5 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 6 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 7 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 8 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 9 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 10 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 11 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 12 ? 'input-bar green-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 13 ? 'input-bar yellow-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 14 ? 'input-bar yellow-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 15 ? 'input-bar yellow-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 16 ? 'input-bar yellow-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 17 ? 'input-bar yellow-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 18 ? 'input-bar red-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 19 ? 'input-bar red-bar' : 'input-bar'"></div>
          <div v-bind:class="level.average >= 20 ? 'input-bar red-bar input-bar-last' : 'input-bar input-bar-last'"></div>
       </div>
    </div>
</template>
<script>
export default {
  name: 'app',
  props: ['level']
}
</script>
<style>
  .input-meter {
    width: calc(100% + 0.3rem);
    margin-left: -0.3rem;
    height: 18px;
    margin-bottom: 1.5rem;
  }
  .input-bars {
    height: 100%;
  }
  .input-label {
    float: left;
    padding-left: 0.4rem;
  }
  .input-bar {
    width: 3.5%;
    height: 100%;
    background: #2f2f57;
    float: left;
    margin-left: 1.5%;
    border-radius: 3px;
    border: 1px solid #000;
  }
  .green-bar {
    background-color: springgreen;
  }
  .yellow-bar {
    background-color: yellow;
  }
  .red-bar {
    background-color: red;
  }
</style>