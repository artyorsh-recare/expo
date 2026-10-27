import React from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

import { useTheme } from '../../../common/ThemeProvider';
import { filterColors, type Filter } from '../types/ScreenConfig';

export type { Filter };

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  onChange: (filters: Filter[]) => void;
};

function filterChips(): Filter[] {
  const hero: Filter = 'hero-ui';
  if (Platform.OS === 'android') {
    return ['universal', 'android-only', 'community', hero];
  }
  if (Platform.OS === 'ios') {
    return ['universal', 'ios-only', 'community', hero];
  }
  return ['universal', 'ios-only', 'android-only', 'community', hero];
}

export function defaultFilters(): Filter[] {
  return ['universal', 'hero-ui'];
}

function filterLabel(filter: Filter): string {
  if (filter === 'universal') {
    return 'Universal';
  }
  if (filter === 'ios-only') {
    return 'iOS-only';
  }
  if (filter === 'android-only') {
    return 'Android-only';
  }
  if (filter === 'hero-ui') {
    return 'Hero UI';
  }
  return 'Community';
}

export default function ComponentFilters({ onChange }: Props) {
  const { theme } = useTheme();
  const [filters, setFilters] = React.useState<Filter[]>(defaultFilters);
  const chips = filterChips();

  const toggle = (filter: Filter) => {
    const next = filters.includes(filter)
      ? filters.filter((item) => item !== filter)
      : [...filters, filter];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFilters(next);
    onChange(next);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.bar, { backgroundColor: theme.background.screen }]}
      contentContainerStyle={styles.row}>
      {chips.map((filter) => {
        const selected = filters.includes(filter);
        return (
          <Pressable
            key={filter}
            onPress={() => toggle(filter)}
            style={[
              styles.chip,
              {
                borderColor: selected ? theme.text.default : theme.border.default,
              },
            ]}>
            <Text style={{ color: theme.text.default }}>{filterLabel(filter)}</Text>
            {filter === 'universal' ? null : (
              <View style={[styles.dot, { backgroundColor: filterColors[filter] }]} />
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexGrow: 0,
    flexShrink: 0,
    height: 52,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
