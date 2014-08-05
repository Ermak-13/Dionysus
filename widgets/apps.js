(function(window, page, Views, Models, globalSettings, widgetSettings) {
    var AppModel = Models.BaseModel.extend({
            default_icon_url: function () {
                var icons = this.get('icons'),
                    icon = _.last(icons);

                if (icon) {
                    return icon.url;
                }
                return 'themes/images/app-icon.png';
            },

            launched: function () {
                var LAUNCHED_APPS = [
                        'packaged_app',
                        'hosted_app'
                    ],
                    type = this.get('type');
                return _.contains(LAUNCHED_APPS, type);
            },

            toContext: function () {
                return {
                    id: this.get('id'),
                    name: this.get('shortName'),
                    icon_url: this.default_icon_url(),
                    launchedApp: this.launched()
                }
            }
        }),

        AppsCollection = Backbone.Collection.extend({
            model: AppModel,

            comparator: function (app) {
                var priorities = {
                        'hosted_app': 1,
                        'package_app': 2
                    }

                return priorities[app.get('type')] || 3
            }
        }),

        AppView = Backbone.View.extend({
            el: '.apps-content',
            template: $('#widget-app-template').html(),

            events: {
                'click .launch-app': 'launch',
            },

            initialize: function (app) {
                this.app = app;
            },

            render: function () {
                var html = Mustache.render(
                        this.template,
                        this.getContext()
                    );

                return this.$el.append(html);
            },

            getContext: function () {
                return this.app.toContext();
            },

            launch: function (e) {
                var app_id = $(e.currentTarget).data('app-id');
                chrome.management.launchApp(app_id);
            }
        }),

        AppsView = Views.Widget.extend({
            widgetName: 'apps',
            template: $('#widget-apps-template').html(),

            events: {
                'click .apps-icon': 'openContent'
            },

            initialize: function () {
                this.appsDisplayed = false;
            },

            openContent: function (e) {
                if (!this.appsDisplayed) {
                    this.$el.find('.apps-icon').hide();
                    this.resize(14, 12);
                    this.$el.find('.apps-container').show();
                    this.appsDisplayed = true;
                }

                return false;
            },

            closeContent: function (e) {
                this.$el.find('.apps-container').hide();
                this.resize(widgetSettings.width, widgetSettings.height);
                this.$el.find('.apps-icon').show();
                this.appsDisplayed = false;

                return false;
            },

            getContext: function () {
                return {};
            },

            renderApps: function() {
                var appTemplate = $('#widget-app-template').html(),
                    _this = this;

                chrome.management.getAll(function (apps) {
                    var appsArray = _.map(apps, function (app) {
                            return new AppModel(app);
                        }),
                        apps = new AppsCollection(appsArray);

                    _.each(apps.models, function (app, index) {
                        var appView = new AppView(app);
                        appView.render();
                    });
                });
            }
        });

    var apps = new AppsView();
    page.addWidget(
        apps,
        widgetSettings,

        function () {
            apps.renderApps();
        }
    );

})(
    window,
    window.newPage,
    window.Views,
    window.Models,
    window.newPage.settings, 
    window.newPage.settings.widgets.apps || {
        width: 3,
        height: 3,
        positionX: 14,
        positionY: 1
    }
);
