import { BottomSheet } from 'heroui-native/bottom-sheet';
import { Button } from 'heroui-native/button';
import { View } from 'react-native';

const bands = ['#E24B4B', '#F0C14A', '#3D8B6E', '#3A6EA5', '#7A5EA7'];

export default function BottomSheetScreen() {
  return (
    <View style={{ flex: 1 }}>
      {bands.map((color) => (
        <View key={color} style={{ flex: 1, backgroundColor: color }} />
      ))}
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <BottomSheet isDefaultOpen>
          <BottomSheet.Trigger asChild>
            <Button>Open Bottom Sheet</Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content>
              <BottomSheet.Close />
              <BottomSheet.Title>Bottom sheet</BottomSheet.Title>
              <BottomSheet.Description>
                The glass theme blurs the screen behind this sheet.
              </BottomSheet.Description>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
}
