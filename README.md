# Kaholo FTP Plugin
FTP (File Transfer Protocol) is a network protocol for transmitting files between computers using TCP/IP. This plugin extends Kaholo to include FTP upload and download. This plugin makes use of the npm package [basic-ftp](https://www.npmjs.com/package/basic-ftp).

A more reliable and secure way to transfer files is SCP (Secure copy using SSH). To do that consider using the [SSH Plugin](https://github.com/Kaholo/kaholo-plugin-ssh) instead.

## Access and authentication
The plugin supports FTP and FTP over TLS (FTPS). To access and authenticate a `username` and `password` are required. To use FTPS, it must be supported by the FTP server and backed by a valid TLS certificate. The FTP server can be identified by either Host name or IP address. FTP often listens on port 21, but if not an alternative port may be configured.

## Plugin Installation
For download, installation, upgrade, downgrade and troubleshooting of plugins in general, see [INSTALL.md](./INSTALL.md).

## JSON Output
When possible the Final Result of an execution will contain JSON output. This is done as a convenience should one wish to use the code layer to programmatically access the result and take action based on the outcome. For example, this function might be used to create a text message to send out to a Slack channel. The code that gets the result code from the FTP action is `kaholo.action.ftp1.result.code`.

    function resultMessage() {
        if (kaholo.action.ftp1.result.code == 226) {
            return "File successfully transferred by FTP."   
        }    
        return "Something when wrong with the FTP file transfer."
    }

The standard FTP text output will still be found in the Activity Log.

## Plugin Account
The authentication and access parameters are configured as a group in a Kaholo account. Accounts may be created one of two ways:
* In Settings | Plugins, the name of the plugin will display as a blue link that takes you to plugin settings. There a second tab is exposed to go to accounts, where the "Add Account" button allows creation of new Kaholo accounts.
* After adding an FTP action to a pipeline and selecting a method, the "Account" parameter appears in the configuration panel. One of the drop-down items available in this parameter is "Add New Plugin Account".

### Account Parameter: Username
This is the username of a valid FTP user account.

### Account Parameter: Password
This is the password of the same user account specified in "Username". The password must be stored in the Kaholo Vault so it is not displayed in the UI, log messages, or error messages.

### Account Parameter: Host
This is either the hostname or IP address of the FTP Server. The server must be resolvable (DNS) and reachable on the network by the Kaholo agent.

### Account Parameter: Port
This is the port on which the FTP server listens. By convention, FTP uses the well-known port 21.

### Account Parameter: Use FTP over TLS
If enabled, FTPS will be used instead of regular FTP. This is a more secure way to transfer files, but some FTP servers may not support it.

## Method: Upload
This method uploads a file or directory (recursively) from the Kaholo agent to the FTP server.

### Parameter: Local Path
The path to a file or directory on the Kaholo agent to upload. Either an absolute or relative path may be specified. Relative paths are relative to the default working directory on the Kaholo agent, e.g. `/twiddlebug/workspace`. Use the Command Line plugin with command `pwd` to find the default working directory if uncertain.

### Parameter: Remote Path
The path to a file or directory on the FTP server where the file or directory will be transferred by FTP. If no remote path is specified, the file or directory will be sent to the root directory on the FTP server.

### Parameter: Verbose Mode
If enabled, the plugin will send verbose output to the Activity log, which may be useful in diagnosing problems or more interesting to watch while the action is running.

## Method: Remove
This method deletes a file or directory (recursively) from the FTP server.

### Parameter: Remote Path
The path to a file or directory on the FTP server to remove.

### Parameter: Verbose Mode
If enabled, the plugin will send verbose output to the Activity log, which may be useful in diagnosing problems or more interesting to watch while the action is running.

## Method: Download
This method downloads a file or directory (recursively) from the FTP server to the Kaholo agent.

### Parameter: Remote File Path
The path to a file or directory on the FTP server to download to the Kaholo agent.

### Parameter: Local File Path
The path on the Kaholo agent to which the file or directory will be downloaded (recursively). If no local file path is given, it will be downloaded to the default working directory on the Kaholo agent, e.g. `/twiddlebug/workspace`. Use the Command Line plugin with command `pwd` to find the default working directory if uncertain.

### Parameter: Verbose Mode
If enabled, the plugin will send verbose output to the Activity log, which may be useful in diagnosing problems or more interesting to watch while the action is running.

## Method: List
This method lists a file or the files and subdirectories in a directory on the FTP server.

### Parameter: Remote Path
The path to a file or directory on the FTP server to list.

### Parameter: Verbose Mode
If enabled, the plugin will send verbose output to the Activity log, which may be useful in diagnosing problems or more interesting to watch while the action is running.
