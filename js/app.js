

var app = angular.module('nolWeb',['ngRoute','nolWeb-Services','ngAnimate']);

app.config(['$locationProvider','$routeProvider',function config($locationProvider,$routeProvider){
                $routeProvider.
                    when('/',{
                    templateUrl:'templates/venues.html',
                    controller:'nolHomeController'
                    }).when('/venues',{
                    templateUrl: 'templates/venues.html',
                    controller:'nolWebController'
                    }).when('/about-us',{
                        templateUrl:'templates/aboutus.html'
                    }).when('/ambassador',{
                    templateUrl:'templates/ambassador.html',
                    controller:'nolAmbassadorController'}
                    ).when('/contact-us',{
                    templateUrl:'templates/contact.html',
                    controller:'nolContactController'
                    }).when('/app',{
                    templateUrl:'templates/app.html'
                    }).when('/new-home',{
                    templateUrl:'templates/new_home.html',
                    controller:'newHomeController'
                    }).otherwise('/');

    }]);

app.controller('nolWebController',['$scope','$rootScope','$timeout','dataService',function($scope,$rootScope,$timeout,dataService){

    $scope.showLoader = true;
    $scope.dataAvailable = false;
    $scope.showLiveDataSection = false;
    $scope.showHistoricalDataSection = false;
    $scope.popupBtnClicked = false;
    $scope.venueToDisplayOnPopup = {};
    $rootScope.popupBtnClicked = false;
    $scope.hideLivePreview = false;
    $scope.showMenuTabList = false;

    $scope.showMenuItems = function () {

      $scope.showMenuTabList = !$scope.showMenuTabList;
      if($scope.showMenuTabList){
        $('.info-bar-fixed').css("top","280px");
        $('.header').css("height","280px");
        $('.fixed-on-top').css("height","280px");
      }
      else{
        $('.info-bar-fixed').css("top","120px");
        $('.header').css("height","120px");
        $('.fixed-on-top').css("height","120px");
      }
    };

    $scope.showPopup = function(venueToDisplay){
        $scope.venueToDisplayOnPopup = venueToDisplay;
        $scope.popupBtnClicked = true;
        // console.log('popup function invoked');
        $rootScope.popupBtnClicked=true;
    };

    $scope.closePopUp =function(){
      $scope.popupBtnClicked = false;
      $rootScope.popupBtnClicked =false;
    };
//On Page Load Variable Initiazlizer Function Specification

    $scope.variableInitializerOnPageLoad = function() {

            window.addEventListener('scroll',doWhenUserScrolls);
            $scope.liveDataStorage = [];
            $scope.historicalDataStorage = [];

            dataService.getData('data_type=current').then(doWhenLiveDataRecieved,doWhenError);
            dataService.getData('data_type=historical').then(doWhenHistoricalDataRecieved,doWhenError);

            function doWhenLiveDataRecieved(response){
                $scope.liveDataStorage = createArrayLayoutForVenues(response);
                var checkForLiveDataSize = $scope.liveDataStorage.length > 0;
                if(checkForLiveDataSize){
                        $scope.showLiveDataSection=true;
                        $scope.dataAvailable = true;
                        $scope.showLoader = false;
                    }
            }

            function doWhenHistoricalDataRecieved (response){
                 $scope.historicalDataStorage = response;
                 $scope.showHistoricalDataSection = true;
                 $scope.showLoader=false;
                 console.log($scope.historicalDataStorage);

            }
            function doWhenError (error){
                console.log('data not available');
            }

            function doWhenUserScrolls(event){

              var currentWindowScroll = window.scrollY;
              var liveDataTagOffset = document.getElementById('live-data').offsetTop;
              var histDataTagOffset = document.getElementById('hist-data').offsetTop;
              var offsetDiff = histDataTagOffset - liveDataTagOffset;
              // console.log(temp);
              if(currentWindowScroll> offsetDiff){
                // console.log('done');
                $scope.hideLivePreview = true;
                $scope.$apply();
              }
              if(currentWindowScroll < offsetDiff){
                $scope.hideLivePreview = false;
                $scope.$apply();
              }
            }
    };
//Method Specification Ends Here

/*

   createArrayLayoutForVenues function for converting one dimensional array to two dimensional array

*/
            function createArrayLayoutForVenues(oneDimArray){

                var twoDimArray = [];
                var trackerFor1DArray = 0;
                var numberOfRowsFor2DArray=Math.ceil(oneDimArray.length/3);
                var noOfColoumns = 3;
                var tailOf1DArray = oneDimArray.length;
                //
                // var counter = 0;
                // for(i = 0 ; i < numberOfRowsFor2DArray; i=i+3 ){
                //     a[counter][i] = oneDimArray[i];
                //     a[coutner][i+1] = oneDimArray[i+1];
                //     a[counter][i+2] = oneDimArray[i+2];
                //     counter++;
                // }

                for(var rowIndex=0; rowIndex < numberOfRowsFor2DArray; rowIndex++){

                      twoDimArray[rowIndex]=[]; //Initializing every row as a new Array

                        for (var coloumnIndex=0; coloumnIndex < noOfColoumns; coloumnIndex++){

                            twoDimArray[rowIndex][coloumnIndex]={};
                            twoDimArray[rowIndex][coloumnIndex]=oneDimArray[trackerFor1DArray];
                            trackerFor1DArray++;

                            if(trackerFor1DArray == tailOf1DArray){
                                break;
                            }
                        }
                    }
                return twoDimArray;
            }

    }]);
// nolWebController Specification ends Here

app.controller('nolHomeController',['$rootScope','$timeout','$interval','$location','$scope',function($rootScope,$timeout,$interval,$location,$scope){

      $rootScope.showLiveDataSection = false;
      $rootScope.showHistoricalDataSection= false;
      $rootScope.rollUpSplashScreen = false;


      $scope.homeInitializer = function(){
          $rootScope.switchToVenuesPage=false;
          window.addEventListener('scroll',splashScrollScreen);
          // $timeout(scrollToVenues,3000);

          function splashScrollScreen (event){


            // window.scrollTo(0,0);
            console.log(event);
            $rootScope.showLiveDataSection = true;
            $rootScope.showHistoricalDataSection= true;
            $rootScope.rollUpSplashScreen = true;

            $timeout(function(){
              window.scrollTo(0,0);
              $('.venue-container').css('overflow-y','scroll');
              $rootScope.switchToVenuesPage = true;
            },2000);
            window.removeEventListener('scroll',splashScrollScreen);
            console.log('debugging the current event');
          }
          function scrollToVenues () {
             var event = new Event('scroll');
             window.dispatchEvent(event);
             window.removeEventListener('scroll',splashScrollScreen);
          }
      };

        $rootScope.switchToVenuesPage = false;
        $scope.showLoader=false;


    }]);



app.controller('nolAmbassadorController',['$scope',function($scope){

        $scope.modalShow = false;

        $scope.internRegistrationDetails = {
            firstName : '',
            lastName :'',
            email : '',
            contactNo : '',
            answer : '',
        };

        $scope.completeInternRegistration = function(){
            console.log( $scope.internRegistrationDetails );
            $scope.modalShow = false;
        };

        $scope.AmbassadorControllerIntializer = function(){
            $scope.modalShow = false;
        };

    }]);

  app.controller('nolContactController',['$scope',function($scope){

        $scope.msgRecieved = {
            name:'',
            email:'',
            msg:'',
            msgPosted:false,
        };

        $scope.requestedContact = function(){
            $scope.msgPosted = true;
            console.log($scope.msgRecieved);

        };

  }]);
