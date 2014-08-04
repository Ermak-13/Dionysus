(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        HistoryView = Widget.extend({
            widgetName: 'history',
            template: $('#widget-history-template').html(),

            getContext: function() { return {}; },
            renderHistory: function() {
                var historyItemTemplate = $('#widget-history-item-template').html(),
                    onDayAgo = (new Date).getTime() - (1000 * 60 * 60 * 24),
                    _this = this,

                    getNiceTitle = function (title) {
                        return title.substr(0, 50) + '...';
                    };


                chrome.history.search(
                    {
                        text: '',
                        startTime: onDayAgo,
                    },

                    function (historyItems) {
                        var historyHTML = '';
                        _.each(historyItems, function (historyItem, index) {
                            historyHTML = historyHTML + Mustache.render(
                                historyItemTemplate,
                                {
                                    title: getNiceTitle(historyItem.title),
                                    url: historyItem.url,
                                    time: historyItem.lastVisitTime
                                }
                            );
                        });
                        _this.$el.find('.history-table tbody').append(historyHTML);
                    }
                );
            }
        });

    var history = new HistoryView();
    newPage.addWidget(
        history,
        widgetSettings,

        function () {
            history.renderHistory();
        }
    );

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.apps || {
        width: 13,
        height: 5,
        positionX: 14,
        positionY: 4
    }
);
