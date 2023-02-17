## [백엔드 빌드 방법]

<img src="./img/1">

STS에서 하단에 ‘Gradle Tasks’를 클릭하여 ‘build’를 누릅니다.

(만약 이전에 빌드한 내역이 있다면 build파일 삭제를 위해 clean을 먼저 누릅니다.)

<img src="./img/2">

빌드가 성공적으로 완료되면 위와 같이 빌드가 성공합니다.

<img src="./img/3">

프로젝트의 root에 “Dockerfile”을 생성해 아래와 같이 작성합니다.

```jsx
FROM openjdk:17-alpine

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

터미널 창에서 프로젝트 경로의 /DGRR/backend/DGRR로 이동합니다.

<img src="./img/4">

```jsx
docker build -t yuhyeongeun/dgrr:spring-deplpoy .
```

위의 명령어를 입력하여 docker image로 build합니다.

docker hub에 빌드한 이미지를 업로드 하기위해 아래의 그림처럼 입력합니다

```jsx
docker push yuhyeongeun/dgrr:spring-deploy
```

<img src="./img/5">

<img src="./img/6">

docker hub에서 위와 같이 확인할 수 있다.

## [프론트엔드 빌드 방법]

프로젝트 root에 아래와 같이 “Dockerfile”을 작성한다.

```jsx
FROM nginx:stable-alpine

WORKDIR /app

RUN mkdir ./build

ADD ./build ./build

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

프로젝트 root에 아래와 같이 “nginx.conf”파일을 생성한다.

```jsx
server {
    listen 3000;
    location / {
        root /app/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

<img src="./img/7">

vscode에서 “npm run build”를 입력합니다.

<img src="./img/8">

성공적으로 빌드가 되면 위와 같은 문구가 출력됩니다.

<img src="./img/9">

이제 터미널에서 위의 경로로 이동하고 아래의 명령어를 실행하여 docker image를 빌드합니다.

```jsx
docker build -t yuhyeongeun/dgrr:front-deploy
```

<img src="./img/10">

docker hub에 빌드한 이미지를 업로드 하기위해 아래의 그림처럼 입력합니다

```jsx
docker push yuhyeongeun/dgrr:front-deploy
```

docker hub에 잘 올라간것을 확인할 수 있다.

<img src="./img/11">

## [EC2에 Docker Image 베포]

### [mysql]

```jsx
docker pull mysql:latest
docker run -p 3306:3306 --name mysql [이미지 아이디]
```

### [nginx default]

```jsx
server {
        server_name i8b102.p.ssafy.io; # managed by Certbot

	    location /{
                proxy_pass http://localhost:3000;
        }

        location /login{
                proxy_pass http://localhost:8080/login;
        }
        location /api/v1 {
                proxy_pass http://localhost:8080;
         }
        location /dashboard {
                proxy_pass http://localhost:8443/dashboard;
		listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/i8b102.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i8b102.p.ssafy.io/privkey.pem; # managed by Certbot

}
server {
    if ($host = i8b102.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        listen 80 ;
        listen [::]:80 ;
    return 404; # managed by Certbot

```

### [Back , Front Docker Run]

<img src="./img/12">

위에서 업로드했던 프론트엔드 image를 ec2 도커 환경에 pull합니다.

```jsx
sudo docker pull yuhyeongeun/dgrr:front-deploy
```

<img src="./img/13">

위에서 업로드했던 프론트엔드 image를 ec2 도커 환경에 pull합니다.

```jsx
sudo docker pull yuhyeongeun/dgrr:spring-deploy
```

아래의 명령어를 입력하여 이미지가 제대로 pull 되었는지 확인합니다.

```jsx
sudo dockerk images
```

<img src="./img/15">

docker image를 실행하기 위해 아래와 같이 입력합니다.

-p 옵션으로 바인딩할 port를 작성하고 —name 옵션으로 이름을 작성합니다.

<img src="./img/16">

<img src="./img/17">

성공적으로 run이 진행됨을 알 수 있습니다.

<img src="./img/18">
