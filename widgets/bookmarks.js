(function(window, page, Views, widgetSettings) {
    var BookmarksWidget = Views.LinkWidget.extend({
            widgetName: 'bookmarks',
            url: 'chrome://bookmarks',

            template: $('#widget-bookmarks-template').html()
        });

    page.addWidget(
        BookmarksWidget,
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
