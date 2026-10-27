import React from 'react';

export type Filter = 'universal' | 'ios-only' | 'android-only' | 'community';

export const filterColors: Record<Exclude<Filter, 'universal'>, string> = {
  'ios-only': '#007AFF',
  'android-only': '#34C759',
  community: '#C17F59',
};

export type ScreenConfig = {
  getComponent(): React.ComponentType<object> | (() => React.ReactElement);
  name: string;
  route?: string;
  options?: object;
  compatibility?: Filter[];
};
