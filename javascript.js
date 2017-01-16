
//********** temperatures locales  **********************************************************
var temp_timeout;
function temperature ()
{
  $.ajax({
    async : false,
    type: "GET",
    url: "./ajax.php",
    data: "block=temperature",
    success: function(data){
		gauge_temp_ext.series[0].points[0].update(data['Text']);
		gauge_temp_int.series[0].points[0].update(data['Tint']);
		gauge_temp_ver.series[0].points[0].update(data['veranda']);
		gauge_temp_spa.series[0].points[0].update(data['spa']);
        // temp_ext.innerHTML = data['Text']+'°';
        // temp_veranda.innerHTML = data['veranda']+'°';
        // temp_spa.innerHTML = data['spa']+'°';
        // temp_int.innerHTML = data['Tint']+'°';
		gauge_granule.series[0].points[0].update(data['granule']);
		if (data['granule'] < 500) { // changement de couleur si moins de 500kg
			gauge_granule.yAxis[0].update({
				lineColor: "#FF0000",
				plotBands: [{
					from: 0,
					to: 4000,
					color: '#FF0000', 
					thickness: '40%'
				}]
			}); 
		}
    }
  });
  temp_timeout = setTimeout("temperature()", 900000);
};

//*********** meteo wunderground  **************************************************
var wunderground_timeout;
function wunderground ()
{
    $.ajax({
        async : false,
        type: "GET",
        url: "http://api.wunderground.com/api/6cc83d64f779fc85/conditions/astronomy/forecast/hourly/lang:FR/q/France/Bauvin.json",
        datatype: "jsonp",
        success: function(data){
            // actuellement
            $("#icone_jour").attr("src", './pict/' + data['current_observation']['icon'] + '.png');
            info1.innerHTML = data['current_observation']['weather'];
            //info2.innerHTML = 'Vent : ' + data['current_observation']['wind_kph'] + ' km/h';
            info3.innerHTML = 'Lever du soleil   : ' + data['moon_phase']['sunrise']['hour'] + ':' + data['moon_phase']['sunrise']['minute'];
            info4.innerHTML = 'Coucher du soleil : ' + data['moon_phase']['sunset']['hour'] + ':' + data['moon_phase']['sunset']['minute'];
            //info5.innerHTML = 'Lune : ' + data['moon_phase']['phaseofMoon'];
			gauge_vent.series[0].points[0].update(data['current_observation']['wind_kph']);
			gauge_rose.series[0].points[0].update(data['current_observation']['wind_degrees']);
			
          //forecast 3 jours
            for (var i=0; i < 4; i++){
                $("#forecast"+i+"_icon").attr("src", './pict/' + data['forecast']['simpleforecast']['forecastday'][i]['icon'] + '.png');
                document.getElementById('forecast' + i + '_jour').innerHTML = data['forecast']['simpleforecast']['forecastday'][i]['date']['weekday'];
                document.getElementById('forecast' + i + '_high').innerHTML = data['forecast']['simpleforecast']['forecastday'][i]['high']['celsius']+'°';
                document.getElementById('forecast' + i + '_low').innerHTML = data['forecast']['simpleforecast']['forecastday'][i]['low']['celsius']+'°';
            }

            //forecast heure par heure
            for (var i=0; i < 12; i++){
                $("#forecast_hourly"+i+"_icon").attr("src", data['hourly_forecast'][i]['icon_url']);
                document.getElementById('forecast_hourly' + i + '_hour').innerHTML = data['hourly_forecast'][i]['FCTTIME']['hour_padded'] +'h';
                document.getElementById('forecast_hourly' + i + '_temp').innerHTML = data['hourly_forecast'][i]['temp']['metric']+'°';
            }
          
        }
    });

  wunderground_timeout = setTimeout("wunderground()", 600000);
};

//********** horloge  **********************************************************
var horloge_timeout;
function horloge()
{
    dows  = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    mois  = ["janv", "f&eacute;v", "mars", "avril", "mai", "juin", "juillet", "ao&ucirc;t", "sept", "oct", "nov", "d&eacute;c"];

    now          = new Date;
    heure        = now.getHours();
    min          = now.getMinutes();
    // sec          = now.getSeconds();
    jour_semaine = dows[now.getDay()];
    jour         = now.getDate();
    mois         = mois[now.getMonth()];
    //annee        = now.getFullYear();

    // if (sec < 10){sec0 = "0";}else{sec0 = "";}
    if (min < 10){min0 = "0";}else{min0 = "";}
    if (heure < 10){heure0 = "0";}else{heure0 = "";}

    horloge_heure   = heure0 + heure + ":" + min0 + min;
    horloge_date    = "<span class='horloge_grey'>" + jour_semaine + "</span> " + jour + " " + mois ;
    horloge_content = "<div class='horloge_heure'>" + horloge_heure + "</div><div class='horloge_date'>" + horloge_date + "</div>";

    $("#horloge").html(horloge_content);
    horloge_timeout = setTimeout("horloge()", 5000);
};


