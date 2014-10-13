(function (window, page, Views, widgetSettings) {
    var BookmarksWidget = Views.LinkWidget.extend({
            widgetName: widgetSettings.name,
            url: 'chrome://bookmarks',

            template: $('#widget-bookmarks-template').html()
        });

    page.addWidget(
        BookmarksWidget,
        widgetSettings
    );
}) (
    window,
    window.newPage,
    window.Views,
    window.settings('bookmarks', {
        width: 3,
        height: 3
    })
);
