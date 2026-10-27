---
title: Database Migrations
---

Use the MariaDB migration files under `gaseous-lib/Support/Database/MySQL` to introduce schema changes.

- Name each new migration `gaseous-NNNN.sql`.
- Pick the next unused numeric version.
- Do not rename, edit, or delete an existing migration after it has been merged.
- Put only the schema change for that version in the SQL file. If an older migration needs correction, add a new migration instead of changing history.

When a migration also needs application-side work:

- Add blocking pre-upgrade logic to `DatabaseMigration.PreUpgradeScript(version, ...)`.
- Add post-upgrade or data-fix logic to `DatabaseMigration.PostUpgradeScript(version, ...)`.
- Add at least one validation entry for the new version in `DatabaseMigrationManifest.BuildManifest()`.

Safety rules:

- `check-migration-scripts.yml` blocks modifications to historical `gaseous-*.sql` files.
- The same workflow fails if the newest SQL version has no manifest validation entry.
- `InitDB()` takes a backup before pending migrations run and records each step in `migration_journal`.

Recommended workflow:

1. Add `gaseous-NNNN.sql` under the MariaDB migration directory at `gaseous-lib/Support/Database/MySQL`.
2. Add any required pre/post C# migration logic.
3. Add validation entries for version `NNNN` in `DatabaseMigrationManifest.cs`.
4. Run the CLI migration command against a test database.
5. Verify the result with the CLI status and validation commands.

Useful commands:

```bash
dotnet run --project ./gaseous-cli/gaseous-cli.csproj -- db migrate
dotnet run --project ./gaseous-cli/gaseous-cli.csproj -- db validate
dotnet run --project ./gaseous-cli/gaseous-cli.csproj -- db status
```