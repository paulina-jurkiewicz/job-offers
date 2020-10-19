<template>
    <div class="filters">
        <b-form @submit.prevent id="form-filters">
            <b-form-group>
                <b-form-select v-model="selectedRegion" :options="regionOptions"></b-form-select>
            </b-form-group>

            <b-form-group class="filter__category">
                <b-form-radio-group
                        id="radio-category"
                        v-model="selectedCategory"
                        name="radio-category">
                    <template v-slot:first>
                        <b-form-radio value="all">
                            <g-filter-category category="all" :isSelected="isCategorySelected('all')"/></b-form-radio>
                    </template>

                    <b-form-radio :value="item"
                                  v-for="(item, index) in categories"
                                  :key="'category-' + index">
                        <g-filter-category :category="item" :isSelected="isCategorySelected(item)" />
                    </b-form-radio>
                </b-form-radio-group>
            </b-form-group>


            <b-form-group class="filter__seniority" :label="$t('filters.seniority')" >
                <b-form-radio-group
                        v-model="selectedSeniority"
                        :options="seniorityOptions"
                        name="radio-inline"
                ></b-form-radio-group>
            </b-form-group>

            <b-form-group class="filter__sort-type" :label="$t('filters.sort_type')">
                <b-form-select v-model="sortType" :options="sortOptions"></b-form-select>
            </b-form-group>
        </b-form>
    </div>
</template>

<style lang="scss" src="./Filters.scss" scoped/>

<script lang="ts" src="./Filters.ts"/>
