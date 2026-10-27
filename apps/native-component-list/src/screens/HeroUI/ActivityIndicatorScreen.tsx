import { ProgressCircle } from 'heroui-native-pro/progress-circle';
import { View } from 'react-native';

export default function ActivityIndicatorScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ProgressCircle isIndeterminate accessibilityLabel="Loading">
        <ProgressCircle.Indicator />
      </ProgressCircle>
    </View>
  );
}
