// image size 800x480

(function(window, page, Views, globalSettings, widgetSettings) {
    var ImageModel = Backbone.Model.extend({
            toJSON: function () {
                return {
                    url: this.get('url')
                }
            }
        }),

        ImagesCollection = Backbone.Collection.extend({
            model: ImageModel,

            sort: function () {
                this.models = _.shuffle(this.models);
                return this;
            }
        }),

        CarouselView = Views.Widget.extend({
            widgetName: 'carousel',
            template: $('#widget-carousel-template').html(),

            getContext: function () {
                var imagesUrls = [
                        'widgets/images/bender/001.jpg',
                        'widgets/images/bender/002.jpg',
                        'widgets/images/bender/003.jpg',
                        'widgets/images/bender/004.jpg',
                    ];

                var imagesArray = _.map(imagesUrls, function (imageUrl) {
                        return new ImageModel({
                            url: imageUrl
                        });
                    }),
                    images = new ImagesCollection(imagesArray);

                    context = _.map(images.sort().models, function (image) {
                        return image.toJSON();
                    });

                return {'images': context};
            }
        });

    var carousel = new CarouselView();
    page.addWidget(
        carousel,
        widgetSettings,

        function () {
            var jcarousel = carousel.$el.find('.jcarousel')
            jcarousel.jcarousel({
                wrap: 'circular'
            });

            carousel.$el.click(function () {
                jcarousel.jcarousel('scroll', '+=1');
            });
        }
    );

})(
    window,
    window.newPage,
    window.Views,
    window.newPage.settings, 
    window.newPage.settings.widgets.carousel || {
        width: 13,
        height: 8,
        positionX: 1,
        positionY: 4
    }
);
