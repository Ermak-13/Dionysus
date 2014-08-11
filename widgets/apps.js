(function(window, page, Views, globalSettings, widgetSettings) {
    var AppModel = Backbone.Model.extend({
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

            toJSON: function () {
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

        AppView = Views.Item.extend({
            tagName: 'div',
            className: 'application-container',
            template: $('#widget-app-template').html(),

            events: {
                'click .launch-app': 'launch',
            },

            launch: function (e) {
                var app_id = $(e.currentTarget).data('app-id');
                chrome.management.launchApp(app_id);
            }
        }),

        AppsContentView = Views.List.extend({
            el: '.apps-content',
            ItemView: AppView
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

            renderApps: function() {
                var appTemplate = $('#widget-app-template').html(),
                    _this = this;

                chrome.management.getAll(function (apps) {
                    var appsArray = _.map(apps, function (app) {
                            return new AppModel(app);
                        }),
                        apps = new AppsCollection(appsArray),
                        appsContentView = new AppsContentView(apps);

                    appsContentView.render();
                });

                return this;
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
    window.newPage.settings, 
    window.newPage.settings.widgets.apps || {
        width: 3,
        height: 3,
        positionX: 14,
        positionY: 1
    }
);
