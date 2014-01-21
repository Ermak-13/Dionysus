// image size 800x480

(function(window, newPage, globalSettings, widgetSettings) {
    var Widget = window.newPage.Widget,
        BenderView = Widget.extend({
            widgetName: 'bender',
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

                _.each(this.assets, function (asset, index) {
                    assets = assets + Mustache.render(
                        templateEl,
                        {'asset':  asset}
                    );
                });

                return {'assets': assets};
            }
        });

    var bender = new BenderView();
    newPage.addWidget(
        bender,
        widgetSettings,

        function () {
            var jcarousel = bender.$el.find('.jcarousel')
            jcarousel.jcarousel({
                wrap: 'circular'
            });

            bender.$el.click(function () {
                jcarousel.jcarousel('scroll', '+=1');
            });
        }
    );

})(window, window.newPage, window.newPage.settings, 
    window.newPage.settings.widgets.bender || {
        width: 6,
        height: 5,
        positionX: 1,
        positionY: 3
    }
);
