(function (window, configurators, Configurator, ConfiguratorView) {
    var WidgetsConfiguratorView = ConfiguratorView.extend({
            configuratorName: 'widgets',
            template: $('#configurator-widgets-template').html(),

            run: function () {
            }
        }),

        configurator = new Configurator({
            configuratorName: 'widgets',
            configuratorViewClass: WidgetsConfiguratorView
        });

    configurators.push(configurator);
}) (
    window,
    window.configurators,
    window.Views.Configurator,
    window.Views.ConfiguratorView
);
