<template>
    <figure class="image__wrapper" v-lazyload>
        <ImageSpinner class="image__spinner" />

        <img :alt="alt" :data-src="source" class="image__item" src="">

        <slot></slot>
    </figure>
</template>

<style lang="scss" scoped src="./LazyImage.scss"></style>

<script lang="ts" src="./LazyImage.ts"></script>
