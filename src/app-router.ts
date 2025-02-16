import { RouteItem } from "./packages/types/route.type";
import { productRoutes } from "./routers/product.route";

export const routes: RouteItem[] = [...productRoutes];
