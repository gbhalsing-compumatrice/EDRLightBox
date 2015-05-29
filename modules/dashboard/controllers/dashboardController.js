angular.module('EDRLightbox').controller('dashboardController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService) {

    $scope.selectedTab = 1;
    $scope.physicalSettingsTab = "Physical Settings";
    $scope.OtherTabname = "Other";

    $scope.IsAquiFlow = true;
    $scope.disableCol = true;
    $scope.IsPermitDataTbl = true;
    $scope.IsSoilDataTbl = false;
    $scope.IsWaterWell = false;
    $scope.IsNotesDataTbl = false;
    $scope.selectedRow = "";
    bindPhysicalSettings();
    bindOtherTabData();
    bindSitesData();
    bindAquiFlowDataData();
    bindBuildingPermitData();
    bindSummaryData();
    $scope.rowDisableId = false;


    // Bind Sites Data
    function bindSitesData() {
       
        DashboardService.getSitesData().then(function (result) {
            $scope.sitesData = result;

        }, function (error) {
            
        });
    }

    function bindAquiFlowDataData() {

        DashboardService.getAquiFlowData().then(function (result) {
            $scope.aquiFlowData = result;

        }, function (error) {

        });
    }

    function bindWaterWellDataData() {
      
        DashboardService.getWaterWellData().then(function (result) {
            $scope.waterWellsData = result;

        }, function (error) {

        });
    }

    function bindSoilData() {

        DashboardService.getSoilData().then(function (result) {
            $scope.soilData = result;

        }, function (error) {

        });
    }

    function bindBuildingPermitData() {
      
        DashboardService.getBuildingPermitData().then(function (result) {
            $scope.buildingPermitData = result;

        }, function (error) {

        });
    }

    function bindNotesData() {
     
        DashboardService.getNotesData().then(function (result) {
            $scope.notesTblData = result;

        }, function (error) {

        });
    }

    //function bindDBNameList() {
    //    $scope.dbList = [
    //        {""},{}
    //    ];
    //}

    function bindPhysicalSettings() {

        $scope.physicalSettings = [
            { "pId": "1", "name": "Aquiflow", "count": "5","IsPhysicalActive" : false},
            { "pId": "2", "name": "Water Wells", "count": "10", "IsPhysicalActive": false},
            { "pId": "3", "name": "Oil & Gas Wells", "count": "10", "IsPhysicalActive": true },
            { "pId": "4", "name": "Soil Data", "count": "5", "IsPhysicalActive": false }];
    }

    function bindOtherTabData() {

        $scope.OtherTab = [
            { "Id": "1", "name": "Building Permits" },
            { "Id": "2", "name": "Mobile Photos" },
            { "Id": "3", "name": "Mobile Notes" }
           ];
    }

    $scope.LoadPhysicalTableData = function(value,pname) {
        console.log("Table " + value);
        $scope.physicalSettingsTab = pname;

        if(value == 1)
        {
            $scope.IsAquiFlow = true;
            $scope.disableCol = true;
            $scope.IsSoilDataTbl = false;
            $scope.IsWaterWell = false;
            
            bindAquiFlowDataData();
           
        }else if(value ==2)
        {
            $scope.IsAquiFlow = false;
            $scope.IsWaterWell = true;
            $scope.disableCol = false;
            $scope.IsSoilDataTbl = false;
            bindWaterWellDataData();
            
           
        } else if (value == 3) {
            
            
        } else if (value == 4) {
            $scope.IsAquiFlow = false;
            bindSoilData();
            $scope.IsSoilDataTbl = true;
            $scope.IsWaterWell = false;
        }
    }

    $scope.LoadOtherTableData = function (value, pname) {
       
        $scope.OtherTabname = pname;
        console.log("val " +value + "name " + pname)

        if (value == 1) {

            $scope.IsPermitDataTbl = true;
            $scope.IsNotesDataTbl = false;
            bindBuildingPermitData();

        } else if (value == 2) {
           

        } else if (value == 3) {
            $scope.IsPermitDataTbl = false;
           
            bindNotesData();
            $scope.IsNotesDataTbl = true;
        }
    }

    function bindSummaryData() {
        var data;

        DashboardService.getSummaryData().then(function (result) {
         
            data = result;

            $scope.tableParams = new NgTableParams({
                page: 1,            // show first page
                total: 1,
                count: 10          // count per page
            }, {
                counts: [],
                groupBy: 'dbName',
                // total: data.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                            data;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                    var pageData = data.slice((params.page() - 1) * params.count(), params.page() * params.count()),
                    TPsum = 0;
                    sumFirstVal = 0;
                    sumSecondVal = 0;
                    sumThirdVal = 0;
                    sumFourthVal = 0;
                    sumFifthVal = 0;
                    sumGrandTotalVal = 0;

                    // calculate summary

                    angular.forEach(data, function (item) {

                        sumFirstVal += (isNaN(item.firstVal) ? 0 : item.firstVal);

                        sumSecondVal += (isNaN(item.secondVal) ? 0 : item.secondVal);

                        sumThirdVal += (isNaN(item.thirdVal) ? 0 : item.thirdVal);

                        sumFourthVal += (isNaN(item.fourthVal) ? 0 : item.fourthVal);

                        sumFifthVal += (isNaN(item.fifthVal) ? 0 : item.fifthVal);

                        sumGrandTotalVal += (isNaN(item.firstVal) ? 0 : item.firstVal) + (isNaN(item.secondVal) ? 0 : item.secondVal) + (isNaN(item.thirdVal) ? 0 : item.thirdVal) + (isNaN(item.fourthVal) ? 0 : item.fourthVal) + (isNaN(item.fifthVal) ? 0 : item.fifthVal);

                    });
                    $scope.firstValTotal = parseInt(sumFirstVal);

                    $scope.secondValTotal = parseInt(sumSecondVal);

                    $scope.thirdValTotal = parseInt(sumThirdVal);

                    $scope.fourthValTotal = parseInt(sumFourthVal);

                    $scope.fifthValTotal = parseInt(sumFifthVal);
                    $scope.grandTotalVal = sumGrandTotalVal;
                }
            })

        }, function (error) {

        });

    }

    $scope.getSelectedRowData = function (index, siteid) {
       
        $scope.selectedRow = siteid;
        
        bindSitePopupData(siteid);
        

        $("#panel").toggle("slide");
    }

    function bindSitePopupData(siteid)
    {
        
        var data = findById(siteid);
        console.log("dsssssss " + JSON.stringify(data))

        console.log("dist" + data.distance)
        $scope.siteId = data.Id;
        $scope.siteDistance = data.distance;
        $scope.siteDirection = "North";
        $scope.siteElevation = data.rel;
        $scope.siteName = data.sitename;
        $scope.siteAddress = data.address;
        $scope.sitemapimg = data.mapImage;
        $scope.siteDatabase = data.database;
    }

    function findById(siteid) {
        for (var i = 0; i < $scope.sitesData.length; i++) {
            if ($scope.sitesData[i].Id === siteid) {
                return $scope.sitesData[i];
            }
        }
        throw "Couldn't find site with id: " + siteid;
    }

    $scope.disableRowData = function (siteid) {
        console.log("disable id " + siteid)
        $scope.rowDisableId = siteid;
        
    }

    
}]);