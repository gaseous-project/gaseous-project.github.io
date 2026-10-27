---
title: Metadata
sidebar:
  # This sets the text for THIS specific page link inside the section
  label: Metadata
  # This forces the overview link to be the very first item under the heading
  order: 3
---

Metadata provides cover art, screenshots, etc for your ROMs.

Metadata is currently only supplied by IGDB, but more will be added in the future.

See https://github.com/gaseous-project/gaseous-server/wiki/ROM-Metadata-Matching for information how a ROM is matched to metadata.

# IGDB
1. Sign Up with Twitch for a free account
2. Ensure you have Two Factor Authentication enabled
3. Register your application in the Twitch Developer Portal
4. Give the application a unique name
5. Enter a URL and click Add - this URL does not need to be valid, just unique
6. Set a category
7. Set the Client Type to Confidential
8. Complete the Captcha
9. Click Create
10. Click Manage next to your newly created app
11. Your client ID will be displayed - this is akin to a user name.
12. Click New Secret - this will replace any existing secret, and is akin to a password. Note this secret is displayed only once.

There are two config.json options:
* ``igdbclientid`` should equal the above client ID
* ``igdbclientsecret`` should equal the above client secret