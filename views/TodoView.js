define([
    'jquery',
    'underscore',
    'backbone',
    'libs/text!templates/todo.html'
], function($, _, Backbone, todoHtml) {
    return Backbone.View.extend({
        tagName: "li",
        template: _.template(todoHtml),
        events: {
            "click .toggle": "toggleDone",
            "dblclick .view": "edit",
            "click a.destroy": "clear",
            "keypress .edit": "updateOnEnter",
            "blur .edit": "closeEdit"
        },
        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
            return this;
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$el.find('.edit');
            return this;
        },
        toggleDone: function() {
            this.model.save({done: !this.model.get('done')});
            return this;
        },
        edit: function() {
            this.$el.addClass("editing");
            this.input.focus();
            return this;
        },
        closeEdit: function() {
            var value = this.input.val();
            if (!value) {
                this.clear();
            } else {
                this.model.save({title: value});
                this.$el.removeClass("editing");
            }
        },
        updateOnEnter: function(e) {
            if(e.keyCode == 13) {
                this.closeEdit();
            }
            return this;
        },
        clear: function() {
            this.model.destroy();
            return this;
        }
    });
});
