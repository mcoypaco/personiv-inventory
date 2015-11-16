var adminModule = angular.module('adminModule', [
	/* Shared Module */
	'sharedModule',
]);
adminModule
	.config(['$stateProvider',  function($stateProvider, assetService){
		$stateProvider
			/**
			 * Home Route
			 * Tutorial Page
			 *
			*/
			.state('main', {
				url: '/',
				views: {
					'': {
						templateUrl: '/app/components/admin/views/main.view.html',
						controller: 'mainViewController',
					},
					'left-sidenav@main': {
						templateUrl: '/app/components/admin/templates/sidenavs/main-left.sidenav.html',
						controller: 'leftSidenavController',
					},
					'toolbar@main': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'mainToolbarController',
					},
					'content-container@main': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'mainContentContainerController',
					},
					'content@main': {
						templateUrl: '/app/components/admin/templates/content/main.content.template.html',
						controller: 'mainContentController',	
					},
					'right-sidenav@main': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'mainRightSidenavController',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
			/**
			 * Dashboard Routes
			 * 
			*/

			/**
			 * Displays charts of inventory
			 * 
			*/
			.state('main.analysis', {
				url: 'dashboard/analysis',
				views: {
					'toolbar': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'analysisToolbarController',
					},
					'content': {
						templateUrl: '/app/components/admin/templates/content/analysis.content.template.html',
						controller: 'analysisContentController',
					},
					'right-sidenav': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'analysisRightSidenavController',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
			/**
			 * Displays floor plan of the building
			 * 
			*/
			.state('main.floor-plan', {
				url: 'dashboard/floor-plan/{departmentID}',
				params: {'departmentID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'floorPlanContentContainerController',
					},
					'toolbar@main.floor-plan': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'floorPlanToolbarController',
					},
					'content@main.floor-plan': {
						templateUrl: '/app/components/admin/templates/content/floor-plan.content.template.html',
						controller: 'floorPlanContentController',
					},
					'right-sidenav@main.floor-plan': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'floorPlanRightSidenavController',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
			/**
			 * Display Work Station
			 *
			*/
			.state('main.work-station', {
				url: 'dashboard/floor-plan/{departmentID}/work-station/{workStationID}',
				params: {'departmentID':null, 'workStationID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'workStationContentContainerController',
					},
					'toolbar@main.work-station': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'workStationToolbarController',
					},
					'content@main.work-station': {
						templateUrl: '/app/components/admin/templates/content/work-station.content.template.html',
						controller: 'workStationContentController',
					},
					'right-sidenav@main.work-station': {
						templateUrl : '/app/components/admin/templates/sidenavs/work-station-right.sidenav.html',
						controller: 'workStationRightSidenavController',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})

			/**
			 * Assets Routes
			 *
			*/
			.state('main.assets', {
				url: 'assets/{assetID}',
				params: {'assetID':null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.contentContainerController(index);
						}]
					},
					'toolbar@main.assets': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.toolbarController(index);
						}]
					},
					'content@main.assets': {
						templateUrl: '/app/components/admin/templates/content/assets.content.template.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.contentController(index);
						}]
					},
					// 'right-sidenav@main.assets': {
					// 	templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
					// 	controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
					// 		var index = $stateParams.assetID - 1;
					// 		return assetService.rightSidenavController(index);
					// 	}]
					// },
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
			/**
			 * Department Routes
			 *
			*/
			.state('main.department', {
				url: 'department/{departmentID}',
				params: {'name':null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'departmentContentContainerController',
					},
					'toolbar@main.department': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'departmentToolbarController',
					},
					'content@main.department': {
						templateUrl: '/app/components/admin/templates/content/department.content.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
	}]);
adminModule
	.service('assetService', ['$http', function($http){
		var assets = [
			{
				'controller' : 'cpu',
			},
			{
				'controller' : 'hardDisk',
			},
			{
				'controller' : 'headset',
			},
			{
				'controller' : 'keyboard'
			},
			{
				'controller' : 'memory',
			},
			{
				'controller' : 'monitor',
			},
			{
				'controller' : 'mouse',
			},
			{
				'controller' : 'printer',
			},
			{
				'controller' : 'scanner',
			},
			{
				'controller' : 'software',
			},
			{
				'controller' : 'ups',
			},
			{
				'controller' : 'videoCard',
			},
			{
				'controller' : 'otherComponent',
			},
		];

		return{
			get: function(){
				return assets;
			},
			toolbarController: function(id){
				// returns assetNameToolbarController
				return assets[id].controller  + 'ToolbarController';
			},
			contentContainerController: function(id){
				// returns assetNameContentContainerController
				return assets[id].controller  + 'ContentContainerController';
			},
			contentController: function(id){
				// returns assetNameContentController
				return assets[id].controller  + 'ContentController';
			},
			rightSidenavController: function(id){
				// returns assetNameRightSidenavController
				return assets[id].controller  + 'RightSidenavController';
			},
		};
	}]);
adminModule
	.service('departmentService', function(){
		var departments = [];

		return {
			set: function(data){
				departments = data;
			},
			get: function(){
				return departments;
			},
		};
	});
adminModule
	.controller('addEmployeeDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Department', 'Employee', function($scope, $stateParams, $mdDialog, Preloader, Department, Employee){
		$scope.employee = {};
		$scope.employee.department_id = $stateParams.departmentID;

		Department.show($stateParams.departmentID)
			.success(function(data){
				$scope.department = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Employee.store($scope.employee)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('departmentContentContainerController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Employee', function($scope, $stateParams, $mdDialog, Preloader, Employee){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;

		$scope.subheader = {};
		$scope.subheader.state = 'departments';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.employee.paginated = {};
			$scope.employee.page = 2;
			Employee.paginate(departmentID)
				.then(function(data){
					$scope.employee.paginated = data.data;
					$scope.employee.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addEmployeeDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-employee-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Employee
		 *
		*/
		$scope.employee = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.employee.page = 2;
		//

		Employee.paginate(departmentID)
			.then(function(data){
				$scope.employee.paginated = data.data;
				$scope.employee.paginated.show = true;

				$scope.employee.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.employee.busy || ($scope.employee.page > $scope.employee.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.employee.busy = true;

					// Calls the next page of pagination.
					Employee.paginate(departmentID, $scope.employee.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.employee.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.employee.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.employee.busy = false;

							console.log('loaded');
						});
				}
			}, function(){
				Preloader.error();
			});

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.employee.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.employee.paginated.show = false;
			Preloader.preload()
			Employee.search(departmentID, $scope.employee)
				.success(function(data){
					$scope.employee.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('departmentToolbarController', ['$scope', '$stateParams', 'Department', 'departmentService', function($scope, $stateParams, Department, departmentService){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/

		/**
		 * Fetch the department data stored at deparments servce.
		 *
		*/
		var index = $stateParams.departmentID - 1;
		$scope.toolbar.parentState = 'Departments';

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.childState = departments[index].name;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.childState = departments[index].name;
		}
	}]);
adminModule
	.controller('leftSidenavController', ['$scope', '$mdSidenav', 'Department', 'departmentService', function($scope, $mdSidenav, Department, departmentService){
		$scope.menu = {};

		$scope.menu.section = [
			{
				'name':'Dashboard',
			},
			{
				'name':'Assets',
			},
			{
				'name':'Departments',
			},
		];

		$scope.menu.pages = [
			/* 0 */
			[
				{
					'name':'Analysis',
					'state':'main.analysis',
				},
				{
					'name':'Floor Plan',
					'state':'main.floor-plan',
				},
			],
			/* 1 */
			[
				{
					'name': 'CPU',
					'state':'main.assets',
					'id': 1
				},
				{
					'name': 'Hard Disk',
					'state':'main.assets',
					'id': 2
				},
				{
					'name': 'Headset',
					'state':'main.assets',
					'id': 3
				},
				{
					'name': 'Keyboard',
					'state':'main.assets',
					'id': 4
				},
				{
					'name': 'Memory',
					'state':'main.assets',
					'id': 5
				},
				{
					'name': 'Monitor',
					'state':'main.assets',
					'id': 6
				},
				{
					'name': 'Mouse',
					'state':'main.assets',
					'id': 7
				},
				{
					'name': 'Printer',
					'state':'main.assets',
					'id': 8
				},
				{
					'name': 'Scanner',
					'state':'main.assets',
					'id': 9
				},
				{
					'name': 'Software',
					'state':'main.assets',
					'id': 10
				},
				{
					'name': 'UPS',
					'state':'main.assets',
					'id': 11
				},
				{
					'name': 'Video Card',
					'state':'main.assets',
					'id': 12
				},
				{
					'name': 'Other Components',
					'state':'main.assets',
					'id': 13
				},
			],
		];

		/* AJAX Request Department */
		Department.index()
			.success(function(data){
				$scope.menu.pages.push(data);
				this.index = $scope.menu.pages.length - 1;
				/* Save the department on service for future use */
				departmentService.set($scope.menu.pages[this.index]);
			});

		// set section as active
		$scope.setActive = function(index){
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').toggleClass('active'));
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').siblings().removeClass('active'));
		};
	}]);
adminModule
	.controller('mainContentContainerController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		// $scope.fab.icon = 'mdi-plus';
		// $scope.fab.label = 'Add';
		
		$scope.fab.show = false;

		// $scope.fab.action = function(){
		// 	return;
		// };
	}]);
adminModule
	.controller('mainContentController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Main Content Initialized';
	}]);
adminModule
	.controller('mainRightSidenavController', ['$scope', function($scope){
		/**
		 * Object of Right Sidenav
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Right Sidenav Initialized';
	}]);
adminModule
	.controller('mainToolbarController', ['$scope', '$state', function($scope, $state){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.childState = 'Home';
	}]);
adminModule
	.controller('mainViewController', ['$scope', '$mdSidenav', 'User', function($scope, $mdSidenav, User){
		/**
		 * Fetch authenticated user information
		 *
		*/
		User.index()
			.success(function(data){
				$scope.user = data;
			});

		/**
		 * Toggles Left Sidenav
		 *
		*/
		$scope.toggleSidenav = function(menuId) {
		    $mdSidenav(menuId).toggle();
		};
	}]);
adminModule
	.controller('toolbarController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
		$scope.toolbar = {};

		$scope.toolbar.parentState = 'Home';
	}]);
adminModule
	.controller('addDesktopDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Desktop', function($scope, $state, $mdDialog, Preloader, Desktop){
		$scope.cpu = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Desktop.store($scope.cpu)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('cpuContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Desktop', function($scope, $mdDialog, Preloader, Desktop){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.page = 2;
			Desktop.paginate()
				.then(function(data){
					$scope.desktop.paginated = data.data;
					$scope.desktop.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addDesktopDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-cpu-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Desktop
		 *
		*/
		$scope.desktop = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.desktop.page = 2;
		//

		Desktop.paginate()
			.then(function(data){
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					Desktop.paginate($scope.desktop.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.desktop.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.desktop.paginated.show = false;
			Preloader.preload()
			Desktop.search($scope.desktop)
				.success(function(data){
					$scope.desktop.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

	}]);

adminModule
	.controller('cpuContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('cpuRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('cpuToolbarController', ['$scope', 'Desktop', function($scope, Desktop){
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
		$scope.toolbar.childState = 'CPU';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);
adminModule
	.controller('addHardDiskDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'HardDisk', function($scope, $state, $mdDialog, Preloader, HardDisk){
		$scope.hardDisk = {};

		$scope.hardDisk.capacities = [
			{'capacity':'160GB'},
			{'capacity':'320GB'},
			{'capacity':'500GB'},
			{'capacity':'650GB'},
			{'capacity':'1.0TB'},
			{'capacity':'2.0TB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			HardDisk.store($scope.hardDisk)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('hardDiskContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'HardDisk', function($scope, $mdDialog, Preloader, HardDisk){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.page = 2;
			HardDisk.paginate()
				.then(function(data){
					$scope.hardDisk.paginated = data.data;
					$scope.hardDisk.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addHardDiskDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-hard-disk-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Hard Disk
		 *
		*/
		$scope.hardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.hardDisk.page = 2;

		HardDisk.paginate()
			.then(function(data){
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					HardDisk.paginate($scope.hardDisk.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.hardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.hardDisk.paginated.show = false;
			Preloader.preload();
			HardDisk.search($scope.hardDisk)
				.success(function(data){
					$scope.hardDisk.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('hardDiskContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('hardDiskRightSidenavController', ['$scope', function($scope){
		//
	}])
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
adminModule
	.controller('addHeadsetDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Headset', function($scope, $state, $mdDialog, Preloader, Headset){
		$scope.headset = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Headset.store($scope.headset)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('headsetContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Headset', function($scope, $mdDialog, Preloader, Headset){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.headset.paginated = {};
			$scope.headset.page = 2;
			Headset.paginate()
				.then(function(data){
					$scope.headset.paginated = data.data;
					$scope.headset.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addHeadsetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-headset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.headset = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.headset.page = 2;

		Headset.paginate()
			.then(function(data){
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					Headset.paginate($scope.headset.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.headset.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.headset.paginated.show = false;
			Preloader.preload();
			Headset.search($scope.headset)
				.success(function(data){
					$scope.headset.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('headsetContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('headsetRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('headsetToolbarController', ['$scope', 'Headset', function($scope, Headset){
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
		$scope.toolbar.childState = 'Headset';
	}]);
adminModule
	.controller('addKeyboardDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Keyboard', function($scope, $state, $mdDialog, Preloader, Keyboard){
		$scope.keyboard = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Keyboard.store($scope.keyboard)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('keyboardRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('keyboardContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Keyboard', function($scope, $mdDialog, Preloader, Keyboard){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.keyboard.paginated = {};
			$scope.keyboard.page = 2;
			Keyboard.paginate()
				.then(function(data){
					$scope.keyboard.paginated = data.data;
					$scope.keyboard.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addKeyboardDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-keyboard-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.keyboard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.keyboard.page = 2;

		Keyboard.paginate()
			.then(function(data){
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					Keyboard.paginate($scope.keyboard.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.keyboard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.keyboard.paginated.show = false;
			Preloader.preload();
			Keyboard.search($scope.keyboard)
				.success(function(data){
					$scope.keyboard.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('keyboardContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('keyboardToolbarController', ['$scope', '$stateParams', 'Keyboard', function($scope, $stateParams, Keyboard){
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
		$scope.toolbar.childState = 'Keyboard';
	}]);
adminModule
	.controller('addMemoryDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Memory', function($scope, $state, $mdDialog, Preloader, Memory){
		$scope.memory = {};

		$scope.memory.sizes = [
			{'size': '1GB'},
			{'size': '2GB'},
			{'size': '4GB'},
			{'size': '8GB'},
		];

		$scope.memory.speeds = [
			{'speed':'1333MHz'},
			{'speed':'1600MHz'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Memory.store($scope.memory)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('memoryContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Memory', function($scope, $mdDialog, Preloader, Memory){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.memory.paginated = {};
			$scope.memory.page = 2;
			Memory.paginate()
				.then(function(data){
					$scope.memory.paginated = data.data;
					$scope.memory.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMemoryDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-memory-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.memory = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.memory.page = 2;

		Memory.paginate()
			.then(function(data){
				$scope.memory.paginated = data.data;
				$scope.memory.paginated.show = true;

				$scope.memory.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.memory.busy || ($scope.memory.page > $scope.memory.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.memory.busy = true;

					// Calls the next page of pagination.
					Memory.paginate($scope.memory.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.memory.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.memory.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.memory.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.memory.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.memory.paginated.show = false;
			Preloader.preload();
			Memory.search($scope.memory)
				.success(function(data){
					$scope.memory.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('memoryContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('memoryRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('memoryToolbarController', ['$scope', '$stateParams', 'Memory', function($scope, $stateParams, Memory){
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
		$scope.toolbar.childState = 'Memory';
	}]);
adminModule
	.controller('addMonitorDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Monitor', function($scope, $state, $mdDialog, Preloader, Monitor){
		$scope.monitor = {};

		$scope.monitor.sizes = [
			{'size':'16"'},
			{'size':'16.5"'},
			{'size':'17"'},
			{'size':'17.5"'},
			{'size':'18"'},
			{'size':'18.5"'},
			{'size':'19"'},
			{'size':'19.5"'},
			{'size':'20"'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Monitor.store($scope.monitor)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('monitorContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Monitor', function($scope, $mdDialog, Preloader, Monitor){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.monitor.paginated = {};
			$scope.monitor.page = 2;
			Monitor.paginate()
				.then(function(data){
					$scope.monitor.paginated = data.data;
					$scope.monitor.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMonitorDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-monitor-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.monitor = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.monitor.page = 2;

		Monitor.paginate()
			.then(function(data){
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					Monitor.paginate($scope.monitor.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.monitor.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.monitor.paginated.show = false;
			Preloader.preload();
			Monitor.search($scope.monitor)
				.success(function(data){
					$scope.monitor.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('monitorContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('monitorRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('monitorToolbarController', ['$scope', '$stateParams', 'Monitor', function($scope, $stateParams, Monitor){
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
		$scope.toolbar.childState = 'Monitor';
	}]);
adminModule
	.controller('addMouseDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Mouse', function($scope, $state, $mdDialog, Preloader, Mouse){
		$scope.mouse = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Mouse.store($scope.mouse)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('mouseContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Mouse', function($scope, $mdDialog, Preloader, Mouse){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.mouse.paginated = {};
			$scope.mouse.page = 2;
			Mouse.paginate()
				.then(function(data){
					$scope.mouse.paginated = data.data;
					$scope.mouse.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMouseDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-mouse-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.mouse = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mouse.page = 2;

		Mouse.paginate()
			.then(function(data){
				$scope.mouse.paginated = data.data;
				$scope.mouse.paginated.show = true;

				$scope.mouse.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mouse.busy || ($scope.mouse.page > $scope.mouse.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mouse.busy = true;

					// Calls the next page of pagination.
					Mouse.paginate($scope.mouse.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mouse.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mouse.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mouse.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.mouse.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.mouse.paginated.show = false;
			Preloader.preload();
			Mouse.search($scope.mouse)
				.success(function(data){
					$scope.mouse.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('mouseContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('mouseRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('mouseToolbarController', ['$scope', '$stateParams', 'Mouse', function($scope, $stateParams, Mouse){
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
		$scope.toolbar.childState = 'Mouse';
	}]);
adminModule
	.controller('addOtherComponentDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'OtherComponent', function($scope, $state, $mdDialog, Preloader, OtherComponent){
		$scope.otherComponent = {};

		$scope.otherComponent.sizes = [
			{'size':'1GB'},
			{'size':'2GB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			OtherComponent.store($scope.otherComponent)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('otherComponentContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'OtherComponent', function($scope, $mdDialog, Preloader, OtherComponent){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.page = 2;
			OtherComponent.paginate()
				.then(function(data){
					$scope.otherComponent.paginated = data.data;
					$scope.otherComponent.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addOtherComponentDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-other-component-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for otherComponent
		 *
		*/
		$scope.otherComponent = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.otherComponent.page = 2;

		OtherComponent.paginate()
			.then(function(data){
				$scope.otherComponent.paginated = data.data;
				$scope.otherComponent.paginated.show = true;

				$scope.otherComponent.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.otherComponent.busy || ($scope.otherComponent.page > $scope.otherComponent.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.otherComponent.busy = true;

					// Calls the next page of pagination.
					OtherComponent.paginate($scope.otherComponent.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.otherComponent.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.otherComponent.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.otherComponent.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.otherComponent.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.otherComponent.paginated.show = false;
			Preloader.preload();
			OtherComponent.search($scope.otherComponent)
				.success(function(data){
					$scope.otherComponent.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('otherComponentContentController', ['$scope', function($scope){
		//
	}]);
adminModule
	.controller('otherComponentRightSidenavController', ['$scope', function($scope){
		//
	}]);
adminModule
	.controller('otherComponentToolbarController', ['$scope', '$stateParams', 'OtherComponent', function($scope, $stateParams, OtherComponent){
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
		$scope.toolbar.childState = 'Other Component';
	}]);
adminModule
	.controller('addPrinterDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Printer', function($scope, $state, $mdDialog, Preloader, Printer){
		$scope.printer = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Memory.store($scope.memory)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('printerContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Printer', function($scope, $mdDialog, Preloader, Printer){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.printer.paginated = {};
			$scope.printer.page = 2;
			Printer.paginate()
				.then(function(data){
					$scope.printer.paginated = data.data;
					$scope.printer.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addPrinterDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-printer-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.printer = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.printer.page = 2;

		Printer.paginate()
			.then(function(data){
				$scope.printer.paginated = data.data;
				$scope.printer.paginated.show = true;

				$scope.printer.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.printer.busy || ($scope.printer.page > $scope.printer.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.printer.busy = true;

					// Calls the next page of pagination.
					Printer.paginate($scope.printer.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.printer.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.printer.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.printer.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.printer.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.printer.paginated.show = false;
			Preloader.preload();
			Printer.search($scope.printer)
				.success(function(data){
					$scope.printer.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('printerContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('printerRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('printerToolbarController', ['$scope', '$stateParams', 'Printer', function($scope, $stateParams, Printer){
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
		$scope.toolbar.childState = 'Printer';
	}]);
adminModule
	.controller('addScannerDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Scanner', function($scope, $state, $mdDialog, Preloader, Scanner){
		$scope.scanner = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Scanner.store($scope.scanner)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('scannerContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Scanner', function($scope, $mdDialog, Preloader, Scanner){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.scanner.paginated = {};
			$scope.scanner.page = 2;
			Scanner.paginate()
				.then(function(data){
					$scope.scanner.paginated = data.data;
					$scope.scanner.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addScannerDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-scanner-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Scanner
		 *
		*/
		$scope.scanner = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.scanner.page = 2;

		Scanner.paginate()
			.then(function(data){
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					Scanner.paginate($scope.scanner.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.scanner.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.scanner.paginated.show = false;
			Preloader.preload();
			Scanner.search($scope.scanner)
				.success(function(data){
					$scope.scanner.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('scannerContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('scannerRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('scannerToolbarController', ['$scope', '$stateParams', 'Scanner', function($scope, $stateParams, Scanner){
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
		$scope.toolbar.childState = 'Scanner';
	}]);
adminModule
	.controller('addSoftwareDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Software', function($scope, $state, $mdDialog, Preloader, Software){
		$scope.software = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Software.store($scope.software)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('softwareContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Software', function($scope, $mdDialog, Preloader, Software){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.software.paginated = {};
			$scope.software.page = 2;
			Software.paginate()
				.then(function(data){
					$scope.software.paginated = data.data;
					$scope.software.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addSoftwareDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-software-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for software
		 *
		*/
		$scope.software = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.software.page = 2;

		Software.paginate()
			.then(function(data){
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					Software.paginate($scope.software.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.software.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.software.paginated.show = false;
			Preloader.preload();
			Software.search($scope.software)
				.success(function(data){
					$scope.software.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('softwareContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('softwareRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('softwareToolbarController', ['$scope', '$stateParams', 'Software', function($scope, $stateParams, Software){
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
		$scope.toolbar.childState = 'Software';
	}]);
adminModule
	.controller('addUpsDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'UPS', function($scope, $state, $mdDialog, Preloader, UPS){
		$scope.ups = {};

		$scope.ups.wattages = [
			{'wattage':'550W'},
			{'wattage':'650W'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			UPS.store($scope.ups)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('upsContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'UPS', function($scope, $mdDialog, Preloader, UPS){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.ups.paginated = {};
			$scope.ups.page = 2;
			UPS.paginate()
				.then(function(data){
					$scope.ups.paginated = data.data;
					$scope.ups.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addUpsDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-ups-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for ups
		 *
		*/
		$scope.ups = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.ups.page = 2;

		UPS.paginate()
			.then(function(data){
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					UPS.paginate($scope.ups.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.ups.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.ups.paginated.show = false;
			Preloader.preload();
			UPS.search($scope.ups)
				.success(function(data){
					$scope.ups.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('upsContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('upsRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('upsToolbarController', ['$scope', '$stateParams', 'UPS', function($scope, $stateParams, UPS){
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
		$scope.toolbar.childState = 'UPS';
	}]);
adminModule
	.controller('addVideoCardDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'VideoCard', function($scope, $state, $mdDialog, Preloader, VideoCard){
		$scope.videoCard = {};

		$scope.videoCard.sizes = [
			{'size':'1GB'},
			{'size':'2GB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			VideoCard.store($scope.videoCard)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('videoCardContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'VideoCard', function($scope, $mdDialog, Preloader, VideoCard){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.videoCard.paginated = {};
			$scope.videoCard.page = 2;
			VideoCard.paginate()
				.then(function(data){
					$scope.videoCard.paginated = data.data;
					$scope.videoCard.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addVideoCardDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-video-card-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for videoCard
		 *
		*/
		$scope.videoCard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.videoCard.page = 2;

		VideoCard.paginate()
			.then(function(data){
				$scope.videoCard.paginated = data.data;
				$scope.videoCard.paginated.show = true;

				$scope.videoCard.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.videoCard.busy || ($scope.videoCard.page > $scope.videoCard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.videoCard.busy = true;

					// Calls the next page of pagination.
					VideoCard.paginate($scope.videoCard.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.videoCard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.videoCard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.videoCard.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.videoCard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.videoCard.paginated.show = false;
			Preloader.preload();
			VideoCard.search($scope.videoCard)
				.success(function(data){
					$scope.videoCard.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
adminModule
	.controller('videoCardContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('videoCardRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('videoCardToolbarController', ['$scope', '$stateParams', 'VideoCard', function($scope, $stateParams, VideoCard){
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
		$scope.toolbar.childState = 'Video Card';
	}]);
adminModule
	.controller('analysisContentController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Analysis Content Initialized';
	}]);
adminModule
	.controller('analysisRightSidenavController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Analysis Right Sidenav Initialized';
	}]);
adminModule
	.controller('analysisToolbarController', ['$scope', function($scope){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Dashboard';
		$scope.toolbar.childState = 'Analysis';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};
	}]);
adminModule
	.controller('addWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Department', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, Department, WorkStation){
		$scope.workStation = {};
		$scope.workStation.department_id = $stateParams.departmentID;

		$scope.patterns = [
			{
				'pattern' : 'A6-A-A***',
				'value' :  'A6-A-A',
				'meaning': 'Aeon 6th Floor - Division A - Admin Station Number',
			},

			{
				'pattern' : 'A6-A-P***',
				'value' :  'A6-A-P',
				'meaning': 'Aeon 6th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A6-B-A***',
				'value' :  'A6-B-A',
				'meaning': 'Aeon 6th Floor - Division B - Admin Station Number',
			},


			{
				'pattern' : 'A6-B-P***',
				'value' :  'A6-B-P',
				'meaning': 'Aeon 6th Floor - Division B - Production Station Number',
			},
		];

		Department.show($stateParams.departmentID)
			.success(function(data){
				$scope.department = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			WorkStation.store($scope.workStation)
				.success(function(){
					// Stops Preloader 
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				})
		};

	}]);
adminModule
	.controller('floorPlanContentContainerController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;

		$scope.subheader = {};
		$scope.subheader.state = 'floor-plan';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.workStation.paginated = {};
			$scope.workStation.page = 2;
			WorkStation.paginate($stateParams.departmentID)
				.then(function(data){
					$scope.workStation.paginated = data.data;
					$scope.workStation.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addWorkStationDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-work-station-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = true;

		/**
		 * Object for Desktop
		 *
		*/
		$scope.workStation = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.workStation.page = 2;
		//

		WorkStation.paginate(departmentID)
			.then(function(data){
				$scope.workStation.paginated = data.data;
				$scope.workStation.paginated.show = true;

				$scope.workStation.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.workStation.busy || ($scope.workStation.page > $scope.workStation.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.workStation.busy = true;

					// Calls the next page of pagination.
					WorkStation.paginate(departmentID, $scope.workStation.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.workStation.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.workStation.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.workStation.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.workStation.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.workStation.paginated.show = false;
			Preloader.preload()
			WorkStation.search(departmentID, $scope.workStation)
				.success(function(data){
					$scope.workStation.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

	}]);

adminModule
	.controller('floorPlanContentController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){
		// onclick of 
		$scope.show = function(id){
			$state.go('main.work-station', {'departmentID':$stateParams.departmentID, 'workStationID': id});
		};
	}]);
adminModule
	.controller('floorPlanRightSidenavController', ['$scope', '$state', '$stateParams', 'departmentService', 'Department',  function($scope, $state, $stateParams, departmentService, Department){
		/**
		 * Object for content view
		 *
		*/
		$scope.rightSidenav = {};

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.rightSidenav.departments = data;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.rightSidenav.departments = departments;
		}

	}]);
adminModule
	.controller('floorPlanToolbarController', ['$scope', '$stateParams', 'departmentService', 'Department', function($scope, $stateParams, departmentService, Department){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Floor Plan';

		var index = $stateParams.departmentID - 1;
		$scope.toolbar.parentState = 'Floor Plan';

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.childState = departments[index].name;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.childState = departments[index].name;
		}
	}]);
adminModule
	.controller('addAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		WorkStation.show($stateParams.workStationID)
			.success(function(data){
				$scope.workStation = data;
			});

		$scope.assets = [
			{
				'name': 'Desktop',
				'type':'desktop',

			},
			{
				'name':'Hard Disk',
				'type':'hard_disk',
			},
			{
				'name':'Headset',
				'type':'headset',
			},
			{
				'name':'Keyboard',
				'type':'keyboard',
			},
			{
				'name':'Memory',
				'type':'memory',
			},
			{
				'name':'Monitor',
				'type':'monitor',
			},
			{
				'name':'Mouse',
				'type':'mouse',
			},
			{
				'name':'Software',
				'type':'software',
			},
			{
				'name':'Uninterruptible Power Supply',
				'type':'ups',
			},
			{
				'name':'Video Card',
				'type':'video_card',
			},
			{
				'name':'Other Components',
				'type':'others',
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Desktop.store($scope.cpu)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		var brand = {'search':'brand'};
		var name = {'search':'name'};

		// fetch all distinct components data
		Desktop.distinct(brand)
			.success(function(data){
				$scope.assets[0].brands = data;
			});

		HardDisk.distinct(brand)
			.success(function(data){
				$scope.assets[1].brands = data;
			});

		Headset.distinct(brand)
			.success(function(data){
				$scope.assets[2].brands = data;
			});

		Keyboard.distinct(brand)
			.success(function(data){
				$scope.assets[3].brands = data;
			});

		Memory.distinct(brand)
			.success(function(data){
				$scope.assets[4].brands = data;
			});

		Monitor.distinct(brand)
			.success(function(data){
				$scope.assets[5].brands = data;
			});

		Mouse.distinct(brand)
			.success(function(data){
				$scope.assets[6].brands = data;
			});

		Software.distinct(name)
			.success(function(data){
				$scope.assets[7].brands = data;
			});

		UPS.distinct(brand)
			.success(function(data){
				$scope.assets[8].brands = data;
			});

		VideoCard.distinct(brand)
			.success(function(data){
				$scope.assets[9].brands = data;
			});

		OtherComponent.distinct(brand)
			.success(function(data){
				$scope.assets[10].brands = data;
			});
	}]);
adminModule
	.controller('workStationContentContainerController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;

		$scope.subheader = {};
		$scope.subheader.state = 'floor-plan';

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = true;

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.workStation.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			// $scope.workStation.paginated.show = false;
			// Preloader.preload()
			// WorkStation.search(departmentID, $scope.workStation)
			// 	.success(function(data){
			// 		$scope.workStation.results = data;
			// 		Preloader.stop();
			// 	})
			// 	.error(function(data){
			// 		Preloader.error();
			// 	});
		};

	}]);

adminModule
	.controller('workStationContentController', ['$scope', '$stateParams', 'WorkStation', function($scope, $stateParams, WorkStation){
		
	}]);
adminModule
	.controller('workStationRightSidenavController', ['$scope', '$state', '$stateParams', 'Preloader', 'WorkStation', 'Department', function($scope, $state, $stateParams, Preloader, WorkStation, Department){
		/**
		 * Object for content view
		 *
		*/
		$scope.rightSidenav = {};

		var departmentID = $stateParams.departmentID;

		WorkStation.department(departmentID, $stateParams.workStationID)
			.success(function(data){
				$scope.rightSidenav.workStations = data;
			})
			.error(function(){
				Preloader.error();
			});

		$scope.rightSidenav.show = function(workStationID){
			$state.go('main.work-station', {'departmentID': departmentID, 'workStationID': workStationID});
		};
	}]);
adminModule
	.controller('workStationToolbarController', ['$scope', '$state', '$stateParams', 'departmentService', 'Department', 'WorkStation', function($scope, $state, $stateParams, departmentService, Department, WorkStation){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		var departmentID = $stateParams.departmentID;
		var index = departmentID - 1;

		$scope.toolbar.showBack = true;

		$scope.toolbar.back = function(){
			$state.go('main.floor-plan', {'departmentID': departmentID});
		};

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.parentState = departments[index].name;
				})
				.error(function(){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.parentState = departments[index].name;
		}

		WorkStation.show($stateParams.workStationID)
			.success(function(data){
				$scope.toolbar.childState = data.name;
			})
			.error(function(){
				Preload.error();
			});
	}]);
//# sourceMappingURL=admin.js.map
