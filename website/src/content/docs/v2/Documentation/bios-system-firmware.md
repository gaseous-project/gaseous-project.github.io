---
title: BIOS/System Firmware
---

Some of the emulators require a BIOS file in order to run.

When adding ROMs, Gaseous checks the file hash against a list of known BIOS files for each system that the emulator supports.

You can find a list of these BIOS file hashes by going to Settings and then Firmware. This page will also display BIOS availability.

When the emulator is started for a system, all of the available BIOS files are zipped and made available for the emulator to use. This helps to ensure that the game you're trying to run will start properly by ensuring that any required BIOS files are available.

## Advanced

The list of BIOS files is embedded within Gaseous and is only updated when a new version is released. If you have a requirement to modify this list, it can be modified by:
* Going to Settings
* Clicking Firmware
* Select the platform to edit
* Scroll to the bottom of the page and add or remove BIOS file names and hashes

*Note:* Some emulators require the file name to match a specific string, so ensure the file name is correct.

### File System Storage

Uploaded BIOS files are deduplicated when saved, and saved using the file hash as their file name into the `~/.gaseous-server/Data/Firmware`.