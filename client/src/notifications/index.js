const Service = require('hedera/Service');
const Propertiable = require("core/mixins/Propertiable")
const mixer = require("core/mixer")
const Array = require('core/types/Array')

class Notification extends mixer.extends([Propertiable]) {
  constructor(values) {
    super();
    Object.assign(this, values)
  }
  close() {
    if (this.isClosed) {
      return
    }
    this.isClosed = true
    setTimeout(() => {
      const index = service.notifications.indexOf(this)
      if (index === -1) {
        return
      }
      service.notifications.splice(index, 1)
    }, 500);
  }
}

Notification
  .define()
  .properties({
    isClosed: "number",
    message: "number",
  });

const types = {
  info: {
    icon: '<i class="fa-solid fa-circle-info"></i>',
  },
};

Object.entries(types).forEach(([name, type]) => {
  type.name = name;
});

const NotificationService = class extends Service {
  constructor() {
    super()
    this.notifications = new Array()
  }
  notify(notification) {
    notification.type = types[notification.type] || types.info
    notification = new Notification(notification)
    this.notifications.push(notification)
  }
}
  .define()
  .properties({
    notifications: "any",
  });

const service = new NotificationService()
module.exports = service;
