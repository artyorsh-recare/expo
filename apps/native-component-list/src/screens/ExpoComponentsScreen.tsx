import { memo, useMemo, useState } from 'react';
import { Platform, View } from 'react-native';

import ComponentFilters, { defaultFilters, type Filter } from '../components/ComponentFilters';
import { SearchToolbar } from '../navigation/StackConfig';
import ComponentListScreen, { type ListElement } from './ComponentListScreen';

function runsHere(tags: Filter[]): boolean {
  if (Platform.OS === 'ios') {
    return !tags.includes('android-only') || tags.includes('ios-only');
  }
  if (Platform.OS === 'android') {
    return !tags.includes('ios-only') || tags.includes('android-only');
  }
  return true;
}

function matchesFilters(item: ListElement, filters: Filter[]): boolean {
  const tags = item.compatibility ?? [];
  if (!runsHere(tags)) {
    return false;
  }
  return tags.some((tag) => filters.includes(tag));
}

export default memo(function ExpoComponentsScreen({ apis }: { apis: ListElement[] }) {
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const visible = useMemo(
    () => apis.filter((item) => matchesFilters(item, filters)),
    [apis, filters]
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchToolbar />
      <ComponentFilters onChange={setFilters} />
      <ComponentListScreen apis={visible} />
    </View>
  );
});
