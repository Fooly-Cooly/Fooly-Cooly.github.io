# TGE Console Commands Reference

In this section I will explain each Console command and function used in the TGE CVS HEAD version as of 04/04/02. Examples of each command or function will be given, along with its prototype, and its return value.

Before we begin, let's take a few minutes to define some terms, reserved keywords and operators that will be used within this document.

---

## Document Style

- **Document text** — Document text other than function prototypes and examples will be formatted using a 12pt Arial font
- **Function prototype** — Function prototypes will be **BOLD** formatted using a 12pt Verdana font
- **Function example** — Function examples will be formatted using a 12pt Courier font

---

## Terms Used Within the Document

- **string** — refers to any single or double quoted collection of characters that can include both numbers and text
- **boolean** — refers to a numeric value of either 1 or 0 (1 being TRUE and 0 being FALSE)
- **numeric** — refers to any intrinsic numeric data type (whole number, boolean, decimal number and or a hexadecimal number)
- **global variable** — refers to a variable that is accessible from within any function or script
- **local variable** — refers to a variable that is only accessible within the function or script it is created
- **variable** — refers to any string that begins with a percent sign (%) denoting a local variable or dollar sign ($) denoting a global variable
- **tagged string** — Tagged strings is used for any string constant that is transmitted across a connection. The entire tagged string is sent only once; when referenced, a short tag (numeric value) identifying that string is sent instead of the entire string.

---

## Reserved Key Words

`break`, `case`, `continue`, `datablock`, `default`, `else`, `false`, `function`, `if`, `for`, `new`, `or`, `package`, `return`, `switch`, `switch$`, `true`, and `while`

---

## Operators

### Assignment Operators

- `=` — Assigns the value of the second operand to the first operand.

### Mathematical Operators

- `+` — (Addition) Adds 2 numbers
- `-` — (Subtraction) Subtracts the value of its argument.
- `*` — (Multiplication) Multiplies 2 numbers.
- `/` — (Division) Divides 2 numbers.
- `%` — (Modulus) Computes the integer remainder of dividing 2 numbers.
- `+=` — Adds 2 numbers and assigns the result to the first.
- `-=` — Subtracts 2 numbers and assigns the result to the first.
- `*=` — Multiplies 2 numbers and assigns the result to the first.
- `/=` — Divides 2 numbers and assigns the result to the first.
- `%=` — Computes the modulus of 2 numbers and assigns the result to the first.
- `++` — (Increment) Adds one to a variable representing a number (returning either the new or old value of the variable)
- `--` — (Decrement) Subtracts one from a variable representing a number (returning either the new or old value of the variable)

### Bitwise Operators

- `~` — (Bitwise NOT) Flips the bits of its operand.
- `|` — (Bitwise OR) Returns a one in a bit if bits of either operand is one.
- `&` — (Bitwise AND) Returns a one in each bit position if bits of both operands are ones.
- `^` — (Bitwise XOR) Returns a one in a bit position if bits of one but not both operands are one.
- `<<` — (Left shift) Shifts its first operand in binary representation the number of bits to the left specified in the second operand, shifting in zeros from the right.
- `>>` — (Sign-propagating right shift) Shifts the first operand in binary representation the number of bits to the right specified in the second operand, discarding bits shifted off.
- `|=` — Performs a bitwise OR and assigns the result to the first operand.
- `&=` — Performs a bitwise AND and assigns the result to the first operand.
- `^=` — Performs a bitwise XOR and assigns the result to the first operand.
- `<<=` — Performs a left shift and assigns the result to the first operand.
- `>>=` — Performs a sign-propagating right shift and assigns the result to the first operand.

### String Operators

- `@` — Concatenates one or more values together to form a new value
- `NL` — Concatenates one value together with a new line to form a new value
- `TAB` — Concatenates one value together with a tab to form a new value
- `SPC` — Concatenates one value together with a space to form a new value

### Logical Operators

- `!` — evaluates the opposite of the value specified
- `&&` — requires both values to be true for the result to be true.
- `||` — requires only one value to be true for the result to be true.

### Relational Operators

- `==` — value1 and value2 are equal
- `!=` — value1 and value2 are not equal
- `<` — value1 is less than value2
- `>` — value1 is greater than value2
- `<=` — value1 is less than or equal to value2
- `>=` — value1 is greater than or equal to value2

### String Comparison Operators

- `$=` — string1 is equal to string2
- `!$=` — string1 is not equal to string2

---

The following console commands and functions are listed in order as viewed in the output from ConsoleDoc (ConsoleDoc was created by Emanuel Zephir).

---

## Console Functions

---

### `OpenALInitDriver()`

- Used to initialize the sound driver
- Returns a numeric value

```
if(!OpenALInitDriver())
    error("   Failed to initialize driver.");
```

---

### `OpenALShutdownDriver()`

- Used to disable the sound driver
- No return value

```
function OpenALShutdown()
{
    OpenALShutdownDriver();
}
```

---

### `OpenALRegisterExtensions()`

- This function does not have a function body or any other associated engine or script code
- No return value

```
function OpenALRegister()
{
    OpenALRegisterExtensions();
}
```

---

### `alGetString(ALenum)`

- Used to return the string representing the specified ALenum passed
- Returns a string value

```
function OptAudioUpdate()
{
    // set the driver text
    %text =   "Vendor: " @ alGetString("AL_VENDOR") @
              "\nVersion: " @ alGetString("AL_VERSION") @
              "\nRenderer: " @ alGetString("AL_RENDERER") @
              "\nExtensions: " @ alGetString("AL_EXTENSIONS");
    OptAudioInfo.setText(%text);
}
```

---

### `alxCreateSource( profile, {x,y,z} | description, filename, {x,y,z} )`

- Creates and validates the Audio source (sound file) and readies it to be played
- Returns a numeric

```
function OptAudioUpdateMasterVolume(%volume)
{
    if (%volume == $pref::Audio::masterVolume)
        return;
    alxListenerf(AL_GAIN_LINEAR, %volume);
    $pref::Audio::masterVolume = %volume;
    if (!alxIsPlaying($AudioTestHandle))
    {
        $AudioTestHandle = alxCreateSource("AudioChannel0", expandFilename("~/data/sound/testing.wav"));
        alxPlay($AudioTestHandle);
    }
}
```

---

### `alxSourcef( handle, ALenum, value)`

- Used to set the value of ALenum for the specified handle
- No return type

```
alxSourcef($ClientChatHandle[%sender], "AL_PITCH", %pitch);
```

---

### `alxSource3f(handle, ALenum, \"xyz\" | x,y,z)`

- Used to set the value of ALenum for the specified handle
- No return type

```
alxSourcef($ClientChatHandle[%sender], "AL_PITCH", %x, %y, %z);
```

---

### `alxSourcei(handle, ALenum, value)`

- Used to set the value of ALenum for the specified handle
- No return type

```
alxSourcei($ClientChatHandle[%sender], "AL_PITCH", %pitch);
```

---

### `alxGetSourcef(handle, ALenum)`

- Used to get the value of ALenum for the specified Audio Handle
- Returns a numeric value

```
%pitch = alxGetSourcef(($ClientChatHandle[%sender], "AL_PITCH");
```

---

### `alxGetSource3f(handle, ALenum)`

- Used to get the value of ALenum for the specified Audio Handle
- Returns a numeric value

```
%pitch = alxGetSourcef(($ClientChatHandle[%sender], "AL_PITCH");
```

---

### `alxGetSourcei(handle, ALenum)`

- Used to get the value of ALenum for the specified Audio Handle
- Returns a numeric value

```
%pitch = alxGetSourcef(($ClientChatHandle[%sender], "AL_PITCH");
```

---

### `alxPlay(handle) | alxPlay(profile) | alxPlay(profile, x,y,z)`

- Used to begin audio playback on specified (Handle | profile | profile "x y z")
- Returns a numeric value

```
function OptAudioUpdateChannelVolume(%channel, %volume)
{
    if (%channel < 1 || %channel > 8)
        return;
    if (%volume == $pref::Audio::channelVolume[%channel])
        return;
    alxSetChannelVolume(%channel, %volume);
    $pref::Audio::channelVolume[%channel] = %volume;
    if (!alxIsPlaying($AudioTestHandle))
    {
        $AudioTestHandle = alxCreateSource("AudioChannel"@%channel, expandFilename("~/data/sound/testing.wav"));
        alxPlay($AudioTestHandle);
    }
}
```

