;(function(exports) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "showHome",
			"transactions": "showTrans"
		},
		showHome: function() {
			expensus.applicationView.showHomePage();
		},
		showTrans: function() {
			expensus.applicationView.showAllTransPage();
		}
	});
	
	exports.expensus.Routers.AppRouter = AppRouter;
}(this));
