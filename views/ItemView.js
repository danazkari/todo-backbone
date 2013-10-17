define([
    'jquery',
    'underscore',
    'backbone',
    'libs/text!templates/item.html'
], function($, _, Backbone, itemHtml) {
    return Backbone.View.extend({
        tagName: 'li',
        template: _.template(itemHtml),
        events: {},
        initialize: function() {
            return this;
        },
        render: function() {
            this.model.on('destroy', this.remove, this);
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            return this;
        }
    });
});
