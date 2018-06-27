import {gotoLogin} from "../../../lib/utils";

export default {
  name: 'loginHandler',
  handle(data, app, callback) {
    gotoLogin()
  }
}