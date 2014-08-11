(function(window, page, Views, widgetSettings) {
    var WeatherModel = Backbone.Model.extend({
            toJSON: function () {
                return {
                    date: this.get('date'),
                    temperature: this.get('tempMinC') + '-' + this.get('tempMaxC'),
                    description: this.get('weatherDesc')[0].value,
                    icon_url: this.get('weatherIconUrl')[0].value
                }
            }
        }),

        WeatherCollection = Backbone.Collection.extend({
            model: WeatherModel
        }),

        WeatherDayView = Views.Item.extend({
            tagName: 'div',
            className: 'weather-day',
            template: $('#widget-weather-day-template').html(),
        }),

        WeatherWidget = Views.Widget.extend({
            widgetName: 'weather',
            template: $('#widget-weather-template').html(),

            renderWeather: function () {
                var xhr = new XMLHttpRequest(),
                    url = 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=Minsk&format=json&num_of_days=5&key=41d9bcdb58c4d977e6bd8a28da2caf9d47a69c8a',
                    _this = this;

                xhr.open('GET', url, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        var apiResponse = JSON.parse(xhr.responseText).data,
                            weatherArray = _.map(apiResponse.weather, function (weatherDay) {
                                return new WeatherModel(weatherDay)
                            }),
                            weather = new WeatherCollection(weatherArray);

                        console.log(weather)
                        var currentDayWeatherView = new WeatherDayView(weather.models[0]);
                        _this.$el.append(currentDayWeatherView.render().$el);
                    }
                }
                xhr.send();

                return this;
            }
        });

    page.addWidget(
        WeatherWidget,
        widgetSettings,

        function (weather) {
            weather.renderWeather();
        }
    );

})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings.widgets.weather || {
        width: 10,
        height: 3
    }
);
