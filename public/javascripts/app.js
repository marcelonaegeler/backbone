var pwd = function(href) {
	return document.location.href.match('localhost') ? '/backbone'+ href : href;
}

var formToObject = function(form) {
	var childList = {};
	console.log(form);
	for(var child in form.childNodes) {
		console.log(form.childNodes[child]);
	}
}

var GetUsers = Backbone.Collection.extend({
	url: pwd('/data/users.php')
});

var GetUserData = Backbone.Collection.extend({
	url: pwd('/data/user.php')
});

var UserList = Backbone.View.extend({
	el: '.page'
	, render: function() {
		var $scope = this;
		this.$el.html('Loading');

		var view = $.get(pwd('/views/home.html'));

		view.success(function(html) {
			var users = new GetUsers();
			var template = _.template(html);

			users.fetch({
				success: function(data) {
					$scope.$el.html(template({ users: data.models }));
				}
			});
		});
	}
});

var UserForm = Backbone.View.extend({
	el: '.page'
	, template: function(callback) {
		var view = $.get(pwd('/views/user.html'));
		view.success(function(html) {
			return callback(html)
		});
	}
	, getData: function(id, callback) {
		if(!id)
			return callback();
		else {
			var user = new GetUserData();
			user.fetch({
				data: {
					_id: id
				}
				, success: function(data) {
					return callback(data);
				}
			});
		}
	}
	, render: function(options) {
		$scope = this;
		this.$el.html('Loading');

		this.template(function(html) {
			$scope.getData(options.id, function(data) {
				options = data ? { user: data.models[0] } : { user: {} };
				console.log(options);
				var template = _.template(html)(options);
				$scope.$el.html(template);
			})
		});
	}
	, events: {
		'submit .formUser': 'saveUser'
	}
	, saveUser: function(ev) {
		var details = $(ev.currentTarget).serialize();
		formToObject(details);

		return false;
	}
});

var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
		, 'user': 'user'
		, 'user/:id': 'user'
	}
});

var userList = new UserList();
var userForm = new UserForm();

var router = new Router();

router.on('route:home', function() {
	userList.render();
});

router.on('route:user', function(id) {
	userForm.render({ id: id });
});

Backbone.history.start();
