<template>
    <div class="card" v-bind:class="className">
        <slot name="icon"></slot>

        <slot name="content"></slot>

        <slot name="footer"></slot>
    </div>
</template>

<style lang="scss" src="./Card.scss" scoped />

<script lang="ts" src="./Card.ts" />
