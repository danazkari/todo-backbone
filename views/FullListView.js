define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TodoCollection',
    'views/ItemView',
    'views/FooterView',
    'libs/text!templates/full-list.html',
    'libs/text!templates/item.html',
], function($, _, Backbone, TodoCollection, ItemView, FooterView, listHtml, itemHtml) {
    return Backbone.View.extend({
        template: _.template(listHtml),
        itemTemplate: _.template(itemHtml),
        events: {},
        initialize: function() {
            this.TodoList = new TodoCollection();

            this.TodoList.on('add', this.addOne, this);
            this.TodoList.on('reset', this.addAll, this);
            this.TodoList.on('all', this.render, this);

            this.$el.html(this.template({}));

            this.TodoList.fetch();

            return this;
        },
        render: function() {
            var footerView = new FooterView(this.TodoList);
            this.$el.append(footerView.render().$el);
            return this;
        },
        addOne: function(item) {
            var view = new ItemView({model: item});
            this.$el.find("#full-list").append(view.render().$el);
            return this;
        },
        addAll: function() {
            this.TodoList.each(this.addOne, this);
            return this;
        }
    });
});
