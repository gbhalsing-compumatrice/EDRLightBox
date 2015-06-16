angular.module('EDRLightbox').controller('DashboardController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', '$modal', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService, $modal) {

    $scope.selectedTab = 2;
    $scope.physicalSettingsTab = "Physical Settings";
    $scope.OtherTabname = "OTHER";
    $scope.btnValue = 2;
    $scope.IsAquiFlow = true;
    $scope.disableCol = true;
    $scope.IsPermitDataTbl = true;
    $scope.IsSoilDataTbl = false;
    $scope.IsWaterWell = false;
    $scope.IsNotesDataTbl = false;
    $scope.isrightCaretActive = true;
    $scope.isleftCaretActive = false;
    $scope.isphysicalTabOn = false;
    $scope.selectedRow = "";
    var additionaldata;
    $scope.additionalInfo = [];
    var pastRowId,pastSelectedTabId;

    var modalInstance;

    bindSitesData();
    bindAquiFlowDataData();
    bindBuildingPermitData();
    bindSummaryData();

    // Bind Sites Data
    function bindSitesData() {
        DashboardService.getSitesData().then(function (result) {

            $scope.sitesData = result;
            $scope.findingRecordsCount = result.length;
            bindDBNameList();
        }, function (error) {

        });
    }

    function bindsitesAdditionalInfo() {
        DashboardService.getSitesAdditinalInfo().then(function (result) {

            $scope.additionalInfo = result;

        }, function (error) {

        });
    }

    function bindDBNameList() {
        DashboardService.getDBList().then(function (result) {

            $scope.dbList = result;
        }, function (error) {

        });
    }

    function bindpopupDBList() {
        $scope.popupDBList = [
            { "Id": "1", "name": "LUST", "value": "LUST" },
            { "Id": "2", "name": "UST", "value": "UST" },
            { "Id": "3", "name": "DATABASE 3", "value": "DATABASETHREE" },
            { "Id": "4", "name": "DATABASE 4", "value": "DATABASEFOURE" }
        ];
    }
    // Physical Tab Data
    function bindAquiFlowDataData() {
        DashboardService.getAquiFlowData().then(function (result) {

            $scope.aquiFlowData = result;
            $scope.physicalRecordsCount = result.length;
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
            $scope.otherRecordsCount = result.length;
        }, function (error) {

        });
    }

    function bindNotesData() {
        DashboardService.getNotesData().then(function (result) {

            $scope.notesTblData = result;
            $scope.otherRecordsCount = result.length;
        }, function (error) {

        });
    }

    function bindGalleryData() {
        DashboardService.getGalleryData().then(function (result) {

            $scope.gallery = result;
            $scope.otherRecordsCount = result.length;
        }, function (error) {

        });
    }

    $scope.getSelectedTab = function (value) {
        setSelectedTab(value);
        pastSelectedTabId = value;
       
    }

    function setSelectedTab(value) {

        if (pastSelectedTabId == value && pastSelectedTabId != undefined) {
            
            $('#sidebar').toggle('slide', { direction: 'right' }, 0)
            $scope.selectedTab = value;
            $scope.btnValue = value;

            checkPanelStatus();
  
        } else {
            $('#sidebar').show('slide', { direction: 'right' }, 0)
            $scope.selectedTab = value;
            $scope.btnValue = value;
        }

       
    }

    $scope.LoadPhysicalTableData = function (value) {

        $scope.IsAquiActive = false;
        $scope.IsWaterActive = false;
        $scope.IsOilActive = false;
        $scope.IsSoilActive = false;

        if (value == 1) {
            $scope.physicalSettingsTab = "Aquiflow";

            getClass("physicalTwo");
            getClass("physicalThree");
            getClass("physicalFour");

            $scope.IsAquiFlow = true;
            $scope.IsSoilDataTbl = false;
            $scope.IsWaterWell = false;
            bindAquiFlowDataData();

        } else if (value == 2) {
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
            $scope.OtherTabname = "BUILDING PERMITS";

            getClass("otherThree");
            getClass("otherTwo");

            $scope.IsPermitDataTbl = true;
            $scope.IsNotesDataTbl = false;
            $scope.isGallary = false;

            bindBuildingPermitData();

        } else if (value == 2) {
            $scope.OtherTabname = "MOBILE PHOTOS";

            getClass("otherOne");
            getClass("otherThree");

            $scope.isGallary = true;
            $scope.IsPermitDataTbl = false;
            $scope.IsNotesDataTbl = false;

            bindGalleryData();
        } else if (value == 3) {
            $scope.OtherTabname = "MOBILE NOTES";

            getClass("otherOne");
            getClass("otherTwo");

            $scope.IsPermitDataTbl = false;
            $scope.IsNotesDataTbl = true;
            $scope.isGallary = false;

            bindNotesData();
        }
    }

    function getClass(id) {
        var classId = id;
        checkClass = $("#" + classId).hasClass("active");

        console.log("class " + checkClass)
        if (checkClass) {
            $('#' + classId).removeClass('active');
            $('#' + classId).addClass('');
        }
    }

    // Load Additional Info based on popup dropdown data
    $scope.getDetailsByDB = function (id,name) {

        if (id == 1) {
            $scope.siteDatabase = name;
           
        }
        else if (id == 2) {
            $scope.siteDatabase = name;
            
        } else if (id = 3) {
            $scope.siteDatabase = name;
        }
    }

   
    $scope.toTheTop = function () {
        $('#divAddInfo').scrollTop(0, 5000);
    }
    //$scope.bindDefultAdditionalInfo = function () {

    //    $timeout(function () {
    //        $scope.AdditionalData = $scope.additionalInfo[0].additionalInfoDefult;
    //    }, 500);

    //}

    function bindSummaryData() {
        var data;

        DashboardService.getSummaryData().then(function (result) {

            data = result;
            $scope.summaryRecordsCount = result.length;
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
                    $scope.TPTotal = 0;
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

    // bind popup data on selected row id 
    $scope.getSelectedRowData = function (siteid) {

        $scope.selectedRow = siteid;

        if (pastRowId == siteid && pastRowId != undefined) {
            $('#panel').toggle('slide', { direction: 'right' }, 500);
        } else {
            bindSitePopupData(siteid);
            $('#panel').show('slide', { direction: 'right' }, 500);
        }
    }

    $scope.getListpanel = function () {

        if ($('#sidebar').toggle('slide', { direction: 'right' }, 0)) {

            checkPanelStatus();
        }

    }

    function checkPanelStatus() {

        checkClass = $("#panel").hasClass("panelwidth");

        if (checkClass) {
            $('#panel').removeClass('panelwidth');
            $('#panel').addClass('panelwidthoff');
            $scope.isrightCaretActive = false;
            $scope.isleftCaretActive = true;
        }
        else {
            $('#panel').removeClass('panelwidthoff');
            $('#panel').addClass('panelwidth');
            $scope.isrightCaretActive = true;
            $scope.isleftCaretActive = false;
        }
    }

    function bindSitePopupData(siteid) {

        var data = findById(siteid);
        bindpopupDBList();
        bindsitesAdditionalInfo();
        $timeout(function () {
            $scope.AdditionalData = $scope.additionalInfo[0].additionalInfoDefult;
            $scope.AdditionalDataUST = $scope.additionalInfo[0].additionalInfoUST;
        }, 300);

        $scope.siteId = data.Id;
        $scope.siteDistance = data.distance;
        $scope.siteDirection = data.direction;
        $scope.siteElevation = data.rel;
        $scope.siteName = data.sitename;
        $scope.siteAddress = data.address;
        $scope.siteDatabase = data.database;
        $scope.siteActual = data.actual;
        $scope.siteEpaId = data.epaID;
        $scope.siteEdrId = data.edrID;

        if ($scope.btnValue == 3) {
            $scope.siteGroundWaterflow = data.siteGroundWaterflow;
            $scope.siteShallowDepth = data.siteShallowDepth;
            $scope.siteDeepDepth = data.siteDeepDepth;
            $scope.siteAvgDepth = data.siteAvgDepth;
            $scope.siteAquiDate = data.siteAquiDate;
        }

        pastRowId = siteid;

    }

    function findById(siteid) {

        if ($scope.btnValue == 2) {
            $scope.isphysicalTabOn = false;
            for (var i = 0; i < $scope.sitesData.length; i++) {
                if ($scope.sitesData[i].Id === siteid) {
                    return $scope.sitesData[i];
                }
            }
            throw "Couldn't find site with id: " + siteid;
        } else if ($scope.btnValue == 3)
        {
            $scope.isphysicalTabOn = true;
            for (var i = 0; i < $scope.aquiFlowData.length; i++) {
                if ($scope.aquiFlowData[i].Id === siteid) {
                    return $scope.aquiFlowData[i];
                }
            }
            throw "Couldn't find site with id: " + siteid;

        }

    }



    $scope.filterItems = {
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
        'Include Orphans in Site List': true
    };

    $scope.DBFilter = function (sites) {

        return $scope.filterItems[sites.database];
    };



    $scope.hidePopup = function () {
        $('#panel').toggle('slide', { direction: 'right' }, 500);
    }
    /* Left Panel Menubar Buttons */
    $scope.getSubborns = function () {

        $('#AERIALS').hide();
        $('#TOPOS').hide();
        $('#snrbm').toggle('slide', { direction: 'left' }, 500);
    }
    $scope.getTOPOS = function () {


        $('#AERIALS').hide();
        $('#snrbm').hide();
        $('#TOPOS').toggle('slide', { direction: 'left' }, 500);
    }
    $scope.getAERIALS = function () {


        $('#snrbm').hide();
        $('#TOPOS').hide();
        $('#AERIALS').toggle('slide', { direction: 'left' }, 500);
    }
    $scope.hideleftpopup = function () {

        $('#snrbm, #TOPOS, #AERIALS ').hide();
    }


    $scope.showInfoPopup = function () {

         modalInstance = $modal.open({
            templateUrl: 'info.html',
            scope: $scope,
           controller: infoPopupController,
            size: 'md'
            
        })
    }

    var infoPopupController = function ($scope, $modalInstance) {
        $scope.cancel = function () {

            $modalInstance.close();
          
        }
    }
}]);