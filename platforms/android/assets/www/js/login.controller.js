/**
 * Created by rajatgoyal on 23/08/14.
 */
var scope = null,
    http = null,
    filter = null;

/*
 Utils start here
 */

/*
 Utils end here
 */

function stodoAppLoginController($scope, $http, $filter, $location)
{
    scope = $scope;
    http = $http;
    filter = $filter;

    /*
     Views start here
     */
    $scope.views = {};
    /*
     Views End
     */
    $scope.changeLocation = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) {
            window.location = url;
        }
        else {
            //only use this if you want to replace the history stack
            //$location.path(url).replace();

            //this this if you want to change the URL and add it to the history stack
            $location.path(url);
            $scope.$apply();
        }
    };

    $scope.login = function(){
        console.log('in login');
        facebookConnectPlugin.login(function(){
            console.log('login success');
            alert(JSON.stringify(response));
        }, function(){
            console.log('login failed');
            alert(JSON.stringify(response));
        });
    };

    $scope.getAccessToken = function(){
        facebookConnectPlugin.getAccessToken(
            function (response) { alert(JSON.stringify(response)) },
            function (response) { alert(JSON.stringify(response)) });
    };

    $scope.init=function(){
        console.log('init')
//        $http({
//            method: 'GET',
//            url: 'http://api.shopsense.co/transaction/api/v1/company/list'
//        }).success(function(data){
//                $scope.companies = data.response;
//                $scope.activeCompany = $scope.activeCompany || $scope.companies[2];
//                $scope.activecompany_id = $scope.activeCompany.pk;
//            }).error(function(data){
//                var success = data.success
//                var msg = data.state + ' : ' + data.message;
//                $scope.addAlert(msg, 'danger', id)
//
//            });
    };



}