(function (window, Backbone, Views) {
    var ConfiguratorView = Backbone.View.extend({
            className: function () {
                return ['configurator', this.configuratorName].join(' ');
            },

            template: 'configurator-view',

            initialize: function (options) {
                this.storageKey = _.sprintf('%s-configurator', this.configuratorName);
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
                return {};
            }
        }),

        ConfiguratorLink = Backbone.View.extend({
            className: 'configurator-link-wrapper',

            template: function () {
                return [
'<a href="#" class="configurator-link">',
    '<img src="{{iconUrl}}" class="configurator-icon" />',
    '<span>{{configuratorName}}</span>',
'</a>',    
                ].join('\n');
            } (),

            initialize: function (options) {
                options = options || {};
                this.configuratorName = options.configuratorName;
                this.iconUrl = options.iconUrl || 'assets/images/app-icon.png';
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
                return {
                    configuratorName: this.configuratorName,
                    iconUrl: this.iconUrl
                };
            }
        }),

        Configurator = function (options) {
            options = options || {};

            var LinkClass = options.configuratorLinkClass || ConfiguratorLink,
                ViewClass = options.configuratorViewClass || ConfiguratorView;

            this.name = options.configuratorName;
            this.link = new LinkClass(options);

            this.view = new ViewClass(options);
            var _this = this;
            this.run = function () {
                _this.view.run();
            };
        };

    Views.ConfiguratorView = ConfiguratorView;
    Views.ConfiguratorLink = ConfiguratorLink; 
    Views.Configurator = Configurator;
}) (
    window,
    Backbone,
    window.Views
);
