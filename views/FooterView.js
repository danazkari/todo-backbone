define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TodoCollection',
    'libs/text!/templates/stats.html'
], function($, _, Backbone, TodoCollection, statsHtml) {
    return Backbone.View.extend({
        tagName: "footer",
        template: _.template(statsHtml),
        events: {
            "click #clear-completed": "clearCompleted"
        },
        initialize: function(TodoList) {
            this.TodoList = TodoList;
            return this;
        },
        render: function(goto) {
            if(!goto) {
                goto = {
                    url: '/#',
                    title: 'Home'
                }
            }
            this.goto = goto;
            var done = this.TodoList.done().length;
            var remaining = this.TodoList.remaining().length;

            this.$el.html(this.template({
                done: done,
                remaining: remaining,
                goto: goto
            }));

            return this;
        },
        clearCompleted: function() {
            _.invoke(this.TodoList.done(), 'destroy');
            this.render(this.goto);
            return false;
        }
    });
});
