var Users = Backbone.Collection.extend({
	url: '/backbone/users.php'
});

var UserList = Backbone.View.extend({
	el: '.page'
	, render: function () {
		var $scope = this;
		var users = new Users();

		users.fetch({
			type: 'POST'
			, success: function(data) {
				//var userListTemplate = document.getElementById('user-list-template').innerHTML;
				var userListTemplate = $('#user-list-template').html();
				var template = _.template(userListTemplate, { users: data });
				$scope.$el.html(template);
			}
		});
	}
});

var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	}
});

var userList = new UserList();

var router = new Router();
router.on('route:home', function() {
	userList.render();
});

Backbone.history.start();