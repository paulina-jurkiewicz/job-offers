<template>
    <div class="job-header" v-bind:class="variant">
        <div class="job-header__logo">
            <g-company-logo-rounded :logoUrl="companyLogoUrl" :name="companyName"/>
        </div>

        <div class="job-header__content">
            <g-button-prev @onClickGoBack="onClickGoBack"/>

            <g-job-offer-salary-with-period :salary="jobSalary" variant="secondary" />

            <g-job-offer-title :title="jobTitle" variant="secondary"/>

            <g-company-full-location :location="companyLocation"/>

            <g-label-rounded :value="$t('job-offer.interview_online')" variant="info" v-if="jobInterviewOnline"/>

            <g-label-rounded :value="$t('job-offer.remote')" variant="primary" v-if="jobRemote"/>
        </div>
    </div>
</template>

<style lang="scss" src="./JobOfferHeader.scss" scoped />

<script lang="ts" src="./JobOfferHeader.ts" />
