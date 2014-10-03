(function (window, configurators, Configurator, ConfiguratorView) {
    var View = ConfiguratorView.extend({
        template: 'hello world'
    });
    configurators.push(
        new Configurator({
            configuratorName: 'hello world',
            configuratorViewClass: View
        })
    );
}) (
    window,
    window.configurators,
    window.Views.Configurator,
    window.Views.ConfiguratorView
);
