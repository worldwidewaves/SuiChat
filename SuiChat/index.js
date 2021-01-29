import PVObject from "PersistentData";

const metadata = JSON.parse(FileLib.read("SuiChat", "metadata.json"));

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

var state = new PVObject("SuiChat", {
  color: availableColors.light_purple,
  name: "Suibot",
  tag: "BOT",
  altColors: true
});

// Case Insensitive Replace
function insensitiveReplace(string, stringToReplace, stringReplacement) {
  var reg = new RegExp("(" + stringToReplace + ")", "gi");
  return string.replace(reg, stringReplacement);
}

// Color Code Remover
function removeColorCodes(string) {
  var strippedString = string.replace(/\u00A7[0-9A-FK-OR]/ig, "");
  strippedString = string.replace(/&[0-9A-FK-OR]/ig, "");
  return strippedString;
}

// Show Help
function showHelp(additionalText) {
  var title = new TextComponent(state.color + "§lSuiChat v" + metadata.version + "§r" + (additionalText ? additionalText : "")).setClick("open_url", "https://github.com/suicidejerk/suichat/releases").setHoverValue("§7Click here to see the " + state.color + "§nchangelog§r§7!");

  ChatLib.chat("------------------------------------------------------");
  ChatLib.chat(title);
  ChatLib.chat("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
  ChatLib.chat("§nCommands:");
  ChatLib.chat("> §7Display this menu: §a§n.sui help");
  ChatLib.chat("> §7Change " + state.color + "[" + state.tag + state.color + "] " + state.name + "§7's color: §a§n.sui color <color>");
  ChatLib.chat("> §7Change " + state.color + state.name + "§7's name to your Bot's name: §a§n.sui name <name>");
  ChatLib.chat("> §7Change the tag " + state.color + "[" + state.tag + state.color + "]§7: §a§n.sui tag <tag>");
  ChatLib.chat("> §7Toggle §aON§7/§cOFF §0S§1P§2E§3C§4I§5A§6L §eC§8O§9L§aO§bR§cS §7from Discord (" + (state.altColors ? "§aON" : "§cOFF") + "§7): §a§n.sui toggle");
  ChatLib.chat("------------------------------------------------------");
}

// Change Color
function changeColor(message) {
  var tempColor = insensitiveReplace(message, ".sui color ", "");

  ChatLib.chat("------------------------------------");
  if (tempColor in availableColors) {
    ChatLib.chat(availableColors[tempColor] + state.name + "§7's color changed from " + state.color + Object.keys(availableColors).find(key => availableColors[key] === state.color) + " §7to " + availableColors[tempColor] + tempColor + "§7!");
    state.color = availableColors[tempColor];
  } else {
    ChatLib.chat("§cColor not available! §7Here's a list of colors:");
    ChatLib.chat("- - - - - - - - - - - - - - - - - - - - - - ");
    for (var key in availableColors) {
      ChatLib.chat(ChatLib.getCenteredText(availableColors[key] + key));
    }
  }
  ChatLib.chat("------------------------------------");
}

// Change Name
function changeName(message) {
  var tempName = insensitiveReplace(message, ".sui name ", "");
  tempName = insensitiveReplace(message, ".sui name", "");
  tempName = tempName.split(" ")[1];

  ChatLib.chat("------------------------------------");
  if (tempName) {
    ChatLib.chat("§7Bot's name changed from " + state.color + state.name + " §7to " + state.color + tempName);
    state.name = tempName;
  } else {
    ChatLib.chat("§cThe Bot's name can't be empty!");
  }
  ChatLib.chat("------------------------------------");
}

// Change Tag
function changeTag(message) {
  var tempTag = insensitiveReplace(message, ".sui tag ", "");
  tempTag = insensitiveReplace(message, ".sui tag", "");
  tempTag = tempTag.split(" ")[1];

  ChatLib.chat("------------------------------------");
  if (tempTag) {
    ChatLib.chat("§7Bot's tag changed from " + state.color + "[" + state.tag + state.color + "] §7to " + state.color + "[" + tempTag + state.color + "]");
    state.tag = tempTag;
  } else {
    ChatLib.chat("§cThe Bot's tag can't be empty!");
  }
  ChatLib.chat("------------------------------------");
}

// Toggle Alt Colors
function toggleAltColors() {
  ChatLib.chat("------------------------------------------------------");
  if (state.altColors) {
    state.altColors = false;
    ChatLib.chat("§0S§1P§2E§3C§4I§5A§6L §eC§8O§9L§aO§bR§cS §7have been turned §cOFF§7!");
  } else {
    state.altColors = true;
    ChatLib.chat("§0S§1P§2E§3C§4I§5A§6L §eC§8O§9L§aO§bR§cS §7have been turned §aON§7!");
  }
  ChatLib.chat("------------------------------------------------------");
}

// Command not Found
function commandNotFound() {
  ChatLib.chat("------------------------------------------------------");
  ChatLib.chat("§cCommand not found! §7Use §a.sui help §7for a list of available commands");
  ChatLib.chat("------------------------------------------------------");
}

// Detect when Bot talks and change text
register("chat", function (message, event) {
  message = message.replace(/\[.*?\]/, "");
  var args = message.split(" ");

  if (args[0] === state.name || args[1] === state.name || args[0] === (state.name + ":") || args[1] === (state.name + ":")) {
    cancel(event);

    var args2 = message.split(":");

    var name = args2[1].substring(3);

    var messageReal = "";
    for (var i = 2; i < Object.keys(args2).length; i++) {
      messageReal += args2[i];
      if (i + 1 != Object.keys(args2).length) {
        messageReal += ":";
      }
    }
    messageReal = messageReal.substring(1);
    if (!state.altColors) {
      name = removeColorCodes(name);
      messageReal = removeColorCodes(messageReal);
    }

    ChatLib.chat("&r&2Guild > " + state.color + "[" + state.tag + state.color + "] " + name + "&r: &r" + messageReal);
  }
}).setCriteria("&r&2Guild > ${message}");

// Commands
register("messageSent", (message, event) => {
  messageLower = message.toLowerCase();
  var args = messageLower.split(" ");

  if (args[0] == ".sui") {
    cancel(event);

    switch (args[1]) {
      case "help":
        showHelp();
        break;
      case "color":
        changeColor(message);
        break;
      case "name":
        changeName(message);
        break;
      case "tag":
        changeTag(message);
        break;
      case "toggle":
        toggleAltColors();
        break;
      default:
        commandNotFound();
    }
  }
});

// Start
showHelp(" §7loaded!");