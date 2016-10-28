;(function(exports) {
	var ApplicationView = Backbone.View.extend({
		el: ".container",

		events: {
			"click .home-page-link": "showHomePage",
			"click .all-trans-link": "showAllTransPage",
		},		
		showHomePage: function(evt) {
			if(evt) {
				evt.preventDefault();
			}
			this.$allTransPage.hide();
			this.$homePage.show();
			expensus.router.navigate("");
		},
		showAllTransPage: function(evt) {
			if(evt) {
				evt.preventDefault();
			}			
			this.$homePage.hide();
			this.$allTransPage.show();
			expensus.router.navigate("transactions");
		},
		showAddTransPage: function(evt) {
			if (evt) {
				evt.preventDefault();
			}
			this.$homePage.hide();
			this.$allTransPage.hide();
			expensus.router.navigate("addTrans");
		},
		initialize: function() {
			this.$homePage = this.$(".home-page");
			this.$allTransPage = this.$(".all-trans-page");
		}
	});

	exports.expensus.Views.ApplicationView = ApplicationView;
}(this));