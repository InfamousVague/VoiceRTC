const { remote } = window.require("electron")

export default {
    name: 'settings',
    components: {},
    data() {
        return {
            w: remote.getCurrentWindow()
        }
    },
    methods: {
        minimize() {
            // not yet
            this.w.minimize()
        },
        close() {
            this.w.close()
        }
    },
    async mounted() {

    }
}