(function (window, page, Views, widgetSettings) {
    var HistoryWidget = Views.LinkWidget.extend({
            widgetName: widgetSettings.name,
            url: 'chrome://history',

            template: $('#widget-history-template').html()
        });

    page.addWidget(
        HistoryWidget,
        widgetSettings
    );
}) (
    window,
    window.newPage,
    window.Views,
    window.settings('history', {
        width: 3,
        height: 3
    })
);
