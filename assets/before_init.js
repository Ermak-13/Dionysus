(function (window) {
    window.Views = window.Views || {};
    window.configurators = window.configurators || [];

    _.mixin(
        _.str.exports()
    );

    _.str.include(
        'Underscore.string', 'string'
    );

    var Storage = function () {
            this.save = function (key, value) {
                localStorage.setItem(key, value);
            };

            this.load = function (key) {
                return localStorage.getItem(key);
            };
        },

        Page = Backbone.View.extend({
            el: '.gridster ul',

            enabledWidgets: {},

            settings: {
                widthCell: 25,
                heightCell: 25,
                widgets: {}
            },

            initialize: function () {
                var _this = this;

                this.gridster = this.$el.gridster({
                    avoid_overlapped_widgets: true,
                    widget_base_dimensions: [
                        _this.settings.widthCell,
                        _this.settings.heightCell
                    ],
                    draggable: {
                        stop: function (e, ui) {
                            _.each(_this.enabledWidgets, function (widget, widgetName) {
                                var gridsterPosition = _this.gridster.serialize(widget.$el)[0],
                                    position = JSON.stringify({
                                        x: gridsterPosition.col,
                                        y: gridsterPosition.row
                                    });
                                window.storage.save(widgetName, position);
                            });
                        }
                    }
                }).data('gridster');
            },

            addWidget: function (Widget, settings, callback) {
                var widget = new Widget(),
                    widgetName = widget.widgetName,
                    position = window.storage.load(widgetName);

                if (position) {
                    position = JSON.parse(position);
                } else {
                    position = {};
                }

                this.gridster.add_widget(
                    widget.render(),
                    settings.width,
                    settings.height,
                    position.x || 1,
                    position.y || 1
                );

                widget.page = this;

                if (callback) {
                    callback(widget);
                }

                this.enabledWidgets[widget.widgetName] = widget;
                return widget;
            }
        }),

        settings = function (name, defaultSettings) {
            var settingsName = _.sprintf('%s_widget_settings', name),
                settings = window.storage.load(settingsName) ||
                           window.newPage.settings.widgets[name] ||
                           defaultSettings;

            return settings;
        };

    window.storage = new Storage();
    window.newPage = new Page();
    window.settings = settings;
}) (
    window
);
