;(function (exports){

	var ChartView = Backbone.View.extend({
		el: ".home-page",
		template: Handlebars.compile($("#chart-template").html()),
		chart: null,
		initialize: function () {
			this.listenTo(this.collection, "add", this.render);
			this.listenTo(this.collection, "change", this.render);
			this.$(".chart-view-div").html(this.template());
			this.chart = new Chart(this.$("#expense-chart")[0].getContext("2d"));
			this.render();
		},
		render: function() {
			var data = this.chartData();
			if (this.chart) {
				this.chart.Doughnut(data, {
					responsive: true,
	    		animateScale: true
				});
			}
		},
		chartData: function() {
			var collection = this.collection.latestFive(true);
			var data = [];
			var getData = function(color, highlight, labels, vals, collection) {
				var object = {
					color: color,
					highlight: highlight,
					chartData: [
						{
							value: "",
							label: ""
						}
					]
				};
				for (var i = 0; i < labels.length; i++ ) {
					object.chartData.push(0);
				}
				for (var j = 0; j < vals.length; j++ ) {
					object.chartData.push(0);
				}
				for (var i = 0; i < collection.length; i++ ) {
					var item = collection[i];
					var label = labels.indexOf(item.category);
					var val = vals.indexOf(item.amount);
					object.chartData[ { value: val, label: label } ]++;
				}
				return object;
			};
			function getRandomColor() {
				var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 16)];
		    }
		    return color;
			}
			for (var i = 0; i < collection.length; i++ ) {
				var object = collection[i];
				var color = getRandomColor();	
				var highlight = getRandomColor();
				data.push({
					value: parseFloat(object.amount),
					color: color,
					highlight: highlight,
					label: object.category
				});
			}
			return data;
		}
	});

	exports.expensus.Views.ChartView = ChartView;
}(this));