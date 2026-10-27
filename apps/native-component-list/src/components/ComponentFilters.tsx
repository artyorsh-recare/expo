import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { useTheme } from '../../../common/ThemeProvider';
import type { Filter } from '../types/ScreenConfig';

export type { Filter };

const FILTERS: Filter[] = ['ios', 'android', 'community'];

type Props = {
  onChange: (filters: Filter[]) => void;
};

export function defaultFilters(): Filter[] {
  const filters: Filter[] = ['community'];
  if (Platform.OS === 'ios') {
    filters.unshift('ios');
  } else if (Platform.OS === 'android') {
    filters.unshift('android');
  } else {
    filters.unshift('ios', 'android');
  }
  return filters;
}

function filterLabel(filter: Filter): string {
  if (filter === 'ios') {
    return 'iOS';
  }
  if (filter === 'android') {
    return 'Android';
  }
  return 'Community';
}

export default function ComponentFilters({ onChange }: Props) {
  const { theme } = useTheme();
  const [filters, setFilters] = React.useState<Filter[]>(defaultFilters);

  const toggle = (filter: Filter) => {
    const next = filters.includes(filter)
      ? filters.filter((item) => item !== filter)
      : [...filters, filter];
    setFilters(next);
    onChange(next);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.bar, { backgroundColor: theme.background.screen }]}
      contentContainerStyle={styles.row}>
      {FILTERS.map((filter) => {
        const selected = filters.includes(filter);
        return (
          <Pressable
            key={filter}
            onPress={() => toggle(filter)}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? theme.icon.info : 'transparent',
                borderColor: selected ? theme.icon.info : theme.border.default,
              },
            ]}>
            <Text style={{ color: selected ? '#fff' : theme.text.default }}>
              {filterLabel(filter)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chip: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