---

### `alxStop(handle)`

- Used to stop the audio playback on specified Handle
- No return value

```
if ( $ClientChatHandle[%sender] != 0 )
    alxStop( $ClientChatHandle[%sender] );
```

---

### `alxStopAll()`

- Used to stop ALL Audio playback on all registered sound channels
- No return value

```
function clientCmdMissionEnd(%seq,%player)
{
    // Received when the current mission is ended.
    alxStopAll();
    ...
}
```

---

### `alxIsPlaying(handle)`

- Used to determine if a Handle is currently performing audio playback
- Returns a numeric value

```
if (!alxIsPlaying($AudioTestHandle))
{
    $AudioTestHandle = alxCreateSource("AudioChannel0", expandFilename("~/data/sound/testing.wav"));
    alxPlay($AudioTestHandle);
}
```

---

### `alxListener(ALenum, value)`

- Used to set the ALenum extension supporting linear gain to value
- No return value

```
function OpenALInit()
{
    OpenALShutdownDriver();
    echo("");
    echo("OpenAL Driver Init:");
    echo ($pref::Audio::driver);
    if($pref::Audio::driver $= "OpenAL")
        if(!OpenALInitDriver())
            error("   Failed to initialize driver.");
    echo("   Vendor: " @ alGetString("AL_VENDOR"));
    echo("   Version: " @ alGetString("AL_VERSION"));
    echo("   Renderer: " @ alGetString("AL_RENDERER"));
    echo("   Extensions: " @ alGetString("AL_EXTENSIONS"));
    alxListenerf( AL_GAIN_LINEAR, $pref::Audio::masterVolume );
    for (%channel=1; %channel <= 8; %channel++)
        alxSetChannelVolume(%channel, $pref::Audio::channelVolume[%channel]);
    echo("");
}
```

---

### `alListener3f(ALenum, \"xyz\" | x,y,z)`

- Used to set the ALenum extension supporting linear gain to value
- No return value

*(Same example as above but using `alxListener3f`)*

---

### `alxGetListenerf(ALenum)`

- Used to get the value of the ALenum extension supporting linear gain
- Returns a numeric value

```
%LinearGain = alxGetListenerf(AL_GAIN_LINEAR);
```

---

### `alxGetListener3f(ALenum)`

- Used to get the value of the ALenum extension supporting linear gain
- Returns a numeric value

```
%LinearGain = alxGetListenerf(AL_GAIN_LINEAR);
```

---

### `alxGetListeneri(ALenum)`

- Used to get the value of the ALenum extension supporting linear gain
- Returns a numeric value

```
%LinearGain = alxGetListenerf(AL_GAIN_LINEAR);
```

---

### `alxGetChannelVolume(channel_id)`

- Used to get the current volume of specified channel
- Returns a numeric value

```
$pref::Audio::channelVolume[%channel] = alxGetChannelVolume(%channel);
```

---

### `alxSetChannelVolume(channel_id)`

- Used to set the volume of the specified channel
- Returns a numeric value

```
alxSetChannelVolume(%channel, %volume);
```

---

### `dumpConsoleClasses()`

- Used to dump all registered console classes to the console in native C++ syntax
- No return type

```
dumpConsoleClasses();
```

---

### `expandFilename(filename)`

- Used to determine the actual path of the specified filename
- Returns a string value

```
$AudioTestHandle = alxCreateSource("AudioChannel0", expandFilename("~/data/sound/testing.wav"));
```

---

### `strcmp(one, two)`

- Used to compare two strings
- Returns a numeric value (1 being TRUE and 0 being FALSE)

```
if ( strcmp( %name, %rawName ) == 0 )
    return false;
```

---

### `stricmp(one, two)`

- Used to compare two strings with case insensitivity
- Returns a numeric value:
  - `< 0` — "one" is less than "two"
  - `= 0` — "one" is equal to "two"
  - `> 0` — "one" is greater than "two"

```
if ( stricmp( %name, %rawName ) == 0 )
    return false;
```

---

### `strlen(str)`

- Used to get the length of a string
- Returns a numeric value

```
%StringLength = strlen(%player.ShapeName);
```

---

### `strstr(string, substr)`

- Used to locate first occurrence of a "substr" within a "string"
- Returns a string value

```
%pos = strstr( %action, "pov" );
```

---

### `strpos(stringhay, stringneedle [, intoffset])`

- Used to locate the first occurrence of *"stringneedle"* in "stringhay"
- Returns a numeric value

```
if (%hasNextArg && strpos(%nextArg, "-") == -1)
{
    $showShapeList = $showShapeList @ " " @ %nextArg;
    $argUsed[%i+1]++;
    %i++;
}
```

---

### `ltrim(str)`

- Used to strip the leading white space from "str"
- Returns a string

```
%trimed = ltrim(%value);
```

---

### `rtrim(str)`

- Used to strip the trailing white space from "str"
- Returns a string

```
%trimed = rtrim(%value);
```

---

### `trim(str)`

- Used to strip the leading and trailing white space from "str"
- Returns a string

```
%trimed = trim(%value");
```

---

### `stripChars(string, chars)`

- Used to remove "chars" from "string"
- Returns a string value

```
%striped = stripChars(%value, "~" );
```

---

### `strlwr(string)`

- Used to convert "str" to its lower case equivalent
- Returns a string

```
%var = strlwr(%value);
```

---

### `strupr(string)`

- Used to convert "str" to its upper case equivalent
- Returns a string

```
%var = strupr(%value);
```

---

### `strchr(string, char)`

- Used to locate the first occurrence of "char" in "string"
- Returns a string

```
%var = strchr(%vale, "~" );
```

---

### `strreplace(string, from, to)`

- Used to replace all occurrences of "from" and replaces with "to"
- Returns a string

```
%var = strreplace(%value, "~", "-");
```

---

### `getSubStr(string, start, numChars)`

- Used to get the sub string of "string", starting at "start", and continuing to either the end of the string, or "numChars" characters, whichever comes first
- Returns a string

```
function serverCmdTeamMessageSent(%client, %text)
{
    if(strlen(%text) >= $Pref::Server::MaxChatLen)
        %text = getSubStr(%text, 0, $Pref::Server::MaxChatLen);
    chatMessageTeam(%client, %client.team, '\c3%1: %2', %client.name, %text);
}
```

---

### `getWord(text, index)`

- Used to get the word at specified index within "text"
- Returns a string

```
function TerrainEditor::offsetBrush(%this, %x, %y)
{
    %curPos = %this.getBrushPos();
    %this.setBrushPos(getWord(%curPos, 0) + %x, getWord(%curPos, 1) + %y);
}
```

---

### `getWords(text, index [, endindex])`

- Used to get the word(s) specified at index [,endindex] within "text"
- Returns a string

```
%pos = getWords(%obj.getTransform(), 0, 2);
```

---

### `setWord(text, index, replace)`

- Used to replace the word at index with "replace" within "text"
- Returns a string

```
function WorldEditor::dropCameraToSelection(%this)
{
    if(%this.getSelectionSize() == 0)
        return;
    %pos = %this.getSelectionCentroid();
    %cam = LocalClientConnection.camera.getTransform();
    %cam = setWord(%cam, 0, getWord(%pos, 0));
    %cam = setWord(%cam, 1, getWord(%pos, 1));
    %cam = setWord(%cam, 2, getWord(%pos, 2));
    LocalClientConnection.camera.setTransform(%cam);
}
```

---

### `removeWord(text, index)`

- Used to remove the word at index from "text"
- Returns a string

```
%cam = removeWord(%cam, 0, getWord(%pos, 0));
```

---

### `getWordCount(text)`

- Used to return the number of words within "text"
- Returns a numeric value

```
if ( %pos != -1 )
{
    %wordCount = getWordCount( %action );
    %mods = %wordCount > 1 ? getWords( %action, 0, %wordCount - 2 ) @ " " : "";
    %object = getWord( %action, %wordCount - 1 );
    switch$ ( %object )
    {
        case "upov":   %object = "POV1 up";
        case "dpov":   %object = "POV1 down";
        case "lpov":   %object = "POV1 left";
        case "rpov":   %object = "POV1 right";
        ...
        default:       %object = "??";
    }
    return( %mods @ %object );
}
```

