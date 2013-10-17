require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'backbone.localStorage': 'libs/backbone.localStorage'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone.localStorage'
        }
    }
});

require([
    'todo-router'
], function(TodoRouter) {
        window.debug = false;
        window.app = new TodoRouter();
    }
);