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