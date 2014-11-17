(function (window, page, Views, widgetSettings) {
    var ClockWidget = Views.Widget.extend({
            widgetName: widgetSettings.name,
            template: $('#widget-clock-template').html(),

            initialize: function (options) {
                Views.Widget.prototype.initialize.apply(this, arguments);

                this.tz = this.options.tz;
                this.title = this.options.title;
            },

            getContext: function () {
                return {
                    title: this.title,
                    time: moment.tz(this.tz).format('HH : mm')
                };
            }
        });

    page.addWidget(
        ClockWidget,
        _.extend(
            widgetSettings,
            {
                title: 'San-Francisco',
                tz: 'America/Los_Angeles'
            }
        )
    );

    page.addWidget(
        ClockWidget,
        _.extend(
            widgetSettings,
            {
                title: 'Minsk',
                tz: 'Europe/Minsk'
            }
        )
    );

    page.addWidget(
        ClockWidget,
        _.extend(
            widgetSettings,
            {
                title: 'Flori',
                tz: 'Europe/San_Marino'
            }
        )
    );

}) (
    window,
    window.newPage,
    window.Views,
    window.settings('clock', {
        width: 6,
        height: 3
    })
);
