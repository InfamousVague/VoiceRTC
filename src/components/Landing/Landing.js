export default {
    name: 'stats',
    props: ['createHost', 'roomCode', 'joinHost'],
    methods: {
        updateValue: function(value) {
            this.$emit('roomCode', value);
        }
    }
}