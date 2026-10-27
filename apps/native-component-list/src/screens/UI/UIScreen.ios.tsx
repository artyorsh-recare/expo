import { optionalRequire } from '../../navigation/routeBuilder';
import ComponentListScreen, { componentScreensToListElements } from '../ComponentListScreen';

export const UIScreens = [
  {
    name: 'Label',
    route: 'ui/label',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./LabelScreen'));
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
    name: 'Picker',
    route: 'ui/picker',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./PickerScreen'));
    },
  },
  {
    name: 'DatePicker, SwiftUI',
    route: 'ui/date-picker',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./DatePickerScreen'));
    },
  },
  {
    name: 'Bottom Tabs, SwiftUI',
    route: 'ui/tabview',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./TabViewScreen'));
    },
  },
  {
    name: 'Toggle',
    route: 'ui/toggle',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ToggleScreen'));
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
    name: 'ShareLink',
    route: 'ui/share-link',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ShareLinkScreen'));
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
    name: 'Stepper',
    route: 'ui/stepper',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./StepperScreen'));
    },
  },
  {
    name: 'NavigationSplitView',
    route: 'ui/navigationsplitview',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./NavigationSplitViewScreen'));
    },
  },
  {
    name: 'Menu',
    route: 'ui/menu',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./MenuScreen'));
    },
  },
  {
    name: 'Dialog, Alert',
    route: 'ui/alert-dialog',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./AlertDialogScreen'));
    },
  },
  {
    name: 'Dialog, Confirmation',
    route: 'ui/confirmation-dialog',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ConfirmationDialogScreen'));
    },
  },
  {
    name: 'Menu, Context',
    route: 'ui/context-menu',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ContextMenuScreen'));
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
    name: 'ActivityIndicator, SwiftUI',
    route: 'ui/progress-view',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ProgressViewScreen'));
    },
  },
  {
    name: 'List',
    route: 'ui/list',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ListScreen'));
    },
  },
  {
    name: 'Section',
    route: 'ui/section',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SectionScreen'));
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
    name: 'Swipeable',
    route: 'ui/swipe-actions',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./SwipeActionsScreen'));
    },
  },
  {
    name: 'zz Content Transition',
    route: 'ui/content-transition',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ContentTransitionScreen'));
    },
  },
  {
    name: 'Glass Effect',
    route: 'ui/glass-effect',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./GlassEffectScreen'));
    },
  },
  {
    name: 'Image',
    route: 'ui/image',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./ImageScreen'));
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
    name: 'Link',
    route: 'ui/link',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./LinkScreen'));
    },
  },
  {
    name: 'zz Background',
    route: 'ui/background',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./BackgroundScreen'));
    },
  },
  {
    name: 'Popover',
    route: 'ui/popover',
    options: {},
    getComponent() {
      return optionalRequire(() => require('./PopoverScreen'));
    },
  },
];

export default function UIScreen() {
  const apis = componentScreensToListElements(UIScreens);
  return <ComponentListScreen apis={apis} sort />;
}

UIScreen.navigationOptions = {
  title: 'Expo UI',
};