//********* PING  **********************************************************
var ping_timeout;
function ping ()
{
  $.ajax({
    async : false,
    type: "GET",
    url: "./ajax.php",
    data: "block=ping",
    success: function(data){
      $("#ping").html(data);
    }
  });
  ping_timeout = setTimeout("ping()", 60000);
};

//*********** conso electrique *********************************************
var conso_timeout;
function conso(){
  $.ajax({
    url: "./ajax.php",
    data: "block=conso",
    success: function(data){
		gauge_conso.series[0].points[0].update(data['conso']);
    }
  });
  conso_timeout = setTimeout("conso()", 10000);
};
//********* garage  **********************************************************
var garage_timeout;
function garage ()
{
  $.ajax({
    async : false,
    type: "GET",
    url: "./ajax.php",
    data: "block=garage",
    success: function(data){
      $("#garage").html(data);
    }
  });
  garage_timeout = setTimeout("garage()", 60000);
};
//********* courrier  **********************************************************
var mail_timeout;
function courrier ()
{
  $.ajax({
    async : false,
    type: "GET",
    url: "./ajax.php",
    data: "block=courrier",
    success: function(data){
      $("#courrier").html(data);
    }
  });
  mail_timeout = setTimeout("courrier()", 60000);
};

//*********** conso granulés *********************************************
/* var granule_timeout;
function granule(){
  $.ajax({
    url: "./ajax.php",
    data: "block=granule",
    success: function(data){
        //conso_elec.innerHTML = data['granule']+' Kwh';
		gauge_granule.series[0].points[0].update(data['granule']);
    }
  });
  conso_timeout = setTimeout("granule()", 10000);
};
 */

 
//*********graphiques Highcharts**********************************************	


