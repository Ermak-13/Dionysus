(function(window, page, Views, globalSettings, widgetSettings) {
    var HistoryItemModel = Backbone.Model.extend({
            toJSON: function () {
                return {
                    title: this.get('title'),
                    url: this.get('url'),
                    time: this.get('lastVisitTime'),
                };
            }
        }),

        History = Backbone.Collection.extend({
            model: HistoryItemModel
        }),

        HistoryItemView = Views.Item.extend({
            tagName: 'tr',
            className: 'history-item',
            template: $('#widget-history-item-template').html()
        }),

        HistoryContentView = Views.List.extend({
            el: '.history-table tbody',
            ItemView: HistoryItemView
        }),

        HistoryView = Views.Widget.extend({
            widgetName: 'history',
            template: $('#widget-history-template').html(),

            getContext: function() { return {}; },
            renderHistory: function() {
                var onDayAgo = (new Date).getTime() - (1000 * 60 * 60 * 24);

                chrome.history.search(
                    {
                        text: '',
                        startTime: onDayAgo,
                    },

                    function (historyItems) {
                        var historyArrays = _.map(historyItems, function (historyItem) {
                                return new HistoryItemModel(historyItem);
                            }),
                            history = new History(historyArrays),
                            historyContentView = new HistoryContentView(history);

                        historyContentView.render();
                    }
                );

                return this;
            }
        });

    var history = new HistoryView();
    page.addWidget(
        history,
        widgetSettings,

        function () {
            history.renderHistory();
        }
    );

})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings, 
    window.newPage.settings.widgets.apps || {
        width: 13,
        height: 5,
        positionX: 14,
        positionY: 4
    }
);
