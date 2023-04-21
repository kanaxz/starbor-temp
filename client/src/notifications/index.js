const Service = require("@core/Service");
const Propertiable = require("@shared/core/Propertiable");
const mixer = require("@shared/core/mixer");

class Notification extends mixer.extends([Propertiable()]) {
  constructor(values) {
    super();
    Object.assign(this, values);
    this.initialize();
  }
  close() {
    if (this.isClosed) {
      return;
    }
    this.isClosed = true;
    setTimeout(() => {
      const index = service.notifications.indexOf(this);
      if (index === -1) {
        return;
      }
      service.notifications.splice(index, 1);
      service.notifications = service.notifications;
    }, 500);
  }
}

Notification.properties({
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
    super();
    this.on("propertyChanged:notifications", () => {
      console.log("changed");
    });
  }
  notify(notification) {
    notification.type = types[notification.type] || types.info;
    notification = new Notification(notification);
    console.log(notification);
    this.notifications = [...(this.notifications || []), notification];
  }
}.properties({
  notifications: "any",
});

const service = new NotificationService();
module.exports = service;