---

### `getField(text, index)`

- Used to get the field at "index" within "text"
- Returns a string

```
function SM_StartMission()
{
    %id = SM_missionList.getSelectedId();
    %mission = getField(SM_missionList.getRowTextById(%id), 1);
    if ($pref::HostMultiPlayer)
        %serverType = "MultiPlayer";
    else
        %serverType = "SinglePlayer";
    createServer(%serverType, %mission);
    localConnect($pref::Player::Name);
}
```

---

### `getFields(text, index [, endindex])`

- Used to return the field(s) specified at index [,endindex] within "text"
- Returns a string

```
%fields = getFields((SM_missionList.getRowTextById(%id), 1, 3 );
```

---

### `setField(text, index, replace)`

- Used to replace field at "index" with "replace"
- Returns a string

```
function PlayerListGui::updateScore(%this,%clientId,%score)
{
    %text = PlayerListGuiList.getRowTextById(%clientId);
    %text = setField(%text,1,%score);
    PlayerListGuiList.setRowById(%clientId, %text);
    PlayerListGuiList.sortNumerical(1);
}
```

---

### `removeField(text, index)`

- Used to remove a field at "index" from "text"
- Returns a string

```
function removeFromServerGuidList( %guid )
{
    %count = getFieldCount( $Server::GuidList );
    for ( %i = 0; %i < %count; %i++ )
    {
        if ( getField( $Server::GuidList, %i ) == %guid )
        {
            $Server::GuidList = removeField( $Server::GuidList, %i );
            return;
        }
    }
    // Huh, didn't find it.
}
```

---

### `getFieldCount(text)`

- Used to return the number of fields within "text"
- Returns a numeric value

```
%count = getFieldCount($Server::GuidList);
```

---

### `getRecord(text, index)`

- Used to return the record at "index" within "text"
- Returns a string

```
function Texture::saveMaterial()
{
    %id = $selectedMaterial;
    if (%id == -1)
        return;
    Texture::SaveOperation();
    %data = Texture_Material.getRowTextById(%id);
    %newData = getRecord(%data,0);
    %rowCount = Texture_Operation.rowCount();
    for (%row=0; %row<%rowCount; %row++)
        %newdata = %newdata @ "\n" @ Texture_Operation.getRowText(%row);
    Texture_Material.setRowById(%id, %newdata);
    Texture::save();
}
```

---

### `getRecords(text, index [, endIndex])`

- Used to return the record(s) at "index [,endIndex]" within "text"
- Returns a string

```
%data = Texture_Material.getRowTextById(%id);
%records = getRecords(%data,1,3);
```

---

### `setRecord(text, index, replace)`

- Used to replace record at "index" with "replace" within "text"
- Returns a string

```
%data = Texture_Material.getRowTextById(%id);
%replaced = setRecord(%data,3,"foo");
```

---

### `removeRecord(text, index)`

- Used to remove record at "index" within "text"
- Returns a string

```
%data = Texture_Material.getRowTextById(%id);
%replaced = removeRecord(%data,3);
```

---

### `getRecordCount(text)`

- Used to return the number of records within "text"
- Returns a numeric value

```
%data = Texture_material.getRowTextById(%id);
Texture_operation.clear();
%recordCount = getRecordCount(%data);
```

---

### `firstWord(text)`

- Used to return the first word within "text"
- Returns a string

```
if (%scanTarg)
{
    %targetObject = firstWord(%scanTarg);
    %client.setSelectedObj(%targetObject);
}
```

---

### `restWords(text)`

- Used to return the remaining words in "text"
- Returns a string

```
function Heightfield::showTab(%id)
{
    Heightfield::hideTab();
    %data = restWords(Heightfield_operation.getRowTextById(%id));
    %tab  = getField(%data,1);
    echo("Tab data: " @ %data @ " tab: " @ %tab);
    %tab.setVisible(true);
}
```

---

### `detag(textTagString)`

- Used to detag a string, that is to return the string value for the tagged string
- Returns a string

```
function isNameUnique(%name)
{
    %count = ClientGroup.getCount();
    for ( %i = 0; %i < %count; %i++ )
    {
        %test = ClientGroup.getObject( %i );
        %rawName = stripChars( detag( getTaggedString( %test.name ) ), "\cp\co\c6\c7\c8\c9" );
        if ( strcmp( %name, %rawName ) == 0 )
            return false;
    }
    return true;
}
```

---

### `getTag(textTagString)`

- Used to return the tag for the specified "textTagString"
- Returns a string

```
%tag = getTag(%variable);
```

---

### `echo(text [, ... ])`

- Used to print "text" to the console
- No return type

```
echo( 'This will be printed to the console');
```

---

### `warn(text [, ... ])`

- Used to print text to the console
- No return type

```
warn('Warning, this will be printed to the console);
```

---

### `error(text [, ... ])`

- Used to print text to the console
- No return type

```
error('Error Will Rogers, Error!');
```

---

### `expandEscape(text)`

- Used to escape characters in "text" (`\r` becomes `\\r`)
- Returns a string

```
%expanded = expandEscape(%variable);
```

---

### `collapseEscape(text)`

- Used to remove escaped characters in "text" (`\\r` becomes 0xd)
- Returns a string

```
%colapsed = collapseEscape(%variable);
```

---

### `quit()`

- Used to quit the game
- No return type

```
quit();
```

---

### `call(funcName [, args ...])`

- Used to execute the "funcName" with supplied "args"
- Returns a string

```
function clientCmdServerMessage(%msgType, %msgString, %a1, %a2, %a3, %a4, %a5, %a6, %a7, %a8, %a9, %a10)
{
    %tag = getWord(%msgType, 0);
    for(%i = 0; (%func = $MSGCB["", %i]) !$= ""; %i++)
        call(%func, %msgType, %msgString, %a1, %a2, %a3, %a4, %a5, %a6, %a7, %a8, %a9, %a10);
    if(%tag !$= "")
        for(%i = 0; (%func = $MSGCB[%tag, %i]) !$= ""; %i++)
            call(%func, %msgType, %msgString, %a1, %a2, %a3, %a4, %a5, %a6, %a7, %a8, %a9, %a10);
}
```

---

### `compile(fileName)`

- Used to compile "fileName"
- Returns a numeric

```
if( compile('/fps/client/scripts/script.cs') )
    echo('Compile success');
```

---

### `exec(fileName [, nocalls [, journalScript]])`

- Used to compile (if needed) and execute the specified "filename" or "journalScript"
- Returns a numeric value

```
if( exec('/fps/client/scripts/script.cs'))
    echo('exec success');
```

---

### `export(searchString [, fileName [, append]])`

- Used to "export" (save) the values of "searchString" to "fileName"
- No return value

```
echo("Exporting server prefs");
export("$Pref::Server::*", "./server/prefs.cs", False);
```

---

### `deleteVariables(wildCard)`

- Used to delete global variables specified by "wildcard"
- No return type

```
deleteVariables(*);
```

---

### `trace(bool)`

- Used to turn trace on or off
- No return type

```
trace(1);
```

---

### `debug()`

- Used to start debug mode
- No return type

```
debug();
```

---

### `findFirstFile(string pattern)`

- Used to return the first file in the directory system matching the given pattern
- Returns a string

```
findFirstFile('/fps', '*.cs');
```

---

### `findNextFile(string pattern)`

- Used to return the next file matching a search begun in findFirstFile
- Returns a string

```
findNextFile('/fps', '*.cs');
```

---

### `getFileCount(string pattern)`

- Used to return the number of files in the directory tree that match the given pattern
- Returns a numeric

```
getFileCount('/fps/client/scripts', '*.cs');
```

---

### `getFileCRC(filename)`

- Used to get the CRC of specified file name
- Returns a numeric

```
getFileCRC('/fps/client/scripts/script/cs');
```

---

### `isFile(filename)`

- Used to determine if file exists
- Returns a numeric (0 = FALSE, 1 = TRUE)

```
isFile('/fps/client/scripts/script.cs');
```

---

### `isWriteableFileName(filename)`

- Used to determine if file specified by filename can be written to
- Returns a numeric (0 = FALSE, 1 = TRUE)

```
isWriteableFileName('/fps/client/scripts/script.cs');
```

