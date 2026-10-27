import { Autocomplete } from 'heroui-native-pro/autocomplete';
import { Label } from 'heroui-native/label';
import { View } from 'react-native';

export default function AutocompleteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
      <Autocomplete presentation="bottom-sheet">
        <Label>State</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.TriggerIndicator />
        </Autocomplete.Trigger>
        <Autocomplete.Portal>
          <Autocomplete.Overlay />
          <Autocomplete.Content presentation="bottom-sheet">
            <Autocomplete.SearchField />
            <Autocomplete.List>
              <Autocomplete.Item value="ca" label="California" />
              <Autocomplete.Item value="tx" label="Texas" />
              <Autocomplete.Item value="ny" label="New York" />
            </Autocomplete.List>
            <Autocomplete.Empty />
          </Autocomplete.Content>
        </Autocomplete.Portal>
      </Autocomplete>
    </View>
  );
}
