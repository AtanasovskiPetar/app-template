import { AuthProvider } from "./setup/AuthProvider";
import RoutesManager from "./setup/RoutesManager";

const App = () => {
  return (
    <AuthProvider>
      <RoutesManager />
    </AuthProvider>
  );
};

export default App;
