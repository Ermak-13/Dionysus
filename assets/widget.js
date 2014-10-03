window.Views = window.Views || {};
window.configurators = window.configurators || [];

(function (window, Backbone, Views) {
    _.mixin(
        _.str.exports()
    );

    _.str.include(
        'Underscore.string', 'string'
    );

    var Storage = function () {
            this.save = function (key, value) {
                localStorage.setItem(key, value);
            };

            this.load = function (key) {
                return localStorage.getItem(key);
            };
        },

        ItemView = Backbone.View.extend({
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
                return this.$el.html(html);
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
        }),

        Page = Backbone.View.extend({
            el: '.gridster ul',

            enabledWidgets: {},

            settings: {
                widthCell: 25,
                heightCell: 25,
                widgets: {}
            },

            initialize: function () {
                var _this = this;

                this.gridster = this.$el.gridster({
                    avoid_overlapped_widgets: true,
                    widget_base_dimensions: [
                        _this.settings.widthCell,
                        _this.settings.heightCell
                    ],
                    draggable: {
                        stop: function (e, ui) {
                            _.each(_this.enabledWidgets, function (widget, widgetName) {
                                var gridsterPosition = _this.gridster.serialize(widget.$el)[0],
                                    position = JSON.stringify({
                                        x: gridsterPosition.col,
                                        y: gridsterPosition.row
                                    });
                                window.storage.save(widgetName, position);
                            });
                        }
                    }
                }).data('gridster');
            },

            addWidget: function (Widget, settings, callback) {
                var widget = new Widget(),
                    widgetName = widget.widgetName,
                    position = window.storage.load(widgetName);

                if (position) {
                    position = JSON.parse(position);
                } else {
                    position = {};
                }

                this.gridster.add_widget(
                    widget.render(),
                    settings.width,
                    settings.height,
                    position.x || 1,
                    position.y || 1
                );

                widget.page = this;

                if (callback) {
                    callback(widget);
                }

                this.enabledWidgets[widget.widgetName] = widget;
                return widget;
            }
        });

    Views.Item = ItemView;
    Views.List = ListView;

    Views.Widget = Widget;
    Views.LinkWidget = LinkWidget;
    Views.Page = Page;

    window.storage = new Storage();
    window.newPage = new Page();
}) (
    window,
    Backbone,
    window.Views
);
