angular.module('escolando')
.controller('MarksController', function ($scope, Easy, User, Marks, Principal) {
    Principal.identity().then(function (user) {
        $scope.user = user;
        if (user.role==='student' || user.role==='parent') $scope.loadStudentActivities(user);
    });

    var gActivities = {};
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
                console.log(activities);
                $scope.activities = activities;
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
        var stdActivities = $scope.marks[studentId];
        var sum = 0;
        var totalWeight = 0;
        for (var activityId of Object.keys(stdActivities)) {
            var activityWeight = gActivities[activityId].weight;
            sum += stdActivities[activityId].value * activityWeight
            totalWeight += activityWeight;
        }

        return sum / totalWeight;
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
    }, true)
});
