/**
 * Plugin related classes
 */
class Plugin {
    constructor(loader, server, description, dataFolder, file, resourceProvider) {
        this.loader = loader;
        this.server = server;
        this.description = description;
        this.dataFolder = dataFolder;
        this.file = file;
        this.resourceProvider = resourceProvider;
    }
    isEnabled() {
        return false;
    }
    /**
     * Called by the plugin manager when the plugin is enabled or disabled to inform the plugin of its enabled state.
     *
     * @internal This is intended for core use only and should not be used by plugins
     * @see PluginManager::enablePlugin()
     * @see PluginManager::disablePlugin()
     */
    onEnableStateChange(enabled) {
        return;
    }
    /**
     * Gets the plugin's data folder to save files and configuration.
     * This directory name has a trailing slash.
     */
    getDataFolder() {
        return this.dataFolder;
    }
    getDescription() {
        return this.description;
    }
    getName() {
        return '';
    }
    getLogger() {
        return null;
    }
    getPluginLoader() {
        return null;
    }
    getScheduler() {
        return null;
    }
}
