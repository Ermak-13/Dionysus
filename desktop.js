(function(window) {
    // bootstrap
    window.newPage = {
        enabledWidgets: {},

        Widget: Backbone.View.extend({
            tagName: 'li',
            className: function () {
                // return 'widget widget.name'
                return ['widget', this.widgetName].join(' ');
            },

            render: function() {
                var currentTime = Mustache.render(
                        this.template,
                        this.getContext()
                    );

                return this.$el.html(currentTime);
            }
        }),

        settings: {
            widthCell: 75,
            heightCell: 50,
            widgets: {}
        }
    };

    var settings = window.newPage.settings,
        gridster = $(".gridster ul").gridster({
            widget_base_dimensions: [settings.widthCell, settings.heightCell],
        }).data('gridster');

    window.newPage.gridster = gridster;

    window.newPage.addWidget = function (widget, settings, callback) {
        this.gridster.add_widget(
            widget.render(),
            settings.width,
            settings.height,
            settings.positionX,
            settings.positionY
        );

        if (callback) {
            callback();
        }

        this.enabledWidgets[widget.widgetName] = widget;
    };
})(window);