---

### `fileExt(filename)`

- Used to return the extension of file specified by filename
- Returns a string

```
fileExt('script.cs'); // will return '.cs' as a string
```

---

### `fileBase(filename)`

- Used to return the base name of the file specified by filename
- Returns a string

```
fileBase('/fps/client/scripts/script.cs'); // will return 'fps/client/scripts/script' as a string
```

---

### `fileName(filename)`

- Used to return the name of the file specified by filename
- Returns a string

```
fileName('scripts.cs'); // will return 'scripts' as a string
```

---

### `filePath(filename)`

- Used to return the path of the file specified by filename
- Returns a string

```
filePath('/fps/client/scripts/script.cs'); // Will return 'fps/client/scripts/' as a string
```

---

### `nextToken(str, token, delim)`

- Used to set "token" to next string delimited by delim
- Returns a string

```
nextToken('A,E,I,O,U', voul, ';');
//First pass vould would be equal to A, the next iteration would set vould to E, then I then O and finally U.
```

---

### `setLogMode(mode)`

- Used to set the current log mode (0 = Turn logging off, 1 = Logging on, 2 = Close current logfile and open a new one)
- No return value

```
SetLogMode(1);
```

---

### `setEchoFileLoads(bool)`

- Used to turn the echoing of File Loads to the console on or off (0 = OFF, 1 = ON)
- No return type

```
setEchoFileLoads(1);
```

---

### `backtrace()`

- Used to enable script back tracing (echoing of script call stack to console)
- No return type

```
backtrace();
```

---

### `isPackage(packageName)`

- Used to determine if packageName is a registered package
- Returns numeric (0 = FALSE, 1 = TRUE)

```
isPackage(Show);
```

---

### `activatePackage(packageName)`

- Used to activate usage of package specified by packageName
- No return type

```
activatePackage(Show);
```

---

### `deactivatePackage(packageName)`

- Used to disable usage of package specified by packageName
- No return type

```
deactivePackage(Show);
```

---

### `nameToID(object)`

- Used to return the ID number of the specified object
- Returns a numeric

```
nameToId(%player);
```

---

### `isObject(object)`

- Used to determine if object exists
- Returns a numeric (0 = FALSE, 1 = TRUE)

```
isObject(%player);
```

---

### `cancel(eventId)`

- Used to cancel the specified event
- No return type

```
if ($centerPrintActive) {
    if (centerPrintDlg.removePrint !$= "")
        cancel(centerPrintDlg.removePrint);
}
```

---

### `isEventPending(%scheduleID)`

- Used to determine if there are any pending events for specified schedule
- Returns a numeric (0 = FALSE, 1 = TRUE)

```
$Game::Schedule = schedule($Game::EndGamePause * 1000, 0, "onCyclePauseEnd");
if( isEventPending($Game::Schedule) )
    echo('got a pending event');
```

---

### `schedule(time, command, <arg1...argN>)`

- Used to schedule an event
- Returns the newly created scheduleID

```
$Game::Schedule = schedule($Game::EndGamePause * 1000, 0, "onCyclePauseEnd");
```

---

### `deleteDataBlocks()`

- Used to remove all registered dataBlocks from the game
- No return type

```
deleteDataBlocks();
```

---

### `telnetSetParameters( port, consolePass, listenPass )`

- Used to setup and accept telnet request with the specified options
- No return type

```
telnetSetParameters(4123, 'Garage', 'Games');
```

---

### `dbgSetParameters(port, pass)`

- Used to setup and accept debug connects with the specified options
- No return type

```
dbgSetParameters(1130, 'morbid');
```

---

### `dnetSetLogging(bool)`

- Used to turn on network packet logging to the console
- No return type

```
dnetSetLogging(1);
```

---

### `setNPatch(bool, int)`

- Used to enable Npatching (quadratic Interpolation) at specified level
- No return value

```
setNPatch(1, 1);
```

---

### `toggleNPatch()`

- Used to toggle the state of Npatch
- No return type

```
toggleNPatch();
```

---

### `increaseNPatch()`

- Used to increase the level of Npatch by one
- No return type

```
increaseNPatch();
```

---

### `decreaseNPatch()`

- Used to decrease the level of Npatch by one
- No return type

```
decreaseNPatch();
```

---

### `setFSAA`

See `setNPatch()`

---

### `IncreaseFSAA`

See `increaseNPatch()`

---

### `decreaseFSAA`

See `decreaseNPatch()`

---

### `setOpenGLMipReduction(0 – 5)`

- Used to control Shape Texture Detail (Higher number represents increased texture detail)
- No return value

```
setOpenGlMipReduction(2);
```

---

### `setOpenGLSkyMipReduction(0 – 5)`

- Used to control texture detail for the skybox and clouds (Higher number represents increased texture detail)
- No return value

```
setOpenGlMipReduction(2);
```

---

### `setOpenGLInteriorMipReduction(0 – 5)`

- Used to control texture detail for buildings
- No return value

```
setOpenGLInteriorMipReduction(2);
```

---

### `setOpenGLTextureCompressionHint(GL_DONT_CARE | GL_FASTEST | GL_NICEST)`

- Used to control how textures are compressed
- No return type

```
setOpenGLTextureCompressionHint(GL_NICEST);
```

---

### `setOpenGLAnisotropy(0 – 1)`

- Used to set the level of Anisotropy (Advanced texture rendering other than trilinear or bilinear)
- No return type

```
setOpenGLAnisotropy(0);
```

---

### `clearTextureHolds()`

- Used to free/release any textures that are not being used
- Returns a numeric (size of the TextureObject)

```
// Dump anything we're not using
clearTextureHolds();
```

---

### `addMaterialMapping( materialName, Sound, Color)`

- Used to add Sound and Puff color to specified material
- No return type

```
addMaterialMapping( "sand" , "sound: 0" , "color: 0.46 0.36 0.26 0.4 0.0" );
```

---

### `aiConnect( val 0..N)`

- Used to Construct and register a new AI connection. No control object is set
- Returns a numeric (newly created object ID)

```
aiConnect(1);
```

---

### `aiAddPlayer( 'playerName' [, 'AIClassType'] )`

- Used to add a bot to the game
- Returns the bot's object

```
aiAddPlayer('BotBoy');
```

---

### `setPowerAudioProfiles(powerUp, powerDown)`

- Used to powerUp/Down audio files for powerups
- No return value

---

### `calcExplosionCoverage( NEED FUNCTION PROTOTYPE!! )`

- Used to calculate how much exposure the current object has to the explosive force. The object types listed are objects that will block an explosion. If the object is totally blocked, then no damage is applied.
- Returns numeric (0 = no exposure, 1 = exposure)

```
%coverage = calcExplosionCoverage(%position, %targetObject,
    $TypeMasks::InteriorObjectType | $TypeMasks::TerrainObjectType |
    $TypeMasks::ForceFieldObjectType | $TypeMasks::VehicleObjectType);
if (%coverage == 0)
    continue;
```

---

### `gotoWebPage( address )`

- Used to open client's default browser with specified address
- No return type

```
gotoWebPage('http://www.garagegames.com);
```

---

### `deactivateDirectInput()`

- Used to disable polling of direct input devices (keyboard, mouse, joystick etc)
- No return type

```
deactivateDirectInput();
```

---

### `activateDirectInput()`

- Used to activate polling of direct input devices (keyboard, mouse, joystick etc)
- No return type

```
activateDirectInput();
```

---

### `strToPlayerName(string)`

- Used to limit string to 16 characters and strip leading spaces, underscores and certain characters (",", ".", "\\", and "'") from string to be used for player name
- Returns a string

```
%name = stripTrailingSpaces( strToPlayerName( %name ) );
```

---

### `stripTrailingSpaces(string)`

- Used to strip trailing spaces and underscores from string to be used for player name
- Returns a string

```
%name = stripTrailingSpaces( strToPlayerName( %name ) );
```

---

### `setDefaultFov(defaultFOV)`

- Used to set the default FOV (Field of View)
- No return value

```
setDefaultFov( $pref::Player::defaultFov );
```

---

### `setZoomSpeed(speed)`

- Used to set the zoom speed
- No return type

```
setZoomSpeed( $pref::Player::zoomSpeed );
```

---

### `setFov(FOV)`

