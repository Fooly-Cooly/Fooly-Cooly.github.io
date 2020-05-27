<html>
   <head>
      <title>APSU Kendo Iai Club</title>
      <link rel="stylesheet" type="text/css" href="style.css" />
      <div class="overlay"></div>
      <div class="overlay"></div>
      <div class="overlay"></div>
      <div class="overlay"></div>
   </head>

   <body>
      <table>
         <th class="banner" colspan="2"></th>
         <tr>
            <td class="body">
               <?php
                  include_once( './news/fastnews-code.php' );
                  $fn = new fastNews();
                  echo $fn->display();
               ?>
            </td>
            <td class="toolbar">
               <div class="menu">
               <a href="./">Home</a>
               <a href="./smf">Forums</a>
               <a href="./smf/index.php?action=register">Sign-Up</a>
               <a href="http://www.google.com">Login</a>
               </div>
               </br>
               <div class="menu">
               <a href="./">Home</a>
               <a href="./smf">Forums</a>
               <a href="./smf/index.php?action=register">Sign-Up</a>
               <a href="http://www.google.com">Login</a>
               </div>
               </br>
               <div class="menu">
               <a href="./">Home</a>
               <a href="./smf">Forums</a>
               <a href="./smf/index.php?action=register">Sign-Up</a>
               <a href="http://www.google.com">Login</a>
               </div>
               </br>
            </td>
         </tr>

      <table>
   </body>

</html>