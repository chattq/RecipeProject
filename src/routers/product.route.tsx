import { RouteItem } from "../packages/types/route.type";
import HomePage from "../pages/Home/Home";
import RecipeDetail from "../pages/RecipeDetail/RecipeDetail";
import RecipeResultSearch from "../pages/RecipeResultSearch/RecipeResultSearch";

export const productRoutes: RouteItem[] = [
  {
    key: "productListMain",
    element: <HomePage />,
    path: "/",
    permissionCode: "",
    isProtected: false,
  },
  {
    key: "productListMain",
    element: <RecipeDetail />,
    path: "/cong-thuc/:recipe_name?",
    permissionCode: "",
    isProtected: false,
  },
  {
    key: "productListMain",
    element: <RecipeResultSearch />,
    path: "/results",
    permissionCode: "",
    isProtected: false,
  },
];
