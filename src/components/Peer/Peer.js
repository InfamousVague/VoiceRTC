export default {
    name: 'peerhost',
    props: ['peer', 'isHost'],
    methods: {
        async connect() {
            // console.log(this.peer)
        },
        async setupHost() {
            // console.log('im a host')
        }
    },
    async mounted() {
        await this.connect()
        if (this.isHost)
            await this.setupHost()
    }
}