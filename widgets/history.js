(function(window, page, Views, widgetSettings) {
    var HistoryWidget = Views.LinkWidget.extend({
            widgetName: 'history',
            url: 'chrome://history',

            template: $('#widget-history-template').html()
        });

    page.addWidget(
        HistoryWidget,
        widgetSettings
    );
})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings.widgets.apps || {
        width: 3,
        height: 3
    }
);
