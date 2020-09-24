export default {
    name: 'voice',
    props: ['peerIds', 'muted'],
    data: function() {
        return {
            nope: false
        }
    },
    methods: {
        connectToNewPeer(peerId) {
            // Connect
            // Call
            console.log('peerId', peerId)
        },
        disconnectFromPeer(peerId) {
            // End Call
            console.log('peerId', peerId)

        }
    },
    watch: {
        peerIds: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler: (val) => {
                // do your stuff
                console.log('peerIds are ', val)
            }
        }
    },
    async mounted() {
        console.log('peerIds', this.peerIds)
    }
}