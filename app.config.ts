import { ExpoConfig, ConfigContext } from "expo/config";
import { version } from "./package.json";

// changes these variables
const NAME = "MyApp";
const OWNER = "ivaintwc";
const SLUG = "myapp";
const SCHEME = "myapp";
const PACKAGE_NAME = "com.ivaintwc.myapp";
const BUNDLE_IDENTIFIER = "com.ivaintwc.myapp";

const ICON = "./assets/images/icon.png";
const SPLASH_ICON = {
  image: "./assets/images/splash-icon.png",
  imageWidth: 200,
  resizeMode: "contain",
  backgroundColor: "#ffffff",
  dark: {
    backgroundColor: "#000000",
  },
};
const ADAPTIVE_ICON = {
  backgroundColor: "#E6F4FE",
  background: "./assets/images/android-icon-background.png",
  foreground: "./assets/images/android-icon-foreground.png",
  monochrome: "./assets/images/android-icon-monochrome.png",
};

const EXPO_PROJECT_ID = "";

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, scheme, bundleIdentifier, packageName } = getDynamicConfig(
    (process.env.APP_ENV as "development" | "production" | "preview") ||
      "development",
  );

  return {
    ...config,
    name,
    slug: SLUG,
    version,
    orientation: "portrait",
    icon: ICON,
    scheme,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: ADAPTIVE_ICON.backgroundColor,
        foregroundImage: ADAPTIVE_ICON.foreground,
        backgroundImage: ADAPTIVE_ICON.background,
        monochromeImage: ADAPTIVE_ICON.monochrome,
      },
      edgeToEdgeEnabled: true,
      package: packageName,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          ...SPLASH_ICON,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: EXPO_PROJECT_ID,
      },
    },
    owner: OWNER,
  };
};

function getDynamicConfig(
  environment: "development" | "production" | "preview",
) {
  if (environment === "production") {
    return {
      name: NAME,
      scheme: SCHEME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${NAME} (Preview)`,
      scheme: `${SCHEME}-preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
    };
  }

  return {
    name: `${NAME} (Dev)`,
    scheme: `${SCHEME}-dev`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
  };
}
