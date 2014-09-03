(function(window) {
    var $gridsterContainer = $('.gridster ul');

    $gridsterContainer.on('click', function (e) {
        _.each(window.newPage.enabledWidgets, function (widget, widgetName) {
            widget.closeContent(e);
        });
    });
})(window);
