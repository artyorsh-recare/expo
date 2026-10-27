import { Button } from 'heroui-native/button';
import { HeroUINativeProvider } from 'heroui-native/provider';
import { View } from 'react-native';

export default function ButtonScreen() {
  return (
    <HeroUINativeProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button>Button</Button>
      </View>
    </HeroUINativeProvider>
  );
}
