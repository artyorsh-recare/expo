import React from 'react';

export type Filter = 'ios' | 'android' | 'community';

export type ScreenConfig = {
  getComponent(): React.ComponentType<object> | (() => React.ReactElement);
  name: string;
  route?: string;
  options?: object;
  compatibility?: Filter[];
};
