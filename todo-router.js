define([
    'jquery',
    'backbone'
], function($, Backbone) {
    return Backbone.Router.extend({
        routes: {
            '': 'homepage',
            'full-list': 'showList',

            '*notFound': 'http404'
        },
        homepage: function() {
            this.setView({
                name: 'TodoListView'
            });
            return this;
        },
        showList: function() {
            this.setView({
                name: 'FullListView'
            });
            return this;
        },
        initialize: function() {
            Backbone.history.start();
//            Backbone.history.start({pushState: true});
//
//            $(document).on("click", "a[href^='/']", function(event) {
//                var href, passThrough, url;
//                href = $(event.currentTarget).attr('href');
//                passThrough = href.indexOf('sign_out') >= 0;
//                if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
//                    event.preventDefault();
//                    url = href.replace(/^\//, '').replace('\#\!\/', '');
//                    window.app.navigate(url, {
//                        trigger: true
//                    });
//                    return false;
//                }
//            });
//            $(function() {
//                if (window.location.hash.indexOf('!') > -1) {
//                    return window.app.redirectHashBang();
//                }
//            });

            return this;
        },
        setView: function(options) {
            $.proxy(
                require([
                    'views/'+options.name
                ], function(View){
                    if(this.view) {
                        this.view.remove();
                    }
                    this.view = new View(options);
                    $("#todoapp").append(this.view.render().$el);
                }),
                this
            );
            return this;
        },
        redirectHashBang: function() {
            return window.location = window.location.hash.substring(2);
        },
        http404: function() {
            this.setView({
                name: 'Http404View'
            });
            return this;
        }
    });
});