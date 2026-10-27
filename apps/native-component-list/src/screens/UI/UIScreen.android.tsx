import { optionalRequire } from '../../navigation/routeBuilder';
import ComponentListScreen, { componentScreensToListElements } from '../ComponentListScreen';

export const UIScreens = [
  {
    name: 'Dialog, Alert',
    route: 'ui/alert-dialog',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./AlertDialogScreen'));
    },
  },
  {
    name: 'Dialog, Basic Alert',
    route: 'ui/basic-alert-dialog',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./BasicAlertDialogScreen'));
    },
  },
  {
    name: 'Card',
    route: 'ui/card',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./CardScreen'));
    },
  },
  {
    name: 'Button',
    route: 'ui/button',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ButtonScreen'));
    },
  },
  {
    name: 'Checkbox',
    route: 'ui/checkbox',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./CheckboxScreen'));
    },
  },
  {
    name: 'IconButton',
    route: 'ui/icon-button',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./IconButtonScreen'));
    },
  },
  {
    name: 'Radio',
    route: 'ui/radio-button',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./RadioButtonScreen'));
    },
  },
  {
    name: 'SegmentedControl',
    route: 'ui/segmented-control',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SegmentedControlScreen'));
    },
  },
  {
    name: 'DatePicker',
    route: 'ui/date-picker',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./DateTimePickerScreen'));
    },
  },
  {
    name: 'DatePicker, Range',
    route: 'ui/date-range-picker',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./DateRangePickerScreen'));
    },
  },
  {
    name: 'Menu, Exposed',
    route: 'ui/exposed-dropdown-menu-box',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ExposedDropdownMenuBoxScreen'));
    },
  },
  {
    name: 'Switch',
    route: 'ui/switch',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SwitchScreen'));
    },
  },
  {
    name: 'SyncSwitch',
    route: 'ui/sync-switch',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SyncSwitchScreen'));
    },
  },
  {
    name: 'Shape',
    route: 'ui/shape',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ShapeScreen'));
    },
  },
  {
    name: 'Form',
    route: 'ui/form',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./FormScreen'));
    },
  },
  {
    name: 'Slider',
    route: 'ui/slider',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SliderScreen'));
    },
  },
  {
    name: 'Menu',
    route: 'ui/dropdown-menu',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./DropdownMenuScreen'));
    },
  },
  {
    name: 'Text',
    route: 'ui/text',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./TextScreen'));
    },
  },
  {
    name: 'TextField',
    route: 'ui/textField',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./TextFieldScreen'));
    },
  },
  {
    name: 'TextField, Basic',
    route: 'ui/basicTextField',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./BasicTextFieldScreen'));
    },
  },
  {
    name: 'Progress',
    route: 'ui/progress',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ProgressScreen'));
    },
  },
  {
    name: 'Bottom Tabs',
    route: 'ui/navigation-bar',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./NavigationBarScreen'));
    },
  },
  {
    name: 'BottomSheet',
    route: 'ui/bottomsheet',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./BottomSheetScreen'));
    },
  },
  {
    name: 'Chip',
    route: 'ui/assist-chip',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ChipScreen'));
    },
  },
  {
    name: 'HorizontalPager',
    route: 'ui/horizontal-pager',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./HorizontalPagerScreen'));
    },
  },
  {
    name: 'Carousel',
    route: 'ui/carousel',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./CarouselScreen'));
    },
  },
  {
    name: 'ToggleButton',
    route: 'ui/toggle-button',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ToggleButtonScreen'));
    },
  },
  {
    name: 'Button, Floating',
    route: 'ui/floating-action-button',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./FloatingActionButtonScreen'));
    },
  },
  {
    name: 'HorizontalFloatingToolbar',
    route: 'ui/horizontal-floating-toolbar',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./HorizontalFloatingToolbarScreen'));
    },
  },
  {
    name: 'PullToRefreshBox',
    route: 'ui/pull-to-refresh-box',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./PullToRefreshBoxScreen'));
    },
  },
  {
    name: 'Surface',
    route: 'ui/surface',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SurfaceScreen'));
    },
  },
  {
    name: 'Snackbar',
    route: 'ui/snackbar',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SnackbarScreen'));
    },
  },
  {
    name: 'Tooltip',
    route: 'ui/tooltip',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./TooltipScreen'));
    },
  },
  {
    name: 'TopAppBar',
    route: 'ui/top-app-bar',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./TopAppBarScreen'));
    },
  },
  {
    name: 'ActivityIndicator',
    route: 'ui/loading-indicator',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./LoadingIndicatorScreen'));
    },
  },
];

export default function UIScreen() {
  const apis = componentScreensToListElements(UIScreens);
  return <ComponentListScreen apis={apis} />;
}

UIScreen.navigationOptions = {
  title: 'Expo UI',
};
