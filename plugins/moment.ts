import Vue       from 'vue';
import VueMoment from 'vue-moment';
import moment    from 'moment';
import 'moment/locale/pl';

Vue.use( VueMoment, { moment } );

export default ( { app }, inject ) => {
    moment.locale( app.i18n.locale );

    const format = 'DD.MM.YYYY';

    const dateRelative = ( value ) => {
        const period = {
            minute: 60,
            hour: 3600,
            day: 86400,
            week: 604800
        };

        const time = moment().unix() - moment( value ).unix();
        const minutesAgo = Math.round( time / period.minute );
        const hoursAgo = Math.round( time / period.hour );
        const daysAgo = Math.round( time / period.day );
        const weeksAgo = Math.round( time / period.week );

        if ( minutesAgo > 0 && minutesAgo < 60 ) {
            return app.i18n.tc( 'date.minutes_ago_before_hour_with_time', minutesAgo, { time: minutesAgo } );
        } else if ( minutesAgo < 0 && minutesAgo > -60 ) {
            return app.i18n.tc( 'date.minutes_future_before_hour_with_time', Math.abs( minutesAgo ), { time: Math.abs( minutesAgo ) } );
        }

        if ( hoursAgo > 0 && hoursAgo < 24 ) {
            return app.i18n.tc( 'date.hours_ago_before_day_with_time', hoursAgo, { time: hoursAgo } );
        } else if ( hoursAgo < 0 && hoursAgo > -24 ) {
            return app.i18n.tc( 'date.hours_future_before_day_with_time', Math.abs( hoursAgo ), { time: Math.abs( hoursAgo ) } );
        }

        if ( daysAgo > 0 && daysAgo < 7 ) {
            if ( daysAgo === 0 ) {
                return app.i18n.t( 'date.today' );
            }

            if ( daysAgo === 1 ) {
                return app.i18n.t( 'date.day_before_yesterday' );
            }

            return app.i18n.tc( 'date.days_ago_before_week_with_time', daysAgo, { day: daysAgo } );
        } else if ( daysAgo < 0 && daysAgo > -7 ) {
            if ( daysAgo === -1 ) {
                return app.i18n.t( 'date.tomorrow' );
            }

            if ( daysAgo === -2 ) {
                return app.i18n.t( 'date.day_after_tomorrow' );
            }

            return app.i18n.tc( 'date.days_future_before_week_with_time', Math.abs( daysAgo ), { day: Math.abs( daysAgo ) } );
        }

        if ( weeksAgo > 0 && weeksAgo < 4 ) {
            return app.i18n.tc( 'date.weeks_ago_before_month_with_time', weeksAgo, { week: weeksAgo } );
        } else if ( weeksAgo < 0 && weeksAgo > -4 ) {
            return app.i18n.tc( 'date.weeks_future_before_month_with_time', Math.abs( weeksAgo ), { week: Math.abs( weeksAgo ) } );
        }

        return moment( value ).locale( app.i18n.locale ).format( format );
    };


    inject('dateRelative', dateRelative);

    Vue.filter( 'date_relative', dateRelative );
    Vue.filter( 'date', ( value ) => moment( value ).locale( app.i18n.locale ).format( format ) );
};
