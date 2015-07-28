var myApp = angular.module("myApp", []);
var mes = {text: String};
myApp.controller('myCtrl', function($http, $scope){
	var button = $("#submit");
	var btn_DA = $("#deleteAll");
	
	button.click(function(){
		mes.text = $scope.todo;
		$http.post('/node/post/', mes);
		refresh();
	});
	
	$http.get('/node/').success(function(response){
		$scope.todos = response;
		console.log(response);
	});
	
	btn_DA.click(function(){
		$http.post('/node/post/DA/');
		refresh();
	});
	
	
	function refresh(){
		$http.get('/node/').success(function(response){
			$scope.todos = response;
			console.log(response);
		});
		$scope.todo = "";
	}
});

