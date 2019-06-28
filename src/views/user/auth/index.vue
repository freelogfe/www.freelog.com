<template>
    <UserAuthority/>
</template>

<script>
    import UserAuthority from '@/components/UserAuthority/index.vue';

    export default {
        name: "auth",
        components: {
            UserAuthority,
        },
        methods:{
            loginSuccess() {
                console.log('loginSuccessloginSuccessloginSuccess');
            }
        }

    }
</script>

<style scoped>

</style>
