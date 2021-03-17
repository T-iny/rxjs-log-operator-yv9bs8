import { Observable, Subject } from "rxjs";
import { scan, last, skip, take } from "rxjs/operators";

let msgs = ["1", "2", "3"];

let _handler;

let register = handler => {
  console.log(222);
  _handler = handler;
};

let unRegister = () => {
  _handler = null;
};

// let messages = from(msgs);
let messages = Observable.create(subscriber => {
  console.log("111");
  const handler = logs => subscriber.next(logs);
  register(handler);
  return unRegister;
});

console.log(333, _handler);

let push = message => {
  msgs.push(message);
  _handler(msgs);
};

messages.subscribe(messages => console.log(messages));

console.log(333, _handler);

push("4");
push("5");
push("6");
push("7");
push("7");
