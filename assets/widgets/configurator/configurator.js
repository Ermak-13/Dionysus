(function (window, page, Views, widgetSettings) {
    var ConfiguratorWidget = Views.Widget.extend({
        widgetName: 'configurator',
        template: $('#widget-configurator-template').html(),

        events: {
            'submit #stylesheets-configuration-form': 'configureStyles'
        },

        getContext: function () {
            return {};
        },

        configureStyles: function () {
            var styles = this.$el.find('.styles-input').val();
            $('body').append('<style>' + styles + '</style>');
            window.storage.save('styles', styles);
            return false;
        }
    });

    page.addWidget(ConfiguratorWidget, widgetSettings);
}) (
    window,
    window.newPage,
    window.Views,
    window.newPage.settings.widgets.configurator || {
        width: 9,
        height: 9
    }
);
