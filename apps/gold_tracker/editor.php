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
	<?php
	  require "editor_cmds.php";
	  database_connect();
	  if ($_POST['index'])  delete_row();
	  if ($_POST['action']) insert_row();
	?>
  </head>
  <body>
    <center>
    <form action="editor.php" method="post">
      <table width="200" border="1">
		<tr>
		  <td colspan='5'>
			<SELECT id='table' name='table' class='tables' onchange="this.form.submit();">
			<?php read_database();?>
			</SELECT>
		  </td>
		</tr>
        <tr>
          <td>Action</td>
          <td style="color:#D4AF37;">Gold</td>
          <td style="color:#C9C0BB;">Silver</td>
          <td style="color:#DA8A67;">Copper</td>
          <td>Remove</td>
        </tr>
        <?php read_table();?>
        <tr align="center">
          <td>
            <select name="action">
			  <option value="">---</option>
              <option value="+">Add</option>
              <option value="-">Sub</option>
            </select>
          </td>
          <td><input size=4 type="text" name="gold"></td>
          <td><input size=4 type="text" name="silver"></td>
          <td><input size=4 type="text" name="copper"></td>
          <td><input type="submit" value="Go"></td>
        </tr>
      </table>
    </form>
  </body>
  <?php mysql_close($mysql_connect);?>
</html>