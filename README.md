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

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
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
