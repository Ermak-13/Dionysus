// image size 800x480

(function (window, page, Views, widgetSettings) {
    var ImageModel = Backbone.Model.extend({
            toJSON: function () {
                return {
                    url: this.get('url')
                };
            }
        }),

        ImagesCollection = Backbone.Collection.extend({
            model: ImageModel,

            sort: function () {
                this.models = _.shuffle(this.models);
                return this;
            }
        }),

        CarouselWidget = Views.Widget.extend({
            widgetName: 'carousel',
            template: $('#widget-carousel-template').html(),

            getContext: function () {
                var imagesUrls = [
                        'assets/widgets/carousel/images/bender/001.jpg',
                        'assets/widgets/carousel/images/bender/002.jpg',
                        'assets/widgets/carousel/images/bender/003.jpg',
                        'assets/widgets/carousel/images/bender/004.jpg',
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

    page.addWidget(
        CarouselWidget,
        widgetSettings,

        function (carousel) {
            var jcarousel = carousel.$el.find('.jcarousel');
            jcarousel.jcarousel({
                wrap: 'circular'
            });

            carousel.$el.click(function () {
                jcarousel.jcarousel('scroll', '+=1');
            });
        }
    );

}) (
    window,
    window.newPage,
    window.Views,
    window.newPage.settings.widgets.carousel || {
        width: 13,
        height: 8
    }
);
