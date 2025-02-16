import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./app-router";
import { ProtectedRoute } from "./packages/components/ProtectedRoute";
import { nanoid } from "nanoid";
import PageNotFound from "./packages/components/PageNotFound/PageNotFound";

function App() {
  // Giả lập trạng thái đăng nhập (thay bằng logic thật trong thực tế)
  const isAuthenticated = false; // Hoặc kiểm tra qua context, redux, hoặc localStorage
  return (
    <>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={nanoid()}
              path={route.path}
              element={
                route.isProtected ? (
                  <ProtectedRoute
                    element={route.element}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  route.element
                )
              }
            />
          );
        })}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
