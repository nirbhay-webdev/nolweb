var app = angular.module('nolWeb-Services',[]);

app.service('dataService',['$q','$http',function($q,$http){

    this.getData = function() {
           
            var Url = 'http://api.nightoutloud.com/api/v1/venue_states/?limit=200&start_date=2016-08-24';
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
                                                response.data.results = newData;
                                                url = response.data.next;
                                                // console.log(response);
                                                resolve(response.data.results) },function(){ console.log('error occured') });
                });
    }


        function stampSplitter(timeString) {
                    var splits = timeString.split('T');
                    var temp = splits[1].split('Z');
                    splits[1]=temp[0];
                    var timeUnits=splits[1].split(':');
                    timeUnits[0]=(+timeUnits[0])+5+Math.floor(((+timeUnits[1])+30)/60);
                    timeUnits[1] = (+timeUnits[1]+30)%60;

                    var time= timeUnits[0]+':'+timeUnits[1]+':'+timeUnits[2];

                    
                    return {time: time, date: splits[0],timeslot:timeUnits[0]};  
                };

        function locationSplitter(locationString) {
                    
                    var splits = locationString.split(';');
                    splits = splits[1].split('(');
                    splits = splits[1].split(' ')
                    var temp = splits[1].split(')'); 
                    splits[1]=temp[0];
                    
                    return {Latitude: splits[0], Longitude: splits[1]};  
                };
        
         function Mapper (response) {

              musicType =['Bollywood','Electronic','Rock','Pop/Commercial'];
              musicSource=['speakers','House DJ','Special DJ','Karaoke','Live Band'];
              placeVibe = ['Chill','Upbeat','Dancing'];
              
              var data = [];
              restarauntDisplayNamers={};

              for (var i=0;i<list.length;i++)
            {
                restarauntDisplayNamers[list[i].id]=list[i].display_name;
               
            }

            var length = response.length;

            for (var i=0;i<length;i++){
                data[i] =new Object();
                data[i].venue = response[i].venue;
                data[i].venueName = restarauntDisplayNamers[response[i].venue];
                data[i].people = response[i].count_total;
                data[i].females = response[i].count_females;
                data[i].music = musicType[response[i].music_type];
                data[i].musicsource= musicSource[response[i].music_source];
                data[i].vibe = placeVibe[response[i].vibe];
                data[i].fullness = response[i].fullness;
                var newTimeVal = stampSplitter(response[i].timestamp);
                data[i].time = newTimeVal.time;
                data[i].date = newTimeVal.date;
                data[i].timeSlot = newTimeVal.timeslot;
                var newLocVal = locationSplitter(response[i].location);
                data[i].Latitude = newLocVal.Latitude;
                data[i].Longitude = newLocVal.Longitude;
                data[i].isValid = (response[i].flag == null);
                data[i].addedBy = response[i].added_by.first_name + ' ' + response[i].added_by.last_name;
                data[i].sendersContact = response[i].added_by.phone_number;
            }           

            return data;

        }

}]);