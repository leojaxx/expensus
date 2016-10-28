;(function(exports) {
	var app = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {}
	};

	// export for global use
	exports.expensus = app;

	// start the application
	$(function() {

		//handlebars helpers
		Handlebars.registerHelper('transaction-date', function(date) {
			return moment(date).format("MMM Do YY");
		});
		Handlebars.registerHelper("capitalize", function(transactionType) {
			return transactionType[0].toUpperCase() + transactionType.toLowerCase().substring(1);
		});		

    expensus.transactions = new expensus.Collections.Transactions();

		expensus.transactions.fetch();

		expensus.latestFiveView = new expensus.Views.LatestFiveView({
			collection: expensus.transactions
		});
		expensus.addTransactionView = new expensus.Views.AddTransactionView({
			collection: expensus.transactions
		});
		expensus.allTransView = new expensus.Views.AllTransView({
			collection: expensus.transactions
		});
		expensus.chartView = new expensus.Views.ChartView({
			collection: expensus.transactions
		});
		expensus.applicationView = new expensus.Views.ApplicationView({collection: expensus.transactions});
		expensus.router = new expensus.Routers.AppRouter({collection: expensus.transactions});

		Backbone.history.start();

	});
	
}(this));