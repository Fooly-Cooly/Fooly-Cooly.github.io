# Blockland Global Console Function Reference

Compiled from a live `dumpConsoleFunctions()` engine dump. Functions are organized by category. Descriptions are provided where purpose and usage can be determined with confidence; otherwise the entry is left blank for future annotation.

Native engine functions (declared with typed signatures) are distinguished from script-layer functions (`virtual Script`) where relevant. All functions are globally accessible unless noted otherwise.

---

## Table of Contents

1. [Audio — OpenAL](#audio--openal)
2. [Audio — Redbook (CD Audio)](#audio--redbook-cd-audio)
3. [Bricks](#bricks)
4. [Bot / AI](#bot--ai)
5. [Chat and Messaging](#chat-and-messaging)
6. [Client Commands (`clientCmd*`)](#client-commands-clientcmd)
7. [Color Utilities](#color-utilities)
8. [Console and Debugging](#console-and-debugging)
9. [Containers and Spatial Queries](#containers-and-spatial-queries)
10. [Demo Recording](#demo-recording)
11. [Environment and Lighting](#environment-and-lighting)
12. [Events (Wrench Event System)](#events-wrench-event-system)
13. [File System](#file-system)
14. [Game Flow and Server Lifecycle](#game-flow-and-server-lifecycle)
15. [HUD and Screen Printing](#hud-and-screen-printing)
16. [Input and Controls](#input-and-controls)
17. [JSON](#json)
18. [Math — General](#math--general)
19. [Math — Vector](#math--vector)
20. [Math — Matrix](#math--matrix)
21. [Math — Random](#math--random)
22. [Minigames](#minigames)
23. [Mission Loading](#mission-loading)
24. [Mod / Add-On Management](#mod--add-on-management)
25. [Music](#music)
26. [Network and Connections](#network-and-connections)
27. [Packages](#packages)
28. [Platform and System Info](#platform-and-system-info)
29. [Print Textures](#print-textures)
30. [Quota System](#quota-system)
31. [Save / Load Bricks](#save--load-bricks)
32. [Scheduling and Sim](#scheduling-and-sim)
33. [Server Commands (`serverCmd*`)](#server-commands-servercmd)
34. [Sports and Game Modes](#sports-and-game-modes)
35. [Steam Integration](#steam-integration)
36. [String Functions](#string-functions)
37. [Tagged Strings](#tagged-strings)
38. [TCP / HTTP Client](#tcp--http-client)
39. [Treasure Chests](#treasure-chests)
40. [Trust System](#trust-system)
41. [Video / Display](#video--display)
42. [Miscellaneous / Utility](#miscellaneous--utility)
43. [Avatar / Character Customization](#avatar--character-customization)
44. [Admin Tools](#admin-tools)
45. [Uncategorized / Internal](#uncategorized--internal)

---

## Audio — OpenAL

Functions dealing with the OpenAL audio layer. See www.OpenAL.org for general reference.

| Function | Description |
|---|---|
| `OpenALInitDriver()` | Initializes the OpenAL driver. Must be called before any sounds will work. Returns bool. |
| `OpenALShutdownDriver()` | Shuts down the OpenAL driver. |
| `OpenALRegisterExtensions()` | Registers OpenAL extensions. No body; call is a no-op in most builds. |
| `OpenALInit()` | Script-layer wrapper that handles full audio initialization sequence including channel volumes. |
| `OpenALShutdown()` | Script-layer wrapper for `OpenALShutdownDriver()`. |
| `restartAudio()` | Restarts the audio system. |
| `alGetString(string item)` | Returns a string for the given ALenum (e.g. `"AL_VENDOR"`, `"AL_VERSION"`). |
| `alxGetWaveLen(string filename)` | Returns the length of a WAV file in milliseconds. |
| `alxCreateSource(profile)` | Creates and validates an audio source. Also accepts `(description, filename)` or `(description, filename, x, y, z)`. Returns a handle (numeric). |
| `alxSourcef(handle, ALenum, value)` | Sets a float property on an audio source. |
| `alxSource3f(handle, ALenum, x, y, z)` | Sets a 3-float (positional) property on an audio source. |
| `alxSourcei(handle, ALenum, value)` | Sets an integer property on an audio source. |
| `alxGetSourcef(handle, ALenum)` | Gets a float property from an audio source. |
| `alxGetSource3f(handle, ALenum)` | Gets a 3-float property from an audio source. |
| `alxGetSourcei(handle, ALenum)` | Gets an integer property from an audio source. |
| `alxPlay(handle)` | Begins audio playback on the given handle, profile, or positional profile. Returns the handle. |
| `alxStop(int handle)` | Stops audio playback on the given handle. |
| `alxStopAll()` | Stops all active audio playback. |
| `alxIsPlaying(handle)` | Returns true if the given handle is currently playing. |
| `alxListenerf()` | Sets a float ALenum property on the listener (e.g. `AL_GAIN_LINEAR`). |
| `alListener3f(ALenum, "x y z")` | Sets a 3-float ALenum on the listener. |
| `alxGetListenerf(ALenum)` | Gets a float ALenum value from the listener. |
| `alGetListener3f(ALenum)` | Gets a 3-float ALenum value from the listener. |
| `alGetListeneri(ALenum)` | Gets an integer ALenum value from the listener. |
| `alxGetChannelVolume(int channel_id)` | Returns the current volume of the specified audio channel (0.0–1.0). |
| `alxSetChannelVolume(int channel_id, float volume)` | Sets the volume of the specified audio channel (0.0–1.0). Returns bool. |
| `OptAudioUpdate()` | Script helper that refreshes the audio options display (vendor, version, renderer). |
| `OptAudioUpdateMasterVolume()` | Updates the master audio volume from preferences and plays a test sound if needed. |
| `OptAudioUpdateChannelVolume()` | Updates the volume of a specific audio channel from preferences. |
| `ServerPlay2D(AudioProfile)` | Plays a 2D (non-positional) audio profile on the server for all clients. |
| `ServerPlay3D(AudioProfile, transform)` | Plays a 3D positional audio profile on the server for all clients. |

---

## Audio — Redbook (CD Audio)

| Function | Description |
|---|---|
| `redbookOpen(string device)` | Opens a Redbook (CD audio) device. Returns bool (false = failed). |
| `redbookClose()` | Closes the current Redbook device. Returns bool. |
| `redbookPlay(int track)` | Plays the specified track. Returns bool. |
| `redbookStop()` | Stops playback. Returns bool. |
| `redbookGetTrackCount()` | Returns the number of tracks on the current device. |
| `redbookGetVolume()` | Returns the current Redbook volume (0.0–1.0). |
| `redbookSetVolume(float volume)` | Sets the Redbook playback volume. Returns bool. |
| `redbookGetDeviceCount()` | Returns the number of available Redbook devices. |
| `redbookGetDeviceName(int index)` | Returns the name of the specified Redbook device. |
| `redbookGetLastError()` | Returns a string describing the last Redbook error. |

---

## Bricks

Functions related to the brick engine — placing, managing, counting, and destroying bricks.

| Function | Description |
|---|---|
| `getBrickCount()` | Returns the total number of bricks currently in the world. |
| `getDemoBrickCount()` | Returns the number of demo bricks in the world. |
| `getBrickLimit()` | Returns the server's configured brick limit. |
| `loadBrickSounds()` | Loads the brick sound effects. |
| `updateTempBrickSettings()` | Updates temporary brick placement preview settings. |
| `startNewBrickExplosion(Point3F center, F32 force, F32 radius, S32 explosionTimeMS)` | Begins building a brick explosion event at the given center. |
| `addBrickToExplosion(S32 brickID)` | Adds a brick to the currently building explosion event. |
| `sendBrickExplosion()` | Sends the built brick explosion to clients. |
| `transmitBrickExplosion(Point3F center, F32 force, F32 radius, S32 explosionTimeMS, brickIds)` | Transmits a fully specified brick explosion to clients. |
| `getContainerCount()` | Returns the number of objects in the scene container. |
| `lockToGrid()` | |
| `generatePrintCountTable()` | |
| `getAngleIDFromPlayer()` | |
| `radiusDamage()` | Applies radius-based damage around a point to nearby objects. |
| `calcExplosionCoverage(Point3F source, SceneObject originator, bitset coverageMask)` | Calculates how exposed a target is to an explosion, accounting for blocking geometry. Returns 0 (no exposure) to 1 (full exposure). |
| `setColorTable(int colorID, string color)` | Sets a color slot in the global color table. |
| `getColorIDTable(int index)` | Returns the color string for the given color table index. |
| `setOctNodeParams(...)` | Sets the octree node parameters. **Adjusting these will break the game.** |
| `octTreeReport()` | |
| `cleanUpBrickEmptyGroups()` | Removes brick groups that contain no bricks. |
| `removeEmptyBrickGroups()` | Removes all empty brick groups from the scene. |
| `getBrickGroupFromObject()` | Returns the brick group associated with a given object. |
| `getBL_IDFromObject()` | Returns the BL_ID of the player who owns the given object/brick group. |
| `verifyBrickUINames()` | Verifies that all brick UI names are valid and consistent. |

---

## Bot / AI

Functions for spawning, managing, and controlling bots (AI players).

| Function | Description |
|---|---|
| `aiConnect(val)` | Constructs and registers a new AI connection with no control object. Returns the new object ID. |
| `aiAddPlayer(string playerName [, string AIClassType])` | Adds a bot to the game. Returns the bot object. |
| `getRandomBotRGBColor()` | Returns a random RGB color string suitable for bot appearance. |
| `getRandomBotFace()` | Returns a random face name for a bot. |
| `getRandomBotSkinColor()` | Returns a random skin color for a bot. |
| `getRandomBotPantsColor()` | Returns a random pants color for a bot. |
| `getRandomBotOffsetColor()` | Returns a random offset/accent color for a bot. |
| `getRandomBotColor()` | Returns a random general color for a bot. |
| `getRandomBotTransColor()` | Returns a random translucent color for a bot. |
| `hCreateWanderList()` | Creates the wander behavior list for hole bots. |
| `hCreateIdleList()` | Creates the idle behavior list for hole bots. |
| `hCreateSearchList()` | Creates the search behavior list for hole bots. |
| `createHoleBotList()` | Creates the full behavior list for hole bots. |
| `createGestureList()` | Creates the gesture list for bots. |
| `hLOSCheck()` | Performs a line-of-sight check for a hole bot. |
| `hSpawnLOSCheck()` | Checks line-of-sight before spawning a hole bot. |
| `doHoleSpawnDetect()` | Detects valid spawn positions for hole bots. |
| `hBrickClientCheck()` | Checks brick ownership conditions for a hole bot. |
| `hSpamHandsLoop()` | |
| `checkHoleBotTeams()` | Verifies team assignments for hole bots. |
| `hGetBrickGroupFromBLID()` | Returns the brick group associated with a given BL_ID. |
| `hGetFourDigits()` | Returns a padded four-digit string representation of a number. |
| `hReturnNamedBrick()` | Returns a brick object matching a given name. |
| `hResetBots()` | Resets all hole bots. |
| `hGetRandomFloat()` | Returns a random float. Hole bot variant of `getRandom`. |
| `hClampVector()` | Clamps each component of a vector within a given range. |
| `hGetRandomVector()` | Returns a random 3D vector. |
| `hGetZ()` | Returns the Z component of a hole bot's position. |
| `debugHoles()` | |
| `setHoleDebug(bool)` | Enables or disables hole bot debug output. |
| `isHoleDebug()` | Returns whether hole bot debug mode is active. |
| `getRandomDongFloat()` | |
| `radiusToBrick(radius)` | Converts a world-space radius to brick units. |
| `brickToRadius(bricks)` | Converts brick units to a world-space radius. |
| `metricToBrick(metric)` | Converts metric units to brick units. |
| `brickToMetric(bricks)` | Converts brick units to metric units. |
| `hGetAnglesFromVector()` | Converts a direction vector to yaw/pitch angles. |
| `hStopStampede()` | Stops the bot stampede behavior. |
| `hDoStampede()` | Triggers the bot stampede behavior. |
| `holeSharkKill()` | |
| `delaySharkCheck()` | |
| `holeZombieInfect()` | Handles zombie infection logic for hole bots. |

---

## Chat and Messaging

| Function | Description |
|---|---|
| `chatMessageAll(sender, voiceTag, voicePitch, msgString, ...)` | Sends a chat message to all clients. |
| `chatMessageTeam(client, team, msgString, ...)` | Sends a chat message to all members of a team. |
| `chatMessageClient(client, sender, voiceTag, voicePitch, msgString, ...)` | Sends a chat message to a specific client. |
| `MessageAll(msgType, msgString, ...)` | Sends a non-chat message to all clients. |
| `messageClient(client, msgType, msgString, ...)` | Sends a message to a specific client. |
| `messageTeam(team, msgType, msgString, ...)` | Sends a message to all clients on a team. |
| `messageTeamExcept(client, team, msgType, msgString, ...)` | Sends a team message to all team members except the specified client. |
| `messageAllExcept(client, msgType, msgString, ...)` | Sends a message to all clients except the specified one. |
| `spamAlert()` | Triggers the spam detection alert for a client. |
| `chatFilter(string)` | Filters a chat string for disallowed content. |
| `censorString(string)` | Applies profanity censoring to a string. |
| `getCensor()` | Returns the current censor configuration. |
| `addMessageCallback(msgType, func)` | Registers a callback function to be called when a message of the given type is received. |
| `defaultMessageCallback()` | The default handler for incoming server messages. |
| `talk(string)` | Admin convenience function to send a chat message as the server. |
| `announce(string)` | Sends an announcement message to all clients. |
| `onChatMessage()` | Callback fired when a chat message is received on the client. |
| `onServerMessage()` | Callback fired when a server message is received on the client. |
| `newChatHud_Init()` | Initializes the chat HUD. |
| `newChatHud_AddLine(string)` | Adds a line of text to the chat HUD. |
| `newChatHud_UpdateMaxLines()` | Updates the maximum line count of the chat HUD. |
| `newChatHud_UpdateIndicatorPosition()` | Updates the scroll indicator position on the chat HUD. |
| `newChatHud_UpdateScrollDownIndicator()` | Updates the scroll-down indicator visibility. |
| `WhoTalk_Init()` | Initializes the "who is talking" voice indicator system. |
| `WhoTalk_Kill()` | Clears the "who is talking" voice indicator. |
| `WhoTalk_addID(blid)` | Adds a BL_ID to the voice indicator display. |
| `WhoTalk_removeID(blid)` | Removes a BL_ID from the voice indicator display. |
| `chatWhiteListFilter(string)` | Filters a string to only allowed chat characters. |
| `alphaOnlyWhiteListFilter(string)` | Filters a string to only alphabetic characters. |
| `numericWhiteListFilter(string)` | Filters a string to only numeric characters and `.`. |

---

## Client Commands (`clientCmd*`)

These are functions called on the client via `commandToClient`. They typically update local HUD state, open dialogs, or handle server-pushed data.

| Function | Description |
|---|---|
| `clientCmdCenterPrint(string, time, lines)` | Displays a center-screen message. |
| `clientCmdBottomPrint(string, time, lines)` | Displays a bottom-screen message. |
| `clientCmdClearCenterPrint()` | Clears the center-screen print. |
| `clientCmdclearBottomPrint()` | Clears the bottom-screen print. |
| `clientCmdGameStart()` | Called when the game starts. Triggers client-side game start logic. |
| `clientCmdGameEnd()` | Called when the game ends. Triggers client-side game end logic. |
| `clientCmdMissionStart()` | Fires when the mission starts on the client. |
| `clientCmdMissionEnd()` | Fires when the mission ends on the client. |
| `clientCmdMissionStartPhase1()` | Fires at the start of mission load phase 1. |
| `clientCmdMissionStartPhase2()` | Fires at the start of mission load phase 2. |
| `clientCmdMissionStartPhase3()` | Fires at the start of mission load phase 3. |
| `clientCmdSyncClock()` | Synchronizes the client's game clock with the server. |
| `clientCmdSetRemoteServerData()` | Sets remote server info on the client. |
| `clientCmdSetAdminLevel(level)` | Sets the client's admin level and updates their UI accordingly. |
| `clientCmdAdminFailure()` | Called when an admin login attempt fails. |
| `clientCmdSetFocalPoint()` | Sets the camera focal point on the client. |
| `clientCmdShowBricks()` | Shows bricks on the client. |
| `clientCmdUpdatePrefs()` | Pushes updated server preferences to the client. |
| `clientCmdSetScrollMode()` | Updates the client's scroll mode setting. |
| `clientCmdShowEnergyBar()` | Shows or hides the energy bar on the HUD. |
| `clientCmdSetLoadingIndicator()` | Controls the loading indicator display. |
| `clientCmdPlayGui_CreateToolHud()` | Builds the tool HUD for the play GUI. |
| `clientCmdPlayGui_LoadPaint()` | Loads the paint selection state into the play GUI. |
| `clientCmdOpenWrenchDlg()` | Opens the wrench (brick property editor) dialog. |
| `clientCmdWrench_LoadMenus()` | Loads wrench dialog menus. |
| `clientCmdWrenchLoadingDone()` | Signals that the wrench dialog has finished loading. |
| `clientCmdSetWrenchData()` | Populates the wrench dialog with brick data from the server. |
| `clientCmdOpenWrenchVehicleSpawnDlg()` | Opens the vehicle spawn wrench dialog. |
| `clientCmdOpenWrenchSoundDlg()` | Opens the sound wrench dialog. |
| `clientCmdOpenWrenchBotHack()` | Opens the bot wrench hack dialog. |
| `clientCmdwrenchBot_LoadMenus()` | Loads bot wrench menus. |
| `clientCmdwrenchBotLoadingDone()` | Signals bot wrench dialog has finished loading. |
| `clientCmdSetwrenchBotData()` | Populates the bot wrench dialog with data. |
| `clientCmdOpenwrenchBotDlg()` | Opens the bot wrench dialog. |
| `clientCmdTrustListUpload_Start()` | Begins uploading the trust list to the client. |
| `clientCmdTrustInvite()` | Prompts the client with a trust invite from another player. |
| `clientCmdTrustInviteAccepted()` | Notifies the client that their trust invite was accepted. |
| `clientCmdMiniGameInvite()` | Prompts the client with a minigame invite. |
| `clientCmdSetPlayingMiniGame()` | Updates the client's minigame play state. |
| `clientCmdSetRunningMiniGame()` | Updates the client's minigame running state. |
| `clientCmdSetBuildingDisabled()` | Enables or disables building for the client. |
| `clientCmdSetPaintingDisabled()` | Enables or disables painting for the client. |
| `clientCmdCreateMiniGameSuccess()` | Notifies the client that minigame creation succeeded. |
| `clientCmdCreateMiniGameFail()` | Notifies the client that minigame creation failed. |
| `clientCmdResetMiniGameList()` | Clears the client's minigame list. |
| `clientCmdAddMiniGameLine()` | Adds a minigame entry to the client's list. |
| `clientCmdRemoveMiniGameLine()` | Removes a minigame entry from the client's list. |
| `clientCmdMessageBoxOK(title, msg)` | Shows an OK message box on the client. |
| `clientCmdMessageBoxOKCancel(title, msg, okCmd, cancelCmd)` | Shows an OK/Cancel message box on the client. |
| `clientCmdMessageBoxYesNo(title, msg, yesCmd, noCmd)` | Shows a Yes/No message box on the client. |
| `clientCmdSetClientHatTicket()` | Sets the hat ticket data on the client. |
| `clientCmdGetAchievement()` | Handles an achievement grant from the server. |
| `clientCmdGameModeChange()` | Notifies the client of a game mode change. |
| `clientCmdLoadBricksHandshake()` | Initiates the client side of a brick load handshake. |
| `clientCmdLoadBricksConfirmHandshake()` | Confirms the handshake for brick loading. |
| `clientCmdStopBrickControls()` | Disables brick placement controls on the client. |
| `clientCmdUseBrickControls()` | Enables brick placement controls on the client. |
| `clientCmdSetActiveBrick()` | Sets the currently active brick for the client. |
| `clientCmdSetActiveTool()` | Sets the currently active tool for the client. |
| `clientCmdBSD_Open()` | Opens the Brick Selector Dialog (BSD). |
| `clientCmdBSD_LoadBricks()` | Loads brick data into the BSD. |
| `clientCmdOpenPrintSelectorDlg()` | Opens the print (decal) selector dialog. |
| `clientCmdSetLetterPrintInfo()` | Sends letter-print texture info to the client. |
| `clientCmdAddBrickManLine()` | Adds a line to the brick manager list on the client. |
| `clientCmdClearBrickMan()` | Clears the client's brick manager list. |
| `clientCmdAddUnBanLine()` | Adds an entry to the client's unban list display. |
| `clientCmdClearUnBans()` | Clears the client's unban list display. |
| `clientCmdSetVignette()` | Sets the screen vignette effect on the client. |
| `clientCmdEnvGui_SetVar()` | Updates an environment variable in the client's environment GUI. |
| `clientCmdEnvGui_ClearLists()` | Clears environment GUI list data on the client. |
| `clientCmdEnvGui_AddSky()` | Adds a skybox option to the environment GUI. |
| `clientCmdEnvGui_AddWater()` | Adds a water option to the environment GUI. |
| `clientCmdEnvGui_AddGround()` | Adds a ground option to the environment GUI. |
| `clientCmdEnvGui_AddSunFlare()` | Adds a sun flare option to the environment GUI. |
| `clientCmdEnvGui_AddDayCycle()` | Adds a day cycle option to the environment GUI. |
| `clientCmdEnvGui_ListsDone()` | Signals that environment list transmission is complete. |
| `ClientCmdAddNTName()` | Adds a named tag (NT) entry on the client. |
| `ClientCmdRemoveNTName()` | Removes a named tag entry on the client. |
| `clientCmdAddEventsDone()` | Signals event table transmission is complete on the client. |
| `clientCmdAddEvent()` | Adds an event entry to the client's event table. |
| `ClientCmdRegisterEventsDone()` | Signals event registration is complete on the client. |
| `ClientCmdRegisterOutputEvent()` | Registers an output event type on the client. |
| `ClientCmdRegisterInputEvent()` | Registers an input event type on the client. |
| `ClientCmdTransmitBrickName()` | Transmits a brick name string to the client. |
| `ClientCmdTransmitAllBrickNamesDone()` | Signals all brick names have been transmitted. |
| `ClientCmdTransmitBrickOwner()` | Transmits brick ownership info to the client. |
| `ClientCmdTransmitItemDirection()` | Transmits an item facing direction to the client. |
| `ClientCmdTransmitEmitterDirection()` | Transmits an emitter facing direction to the client. |
| `ClientCmdTransmitEvent()` | Transmits an event to the client. |
| `ClientCmdAddMiniGameColor()` | Adds a color option to the minigame color list on the client. |
| `secureClientCmd_ClientJoin()` | Secure client command: notifies of a client joining the server. |
| `secureClientCmd_ClientDrop()` | Secure client command: notifies of a client dropping from the server. |
| `secureClientCmd_ClientScoreChanged()` | Secure client command: updates a client's displayed score. |
| `secureClientCmd_ClientTrust()` | Secure client command: updates a client's trust level display. |
| `secureClientCmd_TrustDemoted()` | Secure client command: notifies the client they were demoted in trust. |
| `secureClientCmd_SetServerNameDisplay()` | Secure client command: sets the displayed server name. |
| `secureClientCmd_SetMaxPlayersDisplay()` | Secure client command: sets the displayed max player count. |

---

## Color Utilities

| Function | Description |
|---|---|
| `getColorF(string color)` | Converts a hex string or 0–255 color into 0.0–1.0 float color components. |
| `getColorI(string color)` | Converts a hex string or 0.0–1.0 color into 0–255 integer color components. |
| `rgbToHex()` | Converts an RGB color to a hex string. |
| `HSVtoRGB()` | Converts HSV color values to RGB. |
| `RGBtoHSV()` | Converts RGB color values to HSV. |
| `IColorToFColor()` | Converts integer (0–255) color components to float (0.0–1.0). |
| `getRandomColorF()` | Returns a random color with a random alpha value as a float color string. |
| `getRandomColorFOpaque()` | Returns a random fully-opaque color as a float color string. |

---

## Console and Debugging

| Function | Description |
|---|---|
| `echo(text [, ...])` | Prints text to the console. |
| `warn(text [, ...])` | Prints a warning-level message to the console. |
| `error(text [, ...])` | Prints an error-level message to the console. |
| `expandEscape(text)` | Escapes special characters in a string (e.g. `\r` → `\\r`). |
| `collapseEscape(text)` | Collapses escaped characters (e.g. `\\r` → `0xd`). |
| `setLogMode(int mode)` | Sets console logging mode. 0 = off, 1 = on, 2 = new file. |
| `setEchoFileLoads(bool)` | Toggles echoing of file loads to the console. |
| `cls()` | Clears the console screen. |
| `backtrace()` | Prints the current script call stack to the console. |
| `trace(bool)` | Enables or disables script execution tracing. |
| `dumpConsoleClasses()` | Dumps all registered console classes to the console in C++ syntax. |
| `dumpConsoleFunctions()` | Dumps all registered console functions to the console. |
| `enableWinConsole(bool)` | Shows or hides the Win32 console window. |
| `metrics()` | |
| `fpsMetricsCallback()` | Returns an FPS metrics string for the metrics HUD. |
| `timeMetricsCallback()` | Returns a time metrics string (sim time, real time) for the metrics HUD. |
| `videoMetricsCallback()` | |
| `textureMetricsCallback()` | |
| `terrainMetricsCallback()` | |
| `waterMetricsCallback()` | |
| `vehicleMetricsCallback()` | |
| `audioMetricsCallback()` | |
| `debugMetricsCallback()` | |
| `cycleDebugRenderMode()` | Cycles through available debug render modes. |
| `toggleNetGraph()` | Toggles the network graph HUD overlay. |
| `dumpActivePackages()` | Dumps the currently active packages to the console. |
| `dumpFunctionsMatch()` | Dumps functions matching a given package/namespace/name pattern. |
| `reportBlobs()` | Dumps information about blobs in the blob database. |
| `dumpCacheFiles()` | Dumps all cache files to disk. |
| `dumpManifest(hash)` | Dumps the manifest matching the given hash to the console. |
| `reportDatablockResources()` | Reports resource usage by all datablocks. |
| `DNetSetLogging(bool)` | Enables or disables low-level network packet logging. |
| `serverCmdColorTest()` | Sends a chat HUD color test message displaying the string `012345678`, with each digit rendered in a different chat color code. A developer output test for verifying color code rendering. |

---

## Containers and Spatial Queries

Server-side only. These functions perform spatial searches and raycasting.

| Function | Description |
|---|---|
| `containerRayCast(Point3F start, Point3F end, bitset mask, exempt, ...)` | Casts a ray from start to end, returning hit object ID, position, and surface normal as a space-separated string. Returns empty on no hit. Supports up to 6 exempt objects. |
| `containerBoxEmpty(bitset mask, Point3F center, float xRadius, float yRadius, float zRadius)` | Returns true if no objects matching the mask are in the specified box. |
| `containerBoxClear(bitset mask, Point3F center, float xRadius, float yRadius, float zRadius)` | Variant of `containerBoxEmpty`. |
| `initContainerRadiusSearch(Point3F pos, float radius, bitset mask)` | Starts a search for all objects within a radius. Iterate results with `containerSearchNext()`. |
| `initContainerBoxSearch(Point3F pos, Point3F boxSize, bitset mask)` | Starts a search for objects within a box. |
| `containerSearchNext()` | Returns the next object ID from an active container search. Returns -1 when done. |
| `containerSearchCurrDist()` | Returns the center-to-center distance to the current search result. |
| `containerSearchCurrRadiusDist()` | Returns the surface-to-center distance to the current search result. |
| `containerFindFirst(bitset type, Point3F point, float x, float y, float z)` | Finds the first object of the given type in a box. |
| `containerFindNext()` | Returns the next result from a `containerFindFirst` search. |
| `initClientBrickSearch(Point3F pos, Point3F boxSize)` | Starts a search for bricks in a box region. |
| `ClientBrickSearchNext()` | Returns the next brick from `initClientBrickSearch`. |

---

## Demo Recording

| Function | Description |
|---|---|
| `startDemoRecord()` | Starts recording a demo. Client-side input action. |
| `stopDemoRecord()` | Stops recording a demo. Client-side input action. |
| `StartSelectedDemo()` | Begins playing the selected demo from the demo list. |
| `demoPlaybackComplete()` | Callback fired when demo playback finishes. |
| `startRecordingDemo()` | Script-layer wrapper to begin demo recording. |
| `stopRecordingDemo()` | Script-layer wrapper to stop demo recording. |

---

## Environment and Lighting

| Function | Description |
|---|---|
| `saveEnvironment()` | Saves the current environment settings to file. |
| `parseEnvironmentFile()` | Parses and applies an environment configuration file. |
| `validateEnvironmentObjects()` | Validates the existence and integrity of environment objects (sky, water, ground, etc.). |
| `setSkyBox(string name)` | Sets the active skybox. |
| `setWater(string name)` | Sets the active water appearance. |
| `setGround(string name)` | Sets the active ground plane appearance. |
| `updateWaterFog()` | Updates water fog parameters to match current environment settings. |
| `loadDayCycle(string name)` | Loads and applies a day/night cycle preset. |
| `buildEnvironmentLists()` | Builds all environment selection lists (sky, water, ground, etc.). |
| `buildSkyBoxList()` | Populates the skybox selection list. |
| `buildWaterList()` | Populates the water selection list. |
| `buildGroundList()` | Populates the ground selection list. |
| `buildSunFlareList()` | Populates the sun flare selection list. |
| `buildDayCycleList()` | Populates the day cycle selection list. |
| `dumpServerSkyBoxList()` | Dumps available skyboxes to the console. |
| `dumpClientSkyBoxList()` | |
| `dumpLighting()` | Dumps current lighting state to the console. |
| `lightScene(callback, [forceAlways, forceWritable])` | Lights the current mission. Fires `callback` when complete. |
| `sceneLightingComplete()` | Callback fired when scene lighting is done. |
| `updateLightingProgress()` | Updates the lighting progress display. |
| `resetLighting()` | Resets OpenGL lighting state. |
| `onNeedRelight()` | Callback fired when the scene needs to be relit. |
| `getClientSunColor()` | Returns the current sun color as an RGBA string. |
| `setMaxViewDistance(float)` | Sets the maximum view/render distance. |

---

## Events (Wrench Event System)

Functions for registering, managing, and dumping Blockland's brick event system.

| Function | Description |
|---|---|
| `registerInputEvent()` | Registers a new input event type with the event system. |
| `unRegisterInputEvent()` | Unregisters an input event type. |
| `registerOutputEvent()` | Registers a new output event type. |
| `unRegisterOutputEvent()` | Unregisters an output event type. |
| `inputEvent_GetInputEventIdx()` | Returns the index of an input event by name. |
| `inputEvent_GetTargetIndex()` | Returns the target index of an input event. |
| `inputEvent_GetTargetClass()` | Returns the target class name of an input event. |
| `inputEvent_GetTargetName()` | Returns the display name of an input event target. |
| `outputEvent_GetOutputEventIdx()` | Returns the index of an output event by name. |
| `outputEvent_GetOutputName()` | Returns the display name of an output event. |
| `outputEvent_GetNumParametersFromIdx()` | Returns the number of parameters for an output event. |
| `verifyOutputParameterList()` | Verifies the parameter list of an output event definition. |
| `dumpInputEvents()` | Dumps all registered input events to the console. |
| `dumpOutputEvents()` | Dumps all registered output events to the console. |
| `AddDamageType()` | Registers a new damage type with the damage system. |
| `initDefaultDamageTypes()` | Initializes the built-in damage types. |
| `dumpDamageTypes()` | Dumps all registered damage types to the console. |
| `WrenchEvents_ClickLock()` | Handles the lock button click in the wrench events UI. |

---

## File System

| Function | Description |
|---|---|
| `findFirstFile(string pattern)` | Returns the first file matching the given glob pattern. |
| `findNextFile(string pattern)` | Returns the next file from a `findFirstFile` search. |
| `getFileCount(string pattern)` | Returns the number of files matching the pattern. |
| `getFileCRC(filename)` | Returns the CRC checksum of the specified file. |
| `getFileLength(filename)` | Returns the byte length of the specified file. |
| `getStringCRC(string)` | Returns the CRC of the given string. |
| `isFile(fileName)` | Returns true if the file exists. |
| `getFileModifiedTime(fileName)` | Returns the last-modified timestamp of the file as a string. |
| `getFileModifiedSortTime()` | Returns the file modified time in a sortable format. |
| `isWriteableFileName(fileName)` | Returns true if the file is writable. |
| `createPath(string)` | Creates all missing directories in the specified path. |
| `fileDelete(string path)` | Deletes a file. |
| `fileCopy(string source, string dest)` | Copies a file to the destination path. |
| `fileExt(fileName)` | Returns the file extension (e.g. `".cs"`). |
| `fileBase(fileName)` | Returns the full path without extension. |
| `fileName(filePathName)` | Returns just the filename without extension. |
| `filePath(fileName)` | Returns just the directory path portion. |
| `ExpandFilename(string filename)` | Resolves mod-relative paths (e.g. `~/`) to absolute paths. |
| `discoverFile(path)` | Adds a file or zip into the resource manager. |
| `isValidFileName(string)` | Returns true if the given string is a valid filename. |
| `getModuleDirectory()` | Returns the path of the current module's directory. |
| `getProfilePath()` | Returns the path to the user's profile/preferences directory. |
| `getSaveFilename()` | Returns the path for a save file dialog result. |
| `getLoadFilename()` | Returns the path for a load file dialog result. |

---

## Game Flow and Server Lifecycle

| Function | Description |
|---|---|
| `createServer(string serverType, string missionFile)` | Creates and starts a game server. |
| `destroyServer()` | Destroys the current game server and cleans up. |
| `initServer()` | Initializes the server subsystems. |
| `initBaseServer()` | Initializes the base server configuration. |
| `initDedicated()` | Initializes a dedicated server. |
| `initDedicatedLAN()` | Initializes a dedicated LAN server. |
| `serverPart2()` | Second stage of server initialization. |
| `portInit(int port)` | Initializes the network port, trying successive ports on failure. |
| `initClient()` | Initializes client subsystems. |
| `initBaseClient()` | Initializes base client configuration. |
| `initCommon()` | Initializes systems shared by both client and server (random seed, exec core scripts). |
| `loadMods()` | Loads all active mods. |
| `loadMainMenu()` | Loads and displays the main menu. |
| `onStart()` | Callback fired at engine startup. |
| `onExit()` | Callback fired when the engine is shutting down. |
| `createGame()` | Initializes game-mode-specific state. |
| `destroyGame()` | Cleans up game-mode-specific state. |
| `startGame()` | Starts the current game session. |
| `endGame()` | Ends the current game session. |
| `createMission()` | Creates a new mission instance. |
| `endMission()` | Ends the current mission. |
| `resetMission()` | Resets the mission to its initial state. |
| `onMissionLoaded()` | Callback fired when the mission finishes loading. |
| `onMissionEnded()` | Callback fired when the mission ends. |
| `onMissionReset()` | Callback fired when the mission is reset. |
| `onServerCreated()` | Callback fired when the server is created. |
| `onServerDestroyed()` | Callback fired when the server is destroyed. |
| `onDatablocksDeleted()` | Callback fired when all datablocks have been deleted. |
| `onDatablockLimitExceeded()` | Callback fired when too many datablocks are loaded. |
| `DeactivateServerPackages()` | Deactivates all server-side packages. |
| `resetServerDefaults()` | Resets all server variables to their defaults. |
| `setDefaultServerVars()` | Sets default values for all server preference variables. |
| `copyPrefsToServerVars()` | Copies loaded preference values into server variables. |
| `validatePrefs()` | Validates preference variables, clamping out-of-range values. |
| `GameModeInitialResetCheck()` | Checks whether the game mode needs to be reset on load. |
| `shutDown()` | Convenience function to shut down the server. |
| `doQuitGame()` | Performs a full quit/exit of the game. |
| `quitGame()` | Initiates game quit (may prompt confirmation). |
| `quit()` | Hard exits the Torque engine immediately. |

---

## HUD and Screen Printing

| Function | Description |
|---|---|
| `centerPrint(client, string, time, lines)` | Displays a message at the center of a specific client's screen. |
| `bottomPrint(client, string, time, lines)` | Displays a message at the bottom of a specific client's screen. |
| `CenterPrintAll(string, time, lines)` | Displays a center message to all clients. |
| `BottomPrintAll(string, time, lines)` | Displays a bottom message to all clients. |
| `clearCenterPrint(client)` | Clears a client's center message. |
| `clearBottomPrint(client)` | Clears a client's bottom message. |
| `clearCenterPrintAll()` | Clears center messages for all clients. |
| `clearBottomPrintAll()` | Clears bottom messages for all clients. |
| `sendLetterPrintInfo()` | Sends letter-print texture information to a client. |
| `loadPrintedBrickTexture()` | Loads a single printed brick texture. |
| `loadDefaultLetterPrints()` | Loads the default letter/number print textures. |
| `loadPrintedBrickTextures()` | Loads all registered printed brick textures. |
| `loadGameModePrintedBrickTextures()` | Loads game-mode-specific printed brick textures. |
| `refreshCenterTextCtrl()` | Refreshes the center-text GUI control. |
| `refreshBottomTextCtrl()` | Refreshes the bottom-text GUI control. |
| `dumpPrints()` | Dumps all registered print textures to the console. |
| `ToggleShapeNameHud()` | Toggles the nametag HUD display. |
| `serverCmdTripOut()` | A legacy screen effect command. In older versions of Blockland (before being restricted to Badspot only) it would white out the caller's screen and cycle through colors. |

---

## Input and Controls

Client-side input handling and camera functions.

| Function | Description |
|---|---|
| `activateDirectInput()` | Re-grabs the mouse and activates input polling. |
| `deactivateDirectInput()` | Releases the mouse and suspends input polling. |
| `activateKeyboard()` | Enables DirectInput keyboard polling. |
| `deactivateKeyboard()` | Disables DirectInput keyboard polling. |
| `enableMouse()` | Enables DirectInput mouse polling. |
| `disableMouse()` | Disables DirectInput mouse polling. |
| `enableJoystick()` | Enables joystick input polling. |
| `disableJoystick()` | Disables joystick input polling. |
| `isJoystickDetected()` | Returns true if a joystick is present. |
| `getJoystickAxes(instance)` | Returns the current axis state of the specified joystick. |
| `lockMouse(bool)` | Locks or unlocks the mouse to the game window. |
| `echoInputState()` | Prints the current DirectInput state to the console. |
| `moveforward()` | Input handler for forward movement. |
| `movebackward()` | Input handler for backward movement. |
| `moveleft()` | Input handler for left strafe. |
| `moveright()` | Input handler for right strafe. |
| `moveup()` | Input handler for upward movement (free cam). |
| `movedown()` | Input handler for downward movement (free cam). |
| `turnLeft()` | Input handler for turning left. |
| `turnRight()` | Input handler for turning right. |
| `panUp()` | Input handler for camera pan up. |
| `panDown()` | Input handler for camera pan down. |
| `yaw()` | Yaw input handler. |
| `pitch()` | Pitch input handler. |
| `getMouseAdjustAmount()` | Returns the current mouse sensitivity adjustment multiplier. |
| `Jump()` | Input handler for jump. |
| `Walk()` | Input handler for walk mode. |
| `Crouch()` | Input handler for crouch. |
| `Jet()` | Input handler for jet pack activation. |
| `mouseFire()` | Input handler for primary fire (mouse button). |
| `altTrigger()` | Input handler for alternate trigger/alt-fire. |
| `setSpeed()` | Sets the camera fly speed (free camera mode). |
| `toggleCamera()` | Toggles between play camera and free camera. |
| `toggleFirstPerson()` | Toggles between first and third person views. |
| `toggleFreeLook()` | Toggles free look mode. |
| `toggleZoom()` | Toggles zoom mode. |
| `setZoomFOV()` | Sets the zoomed FOV value. |
| `dropPlayerAtCamera()` | Teleports the player to the current camera position (admin/debug). |
| `dropCameraAtPlayer()` | Teleports the camera to the player's position. |
| `Suicide()` | Kills the local player. |
| `PrevSeat()` | Switches to the previous vehicle seat. |
| `NextSeat()` | Switches to the next vehicle seat. |
| `emoteAlarm()` | Plays the alarm emote. |
| `emoteConfusion()` | Plays the confusion emote. |
| `emoteHate()` | Plays the hate emote. |
| `emoteLove()` | Plays the love emote. |
| `emoteSit()` | Plays the sit emote. |
| `plantBrick()` | Places the currently held brick. |
| `cancelBrick()` | Cancels the current brick placement. |
| `undoBrick()` | Undoes the last brick placement. |
| `RotateBrickCW()` | Rotates the held brick clockwise. |
| `RotateBrickCCW()` | Rotates the held brick counter-clockwise. |
| `shiftBrickUp()` | Shifts the held brick up one step. |
| `shiftBrickDown()` | Shifts the held brick down one step. |
| `shiftBrickLeft()` | Shifts the held brick left one step. |
| `shiftBrickRight()` | Shifts the held brick right one step. |
| `shiftBrickTowards()` | Shifts the held brick toward the camera. |
| `shiftBrickAway()` | Shifts the held brick away from the camera. |
| `shiftBrickThirdUp()` | Shifts the held brick up by a third-stud increment. |
| `shiftBrickThirdDown()` | Shifts the held brick down by a third-stud increment. |
| `superShiftBrickUp()` | Large shift of held brick upward. |
| `superShiftBrickDown()` | Large shift of held brick downward. |
| `superShiftBrickLeft()` | Large shift of held brick left. |
| `superShiftBrickRight()` | Large shift of held brick right. |
| `superShiftBrickTowards()` | Large shift of held brick toward camera. |
| `superShiftBrickAway()` | Large shift of held brick away from camera. |
| `toggleSuperShift()` | Toggles super-shift mode for brick placement. |
| `dropTool()` | Drops the currently held tool. |
| `openBSD()` | Opens the Brick Selector Dialog. |
| `useTools()` | Activates the tool use mode. |
| `haveTools()` | Returns true if the player currently has tools equipped. |
| `useBricks()` | Activates brick placement mode. |
| `useSprayCan()` | Activates the spray can tool. |
| `useLight()` | Activates the light tool. |
| `scrollBricks()` | Scrolls through available bricks in the selector. |
| `scrollTools()` | Scrolls through available tools. |
| `scrollPaint()` | Scrolls through available paint colors. |
| `scrollInventory()` | Scrolls through the inventory. |
| `setActiveTool()` | Sets the active tool slot by index. |
| `setActiveInv()` | Sets the active inventory slot by index. |
| `getActiveInv()` | Returns the active inventory slot index. |
| `directSelectInv()` | Directly selects an inventory slot by index. |
| `setScrollMode()` | Sets the scroll wheel's current mode (bricks, tools, paint, etc.). |
| `shiftPaintColumn()` | Shifts the selected paint column in the color palette. |
| `showPlayerList()` | Shows the player list overlay. |
| `openOptionsWindow()` | Opens the options/settings menu. |
| `openAdminWindow()` | Opens the admin control panel. |
| `GlobalChat()` | Opens the global chat input box. |
| `TeamChat()` | Opens the team chat input box. |
| `invUp()` / `invDown()` / `invLeft()` / `invRight()` | Moves the inventory selection in the given direction. |
| `useFirstSlot()` – `useTenthSlot()` | Equips the item in inventory slot 1–10. |
| `dropFirstSlot()` – `dropTenthSlot()` | Drops the item from inventory slot 1–10. |
| `PageUpNewChatHud()` / `PageDownNewChatHud()` | Scrolls the chat HUD up or down. |
| `ToggleCursor()` | Shows or hides the mouse cursor. |
| `cursorOn()` | Shows the mouse cursor. |
| `cursorOff()` | Hides the mouse cursor. |
| `escapeFromGame()` | Triggers the escape/pause menu. |
| `togFullScreen()` | Toggles fullscreen mode. |

---

## JSON

Script-layer JSON parsing and serialization library.

| Function | Description |
|---|---|
| `loadJSON(string)` | Parses a JSON string and returns a root JSON object. |
| `saveJSON(object)` | Serializes a JSON object back to a string. |
| `parseJSON(string)` | Alias or variant of `loadJSON`. |
| `describeJSON(object)` | Returns a human-readable description of a JSON structure. |
| `dumpJSON(object)` | Dumps a JSON object's contents to the console. |
| `isJSONObject(value)` | Returns true if the value is a JSON object. |
| `getJSONType(value)` | Returns the type name of a JSON value. |
| `JSONObject()` | Creates a new empty JSON object. |
| `JSONArray()` | Creates a new empty JSON array. |
| `JSONHash()` | Creates a new empty JSON hash/map. |
| `__scanJSON()` | Internal: scans a JSON string from current position. |
| `__scanJSONString()` | Internal: scans a JSON string literal. |
| `__scanJSONArray()` | Internal: scans a JSON array. |
| `__scanJSONHash()` | Internal: scans a JSON hash/object. |
| `__scanJSONNumber()` | Internal: scans a JSON numeric literal. |

---

## Math — General

| Function | Description |
|---|---|
| `mFloor(float v)` | Rounds down to the nearest integer. |
| `mCeil(float v)` | Rounds up to the nearest integer. |
| `mAbs(float v)` | Returns the absolute value. |
| `mSqrt(float v)` | Returns the square root. |
| `mPow(float b, float p)` | Returns b raised to the power p. |
| `mLog(float v)` | Returns the natural logarithm. |
| `mSin(float th)` | Returns the sine (input in radians). |
| `mCos(float th)` | Returns the cosine (input in radians). |
| `mTan(float th)` | Returns the tangent (input in radians). |
| `mAsin(float th)` | Returns the arc-sine (output in radians). |
| `mAcos(float th)` | Returns the arc-cosine (output in radians). |
| `mAtan(float rise, float run)` | Returns the arc-tangent (slope) in radians. |
| `mRadToDeg(float)` | Converts radians to degrees. |
| `mDegToRad(float)` | Converts degrees to radians. |
| `mFloatLength(float v, int decimals)` | Returns v formatted to the given number of decimal places. |
| `mClamp(int val, int low, int high)` | Clamps an integer value between low and high. |
| `mClampF(float val, float low, float high)` | Clamps a float value between low and high. |
| `mSolveQuadratic(float a, float b, float c)` | Solves ax²+bx+c=0. Returns `"numSolutions x0 x1"`. |
| `mSolveCubic(float a, float b, float c, float d)` | Solves a cubic equation. Returns solutions as a space-separated string. |
| `mSolveQuartic(float a, float b, float c, float d, float e)` | Solves a quartic equation. Returns solutions as a space-separated string. |
| `getMin(val1, val2)` | Returns the smaller of two values. |
| `getMax(val1, val2)` | Returns the larger of two values. |
| `round(float)` | Rounds a float to the nearest integer. |
| `atoi()` | Converts a string to an integer. |
| `atof()` | Converts a string to a float. |

---

## Math — Vector

| Function | Description |
|---|---|
| `VectorAdd(Vector3F a, Vector3F b)` | Returns `a + b`. |
| `VectorSub(Vector3F a, Vector3F b)` | Returns `a - b`. |
| `VectorScale(Vector3F a, float scalar)` | Returns `a` scaled by `scalar`. |
| `VectorNormalize(Vector3F a)` | Returns `a` normalized to unit length. |
| `VectorDot(Vector3F a, Vector3F b)` | Returns the dot product of a and b. |
| `VectorCross(Vector3F a, Vector3F b)` | Returns the cross product of a and b. |
| `VectorDist(Vector3F a, Vector3F b)` | Returns the distance between a and b. |
| `VectorLen(Vector3F v)` | Returns the length (magnitude) of v. |
| `VectorOrthoBasis(AngAxisF aaf)` | Returns an orthogonal basis matrix for the given axis-angle. |
| `getBoxCenter(Box b)` | Returns the center point of the given bounding box. |
| `posFromTransform(transform)` | Extracts the position component from a full transform string. |
| `rotFromTransform(transform)` | Extracts the rotation component from a full transform string. |
| `posFromRaycast(string)` | Extracts the hit position `"x y z"` from a `containerRayCast` result. |
| `normalFromRaycast(string)` | Extracts the surface normal `"x y z"` from a `containerRayCast` result. |
| `eulerToMatrix(string)` | Converts Euler angles (degrees) to a rotation matrix. |
| `eulerRadToMatrix(string)` | Converts Euler angles (radians) to a rotation matrix. |
| `eulerToQuat(string)` | Converts Euler angles (radians) to a quaternion. |
| `eulerToQuat_degrees(string)` | Converts Euler angles (degrees) to a quaternion. |

---

## Math — Matrix

| Function | Description |
|---|---|
| `MatrixCreate(Vector3F pos, Vector3F rot)` | Creates a transform matrix from position and axis-angle rotation. |
| `MatrixCreateFromEuler(Vector3F e)` | Creates a rotation matrix from Euler angles. |
| `MatrixMultiply(Matrix4F left, Matrix4F right)` | Multiplies two matrices together. |
| `MatrixMulVector(MatrixF xfrm, Point3F vec)` | Transforms a vector by a matrix (direction only, no translation). |
| `MatrixMulPoint(MatrixF xfrm, Point3F pnt)` | Transforms a point by a matrix (including translation). |

---

## Math — Random

| Function | Description |
|---|---|
| `setRandomSeed(int seed)` | Sets the random seed. Defaults to current time if no seed given. |
| `getRandomSeed()` | Returns the current random seed. |
| `getRandom(int a, int b)` | Returns a random number between a and b. |
| `sGetRandomFloat()` | Returns a random float in [0, 1]. Sports system variant. |
| `hGetRandomFloat()` | Returns a random float. Hole bot variant. |

---

## Minigames

| Function | Description |
|---|---|
| `CreateMiniGameSO()` | Creates the server-side minigame SimObject. |
| `endAllMinigames()` | Ends all currently running minigames. |
| `InitMinigameColors()` | Initializes the default minigame team colors. |
| `getMiniGameLevel()` | Returns the current minigame nesting level. |
| `getMiniGameFromObject(object)` | Returns the minigame that owns the given object. |
| `miniGameCanDamage(attacker, target)` | Returns true if the attacker is allowed to damage the target under the current minigame rules. |
| `miniGameCanUse(client, target)` | Returns true if the client is allowed to interact with the target under minigame rules. |
| `sportIsInSameMinigame(a, b)` | Returns true if two players are in the same minigame. |
| `InitClientTeamManager()` | Initializes the team manager on the client side. |
| `handleInitTeams()` | Client handler called when team data is first received. |
| `handleAddTeam()` | Client handler called when a new team is added. |
| `handleRemoveTeam()` | Client handler called when a team is removed. |
| `handleSetTeamName()` | Client handler called when a team's name changes. |
| `handleAddClientToTeam()` | Client handler called when a client is added to a team. |
| `handleRemoveClientFromTeam()` | Client handler called when a client is removed from a team. |
| `handleSetTeamCaptain()` | Client handler called when a team captain is set. |
| `handleClientInYourMiniGame()` | Client handler called when another client joins your minigame. |

---

## Mission Loading

| Function | Description |
|---|---|
| `onMissionDownloadPhase1()` | Initiates mission download phase 1 (datablocks). |
| `onPhase1Progress()` | Updates phase 1 download progress display. |
| `onPhase1Complete()` | Fires when phase 1 download is complete. |
| `onMissionDownloadPhase2()` | Initiates mission download phase 2 (ghost objects). |
| `onPhase2Progress()` | Updates phase 2 download progress display. |
| `onPhase2Complete()` | Fires when phase 2 download is complete. |
| `onMissionDownloadPhase3()` | Initiates mission download phase 3 (lighting). |
| `onPhase3Progress()` | Updates phase 3 download progress display. |
| `onPhase3Complete()` | Fires when phase 3 download is complete. |
| `onMissionDownloadComplete()` | Fires when the full mission download is complete. |
| `onGhostAlwaysStarted()` | Fires when ghost-always transmission begins. |
| `onGhostAlwaysObjectReceived()` | Fires when a ghost-always object is received. |
| `onDataBlockObjectReceived()` | Fires when a datablock object is received from the server. |
| `onManifestRecieved()` | Fires when the asset manifest is received. |
| `onManifestHashReceived()` | Fires when the manifest hash is received and validated. |
| `onBlobCacheCheckFinished()` | Fires when the blob cache check is complete. |
| `onBlobDownloadFinished()` | Fires when a blob download finishes. |
| `setTotalPendingBlobs()` | Sets the total number of pending blob downloads. |
| `updateBlobsRemaining()` | Updates the blob download progress display. |
| `updateDownloadProgress()` | Updates the overall download progress display. |
| `setDownloadSize()` | Sets the total download size for progress tracking. |
| `updateLightingProgress()` | Updates the lighting progress display. |
| `pathOnMissionLoadDone()` | Loads path data from interiors after mission load is complete. |
| `pickSpawnPoint()` | Selects an appropriate spawn point for a new client. |
| `isNameUnique(string)` | Returns true if no connected client already has this display name. |

---

## Mod / Add-On Management

| Function | Description |
|---|---|
| `loadAddOns()` | Loads all enabled add-ons. |
| `loadGameModeAddOns()` | Loads add-ons required by the current game mode. |
| `updateAddOnList()` | Refreshes the active add-on list. |
| `VerifyAddOnScripts()` | Verifies that all add-on scripts are valid and can be executed. |
| `ClientVerifyAddOnScripts()` | Client-side verification of add-on scripts. |
| `loadClientAddOns()` | Loads add-ons on the client side. |
| `LoadRequiredAddOn(string)` | Forces a required add-on to be loaded. |
| `ForceRequiredAddOn(string)` | Marks and forces a specific add-on as required. |
| `isValidAddOn(string)` | Returns true if the given add-on name is valid and present. |
| `clientIsValidAddOn(string)` | Client-side check of add-on validity. |
| `isValidMap(string)` | Returns true if the given map name is valid. |
| `RTB_registerPref(name, default)` | Registers a Return to Blockland (RTB) add-on preference. |
| `setModPaths(string)` | Sets the semicolon-delimited mod path list for the resource manager. |
| `getModPaths()` | Returns the current mod path list. |
| `rebuildModPaths()` | Rebuilds the mod path list from defaults. |
| `loadDir(string)` | Loads all scripts in the given directory. |

---

## Music

| Function | Description |
|---|---|
| `updateMusicList()` | Refreshes the list of available music tracks. |
| `createMusicDatablocks()` | Creates datablocks for all available music files. |
| `createGameModeMusicDataBlocks()` | Creates datablocks for game-mode-specific music. |
| `isValidMusicFilename(string)` | Returns true if the filename is a valid music file. |
| `clientIsValidMusicFilename(string)` | Client-side check of music filename validity. |

---

## Network and Connections

| Function | Description |
|---|---|
| `connect(string addr)` | Connects to a game server at the given address. |
| `ConnectToServer()` | Script-layer function to connect to a selected server. |
| `ReConnectToServer()` | Reconnects to the last server. |
| `ReconnectToServerB()` | Alternate reconnect path. |
| `disconnect()` | Disconnects from the current server. |
| `disconnectedCleanup()` | Cleans up client state after a disconnection. |
| `localConnect(string name)` | Creates a local (same-process) connection to the server. |
| `allowConnections(bool)` | Enables or disables incoming connections to the server. |
| `setAllowConnections()` | Sets the connection-allowed flag on the server. |
| `doesAllowConnections()` | Returns true if the server is accepting connections. |
| `setNetPort(int port)` | Sets the network port. Returns true on success. |
| `getNetPort()` | Returns the current network port. |
| `queryMasterServer(...)` | Queries the master server for game listings. |
| `queryLanServers(...)` | Queries LAN for game servers. |
| `querySingleServer(address, flags)` | Queries a specific server for its status. |
| `pingSingleServer(address, index)` | Pings a specific server. |
| `cancelServerQuery()` | Cancels the current server query. |
| `stopServerQuery()` | Stops the query; remaining results are moved to finished. |
| `getServerCount()` | Returns the number of servers in the current query result. |
| `setServerInfo(index)` | Sets the active server to the given query result index. Returns bool. |
| `commandToServer(string func, ...)` | Sends a command to the server from a client. |
| `commandToClient(NetConnection, string func, ...)` | Sends a command to a specific client from the server. |
| `commandToAll(string func, ...)` | Sends a command to all connected clients. |
| `commandToAllExcept(string func, ...)` | Sends a command to all clients except a specified one. |
| `secureCommandToClient()` | Sends a secure (validated) command to a specific client. |
| `secureCommandToAll()` | Sends a secure command to all clients. |
| `secureCommandToAllExcept()` | Sends a secure command to all clients except a specified one. |
| `startHeartbeat()` | Begins periodic heartbeat updates to the master server. |
| `stopHeartbeat()` | Stops heartbeat updates to the master server. |
| `pingMatchMakerLoop()` | Maintains the matchmaker ping loop. |
| `pingMatchmaker()` | Sends a single ping to the matchmaker server. |
| `setMatchMakerIP(string)` | Sets the matchmaker server IP address. |
| `setMatchMakerToken(string)` | Sets the matchmaker authentication token. |
| `getMatchMakerIP()` | Returns the configured matchmaker IP. |
| `isLANAddress(string)` | Returns true if the given IP address is a LAN (private) address. |
| `cancelAllPendingConnections()` | Cancels all pending outgoing connections. |
| `cancelPendingConnection(nonce)` | Cancels a specific pending connection by nonce. |
| `sendArrangedConnectionRequest(server, requestId)` | Sends an arranged (NAT-traversed) connection request. |
| `handlePunchConnect()` | Handles a NAT punch-through connect event. |
| `MJ_connect()` | Handles a matchmaker-brokered connection. |
| `transmitJoinIP()` | Transmits the join IP to a connecting client. |
| `addToServerGuidList(string guid)` | Adds a GUID to the server's GUID list. |
| `removeFromServerGuidList(string guid)` | Removes a GUID from the server's GUID list. |
| `onServerInfoQuery()` | Callback fired when the server receives an info query. |
| `onUPnPDiscoveryFailed()` | Callback fired when UPnP discovery fails. |
| `onUPnPFailure()` | Callback fired on a UPnP port mapping failure. |
| `onUDPFailure()` | Callback fired on a UDP initialization failure. |
| `onInvalidConnectionAddress()` | Callback fired when a connection attempt uses an invalid address. |
| `OnSubnetError()` | Callback fired on a subnet/firewall error. |
| `onSendConnectChallengeRequest()` | Callback fired when a connection challenge is sent. |
| `onSendPunchPacket()` | Callback fired when a NAT punch packet is sent. |
| `notifyArrangedStart()` | Callback when an arranged connection negotiation starts. |
| `notifyArrangedAddress()` | Callback when the arranged connection address is resolved. |
| `notifyArrangedFinish()` | Callback when an arranged connection finishes. |
| `handleConnectionErrorMessage()` | Handles and displays a connection error message. |
| `isListenServer()` | Returns true if this instance is a listen (non-dedicated) server. |
| `UpdateRateToServer()` | Updates the client-to-server packet rate setting. |
| `UpdateRateToClient()` | Updates the server-to-client packet rate setting. |
| `UpdateLagThreshold()` | Updates the lag detection threshold. |
| `UpdatePacketSize()` | Updates the maximum packet size setting. |
| `SetConnectionType()` | Sets the connection type (LAN, broadband, etc.). |
| `WebCom_PostServer()` | Posts server status to the web backend. |
| `WebCom_PostServerUpdateLoop()` | Maintains periodic server status posting. |
| `getGhostLimit()` | Returns the maximum number of ghosts per connection. |
| `setGhostLimit()` | Sets the maximum number of ghosts per connection. |

---

## Packages

| Function | Description |
|---|---|
| `activatePackage(string name)` | Activates the named package, pushing it onto the override stack. |
| `deactivatePackage(string name)` | Deactivates the named package, removing it from the stack. |
| `isPackage(string name)` | Returns true if the named package is registered. |
| `getNumActivePackages()` | Returns the number of currently active packages. |
| `getActivePackage(int index)` | Returns the name of the active package at the given stack index. |
| `dumpActivePackages()` | Dumps the list of active packages to the console. |

---

## Platform and System Info

| Function | Description |
|---|---|
| `getVersionNumber()` | Returns the engine version as an integer. |
| `getVersionString()` | Returns the engine version as a string. |
| `getCompileTimeString()` | Returns the date and time the engine was compiled. |
| `getBuildString()` | Returns the build type: `"Debug"` or `"Release"`. |
| `getBuildNumber()` | Returns the Blockland-specific build number. |
| `getPlatform()` | Returns the platform string (`"Win32"`, `"MacOS"`, etc.). |
| `isWindows()` | Returns true if running on Windows. |
| `isMacintosh()` | Returns true if running on Mac. |
| `getSimTime()` | Returns the current simulation time in milliseconds since game start. |
| `getRealTime()` | Returns the current real (wall clock) time in milliseconds. |
| `getDateTime()` | Returns the current date and time as a formatted string. |
| `setUTC(int time)` | Sets the UTC time offset. |
| `getUTC()` | Returns the current UTC time. |
| `getDayOfYear(int month, int day)` | Returns the day-of-year number for a given month and day. |
| `getCurrentYear()` | Returns the current year. |
| `getCurrentMinuteOfYear()` | Returns the current minute of the year. |
| `getCPUName()` | Returns the CPU model name string. |
| `getCPUMhz()` | Returns the CPU speed in MHz. |
| `getTotalRam()` | Returns the total system RAM in MB. |
| `getComputerName()` | Returns the computer's hostname. |
| `getOSLong()` | Returns the full OS version string. |
| `getOSShort()` | Returns a short OS identifier string. |
| `getDesktopResolution()` | Returns the current desktop resolution as a string. |
| `getWindowCaptionHeight()` | Returns the height of the window's title bar. |
| `getWindowFrameSize()` | Returns the size of the window frame/border. |
| `setProcessorAffinityMask(U32 mask)` | Sets the CPU affinity mask for the process. |
| `BringWindowToForeground()` | Brings the game window to the foreground. |
| `GameWindowExists()` | Returns true if the game window exists and is valid. |
| `mathInit(string mode)` | Initializes the math library with the given CPU extension mode (`DETECT`, `SSE`, `MMX`, etc.). |
| `getMyBLID()` | Returns the BL_ID of the local player (your own ID). |
| `getNumKeyID()` | Duplicate of `getMyBLID`, kept for backwards compatibility. |
| `isUnlocked()` | Always returns true; kept for backwards compatibility. |
| `getLAN_BLID()` | Returns the local BL_ID used for LAN play. |
| `sha1()` | |
| `getUUID()` | Returns a new unique UUID string. |
| `getUTF8String(string)` | Converts an ASCII string to UTF-8. |
| `getASCIIString(string)` | Converts a UTF-8 string to ASCII. |
| `getUpnpPort()` | Returns the UPnP-mapped external port. |
| `upnpAdd(int port)` | Requests a UPnP port mapping for the given port. |
| `protocolRegistryCheck()` | Checks if the Blockland protocol is registered in the OS. |
| `protocolRegistryWrite()` | Writes the Blockland protocol handler to the OS registry. |

---

## Print Textures

| Function | Description |
|---|---|
| `setPrintTexture(int index, string texture)` | Assigns a texture path to the given print texture index. |
| `getPrintTexture(int index)` | Returns the texture path for the given print index. |
| `getNumPrintTextures()` | Returns the total number of registered print textures. |
| `setSprayCanDivision(int index, int slot, string name)` | Defines a division (tab) in the spray can color selector. |
| `getSprayCanDivisionName(int index)` | Returns the name of the given spray can division. |
| `getSprayCanDivisionSlot(int index)` | Returns the slot of the given spray can division. |

---

## Quota System

The quota system limits per-client resource usage.

| Function | Description |
|---|---|
| `getQuotaObjectFromClient(client)` | Returns the quota object associated with a given client. |
| `getQuotaObjectFromBrick(brick)` | Returns the quota object associated with a given brick. |
| `getQuotaObjectFromBrickGroup(brickGroup)` | Returns the quota object for a given brick group. |
| `verifyQuotaNumber()` | Verifies that quota numbers are within valid bounds. |
| `setCurrentQuotaObject(QuotaObject)` | Sets the active quota context for resource tracking. |
| `getCurrentQuotaObject()` | Returns the current active quota object. |
| `clearCurrentQuotaObject()` | Clears the active quota context. |
| `killAllQuotaObjects()` | Destroys all objects created under any quota context. |
| `cancelQuotaSchedules(quotaObj)` | Cancels all schedules associated with the given quota object. |
| `cancelAllQuotaSchedules()` | Cancels all quota-associated schedules. |

---

## Save / Load Bricks

| Function | Description |
|---|---|
| `saveBricks(client, filename)` | Saves the specified client's bricks to a file. |
| `saveBricks_ProcessWrenchExtras()` | Processes wrench event data during a brick save. |
| `SaveBricks_WriteSingleBrick()` | Writes a single brick entry to the save file. |
| `getValidSaveName(string)` | Sanitizes and validates a save file name. |
| `UploadSaveFile_Start()` | Begins the client-to-server save file upload process. |
| `UploadSaveFile_Tick()` | Processes one chunk of a save file upload. |
| `UploadSaveFile_End()` | Finalizes the save file upload. |
| `ServerLoadSaveFile_Start()` | Begins loading a save file on the server. |
| `ServerLoadSaveFile_Tick()` | Processes one chunk of a save file load. |
| `ServerLoadSaveFile_ProcessColorData()` | Processes color palette data from a save file. |
| `ServerLoadSaveFile_End()` | Finalizes save file loading on the server. |
| `serverLoadBricks_Timeout()` | Handles timeout during brick load. |
| `serverDirectSaveFileLoad()` | Loads a save file directly on the server without client upload. |
| `calcSaveOffset()` | Calculates position offset for brick placement on load. |
| `colorMatch()` | Matches colors between a save file's palette and the server's palette. |
| `LoadBricks_ColorCheck()` | Checks for color palette mismatches before loading. |
| `LoadBricks_GetColorDifference()` | Returns the degree of color mismatch between save and server. |
| `LoadBricks_PopulateFileList()` | Populates the file list in the load bricks dialog. |
| `LoadBricks_ClickLoadButton()` | Handles the load button click in the brick load dialog. |
| `LoadBricks_SendLineToServer()` | Sends one line of a save file to the server during upload. |
| `LoadBricks_CreateFromLine()` | Parses a save file line and creates the corresponding brick. |
| `LoadBricks_ClientServerCheck()` | Verifies server compatibility before loading bricks. |

---

## Scheduling and Sim

| Function | Description |
|---|---|
| `schedule(time, refobject\|0, command, ...)` | Schedules a function call after `time` milliseconds. Returns a schedule ID. |
| `scheduleNoQuota()` | Schedules a function call without counting against the event quota. |
| `cancel(eventId)` | Cancels a scheduled event by ID. |
| `isEventPending(scheduleId)` | Returns true if the given schedule is still pending. |
| `getTimeRemaining(scheduleId)` | Returns the milliseconds remaining before the schedule fires. |
| `getNumSchedules()` | Returns the number of pending scheduled events. |
| `nameToID(object)` | Converts an object name to its numeric ID. |
| `isObject(object)` | Returns true if the object exists and is valid. **Always call before using an object reference.** |
| `isFunction([namespace], funcName)` | Returns true if the given function exists. |
| `deleteDataBlocks()` | Deletes all registered datablocks. Used between mission loads. |
| `getDataBlock(name)` | Returns a datablock by name from the datablock group. |
| `getDataBlockGroupSize()` | Returns the number of loaded datablocks. |
| `call(funcName [, args ...])` | Calls the named function with the given arguments. |
| `compile(fileName)` | Compiles a script file without executing it. |
| `exec(fileName [, nocalls [, journalScript]])` | Compiles (if needed) and executes a script file. |
| `eval(string)` | Evaluates a TorqueScript string as code. |
| `export(searchString [, fileName [, append]])` | Exports matching global variables to a file. |
| `deleteVariables(wildCard)` | Deletes global variables matching the wildcard. |

---

## Server Commands (`serverCmd*`)

These are functions invoked on the server via `commandToServer` from a client. Only a selection with clear, confident descriptions is documented here.

| Function | Description |
|---|---|
| `serverCmdMessageSent(client, text)` | Handles a global chat message sent by a client. |
| `serverCmdTeamMessageSent(client, text)` | Handles a team chat message sent by a client. |
| `serverCmdSuicide(client)` | Kills the calling client's player. |
| `serverCmdKick(client, target)` | Admin command to kick a player. |
| `serverCmdBan(client, target, duration)` | Admin command to ban a player. |
| `serverCmdUnBan(client, target)` | Admin command to remove a ban. |
| `serverCmdRequestBanList(client)` | Requests the ban list to be sent to the client. |
| `serverCmdReloadBricks(client)` | Reloads the calling client's bricks from their saved file. |
| `serverCmdClearBricks(client)` | Clears the calling client's bricks. |
| `serverCmdClearBrickGroup(client)` | Clears a specific brick group. |
| `serverCmdClearAllBricks(client)` | Admin command to clear all bricks on the server. |
| `serverCmdClearBananas(client)` | Admin command to clean up stray/orphaned game objects. |
| `serverCmdClearFarAwayBricks(client)` | Admin command to remove bricks beyond a distance threshold. |
| `serverCmdClearFloatingBricks(client)` | Admin command to remove bricks not resting on anything. |
| `serverCmdClearSpamBricks(client)` | Admin command to remove spam/excessive bricks. |
| `serverCmdClearVehicles(client)` | Admin command to remove all vehicles. |
| `serverCmdClearBots(client)` | Admin command to remove all bots. |
| `serverCmdResetVehicles(client)` | Admin command to reset all vehicles to their spawn positions. |
| `serverCmdPlantBrick(client, ...)` | Places a brick for the calling client. |
| `serverCmdCancelBrick(client)` | Cancels the calling client's pending brick placement. |
| `serverCmdUndoBrick(client)` | Undoes the calling client's last brick placement. |
| `serverCmdRotateBrick(client)` | Rotates the calling client's held brick. |
| `serverCmdShiftBrick(client, dir)` | Shifts the calling client's held brick in the given direction. |
| `serverCmdSuperShiftBrick(client, dir)` | Large-steps the calling client's held brick in the given direction. |
| `serverCmdUseTool(client)` | Activates a tool for the calling client. |
| `serverCmdUnUseTool(client)` | Deactivates a tool for the calling client. |
| `serverCmdDropTool(client)` | Drops the calling client's current tool. |
| `serverCmdUseInventory(client, slot)` | Uses the item in the specified inventory slot for the calling client. |
| `serverCmdInstantUseBrick(client)` | Instantly uses/activates the calling client's selected brick. |
| `serverCmdSetPrint(client, printIndex)` | Sets the active print (decal) for the calling client. |
| `serverCmdUseHammer(client)` | Activates the hammer tool for the calling client. |
| `serverCmdUseSprayCan(client)` | Activates the spray can for the calling client. |
| `serverCmdUseFXCan(client)` | Activates the FX spray can for the calling client. |
| `serverCmdBuyBrick(client, brickType)` | Processes a brick purchase for the calling client. |
| `serverCmdClearInventory(client)` | Clears the calling client's inventory. |
| `serverCmdSit(client)` | Makes the calling client's player sit. |
| `serverCmdHug(client)` | Makes the calling client's player perform the hug emote. |
| `serverCmdZombie(client)` | Makes the calling client's player perform the zombie emote. |
| `serverCmdAlarm(client)` | Makes the calling client's player perform the alarm emote. |
| `serverCmdWtf(client)` | Makes the calling client's player perform the WTF emote. |
| `serverCmdConfusion(client)` | Makes the calling client's player perform the confusion emote. |
| `serverCmdHate(client)` | Makes the calling client's player perform the hate emote. |
| `serverCmdLove(client)` | Makes the calling client's player perform the love emote. |
| `serverCmdWarp(client, pos)` | Admin command to teleport a player to a given position. |
| `serverCmdSpy(client, target)` | Admin command to spectate/spy on another client. |
| `serverCmdFind(client, target)` | Admin command to find and go to another client. |
| `serverCmdFetch(client, target)` | Admin command to teleport another client to you. |
| `serverCmdBrickCount(client)` | Prints the calling client's brick count to their console. |
| `serverCmdRealBrickCount(client)` | Prints the actual rendered brick count. |
| `serverCmdLight(client)` | Admin command to toggle a client's flashlight. |
| `serverCmdDropCameraAtPlayer(client)` | Drops the camera at the player's position. |
| `serverCmdDropPlayerAtCamera(client)` | Teleports the player to the camera position. |
| `serverCmdGetTransform(client)` | Returns the calling client's current transform. |
| `serverCmdGetID(client)` | Returns the calling client's object ID. |
| `serverCmdActivateStuff(client)` | Triggers ActivateStuff on the calling client's player. |
| `serverCmdNextSeat(client)` | Moves the calling client to the next vehicle seat. |
| `serverCmdPrevSeat(client)` | Moves the calling client to the previous vehicle seat. |
| `serverCmdStartTalking(client)` | Marks the calling client as currently voice talking. |
| `serverCmdStopTalking(client)` | Marks the calling client as done voice talking. |
| `serverCmdCreateMiniGame(client, ...)` | Creates a new minigame for the calling client. |
| `serverCmdEndMiniGame(client)` | Ends the calling client's minigame. |
| `serverCmdResetMiniGame(client)` | Resets the calling client's minigame. |
| `serverCmdJoinMiniGame(client, id)` | Joins an existing minigame. |
| `serverCmdLeaveMiniGame(client)` | Leaves the current minigame. |
| `serverCmdInviteToMiniGame(client, target)` | Invites another client to a minigame. |
| `serverCmdAcceptMiniGameInvite(client)` | Accepts a pending minigame invite. |
| `serverCmdRejectMiniGameInvite(client)` | Rejects a pending minigame invite. |
| `serverCmdIgnoreMiniGameInvite(client)` | Ignores a pending minigame invite. |
| `serverCmdTrust_Invite(client, target)` | Sends a trust invite to another client. |
| `serverCmdAcceptTrustInvite(client)` | Accepts a trust invite. |
| `serverCmdRejectTrustInvite(client)` | Rejects a trust invite. |
| `serverCmdIgnoreTrustInvite(client)` | Ignores a trust invite. |
| `serverCmdTrust_Demote(client, target)` | Removes trust from another client. |
| `serverCmdUnIgnore(client, target)` | Removes an ignore from another client. |
| `serverCmdSAD(client)` | Super Admin: enables super admin mode. |
| `serverCmdSADSetPassword(client, password)` | Super Admin: sets the super admin password. |
| `serverCmdAddEvent(client, ...)` | Adds a wrench event to a brick. |
| `serverCmdClearEvents(client)` | Clears all events from the selected brick. |
| `serverCmdCancelEvents(client)` | Cancels pending event operations. |
| `serverCmdCancelAllEvents(client)` | Cancels all of a client's pending events. |
| `serverCmdSetColorMethod(client, method)` | Sets the client's brick coloring method (color ID, FX, etc.). |
| `serverCmdClearColors(client)` | Resets the client's custom color list to defaults. |
| `serverCmdBSD(client)` | Opens the brick shop (BSD) for the calling client. |
| `serverCmdGameModeGuiServer_ChangeGameMode()` | Changes the active game mode. |
| `serverCmdServerSettingsGui_ApplyVariables()` | Applies changed server settings from the settings GUI. |
| `serverCmdEnvGui_SetVar()` | Applies a changed environment variable from the environment GUI. |
| `serverCmdResetBots(client)` | Resets the calling client's bots. |
| `serverCmdResetAllBots(client)` | Admin command to reset all bots on the server. |
| `serverCmdMyBotCount(client)` | Returns the calling client's current bot count. |
| `serverCmdBotCount(client)` | Returns the total bot count on the server. |

### Badspot Personal Commands

These commands exist in the default game scripts but are hardcoded to only be executable by Badspot (the developer). Calling them as any other user, including super admin, will silently fail or be rejected. Descriptions below are based on observed behaviour from Badspot's own freebuild server and promotional video footage.

| Function | Description |
|---|---|
| `serverCmdFakeJoin()` | Sends a fake player-join notification to all clients, spoofing another player entering the server. |
| `servercmdFakeTalk()` | Triggers the "player is typing" indicator for another player without them actually typing. |
| `servercmdFakeLeave()` | Sends a fake player-leave notification to all clients, spoofing another player disconnecting. |
| `serverCmdSayAs()` | Sends a chat message that appears to come from another player. |
| `serverCmdfakeAdmin()` | Sends a fake notification that a player has been escalated to admin status. |
| `serverCmdRainPlanes()` | Believed to spawn a large number of plane objects raining down on the server, as seen in Blockland promotional footage. |
| `serverCmdrainguns()` | Believed to spawn a large number of gun objects raining down on the server, as seen in Blockland promotional footage. |
| `serverCmdgigigi()` | |
| `serverCmdCheaterCheater()` | |
| `serverCmdSymbolHandeler()` | Requires arguments to function but the expected signature is unknown. Purpose unclear. |

### Icon Generation (Developer Tools)

These are Badspot developer commands used to generate UI icon assets. Each one puts the camera into free mode, moves it to a designated position below the map, spawns the relevant models, and takes screenshots.

| Function | Description |
|---|---|
| `serverCmdIconInit()` | Sets up the camera for icon generation. Changes the skybox to a solid hot-pink chroma key background for easy background removal in a photo editor. Does not spawn anything. |
| `serverCmdDoAllIcons()` | Cycles through all bricks and captures UI icons for each. |
| `serverCmdDoIcon(string)` | Spawns the brick matching the given name for icon capture. The name is wrapped automatically: e.g. passing `"2x2"` resolves to `Brick2x2Data`. Does not set up the camera — call `serverCmdIconInit()` first. |
| `serverCmdDoPlayerIcons()` | Cycles through every node part of the player model (hat, hat accessories, head, body, hands, legs/feet) and captures UI icons for each. |
| `serverCmdDoSecondPackIcons()` | Cycles through all SecondPack items (shoulder pad variants) and captures their UI icons. |
| `serverCmdDoPackIcons()` | Cycles through all Pack items (back-worn objects such as backpacks, quivers, buckets, etc.) and captures their UI icons. |
| `serverCmdDoItemIcon(int itemClassID)` | Captures a UI icon for the item matching the given numeric item class ID. |
| `serverCmdDoBotIcon()` | Present in the function dump but reports as not found when called. Likely a removed or dead function whose script declaration was left orphaned. |
| `doAllIcons()` | Script-layer wrapper that triggers the full icon generation pass. |
| `doIconScreenshot()` | Takes the actual screenshot during an icon generation pass. |
| `schedulePlayerIcon()` | Schedules the next player part icon capture in the generation sequence. |

---

## Sports and Game Modes

Functions implementing Blockland's built-in sports and physics-based game modes.

| Function | Description |
|---|---|
| `spawnBall()` | Spawns the sports ball in the world. |
| `dropSoccerBall()` | Drops the soccer ball from a player. |
| `soccerAnimLoop()` | Manages the soccer animation loop. |
| `basketballPass()` | Executes a basketball pass. |
| `basketballLobCheck()` | Checks lob conditions for basketball. |
| `basketBallAddSpin()` | Adds spin to a basketball. |
| `stealBasketball()` | Handles basketball steal logic. |
| `stealBasketballChance()` | Calculates the probability of a basketball steal. |
| `CatchFootballMessage()` | Handles the catch event for football. |
| `fumbleFootBall()` | Handles football fumble logic. |
| `tacklePlayer()` | Applies a tackle to a player. |
| `dodgeballCatchTestFoo()` | Tests catch conditions for dodgeball. |
| `tumble()` | Applies a tumble/knockdown physics effect to a player. |
| `horseDeDodge()` | |
| `delaySportPlayerCheck()` | Delayed check for sports player validity. |
| `updatePlayerBalls()` | Updates ball state for all players. |
| `pickupSportBalls()` | Handles a player picking up a sports ball. |
| `passBallCheck()` | Checks conditions for passing the ball. |
| `CannonFire()` | Fires the cannon and launches the player. |
| `CannonStrengthLoop()` | Updates the cannon strength display over time. |
| `bottomprintCannonStrength()` | Prints current cannon charge strength to the screen. |
| `execDoors()` | Executes door-related game mode logic. |

---

## Steam Integration

| Function | Description |
|---|---|
| `SteamAPI_Init()` | Initializes the Steam API. Returns bool. |
| `SteamEnabled()` | Returns true if Steam is currently enabled and initialized. |
| `SteamAPI_Shutdown()` | Shuts down the Steam API. |
| `getSteamId()` | Returns the local player's Steam ID. |
| `steamGetAchievement(string name)` | Awards the named Steam achievement to the local player. |
| `steamClearAchievement()` | Clears a Steam achievement (debug use). |
| `SteamCreateLobby()` | Creates a Steam lobby. |
| `SteamJoinLobby(int64 lobbyId)` | Joins an existing Steam lobby by ID. |
| `SteamLeaveLobby()` | Leaves the current Steam lobby. |
| `SteamSetLobbyIP(string ip)` | Sets the server IP in the lobby data. Returns bool. |
| `SteamSetLobbyPort(port)` | Sets the server port in the lobby data. Returns bool. |
| `SteamGetLobbyIP()` | Returns the server IP from lobby data. |
| `SteamGetLobbyPort()` | Returns the server port from lobby data. |
| `SteamGetLobbyID()` | Returns the current Steam lobby ID. |
| `SteamGetAuthSessionTicket()` | Returns an auth session ticket string. |
| `SteamCancelAuthTicket()` | Cancels the current auth session ticket. |
| `SteamOpenStore()` | Opens the Steam store page for Blockland. |
| `steamOnOverlayActivated()` | Callback fired when the Steam overlay is opened. |
| `steamOnOverlayDeactivated()` | Callback fired when the Steam overlay is closed. |
| `steamOnLobbyEnter()` | Callback fired when the local player enters a Steam lobby. |
| `serverCmdGreenLight()` | **Legacy — Steam Greenlight era.** Activates the player's flashlight and tints it green, intended as a reward/acknowledgement for players who voted for Blockland on Steam Greenlight. Also prints a local chat message: `"Click on the Steam link on the main menu first!"` Steam Greenlight was retired in 2017; this command serves no functional purpose in current builds. |

---

## String Functions

| Function | Description |
|---|---|
| `strcmp(string a, string b)` | Case-sensitive string comparison. Returns 0 if equal. |
| `stricmp(string a, string b)` | Case-insensitive string comparison. Returns 0 if equal. |
| `strncmp(string a, string b, int n)` | Compares the first n characters of two strings. |
| `strnicmp(string a, string b, int n)` | Case-insensitive compare of first n characters. |
| `strlen(string)` | Returns the length of the string. |
| `strstr(string, substr)` | Returns the position of substr within string, or -1. |
| `strpos(string hay, string needle, int offset)` | Returns position of needle in hay starting at offset. Case-sensitive. |
| `stripos(string hay, string needle, int offset)` | Case-insensitive variant of `strpos`. |
| `strMatch(string, pattern)` | Returns true if the string matches the glob pattern. |
| `striMatch(string, pattern)` | Case-insensitive glob pattern match. |
| `ltrim(string)` | Strips leading whitespace. |
| `rtrim(string)` | Strips trailing whitespace. |
| `trim(string)` | Strips both leading and trailing whitespace. |
| `stripChars(string, chars)` | Removes all occurrences of the given characters from the string. |
| `strlwr(string)` | Returns the string converted to lowercase. |
| `strupr(string)` | Returns the string converted to uppercase. |
| `strchr(string, char)` | Returns the portion of the string starting at the first occurrence of char. |
| `strreplace(string, from, to)` | Replaces all occurrences of `from` with `to`. |
| `striReplace()` | Case-insensitive variant of `strreplace`. |
| `getSubStr(string, int start, int numChars)` | Returns a substring starting at `start`, up to `numChars` long. |
| `getCharCount(string, char)` | Returns the number of occurrences of char in string. |
| `getStrBetween()` | |
| `repeatString(string, int n)` | Returns the string repeated n times. |
| `sanitizeIdentifier(string)` | Strips/replaces characters that are not valid in TorqueScript identifiers. |
| `skipLeftSpace(string)` | Strips leading whitespace; alias of `ltrim`. |
| `StripMLControlChars(string)` | Strips TorqueML color/format control codes from a string. |
| `strToPlayerName(string)` | Sanitizes a string for use as a player name (max 16 chars, strips special chars). |
| `stripTrailingSpaces(string)` | Strips trailing spaces and underscores from a player name string. |
| `strrev(string)` | Reverses a string. |
| `setSubStr()` | |
| `setsubstrr()` | |
| `getsubstrr()` | |
| `getWord(string text, int index)` | Returns the space-delimited word at the given index. |
| `getWords(string text, int start [, int end])` | Returns a range of space-delimited words. |
| `setWord(text, int index, string replace)` | Replaces the word at the given index. |
| `removeWord(text, int index)` | Removes the word at the given index. |
| `getWordCount(text)` | Returns the number of space-delimited words. |
| `firstWord(text)` | Returns the first word. |
| `restWords(text)` | Returns all words after the first. |
| `getField(text, int index)` | Returns the tab-delimited field at the given index. |
| `getFields(text, int start [, int end])` | Returns a range of tab-delimited fields. |
| `setField(text, int index, string replace)` | Replaces a tab-delimited field at the given index. |
| `removeField(text, int index)` | Removes a tab-delimited field. |
| `getFieldCount(text)` | Returns the number of tab-delimited fields. |
| `getRecord(text, int index)` | Returns the newline-delimited record at the given index. |
| `getRecords(text, int start [, int end])` | Returns a range of newline-delimited records. |
| `setRecord(text, int index, string replace)` | Replaces a newline-delimited record. |
| `removeRecord(text, int index)` | Removes a newline-delimited record. |
| `getRecordCount(text)` | Returns the number of newline-delimited records. |
| `NextToken(str, token, delim)` | Sets `token` to the next sub-string in `str` delimited by `delim`. |
| `getLine(string text, int index)` | Returns the line at the given index. |
| `getLineCount(string text)` | Returns the number of lines. |
| `makePadString(string, int width)` | Pads a string to the given width with spaces. |
| `getLongNumberString(int)` | Returns a formatted number string with thousand separators. |
| `getTimeString(int milliseconds)` | Returns a formatted time string from a millisecond value. |
| `typeOf(value)` | Returns the type name of the given value as a string. |
| `semanticVersionCompare(string a, string b)` | Compares two semantic version strings. Returns -1, 0, or 1. |
| `pushBack(list, value [, delim])` | Appends a value to a delimited list. |
| `pushFront(list, value [, delim])` | Prepends a value to a delimited list. |
| `popFront(list [, delim])` | Removes and returns the first value of a delimited list. |
| `urlEnc(string)` | URL-encodes a string. |
| `getSafeVariableName(string)` | Returns a version of the string safe for use as a variable name. |
| `isValidDecal(string)` | Returns true if the given string is a valid decal name. |
| `DT_isLeapYear(int year)` | Returns true if the given year is a leap year. |
| `DT_getWeekDay(...)` | Returns the day-of-week for a given date. |
| `DT_getTimeDifference(...)` | Returns the time difference between two timestamps. |
| `DT_getDayDifference(...)` | Returns the day difference between two dates. |

---

## Tagged Strings

| Function | Description |
|---|---|
| `addTaggedString(string)` | Tags the string and adds it to the NetStringTable. Returns the tag. |
| `removeTaggedString(int tag)` | Removes the tagged string from the NetStringTable. |
| `getTaggedString(int tag)` | Returns the string associated with the given tag. |
| `buildTaggedString(string format, ...)` | Builds a tagged string using a format tag and arguments. |
| `detag(textTagString)` | Returns the string value of a tagged string variable. |
| `getTag(textTagString)` | Returns the numeric tag for a tagged string. |

---

## TCP / HTTP Client

Script-layer HTTP client utilities.

| Function | Description |
|---|---|
| `TCPClient(url)` | Creates a TCP client connection to the given URL. |
| `TCPClientGET(url)` | Performs an HTTP GET request to the given URL. |
| `TCPClientPOST(url, data)` | Performs an HTTP POST request with the given data. |
| `connectToURL(url)` | Opens the given URL in the default browser or connects to it. |
| `urlGetComponents(url)` | Parses a URL and returns its components (protocol, host, path, etc.). |
| `parseCustomTML(string)` | Parses a Custom TML (Torque Markup Language) string. |
| `parseCustomTMLFile(filename)` | Parses a Custom TML file. |
| `_parseCustomTML()` | Internal recursive TML parser. |
| `customTMLParser_default()` | Default TML parser handler. |
| `customTMLParser_updater()` | TML parser handler for the updater system. |
| `customTMLParser_updaterChangeLog()` | TML parser handler for updater changelog data. |

---

## Treasure Chests

| Function | Description |
|---|---|
| `registerTreasureChest(brick)` | Registers a brick as a treasure chest. |
| `unRegisterTreasureChest(brick)` | Unregisters a brick as a treasure chest. |
| `dumpTreasureChests()` | Dumps all registered treasure chests to the console. |
| `rebuildAllClientTreasureChestLists()` | Rebuilds the treasure chest list for all connected clients. |

---

## Trust System

| Function | Description |
|---|---|
| `getTrustLevel(client, target)` | Returns the trust level of `target` as seen by `client`. |
| `TrustListCheck(client, target)` | Checks if `target` is on `client`'s trust list. |
| `updateTrustGui()` | Refreshes the trust management GUI. |
| `SetMutualBrickGroupTrust(a, b)` | Grants mutual brick group trust between two clients. |
| `saveTrustList()` | Saves the local trust list to file. |
| `loadTrustList()` | Loads the trust list from file. |
| `dumpTrustList()` | Dumps the trust list to the console. |
| `updateClientTrustList()` | Updates a client's trust list from the local file. |
| `rememberSentTrustInvite(target)` | Records that a trust invite was sent to the target. |
| `findClientByBL_ID(blid)` | Returns the client object with the given BL_ID. |
| `findLocalClient()` | Returns the local client's `GameConnection` object. |
| `isNameUnique(string name)` | Returns true if no connected client has the given name. |
| `kickBLID(blid)` | Admin function to kick a player by BL_ID. |
| `banBLID(blid)` | Admin function to ban a player by BL_ID. |

---

## Video / Display

| Function | Description |
|---|---|
| `setDisplayDevice(string deviceName, int width, int height, int bpp, bool fullScreen, int hz)` | Sets up the display device with the given parameters. Returns bool. |
| `setScreenMode(int width, int height, int bpp, bool fullScreen, int hz)` | Sets the screen resolution and mode. Returns bool. |
| `setRes(int width, int height, int bpp, int hz)` | Shorthand for `setScreenMode`. |
| `getRes()` | Returns the current screen resolution as `"width height bpp"`. |
| `toggleFullScreen()` | Toggles between fullscreen and windowed mode. |
| `isFullScreen()` | Returns true if currently in fullscreen mode. |
| `switchBitDepth()` | Switches between 16 and 32 bpp (fullscreen only). |
| `prevResolution()` | Switches to the next lower resolution. |
| `nextResolution()` | Switches to the next higher resolution. |
| `getDisplayDeviceList()` | Returns a list of available display devices. |
| `getResolutionList()` | Returns a list of available resolutions for the current device. |
| `getVideoDriverInfo()` | Returns driver info for the current video device. |
| `isDeviceFullScreenOnly(string device)` | Returns true if the device only supports fullscreen. |
| `setVerticalSync(bool)` | Enables or disables vertical sync. Returns bool. |
| `videoSetGammaCorrection(float gamma)` | Sets the gamma correction value. |
| `getGLVendor()` | Returns the OpenGL vendor string. |
| `getGLRenderer()` | Returns the OpenGL renderer string. |
| `getGLVersion()` | Returns the OpenGL version string. |
| `getShaderVersion()` | Returns the GLSL shader version string. |
| `initializeShaderAssets()` | Reinitializes all shader assets. |
| `regenerateShadowMapFBOs()` | Regenerates shadow map framebuffer objects. |
| `setOpenGLMipReduction(int n)` | Sets mipmap reduction level for shape textures (0–5). |
| `setOpenGLSkyMipReduction(int n)` | Sets mipmap reduction for sky/cloud textures (0–5). |
| `setOpenGLTextureCompressionHint()` | Sets texture compression hint (`GL_DONT_CARE`, `GL_FASTEST`, `GL_NICEST`). |
| `setOpenGLAnisotropy(float)` | Sets the anisotropic filtering level (0–1). |
| `clearTextureHolds()` | Frees textures that are not currently in use. |
| `flushTextureCache()` | Flushes the texture cache. |
| `flushVBOCache()` | Flushes the vertex buffer object (VBO) cache. |
| `addMaterialMapping(string matName, ...)` | Adds a material surface mapping entry (sound, puff color). |
| `addCardProfile(...)` | Registers graphics card profile settings for a specific vendor/renderer. |
| `addOSCardProfile(...)` | Registers OS-level rendering preferences for a specific card. |
| `GLEW_ARB_shader_objects()` | Returns true if the GL extension is supported. |
| `GLEW_ARB_shading_language_100()` | Returns true if GLSL 1.00 is supported. |
| `GLEW_EXT_texture_array()` | Returns true if texture array extension is supported. |
| `GLEW_EXT_texture3D()` | Returns true if 3D texture extension is supported. |
| `GLEW_EXT_framebuffer_object()` | Returns true if FBO extension is supported. |
| `GLEW_ARB_shadow()` | Returns true if ARB shadow extension is supported. |
| `GLEW_ARB_texture_rg()` | Returns true if ARB red-green texture extension is supported. |
| `VBOSupport()` | Returns true if VBO (vertex buffer objects) are supported. |
| `png2jpg(string pngName, int quality)` | Converts a PNG file to JPEG at the given quality level. |
| `setDefaultFov(float)` | Sets the default camera field of view. |
| `setZoomSpeed(float)` | Sets the zoom speed in ms per 90-degree FOV change. |
| `setFov(float)` | Sets the current active camera FOV. |
| `getControlObjectAltitude()` | Returns the altitude of the player's controlled object above terrain. |
| `getControlObjectSpeed()` | Returns the speed of the player's controlled object. |
| `getFocusDistance()` | Returns the current depth-of-field focus distance. |
| `doScreenShot()` | Takes a screenshot and saves it to file. |
| `doDofScreenShot()` | Takes a depth-of-field screenshot. |
| `doPanoramaScreenShot()` | Takes a panoramic screenshot. |
| `doHudScreenshot()` | Takes a screenshot with the HUD visible. |
| `dofPreview()` | Toggles depth-of-field preview mode. |
| `screenShot(string file, string format, bool overwrite)` | Takes and saves a screenshot in JPG or PNG format. |
| `dofScreenShot(string file, string format, bool overwrite)` | Takes and saves a depth-of-field screenshot. |
| `panoramaScreenShot(string file, string format)` | Takes and saves a panoramic screenshot. |
| `setParticleDisconnectMode(val)` | Sets the particle disconnect mode. |
| `getParticleDisconnectMode()` | Returns whether particle disconnect mode is active. |

---

## Miscellaneous / Utility

| Function | Description |
|---|---|
| `getClipboard()` | Returns the current contents of the system clipboard. |
| `setClipboard(string text)` | Sets the system clipboard to the given text. |
| `gotoWebPage(string address)` | Opens the given URL in the user's default browser. |
| `purgeResources()` | Purges all cached resources from the resource manager. |
| `addFileToCache(string path)` | Adds a file to the blob database cache. |
| `snapshotGameAssets()` | Stores all current game assets in the blob database. |
| `getCacheBlobCount()` | Returns the number of files stored in the blob cache. |
| `setManifestDirty()` | Flags the file manifest as needing regeneration. |
| `clearManifest()` | Clears the current asset manifest. |
| `clearPendingBlobs()` | Clears all pending blob downloads. |
| `setCDNURL(string url)` | Sets the CDN base URL for asset downloads. |
| `getCDNURL()` | Returns the currently configured CDN URL. |
| `setLoginToken()` | Sets the login authentication token. |
| `getLoginToken()` | Returns the current login token. |
| `setDedicatedToken()` | Sets the dedicated server authentication token. |
| `getDedicatedToken()` | Returns the dedicated server token. |
| `deleteDataBlocks()` | Deletes all registered datablocks. |
| `getDataBlock(name)` | Returns a datablock by name. |
| `getDataBlockGroupSize()` | Returns the number of loaded datablocks. |
| `discoverFile(string path)` | Adds a file or zip to the resource manager. |
| `FreeMemoryDump()` | Prints free memory statistics to the console. |
| `ClearPhysicsCache()` | Clears cached physics data. |
| `reEnablePhysics()` | Re-enables physics simulation after it was disabled. |
| `onPhysicsDisabled()` | Callback fired when physics is disabled. |
| `applyPhysicsPrefs()` | Applies physics preference settings. |
| `amIDrivingAVehicle()` | Returns true if the local player is currently driving a vehicle. |
| `amIStrafeSteering()` | Returns true if the local player is using strafe steering. |
| `dumpAvatarSettings()` | Dumps the current avatar appearance configuration to the console. |
| `dumpAvatarSettings()` | Dumps the current avatar configuration to the console. |
| `applyDefaultCharacterPrefs()` | Applies default values to all character preference variables. |
| `applyCharacterPrefs()` | Applies saved character preferences to the local player. |
| `transferOldAvatarPrefs()` | Migrates preferences from an older save format to the current format. |
| `copyTextFile(src, dst)` | Copies a text file from source to destination. |
| `getOldSaves()` | Returns a list of save files from the legacy save directory. |
| `buildIFLs()` | Builds animated IFL texture definitions. |
| `buildstairs()` | Debug: spawns a set of stair bricks. |
| `buildFloor()` | Debug: spawns a floor of bricks. |
| `buildFloor2()` | Debug: spawns an alternate floor of bricks. |
| `buildwall()` | Debug: spawns a wall of bricks. |
| `buildConfetti()` | Debug: spawns confetti-style scattered bricks. |
| `stress()` | Debug: runs a stress test. |
| `SAD()` | Triggers super admin dialog. |
| `SADSetPassword()` | Sets the super admin password. |
| `auth_Init_Server()` | Initializes authentication on the server side. |
| `auth_Init_Client()` | Initializes authentication on the client side. |
| `getTimeString(int ms)` | Converts a millisecond value to a formatted time string. |
| `flushNamespaceCache()` | Clears the cached namespace lookups. |
| `isClean()` | |
| `resetAllOpCallFunc()` | |
| `ToggleBuildMacroRecording()` | Starts or stops recording a brick-placement macro. |
| `PlayBackBuildMacro()` | Plays back a previously recorded brick placement macro. |
| `snapToggle()` | Toggles snap-to-grid for brick placement. |
| `findclientbyname(string name)` | Returns the first client object with a matching name. |
| `createCanvas(string title)` | Creates the main game window with the given title. |
| `resetCanvas()` | Resets/reinitializes the game canvas. |
| `initCanvas()` | Initializes the canvas and GUI system. |
| `setShaderDefaults()` | Sets default shader parameters. |
| `vendorSpecificDefaults()` | Applies GPU vendor-specific rendering defaults. |
| `convertFile(src, dst)` | Converts a file from one format to another. |
| `sortList()` | Sorts a delimited list alphabetically. |
| `sortNumList()` | Sorts a delimited list numerically. |
| `updateListSort()` | Updates the sort state of a GUI list control. |

---

## Avatar / Character Customization

Functions used by the avatar editor GUI.

| Function | Description |
|---|---|
| `Avatar_UpdatePreview()` | Updates the avatar preview in the editor. |
| `Avatar_Randomize()` | Randomizes all avatar appearance settings. |
| `Avatar_GetRandomColor()` | Returns a random color for avatar use. |
| `Avatar_ColorAllIcons()` | Updates all color swatches in the avatar editor. |
| `Avatar_AssignColor()` | Assigns a selected color to the active body part slot. |
| `Avatar_SetFace(string name)` | Sets the face graphic in the avatar editor. |
| `Avatar_SetDecal(string name)` | Sets the torso decal in the avatar editor. |
| `Avatar_SetPack(string name)` | Sets the back pack in the avatar editor. |
| `Avatar_SetSecondPack(string name)` | Sets the secondary pack in the avatar editor. |
| `Avatar_SetHat(string name)` | Sets the hat in the avatar editor. |
| `Avatar_SetAccent(string name)` | Sets the accent in the avatar editor. |
| `Avatar_SetChest(string name)` | Sets the chest part in the avatar editor. |
| `Avatar_SetHip(string name)` | Sets the hip part in the avatar editor. |
| `Avatar_SetLArm(string name)` | Sets the left arm part in the avatar editor. |
| `Avatar_SetRArm(string name)` | Sets the right arm part in the avatar editor. |
| `Avatar_SetLHand(string name)` | Sets the left hand part in the avatar editor. |
| `Avatar_SetRHand(string name)` | Sets the right hand part in the avatar editor. |
| `Avatar_SetLLeg(string name)` | Sets the left leg part in the avatar editor. |
| `Avatar_SetRLeg(string name)` | Sets the right leg part in the avatar editor. |
| `Avatar_ClickTorsoColor()` | Handles a click on the torso color swatch. |
| `Avatar_ClickPackColor()` | Handles a click on the pack color swatch. |
| `Avatar_ClickSecondPackColor()` | Handles a click on the secondary pack color swatch. |
| `Avatar_ClickHatColor()` | Handles a click on the hat color swatch. |
| `Avatar_ClickAccentColor()` | Handles a click on the accent color swatch. |
| `Avatar_ClickHeadColor()` | Handles a click on the head color swatch. |
| `Avatar_ClickHipColor()` | Handles a click on the hip color swatch. |
| `Avatar_ClickRightLegColor()` | Handles a click on the right leg color swatch. |
| `Avatar_ClickRightArmColor()` | Handles a click on the right arm color swatch. |
| `Avatar_ClickRightHandColor()` | Handles a click on the right hand color swatch. |
| `Avatar_ClickLeftLegColor()` | Handles a click on the left leg color swatch. |
| `Avatar_ClickLeftArmColor()` | Handles a click on the left arm color swatch. |
| `Avatar_ClickLeftHandColor()` | Handles a click on the left hand color swatch. |
| `Avatar_TogglePartMenu(string part)` | Toggles the dropdown for a given body part selector. |
| `Avatar_HideAllPartMenus()` | Hides all open body part dropdowns. |
| `Avatar_Done()` | Confirms and saves the avatar customization. |
| `Avatar_Clean()` | Clears the avatar editor state. |
| `AvatarGui_LoadAccentInfo()` | Loads accent data into the avatar GUI. |
| `AvatarColorCheck()` | Validates avatar colors for compliance. |
| `AvatarColorCheckT()` | Validates avatar translucent colors. |
| `applyBodyColors()` | Applies stored color fields to the player model. |
| `applyBodyParts()` | Applies stored body part fields to the player model. |

---

## Admin Tools

| Function | Description |
|---|---|
| `listClients()` | Lists all connected clients with their BL_IDs and names. |
| `kickBLID(blid)` | Kicks a player by BL_ID. |
| `banBLID(blid)` | Bans a player by BL_ID. |
| `AdminGui_KickPlayer()` | Kicks the selected player via the admin GUI. |
| `AdminGui_BanPlayer()` | Bans the selected player via the admin GUI. |
| `AdminGui_ClearBricks()` | Clears the selected player's bricks via the admin GUI. |
| `AdminGui_Wand()` | Wands the selected player via the admin GUI. |
| `sendAdminLogin(password)` | Sends an admin login request to the server. |
| `CreateBanManager()` | Initializes the ban manager. |
| `serverCmdtogAdmin()` | Believed to toggle admin status on a target player. Has no visible effect when called on yourself; may require a target argument. |

---

## Uncategorized / Internal

These functions appear in the dump but their purpose is unclear or highly internal. Descriptions are omitted.

| Function |
|---|
| `E()` |
| `profileJazz()` |
| `writeFuncOffCheck()` |
| `New_QueueSO()` |
| `transmitDataBlocks()` |
| `doSACallback()` |
| `fillFileList()` |
| `Tree()` |
| `InspectApply()` |
| `inspect()` |
| `echoPointInBlob()` |
| `appendCrapOnCache()` |
| `addAllFilesToCache()` |
| `addAllFilesToCache_Tick()` |
| `shift()` |
| `two()` |
| `maze()` |
| `maze2()` |
| `clickSpam()` |
| `cacheImpactFont()` |
| `serverCmdTimeScale()` |
| `serverCmdDPB()` |
| `serverCmdMagicWand()` |
| `serverCmdRet()` |
| `serverCmdDFG()` |
| `serverCmdRayPZ()` |
| `serverCmdGetPZ()` |
| `serverCmdSetFocalPoint()` |
| `serverCmdSetPreviewCenter()` |
| `serverCmdClearPreviewCenter()` |
| `serverCmdSetMiniGameData()` |
| `ChangeRPVariable()` |
| `RP_GetStatVar()` |
| `RP_GetStatVarFromID()` |
| `RP_GetStatVarFromData()` |
| `TechEval()` |
| `contextHelp()` |
| `getHelp()` |
| `displayHelp()` |
| `parseArgs()` |
| `parseProtocol()` |
| `UpdaterRepoSO()` |
| `UpdaterAddOnSO()` |
| `updaterInterfaceDisplay()` |
| `updaterInterfacePushItem()` |
| `updaterInterfacePopItem()` |
| `updaterInterfaceSelectItem()` |
| `updaterInterfaceOnQueueEmpty()` |
| `statsAddToPostQueue()` |
| `statsPostAll()` |
| `clientCmdTutorialCompleted()` |
| `installPreLoadScriptLauncher()` |
| `debug_testx86unixmutex()` |
| `isKoreanBuild()` |
| `asciidump()` |
| `setRaytracerAutoCenter()` |
| `setRaytracerCenter()` |
| `startRaytracer()` |
| `stopRaytracer()` |
| `getRayTracerProgress()` |
| `setRayTracerWork()` |
| `setPreviewURL()` |
