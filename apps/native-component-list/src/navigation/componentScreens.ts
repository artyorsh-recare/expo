import { Platform } from 'react-native';

import { componentScreensToListElements } from '../screens/ComponentListScreen';
import { type ScreenConfig } from '../types/ScreenConfig';
import { optionalRequire, optionalScreens } from './routeBuilder';

// Expo UI screens with no counterpart on the other platform. SwiftUI/Compose and "component"
// suffixes name the same screen, so those pairs are not listed here.
const IOS_ONLY_EXPO_UI = new Set([
  'Dialog, Confirmation',
  'Glass Effect',
  'Image',
  'Label',
  'Link',
  'List',
  'Menu, Context',
  'NavigationSplitView',
  'Picker',
  'Popover',
  'Section',
  'ShareLink',
  'Stepper',
  'Swipeable',
  'Toggle',
  'zz Background',
  'zz Content Transition',
]);

const ANDROID_ONLY_EXPO_UI = new Set([
  'Button, Floating',
  'Checkbox',
  'DatePicker, Range',
  'Dialog, Basic Alert',
  'HorizontalFloatingToolbar',
  'HorizontalPager',
  'IconButton',
  'Menu, Exposed',
  'Progress',
  'PullToRefreshBox',
  'Radio',
  'SegmentedControl',
  'Shape',
  'Snackbar',
  'Surface',
  'Switch',
  'SyncSwitch',
  'TextField, Basic',
  'ToggleButton',
  'Tooltip',
  'TopAppBar',
  'zz Card',
  'zz Carousel',
  'zz Chip',
]);

function exclusivePlatform(name: string): ScreenConfig['platform'] {
  const canonical = name.replace(/, (SwiftUI|Compose)$/, '').replace(/ component$/, '');
  // FormScreen.android.tsx is a stub, so the Android catalog entry opens an unimplemented page.
  if (Platform.OS === 'android' && canonical === 'Form') {
    return 'ios';
  }
  if (Platform.OS === 'ios' && IOS_ONLY_EXPO_UI.has(canonical)) {
    return 'ios';
  }
  if (Platform.OS === 'android' && ANDROID_ONLY_EXPO_UI.has(canonical)) {
    return 'android';
  }
  return undefined;
}

// Screen groups are loaded lazily so a group whose module fails to load, for example because it
// imports a native module the current platform does not have, only drops itself from the list.
const BlurScreens: ScreenConfig[] = optionalScreens(
  () => require('../screens/BlurView/BlurViewScreen').BlurScreens
);
const UIScreens: ScreenConfig[] = optionalScreens(
  () => require('../screens/UI/UIScreen').UIScreens
);
const UIUniversalScreens: ScreenConfig[] = optionalScreens(
  () => require('../screens/UIUniversal/UIUniversalScreen').UIUniversalScreens
);

export const ScreensList: ScreenConfig[] = [
  {
    getComponent() {
      return optionalRequire(() => require('../screens/DrawerLayoutAndroidScreen'));
    },
    name: 'DrawerLayoutAndroid',
    // DrawerLayoutAndroidScreen.tsx tells iOS to use the Android screen.
    platform: Platform.OS === 'android' ? undefined : 'android',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/BlurView/BlurViewCompatScreen'));
    },
    name: 'Blur (expo-blur)',
    route: 'blur',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/GlassView/GlassViewScreen'));
    },
    name: 'GlassView (expo-glass-effect)',
    // GlassViewScreen.tsx is the non-iOS stub.
    platform: Platform.OS === 'ios' ? undefined : 'ios',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/TextScreen'));
    },
    name: 'Text (react-native)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/TextInputScreen'));
    },
    name: 'TextInput (react-native)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/SliderScreen'));
    },
    name: 'Slider (react-native-community)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/PickerScreen'));
    },
    name: 'Picker (react-native-community)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/CheckboxScreen'));
    },
    name: 'Checkbox (expo-checkbox)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/ActivityIndicatorScreen'));
    },
    name: 'ActivityIndicator (react-native)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/DateTimePickerScreen'));
    },
    name: 'DatePicker, Community',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/GestureHandlerSwipeableScreen'));
    },
    name: 'Swipeable Rows',
    options: { title: 'Swipeable Rows' },
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/SegmentedControlScreen'));
    },
    name: 'SegmentedControl (react-native-community)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/Skia/SkiaScreen'));
    },
    name: 'Skia',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/UIUniversal/UIUniversalScreen'));
    },
    name: '!! Expo UI (Universal)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/SymbolImageScreen'));
    },
    name: 'expo-symbols',
  },
  ...UIScreens.map((screen) => ({
    ...screen,
    name: `${screen.name} (expo-ui)`,
    platform: exclusivePlatform(screen.name),
  })),
];

export const Screens: ScreenConfig[] = [
  ...ScreensList,
  ...BlurScreens,
  ...UIScreens,
  ...UIUniversalScreens,
];

export const screenApiItems = componentScreensToListElements(ScreensList);
