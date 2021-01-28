import PVObject from "PersistentData";

const availableColors = {
  black: "§0",
  dark_blue: "§1",
  dark_green: "§2",
  dark_aqua: "§3",
  dark_red: "§4",
  dark_purple: "§5",
  gold: "§6",
  gray: "§7",
  dark_gray: "§8",
  blue: "§9",
  green: "§a",
  aqua: "§b",
  red: "§c",
  light_purple: "§d",
  yellow: "§e",
  white: "§f",
};

var persistentObject = new PVObject("SuiChat", {
  color: availableColors.light_purple
});

register("chat", function (message, event) {
  cancel(event);
  var name = message.split(":").slice(0, 1);
  var strippedMessage = message.split(": ").slice(1).join(':');
  ChatLib.chat("&r&2Guild > " + persistentObject.color + "[BOT] " + name + "&r: &r" + strippedMessage);
}).setCriteria("&r&2Guild > &a[VIP] Suibot &e[Elite]&f: &r${message}&r");

register("messageSent", (message, event) => {
  if (message.startsWith(".sui")) {
    cancel(event);
    var tempColor = message.toLowerCase().replace(".sui ", "");

    ChatLib.chat("------------------------------------");
    if (tempColor in availableColors) {
      ChatLib.chat(availableColors[tempColor] + "Suibot§7's color changed from " + persistentObject.color + Object.keys(availableColors).find(key => availableColors[key] === persistentObject.color) + " §7to " + availableColors[tempColor] + tempColor + "§7!");
      persistentObject.color = availableColors[tempColor];
    } else {
      ChatLib.chat("§cColor not available! §7Here's a list of colors:");
      ChatLib.chat("- - - - - - - - - - - - - - - - - - - - - - ");
      for (var key in availableColors) {
        ChatLib.chat(ChatLib.getCenteredText(availableColors[key] + key));
      }
    }
    ChatLib.chat("------------------------------------");
  }
});

ChatLib.chat("------------------------------");
ChatLib.chat(persistentObject.color + "SuiChat loaded!");
ChatLib.chat("- - - - - - - - - - - - - - - - - -");
ChatLib.chat("Commands:");
ChatLib.chat("> §7Change " + persistentObject.color + "Suibot§7's color: §a.sui <color>");
ChatLib.chat("------------------------------");