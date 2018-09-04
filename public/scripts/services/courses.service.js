angular.module('escolando').factory('Courses', function ($http, Easy) {
    var _groupSelected;
    var _courseSelected;

    return {
        getAll: function () {
            return Easy.getAll('courses').then(function (courses) {
                return courses;
            });
        },

        selectGroup: function (group, course) {
            _groupSelected = group;
            _courseSelected = course;
        },

        getSelectedGroup: function() {
            return _groupSelected;
        },

        getSelectedCourse: function() {
            return _courseSelected;
        }
    }
});