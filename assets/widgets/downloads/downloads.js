(function (window, page, Views, widgetSettings) {
    var DownloadsWidget = Views.LinkWidget.extend({
            widgetName: widgetSettings.name,
            url: 'chrome://downloads',

            template: $('#widget-downloads-template').html()
        });

    page.addWidget(
        DownloadsWidget,
        widgetSettings
    );
}) (
    window,
    window.newPage,
    window.Views,
    window.settings('downloads', {
        width: 3,
        height: 3
    })
);
