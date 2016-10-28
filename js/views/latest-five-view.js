;(function(exports) {
	var LatestFiveView = Backbone.View.extend({
		el: ".latest-five-target",

		template: Handlebars.compile($("#latest-five-template").html()),

		events: {
			"click .category": "log"
		},

		log: function(evt) {
			console.log(this);
		},
		initialize: function() {
			this.listenTo(this.collection, "add", this.render);
			this.listenTo(this.collection, "change", this.render);
			this.render();
		},
		render: function() {
			this.$el.html(this.template({
				transactions: this.collection.latestFive(true)
			}));
		}
	});

	exports.expensus.Views.LatestFiveView = LatestFiveView;

}(this));