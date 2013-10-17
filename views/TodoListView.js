define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TodoCollection',
    'views/TodoView',
    'views/FooterView',
    'libs/text!templates/todo-list.html',
    'backbone.localStorage'
], function($, _, Backbone, TodoCollection, TodoView, FooterView, todoListHtml) {
    return Backbone.View.extend({
        template: _.template(todoListHtml),
        events: {
            "keypress #new-todo": "createOnEnter",
            "click #toggle-all": "toggleAllItems"
        },
        initialize: function(options) {
            this.TodoList = new TodoCollection();

            this.TodoList.on('add', this.addOne, this);
            this.TodoList.on('reset', this.addAll, this);
            this.TodoList.on('all', this.render, this);
            this.$el.html(this.template({}));

            this.TodoList.fetch();

            return this;
        },
        render: function() {
            var remaining = this.TodoList.remaining().length;

            var footerView = new FooterView(this.TodoList);
            this.$el.append(footerView.render({
                url: '#/full-list',
                title: 'Full List'
            }).$el);

            if(this.TodoList.length) {
                this.$el.find("#toggle-all")[0].checked = !remaining;
                this.$el.find("#toggle-all").show();
                this.$el.find("#toggle-all+label").show();
            } else {
                this.$el.find("#toggle-all").hide();
                this.$el.find("#toggle-all+label").hide();
            }

            return this;
        },
        addOne: function(todo) {
            var view = new TodoView({
                model: todo
            });
            this.$el.find("#todo-list").append(view.render().$el);
            return this;
        },
        addAll: function() {
            this.TodoList.each(this.addOne, this);
            return this;
        },
        createOnEnter: function(e) {
            if(e.keyCode != 13) {
                return;
            }

            if(!this.$el.find("#new-todo").val()) {
                return;
            }

            this.TodoList.create({
                title: this.$el.find("#new-todo").val(),
                done: false
            });

            this.$el.find("#new-todo").val('');
            return this;
        },
        toggleAllItems: function() {
            var done = this.$el.find("#toggle-all")[0].checked;
            this.TodoList.each(function(todo){
                todo.save({
                    'done': done
                });
            });
            return this;
        }
    });
});
