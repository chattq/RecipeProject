import { Breadcrumb, TableColumnsType } from "antd";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../packages/layouts/MainLayout/MainLayout";
import { HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useQueryParams from "../../packages/hooks/useQueryParams";
import {
  ProductDetailItem,
  Recipe_Ingredients,
  Recipe_Instructions,
} from "../../packages/types/product.type";
import { dataProductDetail } from "../../packages/mock/products";
import { Table } from "antd";
import "./RecipeDetail.scss";
import RecipeInstruction from "./components/RecipeInstruction/RecipeInstruction";
import { FaRegHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function RecipeDetail() {
  const nav = useNavigate();
  const [dataDetail, setDataDetail] = useState<ProductDetailItem>();

  const queryParams = useQueryParams();

  useEffect(() => {
    if (queryParams?.recipe_id) {
      setDataDetail(
        dataProductDetail.find(
          (item: ProductDetailItem) => item.id === queryParams.recipe_id
        )
      );
    }
  }, [queryParams?.recipe_id]);

  const columns: TableColumnsType<Recipe_Ingredients> = [
    { title: "Thành phần", dataIndex: "ingredient_name" },
    {
      title: "Đơn vị",
      dataIndex: "ingredient_unit",
      render: (value) => {
        return <div className="text-right">{value}</div>;
      },
    },
  ];

  const dataSource = dataDetail?.recipe_ingredients?.map((val) => {
    return {
      ingredient_name: val.ingredient_name,
      ingredient_unit: val.ingredient_unit,
      ingredients_id: val.ingredients_id,
    };
  });

  return (
    <MainLayout className="w-auto desktop tablet laptop mobile">
      <Breadcrumb
        className="tablet_breadcrumb mobile_breadcrumb"
        style={{
          marginBottom: "15px",
          marginTop: "10px",
        }}
        items={[
          {
            onClick: () => nav("/"),
            title: (
              <HomeOutlined
                style={{
                  cursor: "pointer",
                }}
              />
            ),
          },
          {
            title: `${dataDetail?.recipe_name}`,
          },
        ]}
      />

      <div className="m-auto flex justify-center bg-[#dedede70] rounded-[10px]">
        <img
          src={dataDetail?.image}
          alt={dataDetail?.image}
          className="h-[470px] w-[750px] object-cover mobile_image"
        />
      </div>
      <div className="tablet_content mobile_content">
        <div>
          <h2 className="text-[#0F0F0F] text-[25px] font-semibold pt-3">
            {dataDetail?.recipe_name}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-2">
              <span className="FaRegHeart cursor-pointer">
                <FaRegHeart size={16} color="#777" />
              </span>
              <span className="text-[15px] font-semibold text-[#777]">
                {dataDetail?.cook_like}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="FaRegHeart cursor-pointer">
                <FaEye size={16} color="#777" />
              </span>
              <span className="text-[15px] font-semibold text-[#777]">
                {dataDetail?.recipe_follow}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 py-4">
            <Link to={"*"}>
              <img
                src={
                  dataDetail?.recipe_by_image ??
                  "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
                }
                alt={dataDetail?.recipe_by_image}
                className="w-[40px] h-[40px] rounded-full cursor-pointer"
              />
            </Link>
            <div>
              <div className="text-[16px] font-bold text-[#333333] cursor-pointer hover:underline">
                {dataDetail?.recipe_by}
              </div>
              <div className="text-[13px] text-[#6b6b6b]">
                {dataDetail?.recipe_number} công thức •{" "}
                {dataDetail?.recipe_follow} người theo dõi
              </div>
            </div>
          </div>
          <p className="text-[14px] text[rgb(19,19,19)] ">
            {dataDetail?.description}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between pt-4 pb-1">
            <h3 className="text-[#0F0F0F] text-[20px] font-semibold">
              Thành phần
            </h3>
            <span className="text-[#626262] text-[13px] font-semibold">{`Khẩu phần: ${dataDetail?.recipe_servings} người`}</span>
          </div>
          <Table<Recipe_Ingredients>
            className="tabe_ingredients"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            showHeader={false}
          />
        </div>
        <div>
          <div className="py-4">
            <h3 className="text-[#0F0F0F] text-[20px] font-semibold">
              Hướng dẫn thực hiện
            </h3>
          </div>
          <RecipeInstruction
            data={dataDetail?.recipe_instructions as Recipe_Instructions[]}
          />
        </div>
      </div>
    </MainLayout>
  );
}
