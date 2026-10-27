import { getWebNativeTabsTheme, useTheme } from 'ThemeProvider';
import { NativeTabs } from 'expo-router/native-tabs';
import * as React from 'react';

import { optionalRequire } from '../../optionalRequire';

// The components tab renders screens from `native-component-list`;
// hide it when the package isn't bundled.
const hasNativeComponentList = !!optionalRequire(() =>
  require('native-component-list/src/navigation/screenRegistry')
);

export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <NativeTabs {...(process.env.EXPO_OS === 'web' && getWebNativeTabsTheme(theme))}>
      <NativeTabs.Trigger name="components" hidden={!hasNativeComponentList}>
        <NativeTabs.Trigger.Icon sf="atom" md="widgets" />
        <NativeTabs.Trigger.Label>Components</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="test-suite">
        <NativeTabs.Trigger.Icon sf="checklist" md="checklist" />
        <NativeTabs.Trigger.Label>Tests</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
