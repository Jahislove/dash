<?php

  header('Content-type: text/html; charset=utf-8');
  require_once('inc.php');

  if(isset($_REQUEST['block'])){$block = $_REQUEST['block'];}else{$block = 'none';}


  /////////////////////////////////////////////////
  //  PING
  /////////////////////////////////////////////////

  if($block == 'ping'){
	echo ping();
  }

  /////////////////////////////////////////////////
  //  temperature BDD
  /////////////////////////////////////////////////

  if($block == 'temperature'){
    echo temperature();
  }

  /////////////////////////////////////////////////
  //  conso electrique
  /////////////////////////////////////////////////

  if($block == 'conso'){
    echo conso();
  }

  /////////////////////////////////////////////////
  //  porte garage
  /////////////////////////////////////////////////

  if($block == 'garage'){
    echo garage();
  }

  /////////////////////////////////////////////////
  //  courrier
  /////////////////////////////////////////////////

  if($block == 'courrier'){
    echo courrier();
  }
?>