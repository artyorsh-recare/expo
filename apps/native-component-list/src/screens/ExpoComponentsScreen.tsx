import { memo, useMemo, useState } from 'react';

import ComponentFilters, { defaultFilters, type Filter } from '../components/ComponentFilters';
import { SearchToolbar } from '../navigation/StackConfig';
import ComponentListScreen, { type ListElement } from './ComponentListScreen';

function matchesFilters(item: ListElement, filters: Filter[]): boolean {
  const tags = item.compatibility ?? [];
  const selectedPlatforms = filters.filter(
    (filter): filter is 'ios' | 'android' => filter === 'ios' || filter === 'android'
  );
  const matchesPlatform =
    selectedPlatforms.length === 0 || selectedPlatforms.some((platform) => tags.includes(platform));

  if (tags.includes('community')) {
    return filters.includes('community') && matchesPlatform;
  }
  return selectedPlatforms.some((platform) => tags.includes(platform));
}

export default memo(function ExpoComponentsScreen({ apis }: { apis: ListElement[] }) {
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const visible = useMemo(
    () => apis.filter((item) => matchesFilters(item, filters)),
    [apis, filters]
  );

  return (
    <>
      <SearchToolbar />
      <ComponentFilters onChange={setFilters} />
      <ComponentListScreen apis={visible} />
    </>
  );
});
