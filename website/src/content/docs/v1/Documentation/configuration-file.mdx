---
title: Configuration File
---

When Gaseous-Server is started for the first time, it creates a configuration file at ~/.gaseous-server/config.json if it doesn't exist. Some values can be filled in using environment variables (such as in the case of using docker).

### DatabaseConfiguration
| Attribute | Environment Variable | Default Value |
| --------- | -------------------- | ------------- |
| HostName  | dbhost               | localhost     |
| UserName  | dbuser               | gaseous       |
| Password  | dbpass               | gaseous       |
| DatabaseName | dbname            | gaseous       |
| Port      | dbport               | 3306          |

### MetadataConfiguration
| Attribute | Environment Variable | Possible Values | Default Value |
| --------- | -------------------- | --------------- | ------------- |
| DefaultMetadataSource | metadatasource  | IGDB<br />TheGamesDB<br />None            | IGDB          |
| SignatureSource | signaturesource | LocalOnly<br />Hasheous     | LocalOnly     |
| HasheousHost | hasheoushost |     | https://hasheous.org/ |

#### Notes
* DefaultMetadataSource is reserved for future use - currently only IGDB is available
* SignatureSource governs where Gaseous will look for ROM hash signatures (typically from DATs):
  * LocalOnly (default): sets Gaseous to only look in the local database for DATs. You will need to import the DATs yourself (see: [](/v1/user-guides/signatures/#local-signatures))
  * Hasheous: sets Gaseous to also refer to the Hasheous service when attempting to match a signature (see: [](/v1/user-guides/signatures#hasheous), and the Hasheous project: https://github.com/gaseous-project/hasheous)
* HasheousHost: sets the host that Gaseous will use for the Hasheous service (see: [](/v1/user-guides/signatures#hasheous))

### IGDBConfiguration
| Attribute | Environment Variable |
| --------- | -------------------- |
| ClientId  | igdbclientid         |
| Secret.   | igdbclientsecret     |
| UseHasheousProxy | igdbusehasheousproxy |

See [](/v1/user-guides/metadata#igdb) for information on configuring these attributes.

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
    "MetadataSource": "IGDB",
    "SignatureSource": "LocalOnly",
    "MaxLibraryScanWorkers": 4,
    "HasheousHost": "https://hasheous.org/"
  },
  "IGDBConfiguration": {
    "ClientId": "<clientid>",
    "Secret": "<secret>"
  },
  "LoggingConfiguration": {
    "DebugLogging": false,
    "LogRetention": 7,
    "AlwaysLogToDisk": false
  }
}

```