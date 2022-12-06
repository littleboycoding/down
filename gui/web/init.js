class DownEvent extends Event {
  constructor(name, payload) {
    super("DownEvent");
    this.name = name;
    this.payload = payload;
  }
}

const listen = (eventName, cb) => {
  const onTrigger = (e) => {
    if (e.name === eventName) {
      cb(JSON.parse(e.payload));
    }
  };

  addEventListener("DownEvent", onTrigger);

  return () => {
    removeEventListener("DownEvent", onTrigger);
  };
};
