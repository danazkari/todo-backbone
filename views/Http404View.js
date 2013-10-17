define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TodoCollection',
    'views/FooterView',
    'libs/text!templates/http-404.html',
    'libs/text!templates/stats.html'
], function($, _, Backbone, TodoCollection, FooterView, http404, statsHtml) {
    return Backbone.View.extend({
        template: _.template(http404),
        footerTemplate: _.template(statsHtml),
        events: {},
        initialize: function() {
            this.TodoList = new TodoCollection();

            this.$el.html(this.template({}));

            this.TodoList.fetch();
            return this;
        },
        render: function() {
            var footer = new FooterView(this.TodoList);
            this.$el.append(footer.render().$el);
            return this;
        }
    });
});
