sharedModule
	.factory('AssetType', ['$http', function($http){
		var urlBase = '/asset-type';

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
			checkAssetType: function(data){
				return $http.post(urlBase + '-check-asset-type', data);
			},
		};
	}]);