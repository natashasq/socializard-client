import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuthDispatch } from "contexts/AuthContext";
import { getAuth } from "utils/auth";
import { checkToken } from "service/token";
const AppStructure = lazy(() => import("./routes/AppStructure"));

function App() {
  const dispatch = useAuthDispatch();
  const auth = getAuth();

  useEffect(() => {
    if (auth) {
      dispatch({ type: "REFRESH_AUTH" });
    }
  }, [auth]);

  useEffect(() => {
    (async () => {
      try {
        await checkToken();
      } catch (e) {
        dispatch({ type: "LOGOUT" });
      }
    })();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <AppStructure />
      </Suspense>
    </Router>
  );
}

export default App;
