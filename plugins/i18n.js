import Vue     from 'vue';
import VueI18n from 'vue-i18n';

const getChoiceIndex = VueI18n.prototype.getChoiceIndex;

/**
 * Get choice index
 *
 * @param {number} choice a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param {number} choicesLength an overall amount of available choices
 * @returns {number} a final choice index to select plural word by
 */
// tslint:disable-next-line:only-arrow-functions
VueI18n.prototype.getChoiceIndex = function ( choice, choicesLength ) {
    // this === VueI18n instance, so the locale property also exists here
    if ( this.locale !== 'pl' ) {
        // proceed to the default implementation
        return getChoiceIndex( choice, choicesLength );
    }

    if ( choice === 0 ) {
        return 0;
    }

    const teen = choice > 10 && choice < 20;
    const endsWithOne = choice % 10 === 1;
    const hasOnlyOneNumber = choicesLength === 1;

    if ( !teen && endsWithOne && hasOnlyOneNumber ) {
        return 0;
    }

    if ( !teen && endsWithOne && choice === 1 ) {
        return 1;
    }

    if ( !teen && choice % 10 >= 2 && choice % 10 <= 4 ) {
        return 2;
    }

    return ( choicesLength < 4 ) ? 2 : 3;
};

const I18nPlugin = {
    install( Vue, options ) {
        const _$t = Vue.prototype.$t;
        Vue.prototype._$t = _$t;

        Vue.prototype.$t = function () {
            if ( this.$i18n ) {
                return _$t.apply( this, arguments );
            } else {
                return _$t.apply( this.$root, arguments );
            }
        };
    }
};

Vue.use( I18nPlugin );

Vue.directive( 'ts', {
    bind: ( el, binding, vnode ) => {
        if ( el.textContent !== '' ) {
            return;
        }
        const vm = vnode.context;
        const path = binding.value;
        // @ts-ignore
        el.textContent = vm.$i18n.t( path );
    }, update: () => {
    }, unbind: () => {
    }
} );
