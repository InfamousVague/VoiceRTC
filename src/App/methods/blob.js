import paper from 'paper'

export function blob() {
    /* ====================== *
     *  0. Initiate Canvas    *
     * ====================== */
    paper.install(window)
    paper.setup(document.getElementById("canvas"))

    var wave;
    var segmentAmount = 4;
    var waveHeight = 4;

    function initiateWave() {
        // eslint-disable-next-line
        wave = new Path({
            fillColor: '#19192d',
            strokeColor: '#19192d',
            strokeWidth: 5,
            closed: true
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