- Used to set the active FOV
- No return type

```
setFov( $Pref::player::CurrentFOV );
```

---

### `screenShot(filename)`

- Used to take a screen shot and save it to file specified by filename
- No return type

```
screenShot('MyScreen');
```

---

### `panoramaScreenShot(filename)`

- Used to take a Panoramic Screen shot and save it to file specified by filename
- No return type

```
panoramaScreenShot('WideEyedScreenShot');
```

---

### `purgeResources()`

- Used to purge all game resources
- No return type

```
purgeResources();
```

---

### `lightScene( <completeCallback>, <forceAlways, forceWritable> )`

- Used to light the mission; "completeCallback" will be called upon completion of mission lighting
- No return type

```
if (lightScene("sceneLightingComplete", ""))
{
    error("Lighting mission....");
    schedule(1, 0, "updateLightingProgress");
    onMissionDownloadPhase3(%missionName);
    $lightingMission = true;
}
```

---

### `flushTextureCache()`

- Used to delete Textures in the cache
- No return type

```
flushTextureCache();
```

---

### `dumpTextureStats()`

- Used to dump information about each texture to the console. The following information is displayed: type, refCount, holding (Yes or no), textureSpace, texFileName
- No return type

```
dumpTextureStats();
```

---

### `dumpResourceStats()`

- Used to print information regarding loaded resources. The following information is displayed: path, resource_name, lockCount
- No return type

```
dumpResourceStats();
```

---

### `getControlObjectAltitude()`

- Used to get the altitude of a player control object
- Returns a numeric

```
%player.getControlObjectAltitude();
```

---

### `getControlObjectSpeed()`

- Used to get the speed of a player control object
- Returns a numeric

```
%player.getControlObjectSpeed();
```

---

### `containerFindFirst(type, point, x, y, z)`

- Appears to find objects of type in a box
- Returns a numeric

---

### `containerFindNext()`

- Used to return the next object in a box
- Returns a numeric

---

### `snapToggle()`

- Used to enable snap to grid functionality
- No return type

```
snapToggle();
```

---

### `getVersionNumber()`

- Used to get the current hard coded engine version number
- Returns a numeric

```
echo('Version Number: ' @ getVersionNumber() );
```

---

### `getVersionString()`

- Used to get the current hard coded engine version number
- Returns a string

```
echo('Version Number: ' @ getVersionNumber() );
```

---

### `getCompileTimeString()`

- Used to return the compile time and date
- Returns a string

```
function aboutDlg::onWake(%this)
{
    %text="<just:center><font:Arial Bold:20>Torque Game Engine Test Application\n( v1.1.1 )\n"@
          "<font:Arial:12>"@ getCompileTimeString() @", "@ getBuildString() @"Build\n\n"@
          "<font:Arial:16>Copyright (c) 2001 <a:www.garagegames.com>GarageGames.Com</a>\n"@
          "Portions Copyright (c) 2001 by Sierra Online, Inc.\n\n"@
          "<bitmap:fps/client/ui/gglogo150.png>";
    aboutText.setText(%text);
}
```

---

### `getBuildString()`

- Used to get the BUILD type (Release or Debug)
- Returns a string

*(Same example as getCompileTimeString above)*

---

### `getSimTime()`

- Used to get the Game time
- Returns a numeric

```
function timeMetricsCallback()
{
    return fpsMetricsCallback() @
           "  Time -- " @
           "  Sim Time: " @ getSimTime() @
           "  Mod: " @ getSimTime() % 32;
}
```

---

### `getRealTime()`

- Used to get the real time (in milliseconds)
- Returns a numeric

```
echo('Time in milliseconds: ' @ getRealTime() );
```

---

### `setNetPort(port)`

- Used to set the network port
- Returns a numeric (0 = FAILED, 1 = SUCCEED)

```
function portInit(%port)
{
    %failCount = 0;
    while(%failCount < 10 && !setNetPort(%port)) {
        echo("Port init failed on port " @ %port @ " trying next port.");
        %port++; %failCount++;
    }
}
```

---

### `lockMouse(isLocked)`

- Used to toggle the mouse state
- No return type

```
function cursorOff()
{
    if ( $cursorControlled )
        lockMouse(true);
    Canvas.cursorOff();
}
```

---

### `rebuildModPaths()`

- Used to rebuild the default MOD Paths (currently set to "common")
- No return type

```
rebuildModPaths();
```

---

### `setModPaths(path)`

- Used to set mod path which dictates which directories will be visible to the scripts and the resource engine
- No return type

```
// Set the mod path which dictates which directories will be visible
// to the scripts and the resource engine.
$modPath = pushback($userMods, $baseMods, ";");
setModPaths($modPath);
```

---

### `getModPaths()`

- Used to return the current mod path
- Returns a string

```
$modPath = getModPaths();
```

---

### `createCanvas(WindowTitle)`

- Used to create a canvas
- Returns a bool (0 = FAIL, 1 = SUCCEED)

```
if (!createCanvas(%windowName)) {
    quit();
    return;
}
```

---

### `saveJournal(jname)`

- Used to save a journal to file specified by jname
- No return type

```
case "-jSave":
    $argUsed[$i]++;
    if ($hasNextArg)
    {
        echo("Saving event log to journal: " @ $nextArg);
        saveJournal($nextArg);
        $argUsed[$i+1]++;
        $i++;
    }
    else
        error("Error: Missing Command Line argument. Usage: -jSave <journal_name>");
```

---

### `playJournal(jname, [break])`

- Used to play back saved journal specified by jname
- No return type

```
case "-jPlay":
    $argUsed[$i]++;
    if ($hasNextArg)
    {
        playJournal($nextArg,false);
        $argUsed[$i+1]++;
        $i++;
    }
    else
        error("Error: Missing Command Line argument. Usage: -jPlay <journal_name>");
```

---

### `addTaggedString(string)`

- Used to "tag" a string and add it to the NetStringTable
- Returns a string

```
// Tag the name with the "smurf" color:
%client.nameBase = %name;
%client.name = addTaggedString("\cp\c8" @ %name @ "\co");
```

---

### `removeTaggedString(tag)`

- Used to remove a "tag" string from NetStringTable
- No return type

```
removeTaggedString(%client.name);
```

---

### `getTaggedString(tag)`

- Used to get the string associated to the "tag"
- Returns a string

```
%name = getTaggedString( %client.name );
```

---

### `buildTaggedString(fmtTag, <arg1, ...arg9>)`

- Used to build a "tag" string with specified fmtTag
- Returns a string

```
%MyTagedString = builtTaggedString(%client.name, %string);
```

---

### `commandToServer(func, <arg1,...argn>)`

- Used to issue command specified by func with args on the server
- No return type

```
function SADSetPassword(%password)
{
    commandToServer('SADSetPassword', %password);
}
```

---

### `commandToClient(client, func, <arg1,...argn>)`

- Used to issue func on client with args
- No return type

```
function chatMessageClient( %client, %sender, %voiceTag, %voicePitch, %msgString, %a1, ... %a10 )
{
    //see if the client has muted the sender
    if ( !%client.muted[%sender] )
        commandToClient( %client, 'ChatMessage', %sender, %voiceTag, %voicePitch, %msgString, ... );
}
```

---

### `allowConnections(bool)`

- Used to enable/disable connections to the game server
- No return type

```
// Make sure the network port is set to the correct pref.
portInit($Pref::Server::Port);
allowConnections(true);
```

---

### `connect(addr)`

- Used to connect to specified address
- No return type

```
connect(ip:192.168.0.1:4123);
```

---

### `localConnect()`

- Used to create a local connection to a server
- No return type

```
function SM_StartMission()
{
    %id = SM_missionList.getSelectedId();
    %mission = getField(SM_missionList.getRowTextById(%id), 1);
    if ($pref::HostMultiPlayer)
        %serverType = "MultiPlayer";
    else
        %serverType = "SinglePlayer";
    createServer(%serverType, %mission);
    localConnect($pref::Player::Name);
}
```

---

### `startRecord(filename)`

- Used to record a demo
- No return type

```
startRecord(MyNiftyDemo);
```

---

### `stopRecord()`

- Used to stop recording a previously started demo
- No return type

```
stopRecord();
```

---

### `playDemo(filename)`

- Used to play back a recorded demo
- No return type

