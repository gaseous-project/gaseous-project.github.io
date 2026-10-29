---
title: Signatures (DATs)
sidebar:
  # This sets the text for THIS specific page link inside the section
  label: Signatures (DATs)
  # This forces the overview link to be the very first item under the heading
  order: 2
---

Signatures are used to match a ROM to a game name using the hash of the ROM (MD5 or SHA1). Without access to a signature database, Gaseous will attempt to "guess" the game name from the file name.

## Hasheous

Using Hasheous as the signature source enables Gaseous to reach out to the Hasheous API to identify a large number of ROMs, ISOs, CHD's, etc. and is completely free to access.

More information about Hasheous can be found at https://hasheous.org

This is the recommended option.

## Local Signatures

Currently supported DAT's:
* TOSEC: https://www.tosecdev.org/downloads/category/56-2023-01-23
* MAME Arcade and MAME Mess: https://www.progettosnaps.net/dats/MAME
* No-Intro: https://no-intro.org - both standard XML and DB
* Redump: http://redump.org/downloads/

If there are other DAT's you'd like to see support for, please raise an issue with a link to the DAT's.

### Adding signature DAT files to the local database
#### TOSEC
1. Download the DAT files from the source website. For example; from https://www.tosecdev.org/downloads/category/56-2023-01-23
2. Extract the archive
3. Copy the DAT files to ``~/.gaseous-server/Data/Signatures/TOSEC/``

#### MAME Arcade
1. Download the DAT files from the source website. For example; from https://www.progettosnaps.net/dats/MAME
2. Extract the archive
3. Copy the file name ``MAME 0.257 (arcade).dat`` files to ``~/.gaseous-server/Data/Signatures/MAME Arcade/``

#### MAME MESS
1. Download the DAT files from the source website. For example; from https://www.progettosnaps.net/dats/MAME
2. Extract the archive
3. Copy the file name ``MAME 0.257 (mess).dat`` files to ``~/.gaseous-server/Data/Signatures/MAME MESS/``

#### No-Intro
1. Go to https://datomatic.no-intro.org/index.php?page=download&s=64&op=daily
2. Leave all options as default
3. Click request to download the Standard XML DATs
4. Go to https://datomatic.no-intro.org/index.php?page=download&s=64&op=daily
5. Change type to DB, leave all other options as default
6. Click request to download the DB files
7. Extract the "No-Intro Love Pack (Standard)"
8. Copy the *.dat files from the `No-Intro` folder within to `~/.gaseous-server/Data/Signatures/NoIntro/DAT/` directory
9. Extract the "No-Intro Love Pack (DB Export)"
10. Copy the *.xml files from the `No-Intro` folder within to `~/.gaseous-server/Data/Signatures/NoIntro/DB/` directory

### Redump
1. Go to http://redump.org/downloads/
2. Click the "Datfile" link for each platform to download
3. For each Datfile downloaded, extract the contents (there should be only one .dat file inside)
4. Copy the .dat file to `~/.gaseous-server/Data/Signatures/Redump/` directory
