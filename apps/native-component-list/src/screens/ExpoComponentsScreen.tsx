import { memo } from 'react';

import ExpoAPIIcon from '../components/ExpoAPIIcon';
import { SearchToolbar } from '../navigation/StackConfig';
import ComponentListScreen, { type ListElement } from './ComponentListScreen';

export default memo(function ExpoComponentsScreen({ apis }: { apis: ListElement[] }) {
  return (
    <>
      <SearchToolbar />
      <ComponentListScreen
        renderItemRight={({ name }: { name: string }) => <ExpoAPIIcon name={name} />}
        numColumns={3}
        apis={apis}
      />
    </>
  );
});
