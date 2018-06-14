angular.module('escolando')
.controller('MarksController', function ($scope, Easy, User, Marks) {
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

    $scope.test = function () {
        console.log($scope.marks);
    };
    $scope.getStudentAvg = function (studentId) {
        var marks = $scope.marks[studentId];
        var sum = 0;
        for (var mark of Object.keys(marks)) {
            sum += marks[mark].value;
        }

        return sum / $scope.activities.length;
    };

    $scope.$watchCollection('{course: course, group: group, subject: subject}', function (newVal) {
        if (newVal.course && newVal.group && newVal.subject) {
            Easy.query('activities', {group_id: newVal.group, subject_id: newVal.subject}).then(function (activities) {
                $scope.activities = activities;
                console.log($scope.activities);
            });

            User.getStudentsInGroup(newVal.group).then(function (students) {
                $scope.students = students;
                console.log($scope.students);
            });

            Marks.getGroupSubjectMarks(newVal.group, newVal.subject).then(function (marks) {
                $scope.marks = marks;
                console.log($scope.marks);
            });
        }
    });
});