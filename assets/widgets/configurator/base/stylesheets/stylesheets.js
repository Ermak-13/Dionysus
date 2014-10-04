(function (window, storage, configurators, Configurator, ConfiguratorView) {
    var StylesheetsConfiguratorView = ConfiguratorView.extend({
            configuratorName: 'stylesheets',
            template: $('#configurator-stylesheets-template').html(),

            events: {
                'click .submit': 'saveStyles'
            },

            initialize: function () {
                ConfiguratorView.prototype.initialize.apply(this);
                this.loadStyles();
            },

            run: function () {
                var containerId = 'configurator-stylesheets-container',
                    jqueryContainerId = _.sprintf('#%s', containerId);

                $(jqueryContainerId).remove();
                $('body').append(
                    _.sprintf(
                        '<style id="%s">%s</style>',
                        containerId, this.stylesheets
                    )
                );
            },

            saveStyles: function () {
                var stylesheets = this.$el.find('.stylesheets').val() || '';
                storage.save(this.storageKey, stylesheets);
                this.stylesheets = stylesheets;

                this.run();
            },

            loadStyles: function () {
                this.stylesheets = storage.load(this.storageKey);
            },

            getContext: function () {
                return {
                    stylesheets: this.stylesheets
                };
            }
        }),
    
        configurator = new Configurator({
            configuratorName: 'stylesheets',
            configuratorViewClass: StylesheetsConfiguratorView
        });

    configurators.push(configurator);
}) (
    window,
    window.storage,
    window.configurators,
    window.Views.Configurator,
    window.Views.ConfiguratorView
);
