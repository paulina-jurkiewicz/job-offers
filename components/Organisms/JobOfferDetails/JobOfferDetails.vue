<template>
    <div class="job-details">
        <g-card className="centered small">
            <template v-slot:icon>
                <g-icon-rounded-small iconName="company" />
            </template>

            <template v-slot:content>
                <g-headline tag="span" :text="companyName" />
            </template>

            <template v-slot:footer>
                <g-headline tag="small" :text="$t('job_offer.company.name')" />
            </template>
        </g-card>


        <g-card className="centered small">
            <template v-slot:icon>
                <g-icon-rounded-small iconName="person" />
            </template>

            <template v-slot:content>
                <g-headline tag="span" :text="companySize" />
            </template>

            <template v-slot:footer>
                <g-headline tag="small" :text="$t('job_offer.company.size')" />
            </template>
        </g-card>

        <g-card className="centered small">
            <template v-slot:icon>
                <g-icon-rounded-small iconName="document" />
            </template>

            <template v-slot:content>
                <g-headline tag="span" :text="contractType" />
            </template>

            <template v-slot:footer>
                <g-headline tag="small" :text="$t('job_offer.contract_type')" />
            </template>
        </g-card>

        <g-card className="centered small">
            <template v-slot:icon>
                <g-icon-rounded-small iconName="right-up" />
            </template>

            <template v-slot:content>
                <g-headline tag="span" :text="seniority" />
            </template>

            <template v-slot:footer>
                <g-headline tag="small" :text="$t('job_offer.level')" />
            </template>
        </g-card>

        <g-card className="centered small">
            <template v-slot:icon>
                <g-icon-rounded-small iconName="time" />
            </template>

            <template v-slot:content>
                <g-headline tag="span" :text="createdAt" />
            </template>

            <template v-slot:footer>
                <g-headline tag="small" :text="$t('job_offer.added')" />
            </template>
        </g-card>
    </div>
</template>

<style lang="scss" src="./JobOfferDetails.scss" scoped />

<script lang="ts" src="./JobOfferDetails.ts" />
