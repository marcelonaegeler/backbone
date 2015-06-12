var GetUsers = Backbone.Collection.extend({
	url: '/backbone/users.json'
});

var UserList = Backbone.View.extend({
	el: '.page'
	, render: function() {
		var $scope = this;
		var users = new GetUsers();

		this.$el.html('Loading');
		
		users.fetch({
			type: 'POST'
			, success: function(data) {
				var userListTemplate = document.getElementById('user-list-template').innerHTML;
				var template = _.template(userListTemplate)({ users: data.models });
				$scope.$el.html(template);
			}
		});
	}
});

var UserForm = Backbone.View.extend({
	el: '.page'
	, render: function() {
		var view = document.getElementById('user-form-template').innerHTML;
		
		var template = _.template(view)();
		this.$el.html(template);
	}
});

var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
		, 'user/:id': 'user'
	}
});

var userList = new UserList();
var userForm = new UserForm();

var router = new Router();

router.on('route:home', function() {
	userList.render();
});

router.on('route:user', function() {
	userForm.render();
});

Backbone.history.start();