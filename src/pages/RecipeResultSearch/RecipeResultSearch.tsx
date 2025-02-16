import { useEffect, useState } from "react";
import MainLayout from "../../packages/layouts/MainLayout/MainLayout";
import {
  productMoreData,
  productPopularData,
} from "../../packages/mock/products";
import { ProductItem } from "../../packages/types/product.type";
import ProductCard from "../../packages/components/ProductCard/ProductCard";
import { nanoid } from "nanoid";
import useQueryParams from "../../packages/hooks/useQueryParams";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";
import RecipeFilter from "./components/RecipeFilter";

export default function RecipeResultSearch() {
  const queryParams = useQueryParams();
  const [dataReultSearch, setDataResultSearch] = useState([
    ...productPopularData,
    ...productMoreData,
  ]);
  useEffect(() => {
    const dataCopy = [...productPopularData, ...productMoreData];
    if (queryParams?.q) {
      setDataResultSearch(
        dataCopy.filter((obj) =>
          removeVietnameseTones(obj.name.toLowerCase()).includes(
            removeVietnameseTones(queryParams?.q.toLowerCase())
          )
        )
      );
    }
  }, [queryParams?.q]);

  return (
    <MainLayout className="w-[calc(100%_-_250px*2)] mobile_home tablet_recipe laptop_home laptop_home_cus">
      <div className="pb-7 recipe_layout">
        <h3 className="text-[#0F0F0F] text-[25px] font-semibold recipe_result">
          <span className="text-[#c70808] font-bold">
            {dataReultSearch.length}
          </span>{" "}
          cách làm{" "}
          <span className="text-[#c70808] font-bold">
            {queryParams.q ?? "món ăn"}
          </span>{" "}
          ngon
        </h3>
        <RecipeFilter />
        <div className="h-[8px] bg-[#e0dfdf] recipe_filter_responsive"></div>
        <div className="recipe_layout_product_container">
          <div className="grid grid-cols-4 gap-y-5 gap-x-[30px] gap-y-[30px] recipe_layout_product  mt-[25px] tablet_home_layout_product mobile_home_layout_product laptop_home_layout_product">
            {dataReultSearch?.map((item: ProductItem) => {
              return <ProductCard key={nanoid()} data={item} />;
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
