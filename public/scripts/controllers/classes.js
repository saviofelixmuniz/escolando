angular.module('escolando').controller('ClassesController', function ($scope, $state, $filter, Principal, Courses, Easy) {
    Principal.identity().then(function (user) {
        $scope.user = user;
        if (user.role==='student' || user.role==='parent') $scope.loadStudentActivities(user);
    });

    $scope.creating = false;
    $scope.params = {};
    $scope.group = Courses.getSelectedGroup();
    var course = Courses.getSelectedCourse();

    if (!$scope.group) {
        $state.go('groups');
        return;
    }

    Easy.query('subjects', {courses_id: course._id}).then(function (subjects) {
        $scope.subjects = subjects;
        $scope.params.date = getToday();
    });

    function loadClasses() {
        $scope.classes = [];
        for (var subject of $scope.subjects) {
            var query = {date: formatDate($scope.params.date), subject: subject._id, group: $scope.group._id};
            Easy.query('classes', query).then(function (classes) {
                if (!classes[0])
                    return;
                classes[0].subject_name = findSubject(classes[0].subject);
                $scope.classes.push(classes[0]);
            });
        }
    }

    function findSubject (subjectId) {
        for (var subject of $scope.subjects) {
            if (subjectId === subject._id) {
                return subject.name;
            }
        }
    }

    $scope.$watch('params.date', function (date) {
        if (!date) {
            return;
        }
        loadClasses()
    });

    $scope.save = function () {
        Easy.create('classes', {
            date: formatDate($scope.params.date),
            subject: $scope.params.subject,
            plan: $scope.params.plan,
            group: $scope.group._id
        }).then(function (res) {
            console.log(res);
            $scope.creating = false;
            loadClasses();
        })
    };

    function formatDate(date) {
        return $filter('date')(date, 'yyyy-MM-dd');
    }
    function getToday () {
        return new Date();
    }


});