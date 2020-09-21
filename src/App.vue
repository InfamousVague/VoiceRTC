<template>
  <div id="app">
    <Navbar />
    <div class="container main-container">
      <div class="columns">
        <div class="column col-xs-12 main">
          <div id="header">
            <div class="popover popover-bottom">
              <button class="popover-button">
                5 <i class="fa fa-user-plus"></i>
              </button>
              <div class="popover-container">
                <div class="card">
                  <div class="card-body">
                    <ul>
                      <li><i class="fa fa-times red"></i> RetroPronghorn</li>
                      <li><i class="fa fa-times red"></i> JeromeASF</li>
                      <li><i class="fa fa-times red"></i> Sitemusic88</li>
                      <li><i class="fa fa-times red"></i> Cappy B</li>
                      <li><i class="fa fa-times red"></i> Dropsy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <h3 id="mic" class="pulse-button">
              <i class="fa fa-microphone fa-hover-hidden"></i>
              <i class="fa fa-microphone-slash fa-hover-show" style="margin-left: -3px;"></i>
            </h3>
            <h6>Latency: 50ms</h6>
            <h6>Uptime: 5hr 30m 2s</h6>
          </div>
          <canvas class="section__canvas" id="canvas" resize></canvas>
          <div id="body">
            <Selector />
            <Settings />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Selector from './components/Selector.vue'
import Settings from './components/Settings.vue'
import paper from 'paper'

export default {
  name: 'app',
  components: {
    Navbar,
    Selector,
    Settings
  },
  methods: {
    blob() {
      /* ====================== *
      *  0. Initiate Canvas    *
      * ====================== */
      paper.install(window)
      paper.setup(document.getElementById("canvas"))
      /* ====================== *
      *                        *
      * ====================== */
      var wave;
      var segmentAmount = 4;
      var waveHeight = 4;

      function initiateWave() {
        // eslint-disable-next-line
        wave = new Path({
          fillColor: '#19192d',
          strokeColor: '#19192d',
          strokeWidth: 5,
          closed: true,
        });
        for (var i = 0; i <= segmentAmount; i++) {
          // eslint-disable-next-line
          wave.add(new Point((i / segmentAmount) * view.size.width, view.size.height));
        }
        // Complete Shape
        // eslint-disable-next-line
        wave.add(new Point(view.size.width, view.size.height));
        // eslint-disable-next-line
        wave.add(new Point(0, view.size.height));
      }
      initiateWave();


      /* ====================== *
      * Animation              *
      * ====================== */
      // eslint-disable-next-line
      view.onFrame = function(event) {
        for (var i = 0; i <= segmentAmount; i++) {
          var segment = wave.segments[i];
          var sinus = Math.sin(event.time * 2 + i);
          segment.point.y = sinus * waveHeight + 30;
        }
        wave.smooth();
      }
      // eslint-disable-next-line
      view.onResize = function() {
        wave.remove();
        initiateWave();
      };
    }
  },
  mounted () {
    this.blob()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}
#header {
  height: 400px;
  width: calc(100% + 16px);
  background: #19192d;
  margin: 0 -8px;
  padding-top: 4.5rem;
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
}
* > .fa-hover-show,
*:hover > .fa-hover-hidden {
  display: none;
}
*:hover > .fa-hover-show {
  display: inline-block;
}
.red {
  color: #e85600;
  cursor: pointer;
}
ul {
  margin: 0;
  padding: 0;
  text-align: left;
  cursor: default;
}
li {
  font-size: 14px;
  display: block;
}
.popover {
  position: absolute;
  right: 0.8rem;
  top: 1.8rem;
}
.popover-container {
  position: relative;
  right: 0;
  margin-left: 0rem;
  width: 180px;
}
.popover-button {
  color: #fff;
  background: transparent;
  border: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}
.card {
  background-color: #19192d;
  width: 180px;
}
.main-container {
  height: 100%;
}
.main-container .columns {
  height: 100%;
}
.main {
  background: #19192d;
  height: 100%;
}
.settings { 
  background: #23252f;
}
#mic {
  padding-top: 1rem;
  font-size: 40px;
  margin: 0;
}
#canvas{
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
}
#body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 45%
}
#invite {
  position: absolute;
  right: 1rem;
  top: 1.8rem;
  color: #fff;
  font-size: 20px;
  -webkit-transition: color 200ms linear;
}
#invite:hover {
  cursor: pointer;
  color: #eee;
}
.pulse-button {
  position: absolute;
  left: calc(50% - 10px);
  width: 20px;
  height: 20px;
  border: none;
  top: 3.5rem;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background-size:cover;
  background-repeat: no-repeat;
  cursor: pointer;
  -webkit-animation: pulse 2.25s infinite cubic-bezier(0.66, 0, 0, 1);
}
.pulse-button i {
  position: absolute;
  top: -0.4rem;
  left: -0.15rem;
}

@-webkit-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
@-moz-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
@-ms-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
@keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
</style>
