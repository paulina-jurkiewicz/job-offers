<template>
    <div>
        <main class="layout-desktop">
            <nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
        </main>
    </div>
</template>

<style lang="scss" src="../assets/scss/6-page/base.scss"></style>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    @Component( {
        transition: 'page',
        components: {  },
        head() {
            return {
                bodyAttrs: {
                    class: 'layout-desktop'
                }
            }
        }
    } )
    export default class extends Vue {
        data() {
            return {
                assetsVersion: process.env.assetsVersion,
                country: this.$store.state.country
            };
        }
    }
</script>
