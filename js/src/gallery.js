var view = function() {
    return {
        lobby: function(artist) {
            return Mustache.to_html($('#lobby').html(), artist)
        }
    };
}();

var gallery = function() {
    var httpGet = function(path, data_handler) {
        $.get(path, data_handler);
    };
    
    return {
        service: function() {
            var _get = function(name) {
                return artists[name].collect(function(it) {
                    return name + "/" + it;
                });
            };

            var _load = function(artist_handler) {
                var parseArtists = function(data, status, jqXHR) {
                    var artists = JSON.parse(data);
                    artists.each(function(name) {
                        var path = "server/" + name + "/info.json",
                            parseImages = function(data, status, jqXHR) {
                                artist_handler({
                                    name: name,
                                    images: JSON.parse(data).images.collect(function(url) {
                                        return {url: url};
                                    })
                                });
                        };

                        httpGet(path, parseImages);
                    });
                };

                httpGet("server/info.json", parseArtists);
            };

            return {
                get: _get,
                load: _load
            };
        }()
    };
}();

//TODO: should just start with looking up once and then holding on to data

gallery.service.load(function(artist) {
    var html = view.lobby(artist);
    $('body').append($(html));
});
