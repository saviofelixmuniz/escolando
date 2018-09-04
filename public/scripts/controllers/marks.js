angular.module('escolando')
.controller('MarksController', function ($scope, Easy, User, Marks, Principal, $state, Courses) {
    Principal.identity().then(function (user) {
        $scope.user = user;
        if (user.role==='student' || user.role==='parent') $scope.loadStudentActivities(user);
    });

    var gActivities = {};
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
          Easy.query('student', {'user_id': user._id}).then(function (student) {
              Easy.query('activities', {'group_id': student[0].group_id}).then(function (activities) {
                  console.log(activities);
                  $scope.activities = activities;
              });
          });
        } else if (user.role==='parent') {
            User.getStudentByParentId(user._id).then(function (student) {
                Easy.query('activities', {'group_id': student.group_id}).then(function (activities) {
                    console.log(activities);
                    $scope.activities = activities;
                });
            });
        }
    };

    $scope.getStudentAvg = function (studentId) {
        if (!isUndefined($scope.marks)) {
            var stdActivities = $scope.marks[studentId];
            var sum = 0;
            var totalWeight = 0;
            if (!isUndefined(stdActivities) && stdActivities !== null) {
                for (var activityId of Object.keys(stdActivities)) {
                    var activityWeight = gActivities[activityId].weight;
                    sum += stdActivities[activityId].value * activityWeight
                    totalWeight += activityWeight;
                }
                return sum / totalWeight;
            }
        }

        return 0;
    };

    $scope.$watchCollection('{course: course, group: group, subject: subject}', function (newVal) {
        if (newVal.course && newVal.group && newVal.subject) {
            Easy.query('activities', {group_id: newVal.group, subject_id: newVal.subject}).then(function (activities) {
                $scope.activities = activities;
                for (var activity of $scope.activities) {
                    gActivities[activity._id] = activity;
                }
            });

            User.getStudentsInGroup(newVal.group).then(function (students) {
                $scope.students = students;
            });

            Marks.getGroupSubjectMarks(newVal.group, newVal.subject).then(function (marks) {
                $scope.marks = marks;
            });
        }
    });

    $scope.$watch('marks', function (marks) {
        Marks.commitMarks($scope.group, $scope.subject, marks).then();
    }, true);

    function isUndefined(value) {
        var undef = void(0);
        return value === undef;
    }

});
