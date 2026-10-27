import { ProgressCircle } from 'heroui-native-pro/progress-circle';
import { HeroUINativeProvider } from 'heroui-native/provider';
import { View } from 'react-native';

export default function ActivityIndicatorScreen() {
  return (
    <HeroUINativeProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ProgressCircle isIndeterminate accessibilityLabel="Loading">
          <ProgressCircle.Indicator />
        </ProgressCircle>
      </View>
    </HeroUINativeProvider>
  );
}
