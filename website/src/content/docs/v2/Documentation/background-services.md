---
title: Background Services
---

Gaseous runs a number of background services to keep things running smoothly:

| Service | Function |
| ------- | -------- |
| Library Scan | Scans the library for new and missing ROMs, making the required changes to the database |
| Metadata Refresh | Refreshes both signature and metadata data for all ROMs that have been loaded into Gaseous. It runs periodically to keep the signature and metadata data up to date. When run manually, a full refresh is forced for all ROMs. |
| Organise Library | Checks all files in the default library to ensure that their paths are correct, moving files as required. |
| Signature Import | Scans the signatures directory for new DATs. Not required when using Hasheous as the signature source. |
| Temporary Directory Cleanup | Monitors Gaseous temporary directories for old unused files and cleans them up. |
| Title Import | Scans the ROM import directory `~/.gaseous-server/Data/Import` for new ROMs to import. |
| Daily Maintenance | Cleans up temp directories, cleans up old logs. Only runs between 1am and 6am daily. |
| Weekly Maintenance | Optimises the database. Only runs on Monday mornings between 1am and 6am. |