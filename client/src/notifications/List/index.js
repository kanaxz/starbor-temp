const Component = require("@core/Component");
const template = require("./template.html");
const service = require("../index");
require("./style.scss");


module.exports = class NotificationsList extends Component {
  constructor() {
    super()
    this.service = service 
  }
}

  .define({
    name: "app-notifications-list",
    template,
  });
