import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

export const filterRecipes = (
  data: any,
  nameRecipes: string,
  orderBy: string,
  level: string[],
  ingredients: string[]
) => {
  const filteredData = data.filter((item: any) => {
    // Kiểm tra nếu name chứa từ khóa tìm kiếm (bắt buộc)
    const nameMatch = nameRecipes
      ? removeVietnameseTones(item.name)
          .toLowerCase()
          .includes(removeVietnameseTones(nameRecipes.toLowerCase()))
      : true;

    // Kiểm tra nếu level có giá trị và cook_level trong item nằm trong mảng level
    const levelMatch = level.length ? level.includes(item.cook_level) : true;

    // Kiểm tra nếu ingredients có giá trị và ít nhất một ingredient trong recipe_ingredients trùng với giá trị trong mảng ingredients
    const ingredientsMatch = ingredients.length
      ? item.recipe_ingredients &&
        item.recipe_ingredients.some((ingredient: any) =>
          ingredients.includes(ingredient.ingredients_id)
        )
      : true;

    // Kết hợp điều kiện bắt buộc với điều kiện tùy chọn
    return nameMatch && levelMatch && ingredientsMatch;
  });

  // Thêm sắp xếp theo orderBy
  if (orderBy === "like") {
    return filteredData.sort((a: any, b: any) => b.cook_like - a.cook_like);
  }

  // Nếu không có orderBy hoặc không hợp lệ, trả về dữ liệu đã lọc
  return filteredData;
};
