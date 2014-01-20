// image size 800x480

(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        gridster = window.newPage.gridster,

        BenderView = Widget.extend({
            className: 'widget bender',
            template: $('#widget-bender-template').html(),

            assets: [
                'widgets/assets/bender/001.jpg',
                'widgets/assets/bender/002.jpg',
                'widgets/assets/bender/003.jpg',
                'widgets/assets/bender/004.jpg',
            ],

            getContext: function() {
                var assets = '',
                    templateEl = '<li><img src="{{asset}}" class="photo" /></li>';

                $.each(this.assets, function(index, asset) {
                    assets = assets + Mustache.render(
                        templateEl,
                        {'asset':  asset}
                    );
                });

                return {'assets': assets};
            }
        });

        var bender = new BenderView();

        gridster.add_widget(
            bender.render(),
            widgetSettings.width,
            widgetSettings.height,
            widgetSettings.positionX,
            widgetSettings.positionY
        );

        var jcarousel = bender.$el.find('.jcarousel')
        jcarousel.jcarousel({
            wrap: 'circular'
        });

        bender.$el.click(function() {
            jcarousel.jcarousel('scroll', '+=1');
        });

        newPage.enabledWidgets['bender'] = bender;

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.calendar || {
        width: 6,
        height: 5,
        positionX: 1,
        positionY: 3
    }
);
