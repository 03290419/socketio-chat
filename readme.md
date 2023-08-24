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
