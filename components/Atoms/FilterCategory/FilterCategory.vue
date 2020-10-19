<template>
    <div class="category" v-bind:class="[{'is-selected': isSelected}, categoryVariant]">
        <template v-if="isDefaultOption"><i>{{ category }}</i></template>

        <template v-else><i v-bind:class="iconClassName"></i></template>

        <span>{{ category }}</span>
    </div>
</template>

<style lang="scss" scoped src="./FilterCategory.scss"></style>

<script lang="ts" src="./FilterCategory.ts"></script>
