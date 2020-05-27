<?php
// CHANGE IT!
define( 'FN_PASSWORD', 'fastnews' );
// SET IT TO THE URL OF THE PHPFASTNEWS CODE FILE
define( 'FN_CODE_URL', './news/fastnews-code.php' );

// TEMPLATES - CHANGES ARE WELCOME BUT DO BE CAREFUL, THERE ARE SOME REQUIRED CODE THERE

// THE MAIN NEWS CONTAINER
$NEWS_LIST = <<<EOT
<STYLE>
ul#phpFastNews {
	list-style-type: none;
	margin: 0.5em 0;
	padding: 0;
	}
ul#phpFastNews li {
	list-style-type: none;
	margin: 1em 0;
	padding: 0;
	}
</STYLE>

<UL ID="phpFastNews">
{ADD_LINK}
{LOGIN_LINK}
<LI ID="fn-addForm" STYLE="display: none;">
	<H3>Add News Item</H3>
	<FORM METHOD="post" ACTION="{CODE_URL}">
	<INPUT TYPE="hidden" NAME="fn_action" VALUE="add">
	<INPUT TYPE="text" SIZE="48" NAME="subject" VALUE="News Subject"><BR>
	<TEXTAREA ROWS="6" COLS="48" NAME="message">News Text</TEXTAREA><BR>
	<INPUT TYPE="submit" VALUE="Add">
	</FORM>
</LI>
<LI ID="fn-loginForm" STYLE="display: none;">
	<H3>Login</H3>
	<FORM METHOD="post" ACTION="{CODE_URL}">
	<INPUT TYPE="hidden" NAME="fn_action" VALUE="login">
	Password: <INPUT TYPE="password" SIZE="24" NAME="password" VALUE=""><BR>
	<INPUT TYPE="submit" VALUE="Login">
	</FORM>
</LI>
{NEWS_ITEMS}
</UL>
EOT;

// INDIVIDUAL NEWS ITEM CONTAINER
$NEWS_ITEM = <<<EOT
<LI ID="fn-view-{ITEM_ID}">
	<H3>{SUBJECT}</H3>
	<I>{DATE}</I>
	<BR>
	{MESSAGE}
	<BR>
	{EDIT_LINKS}
</LI>

<LI ID="fn-edit-{ITEM_ID}" STYLE="display: none;">
	<H3>Edit News Item</H3>
	<FORM METHOD="post" ACTION="{CODE_URL}">
	<INPUT TYPE="hidden" NAME="fn_action" VALUE="update">
	<INPUT TYPE="hidden" NAME="id" VALUE="{ITEM_ID}">
	<INPUT TYPE="text" SIZE="48" VALUE="{FORM_SUBJECT}" NAME="subject"><BR>
	<TEXTAREA ROWS="6" COLS="48" NAME="message">{MESSAGE}</TEXTAREA><BR>
	<INPUT TYPE="submit" VALUE="Update"><BR>
	</FORM>
</LI>
EOT;

// COOKIE STUFF, MOST PROBABLY YOU DON'T NEED TO CHANGE THIS
define( 'FN_COOKIE_NAME', 'fn-loggedin' );
define( 'FN_COOKIE_EXPIRES', 3600 ); // in seconds
?>