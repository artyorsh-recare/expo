import { componentScreensToListElements } from '../screens/ComponentListScreen';
import { type ScreenConfig } from '../types/ScreenConfig';
import { optionalRequire, optionalScreens } from './routeBuilder';

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
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/BlurView/BlurViewCompatScreen'));
    },
    name: 'BlurView (expo-blur)',
    route: 'blur',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/GlassView/GlassViewScreen'));
    },
    name: 'GlassView (expo-glass-effect)',
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
    name: 'DateTimePicker (react-native-community)',
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
      return optionalRequire(() => require('../screens/UI/UIScreen'));
    },
    name: 'Expo UI',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/UIUniversal/UIUniversalScreen'));
    },
    name: 'Expo UI (Universal)',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/SymbolImageScreen'));
    },
    name: 'expo-symbols',
  },
];

export const Screens: ScreenConfig[] = [
  ...ScreensList,
  ...BlurScreens,
  ...UIScreens,
  ...UIUniversalScreens,
];

export const screenApiItems = componentScreensToListElements(ScreensList);
