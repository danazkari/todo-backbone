define([
    'backbone',
    'backbone.localStorage'
], function(Backbone) {
    return Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("todo-sample"),
        done: function() {
            return this.filter(function(todo){
                return todo.get('done');
            });
        },
        remaining: function() {
            if(window.debug) console.info('remaining:', this.without.apply(this, this.done()), this.without(this.done()))
            return this.without.apply(this, this.done());
        },
        nextOrder: function() {
            if(!this.length) {
                return 1;
            }
            if(window.debug) console.info('nextOrder:',this.last().get('order'));
            return this.last().get('order') + 1;
        },
        comparator: function(todo) {
            if(window.debug) console.info('comparator: ',todo)
            return todo.get('order') || this.nextOrder();
        }
    });
});
