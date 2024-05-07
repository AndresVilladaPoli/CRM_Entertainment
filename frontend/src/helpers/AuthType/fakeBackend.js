import axios from "axios";
import MockAdapter from "axios-mock-adapter";


let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@example.com",
  },
];

const fakeBackend = () => {
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

 

  mock.onPost("/post-fake-login").reply(config => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  

};

export default fakeBackend;
