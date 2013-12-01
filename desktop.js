(function(window) {
    // bootstrap
    window.newPage = {
        enabledWidgets: {},

        Widget: Backbone.View.extend({
            tagName: 'li',
            className: 'widget'
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
})(window);
