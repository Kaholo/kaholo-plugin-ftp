# kaholo-plugin-ftp
FTP plugin for Kaholo.

## Settings
1. Username (String) **Optional** - The username of the default user to connect with. If not provided default is anonymous.
2. Password (Vault) **Optional** - The password of the default user to connect with.
3. Host (String) **Optional** - The address of the default FTP server to connect to.
4. Port (String) **Optional** - The port of the default FTP server to connect to. If not provided default is 21.
* Notice! fields 2 and 3 must be provided by either the settings or in the action parameters.

## Method: Upload File/Folder
Upload a single file or a folder to the FTP server.

### Parameters
1. Username (String) **Optional** - The username of the user to connect with.
2. Password (Vault) **Optional** - The password of the user to connect with.
3. Host (String) **Optional** - The address of the FTP server to connect to.
4. Port (String) **Optional** - The port of the FTP server to connect to.
5. Local Path (String) **Required** - The path of the file/folder to upload to the server.
6. Remote Path (String) **Required** - The path to save the file\folder in the sercer.

## Method: Remove File/Folder
Delete a file or folder from the specified FTP server.

### Parameters
1. Username (String) **Optional** - The username of the user to connect with.
2. Password (Vault) **Optional** - The password of the user to connect with.
3. Host (String) **Optional** - The address of the FTP server to connect to.
4. Port (String) **Optional** - The port of the FTP server to connect to.
5. Remote Path (String) **Required** - The path of the file/folder to delete.
6. Is Folder (Boolean) **Optional** - Is a directory or a single file. Default is false.

## Method: Download File
Download a file from the FTP server.

### Parameters
1. Username (String) **Optional** - The username of the user to connect with.
2. Password (Vault) **Optional** - The password of the user to connect with.
3. Host (String) **Optional** - The address of the FTP server to connect to.
4. Port (String) **Optional** - The port of the FTP server to connect to.
5. Remote Path (String) **Required** - The path of the file to download from the server.
6. Local Path (String) **Required** - The path to save the file in.

## Method: Download Folder
Download a folder from the FTP server.

### Parameters
1. Username (String) **Optional** - The username of the user to connect with.
2. Password (Vault) **Optional** - The password of the user to connect with.
3. Host (String) **Optional** - The address of the FTP server to connect to.
4. Port (String) **Optional** - The port of the FTP server to connect to.
5. Remote Path (String) **Required** - The path of the folder to download from the server.
6. Local Path (String) **Required** - The path to save the folder in.


## Method: List
List all files and folders in the specified path on the FTP server.

### Parameters
1. Username (String) **Optional** - The username of the user to connect with.
2. Password (Vault) **Optional** - The password of the user to connect with.
3. Host (String) **Optional** - The address of the FTP server to connect to.
4. Port (String) **Optional** - The port of the FTP server to connect to.
5. Remote Path (String) **Required** - The path of the folder to list it's contents.