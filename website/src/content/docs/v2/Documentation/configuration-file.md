---
title: Configuration File
---

When Gaseous-Server is started for the first time, it creates a configuration file at ~/.gaseous-server/config.json if it doesn't exist. Some values can be filled in using environment variables (such as in the case of using docker).

## DatabaseConfiguration
| Attribute | Environment Variable | Default Value |
| --------- | -------------------- | ------------- |
| HostName  | dbhost               | localhost     |
| UserName  | dbuser               | gaseous       |
| Password  | dbpass               | gaseous       |
| DatabaseName | dbname            | gaseous       |
| Port      | dbport               | 3306          |

## MetadataConfiguration
| Attribute | Environment Variable | Possible Values | Default Value |
| --------- | -------------------- | --------------- | ------------- |
| DefaultMetadataSource | metadatasource  | IGDB<br />TheGamesDB<br />None            | IGDB          |
| SignatureSource | signaturesource | LocalOnly<br />Hasheous     | LocalOnly     |
| HasheousHost | hasheoushost |     | https://hasheous.org/ |
| HasheousAPIKey | hasheousapikey | | |
| HasheousSubmitFixes | hasheoussubmitfixes | true/false | false |

### Notes
* SignatureSource: governs where Gaseous will look for ROM hash signatures (typically from DATs):
  * LocalOnly (default): sets Gaseous to only look in the local database for DATs. You will need to import the DATs yourself (see: [](/v2/user-guides/signatures/#local-signatures))
  * Hasheous: sets Gaseous to also refer to the Hasheous service when attempting to match a signature (see: [](/v2/user-guides/signatures#hasheous), and the Hasheous project: https://github.com/gaseous-project/hasheous)
* HasheousHost: sets the host that Gaseous will use for the Hasheous service (see: [](/v2/user-guides/signatures#hasheous))
* HasheousAPIKey: sets the user API key that Gaseous should use to communicate with Hasheous
* HasheousSubmitFixes: enables Gaseous to submit library fixes to Hasheous - for example; if a ROM is incorrectly matched, Gaseous can submit your fix to Hasheous. Requires `HasheousAPIKey` to be configured.

## IGDBConfiguration
| Attribute | Environment Variable |
| --------- | -------------------- |
| ClientId  | igdbclientid         |
| Secret.   | igdbclientsecret     |
| UseHasheousProxy | igdbusehasheousproxy |

See [](/v2/user-guides/metadata#igdb) for information on configuring these attributes.

## SocialAuthConfiguration
| Attribute | Environment Variable |
| --------- | -------------------- |
| PasswordLoginEnabled | passwordloginenabled |
| GoogleClientId | googleclientid |
| GoogleClientSecret | googleclientsecret |
| MicrosoftClientId | microsoftclientid |
| MicrosoftClientSecret | microsoftclientsecret |
| OIDCAuthority | oidcauthority |
| OIDCClientId | oidcclientid |
| OIDCClientSecret | oidcclientsecret |

See [](/v2/documentation/authentication) for information on configuring these attributes.

## LoggingConfiguration
| Attribute | Environment Variable | Possible Values | Default Value |
| --------- | -------------------- | --------------- | ------------- |
| DebugLogging | debuglogging | true/false | false |
| LogRetention | logretention | integer | 7 |
| AlwaysLogToDisk | alwayslogtodisk | true/false | false |

### Notes
* DebugLogging: if true, debug logs will be written to disk - this includes raw sql. It is recommended that this option remain false.
* LogRetention: an integer defining how long log entries will be retained for.
* AlwaysLogToDisk: if true, logs will be written to the disk only and not to the database.

## Example config.json
```json
{
  "DatabaseConfiguration": {
    "HostName": "localhost",
    "UserName": "gaseous",
    "Password": "gaseous",
    "DatabaseName": "gaseous",
    "Port": 3306
  },
  "MetadataConfiguration": {
    "DefaultMetadataSource": "IGDB",
    "SignatureSource": "Hasheous",
    "HasheousSubmitFixes": false,
    "HasheousAPIKey": "",
    "HasheousHost": "https://hasheous.org"
  },
  "IGDBConfiguration": {
    "ClientId": "<clientid>",
    "Secret": "<secret>",
    "UseHasheousProxy": true
  },
  "SocialAuthConfiguration": {
    "PasswordLoginEnabled": false,
    "GoogleClientId": "",
    "GoogleClientSecret": "",
    "MicrosoftClientId": "",
    "MicrosoftClientSecret": "",
    "OIDCAuthority": "",
    "OIDCClientId": "",
    "OIDCClientSecret": ""
  },
  "LoggingConfiguration": {
    "DebugLogging": false,
    "LogRetention": 7,
    "AlwaysLogToDisk": false
  },
  "ReverseProxyConfiguration": {
    "KnownProxies": [],
    "KnownNetworks": [],
    "RequireHeaderSymmetry": false
  },
  "ServerPort": 5198,
  "LocalCommsPort": 5197,
  "ServerLanguage": "en-AU"
}
```