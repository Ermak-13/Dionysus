(function(window, page, Views, widgetSettings) {
    var BookmarksView = Views.LinkWidget.extend({
            widgetName: 'bookmarks',
            url: 'chrome://bookmarks',

            template: $('#widget-bookmarks-template').html()
        });

    var bookmarks = new BookmarksView();
    page.addWidget(
        bookmarks,
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
