(function (window, page, Views, widgetSettings) {
    var WeatherModel = Backbone.Model.extend({
            initialize: function () {
                this.main = this.get('main');
                this.clous = this.get('clouds');
                this.weather = this.get('weather')[0];
                this.wind = this.get('wind');
            },

            iconUrl: function () {
                var iconName = this.weather.icon,
                    iconUrl = _.sprintf('http://openweathermap.org/img/w/%s.png', iconName);

                return iconUrl;
            },

            temperature: function () {
                var tempC = this.main.temp_min - 273.15;
                tempC = Math.floor(tempC);

                if (tempC >= 0) {
                    tempC = _.sprintf('+%s', tempC);
                }

                return tempC;
            },

            toJSON: function () {
                return {
                    title: this.weather.main,
                    description: this.weather.description,
                    temperature: this.temperature(),
                    icon_url: this.iconUrl(),
                    wind: this.wind.speed
                };
            }
        }),

        DayWeatherView = Views.Item.extend({
            tagName: 'div',
            className: 'weather-container',
            template: $('#widget-weather-day-template').html()
        }),

        WeatherWidget = Views.Widget.extend({
            widgetName: widgetSettings.name,
            template: $('#widget-weather-template').html(),

            renderWeather: function () {
                var xhr = new XMLHttpRequest(),
                    url = 'http://api.openweathermap.org/data/2.5/weather?q=Minsk,by',
                    _this = this;

                xhr.open('GET', url, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        var apiResponse = JSON.parse(xhr.responseText),
                            todayWeather = new WeatherModel(apiResponse),
                            todayWeatherView = new DayWeatherView(todayWeather);

                        _this.$el.html(
                            todayWeatherView.render().$el
                        );
                    }
                };
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

}) (
    window,
    window.newPage,
    window.Views,
    window.settings('weather', {
        width: 4,
        height: 3
    })
);
