import { AuthProvider, useAuth } from './app/AuthContext';
import { SurveyProvider } from './app/SurveyContext';
import { NavigationProvider, useNavigation, type Screen } from './app/NavigationContext';
import { PhoneFrame } from './components/PhoneFrame';
import { Decode } from './features/decode/Decode';
import { Home } from './features/home/Home';
import { Compare } from './features/compare/Compare';
import { Mentors } from './features/mentors/Mentors';
import { Profile } from './features/profile/Profile';
import { Learn } from './features/learn/Learn';
import { Splash } from './features/auth/Splash';
import { SignIn } from './features/auth/SignIn';

const SCREENS: Screen[] = ['home', 'decode', 'compare', 'mentors', 'profile', 'learn'];

function screenComponent(screen: Screen) {
  switch (screen) {
    case 'home':
      return <Home />;
    case 'decode':
      return <Decode />;
    case 'compare':
      return <Compare />;
    case 'mentors':
      return <Mentors />;
    case 'profile':
      return <Profile />;
    case 'learn':
      return <Learn />;
  }
}

/** All screens stay mounted at once (matching the reference's `.screen.active` toggling) so
 *  in-progress state — survey progress, decode picker state, etc. — survives tab switches. */
function AppScreens() {
  const { screen: activeScreen } = useNavigation();
  return (
    <>
      {SCREENS.map((screen) => (
        <div key={screen} className={screen === activeScreen ? 'block' : 'hidden'}>
          {screenComponent(screen)}
        </div>
      ))}
    </>
  );
}

/** Gates entry into the tabbed app behind splash → sign in → profile, in that order. */
function AuthFlow() {
  const { stage, completeSignIn, enterApp } = useAuth();

  switch (stage) {
    case 'splash':
      return <Splash />;
    case 'signin':
      return <SignIn onSubmit={completeSignIn} />;
    case 'profile-gate':
      return <Profile showEnterCta onEnter={enterApp} />;
    case 'app':
      return <AppScreens />;
  }
}

function App() {
  return (
    <SurveyProvider>
      <AuthProvider>
        <NavigationProvider>
          <PhoneFrame>
            <AuthFlow />
          </PhoneFrame>
        </NavigationProvider>
      </AuthProvider>
    </SurveyProvider>
  );
}

export default App;
