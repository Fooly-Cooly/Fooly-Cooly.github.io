<?php
	$i=0;
	$Args = $_GET['Args'];
	$Count = substr_count($Args,"|")+1;
	while($i < $Count)
	{
		$Pos = stripos($Args,"|");
		$Arg[$i] = substr($Args,0,$Pos);
		$Args = substr($Args,$Pos+1,strlen($Args));
		echo $Arg[$i] . " ";
		$i++;
	}
?>