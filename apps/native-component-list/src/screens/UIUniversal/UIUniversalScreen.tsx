import { optionalRequire } from '../../navigation/routeBuilder';
import ComponentListScreen, { componentScreensToListElements } from '../ComponentListScreen';

export const UIUniversalScreens = [
  {
    name: 'Button',
    route: 'ui-universal/button',
    options: { title: 'Button' },
    getComponent() {
      return optionalRequire(() => require('./ButtonScreen'));
    },
  },
  {
    name: 'Text',
    route: 'ui-universal/text',
    options: { title: 'Text' },
    getComponent() {
      return optionalRequire(() => require('./TextScreen'));
    },
  },
  {
    name: 'Switch',
    route: 'ui-universal/switch',
    options: { title: 'Switch' },
    getComponent() {
      return optionalRequire(() => require('./SwitchScreen'));
    },
  },
  {
    name: 'Slider',
    route: 'ui-universal/slider',
    options: { title: 'Slider' },
    getComponent() {
      return optionalRequire(() => require('./SliderScreen'));
    },
  },
  {
    name: 'Checkbox',
    route: 'ui-universal/checkbox',
    options: { title: 'Checkbox' },
    getComponent() {
      return optionalRequire(() => require('./CheckboxScreen'));
    },
  },
  {
    name: 'BottomSheet',
    route: 'ui-universal/bottom-sheet',
    options: { title: 'BottomSheet' },
    getComponent() {
      return optionalRequire(() => require('./BottomSheetScreen'));
    },
  },
  {
    name: 'FieldGroup',
    route: 'ui-universal/field-group',
    options: { title: 'FieldGroup' },
    getComponent() {
      return optionalRequire(() => require('./FieldGroupScreen'));
    },
  },
  {
    name: 'List',
    route: 'ui-universal/list',
    options: { title: 'List' },
    getComponent() {
      return optionalRequire(() => require('./ListScreen'));
    },
  },
  {
    name: 'Picker',
    route: 'ui-universal/picker',
    options: { title: 'Picker' },
    getComponent() {
      return optionalRequire(() => require('./PickerScreen'));
    },
  },
  {
    name: 'Icon',
    route: 'ui-universal/icon',
    options: { title: 'Icon' },
    getComponent() {
      return optionalRequire(() => require('./IconScreen'));
    },
  },
  {
    name: 'TextInput',
    route: 'ui-universal/text-input',
    options: { title: 'TextInput' },
    getComponent() {
      return optionalRequire(() => require('./TextInputScreen'));
    },
  },
];

export default function UIUniversalScreen() {
  const apis = componentScreensToListElements(UIUniversalScreens);
  return <ComponentListScreen apis={apis} sort />;
}

UIUniversalScreen.navigationOptions = {
  title: 'Expo UI (Universal)',
};
