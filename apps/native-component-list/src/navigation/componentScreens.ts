import { componentScreensToListElements } from '../screens/ComponentListScreen';
import { type Filter, type ScreenConfig } from '../types/ScreenConfig';
import { optionalRequire, optionalScreens } from './routeBuilder';

// Expo UI screens with no counterpart on the other platform. Shared names such as Button are omitted.
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
  'Background',
  'Content Transition',
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
  'Card',
  'Carousel',
  'Chip',
]);

function expoUiCompatibility(name: string): Filter[] {
  // FormScreen.android.tsx is a stub.
  if (name === 'Form' || IOS_ONLY_EXPO_UI.has(name)) {
    return ['ios'];
  }
  if (ANDROID_ONLY_EXPO_UI.has(name)) {
    return ['android'];
  }
  return ['ios', 'android'];
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
    compatibility: ['android', 'community'],
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/BlurView/BlurViewCompatScreen'));
    },
    name: 'Blur',
    route: 'blur',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/GlassView/GlassViewScreen'));
    },
    name: 'GlassView',
    compatibility: ['ios', 'community'],
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/TextScreen'));
    },
    name: 'Text',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/TextInputScreen'));
    },
    name: 'TextInput',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/SliderScreen'));
    },
    name: 'Slider',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/PickerScreen'));
    },
    name: 'Picker',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/CheckboxScreen'));
    },
    name: 'Checkbox',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/ActivityIndicatorScreen'));
    },
    name: 'ActivityIndicator',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/DateTimePickerScreen'));
    },
    name: 'DatePicker',
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
    name: 'SegmentedControl',
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
    name: '!! Expo UI',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/SymbolImageScreen'));
    },
    name: 'expo-symbols',
  },
  ...UIScreens,
].map((screen) => {
  if (screen.compatibility) {
    return screen;
  }
  // Match the Expo UI entry by object. A community screen can use the same title.
  if (UIScreens.includes(screen) || screen.name === '!! Expo UI') {
    return { ...screen, compatibility: expoUiCompatibility(screen.name) };
  }
  return { ...screen, compatibility: ['ios', 'android', 'community'] satisfies Filter[] };
});

export const Screens: ScreenConfig[] = [
  ...ScreensList,
  ...BlurScreens,
  ...UIScreens,
  ...UIUniversalScreens,
];

export const screenApiItems = componentScreensToListElements(ScreensList);
