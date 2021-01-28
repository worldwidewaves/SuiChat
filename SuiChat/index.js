register("chat", function(message, event) {
  cancel(event);
  name = message.split(":").slice(0, 1);
  message = message.split(": ").slice(1).join(':');
  ChatLib.chat("&r&2Guild > §d[BOT§d] §d" + name + "&r: &r" + message);
}).setCriteria("&r&2Guild > &a[VIP] Suibot &e[Elite]&f: &r${message}&r");