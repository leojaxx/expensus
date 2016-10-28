;(function(exports) {
	var AllTransView = Backbone.View.extend({
		el: ".all-trans-page",

		events: {
			"keyup #search-input": "searchFilter",
			"click .show-details": "showDetails",
		},

    template: Handlebars.compile($("#all-trans-template").html()),

		initialize: function(data) {
			this.listenTo(this.collection, "add", this.render);
			this.listenTo(this.collection, "destroy", this.render);
			this.collection.on("reset", this.render, this);
			this.on("change:searchFilter", this.filterBySearch, this);
			this.transactions = this.collection.toJSON();
			this.render();
		},
		render: function() {
			this.collection.sortByDate();
			this.$('#listTrans').html(this.template({
				transactions: this.collection.toJSON()
			}));
		},
		showDetails: function(evt) {
			evt.preventDefault();
			$(evt.target).toggleClass("active");
			$(evt.target).siblings(".details").slideToggle("fast");
		},
		searchFilter: function(evt){
			if(evt) {
				evt.preventDefault();
			}
			this.searchFilter = evt.target.value;
			this.trigger("change:searchFilter");
		},
		filterBySearch: function() {
			this.collection.reset(this.transactions, {silent: true});
			var searchQuery = this.searchFilter,
					results = _.filter(this.collection.models, function(transactions) {
						return transactions.get("category").toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
					});
			this.collection.reset(results);
		}
	});
	exports.expensus.Views.AllTransView = AllTransView;
}(this));