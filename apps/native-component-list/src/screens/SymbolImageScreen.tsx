import { SymbolView } from 'expo-symbols';
import { Text, StyleSheet, ScrollView } from 'react-native';

export default function SymbolImageScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 10, gap: 10 }}>
      <Text style={styles.title}>Use component directly</Text>
      <SymbolView
        name={{
          ios: 'pencil.tip.crop.circle.badge.plus',
          android: 'home_and_garden',
          web: 'home_and_garden',
        }}
        style={styles.symbol}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  symbol: {
    width: 35,
    height: 35,
    margin: 5,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