$(function(){
// $(document).ready(function() {
    
	// ************* options communes a tous les charts ******************************
    Highcharts.setOptions({
	    chart: {
	        type: 'gauge',
			backgroundColor: 'rgba(0,0,0,0)',
	    },
	    title: {
			floating: true,
			y: 140,
			style: {
				color: 'white',
			},
	    },
	    credits: {
	        enabled: false,
	    },
	    pane: {
	        startAngle: -90,
	        endAngle: 90,
            background: null,
			size: '90%',
	    },
        plotOptions: {
            gauge: {
                dataLabels: {
					borderWidth: 0,
					y: -2,
					color: 'white',
                    style: {
                        fontSize: '25px',
						textShadow: false,
                    }
 				},
                dial: {
					backgroundColor: 'white',
					baseLength: "10%",
					baseWidth: 15,
					radius: "95%",
					rearLength: "0%",
					topWidth: 1,
					borderWidth: 2,
					borderColor: "black",
				},
				pivot: {
					backgroundColor: 'white',
					radius: 7,
				},
            },
        },
		tooltip: {
			enabled: false,
		},
	    yAxis: {
            labels: {
                enabled: false,
            },
            //tickPositions: [2000],
			lineColor: 'black',
			tickLength: 0,
            minorTickLength: 0,
	    },
    });



//*********** graphique gauge conso electrique *******************************
	gauge_conso = new Highcharts.Chart({
	    chart: {
			renderTo: 'gauge_conso',
	    },
	    title: {
			y: 5,
	        text: 'Electricité',
	    },
        plotOptions: {
            gauge: {
                dataLabels: {
					format: '{y} Kwh',
 				},
            },
        },
	    yAxis: {
	        min: 0,
	        max: 6000,
	        plotBands: [{
	            from: 0,
	            to: 4000,
	            color: '#02c032', // green
                thickness: '40%'
	        },{
	            from: 4000,
	            to: 6000,
	            color: 'orange', 
                thickness: '40%'
	        }]        
	    },
	    series: [{
	        data: [0]
	    }]
	});

//********graphique gauge granulés chaudiere*************************************	
    gauge_granule = new Highcharts.Chart({
        chart: {
			renderTo: 'gauge_granule',
        },
	    title: {
			y: 5,
	        text: 'Granulés',
	    },
        plotOptions: {
            gauge: {
                dataLabels: {
					format: '{y} Kg',
 				},
            },
        },
	    yAxis: {
	        min: 0,
	        max: 4000,
	        plotBands: [{
	            from: 0,
	            to: 500,
	            color: 'orange', 
                thickness: '40%'
	        },{
	            from: 500,
	            to: 4000,
	            color: '#02c032', 
                thickness: '40%'
	        }]        
	    },
	    series: [{
	        data: [0]
	    }]
	});
//********graphique vent*************************************	
    gauge_vent = new Highcharts.Chart({
        chart: {
			renderTo: 'gauge_vent',
        },
	    title: {
	        text: 'Vent (Km/h)',
	    },
	    yAxis: {
	        min: 0,
	        max: 80,
	        plotBands: [{
	            from: 0,
	            to: 20,
	            color: '#02c032', 
                thickness: '40%'
	        },{
	            from: 20,
	            to: 40,
	            color: 'yellow', 
                thickness: '40%'
	        },{
	            from: 40,
	            to: 60,
	            color: 'orange',
                thickness: '40%'
	        },{
	            from: 60,
	            to: 80,
	            color: 'red', 
                thickness: '40%'
	        }]        
	    },
	    series: [{
	        name: 'Vent',
	        data: [0]
	    }]
	});
//********graphique rose des vents*************************************	
    gauge_rose = new Highcharts.Chart({
        chart: {
            type: 'gauge',
			renderTo: 'gauge_rose',
			backgroundColor: null,
			plotBackgroundImage: 'pict/rose_des_vents.png'
            //marginTop: 50
        },
	    title: {
	        text: 'Direction',
			floating: true,
			y: 5,
	    },
	    credits: {
	        enabled: false,
	    },
	    pane: {
	        startAngle: 0,
	        endAngle: 360,
            background: null,
			size: '90%',
	    },
        plotOptions: {
            gauge: {
                dataLabels: {
                    enabled: false,
					borderWidth: 0,
					y: -2,
					format: '{y}°',
					color: 'white',
                    style: {
                        fontSize: 25,
						textShadow: false,
                    }
 				},
                dial: {
					backgroundColor: '#1981F0',
					baseLength: -80,
					baseWidth: 4,
					radius: 80,
					rearLength: 100,
					topWidth: 25,
					borderWidth: 1,
					borderColor: "black"
				},
				pivot: {
					backgroundColor: 'black',
					radius: 2,
				},
            },
        },
	    yAxis: {
            labels: {
                enabled: false,
            },
            //tickPositions: [2000],
			lineColor: 'null',
			tickLength: 0,
            minorTickLength: 0,
	        min: 0,
	        max: 360,
/* 	        plotBands: [{
	            from: 0,
	            to: 4000,
	            color: '#02c032', 
                thickness: '40%'
	        }]        
 */	    },
	    series: [{
	        name: 'Direction',
	        data: [0]
	    }]
	});
//********graphique temp ext*************************************	
    gauge_temp_ext = new Highcharts.Chart({
        chart: {
			renderTo: 'gauge_temp_ext',
        },
	    title: {
	        text: 'Jardin',
	    },
	    yAxis: {
	        min: -20,
	        max: 50,
	        plotBands: [{
	            from: -20,
	            to: 5,
	            color: '#09A3F0', 
                thickness: '40%'
	        },{
	            from: 5,
	            to: 25,
	            color: '#02c032',
                thickness: '40%'
	        },{
	            from: 25,
	            to: 50,
	            color: 'orange', 
                thickness: '40%'
	        }]        
	    },
	    series: [{
	        data: [0]
	    }]
	});
//********graphique temp int*************************************	
    gauge_temp_int = new Highcharts.Chart({
        chart: {
			renderTo: 'gauge_temp_int',
        },
	    title: {
	        text: 'Maison',
	    },
	    yAxis: {
	        min: -20,
	        max: 50,
	        plotBands: [{
	            from: -20,
	            to: 18,
	            color: '#09A3F0',
                thickness: '40%'
	        },{
	            from: 18,
	            to: 22,
	            color: '#02c032', 
                thickness: '40%'
	        },{
	            from: 22,
	            to: 50,
	            color: 'orange', 
                thickness: '40%'
	        }]        
	    },
	    series: [{
	        data: [0]
	    }]
	});
//********graphique temp veranda*************************************	
    gauge_temp_ver = new Highcharts.Chart({
        chart: {
			renderTo: 'gauge_temp_ver',
        },
	    title: {
	        text: 'Veranda',
	    },
	    yAxis: {
	        min: -20,
	        max: 50,
	        plotBands: [{
	            from: -20,
	            to: 5,
	            color: '#09A3F0', 
                thickness: '40%'
	        },{
	            from: 5,
	            to: 25,
	            color: '#02c032',
                thickness: '40%'
	        },{
	            from: 25,
	            to: 50,
	            color: 'orange', 
                thickness: '40%'
	        }]        
	    },
	    series: [{
	        data: [0]
	    }]
	});
//********graphique temp spa*************************************	
    gauge_temp_spa = new Highcharts.Chart({
        chart: {
			renderTo: 'gauge_temp_spa',
        },
	    title: {
	        text: 'Spa',
	    },
	    yAxis: {
	        min: 0,
	        max: 42,
	        plotBands: [{
	            from: -20,
	            to: 35,
	            color: '#09A3F0',
                thickness: '40%'
	        },{
	            from: 35,
	            to: 39,
	            color: '#02c032', 
                thickness: '40%'
	        },{
	            from: 39,
	            to: 42,
	            color: 'orange', 
                thickness: '40%'
	        }]        
	    },
	    series: [{
	        data: [0]
	    }]
	});

	
	
});

//******lancement principal des fonctions*************************************	

$(document).ready(function() {
   horloge();
   temperature();
   wunderground();
   ping();
   conso();
   //granule();
   garage();
   courrier();
});

