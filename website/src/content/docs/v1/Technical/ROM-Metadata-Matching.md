---
title: ROM Metadata Matching
---

Image to game matching follows the following order of operations, stopping the process at the first match:
### Get the file signature
1. Collect the MD5 and SHA1 hashes for the ROM to be processed
2. Check the local database for a match (see: https://github.com/gaseous-project/gaseous-server/wiki/Signatures#local-signatures)
3. If enabled; check the configured alternative signature source (see: https://github.com/gaseous-project/gaseous-server/wiki/Signatures#other-signature-sources)
  * The [Hasheous](https://github.com/gaseous-project/gaseous-server/wiki/Signatures#hasheous) signature provider is capable of responding with a metadata match. If so, the matching process ends here and the value from Hasheous is used.
4. Attempt to parse the file name - clues such as the extension being used to define which platform the file belongs to are used to create a search criteria

**Note:** Sometimes the hash can not be matched as a highscore table for example was saved to the image

**Note**: If the file being scanned is an archive (zip, 7z, and rar are supported), the file will be extracted and searched. The first file whose signature can be found will be used to match the entire archive - be sure that the archive only contains files related to one game.

### Create a list of search candidates
Before beginning, remove any version numbers, and anything in the search string that is between ()
1. Add the full name of the image
2. Add the name of the image with any " - " replaced by ": "
3. Add the name of the image with text after a " - " removed
4. Add the name of the image with text after a ": " removed

### Search IGDB for a game match
Loop through each of the search candidates searching using:
1. "where" - exact match as the search candidate
2. "wherefuzzy" - partial match using wildcards
3. "search" - uses a more flexible search method

**Note**: If more than one result is found, the search will loop through the returned results:
* If an exact (case-insensitive) match is found, that result is used for the match
* If still no match, the image will be set as "Unknown" as there is no way for Gaseous to know which title is the correct one.