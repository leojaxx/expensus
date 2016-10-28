;(function(exports) {
	var SingleTransView = Backbone.View.extend({
		tagName: "li",

		attributes: function() {
			return {
				class: "transaction"
			};
		},
		events: {
			"click .list-head": "showDetails"
		},
		template: Handlebars.compile($("#all-trans-template").html()),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		showDetails: function(evt) {
			$(evt.target).toggleClass("active");
			$(evt.target).siblings("details").slideToggle("fast");
		}
	});

	exports.expensus.Views.SingleTransView = SingleTransView;
	
}(this));