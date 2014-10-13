(function (window, page, Views, configurators, widgetSettings) {
    var ConfiguratorWidget = Views.Widget.extend({
        widgetName: widgetSettings.name,
        template: $('#widget-configurator-template').html(),

        events: {
            'click .configurator-widget-link': 'render'
        },

        initialize: function () {
            this.configurators = configurators;

            _.each(this.configurators, function (configurator) {
                configurator.run();
            });
        },

        render: function () {
            var html = Mustache.render(
                    this.template,
                    this.getContext()
                );

            this.$el.data('widget-name', this.widgetName);
            this.$el.html(html);

            this.$content = this.$el.find('.configurators-content');
            this.$configuratorWidgetLink = this.$el.find('.configurator-widget-link');
            this.$configuratorWidgetTitle = this.$el.find('.configurator-widget-title');

            this.renderConfiguratorLinks();
            return this.$el;
        },

        renderConfiguratorLinks: function () {
            var _this = this,
                configuratorLinks = [];

            _.each(this.configurators, function (configurator) {
                var $link = configurator.link.render().$el;
                _this.$content.append($link);

                $link.on('click', function () {
                    _this.$content.html(
                        configurator.view.render().$el
                    );
                    _this.$configuratorWidgetLink.show();
                    _this.$configuratorWidgetTitle.text(configurator.name);
                });
            });

            return this;
        }
    });

    var configuratorWidget = page.addWidget(
        ConfiguratorWidget,
        widgetSettings
    );
}) (
    window,
    window.newPage,
    window.Views,
    window.configurators,
    window.settings('configurator', {
        width: 12,
        height: 12
    })
);
