(function(window, page, Views, widgetSettings) {
    var DownloadsView = Views.LinkWidget.extend({
            widgetName: 'downloads',
            url: 'chrome://downloads',

            template: $('#widget-downloads-template').html()
        });

    var downloads = new DownloadsView();
    page.addWidget(
        downloads,
        widgetSettings
    );
})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings.widgets.apps || {
        width: 3,
        height: 3,
        positionX: 14,
        positionY: 4
    }
);
