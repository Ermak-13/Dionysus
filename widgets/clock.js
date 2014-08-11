(function(window, page, Views, widgetSettings) {
    var TimeModel = Backbone.Model.extend({
            initialize: function(time) {
                this.time = time;
            },

            toJSON: function () {
                return {
                    hours: this.getHours(),
                    minutes: this.getMinutes(),
                    seconds: this.getSeconds(),
                    milliseconds: this.getMilliseconds()
                }
            },

            getHours: function () {
                return this.getNiceFormat(this.time.getHours());
            },

            getMinutes: function () {
                return this.getNiceFormat(this.time.getMinutes());
            },

            getSeconds: function () {
                return this.getNiceFormat(this.time.getSeconds());
            },

            getMilliseconds: function () {
                return this.getNiceFormat(this.time.getMilliseconds());
            },

            getNiceFormat: function (number, limit) {
                var limit = limit || 10;
                return (number < limit ? "0" : "") + number;
            }
        }),

        ClockWidget = Views.Widget.extend({
            widgetName: 'clock',
            template: $('#widget-clock-template').html(),

            getContext: function() {
                var time = new TimeModel(new Date());
                return time.toJSON();
            }
        });

    page.addWidget(
        ClockWidget,
        widgetSettings,

        function () {
            window.setInterval(function() { clock.render(); });
        }
    );

})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings.widgets.clock || {
        width: 6,
        height: 3
    }
);
