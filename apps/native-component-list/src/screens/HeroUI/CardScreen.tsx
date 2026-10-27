import { Card } from 'heroui-native/card';
import { View } from 'react-native';

const bands = ['#E24B4B', '#F0C14A', '#3D8B6E', '#3A6EA5', '#7A5EA7'];

export default function CardScreen() {
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
        <Card style={{ width: 280 }}>
          <Card.Body>
            <Card.Title>Card</Card.Title>
            <Card.Description>The glass theme blurs the screen behind this card.</Card.Description>
          </Card.Body>
        </Card>
      </View>
    </View>
  );
}
