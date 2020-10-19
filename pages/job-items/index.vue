<template>
    <div>
        <template v-if="jobs">
            <g-job-item v-for="( job, index ) in jobs" :key="index" :job="job" @on-click-job-offer="onClickJobOffer"/>
        </template>
    </div>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
