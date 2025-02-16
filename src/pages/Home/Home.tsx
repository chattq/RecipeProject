import { nanoid } from "nanoid";
import MainLayout from "../../packages/layouts/MainLayout/MainLayout";
import { categories } from "../../packages/mock/categories";
import { CategorieItem } from "../../packages/types/categories.type";
import CategoryCard from "../../packages/components/CategoryCard/CategoryCard";
import LayoutProduct from "../../packages/layouts/LayoutProduct/LayoutProduct";
import { Link } from "react-router-dom";
import ProductCard from "../../packages/components/ProductCard/ProductCard";
import {
  productMoreData,
  productPopularData,
} from "../../packages/mock/products";
import {
  ProductItem,
  productMainItem,
} from "../../packages/types/product.type";

export default function Home() {
  const productMainItem: productMainItem[] = [
    {
      id: 1,
      title: "Công thức nấu ăn phổ biến",
      data: productPopularData,
    },
    {
      id: 2,
      title: "Cách Nấu Canh Chua Ba Miền",
      data: productMoreData,
    },
  ];
  return (
    <MainLayout className="mobile_home tablet laptop_home laptop_home_cus">
      <div className="pb-5 pt-[35px] tablet_home_contaier mobile_home_contaier">
        <div className="grid grid-cols-8 gap-y-5 gap-x-[20px] px-8 mobile_home_categories">
          {categories?.map((item: CategorieItem) => {
            return (
              <Link key={nanoid()} to={"*"}>
                <CategoryCard data={item} key={item.id} />
              </Link>
            );
          })}
        </div>
        <div className="tablet_home_content">
          {productMainItem.map((item: productMainItem) => {
            return (
              <LayoutProduct
                key={nanoid()}
                style={{
                  styleContainer: "mt-[30px]",
                  styleTitle: "pb-[20px]",
                }}
                title={item.title}
                buttonMore={{
                  isMore: item.data.length === 4,
                  pathName: "",
                }}
                child={
                  <div className="grid grid-cols-4 gap-y-5 gap-x-[30px] tablet_home_layout_product gap-y-[30px] mobile_home_layout_product laptop_home_layout_product">
                    {item.data?.map((item: ProductItem) => {
                      return <ProductCard key={nanoid()} data={item} />;
                    })}
                  </div>
                }
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
