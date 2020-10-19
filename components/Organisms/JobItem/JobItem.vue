<template>
    <div class="job-offer" v-bind:class="jobVariant" @click="onClickJobOffer">
        <div class="job-offer__logo">
            <g-company-logo :logoUrl="companyLogoUrl" :name="companyName"/>
        </div>

        <div class="job-offer__column">
            <g-job-offer-title :title="jobTitle" variant="primary"/>


            <div class="job-offer__details">
                <g-company-name :name="companyName" />

                <g-company-city :location="companyLocation" />

                <g-label-rounded :value="$t('job-offer.interview_online')" variant="info" v-if="jobInterviewOnline"/>

                <g-label-rounded :value="$t('job-offer.remote')" variant="primary" v-if="jobRemote"/>
            </div>
        </div>

        <div class="job-offer__additional-info">
            <div class="additional-info__top">
                <g-job-offer-salary :salary="jobSalary" />

                <g-label-rounded :value="jobDateAdded" variant="default"/>
            </div>

            <div class="additional-info__bottom">
                <g-label-rounded v-for="(tag, index) in jobTags" :key="index" :value="tag" variant="default"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./JobItem.scss" scoped />

<script lang="ts" src="./JobItem.ts" />
