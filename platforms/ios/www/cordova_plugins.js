cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.hidden-statusbar-overlay/www/hidden-statusbar-overlay.js",
        "id": "de.appplant.cordova.plugin.hidden-statusbar-overlay.HiddenStatusbarOverlay",
        "clobbers": [
            "plugin.statusbarOverlay"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.PushPlugin": "2.5.0",
    "cordova-plugin-whitelist": "1.1.0",
    "de.appplant.cordova.plugin.hidden-statusbar-overlay": "1.2.0",
    "nl.x-services.plugins.socialsharing": "4.3.19",
    "cordova-plugin-inappbrowser": "1.0.1"
}
// BOTTOM OF METADATA
});