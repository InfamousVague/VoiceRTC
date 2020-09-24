<template>
    <div class="input-meter">
        <span class="input-label">Voice Level</span>
        <br>
        <div class="input-bars" v-if="!muted">
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
        <div v-else class="input-bars">
          <div v-for="item in 20" :key="item" class="input-bar muted-bar"></div>
        </div>
    </div>
</template>
<script src="./InputMeter.js"></script>
<style scoped>
  @import url(./InputMeter.css);
</style>