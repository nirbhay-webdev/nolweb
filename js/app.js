var app = angular.module('nolWeb',[]);

    // app.config(['$locationProvider','$routeProvider',function($locationProvider,$XrouteProvider){
    //         $routeProvider.when('/',
    //             templateUrl:'templates/home.html'
    //             ).when(
    //                 '/venues', 
    //                 templateUrl: 'templates.venue.html'
    //             ).otherwise('/');

    // }]);

app.controller('nolWebController',['$scope',function($scope){

        $scope.data = [[{ venue:'Hauz Khas Social',
                         imgUrl:'assets/images/hauz-khas-social.png',
                        },
                        { venue:'Out of the Box',
                         imgUrl:'assets/images/otb.jpg',
                        },
                        { venue:'Maquina',
                         imgUrl:'assets/images/maquina.jpg',
                        }],
                        [{ venue:'Mafioso',
                         imgUrl:'assets/images/mafioso.jpg',
                        },
                        { venue:'Fork You',
                         imgUrl:'assets/images/fork-you.jpg',
                        },
                        { venue:'Village Deck',
                         imgUrl:'assets/images/villagedeck.jpg',
                        }],
                        [{ venue:'The Frat House',
                         imgUrl:'assets/images/frathouse.png',
                        },
                        { venue:'ELF',
                         imgUrl:'assets/images/elf.jpg',
                        },
                         { venue:'Imperfecto',
                         imgUrl:'assets/images/imperfecto.jpg',
                        }]];
    
    
    }]);
