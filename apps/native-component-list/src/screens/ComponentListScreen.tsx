import Ionicons from '@react-native-vector-icons/ionicons';
import { isRunningInExpoGo } from 'expo';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  PixelRatio,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getScreenIdForLinking } from 'test-suite/screens/getScreenIdForLinking';

import { useTheme } from '../../../common/ThemeProvider';
import type { ScreenConfig } from '../types/ScreenConfig';

const useObserve: typeof import('expo-observe').useObserve = isRunningInExpoGo()
  ? () => ({ markInteractive: () => {} })
  : require('expo-observe').useObserve;

export interface ListElement {
  screenName?: string;
  name: string;
  route: string;
  isAvailable: boolean;
  platform?: 'ios' | 'android';
  community?: boolean;
}

/**
 * Converts component screen configs to ListElements with '/components/' prefix.
 * @param screens - Array of screen configurations
 */
export function componentScreensToListElements(screens: ScreenConfig[]): ListElement[] {
  return screens.map((screen) => ({
    name: screen.name,
    isAvailable: true,
    route: `/components/${getScreenIdForLinking(screen)}`,
    platform: screen.platform,
    community: screen.community,
  }));
}

/**
 * Converts API screen configs to ListElements with '/apis/' prefix.
 * @param screens - Array of screen configurations
 */
export function apiScreensToListElements(screens: ScreenConfig[]): ListElement[] {
  return screens.map((screen) => ({
    name: screen.name,
    isAvailable: true,
    route: `/apis/${getScreenIdForLinking(screen)}`,
  }));
}

interface Props {
  apis: ListElement[];
  renderItemRight?: (props: ListElement) => React.ReactNode;
  sort?: boolean;
  numColumns?: number;
}

function LinkButton({
  href,
  children,
  ...rest
}: {
  href: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);

  if (Platform.OS === 'web') {
    // It's important to use a `View` or `Text` on web instead of `TouchableX`
    // Otherwise React Native for Web omits the `onClick` prop that's passed
    // You can add hover effects using `onMouseEnter` and `onMouseLeave`
    return (
      <Link href={href} asChild>
        <Pressable
          pointerEvents={rest.disabled === true ? 'none' : 'auto'}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          {...rest}
          // `Link asChild` requires a flattened style object on its child.
          style={StyleSheet.flatten([
            {
              backgroundColor: isPressed ? theme.background.hover : undefined,
            },
            rest.style,
          ])}>
          {children}
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href={href} asChild>
      <TouchableHighlight
        underlayColor={theme.background.hover}
        {...rest}
        // `Link asChild` requires a flattened style object on its child.
        style={StyleSheet.flatten(rest.style)}>
        {children}
      </TouchableHighlight>
    </Link>
  );
}

export default function ComponentListScreen(props: Props) {
  const { theme } = useTheme();
  const { markInteractive } = useObserve();

  React.useEffect(() => {
    StatusBar.setHidden(false);
    markInteractive();
  }, [markInteractive]);

  const { width } = useWindowDimensions();
  const isMobile = width <= 640;
  const numColumns = props.numColumns ?? 1;
  const isGrid = numColumns > 1;

  // adjust the right padding for safe area -- we don't need the left because that's where the drawer is.
  const { bottom, right } = useSafeAreaInsets();
  const itemWidth = isGrid ? Math.floor((width - right) / numColumns) : undefined;

  const renderExampleSection: ListRenderItem<ListElement> = ({ item }) => {
    const { route, screenName, name: exampleName, isAvailable } = item;
    if (isGrid) {
      return (
        <LinkButton
          disabled={!isAvailable}
          href={route ?? screenName ?? exampleName}
          style={[
            styles.gridItem,
            {
              width: itemWidth,
              height: 128,
              borderColor: theme.border.secondary,
            },
          ]}>
          <View style={styles.gridItemBody}>
            <View
              pointerEvents="none"
              style={[styles.gridItemContent, !isAvailable && styles.disabledRow]}>
              {props.renderItemRight && props.renderItemRight(item)}
              <Text numberOfLines={4} style={[styles.gridLabel, { color: theme.text.default }]}>
                {exampleName}
              </Text>
            </View>
            {item.platform || item.community ? (
              <View pointerEvents="none" style={styles.catalogMarks}>
                {item.platform ? <PlatformMark platform={item.platform} /> : null}
                {item.community ? <Text style={styles.communityLabel}>Community</Text> : null}
              </View>
            ) : null}
          </View>
        </LinkButton>
      );
    }
    return (
      <LinkButton
        disabled={!isAvailable}
        href={route ?? screenName ?? exampleName}
        style={[styles.rowTouchable, { borderBottomColor: theme.border.secondary }]}>
        <View
          pointerEvents="none"
          style={[styles.row, !isAvailable && styles.disabledRow, { paddingRight: 10 + right }]}>
          {props.renderItemRight && props.renderItemRight(item)}
          <Text style={[styles.rowLabel, { color: theme.text.default }]}>{exampleName}</Text>
          <Text style={styles.rowDecorator}>
            <Ionicons name="chevron-forward" size={18} color={theme.icon.secondary} />
          </Text>
        </View>
      </LinkButton>
    );
  };

  const keyExtractor = React.useCallback((item: ListElement) => item.name, []);

  const sortedApis = React.useMemo(() => {
    if (props.sort === false) {
      return props.apis;
    }
    return props.apis.sort((a, b) => {
      if (a.isAvailable !== b.isAvailable) {
        if (a.isAvailable) {
          return -1;
        }
        return 1;
      }
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    });
  }, [props.apis]);

  return (
    <FlatList<ListElement>
      key={isGrid ? `grid-${numColumns}` : 'list'}
      numColumns={numColumns}
      initialNumToRender={isGrid ? numColumns * 8 : 25}
      removeClippedSubviews={false}
      // Screens with a native search bar or large title grow their header at runtime, so let iOS
      // inset the list instead of letting the header cover the first rows.
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={{ backgroundColor: theme.background.screen }}
      contentContainerStyle={{
        paddingBottom: isMobile ? 0 : bottom,
        paddingRight: isGrid ? right : 0,
      }}
      data={sortedApis}
      keyExtractor={keyExtractor}
      renderItem={renderExampleSection}
    />
  );
}

function PlatformMark({ platform }: { platform: 'ios' | 'android' }) {
  const backgroundColor = platform === 'ios' ? '#007AFF' : '#3DDC84';
  return (
    <View style={styles.platformMark}>
      <View style={[styles.platformDot, { backgroundColor }]} />
      <Text style={[styles.platformMarkText, { color: backgroundColor }]}>
        {platform === 'ios' ? 'iOS' : 'Android'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDecorator: {
    alignSelf: 'flex-end',
    paddingRight: 4,
  },
  rowTouchable: {
    borderBottomWidth: 1.0 / PixelRatio.get(),
  },
  disabledRow: {
    opacity: 0.3,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
  },
  gridItem: {
    borderBottomWidth: 1.0 / PixelRatio.get(),
    borderRightWidth: 1.0 / PixelRatio.get(),
  },
  gridItemBody: {
    flex: 1,
  },
  gridItemContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  gridLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  catalogMarks: {
    position: 'absolute',
    top: 8,
    left: 8,
    gap: 2,
  },
  platformMark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  communityLabel: {
    color: '#00BCD4',
    fontSize: 10,
    fontWeight: '600',
  },
  platformDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  platformMarkText: {
    fontSize: 10,
    fontWeight: '600',
  },
  rowIcon: {
    marginRight: 10,
    marginLeft: 6,
  },
});
