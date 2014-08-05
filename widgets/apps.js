(function(window, newPage, Views, globalSettings, widgetSettings) {
    var AppsView = Views.Widget.extend({
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
                    this.gridster.resize_widget(apps.$el, 14, 12);
                    this.$el.find('.apps-container').show();
                    this.appsDisplayed = true;
                }

                return false;
            },

            closeContent: function (e) {
                this.$el.find('.apps-container').hide();
                this.gridster.resize_widget(apps.$el, widgetSettings.width, widgetSettings.height);
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
                    var appsHTML = '';

                    apps = _.sortBy(apps, function (app) {
                        var priorities = {
                            'hosted_app': 1,
                            'package_app': 2
                        };
                        return priorities[app.type] || 3;
                    });

                    _.each(apps, function (app, index) {
                        var icon = _.last(app.icons),
                            icon_url = 'themes/images/app-icon.png',
                            launchedApp = (app.type == 'packaged_app' || app.type == 'hosted_app');

                        if (icon) {
                            icon_url = icon.url;
                        }

                        appsHTML = appsHTML + Mustache.render(
                            appTemplate,
                            {
                                id: app.id,
                                name: app.shortName,
                                icon_url: icon_url,
                                launchedApp: launchedApp
                            }
                        );
                    });

                    _this.$el.find('.apps-content').append(appsHTML);
                    _this.$el.find('.launch-app').click(function () {
                        chrome.management.launchApp($(this).data('app-id'));
                    });
                });
            }
        });

    var apps = new AppsView();
    newPage.addWidget(
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
