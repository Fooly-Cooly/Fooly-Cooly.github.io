<html>
<head>
	<link rel="stylesheet" type="text/css" href="../style.css">
</head>
<body class=transparent>
    <table align=center border=1>
		<tr><td width=534 height=75 colspan = 2 background=../images/idbanner.jpg>.</td></tr>
	<?php
		$con = mysql_connect("localhost","roboslick","apples123");  
		mysql_select_db("roboslick",$con);  
		$result = mysql_query("SELECT * FROM  `idlist` ORDER BY  `idlist`.`id`");  
		while($row = mysql_fetch_array($result))  
		{   
			echo "<tr><td>" . $row[name] . "</td><td>" . $row[id] . "</td></tr>";  
		}  
		mysql_close($con); 
		echo "</table></body>"; 
	?> 
	<!----Mysql code by SlickSilver555----> 
	<!----Background and Html code by Fooly Cooly ----> 
</html> 