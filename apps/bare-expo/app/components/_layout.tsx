import { useTheme } from 'ThemeProvider';
import { Stack } from 'expo-router';
import { HeroUINativeProvider } from 'heroui-native/provider';
import * as React from 'react';

import { optionalRequire } from '../../optionalRequire';

const getStackScreenOptions = optionalRequire(() =>
  require('native-component-list/src/navigation/StackConfig')
)?.getStackScreenOptions;

export default function ComponentsLayout() {
  const { theme } = useTheme();
  return (
    <HeroUINativeProvider>
      <Stack screenOptions={getStackScreenOptions?.(theme)}>
        <Stack.Screen name="index" options={{ title: 'Components in Expo SDK' }} />
      </Stack>
    </HeroUINativeProvider>
  );
}