```
playDemo(MyNiftyDemo);
```

---

### `isDemoRecording()`

- Used to determine if a demo is currently being recorded
- Returns a numeric (0 = FALSE, 1 = TRUE)

```
if( isDemoRecording())
    echo('Can only record one demo at a time');
```

---

### `msg(id, msg)`

- Used to send a message (event?) to specified object ID
- No return type

```
msg(%someObject, somemessage);
```

---

### `queryMasterServer(port, flags, gametype, missiontype, minplayers, maxplayers, maxbots, regionmask, maxping, maxcpu, filterflags)`

- Used to query a master server looking for specified information
- No return type

```
function JoinServerGui::query(%this)
{
    queryMasterServer(
        28000,      // lanPort for local queries
        0,          // Query flags
        $Client::GameTypeQuery,       // gameTypes
        $Client::MissionTypeQuery,    // missionType
        0,          // minPlayers
        100,        // maxPlayers
        0,          // maxBots
        2,          // regionMask
        0,          // maxPing
        100,        // minCPU
        0           // filterFlags
    );
}
```

---

### `cancelServerQuery()`

- Used to cancel the current query; if there is anything left on the ping list, it's dropped
- No return type

```
function JoinServerGui::cancel(%this)
{
    cancelServerQuery();
}
```

---

### `stopServerQuery()`

- Used to cancel the current query; anything left on the ping list is moved to the finished list as "done"
- No return type

```
function JoinServerGui::stop(%this)
{
    stopServerQuery();
}
```

---

### `startHeartbeat()`

- Used to update server to Master Server
- No return type

```
if ($pref::Net::DisplayOnMaster !$= "Never" )
    schedule(0,0,startHeartbeat);
```

---

### `stopHeartbeat()`

- Used to stop update to Master Server
- No return type

```
function destroyServer()
{
    $Server::ServerType = "";
    $missionRunning = false;
    allowConnections(false);
    stopHeartbeat();
    ...
}
```

---

### `getServerCount()`

- Used to return the number of servers from the Master Server
- Returns numeric

```
function JoinServerGui::update(%this)
{
    JS_queryStatus.setVisible(false);
    JS_serverList.clear();
    %sc = getServerCount();
    ...
}
```

---

### `setServerInfo(index)`

- Used to update the Master Server with our server information
- Returns numeric (0 = FAILED, 1 = SUCCEED)

```
function JoinServerGui::join(%this)
{
    cancelServerQuery();
    %id = JS_serverList.getSelectedId();
    %index = getField(JS_serverList.getRowTextById(%id),6);
    if (setServerInfo(%index)) {
        connect($ServerInfo::Address,$Client::Password,$pref::Player::Name);
    }
}
```

---

### `setShadowDetailLevel(0..1)`

- Used to set the level of detail for shadows
- No return type

```
// Copy saved script prefs into C++ code.
setShadowDetailLevel( $pref::shadows );
setDefaultFov( $pref::Player::defaultFov );
setZoomSpeed( $pref::Player::zoomSpeed );
```

---

### `showShapeLoad(shapeName, faceCamera)`

- Used with the "show" mod to load and test DTS files
- No return type

```
command = "getLoadFilename(\"*.dts\", showShapeLoad);";
```

---

### `showSequenceLoad( sequenceFile [, sequenceName])`

- Used to load a sequence from sequence file for a running "show"
- No return type

```
command = "getLoadFilename(\"*.dsq\", showSequenceLoad);";
```

---

### `showTurnLeft(amt)`

- Used to rotate dts associated with running "show" to the left
- No return type

```
showMoveMap.bind(keyboard, z, showTurnLeft);
```

---

### `showTurnRight(amt)`

- Used to rotate the dts associated with the running "show" to the right
- No return type

```
showMoveMap.bind(keyboard, x, showTurnRight);
```

---

### `showUpdateThreadControl()`

- No return type

```
showUpdateThreadControl();
```

---

### `showSelectSequence()`

- No return type

```
showSelectSequence();
```

---

### `showPlay([threadNum])`

- No return type

```
command = "showPlay(threadList.getValue());";
```

---

### `showStop([threadNum])`

- No return type

```
command = "showStop(threadList.getValue());";
```

---

### `showSetScale(threadNum, Scale)`

- No return type

```
altCommand = "showSetScale(threadList.getValue(),showScale.getValue()); Canvas.popDialog(TSShowEditScale);";
```

---

### `showSetPos(threadNum, pos)`

- No return type

```
showSetPos(threadList.getValue(),showScale.getValue());
```

---

### `showNewThread()`

- No return type

```
command = "showNewThread();";
```

---

### `showDeleteThread(threadNum)`

- Used to delete thread specified by threadNum
- No return type

```
command = "showDeleteThread(threadList.getValue());";
```

---

### `showToggleRoot()`

- No return type

```
command = "showToggleRoot();";
```

---

### `showToggleStick()`

- No return type

```
command = "showToggleStick();";
```

---

### `showSetCamera(bool)`

- Used to put camera in a free fly or orbital mode (FALSE = free fly, TRUE = orbital)
- No return type

```
command = "showSetCamera(true); showSetKeyboard(false);";
```

---

### `showSetKeyboard(bool)`

- Used to enable keyboard control of shape (FALSE = no control, TRUE = control)
- No return type

```
command = "showSetCamera(true); showSetKeyboard(false);";
```

---

### `showSetLightDirection()`

- Used to set the light direction based on camera position
- No return type

```
new GuiButtonCtrl ()
{
    profile  = "GuiButtonProfile";
    position = "40 330";
    extent   = "60 20";
    text = "Set Direction";
    command = "showSetLightDirection();";
};
```

---

### `showSetDetailSlider()`

- Used to set the level of detail based on the slider or auto detail
- No return type

```
function showToggleDetail()
{
    if ($showAutoDetail)
    {
        showDetailText.setValue("Slider Sets Detail Level");
        showSetDetailSlider();
        $showAutoDetail = false;
    }
    else
    {
        showDetailText.setValue("Auto Detail Using Distance");
        $showAutoDetail = true;
    }
}
```

---

### `StripMLControlChars(string)`

- Used to strip ML control characters from string
- Returns a string

```
function PlayerListGui::update(%this,%clientId,%name,%isSuperAdmin,%isAdmin,%isAI,%score)
{
    %tag = %isSuperAdmin? "[Super]": (%isAdmin? "[Admin]": (%isAI? "[Bot]": ""));
    %text = StripMLControlChars(%name) SPC %tag TAB %score;
    ...
}
```

---

### `setInteriorRenderMode(modeNum)`

- Used to set the detail render level for interiors
- No return type

```
setInteriorRenderMode(7);
```

---

### `setInteriorFocusedDebug()`

- Used to enable Debug mode for interior focused objects. Passing a value to this function enables debugging; no value passed disables debugging
- No return type

```
setInteriorFocusedDebug();
```

---

### `isPointInside(point)`

- Used to determine if point is "inside" another object
- Returns numeric (0 = FALSE, 1 = TRUE)

```
isPointInside("143 34 567");
```

---

### `VectorAdd(vect1, vect2)`

- Used to add two vectors together
- Returns a string

```
%muzzleVelocity = VectorAdd(
    VectorScale(%muzzleVector, %projectile.muzzleVelocity),
    VectorScale(%objectVelocity, %projectile.velInheritFactor));
```

---

### `VectorSub(vect1, vect2)`

- Used to subtract vect2 from vect1
- Returns a string

```
%impulseVec = VectorSub(%targetObject.getWorldBoxCenter(), %position);
```

---

### `VectorScale(vect, scalar)`

- Used to scale the vector by scalar
- Returns a string

```
%impulseVec = VectorScale(%impulseVec, %impulse * %distScale);
```

---

### `VectorNormalize(vec)`

- Used to "Normalize" the vec
- Returns a string

```
%impulseVec = VectorNormalize(%impulseVec);
```

---

### `VectorDot(vec1, vec2)`

- Used to return the DotProduct of vect1 and vec2
- Returns a string

```
%dot = vectorDot("0 0 1",%eye);
```

---

### `VectorCross(vec1, vec2)`

- Used to get the CrossProduct of vec1 and vec2
- Returns a string

```
%vecCross = vectorCross('x y z','x y z');
```

---

