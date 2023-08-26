# connection Event Handler

- `connection event handler function` 의 인자로 `socket`객체가 전달된다.
- `socket`객체는 개별 클라이언트와의 interacting을 위한 객체이다.
- `io` 객체는 연결된 전체 클라이언트와의 interacting을 담당한다.

`connect event`가 발생하면(즉, 클라이언트가 접속하면) 클라이언트가 전송한 메시지를 수신하거나 클라이언트에게 메시지를 전송한다.

### 클라이언트가 전송한 메시지 수신

현재 접속되어 있는 클라이언트로부터 메시지를 수신하기 위해서는 `on` 메서드를 사용한다.

| Parameter    | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| `event name` | 클라이언트가 메시지 송신 시 저장한 이벤트 명(string)                       |
| `function`   | 이벤트 핸들러. 핸들러 함수의 인자로 클라이언트가 송신한 메시지가 전달된다. |

```js
socket.on("event_name", (data) => {
  console.log("Message from Client:" + data);
});
```

### 클라이언트에게 메시지 송신

| Method                  | Description                                                                     |
| ----------------------- | ------------------------------------------------------------------------------- |
| `io.emit`               | 접속된 모든 클라이언트에게 메시지를 전송한다.                                   |
| `socket.emit`           | 메시지를 전송한 클라이언트에게만 메시지를 전송한다.                             |
| `socket.broadcast.emit` | 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에 메시지를 전송한다.        |
| `io.to(id).emit`        | 특정 클라이언트에게만 메시지를 전송한다. `id`는`socket` 객체의 `id` 속성값이다. |

| Parameter    | Description                   |
| ------------ | ----------------------------- |
| `event name` | 이벤트 명(string)             |
| `msg`        | 송신 메시지(string or object) |

```js
// 접속된 모든 클라이언트에게 메시지를 전송한다.
io.emit("event_name", msg);

// 메시지를 전송한 클라이언트에게만 메시지를 전송한다.
socket.emit("event_name", msg);

// 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다.
socket.broadcast.emit("event_name", msg);

// 특정 클라이언트에게만 메시지를 전송한다.
io.to(id).emit("event_name", data);
```

# 서버로의 메시지 송신

현재 접속되어있는 서버로 메시지를 송신하기 위해서는 `emit` 메서드를 사용한다.

| Parameter    | Description                   |
| ------------ | ----------------------------- |
| `event name` | 이벤트 명(string)             |
| `msg`        | 송신 메시지(string or object) |

```js
socket.emit("event_name", msg);
```

# 서버로부터의 메시지 수신

현재 접속되어 있는 서버로부터의 메시지를 수신하기 위해서는 `on` 메서드를 사용한다.

| Parameter    | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `event name` | 서버가 메시지 송신 시 지정한 이벤트 명(string)                       |
| `function`   | 이벤트 핸들러. 핸들러 함수의 인자에 서버가 송신한 메시지가 전달된다. |

```js
socket.on("event_name", (data) => {
  console.log(`Message from Server: ${data}`);
});
```

# Namespace

`socket.io`는 서로 다른 엔드포인트 또는 경로`path`에 할당하는 의미로 `socket`에 `namespace`를 지정할 수 있다.
`namespace`를 특별히 지정하지 않은 경우 `default namespace`인 `/`를 사용하게 된다.

```js
// server-side
var nsp = io.of("/my-namespace");
nsp.on("connection", (socket) => {
  console.log("someone connected");
});
nsp.emit("hi", "everyone");

// client-side
var socket = io("/my-namespace");
```

# Room

각 `namespace` 내에서 임의의 채널을 지정할 수 있다. 이를 `room`이라 하며 이를 통해 `room`에 `join`되어 있는 클라이언트 만의 데이터 송수신이 가능하다.

즉, 각 클라이언트는 `socket`을 가지게 되며 이 `socket`은 `namespace`를 가지고 각 `namespace`는 `room`을 가질 수 있다.

![room](https://poiemaweb.com/img/socketio-room.png)

각 `socket`은 **랜덤하고 유일하게 작성된 socket.id**로 구별된다. `socket.io`는 각 `socket`을 `socket.id`를 `room` 식별자로 사용하여 자동으로 `room`을 생성하고 `join` 시킨다.

특정 클라이언트에게만 메시지를 전송할 때 `io.to(id).emit`를 사용하는데 이것은 사실 디폴트로 생성되어 자동 `join`된 개별 `socket`의 `room`에 소속되어 있는 유일한 클라이언트에 메시지를 전송한다.

`room`에 `join`하기 위해서는 `join`메서드를 사용한다.
