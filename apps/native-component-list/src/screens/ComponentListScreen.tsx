import { isRunningInExpoGo } from 'expo';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
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
import { filterColors, type Filter, type ScreenConfig } from '../types/ScreenConfig';

const useObserve: typeof import('expo-observe').useObserve = isRunningInExpoGo()
  ? () => ({ markInteractive: () => {} })
  : require('expo-observe').useObserve;

export interface ListElement {
  screenName?: string;
  name: string;
  route: string;
  isAvailable: boolean;
  compatibility?: Filter[];
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
    compatibility: screen.compatibility,
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

const NUM_COLUMNS = 3;

interface Props {
  apis: ListElement[];
  renderItemRight?: (props: ListElement) => React.ReactNode;
  sort?: boolean;
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

  // adjust the right padding for safe area -- we don't need the left because that's where the drawer is.
  const { bottom, right } = useSafeAreaInsets();
  const gridGap = 4;
  const gridPadding = 4;
  const itemWidth = Math.floor(
    (width - right - gridPadding * 2 - gridGap * (NUM_COLUMNS - 1)) / NUM_COLUMNS
  );

  const renderExampleSection: ListRenderItem<ListElement> = ({ item }) => {
    const { route, screenName, name: exampleName, isAvailable } = item;
    return (
      <LinkButton
        disabled={!isAvailable}
        href={route ?? screenName ?? exampleName}
        style={{
          width: itemWidth,
          height: 80,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: theme.border.secondary,
          overflow: 'hidden',
        }}>
        <View style={styles.gridItemBody}>
          <View
            pointerEvents="none"
            style={[styles.gridItemContent, !isAvailable && styles.disabledRow]}>
            {props.renderItemRight && props.renderItemRight(item)}
            <Text numberOfLines={4} style={[styles.gridLabel, { color: theme.text.default }]}>
              {exampleName}
            </Text>
          </View>
          <CatalogMarks compatibility={item.compatibility} />
        </View>
      </LinkButton>
    );
  };

  const keyExtractor = React.useCallback((item: ListElement) => item.route, []);

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
      const byName = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      if (byName !== 0) {
        return byName;
      }
      return a.route.localeCompare(b.route);
    });
  }, [props.apis]);

  return (
    <FlatList<ListElement>
      numColumns={NUM_COLUMNS}
      initialNumToRender={NUM_COLUMNS * 8}
      removeClippedSubviews={false}
      // Screens with a native search bar or large title grow their header at runtime, so let iOS
      // inset the list instead of letting the header cover the first rows.
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={{ backgroundColor: theme.background.screen, flex: 1 }}
      columnWrapperStyle={{ gap: gridGap }}
      contentContainerStyle={{
        paddingBottom: isMobile ? 0 : bottom,
        paddingHorizontal: gridPadding,
        paddingRight: gridPadding + right,
        gap: gridGap,
      }}
      data={sortedApis}
      keyExtractor={keyExtractor}
      renderItem={renderExampleSection}
    />
  );
}

function CatalogMarks({ compatibility }: { compatibility?: Filter[] }) {
  const tags = compatibility ?? [];
  if (!tags.some((tag) => tag !== 'universal')) {
    return null;
  }
  return (
    <View pointerEvents="none" style={styles.catalogMarks}>
      {tags.includes('ios-only') ? <CatalogMark color={filterColors['ios-only']} /> : null}
      {tags.includes('android-only') ? <CatalogMark color={filterColors['android-only']} /> : null}
      {tags.includes('community') ? <CatalogMark color={filterColors.community} /> : null}
      {tags.includes('hero-ui') ? <CatalogMark color={filterColors['hero-ui']} /> : null}
    </View>
  );
}

function CatalogMark({ color }: { color: string }) {
  return <View style={[styles.catalogMark, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  disabledRow: {
    opacity: 0.3,
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
    flexDirection: 'row',
    gap: 2,
  },
  catalogMark: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rowIcon: {
    marginRight: 10,
    marginLeft: 6,
  },
});