### `VectorDist(vect1, vect2)`

- Used to get the distance between vect1 and vect2
- Returns a string

```
%disatance = vectorDist(vector1,vector2);
```

---

### `VectorLen(vec)`

- Used to get the length of the vector
- Returns a string

```
%length = vectorLen(vector);
```

---

### `VectorOrthoBasis(AngAxisF)`

- Used to get the OrthoNormal for AngAxisF
- Returns a string

```
%ortho = vectorOrthoBasis('x y z angle');
```

---

### `MatrixCreate(Pos, Rot)`

- Used to create a Matrix from supplied values
- Returns a string

```
%mat = matrixCreate('x y z', 'x y z angle');
```

---

### `MatrixMultiply(Left, Right)`

- Used to multiply two matrices
- Returns a string

```
%newMatrix = matrixMultiply(matrix1,matrix2);
```

---

### `MatrixMulVector(transform, vector)`

- Used to multiply a matrix by a vector
- Returns a string

```
%daMatrix = matrixMulVector(matrix,vector);
```

---

### `MatrixMulPoint(transform, point)`

- Used to multiply a matrix by a point
- Returns a string

```
%daMatrix = matrixMulPoint(matrix,point);
```

---

### `getBoxCenter(Box)`

- Used to get the center of a box
- Returns a string

```
%pos = getBoxCenter(%this.getWorldBox());
```

---

### `setRandomSeed([seed])`

- Used to set the required "seed" for the MOD
- No return type

```
function initCommon()
{
    // All mods need the random seed set
    setRandomSeed();
    exec("./client/canvas.cs");
    exec("./client/audio.cs");
}
```

---

### `getRandomSeed()`

- Used to get the "seed" for the MOD
- Returns a numeric

```
%seed = getRandomSeed();
```

---

### `getRandom([[max]] | [min, max]])`

- Used to get a random number
- Returns a numeric

```
%random = getRandom(34,176);
```

---

### `MatrixCreateFromEuler("x y z")`

- Used to create a matrix from given arguments
- Returns a string

```
%daMatrix = MatrixCreateFromEuler('x y z');
```

---

### `mSolveQuadratic(a, b, c)`

- Used to solve for a Quadratic
- Returns a string

```
%quad = mSolveQuadratic(a,b,c);
```

---

### `mSolveCubic(a, b, c, d)`

- Used to solve for a Cube
- Returns a string

```
%cube = mSolveCubic(a,b,c,d);
```

---

### `mSolveQuartic(a, b, c, d, e)`

- Used to solve for a Quartic
- Returns a string

```
%quartic = mSolveQuartic(a,b,c,d,e);
```

---

### `mFloor(float)`

- Used to return the largest integral value not greater than "float"
- Returns a numeric

```
%pageLines = mFloor(%chatScrollHeight / %textHeight);
if (%pageLines <= 0)
    %pageLines = 1;
```

---

### `mCeil(float)`

- Used to return the smallest integral value not less than "float"
- Returns a numeric

```
%min = mCeil(%chatScrollHeight / %textHeight);
```

---

### `mFloatLength(float, numDecimals)`

- Used to return float with a "numDecimals" padding
- Returns a numeric

```
%newFloat = mFloatLength((7/3),5);
```

---

### `mAbs(float)`

- Used to return absolute value of float
- Returns a string

```
%abs = mAbs(76.3);
```

---

### `mSqrt(float)`

- Used to return the square root (sqrt) of float
- Returns a numeric

```
%sqrt = mSqrt(69);
```

---

### `mPow(floatA, floatB)`

- Used to get the value of floatA raised to the power of floatB
- Returns a numeric

```
%pow = mPow(2,4);
```

---

### `mLog(float)`

- Used to return the natural logarithm of
- Returns a numeric

```
%log = mLog(7654.98);
```

---

### `mSin(float)`

- Used to return the "sine" of float measured in radians
- Returns a numeric

```
%sin = mSin(65);
```

---

### `mCos(float)`

- Used to return the "cosine" of float measured in radians
- Returns a numeric

```
%cos = mCos(69);
```

---

### `mTan(float)`

- Used to return the "tangent" of float
- Returns a numeric

```
%tan = mTan(87.6);
```

---

### `mAsin(float)`

- Used to return the "arc sine" of float
- Returns a numeric

```
%asin = mAsin(-3,8);
```

---

### `mAcos(float)`

- Used to return the "arc cosine" of float
- Returns a numeric

```
%acos = mAcos(-8,3);
```

---

### `mAtan(float)`

- Used to return the "arc tangent" of float
- Returns a numeric

```
%atan = mAtan(-10,3);
```

---

### `mRadToDeg(float)`

- Used to convert radians to degrees
- Returns a numeric

```
%r2d = mRadToDeg(5);
```

---

### `mDegToRad(float)`

- Used to convert degrees to radians
- Returns a numeric

```
%c2r = mDegToRad(171);
```

---

### `ValidateMemory()`

- Used to validate memory space for the game
- No return type

```
ValidateMemory();
```

---

### `FreeMemoryDump()`

- Used to print out some useful statistics regarding free memory
- No return type

```
FreeMemoryDump();
```

---

### `dumpMemSnapshot(filename)`

- Used to dump memory statistics to file
- No return type

```
dumpMemSnapshot(memdump.txt);
```

---

### `redbookOpen(<device>)`

- Used to open a redbook device
- Returns a numeric (0 = FAILED, other = SUCCESS)

```
redbookOpen();
```

---

### `redbookClose()`

- Used to close a redbook device
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
redbookClose();
```

---

### `redbookPlay(track)`

- Used to play a track on a redbook device
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
redbookPlay(2);
```

---

### `redbookStop()`

- Used to stop playing
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
redbookStop();
```

---

### `redbookGetTrackCount()`

- Used to return the number of redbook tracks
- Returns a numeric

```
%tracks = redbookGetTrackCount();
```

---

### `redbookGetVolume()`

- Used to get the current volume level of a redbook device
- Returns a numeric

```
%volume = redbookGetVolume();
```

---

### `redbookSetVolume(volume)`

- Used to set the volume level of a redbook device
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
redbookSetVolume(%volume);
```

---

### `redbookGetDeviceCount()`

- Used to return the number of redbook devices
- Returns a numeric

```
%count = redbookGetDeviceCount();
```

---

### `redbookGetDeviceName(idx)`

- Used to get the device name of specified redbook device index
- Returns a string

```
echo('Red Book (whats that?) device name :' @ redbookGetDeviceName(1) );
```

---

### `redbookGetLastError()`

- Used to get the last known error from a redbook device
- Returns a string

```
echo('RedBook (whats that?) last known error :' @ redbookGetLastError() );
```

---

### `videoSetGammaCorrection(gamma)`

- Used to set the Gamma correction
- No return type

```
videoSetGammaCorrection($pref::OpenGL::gammaCorrection);
```

---

### `setDisplayDevice(deviceName {, width {, height {, bpp {, fullScreen}}}} )`

- Used to setup the display device with specified parameters
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
setDisplayDevice( %newDriver, firstWord( %newRes ), getWord( %newRes, 1 ), %newBpp, %newFullScreen );
```

---

### `setScreenMode(width, height, bpp, fullScreen)`

- Used to setup the screen with specified parameters
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
setScreenMode( firstWord( %newRes ), getWord( %newRes, 1 ), %newBpp, %newFullScreen );
```

---

### `toggleFullScreen()`

- Used to switch between fullscreen mode and windowed mode
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
toggleFullScreen();
```

---

### `isFullScreen()`

- Used to determine if screenmode is set to fullscreen or not
- Returns a numeric (0 = NO, 1 = YES)

```
if(isFullScreen())
    echo('We be full screened!');
```

---

### `switchBitDepth()`

- Used to switch between 16 and 32 bpp (for fullscreen mode only)
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
if(!switchBitDepth())
    echo('Unable to switch screen bpp');
```

---

### `prevResolution()`

- Used to decrease screen resolution to the next lowest resolution
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
if(!prevResolution ())
    echo('Unable to switch screen resolution');
```

---

### `nextResolution()`

- Used to increase screen resolution to the next highest resolution
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
if(!nextResolution ())
    echo('Unable to switch screen resolution');
```

---

### `getResolution()`

- Used to get the current screen resolution
- Returns a string

