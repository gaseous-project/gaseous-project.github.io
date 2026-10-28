---
title: Background Services
---

Gaseous runs a number of background services to keep things running smoothly:

- **Metadata Refresh**: reloads the data from IGDB checking for new versions. For example; if the record in IGDB is updated with new cover art, or the summary changes, Gaseous learns about these changes when it's refreshed. It's a background task that shouldn't interfere with day to day running. It's set to run every 6 hours, but only updates those items that haven't been updated in the last 7 days. This is to prevent abusing the IGDB servers. No updating of matches is done with this process.
- **Rematcher**: This process goes back and looks at ROMs that have been marked as "Unknown", and attempts to reprocess them. Only processing files that haven't been processed in the last 30 days.
- **Signature Import**: Imports new DATs into the database. If you've already imported all of the available DATs you can safely disable this process.
- **Title Import**: scans the `~/.gaseous-server/Data/Import` directory for new files to import. This service is safe to disable if you don't import files this way.
- **Organise Library**: checks every file in the default library to ensure its path is correct, and moves it to where it needs to be. This is a housekeeping process that runs once a day to keep the default library tidy.
- **Library Scan**: checks every file in every library to see if it's still present. Files that are present on the disk, but not in the database are imported, while files that in the database, but not present on disk are removed.
- **Daily Maintenance**: cleans up temp directories, cleans up old logs. Only runs between 1am and 6am daily.
- **Weekly Maintenance**: optimises the database. Only runs on Monday mornings between 1am and 6am.

**Note**: all times above are in your servers local time.