import { Platform } from 'react-native';

import { componentScreensToListElements } from '../screens/ComponentListScreen';
import { type Filter, type ScreenConfig } from '../types/ScreenConfig';
import { optionalRequire, optionalScreens } from './routeBuilder';

function platformExpoUiCompatibility(name: string): Filter[] {
  // FormScreen.android.tsx is a stub.
  if (name === 'Form' && Platform.OS !== 'ios') {
    return ['ios-only'];
  }
  if (Platform.OS === 'android') {
    return ['android-only'];
  }
  if (Platform.OS === 'ios') {
    return ['ios-only'];
  }
  return ['community'];
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
      return optionalRequire(() => require('../screens/HeroUI/ButtonScreen'));
    },
    name: 'Button',
    route: 'hero-ui/button',
    options: { title: 'Button' },
    compatibility: ['hero-ui'],
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/HeroUI/BottomSheetScreen'));
    },
    name: 'Bottom Sheet',
    route: 'hero-ui/bottom-sheet',
    options: { title: 'Bottom Sheet' },
    compatibility: ['hero-ui'],
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/HeroUI/CardScreen'));
    },
    name: 'Card',
    route: 'hero-ui/card',
    options: { title: 'Card' },
    compatibility: ['hero-ui'],
  },
  {
    getComponent() {
      return optionalRequire(() => require('../screens/DrawerLayoutAndroidScreen'));
    },
    name: 'DrawerLayoutAndroid',
    compatibility: ['android-only', 'community'],
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
    compatibility: ['ios-only', 'community'],
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
  ...UIUniversalScreens.map((screen) => ({
    ...screen,
    compatibility: ['universal'] satisfies Filter[],
  })),
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
  if (UIScreens.includes(screen)) {
    return { ...screen, compatibility: platformExpoUiCompatibility(screen.name) };
  }
  return { ...screen, compatibility: ['community'] satisfies Filter[] };
});

export const Screens: ScreenConfig[] = [...ScreensList, ...BlurScreens, ...UIScreens];

export const screenApiItems = componentScreensToListElements(ScreensList);
