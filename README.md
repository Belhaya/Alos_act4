# Alos_act4


## Run 
We can  run the whole system  with this command:
```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images .

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop 
Stopping all the running containers with this command:
```bash
docker-compose down
```

stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use this command:
```bash
docker-compose down --rmi all
```
## Port of programmes_ui
```bash
localhost:8888
```
## Port of programmes_api
```bash
localhost:6868
```
## Database
```bash
docker exec -it mysqldb_1 bin/bash
```
```bash
mysql -uroot -p123456
```

```bash
 use programmes_db;
```


