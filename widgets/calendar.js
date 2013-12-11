(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        gridster = window.newPage.gridster,

        CalendarView = Widget.extend({
            className: 'widget calendar',
            template: $('#widget-calendar-template').html(),

            render: function() {
                var calendar = Mustache.render(
                        this.template,
                        this.getContext()
                    );

                return this.$el.html(calendar);
            },

            getContext: function() {
                var getNiceMonthFormat = function(monthIndex) {
                        var monthNames = {
                            '0': 'January',
                            '1': 'February',
                            '2': 'March',
                            '3': 'April',
                            '4': 'May',
                            '5': 'June',
                            '6': 'July',
                            '7': 'August',
                            '8': 'September',
                            '9': 'October',
                            '10': 'November',
                            '11': 'December'
                        };
                        return monthNames[monthIndex.toString()];
                    },
                    currentDateTime = new Date();

                return {
                    'day': currentDateTime.getDate(),
                    'month': getNiceMonthFormat(currentDateTime.getMonth())
                };
            }
        });

        var calendar = new CalendarView();

        gridster.add_widget(
            calendar.render(),
            widgetSettings.width,
            widgetSettings.height,
            widgetSettings.positionX,
            widgetSettings.positionY
        );
        newPage.enabledWidgets['calendar'] = calendar;

        window.setInterval(function() { calendar.render(); }, 60 * 1000);

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.calendar || {
        width: 2,
        height: 2,
        positionX: 0,
        positionY: 0
    }
);
