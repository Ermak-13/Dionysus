(function(window, page, Views, globalSettings, widgetSettings) {
    var HistoryView = Views.LinkWidget.extend({
            widgetName: 'history',
            url: 'chrome://history',

            template: $('#widget-history-template').html()
        });

    var history = new HistoryView();
    page.addWidget(
        history,
        widgetSettings
    );
})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings, 
    window.newPage.settings.widgets.apps || {
        width: 3,
        height: 3,
        positionX: 14,
        positionY: 4
    }
);
