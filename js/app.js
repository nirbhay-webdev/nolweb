var app = angular.module('nolWeb',['ngRoute']);

    app.config(['$locationProvider','$routeProvider',function config($locationProvider,$routeProvider){
                $routeProvider.
                    when('/',{
                    templateUrl:'templates/home.html'
                    }).when('/venues',{ 
                    templateUrl: 'templates/venues.html'
                    }).when('/about-us',{
                        templateUrl:'templates/aboutus.html'
                    }).when('/ambassador',{
                    templateUrl:'templates/ambassador.html'}
                    ).when('/contact-us',{
                    templateUrl:'templates/contact.html'}
                    ).otherwise('/');

    }]);

app.controller('nolWebController',['$scope',function($scope){

        $scope.clicked = false;
        $scope.val = {};

        $scope.showpopup = function(venueName){
            $scope.val = venueName;
            $scope.clicked = true;
        }

        $scope.data = [[{ venue:'Hauz Khas Social',
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
