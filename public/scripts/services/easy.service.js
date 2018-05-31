/**
 * @author Sávio Muniz
 */

angular.module('escolando').factory('Easy', function ($http) {
    const EASY = 'api/easy/';

    return {
        getOne : function (table, id) {
            return $http.get(EASY + `${table}/${id}`).then(function (res) {
                return res.data;
            });
        },
        getAll: function (table) {
            return $http.get(EASY + `${table}`).then(function (res) {
                return res.data;
            })
        },
        query: function (table, query) {
            return $http.post(EASY + `${table}/query`, query, { headers: {'Content-Type': 'application/json; charset=UTF-8' } }).then(function (res) {
                return res.data;
            })
        },
        update: function (table, id, obj) {
            return $http.put(EASY + `${table}/${id}`, obj, { headers: {'Content-Type': 'application/json; charset=UTF-8' } }).then(function (res) {
                return res.data;
            });
        },
        create: function (table, obj) {
            return $http.post(EASY + `${table}`, obj, { headers: {'Content-Type': 'application/json; charset=UTF-8' } }).then(function (res) {
                return res.data;
            });
        }
    }
});