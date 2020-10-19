<template>
    <div class="job-offer">
        <g-job-offer-header :job="job" :variant="jobVariant" @onClickGoBack="onClickShowJobOffersList"/>

        <g-job-offer-details :companySize="companySize" :companyName="companyName"
        :contractType="contractType" :seniority="jobLevel" :createdAt="jobDateCreated"/>

        <g-job-offer-content :jobContent="jobContent" />
    </div>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
