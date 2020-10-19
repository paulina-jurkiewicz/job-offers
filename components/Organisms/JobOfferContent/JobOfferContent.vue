<template>
    <g-card>
        <template v-slot:content>
            <div v-html="jobContent"/>
        </template>
    </g-card>
</template>

<style lang="scss" src="./JobOfferContent.scss" scoped />

<script lang="ts" src="./JobOfferContent.ts" />
