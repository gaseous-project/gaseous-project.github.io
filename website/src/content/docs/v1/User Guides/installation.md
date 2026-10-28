---
title: Installation Guide
description: Quick setup guide for installing Gaseous
sidebar:
  order: 2
---

## Prerequisites for all deployment types

* An IGDB API key. See [](/v1/user-guides/metadata#igdb) for instructions on creating an API key.

## Installation

### Docker

#### Deploy as separate containers (preferred)

> Note: The container's internal data directory changed from `/root/.gaseous-server` to `/home/gaseous/.gaseous-server` in version 2. When upgrading, please update your `docker-compose.yml` volume mapping and rename/move any existing data directory before starting or upgrading.

1. Create a new directory on your host named `gaseous`
2. Enter `cd gaseous` to move into the `gaseous` directory
3. Enter `nano docker-compose.yml` (or your favourite text editor) to create a new `docker-compose.yml` file
4. Paste the following Docker Compose yaml into the file:
```yaml
version: '2'
services:
  gaseous-server:
    container_name: gaseous-server
    image: gaseousgames/gaseousserver:latest
    restart: unless-stopped
    networks:
      - gaseous
    depends_on:
      - gsdb
    ports:
      - 5198:80
    volumes:
      - gs:/home/gaseous/.gaseous-server
    environment:
      - TZ=Australia/Sydney
      - dbhost=gsdb
      - dbuser=root
      - dbpass=gaseous
      - igdbclientid=<clientid>
      - igdbclientsecret=<clientsecret>
  gsdb:
    container_name: gsdb
    image: mariadb
    restart: unless-stopped
    networks:
      - gaseous
    volumes:
      - gsdb:/var/lib/mysql
    environment:
      - MARIADB_ROOT_PASSWORD=gaseous
      - MARIADB_USER=gaseous
      - MARIADB_PASSWORD=gaseous
networks:
  gaseous:
    driver: bridge
volumes:
  gs:
  gsdb:
```
5. Edit the environment variables igdbclientid and igdbclientsecret to the values retrieved from your IGDB account (see: [](/v1/user-guides/metadata) for details on creating your IGDB key). Other environment variables that can be configured can be found here: [](/v1/documentation/configuration-file)
6. Save and close the file
7. Run the command ```docker-compose up -d```
8. Connect to the host on port 5198

#### Deploy the all in one container

**Note:** This container contains a MariaDB instance built in and is intended for use on systems that do not easily allow multiple containers such as Unraid. It is not recommended that this image be used if you have the choice as the built in MariaDB instance is only updated when the image is published, which may be a security risk.

1. Create a new directory on your host named `gaseous`
2. Enter `cd gaseous` to move into the `gaseous` directory
3. Enter `nano docker-compose.yml` (or your favourite text editor) to create a new `docker-compose.yml` file
4. Paste the following Docker Compose yaml into the file:
```yaml
version: '2'
services:
  gaseous-server:
    container_name: gaseous-server
    image: gaseousgames/gaseousserver:latest-embeddeddb
    restart: unless-stopped
    networks:
      - gaseous
    ports:
      - 5198:80
    volumes:
      - gs:/home/gaseous/.gaseous-server
      - gsdb:/var/lib/mysql
    environment:
      - TZ=Australia/Sydney
      - PUID=1000
      - PGID=1000
      - igdbclientid=<clientid>
      - igdbclientsecret=<clientsecret>
networks:
  gaseous:
    driver: bridge
volumes:
  gs:
  gsdb:
```
5. Edit the environment variables igdbclientid and igdbclientsecret to the values retrieved from your IGDB account (see: [](/v1/user-guides/metadata) for details on creating your IGDB key). Other environment variables that can be configured can be found here: [](/v1/documentation/configuration-file)
6. Save and close the file
7. Run the command ```docker-compose up -d```
8. Connect to the host on port 5198

### Source

#### Build and deploy from source

1. Install and configure a MariaDB or MySQL instance - this is beyond the scope of this document
2. Install the dotnet 7.0 packages appropriate for your operating system
    * See: https://learn.microsoft.com/en-us/dotnet/core/install/linux
3. Create a database user with permission to create a databse. Gaseous will create the new database and apply the database schema on it's first startup.
4. Clone the repo with ```git clone https://github.com/gaseous-project/gaseous-server.git```
5. Change into the gaseous-server directory
6. As the main branch is the development branch, you might want to change to a stable version - these are tagged with a version number. For example to change to the 1.5.0 release, use the command ```git checkout v1.5.0```
    * Check the releases page for the version you would like to run: https://github.com/gaseous-project/gaseous-server/releases
7. Download the emulator files from ```https://cdn.emulatorjs.org/releases/4.0.9.zip``` and extract the files to ```gaseous-server/wwwroot/emulators/EmulatorJS```
8. Create a directory in the home directory of the user that will run the server. For example, if running as the user ```gaseous```, create the directory ```/home/gaseous/.gaseous-server```
9. Change into the ```.gaseous-server``` directory created in the previous step
10. Copy the JSON from the config file above into a new file named ```config.json```
11. Update the database section with the database server hostname, username, password, and port. A full description of the configuration options can be found here: [](/v1/documentation/configuration-file)
12. Compile the server by changing back to the repo cloned earlier and executing:
    * ```dotnet restore "gaseous-server/gaseous-server.csproj"```
    * ```dotnet publish "gaseous-server/gaseous-server.csproj" --use-current-runtime --self-contained false -c Release -o <output directory>```
    * replace ```<output directory>``` with the directory of your choosing. The compiled application will be copied there. For this example we'll use ```/opt/gaseous-server```
13. Download the EmulatorJS package from https://cdn.emulatorjs.org/releases/4.0.9.7z and extract the contents to the ``/opt/gaseous-server/wwwroot/emulators/EmulatorJS`` directory
14. The server can then be started by executing ```dotnet /opt/gaseous-server/gaseous-server.dll```
    * If you would like the server to run on a different ip address and port (for example 0.0.0.0:8080), add the --urls argument: ```dotnet /opt/gaseous-server/gaseous-server.dll --urls http://0.0.0.0:8080```

#### Updating from source

1. Stop the server
2. Switch to the source directory
3. Update your repo:
    * If running from the main branch, run ```git pull``` to update the repo
    * If running from another branch or tag, run:
      * ```git fetch```
      * ```git checkout <branch or tag name>```
4. Run steps 12 and 13 from the above Build guide

### Deploy to Unraid

With thanks to [Tom1243](https://github.com/Tom1243) for building this process.

These steps describe a FRESH INSTALL. REMOVE ANY OLD CONTAINERS AND old APPDATA if you had any other attempts.

1. Download the `gaseousserver.xml` file from https://github.com/gaseous-project/unraid-template
2. In Main -> BootDevice -> config -> plugins -> dockerMan -> templates-user click UPLOAD (at the bottom) then select the gaseousserver.xml file
3. In Docker click ADD CONTAINER, select a template, make one of the Gaseous. Click APPLY.
