import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";

import {  users as members, sales as members2, interactionss as inter
} from "../../common/data"

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

  mock.onGet(url.GET_USERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (members) {
          resolve([200, members]);
        } else {
          reject([400, "Cannot get users"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_USER).reply(user => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot add user"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_USER).reply(user => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot update user"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_USER).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          resolve([200, config.headers.user]);
        } else {
          reject([400, "Cannot delete user"]);
        }
      });
    });
  });

  mock.onGet(url.GET_SALES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (members2) {
          resolve([200, members2]);
        } else {
          reject([400, "Cannot get sales"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_SALE).reply(sale => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sale && sale.data) {
          resolve([200, sale.data]);
        } else {
          reject([400, "Cannot add sale"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_SALE).reply(sale => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sale && sale.data) {
          resolve([200, sale.data]);
        } else {
          reject([400, "Cannot update sale"]);
        }
      });
    });
  });

  mock.onGet(url.GET_INTERACTIONS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(inter)

        if (inter) {
          resolve([200, inter]);
        } else {
          reject([400, "Cannot get interactions"]);
        }
      });
    });
  });
  
  mock.onPost(url.ADD_NEW_INTERACTION).reply(interaction => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (interaction && interaction.data) {
          resolve([200, interaction.data]);
        } else {
          reject([400, "Cannot add interaction"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_INTERACTION).reply(interaction => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (interaction && interaction.data) {
          resolve([200, interaction.data]);
        } else {
          reject([400, "Cannot update note"]);
        }
      });
    });
  });

};




export default fakeBackend;
