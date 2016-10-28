;(function (exports) {
	var Transaction = Backbone.Model.extend({
		defaults:  {
			amount: 0,
			transactionDate: "",
			transactionType: "debit",
			category: "miscellaneous",
			description: ""
		},
		categories: [
			"rent",
			"groceries",
			"gas",
			"electricity",
			"personal",
			"transportation",
			"medical",
			"insurance",
			"miscellaneous",
			"salary",
			"interest",
			"bonus"
		],
		transactionTypes: [
			"credit",
			"debit"
		],
		initialize: function() {
				this.set({transactionDate: this.attributes.transactionDate || Date.now()}, {validate: true});
		},
		validate: function(attrs, options) {
			if (attrs['transactionType'] !== undefined && 
				!_.contains(this.transactionTypes, attrs['transactionType'].toLowerCase())) {
				return 'Invalid type: ' + attrs['transactionType'];
			} else if (attrs['category'] !== undefined && 
				!_.contains(this.categories, attrs['category'].toLowerCase())) {
				return 'Invalid category: ' + attrs['category'];
			} else if (attrs['transactionDate'] !== undefined && 
				_.isNaN(parseInt(attrs['transactionDate'])) || attrs['transactionDate'] < 	0) {
				return 'Invalid date: '+ attrs['transactionDate'];
			} else if (attrs['amount'] !== undefined && 
				_.isNaN(parseInt(attrs['amount'])) || attrs['amount'] < 0) {
				return 'Invalid amount: '+ attrs['amount'];
			}
			return null;
		}
	});

	// export for global use
	exports.expensus.Models.Transaction = Transaction;

}(this));