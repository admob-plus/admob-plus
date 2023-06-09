import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, Route, Switch } from 'wouter';
import Logs from './components/Logs';
import BannerAd from './pages/BannerAd';
import WebviewAd from './pages/WebviewAd';
import Home from './pages/Home';
import InterstitialAd from './pages/InterstitialAd';

function ThemeToggle() {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  return (
    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
      {colorScheme === 'dark' ? (
        <IconSun size="1rem" />
      ) : (
        <IconMoonStars size="1rem" />
      )}
    </ActionIcon>
  );
}

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{sm: 200, lg: 300}}
          onClick={() => {
            setOpened(!opened);
          }}
        >
          <NavLink component={Link} href="/banner-ad" label="Banner Ad" />
          <NavLink
            component={Link}
            href="/interstitial-ad"
            label="Interstitial Ad"
          />
          <NavLink
            component={Link}
            href="/webview-ad"
            label="Webview Ad"
          />
        </Navbar>
      }
      footer={
        <Footer height={180} p="md" style={{overflowY: 'scroll'}}>
          <Logs />
        </Footer>
      }
      header={
        <Header height={{base: 60, md: 70}} p="md">
          <Group position="apart">
            <MediaQuery largerThan="sm" styles={{display: 'none'}}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Anchor component={Link} href="/">
              AdMob Plus
            </Anchor>
            <ThemeToggle />
          </Group>
        </Header>
      }
    >
      <Switch>
        <Route path="/">
          <BannerAd />
          <Home />
        </Route>
        <Route path="/banner-ad">
          <BannerAd />
        </Route>
        <Route path="/interstitial-ad">
          <InterstitialAd />
        </Route>
        <Route path="/webview-ad">
          <WebviewAd />
        </Route>
      </Switch>
    </AppShell>
  );
}

export default App;
