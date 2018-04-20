# AjaxToSocket

Convert your ajax polling request to websocket. Acts like a middleman so that your endpoints will be like socket.

### Install and Run
---
```sh
$ git clone https://github.com/ejancorp/ajaxtosocket
$ cd ajaxtosocket
$ npm install
$ npm build
```

Copy ***.env.example*** as ***.env***

.env should contain
```
APP_PORT=8282
```
Run
```sh
$ npm start
```

### Run using Docker Compose
```sh
$ docker-compose up -d --build
```

### Test
```sh
$ npm run test
```

### Usage
```javascript
var socket = io.connect('http://localhost:8282', { query: "url=exampleapi.com/all&interval=3000" });

socket.on('response', function(data) {
    // to anything about the data
    console.log(data)
});
```

### Todos

 - Write MORE Tests
 - Accept POST Method
