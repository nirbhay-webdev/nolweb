

var app = angular.module('nolWeb',['ngRoute','nolWeb-Services']);

app.config(['$locationProvider','$routeProvider',function config($locationProvider,$routeProvider){
                $routeProvider.
                    when('/',{
                    templateUrl:'templates/home.html',
                    controller:'nolWebController'
                    }).when('/venues',{ 
                    templateUrl: 'templates/venues.html'
                    }).when('/about-us',{
                        templateUrl:'templates/aboutus.html'
                    }).when('/ambassador',{
                    templateUrl:'templates/ambassador.html',
                    controller:'nolAmbassadorController'                }
                    ).when('/contact-us',{
                    templateUrl:'templates/contact.html',
                    controller:'nolContactController'
                    }).when('/app',{
                    templateUrl:'templates/app.html'
                    }).otherwise('/');

    }]);

app.controller('nolWebController',['$scope','dataService',function($scope,dataService){
    $scope.dataLive = true;
        $scope.init = function() {
            $scope.data = new Array();

            dataService.getData('data_type=historical').then(function(response){
            console.log(response);
            var counter = 0;

            for(var i=0; i<(Math.ceil(response.length/3));i++)
            {   $scope.data[i]=new Array();
                for (var j=0;j<3;j++){
                    $scope.data[i][j]=new Object;
                    $scope.data[i][j]=response[counter];
                    counter++;
                    if(counter == response.length){
                        break;
                    }
                }
            }
             console.log($scope.data,i); 
            $scope.dataLive=false;
        
    },function(response){})
        }

        $scope.update = function() {

        }


        $scope.clicked = false;
        $scope.val = {};

        $scope.showpopup = function(venueName){
            $scope.val = venueName;
            $scope.clicked = true;
        }

        $scope.data = [[{ venue:'Masha',
                         imgUrl:'assets/images/hauz-khas-social.png',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                        },
                        { venue:'Out of the Box',
                         imgUrl:'assets/images/otb.jpg',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    },
                        { venue:'Maquina',
                         imgUrl:'assets/images/maquina.jpg',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    }],
                        [{ venue:'Mafioso',
                         imgUrl:'assets/images/mafioso.jpg',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    },
                        { venue:'Fork You',
                         imgUrl:'assets/images/fork-you.jpg',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    },
                        { venue:'Village Deck',
                         imgUrl:'assets/images/villagedeck.jpg',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    }],
                        [{ venue:'The Frat House',
                         imgUrl:'assets/images/frathouse.png',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    },
                        { venue:'ELF',
                         imgUrl:'assets/images/elf.jpg',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    },
                         { venue:'Imperfecto',
                         imgUrl:'assets/images/imperfecto.jpg',
                         people: 100,
                         male:60,
                         female:40,
                         fullness:'50%',
                         vibe:'upbeat',
                         genre:'Electronic',
                         type:'Live Band',
                    }]];
    
    
    }]);

    app.controller('nolHomeController',['$timeout','$location','$scope',function($timeout,$location,$scope){
       
        $scope.showLoader=false;

        $scope.takeToVenues = function(){
           
            $scope.showLoader=true;

            $timeout(function(){$location.path('/venues')},4000);
            
        }


    }]);

    app.controller('nolAmbassadorController',['$scope',function($scope){
        
        $scope.modalShow = false;

        $scope.intern = {
            firstName : '',
            lastName :'',
            email : '',
            contactNo : '',
            answer : '',
        };

        $scope.registerIntern = function(){
            console.log( $scope.intern );
            $scope.modalShow = false;
        }

        $scope.init = function(){
            $scope.modalShow = false;
        }

    }]);

  app.controller('nolContactController',['$scope',function($scope){
        
        $scope.msgRecieved = {
            name:'',
            email:'',
            msg:'',
            msgPosted:false,
        }

        $scope.requestedContact = function(){
            $scope.msgPosted = true;
            console.log($scope.msgRecieved);
        
        }

  }]);