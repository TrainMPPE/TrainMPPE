// 
//████████╗██████╗░░█████╗░██╗███╗░░██╗███╗░░░███╗██████╗░██████╗░███████╗
//╚══██╔══╝██╔══██╗██╔══██╗██║████╗░██║████╗░████║██╔══██╗██╔══██╗██╔════╝
//░░░██║░░░██████╔╝███████║██║██╔██╗██║██╔████╔██║██████╔╝██████╔╝█████╗░░
//░░░██║░░░██╔══██╗██╔══██║██║██║╚████║██║╚██╔╝██║██╔═══╝░██╔═══╝░██╔══╝░░
//░░░██║░░░██║░░██║██║░░██║██║██║░╚███║██║░╚═╝░██║██║░░░░░██║░░░░░███████╗
//░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝╚═╝░░░░░╚═╝╚═╝░░░░░╚═╝░░░░░╚══════╝
//
//@author: TrainMPPE Team
//@website: TrainMPPE.github.io 

"use strict";
const trainmppe = require("trainmppe");
const Command = trainmppe.command.Command;
const CommandExecutor = trainmppe.command.CommandExecutor;
const CommandSender = trainmppe.command.CommandSender;
const PluginCommand = trainmppe.command.PluginCommand;
const KnownTranslationFactory = trainmppe.lang.KnownTranslationFactory;
const TaskScheduler = trainmppe.scheduler.TaskScheduler;
const Server = trainmppe.Server;
const AssumptionFailedError = trainmppe.utils.AssumptionFailedError;
const Config = trainmppe.utils.Config;
const Utils = trainmppe.utils.Utils;
const Path = require("Symfony/Component/Filesystem/Path");
const count = require("count");
const dirname = require("dirname");
const fclose = require("fclose");
const file_exists = require("file_exists");
const fopen = require("fopen");
const mkdir = require("mkdir");
const rtrim = require("rtrim");
const str_contains = require("str_contains");
const strtolower = require("strtolower");
const trim = require("trim");
const DIRECTORY_SEPARATOR = require("DIRECTORY_SEPARATOR");

class PluginBase {
    constructor() {
        if (this.constructor === PluginBase) {
            throw new TypeError("Cannot construct PluginBase instances directly");
        }
    }
}

PluginBase.prototype = Object.create(Plugin.prototype);
PluginBase.prototype.constructor = PluginBase;

PluginBase.prototype.onEnable = function() {};
PluginBase.prototype.onDisable = function() {};

PluginBase.prototype.getServer = function() {
    return Server.getInstance();
};

PluginBase.prototype.getDataFolder = function() {
    return this.getServer().getPluginManager().getPluginDataFolder(this);
};

PluginBase.prototype.getConfig = function() {
    return new Config(this.getDataFolder() + DIRECTORY_SEPARATOR + "config.json", Config.JSON);
};

PluginBase.prototype.saveDefaultConfig = function() {
    const configFile = this.getDataFolder() + DIRECTORY_SEPARATOR + "config.json";
    if (!file_exists(configFile)) {
        const defaultConfigStream = this.getResource("config.json");
        if (defaultConfigStream !== null) {
            const defaultConfig = fopen(configFile, "wb");
            stream_copy_to_stream(defaultConfigStream, defaultConfig);
            fclose(defaultConfig);
        }
    }
};

PluginBase.prototype.getResource = function(filename) {
    const resourcePath = this.getDataFolder() + DIRECTORY_SEPARATOR + filename;
    if (file_exists(resourcePath)) {
        return fopen(resourcePath, "rb");
    }
    return null;
};

PluginBase.prototype.getLogger = function() {
    return this.getServer().getLogger();
};

PluginBase.prototype.getScheduler = function() {
    return this.getServer().getScheduler();
};

PluginBase.prototype.getCommand = function(name) {
    return this.getServer().getPluginCommand(name);
};

PluginBase.prototype.registerCommand = function(command) {
    if (command instanceof PluginCommand) {
        this.getServer().getCommandMap().register(this.getDescription().getName(), command);
    } else {
        throw new TypeError("Command must be an instance of PluginCommand");
    }
};

PluginBase.prototype.registerEvents = function(listener) {
    this.getServer().getPluginManager().registerEvents(listener, this);
};

PluginBase.prototype.isDisabled = function() {
    return !this.isEnabled();
};

PluginBase.prototype.isEnabled = function() {
    return this.getServer().getPluginManager().isPluginEnabled(this);
};

PluginBase.prototype.getDescription = function() {
    return this.getServer().getPluginManager().getPluginDescription(this);
};

PluginBase.prototype.getName = function() {
    return this.getDescription().getName();
};

PluginBase.prototype.getVersion = function() {
    return this.getDescription().getVersion();
};

PluginBase.prototype.getAuthor = function() {
    return this.getDescription().getAuthors();
};

PluginBase.prototype.getServer = function() {
    return Server.getInstance();
};

PluginBase.prototype.getDataFolder = function() {
    return this.getServer().getPluginManager().getPluginDataFolder(this);
};

PluginBase.prototype.getConfig = function() {
    return new Config(this.getDataFolder() + DIRECTORY_SEPARATOR + "config.json", Config.JSON);
};

PluginBase.prototype.saveDefaultConfig = function() {
    const configFile = this.getDataFolder() + DIRECTORY_SEPARATOR + "config.jaon";
    if (!file_exists(configFile)) {
        const defaultConfigStream = this.getResource("config.yml");
        if (defaultConfigStream !== null) {
            const defaultConfig = fopen(configFile, "wb");
            stream_copy_to_stream(defaultConfigStream, defaultConfig);
            fclose(defaultConfig);
        }
    }
};

PluginBase.prototype.getResource = function(filename) {
    const resourcePath = this.getDataFolder() + DIRECTORY_SEPARATOR + filename;
    if (file_exists(resourcePath)) {
        return fopen(resourcePath, "rb");
    }
    return null;
};

PluginBase.prototype.getLogger = function() {
    return this.getServer().getLogger();
};

PluginBase.prototype.getScheduler = function() {
    return this.getServer().getScheduler();
};

PluginBase.prototype.getCommand = function(name) {
    return this.getServer().getPluginCommand(name);
};

PluginBase.prototype.registerCommand = function(command) {
    if (command instanceof PluginCommand) {
        this.getServer().getCommandMap().register(this.getDescription().getName(), command);
    } else {
        throw new TypeError("Command must be an instance of PluginCommand");
    }
};

PluginBase.prototype.registerEvents = function(listener) {
    this.getServer().getPluginManager().registerEvents(listener, this);
};

PluginBase.prototype.isDisabled = function() {
    return !this.isEnabled();
};

PluginBase.prototype.isEnabled = function() {
    return this.getServer().getPluginManager().isPluginEnabled(this);
};

PluginBase.prototype.getDescription = function() {
    return this.getServer().getPluginManager().getPluginDescription(this);
};

PluginBase.prototype.getName = function() {
    return this.getDescription().getName();
};

PluginBase.prototype.getVersion = function() {
    return this.getDescription().getVersion();
};

PluginBase.prototype.getAuthor = function() {
    return this.getDescription().getAuthors();
};

module.exports = PluginBase;
