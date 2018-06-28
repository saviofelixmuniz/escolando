angular.module('escolando')
.controller('ActivityController', function controller ($scope, Easy, Principal, User) {
    Principal.identity().then(function (user) {
        $scope.user = user;
        if (user.role==='student' || user.role==='parent') $scope.loadStudentActivities(user);
    });
    
    $scope.params = {};

    Easy.getAll('courses').then(function (courses) {
        $scope.courses = courses;
    });
    
    $scope.$watch('course', function (course) {
        Easy.query('groups', {'course_id': course}).then(function (groups) {
            $scope.groups = groups;
        });

        Easy.query('subjects', {courses_id: course}).then(function (subjects) {
            $scope.subjects = subjects;
        });
    });

    $scope.loadStudentActivities = function (user) {
        if (user.role==='student') {
            Easy.query('activities', {group_id: $scope.user.group_id}).then(function (activities) {
                $scope.activities = activities;
                console.log(activities);
            });
        } else if (user.role==='parent') {
            User.getStudentByParentId(user._id).then(function (student) {
                Easy.query('activities', {'group_id': student.group_id}).then(function (activities) {
                    $scope.activities = activities;
                });
            });
        }
    };

    $scope.loadActivities = function() {
        Easy.query('activities', {group_id: $scope.user.group_id}).then(function (activities) {
            $scope.activities = activities;
        });
    };

    $scope.$watchCollection('{course: course, group: group, subject: subject}', function (newVal) {
        if (newVal.course && newVal.group && newVal.subject) {
            console.log(newVal);
            Easy.query('activities', {group_id: newVal.group, subject_id: newVal.subject}).then(function (activities) {
                $scope.activities = activities;
            })
        }
    });
    
    $scope.createActivity = function (newActivity) {
        newActivity.group_id = $scope.group;
        newActivity.subject_id = $scope.subject;
        Easy.create('activities', newActivity).then(function (activity) {
            alert('Tarefa criada com sucesso');
            $scope.params.creatingTasks = false;
            $scope.activities.push(activity);
        });
    }
});
