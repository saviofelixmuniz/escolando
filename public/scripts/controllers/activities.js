angular.module('escolando')
.controller('ActivityController', function controller ($scope, Easy, Principal, User, $state, Courses) {
    Principal.identity().then(function (user) {
        $scope.user = user;
        if (user.role==='student' || user.role==='parent') $scope.loadStudentActivities(user);
    });

    $scope.params = {};
    $scope.group = Courses.getSelectedGroup();
    var course = Courses.getSelectedCourse();

    if (!$scope.group) {
        $state.go('groups');
        return;
    } else {
        Easy.query('subjects', {courses_id: course._id}).then(function (subjects) {
            $scope.subjects = subjects;
        });
    }

    $scope.loadStudentActivities = function (user) {
        if (user.role==='student') {
            Easy.query('student', {user_id: user._id}).then(function (student) {
              Easy.query('activities', {group_id: student[0].group_id}).then(function (activities) {
                  $scope.activities = activities;
                  console.log(activities);
              });
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
        if (course && newVal.group && newVal.subject) {
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
