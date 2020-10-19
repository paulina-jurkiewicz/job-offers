# COMPONENTS

**This directory is required.**

This directory contains your components SASS.

**Components (or modules)**: holds all of your styles for buttons, carousels, sliders, and similar page components (think widgets). Your project will typically contain a lot of component files — as the whole site/app should be mostly composed of small modules.

## List

## Example of file

```scss
/**
 * Abstract section
 */
@import '../1-abstract/variables';
@import '../1-abstract/functions';
@import '../1-abstract/mixins';

/**
 * Vendor section
 */
/* Only when need it */
@import '../2-vendor/extensions/suggest_list';

/**
 * Base section
 */
@import '../3-base/typography';

/**
 * Specific style HERE ONLY
 */

```
