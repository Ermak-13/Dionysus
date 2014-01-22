(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        AppsView = Widget.extend({
            widgetName: 'apps',
            template: $('#widget-apps-template').html(),

            getContext: function() { return {}; },
            renderApps: function() {
                var appTemplate = $('#widget-app-template').html(),
                    _this = this,

                    getNiceLinkName = function (app) {
                        if (app.type == 'packaged_app') {
                            return Mustache.render(
                                '<a href id="app-{{id}}" class="launch-app" data-app-id="{{id}}">{{name}}</a>',
                                {
                                    id: app.id,
                                    name: app.name
                                }
                            );
                        } else {
                            return Mustache.render(
                                '<span id="app-{{id}}" data-app-id="{{id}}">{{name}}</span>',
                                {
                                    id: app.id,
                                    name: app.name
                                }
                            );
                        }
                    }

                chrome.management.getAll(function (apps) {
                    var appsHTML = '';

                    _.each(apps, function (app, index) {
                        appsHTML = appsHTML + Mustache.render(
                            appTemplate,
                            {
                                name: getNiceLinkName(app),
                                version: app.version,
                                enabled: app.enabled,
                                type: app.type
                            }
                        );
                    });

                    _this.$el.find('.apps-table tbody').append(appsHTML);
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

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.apps || {
        width: 6,
        height: 3,
        positionX: 7,
        positionY: 1
    }
);
