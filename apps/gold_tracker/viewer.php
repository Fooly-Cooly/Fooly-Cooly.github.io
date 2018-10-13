<html>
  <head>
	<style>
		table, th, td {
			background-color:rgba(30,30,50,0.25);
			border-collapse:collapse;
			border:5px solid rgb(50,50,70);
			text-align:center;
			color:rgb(205,205,205);
		}
		button {
			background-image:url(delete.png);
			background-color:transparent;
			height:24px;
			width:24px;
			border:0px;
		}
	</style>
  </head>
  <body>
	<center>
	<form action="viewer.php" method="post">
		<table width="200" border="1">
			<?php
				require "viewer_cmds.php";
				check_permission($_GET['userid']);
			?>
			<tr>
				<td>Action</td>
				<td style="color:#D4AF37;">Gold</td>
				<td style="color:#C9C0BB;">Silver</td>
				<td style="color:#DA8A67;">Copper</td>
			</tr>
			<?php load_vault(); ?>
		</table>
	</form>
  </body>
</html>