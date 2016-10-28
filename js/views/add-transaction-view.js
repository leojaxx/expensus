;(function (exports) {
	var AddTransactionView = Backbone.View.extend({
		el: "#add-transaction-page",
		events: {
			"submit .add-transaction-form": "addTransaction"
		},
		initialize: function() {
			this.form = this.$(".add-transaction-form")[0];
		},
		addTransaction: function(evt) {
			if (evt) {
				evt.preventDefault();
			}
			var m = new expensus.Models.Transaction({
				transactionDate: Date.now(),
				transactionType: this.form["trans-type"].value,
				amount: this.form["trans-amount"].value,
				description: this.form["trans-description"].value,
				category: this.form["trans-category"].value
			});

			if(m.validationError === null) {
				this.collection.add(m);
				m.save();
				$(this.el).modal("hide");
				this.form.reset();
			} else {
				alert("Model is invalid: " + m.validationError);
			}
		}
	});

	exports.expensus.Views.AddTransactionView = AddTransactionView;
}(this));