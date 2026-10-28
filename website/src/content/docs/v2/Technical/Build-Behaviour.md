---
title: Build Behaviour
---

This page explains how Docker images are built, and how EmulatorJS assets are refreshed in CI.

## Docker image variants

The reusable workflow `._github/workflows/_build-docker-images.yml` builds and publishes two image variants:

* `standard` using `build/Dockerfile`
* `embeddeddb` using `build/Dockerfile-EmbeddedDB`

Both variants are built from a single staged source archive, so any generated content in staging is reused by both matrix jobs.

## EmulatorJS in Docker builds

Both Dockerfiles run:

* `bash build/scripts/get-ejs-git.sh`

This must remain in place so anyone cloning the repository can still build images locally without any extra setup.

The script is idempotent:

* If EmulatorJS cores already exist, it exits quickly without downloading again.
* If `FORCE_EJS_REFRESH=1` is set, it refreshes cores from source.

## CI refresh policy

The reusable workflow supports two policy inputs:

* `always_refresh_ejs` (boolean, default `false`)
* `ejs_cache_max_age_days` (number, default `7`)

### Nightly builds

Nightly builds use:

* `always_refresh_ejs: false`
* `ejs_cache_max_age_days: <configured value>`

Behavior:

1. Restore cached EmulatorJS assets in staging.
2. Compare cached submodule commit metadata (`.cache-submodule-commit`) with the current EmulatorJS gitlink commit in the repo.
3. If the submodule commit changed, always refresh and replace the cache contents.
4. Otherwise, read cache age metadata (`.cache-created-at-epoch`).
5. Refresh when cache age is at or above `ejs_cache_max_age_days`.
6. Save refreshed cache metadata and archive staging output.
7. Build both Docker variants from the same staged artifact.

This avoids downloading EmulatorJS twice in the matrix while still ensuring periodic refreshes.

You can override the age threshold in manual Nightly runs via workflow dispatch input `ejs_cache_max_age_days`.

### Pre-release and release builds

Tagged Docker builds use:

* `always_refresh_ejs: true`

Behavior:

* EmulatorJS is always refreshed during staging so release-tagged images include fresh assets.

## Summary

* Local builds remain self-contained because Dockerfiles always execute the EmulatorJS script.
* Nightly builds reduce repeated network work with age-based cache refresh.
* Pre-release and release builds always refresh EmulatorJS for freshness.
