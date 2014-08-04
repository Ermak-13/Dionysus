(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        ClockView = Widget.extend({
            widgetName: 'clock',
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
    newPage.addWidget(
        clock,
        widgetSettings,

        function () {
            window.setInterval(function() { clock.render(); });
        }
    );

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.clock || {
        width: 6,
        height: 3,
        positionX: 0,
        positionY: 0
    }
);
