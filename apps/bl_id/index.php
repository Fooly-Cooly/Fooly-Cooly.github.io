<html>
   <head>
      <title>RoboSlick Homepage</title>
      <link rel="shortcut icon" href="images/favicon.ico">
      <link rel="stylesheet" type="text/css" href="style.css">
   </head>
   <body>
      <table width=1024 height=100% cellspacing=0 align=center>
         <tr>
            <td height=150 colspan=2 background=images/banner.jpg></td>
         </tr>
         <tr valign=top>
            <td height=100% bgcolor=#506987>
               <table width=206 height=100%>
                  <?php include("pages/menu.php"); ?>
               </table>
            </td>
            <?php
               $background = array("avatar01.png","avatar02.png","avatar03.png","avatar04.png","avatar05.png","avatar06.png","avatar07.png","avatar08.png","avatar09.png","avatar10.png");
               echo "<td class=bg  width=815 height=100% background=../images/" . $background[rand(0,9)] . ">";
            ?>
            <iframe allowtransparency=true background-color=transparent frameborder=0 width=100% height=100% name=main src="news/"></iframe></td>
         </tr>
      </table>
</html>