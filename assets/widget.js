(function (window, Backbone, Views) {
    var ItemView = Backbone.View.extend({
            initialize: function (item) {
                this.item = item;
            },

            render: function () {
                var html = Mustache.render(
                        this.template,
                        this.getContext()
                    );

                this.$el.html(html);
                return this;
            },

            getContext: function () {
                return this.item.toJSON();
            }
        }),

        ListView = Backbone.View.extend({
            initialize: function (items) {
                this.items = items;
            },

            render: function () {
                var _this = this;

                _.each(_this.items.models, function (item) {
                    var itemView = new _this.ItemView(item),
                        itemEl = itemView.render().$el;

                    _this.$el.append(itemEl);
                });

                return this;
            }
        }),

        Widget = Backbone.View.extend({
            tagName: 'li',
            className: function () {
                return ['widget', this.widgetName].join(' ');
            },

            render: function() {
                var html = Mustache.render(
                        this.template,
                        this.getContext()
                    );

                this.$el.data('widget-name', this.widgetName);
                this.$el.html(html);

                return this;
            },

            getContext: function () {
                return {};
            },

            resize: function (width, height) {
                if (this.page) {
                    var gridster = this.page.gridster;
                    gridster.resize_widget(this.$el, width, height);
                }
            },

            closeContent: function () {}
        }),

        LinkWidget = Widget.extend({
            events: {
                'click .js-open-internal-page': 'openInternalPage'
            },

            openInternalPage: function (e) {
                var _this = this;

                chrome.tabs.create({
                    url: _this.url
                });

                return false;
            }
        });


    Views.Item = ItemView;
    Views.List = ListView;

    Views.Widget = Widget;
    Views.LinkWidget = LinkWidget;
}) (
    window,
    Backbone,
    window.Views
);
