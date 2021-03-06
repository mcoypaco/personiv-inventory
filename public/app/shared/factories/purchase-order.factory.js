sharedModule
	.factory('PurchaseOrder', ['$http', function($http){
		var urlBase = '/purchase-order';

		return {
			index: function(){
				return $http.get(urlBase);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
			},
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			filterSearch: function(data){
				return $http.post(urlBase + '-filter-search', data);
			},
		};
	}]);