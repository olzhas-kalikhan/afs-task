import { Protected, Public } from "./components/auth-check";
import DashboardPage from "./pages/dashboard";
import SignInPage from "./pages/sign-in";
import QueryProvider from "./providers/query-provider";

function App() {
  return (
    <QueryProvider>
      <Public>
        <SignInPage />
      </Public>
      <Protected>
        <DashboardPage />
      </Protected>
    </QueryProvider>
  );
}

export default App;
