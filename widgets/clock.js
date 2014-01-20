(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        gridster = window.newPage.gridster,

        ClockView = Widget.extend({
            className: 'widget clock',
            template: $('#widget-clock-template').html(),

            getContext: function() {
                var getNiceFormat = function(number, limit) {
                        var limit = limit || 10;
                        return (number < limit ? "0" : "") + number;
                    },
                    currentDateTime = new Date(),
                    clock = $(
                        '<span><span>'
                    );

                return {
                    'hours': getNiceFormat(currentDateTime.getHours()),
                    'minutes': getNiceFormat(currentDateTime.getMinutes()),
                    'seconds': getNiceFormat(currentDateTime.getSeconds()),
                    'milliseconds': getNiceFormat(currentDateTime.getMilliseconds(), 100)
                };
            }
        });

        var clock = new ClockView();

        gridster.add_widget(
            clock.render(),
            widgetSettings.width,
            widgetSettings.height,
            widgetSettings.positionX,
            widgetSettings.positionY
        );
        newPage.enabledWidgets['clock'] = clock;

        window.setInterval(function() { clock.render(); });

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.clock || {
        width: 3,
        height: 2,
        positionX: 0,
        positionY: 0
    }
);