```
%res = getResolution();
```

---

### `setResolution(width, height, bpp)`

- Used to set the screen resolution to specified parameters
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
if(!setResolution(640,480,32);)
    echo('Unable to set resolution to 640x480x32');
```

---

### `setRes(width, height, bpp)`

See `setResolution`

---

### `getDisplayDeviceList()`

- Used to get the device name for each display device
- Returns a string

```
echo('Display Device(s) :' @ getDisplayDeviceList() );
```

---

### `getResolutionList(devicename)`

- Used to get all possible resolution combinations for specified device
- Returns a string

```
echo('Possible resolutions :' @ getResolutionList(%device) );
```

---

### `getVideoDriverInfo()`

- Used to get device driver info
- Returns a string

```
echo('Device driver info :' @ getVideroDriverInfo() );
```

---

### `isDeviceFullScreenOnly(devicename)`

- Used to determine if device is capable of fullscreen only
- Returns a numeric (0 = NO, 1 = YES)

```
if(isDeviceFullScreenOnly(%devicename) )
    echo('You are limited to fullscreen mode only!');
```

---

### `setVerticalSync(<bool>)`

- Used to enable/disable the use of Vertical Sync
- Returns a numeric (0 = FALSE, 1 = TRUE)

```
if(!setVerticalSync(1) )
    echo('Unable to enable Vertical Sync for your video device');
```

---

### `profilerMarkerEnable(markerName, true/false)`

> *Note: Profiler commands are only available when the engine code is compiled with ENABLE_PROFILER set.*

- Used to enable/disable profiling for markerName
- No return type

```
profilerMarkerEnable(mark,true);
```

---

### `profilerEnable(true/false)`

- Used to enable/disable profiling
- No return type

```
profilerEnable(false);
```

---

### `profilerDump()`

- Used to dump NetStringTable statistics to the console
- No return type

```
profilerDump();
```

---

### `profilerDumpToFile(filename)`

- Used to dump NetStringTable statistics to file specified by fileName
- No return type

```
profileDumpToFile(dump.txt);
```

---

### `enableWinConsole(bool)`

- Used to display the console window
- No return type

```
case "-console":
    enableWinConsole(true);
    $argUsed[$i]++;
```

---

### `isJoystickDetected()`

- Used to determine if a joystick is present
- No return type

```
if(!isJoystickDetected())
    echo('No Joystick was detected');
```

---

### `getJoystickAxes( instance )`

- Used to get the current Axes of the joystick pointed to by instance
- Returns a string

```
%joyAxes = getJoystickAxes( 3 );
```

---

### `enableMouse()`

- Used to enable DirectInput polling of the mouse device
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
enableMouse();
```

---

### `disableMouse()`

- Used to disable DirectInput polling of the mouse device
- No return type

```
disableMouse();
```

---

### `permDisableMouse()`

> *Note: Currently this function is only used in the Mac port of the engine.*

- Used to permanently disable DirectInput polling of the mouse device
- No return type

```
permDisableMouse();
```

---

### `echoInputState()`

- Used to display (to the console) the current state of DirectInput, mouse, keyboard and joystick
- No return type

```
echoInputState();
```

---

### `toggleInputState()`

> *Note: Currently this function is only used in the Mac port of the engine.*

- Used to toggle DirectInput state between enable and disable; will also print the new Input state (same as echoInputState) to the console
- No return type

```
toggleInputState();
```

---

### `MathInit( detect | C | FPU | MMX | 3DNOW | SSE | ...)`

- Used to enable the use of certain Math extensions based on the user's CPU type
- No return type

```
MathInit(detect);
```

---

### `AddCardProfile( vendor, renderer, safeMode, lockArray, subImage, fogTexture, noEnvColor, clipHigh, deleteContext, texCompress, interiorLock, skipFirstFog, only16, noArraysAlpha, proFile)`

- Used to store certain aspects of a card for later usage
- No return type

---

### `addOSCardProfile(vendor, renderer, allowOpenGL, allowD3D, preferOpenGL)`

- Used to store certain aspects of a card for later usage
- No return type

---

### `getDesktopResolution()`

- Used to get the current desktop resolution
- Returns a string

```
%res = getDesktopResolution();
```

---

### `activateKeyboard()`

- Used to enable DirectInput polling of the keyboard
- Returns a numeric (0 = FAILED, 1 = SUCCESS)

```
if(activateKeyboard())
    echo('Keyboard has been activated');
```

---

### `deactivateKeyboard()`

- Used to disable DirectInput polling of the keyboard
- No return type

```
deactivateKeyboard();
```

---

### `GLEnableLogging(bool)`

> *Note: Only accessible in the Win32 port of TGE.*

- Used to enable/disable OpenGL logging to gl_log.txt
- No return type

```
GLEnableLoggin(true);
```

---

### `GLEnableOutline(bool)`

- Used to draw outlines around OpenGL elements (wire mesh?)
- No return type

```
GLEnableOutline(true);
```

---

### `GLEnableMetrics(bool)`

- Used to draw Metrics around each OpenGL entity
- No return type

```
GLEnableMetrics(1);
```

---

### `inputLog(string)`

- Used to enable/disable logging of DirectInput events to log file specified by string
- No return type

```
inputLog(DI.log);
```

---

### `launchDedicatedServer(missionType, map, botCount)`

- Used to launch a dedicated game server with specified arguments
- No return type

```
launchDedicatedServer(mymission,damap,0);
```

---

### `isKoreanBuild()`

- Silly Korean registry key checker
- Returns a string

```
if(isKoreanBuild())
    echo('Silly Korean Build!');
```

---

### `debug_testx86unixmutex()`

- Used to see if the Unix system TGE is running on can create a mutex
- No return type

```
debug_testx86unixmutex();
```

---

### `debug_debugbreak()`

- Used in Windows to cause the program to display a dialog box as if it had crashed. Under Unix we force a segfault.
- No return type

```
debug_debugbreak();
```

---

### `resetLighting()`

- Used to reset the current lighting (looks to be OGL only)
- No return type

```
resetLighting();
```

---

### `getMaxFrameAllocation()`

- Used to return the Max Frame Allocation unit
- Returns a numeric

```
%maxFrameAlloc = getMaxFrameAllocation();
```

---

### `dumpNetStringTable()`

- Used to dump NetStringTable statistics to the console
- No return type

```
dumpNetStringTable();
```

---

### `InitContainerRadiusSearch("x y z", radius, mask)`

- Used to search for objects of type "mask" within a radius around the specified coordinates given
- No return type

```
InitContainerRadiusSearch ("0 450 76", %somerad, %somemask)
```

---

### `ContainerSearchNext()`

- Used to return the next object in a container search
- Returns a numeric

```
while(ContainerSearchNext() != -1 )
{
    ...
}
```

---

### `ContainerSearchCurrDist()`

- Used to return the Container Search Distance
- Returns a numeric

```
%dist = ContainerSearchCurrDist();
```

---

### `ContainerSearchCurrRadiusDist()`

- Used to return the Container Search Radius Distance
- Returns a numeric

```
%rad = ContainerSearchCurrRadiusDist();
```

---

### `ContainerRayCast("x y z", "x y z", mask, [exempt object])`

- Used to find objects of type "mask" between the two coordinates supplied
- Returns a string

```
// Search for objects within the range that fit the masks above
// If we are in first person mode, we make sure player is not selectable
%player = %client.player;
if ($firstPerson)
{
    %scanTarg = ContainerRayCast (%cameraPoint, %rangeEnd, %searchMasks, %player);
}
else // 3rd person - player is selectable in this case
{
    %scanTarg = ContainerRayCast (%cameraPoint, %rangeEnd, %searchMasks);
}
```

---

### `ContainerBoxEmpty(Mask, Loc, Rad [, yRad, zRad])`

- Used to see if any objects of given types are present in box of given extent
- Returns a numeric (0 = No objects found, 1 = Objects found)

---

### `pathOnMissionLoadDone()`

- Used to construct MOD paths
- No return type

```
pathOnMissionLoadDone();
```

---

### `makeTestTerrain(filename)`

- Used to make a test terrain file
- No return type

---

### `getTerrainHeight(Point2I pos)`

- Used to get the terrain height at the specified position
- Returns a numeric

```
%TerHeight = getTerrainHeight(%pos);
```
