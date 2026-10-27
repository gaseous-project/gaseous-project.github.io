---
title: Adding ROMs
sidebar:
  # This sets the text for THIS specific page link inside the section
  label: Adding ROMs
  # This forces the overview link to be the very first item under the heading
  order: 4
---

There are three ways to add ROMs to Gaseous:
* Web Upload
* Import directory
* Custom library

**Notes**
1. Files can be presented as either stand alone files, or as archives - zip, 7z, and RAR are supported
2. Name the file appropriately.
   * Attempting a search for the game name on https://www.igdb.com can help with file naming. If a hash search is unsuccessful, Gaseous will fall back to attempting to search by the file name.
3. Duplicate ROMs are not imported. If the hash of a ROM is already in the database, it will be skipped.

## Web Upload
1. Click the Upload button in the page banner
<img width="86" alt="Screenshot 2024-02-02 at 5 15 04 pm" src="https://github.com/gaseous-project/gaseous-server/assets/84688932/3ab228d0-260c-4a98-8f72-72c34d7e2ef3">

2. In the upload dialog, optionally set the platform drop down. This can help Gaseous to determine what platform the uploaded ROMs are for if a signature match is not possible.
<img width="748" alt="Screenshot 2024-02-02 at 5 16 24 pm" src="https://github.com/gaseous-project/gaseous-server/assets/84688932/7b886c91-bcf5-4ccb-b065-65db3645aacc">

3. To upload the ROMs click the "Drop files here to upload" button and select the files, or drag the ROMs into the dialog
4. The files will be uploaded and processed. These files go into the main managed library.

## Import Directory
1. Copy the ROMs to be added into the ``~/.gaseous-server/Data/Import`` directory
2. Once a minute a background task named "Title Import" will process these files and move them into the main managed library
3. Import errors are sent to the ``~/.gaseous-server/Data/Import Errors`` directory

## Custom Library
Gaseous can have one or more unmanaged custom libraries added. These are useful if you already have a collection of ROMs and don't want to duplicate them, or re-arrange them.

To add a custom library:
1. Ensure the server can see the files
  * this could be another location on your host, or a bind mount if using docker or docker-compose
  * also ensure that permissions are correct - it's recommended that the server only have read-only access to your files
2. Go to Settings in the banner
<img width="97" alt="Screenshot 2024-02-02 at 9 28 11 pm" src="https://github.com/gaseous-project/gaseous-server/assets/84688932/9a2e3342-edbb-4ad1-abc0-2480f2e9c288">

3. Go to Settings in the left hand navigation bar
<img width="163" alt="Screenshot 2024-02-02 at 9 29 14 pm" src="https://github.com/gaseous-project/gaseous-server/assets/84688932/cc29928c-964b-42df-a499-7c625ada437c">

4. Click the New Library button
5. The New Library dialog will appear
<img width="344" alt="Screenshot 2024-02-02 at 9 30 15 pm" src="https://github.com/gaseous-project/gaseous-server/assets/84688932/50cdb29c-d327-42a9-ac2f-34ceff363d46">

6. Give the library a name
7. Set the default platform for the ROMs found within
  * this helps Gaseous identify ROM files if it can't determine the platform
  * if the hash of a ROM file matches to a different platform, the matched platform is used rather than the default
8. Set the path to the ROM files
9. Click OK
10. The new library should be displayed under the default library
<img width="972" alt="Screenshot 2024-02-02 at 9 33 15 pm" src="https://github.com/gaseous-project/gaseous-server/assets/84688932/f6f7774b-8736-4874-8141-61ecd4035d1d">

11. If the library is incorrect, press the delete button on the right and try to recreate the library

**Notes**
* New libraries are not scanned immediately - they are only scanned when the Library Scan process is running.
* The Library Scan process can be started manually by:
  1. Go to the System page under settings
  2. Find the process "Library Scan" in the list
  3. Click Start on the right
* Depending on the size of the library, it may take some time for Gaseous to identify all the files within