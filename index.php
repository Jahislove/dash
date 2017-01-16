<!DOCTYPE HTML>

<html>
  <head>
    <title>Dashboard</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="Content-Language" content="Fr"/>
    <meta name="Author" lang="fr" content="Torna"/>
    <meta name="Copyright" content="© Torna"/>
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="refresh" content="3600;url=index.php">
    <script src="js/jquery-1.11.1.min.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<!-- <script src="https://code.highcharts.com/modules/solid-gauge.js"></script> -->
    <script type="text/javascript" src="javascript.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css"/>
<script type="text/javascript">
</script>

 </head>
  <body>

    <div id="main">

        <div class="meteo_jour">
            <div class="titre">Actuellement</div>
            <table class='TableInstant'>  
                <tr><td id="info1">?</td></tr>    
                <tr><td id="info3">?</td></tr>    
                <tr><td id="info4">?</td></tr>    
                <!-- <tr><td id="info5">?</td></tr> -->    
           </table>
            <IMG id="icone_jour" SRC=""></IMG>
        </div>
		
		<div class="gauges">
			<div id="gauge_vent" class="gauge"></div>
			<div id="gauge_rose" class="gauge"></div>
			<div id="gauge_temp_ext" class="gauge"></div>
			<div id="gauge_temp_int" class="gauge"></div>
			<div id="gauge_temp_ver" class="gauge"></div>
			<div id="gauge_temp_spa" class="gauge"></div>
         </div>
       
<!--         <div class="temp_locale">
            <div class="temp">
                <div id="temp_ext" class="temp_valeur_ext"></div>
                <IMG SRC="./pict/terrasse.png" class="temp_logo"></IMG>
            </div>
            <div class="temp">
                <div id="temp_int" class="temp_valeur"></div>
                <IMG SRC="./pict/maison.png" class="temp_logo"></IMG>
            </div>
            <div class="temp">
                <div id="temp_veranda" class="temp_valeur"></div>
                <IMG SRC="./pict/veranda.png" class="temp_logo"></IMG>
            </div>
            <div class="temp">
                <div id="temp_spa" class="temp_valeur"></div>
                <IMG SRC="./pict/spa.png" class="temp_logo"></IMG>
            </div>
        </div>
 -->
        <div class="meteo_forecast">
            <div id="jour0" class="forecast">
                <div id="forecast0_jour"  class='forecast_jour'></div>
                <IMG  id="forecast0_icon"  class='forecast_icon' SRC=""></IMG>
                <div id="forecast0_high"   class='forecast_temp_high'></div>
                <div id="forecast0_low"    class='forecast_temp_low'></div>
            </div>
            <div id="jour1" class="forecast">
                <div id="forecast1_jour"   class='forecast_jour'></div>
                <IMG  id="forecast1_icon"   class='forecast_icon' SRC=""></IMG>
                <div id="forecast1_high"   class='forecast_temp_high'></div>
                <div id="forecast1_low"    class='forecast_temp_low'></div>
            </div>
            <div id="jour2" class="forecast">
                <div id="forecast2_jour"   class='forecast_jour'></div>
                <IMG  id="forecast2_icon"   class='forecast_icon' SRC=""></IMG>
                <div id="forecast2_high"   class='forecast_temp_high'></div>
                <div id="forecast2_low"    class='forecast_temp_low'></div>
            </div>
            <div id="jour3" class="forecast">
                <div id="forecast3_jour"   class='forecast_jour'></div>
                <IMG  id="forecast3_icon"   class='forecast_icon' SRC=""></IMG>
                <div id="forecast3_high"   class='forecast_temp_high'></div>
                <div id="forecast3_low"    class='forecast_temp_low'></div>
            </div>
        </div>

        
        <div class="meteo_forecast_hourly">
            <?php        
            for ($i = 0 ; $i  < 12 ; $i++)
            {
                echo '<div class="forecast_hourly">';
                    echo '<div id="forecast_hourly'.$i.'_hour"  class="forecast_hour"></div>';
                    echo '<IMG  id="forecast_hourly'.$i.'_icon"  class="forecast_mini_icon" SRC=""></IMG>';
                    echo '<div  id="forecast_hourly'.$i.'_temp"  class="forecast_temp"></div>';
                echo '</div>';
            }
            ?>
        </div>
		
        <div id="horloge"></div>
        
        <div class="supervision">
            <div id="ping"></div>
			<div id="garage"></div>
            <div id="courrier"></div>
            <div id="gauge_granule"></div>
            <div id="gauge_conso"></div>
        </div>
    </div>

  </body>
</html>
