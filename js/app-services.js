var app = angular.module('nolWeb-Services',[]);

app.service('dataService',['$q','$http',function($q,$http){

    this.getData = function() {

            var Url = 'http://dev-api.nightoutloud.com/api/v1/venues/?limit=34';
            var result =[];

            return $q(function(resolve,reject){
                var result =[];

                 $http({
                        method: 'GET',
                        url: Url,
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': 'Token 58c9a5dbe2d373e10d5818494b9eaac695283311',
                            // 'Origin':'http://localhost:8888'
                        }
                        }).then(function(response){
                                                console.log('Logging response',response);
                                                var newData = Mapper(response.data.results);
                                                resolve(newData);},function(response){
                                                  console.log('error occured'); });
                });
    };

         function Mapper (response) {

            musicType =['Bollywood','Electronic','Rock','Pop'];
            musicSource=['Speakers','In House DJ','Special DJ','Karaoke','Live Band'];
            placeVibe = ['Chill','Upbeat','Dancing'];
            var data = [];
            var length = response.length;
            var counter = 0;
            for (var i=0;i<length;i++){
                if(response[i].venue_data != null){
                data[counter] ={};
                data[counter].venue = response[i].display_name;
                data[counter].venueName = response[i].display_name;
                data[counter].imgUrl = 'assets/images/'+imageList[response[i].id]+'.jpg';
                data[counter].people = response[i].venue_data.count_total;
                data[counter].female = response[i].venue_data.count_females;
                data[counter].male = data[counter].people - data[counter].female;
                data[counter].genre = response[i].venue_data.music_type;
                data[counter].type= response[i].venue_data.music_source;
                data[counter].vibe = response[i].venue_data.vibe;
                data[counter].fullness = response[i].venue_data.fullness;
                data[counter].date = response[i].venue_data.date;
                data[counter].slot = response[i].venue_data.slot;
                data[counter].image = response[i].image;
                data[counter].isCurrent = response[i].venue_data.is_current;
                data[counter].stat = null;

                if(data[counter].isCurrent === false){
                  data[counter].stat = 'Based on Historical';
                }
                else if (data[counter].isCurrent === true){
                  var temp = new Date();
                  var hour = temp.getHours();
                  if(hour > data[counter].slot){
                    data[counter].stat = 'Updated'+ (hour - data[counter].slot) + 'Hrs ago';
                  }
                  else if(hour == data[counter].slot){
                    data[counter].stat = 'Live';
                  }
                }
                counter = counter +1;
              }
            }

            return data;

        }

}]);
