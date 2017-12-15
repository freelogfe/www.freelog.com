export default {
    name: 'contract-steps',

    data() {
        return {}
    },
    props: {
        step: {
            type: Number,
            default() {
                return 0
            }
        }
    },
    mounted() {
        console.log('mounted')
        console.log(this.step)
    },
    methods: {}
}