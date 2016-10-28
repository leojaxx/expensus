;(function (exports) {
	var Transactions = Backbone.Collection.extend({
		// stuff and thangs
		model: expensus.Models.Transaction,
		localStorage: new Backbone.LocalStorage('TransactionsCollection'),
		latestFive: function(toJSON) {
			this.sortByDate(-1); // sort latest first

			if (!toJSON) {
				return _.first(this.models, 5);
			} else {
				var models = _.first(this.models, 5),
						idx = -1,
						json = [],
						model;

				while (model = models[++idx]) {
					json.push(model.attributes);
				}

				return json;
			}
		},
		comparator: function(transaction) {
			return transaction.get("category");
		},
		sortByDate: function(dir) {
			dir = dir || -1;
			this.comparator = function(transaction) {
				return dir * transaction.get("transactionDate");
			};
			this.sort();
		},
		sortByAmount: function(dir) {
			dir = dir || -1;
			this.comparator = function(transaction) {
				return dir * transaction.get("amount");
			};
			this.sort();
		}
	});

	exports.expensus.Collections.Transactions = Transactions;

}(this));