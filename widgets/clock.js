(function(window, page, Views, Models, globalSettings, widgetSettings) {
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

        ClockView = Views.Widget.extend({
            widgetName: 'clock',
            template: $('#widget-clock-template').html(),

            getContext: function() {
                var time = new TimeModel(new Date());
                return time.toJSON();
            }
        });

    var clock = new ClockView();
    page.addWidget(
        clock,
        widgetSettings,

        function () {
            window.setInterval(function() { clock.render(); });
        }
    );

})(
    window,
    window.newPage,
    window.Views,
    window.Models,
    window.newPage.settings,
    window.newPage.settings.widgets.clock || {
        width: 6,
        height: 3,
        positionX: 0,
        positionY: 0
    }
);
