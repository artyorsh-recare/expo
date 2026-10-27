import { Autocomplete } from 'heroui-native-pro/autocomplete';
import { Label } from 'heroui-native/label';
import { HeroUINativeProvider } from 'heroui-native/provider';
import { View } from 'react-native';

export default function AutocompleteScreen() {
  return (
    <HeroUINativeProvider>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
        <Autocomplete>
          <Label>State</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.TriggerIndicator />
          </Autocomplete.Trigger>
          <Autocomplete.Portal>
            <Autocomplete.Overlay />
            <Autocomplete.Content presentation="popover" width="trigger">
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
    </HeroUINativeProvider>
  );
}
