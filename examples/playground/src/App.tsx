import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Group,
  NavLink,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconMoonStars, IconSun} from '@tabler/icons-react';
import {Link, Route, Switch} from 'wouter';
import Logs from './components/Logs';
import BannerAd from './pages/BannerAd';
import Consent from './pages/Consent';
import Home from './pages/Home';
import InterstitialAd from './pages/InterstitialAd';
import WebviewAd from './pages/WebviewAd';

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
  const [opened, {toggle}] = useDisclosure();

  return (
    <AppShell
      navbar={{
        breakpoint: 'sm',
        collapsed: {mobile: !opened},
        width: {sm: 200, lg: 300},
      }}
      header={{height: {base: 60, md: 70}}}
      footer={{height: 180}}
    >
      <AppShell.Header p="md">
        <Group justify="space-between">
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            color={theme.colors.gray[6]}
          />

          <Anchor component={Link} href="/">
            AdMob Plus
          </Anchor>

          <ThemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" hidden={!opened} onClick={toggle}>
        <NavLink component={Link} href="/consent" label="Consent" />
        <NavLink component={Link} href="/banner-ad" label="Banner Ad" />
        <NavLink
          component={Link}
          href="/interstitial-ad"
          label="Interstitial Ad"
        />
        <NavLink component={Link} href="/webview-ad" label="Webview Ad" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/banner-ad">
            <BannerAd />
          </Route>
          <Route path="/consent">
            <Consent />
          </Route>
          <Route path="/interstitial-ad">
            <InterstitialAd />
          </Route>
          <Route path="/webview-ad">
            <WebviewAd />
          </Route>
        </Switch>
      </AppShell.Main>

      <AppShell.Footer p="md" style={{overflowY: 'scroll'}}>
        <Logs />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
