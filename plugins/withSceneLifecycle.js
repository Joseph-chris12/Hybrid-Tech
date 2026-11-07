const { withInfoPlist, withAppDelegate } = require("@expo/config-plugins");

const SCENE_DELEGATE = "EXExpoAppSceneDelegate";

const withSceneManifest = (config) =>
  withInfoPlist(config, (c) => {
    c.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: "Default Configuration",
            UISceneDelegateClassName: SCENE_DELEGATE,
          },
        ],
      },
    };
    return c;
  });

const withSceneAppDelegate = (config) =>
  withAppDelegate(config, (c) => {
    if (c.modResults.language !== "swift") {
      throw new Error("withSceneLifecycle only supports a Swift AppDelegate");
    }
    let contents = c.modResults.contents;

    if (!contents.includes("ExpoReactNativeFactoryProvider")) {
      contents = contents.replace(
        /class AppDelegate: ExpoAppDelegate \{/,
        "class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider {",
      );
    }

    contents = contents.replace(
      /\n#if os\(iOS\) \|\| os\(tvOS\)\n\s*window = UIWindow\(frame: UIScreen\.main\.bounds\)\n\s*factory\.startReactNative\(\n[\s\S]*?\)\n#endif\n/,
      "\n",
    );

    c.modResults.contents = contents;
    return c;
  });

module.exports = (config) => withSceneAppDelegate(withSceneManifest(config));
