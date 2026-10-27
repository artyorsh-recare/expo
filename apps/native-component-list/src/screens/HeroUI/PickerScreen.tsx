import { ComboBox } from 'heroui-native-pro/combo-box';
import { Label } from 'heroui-native/label';
import { View } from 'react-native';

export default function PickerScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 24, paddingTop: 40 }}>
      <ComboBox>
        <Label>Favorite animal</Label>
        <ComboBox.Trigger>
          <ComboBox.InputGroup>
            <ComboBox.Input placeholder="Search animals..." />
            <ComboBox.Suffix>
              <ComboBox.TriggerIndicator />
            </ComboBox.Suffix>
          </ComboBox.InputGroup>
        </ComboBox.Trigger>
        <ComboBox.Portal>
          <ComboBox.Overlay />
          <ComboBox.Content>
            <ComboBox.List>
              <ComboBox.Item value="cat" label="Cat" />
              <ComboBox.Item value="dog" label="Dog" />
            </ComboBox.List>
            <ComboBox.Empty />
          </ComboBox.Content>
        </ComboBox.Portal>
      </ComboBox>
    </View>
  );
}
