// image size 800x480

(function(window, newPage, Views, Models, globalSettings, widgetSettings) {
    var BenderView = Views.Widget.extend({
            widgetName: 'bender',
            template: $('#widget-bender-template').html(),

            images: [
                'widgets/images/bender/001.jpg',
                'widgets/images/bender/002.jpg',
                'widgets/images/bender/003.jpg',
                'widgets/images/bender/004.jpg',
            ],

            getContext: function() {
                var images = '',
                    templateEl = '<li><img src="{{asset}}" class="photo" /></li>';

                images = _.shuffle(this.images);
                _.each(images, function (asset, index) {
                    images = images + Mustache.render(
                        templateEl,
                        {'asset':  asset}
                    );
                });

                return {'images': images};
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

})(
    window,
    window.newPage,
    window.Views,
    window.Models,
    window.newPage.settings, 
    window.newPage.settings.widgets.bender || {
        width: 13,
        height: 8,
        positionX: 1,
        positionY: 4
    }
);
