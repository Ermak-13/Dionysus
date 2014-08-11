(function(window, page, Views, widgetSettings) {
    var DateModel = Backbone.Model.extend({
            initialize: function (date) {
                this.date = date;
            },

            getMonth: function () {
                var monthNames = {
                    0: 'January',
                    1: 'February',
                    2: 'March',
                    3: 'April',
                    4: 'May',
                    5: 'June',
                    6: 'July',
                    7: 'August',
                    8: 'September',
                    9: 'October',
                    10: 'November',
                    11: 'December'
                };
                return monthNames[this.date.getMonth().toString()];
            },

            toJSON: function () {
                return {
                    day: this.date.getDate(),
                    month: this.getMonth()
                }
            }
        }),

        CalendarWidget = Views.Widget.extend({
            widgetName: 'calendar',
            template: $('#widget-calendar-template').html(),

            getContext: function() {
                var date = new DateModel(new Date());
                return date.toJSON();
            }
        });
    
    page.addWidget(
        CalendarWidget,
        widgetSettings,

        function () {
            window.setInterval(function () { calendar.render(); }, 60 * 1000);
        }
    );

})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings.widgets.calendar || {
        width: 4,
        height: 3
    }
);
