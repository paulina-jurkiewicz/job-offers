<template>
    <section>
        <b-container v-bind:class="{ 'is-loading': isLoading }">
            <g-filters />

            <div class="jobs__content">
                <nuxt-child v-if="jobOffersLength"/>
            </div>
        </b-container>
    </section>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
