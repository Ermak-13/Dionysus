window.Views = window.Views || {};

(function(window, Views) {
    var Widget = Backbone.View.extend({
            tagName: 'li',
            className: function () {
                // return 'widget widget.name'
                return ['widget', this.widgetName].join(' ');
            },

            render: function() {
                var html = Mustache.render(
                        this.template,
                        this.getContext()
                    );

                return this.$el.html(html);
            },

            closeContent: function () {},

            resize: function (width, height) {
                if (this.page) {
                    var gridster = this.page.gridster;
                    gridster.resize_widget(this.$el, width, height);
                }
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
                    widget_base_dimensions: [
                        _this.settings.widthCell,
                        _this.settings.heightCell
                    ],
                }).data('gridster');
            },

            addWidget: function (widget, settings, callback) {
                this.gridster.add_widget(
                    widget.render(),
                    settings.width,
                    settings.height,
                    settings.positionX,
                    settings.positionY
                );

                widget.page = this;

                if (callback) {
                    callback();
                }

                this.enabledWidgets[widget.widgetName] = widget;
            }
        });

    Views.Widget = Widget;
    Views.Page = Page;

    window.newPage = new Page();
}) (
    window,
    window.Views
);
