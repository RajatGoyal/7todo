var stodoApp = angular.module('stodoApp', []);

stodoApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
})


stodoApp.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, {
                    $event: event
                });
            });
        });
    };
});

angular.module('todomvc', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider.when('/', {
            controller: 'TodoCtrl',
            templateUrl: 'index.html'
        }).when('/:status', {
            controller: 'TodoCtrl',
            templateUrl: 'index.html'
        }).otherwise({
            redirectTo: '/'
        });
    });
