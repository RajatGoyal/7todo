var scope = null,
    http = null,
    filter = null;

/*
Utils start here
*/

function get_epoch_now()
{
    return Math.floor(Date.now() / 1000);
}

/*
Utils end here
*/

function stodoAppController($scope, $http, $filter, fileUpload){
    scope = $scope;
    http = $http;
    filter = $filter;

    /*
    Views start here
    */
    $scope.views = {};
    $scope.alerts = [];
    $scope.ids = [];
    $scope.views.header = '';
    $scope.views.body = 'views/body.html';
    $scope.views.footer = 'views/footer.html';

    /*
    Views End
    */

    $scope.init=function(activeStore){
        $http({
                method: 'GET',
                url: 'http://api.shopsense.co/transaction/api/v1/company/list'
        }).success(function(data){
                $scope.companies = data.response;
                $scope.activeCompany = $scope.activeCompany || $scope.companies[2];
                $scope.activecompany_id = $scope.activeCompany.pk;
                $http({
                    method: 'GET',
                    url: 'http://api.shopsense.co/transaction/api/v1/store/list/?company_id='+$scope.activeCompany.pk
                }).success(function(data){
                    $scope.stores = data.response;
                    $scope.activeStore = $scope.activeStore || $scope.stores[9];
                    $scope.activestore_id = $scope.activeStore.pk;
                    $scope.active_upload_type = $scope.active_upload_type.toLocaleLowerCase().replace(' ','-');
                    $("#fade").toggle();
                });
            });
        };

    $scope.setStore=function(store){
        $scope.activeStore = store;
        $scope.activestore_id = store.pk;
        $scope.activecompany_id = $scope.activeCompany.pk;
    };

    $scope.setUploadType=function(upload_type){
        $scope.active_upload_type = upload_type.toLocaleLowerCase().replace(' ','-');
    };

    $scope.loadStores=function(company){
        loadStores(company);
    };

    $scope.upload_data = function(){
        filename = constructFileName($scope.activecompany_id, $scope.activestore_id, $scope.active_upload_type);
        console.log(filename);

        var file = $('#file').scope().myFile;
        console.log('file is ' + JSON.stringify(file));

        var uploadUrl = "http://localhost:8000/api/v1/file/add/unclean/";

        fileUpload.uploadFileToUrl(file, uploadUrl, $scope.activecompany_id, $scope.activestore_id, $scope.active_upload_type).then(function(response){
            $("#fade").toggle();
            var id = response;
            window.setInterval(function(){
                scope.get_status(id)
                }
                , 10000);
        });

    };

    $scope.addAlert = function(msg, type, id) {
        if($scope.ids.contains(id))
        {
          var idx = $scope.ids.indexOf(id);
          $scope.alerts[idx] = {msg: msg, type:type};
        }
        else
        {
            $scope.alerts.push({msg: msg, type:type});
            $scope.ids.push(id);
        }
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
        $scope.ids.splice(index, 1);
    };

    $scope.get_status = function(id){
        $http({
            method: 'GET',
            url: 'http://localhost:8000/api/v1/tasks/info/?id='+id
        }).success(function(data){
                if('message' in data)
                {
                    if(data.message != null)
                    {
                        data.message = JSON.stringify(data.message);
                        if(data.message.indexOf('False') > -1){
                            var msg = data.state + ' : ' + data.message;
                            $scope.addAlert(msg, 'danger',id)
                        }
                        else{
                            var msg = data.state + ' : ' + data.message;
                            $scope.addAlert(msg, 'success',id)
                        }
                    }
                    else
                    {
                        var msg = data.state + ' : ' + data.message;
                        $scope.addAlert(msg, 'info',id)
                    }
                }
            }).error(function(data){
                var success = data.success
                var msg = data.state + ' : ' + data.message;
                $scope.addAlert(msg, 'danger', id)

            });

    };
}