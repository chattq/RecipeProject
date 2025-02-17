import { useEffect, useState } from "react";
import MainLayout from "../../packages/layouts/MainLayout/MainLayout";
import {
  dataProductDetail,
  productMoreData,
  productPopularData,
} from "../../packages/mock/products";
import { ProductItem } from "../../packages/types/product.type";
import ProductCard from "../../packages/components/ProductCard/ProductCard";
import { nanoid } from "nanoid";
import useQueryParams from "../../packages/hooks/useQueryParams";
import RecipeFilter from "./components/RecipeFilter";

import { useLocation } from "react-router-dom";
import { filterRecipes } from "./RecipeResult.service";
import { Empty } from "antd";

export default function RecipeResultSearch() {
  const queryParams = useQueryParams();
  const location = useLocation();
  const [dataReultSearch, setDataResultSearch] = useState([
    ...productPopularData,
    ...productMoreData,
  ]);

  const [isManualTrigger, setIsManualTrigger] = useState(false);

  const handleSearchAndFilter = () => {
    const mergedData = [...productPopularData, ...productMoreData].map(
      (item1) => {
        const item2 = dataProductDetail.find((item) => item.id === item1.id);
        return {
          ...item1,
          recipe_ingredients: item2?.recipe_ingredients ?? [],
        };
      }
    );
    const queryIngredient = queryParams?.ingredient?.split(",") ?? [];
    const queryLevel = queryParams?.level?.split(",") ?? [];
    setDataResultSearch(
      filterRecipes(
        mergedData,
        queryParams?.q,
        queryParams?.arrange ?? "",
        queryLevel,
        queryIngredient
      )
    );
  };
  useEffect(() => {
    if (!isManualTrigger) {
      handleSearchAndFilter();
    }
  }, [location.search, isManualTrigger]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      setIsManualTrigger(isMobile);
    };

    handleResize(); // Thiết lập ban đầu
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <RecipeFilter onFilter={handleSearchAndFilter} />
        <div className="h-[8px] bg-[#e0dfdf] recipe_filter_responsive"></div>
        <div className="recipe_layout_product_container">
          {dataReultSearch.length > 0 ? (
            <div className="grid grid-cols-4 gap-y-5 gap-x-[30px] gap-y-[30px] recipe_layout_product  mt-[25px] tablet_home_layout_product mobile_home_layout_product laptop_home_layout_product">
              {dataReultSearch?.map((item: ProductItem) => {
                return <ProductCard key={nanoid()} data={item} />;
              })}
            </div>
          ) : (
            <Empty
              style={{
                marginTop: "60px",
              }}
              description="Không tìm thấy dữ liệu"
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
