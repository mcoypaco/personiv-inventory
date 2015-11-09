adminModule
	.controller('hardDiskToolbarController', ['$scope', 'HardDisk', function($scope, HardDisk){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};
		
		/**
		 * Properties of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Assets';
		$scope.toolbar.childState = 'Hard Disk';
	}]);