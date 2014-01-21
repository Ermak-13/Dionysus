(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        CalendarView = Widget.extend({
            widgetName: 'calendar',
            template: $('#widget-calendar-template').html(),

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
    newPage.addWidget(
        calendar,
        widgetSettings,

        function () {
            window.setInterval(function () { calendar.render(); }, 60 * 1000);
        }
    );

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.calendar || {
        width: 2,
        height: 2,
        positionX: 0,
        positionY: 0
    }
);
