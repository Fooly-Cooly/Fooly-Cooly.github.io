<html>
	<body>
		<?php
		$con = mysql_connect("localhost","roboslick","apples123");
		mysql_select_db("roboslick",$con);
		$query = "SELECT * FROM idlist)";
		$result = mysql_query("SELECT * FROM idlist");
		while($row = mysql_fetch_array($result))
		{
			if($row['id'] == $_GET['id'])
				$name = $row[name];
		}
		mysql_close();
		if($name != "")
			echo $_GET['id'] . " " . $name;
		?>
	</body>
</html>