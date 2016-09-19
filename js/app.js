

var app = angular.module('nolWeb',['ngRoute','nolWeb-Services']);

app.config(['$locationProvider','$routeProvider',function config($locationProvider,$routeProvider){
                $routeProvider.
                    when('/',{
                    templateUrl:'templates/venues.html',
                    controller:'nolWebController'
                    }).when('/venues',{
                    templateUrl: 'templates/venues.html',
                    controller:'nolWebController'
                  });
                    // .when('/about-us',{
                    //     templateUrl:'templates/aboutus.html'
                    // }).when('/ambassador',{
                    // templateUrl:'templates/ambassador.html',
                    // controller:'nolAmbassadorController'}
                    // ).when('/contact-us',{
                    // templateUrl:'templates/contact.html',
                    // controller:'nolContactController'
                    // }).when('/app',{
                    // templateUrl:'templates/app.html'
                    // }).when('/new-home',{
                    // templateUrl:'templates/new_home.html',
                    // controller:'newHomeController'
                    // }).otherwise('/');

    }]);

app.controller('nolWebController',['$scope','$rootScope','$timeout','dataService',function($scope,$rootScope,$timeout,dataService){
    $scope.showLoaderNew = false;
    $scope.showLoader = false;
    $scope.dataAvailable = false;
    $scope.showLiveDataSection = false;
    $scope.showHistoricalDataSection = false;
    $scope.popupBtnClicked = false;
    $scope.venueToDisplayOnPopup = {};
    $rootScope.popupBtnClicked = false;
    $scope.showMenuTabList = false;
    $scope.rollUpSplashScreen = false;
    $scope.whichData = false;
    $scope.Data = [];

    $scope.showMenuItems = function () {

      $scope.showMenuTabList = !$scope.showMenuTabList;
      if($scope.showMenuTabList){
        $('.header').css("height","250px");
      }
      else{
        $('.header').css("height","55px");
      }
    };

    $scope.showPopup = function(venueToDisplay){
        $scope.venueToDisplayOnPopup = venueToDisplay;
        $scope.popupBtnClicked = true;
        $rootScope.popupBtnClicked=true;
    };

    $scope.closePopUp =function(){
      $scope.popupBtnClicked = false;
      $rootScope.popupBtnClicked =false;
    };
//On Page Load Variable Initiazlizer Function Specification

    $scope.variableInitializerOnPageLoad = function() {
            $scope.showLiveDataSection = false;
            $scope.showHistoricalDataSection=false;
            $scope.Data = [];
            $scope.liveDataStorage = [];
            $scope.historicalDataStorage = [];
            $scope.rollUpSplashScreen=false;
            $scope.switchToVenuesPage=false;
            $scope.whichData=false;
            dataService.getData('data_type=current').then(doWhenLiveDataRecieved,doWhenError);
            dataService.getData('data_type=historical').then(doWhenHistoricalDataRecieved,doWhenError);

            window.addEventListener('scroll',splashScrollScreen);

            function splashScrollScreen (event){
              console.log(event);
              // $('#ctrl').addClass('roll-up-splash-screen');
              $scope.rollUpSplashScreen=true;
              $scope.$apply();
              window.removeEventListener('scroll',splashScrollScreen);
              console.log('debugging the current event');
            }

            window.addEventListener("transitionend",afterRollingUpSplashScreen);

            function afterRollingUpSplashScreen(event){

              $('#ctrl').delay(500).css('overflow-y','scroll');
              $scope.switchToVenuesPage = true;
              $scope.$apply();

            }

            function doWhenLiveDataRecieved(response){
                $scope.showLiveDataSection=false;
                $scope.liveDataStorage = response;
                var checkForLiveDataSize = $scope.liveDataStorage.length > 0;
                if(checkForLiveDataSize){
                        console.log('triggering');
                        $scope.showLiveDataSection=true;
                        $scope.dataAvailable = true;
                        $scope.showLoader = false;
                    }
            }

            function doWhenHistoricalDataRecieved (response){
                 $scope.historicalDataStorage = response;
                 $scope.showHistoricalDataSection = true;
                 $scope.Data = response;
                 console.log($scope.historicalDataStorage);

            }
            function doWhenError (error){
                console.log('data not available');
            }

            function doWhenUserScrolls(event){
                  var temp = $('#hist-data').offset();
                  if(temp.top <= 170){
                    console.log(temp);
                    var opa =(temp.top - 110)/50;
                    console.log(opa);
                    $('.info-bar').first().css("opacity",opa);
                    if(temp.top <= 110){
                        $('#info-bar-inner').addClass('info-bar-fixed');
                      console.log('not working');
                    }
                    else if(temp.top >= 110){
                        $('#info-bar-inner').removeClass('info-bar-fixed');
                    }
                  }
            }
            $scope.showData=function(whichData){
                  console.log(whichData);
                  if(whichData){
                    $scope.Data = $scope.liveDataStorage;
                    $scope.switchLoader();
                    $timeout($scope.switchLoader,1000);
                  }
                  else{
                    $scope.Data = $scope.historicalDataStorage;
                    $scope.switchLoader();
                    $timeout($scope.switchLoader,1000);
                  }
            };

            $scope.switchLoader= function(){
              $scope.showLoader = !$scope.showLoader;
            };
    };

    }]);
// nolWebController Specification ends Here
app.controller('nolAppController',['$scope',function($scope){

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
