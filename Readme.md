## インストール手順
`$ git clone`

`docker-compose.yml`を編集してコマンド部分をコメントアウト
```
# command: sh -c "cd /app/amongus-tool && yarn start"
```

`$ docker-compose up -d`

`$ docker exec -it amongus-react-firebase_web_1 sh`

`$ cd amongus-tool`
`$ yarn install`
`$ exit`


`docker-compose.yml`のコメントアウトした部分を元に戻す
```
command: sh -c "cd /app/amongus-tool && yarn start"
```

`$ docker-compose stop`
`$ docker-compose up -d`

test2