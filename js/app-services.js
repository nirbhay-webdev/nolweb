var app = angular.module('nolWeb-Services',[]);

app.service('dataService',['$q','$http',function($q,$http){

    this.getData = function(dataType) {
           
            var Url = 'http://api.nightoutloud.com/api/v1/venue_state_slots/?'+dataType;
            var result =[];

           return $q(function(resolve,reject){ 
                var result =[];

                 $http({
                        method: 'GET',
                        url: Url,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token 58c9a5dbe2d373e10d5818494b9eaac695283311',
                            // 'Origin':'http://localhost:8888'
                        }
                        }).then(function(response){ 
                                                console.log('Logging response',response); 
                                                var newData = Mapper(response.data.results)
                                                resolve(newData) },function(){ console.log('error occured') });
                });
    }
   
         function Mapper (response) {

            musicType =['Bollywood','Electronic','Rock','Pop/Commercial'];
            musicSource=['speakers','House DJ','Special DJ','Karaoke','Live Band'];
            placeVibe = ['Chill','Upbeat','Dancing']; 
            var data = [];
            var length = response.length;

            for (var i=0;i<length;i++){
                data[i] =new Object();
                data[i].venue = response[i].venue.display_name;
                data[i].venueName = response[i].venue.display_name;
                
                data[i].people = response[i].count_total;
                data[i].female = response[i].count_females;
                data[i].male = data[i].people - data[i].female
                data[i].genre = musicType[response[i].music_type];
                data[i].type= musicSource[response[i].music_source];
                data[i].vibe = placeVibe[response[i].vibe];
                data[i].fullness = response[i].fullness;
                data[i].date = response[i].date;
                data[i].image = response[i].image;    
            }           

            return data;

        }

}]);