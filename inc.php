<?php
//**********************************************************
//  PING
//**********************************************************

function ping () {
    $hosts    = array();
    $hosts_ip = array(
                    'rasp'    => array('192.168.0.161', '6600'),
                    'plex'    => array('192.168.0.200', '32400')
                  );

    foreach($hosts_ip as $hostname => $host_data){
      $host_ip    = $host_data[0];
      $host_port  = $host_data[1];
      $socket     = 0;
      $socket     = fsockopen($host_ip, $host_port, $errno, $errstr, 3);
      if($socket && !$errno){$hosts[$hostname] = 'up';}
      else{$hosts[$hostname] = 'down';}
    } 

    // $html  = '';
    // $html .= '<table cellspacing="10px">';
    // $c=0;
    // foreach($hosts as $hostname => $host_status){
      // if($c == 0){$html .= '<tr>';}
      // $html .= '<td class="ping ping_'.$host_status.'">'.$hostname.'</td>';
      // $c++;
      // if($c == 2){$c = 0; $html .= '</tr>';}
    // }
    // if($c != 0){$html .= '</tr>';}
    // $html .= '</table>';
    
    foreach($hosts as $hostname => $host_status){
      $html .= '<div class="ping_'.$hostname.'_'.$host_status.'"></div>';
    }

    return $html;
}

//**********************************************************
//  temperature locale
//**********************************************************

function temperature () {
    // MySQL config
    $hostname = "192.168.0.111"; //localhost si la BDD est sur la meme machine que le serveur web , sinon IP
    $database = "owl_intuition"; // nom de la BDD
    $database2 = "Hargassner"; // nom de la BDD
    $username = "dashboard"; // utilisateur mysql
    $password = "ttp2570";
    // ************* connection to MySQL, ******************
    function connectMaBase($hostname, $database, $username, $password){
        $Conn = mysql_connect ($hostname, $username, $password) or trigger_error(mysql_error(),E_USER_ERROR);  
        mysql_select_db($database, $Conn);
    }

	header("Content-type: text/json");
    $query1 = "SELECT sonde1 as veranda, sonde3 as spa FROM PiTemp
              ORDER BY id DESC LIMIT 1";
    $query2 = "SELECT c6 as Text,c138 as Tint,c115 as granule FROM data 
              ORDER BY id DESC LIMIT 1";
              
	connectMaBase($hostname, $database, $username, $password);
    $req1 = mysql_query($query1) ;
	mysql_close();
	connectMaBase($hostname, $database2, $username, $password);
    $req2 = mysql_query($query2) ;
	mysql_close();
    
    $data = array_merge(mysql_fetch_assoc($req1), mysql_fetch_assoc($req2));
    return json_encode($data, JSON_NUMERIC_CHECK);

}
//**********************************************************
//  conso electrique
//**********************************************************

function conso () {
    // MySQL config
    $hostname = "192.168.0.111"; //localhost si la BDD est sur la meme machine que le serveur web , sinon IP
    $database = "owl_intuition"; // nom de la BDD
    $username = "dashboard"; // utilisateur mysql
    $password = "ttp2570";
    // ************* connection to MySQL, *******************
    function connectMaBase($hostname, $database, $username, $password){
        $Conn = mysql_connect ($hostname, $username, $password) or trigger_error(mysql_error(),E_USER_ERROR);  
        mysql_select_db($database, $Conn);
    }

	header("Content-type: text/json");
    $query1 = "SELECT chan1+chan2+chan3 as conso 
               FROM detail 
               ORDER BY id DESC LIMIT 1";
               
	connectMaBase($hostname, $database, $username, $password);
    $req1 = mysql_query($query1) ;
	mysql_close();

    $data = mysql_fetch_assoc($req1);
    return json_encode($data, JSON_NUMERIC_CHECK);
}
//**********************************************************
//  porte garage
//**********************************************************

function garage () {
    // MySQL config
    $hostname = "192.168.0.111"; //localhost si la BDD est sur la meme machine que le serveur web , sinon IP
    $database = "garage"; // nom de la BDD
    $username = "dashboard"; // utilisateur mysql
    $password = "ttp2570";
    // ************* connection to MySQL, *******************
    function connectMaBase($hostname, $database, $username, $password){
        $Conn = mysql_connect ($hostname, $username, $password) or trigger_error(mysql_error(),E_USER_ERROR);  
        mysql_select_db($database, $Conn);
    }

    $query1 = "SELECT etat FROM porte";
               
	connectMaBase($hostname, $database, $username, $password);
    $req1 = mysql_query($query1) ;
	mysql_close();

    $data = mysql_fetch_row($req1);
	
      $html .= '<div class="porte_garage_'.$data[0].'"></div>';
	
    return $html;
}

//**********************************************************
//  courrier
//**********************************************************
function courrier () {
	if (file_exists('courrier.OK')) {
		$html = '<div class="courrier_1"></div>';
	} else {
		$html = '<div class="courrier_0"></div>';
	}
    return $html;
}
?>
