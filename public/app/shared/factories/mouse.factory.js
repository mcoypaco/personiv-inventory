sharedModule
	.factory('Mouse', ['$http', function($http){
		var urlBase = '/mouse';

		return {
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
			},

			/**
			 * Fetch all departments.
			 * @return: Array of Objects
			*/
			index: function(){
				return $http.get(urlBase);
			},

			/**
			 * Fetch specific department.
			 * @return: Object
			*/
			show: function(id){
				return $http.get(urlBase +  '/' + id);
			},

			/**
			 * Store single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			store: function(data){
				return $http.post(urlBase, data);
			},

			/**
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
		};
	}]);