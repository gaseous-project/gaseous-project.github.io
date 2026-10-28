---
title: Network Requirements
---

Below is a listing of network ports and destinations required by the Gaseous-Server Docker containers.

The listing is based on the default docker-compose configuration provided here: [](/v2/user-guides/installation)

## Incoming

| External port | Internal port | Purpose |
| ------------- | ------------- | ------- |
| 5198          | 80            | Allow external HTTP connections to the server |

## Outgoing

| Remote host | Port | Purpose |
| ----------- | ---- | ------- |
| id.twitch.tv | 443 | IGDB Authentication |
| api.igdb.com | 443 | Required to fetch metadata via the IGDB API |
| hasheous.org | 443 | Hash lookup, and IGDB metadata proxy (coming in Gaseous 1.8) |

## Inter-Container

> Not required when using the all in one image

| Container | Port | Purpose |
| --------- | ---- | ------- |
| gsdb      | 3306 | Required for MariaDB access |