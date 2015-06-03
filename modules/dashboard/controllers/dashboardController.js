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
    var additionaldata;
    $scope.additionalInfo = [];
    var pastRowId;

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
            bindDBNameList();
        }, function (error) {
            
        });
    }
    function bindsitesAdditionalInfo() {
        DashboardService.getSitesAdditinalInfo().then(function (result) {
            // console.log("Additional " + JSON.stringify(result))
            $scope.additionalInfo = result;

        }, function (error) {

        });
    }

    // Physical Tab Data
    function bindAquiFlowDataData() {

        DashboardService.getAquiFlowData().then(function (result) {
            $scope.aquiFlowData = result;
            $scope.aquiCount = "5";
            $scope.waterWellCount = "10";
            $scope.oilGasCount = "0";
            $scope.Soilcount = "5";
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

    /* Other Tab Data */
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

    function bindGalleryData() {

        DashboardService.getGalleryData().then(function (result) {
            $scope.gallery = result;
            
        }, function (error) {

        });
    }

    function bindDBNameList() {
       
        DashboardService.getDBList().then(function (result) {
            $scope.dbList = result;
        }, function (error) {

        });
    }

   
    

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

    function bindpopupDBList() {
        $scope.popupDBList = [
            { "Id": "1", "name": "UST" },
            { "Id": "2", "name": "DATABASE 3" },
            { "Id": "3", "name": "DATABASE 4" },
        ];
    }

    $scope.LoadPhysicalTableData = function(value) {
       // console.log("Table " + value);
        //$scope.physicalSettingsTab = pname;
        $scope.IsAquiActive = false;
        $scope.IsWaterActive = false;
        $scope.IsOilActive = false;
        $scope.IsSoilActive = false;

        if(value == 1)
        {
            $scope.physicalSettingsTab = "Aquiflow";
            
            getClass("physicalTwo");
            getClass("physicalThree");
            getClass("physicalFour");

            $scope.IsAquiFlow = true;
            $scope.IsSoilDataTbl = false;
            $scope.IsWaterWell = false;
            bindAquiFlowDataData();
           
        }else if(value ==2)
        {
            $scope.physicalSettingsTab = "Water Wells";
           
            getClass("physicalOne");
            getClass("physicalThree");
            getClass("physicalFour");

            $scope.IsAquiFlow = false;
            $scope.IsWaterWell = true;
            $scope.IsSoilDataTbl = false;
            bindWaterWellDataData();
            
           
        } else if (value == 3) {
            
            //$scope.physicalSettingsTab = "Aquiflow";
            if ($scope.IsOilActive == true) {
                getClass("physicalThree");
            } else {
                getClass("physicalOne");
                getClass("physicalTwo");
                getClass("physicalFour");
            }
        } else if (value == 4) {
            $scope.physicalSettingsTab = "Soil Data";
            
            getClass("physicalOne");
            getClass("physicalTwo");
            getClass("physicalThree");
           
            $scope.IsAquiFlow = false;
            $scope.IsSoilDataTbl = true;
            $scope.IsWaterWell = false;
            bindSoilData();
        }
    }

    $scope.LoadOtherTableData = function (value) {
       
        if (value == 1) {

            $scope.OtherTabname = "Building Permits";
            getClass("otherThree");
            getClass("otherTwo");
            $scope.IsPermitDataTbl = true;
            $scope.IsNotesDataTbl = false;
            $scope.isGallary = false;
            bindBuildingPermitData();

        } else if (value == 2) {
            $scope.OtherTabname = "Mobile Photos";
            getClass("otherOne");
            getClass("otherThree");
            $scope.isGallary = true;
            $scope.IsPermitDataTbl = false;
            $scope.IsNotesDataTbl = false;
            bindGalleryData();
        } else if (value == 3) {
          
            getClass("otherOne");
            getClass("otherTwo");
            $scope.OtherTabname = "Mobile Notes";

            $scope.IsPermitDataTbl = false;
            $scope.IsNotesDataTbl = true;
            $scope.isGallary = false;
            bindNotesData();
            
        }
    }
  
    function getClass(id) {
        var classId = id;
        checkClass = $("#" + classId).hasClass("active");

        console.log("class " +checkClass)
        if (checkClass) {
            $('#' + classId).removeClass('active');
            $('#' + classId).addClass('');
        }
    }

    $scope.getDetailsByDB = function (id) {

        if (id == 1) {
            
           // bindsitesAdditionalInfo();
            $timeout(function () {
                //var data = 
                //console.log("zzzzzzzzzzzz " +JSON.stringify ($scope.additionalInfo))
                $scope.Region = $scope.additionalInfo[0].additionalInfoUST.Region;
                $scope.Global_Id = $scope.additionalInfo[0].additionalInfoUST.Global_Id;
                $scope.Latitude = $scope.additionalInfo[0].additionalInfoUST.Latitude;
                $scope.Longitude = $scope.additionalInfo[0].additionalInfoUST.Longitude;
                $scope.Case_Type = $scope.additionalInfo[0].additionalInfoUST.Case_Type;
                $scope.Status = $scope.additionalInfo[0].additionalInfoUST.Status;
                $scope.Status_Date = $scope.additionalInfo[0].additionalInfoUST.Status_Date;
                $scope.Lead_Agency = $scope.additionalInfo[0].additionalInfoUST.Lead_Agency;
                $scope.Local_Agency = $scope.additionalInfo[0].additionalInfoUST.Local_Agency;
                $scope.Case_Worker = $scope.additionalInfo[0].additionalInfoUST.Case_Worker;
                $scope.RB_Case_Number = $scope.additionalInfo[0].additionalInfoUST.RB_Case_Number;
                $scope.LOC_Case_Number = $scope.additionalInfo[0].additionalInfoUST.LOC_Case_Number;
                $scope.File_Location = $scope.additionalInfo[0].additionalInfoUST.File_Location;
                $scope.Potential_Media_Affect = $scope.additionalInfo[0].additionalInfoUST.Potential_Media_Affect;
                $scope.Potential_Contaminants_of_Concern = $scope.additionalInfo[0].additionalInfoUST.Potential_Contaminants_of_Concern;
                $scope.Site_History = $scope.additionalInfo[0].additionalInfoUST.Site_History;
            }, 500);
        }
        else if (id == 2) {
            //bindsitesAdditionalInfo();
            $timeout(function () {
                $scope.Region = $scope.additionalInfo[0].additionalInfoDBTwo.Region;
                $scope.Global_Id = $scope.additionalInfo[0].additionalInfoDBTwo.Global_Id;
                $scope.Latitude = $scope.additionalInfo[0].additionalInfoDBTwo.Latitude;
                $scope.Longitude = $scope.additionalInfo[0].additionalInfoDBTwo.Longitude;
                $scope.Case_Type = $scope.additionalInfo[0].additionalInfoDBTwo.Case_Type;
                $scope.Status = $scope.additionalInfo[0].additionalInfoDBTwo.Status;
                $scope.Status_Date = $scope.additionalInfo[0].additionalInfoDBTwo.Status_Date;
                $scope.Lead_Agency = $scope.additionalInfo[0].additionalInfoDBTwo.Lead_Agency;
                $scope.Local_Agency = $scope.additionalInfo[0].additionalInfoDBTwo.Local_Agency;
                $scope.Case_Worker = $scope.additionalInfo[0].additionalInfoDBTwo.Case_Worker;
                $scope.RB_Case_Number = $scope.additionalInfo[0].additionalInfoDBTwo.RB_Case_Number;
                $scope.LOC_Case_Number = $scope.additionalInfo[0].additionalInfoDBTwo.LOC_Case_Number;
                $scope.File_Location = $scope.additionalInfo[0].additionalInfoDBTwo.File_Location;
                $scope.Potential_Media_Affect = $scope.additionalInfo[0].additionalInfoDBTwo.Potential_Media_Affect;
                $scope.Potential_Contaminants_of_Concern = $scope.additionalInfo[0].additionalInfoDBTwo.Potential_Contaminants_of_Concern;
                $scope.Site_History = $scope.additionalInfo[0].additionalInfoDBTwo.Site_History;
            }, 500);
        } else if (id = 3) {

        }
    }

    $scope.bindDefultAdditionalInfo = function() {
        $timeout(function () {

            //console.log("xxxx " + JSON.stringify($scope.additionalInfo));
            $scope.Region = $scope.additionalInfo[0].additionalInfoDefult.Region;
            $scope.Global_Id = $scope.additionalInfo[0].additionalInfoDefult.Global_Id;
            $scope.Latitude = $scope.additionalInfo[0].additionalInfoDefult.Latitude;
            $scope.Longitude = $scope.additionalInfo[0].additionalInfoDefult.Longitude;
            $scope.Case_Type = $scope.additionalInfo[0].additionalInfoDefult.Case_Type;
            $scope.Status = $scope.additionalInfo[0].additionalInfoDefult.Status;
            $scope.Status_Date = $scope.additionalInfo[0].additionalInfoDefult.Status_Date;
            $scope.Lead_Agency = $scope.additionalInfo[0].additionalInfoDefult.Lead_Agency;
            $scope.Local_Agency = $scope.additionalInfo[0].additionalInfoDefult.Local_Agency;
            $scope.Case_Worker = $scope.additionalInfo[0].additionalInfoDefult.Case_Worker;
            $scope.RB_Case_Number = $scope.additionalInfo[0].additionalInfoDefult.RB_Case_Number;
            $scope.LOC_Case_Number = $scope.additionalInfo[0].additionalInfoDefult.LOC_Case_Number;
            $scope.File_Location = $scope.additionalInfo[0].additionalInfoDefult.File_Location;
            $scope.Potential_Media_Affect = $scope.additionalInfo[0].additionalInfoDefult.Potential_Media_Affect;
            $scope.Potential_Contaminants_of_Concern = $scope.additionalInfo[0].additionalInfoDefult.Potential_Contaminants_of_Concern;
            $scope.Site_History = $scope.additionalInfo[0].additionalInfoDefult.Site_History;
        }, 500);

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

    $scope.hidePopup = function () {
        $('#panel').toggle('slide', { direction: 'right' }, 500);
    }

    $scope.getSelectedRowData = function (siteid) {
       
        $scope.selectedRow = siteid;
        
        
        console.log("past id " + pastRowId);

        if (pastRowId == siteid && pastRowId!=undefined) {
            $('#panel').toggle('slide', { direction: 'right' }, 500);
        } else {
            bindSitePopupData(siteid);
            $('#panel').show('slide', { direction: 'right' }, 500);
        }
    }

    function bindSitePopupData(siteid)
    {
        
        var data = findById(siteid);
        bindpopupDBList();
        bindsitesAdditionalInfo();
        $timeout(function () {
            
            //console.log("xxxx " + JSON.stringify($scope.additionalInfo));
            $scope.Region = $scope.additionalInfo[0].additionalInfoDefult.Region;
            $scope.Global_Id = $scope.additionalInfo[0].additionalInfoDefult.Global_Id;
            $scope.Latitude = $scope.additionalInfo[0].additionalInfoDefult.Latitude;
            $scope.Longitude = $scope.additionalInfo[0].additionalInfoDefult.Longitude;
            $scope.Case_Type = $scope.additionalInfo[0].additionalInfoDefult.Case_Type;
            $scope.Status = $scope.additionalInfo[0].additionalInfoDefult.Status;
            $scope.Status_Date = $scope.additionalInfo[0].additionalInfoDefult.Status_Date;
            $scope.Lead_Agency = $scope.additionalInfo[0].additionalInfoDefult.Lead_Agency;
            $scope.Local_Agency = $scope.additionalInfo[0].additionalInfoDefult.Local_Agency;
            $scope.Case_Worker = $scope.additionalInfo[0].additionalInfoDefult.Case_Worker;
            $scope.RB_Case_Number = $scope.additionalInfo[0].additionalInfoDefult.RB_Case_Number;
            $scope.LOC_Case_Number = $scope.additionalInfo[0].additionalInfoDefult.LOC_Case_Number;
            $scope.File_Location = $scope.additionalInfo[0].additionalInfoDefult.File_Location;
            $scope.Potential_Media_Affect = $scope.additionalInfo[0].additionalInfoDefult.Potential_Media_Affect;
            $scope.Potential_Contaminants_of_Concern = $scope.additionalInfo[0].additionalInfoDefult.Potential_Contaminants_of_Concern;
            $scope.Site_History = $scope.additionalInfo[0].additionalInfoDefult.Site_History;
        }, 300);
        
        
        $scope.siteId = data.Id;
        $scope.siteDistance = data.distance;
        $scope.siteDirection = "North";
        $scope.siteElevation = data.rel;
        $scope.siteName = data.sitename;
        $scope.siteAddress = data.address;
        $scope.sitemapimg = data.mapImage;
        $scope.siteDatabase = data.database;
        pastRowId = siteid;
        //console.log("Additional Data " + JSON.stringify($scope.additionalInfo));
       
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
        //console.log("disable id " + siteid)
        $scope.rowDisableId = siteid;
        
    }

    $scope.getActiveStatus = function (index, siteid) {

        if (index == siteid) {
            return true;
        }

    }
   
   // $scope.items = [
   //{ name: 'EDR US Hist Auto Stat' },
   //{ name: 'LUST' }
   // ];

    $scope.filterItems = {
        'All Databases': true,
        'RCRA-LQG': true,
        'RCRA-SQG': true,
        'RCRA-CESQG': true,
        'LUST': true,
        'SLIC': true,
        'UST': true,
        'CA FID UST': true,
        'HIST UST': true,
        'SWEEPS UST': true,
        'EDR US Hist Cleaners': true,
        'EDR US Hist Auto Stat': true,
        'CUPA Listings': true,
        'DRYCLEANERS': true,
        'FINDS': true,
        'HIST UST': true,
        'Include Orphans in Site List' : true
    };

    $scope.DBFilter = function (sites) {
        //console.log("filter " + JSON.stringify($scope.filterItems));

        //if ($scope.filterItems["All Databases"] == false) {
        //    console.log("false ");

        //    for (i = 0; i < $scope.filterItems.length; i++) {
        //        $scope.filterItems[$scope.filterItems[i][0]] = false;
        //        console.log("xxxxxxxx" +JSON.stringify( $scope.filterItems[i]));
        //    }
        //    console.log("after modi " + JSON.stringify($scope.filterItems));
        //}
         return $scope.filterItems[sites.database];
    };

   
}]);