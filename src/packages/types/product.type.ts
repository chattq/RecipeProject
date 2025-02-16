export interface ProductItem {
  id: number;
  name: string;
  description: string;
  image: string;
  cook_time: string;
  cook_level: string;
  cook_view: string;
  cook_like: string | number;
  recipe_by: string;
  recipe_by_image: string;
}

export interface productMainItem {
  id: number;
  data: any[];
  title: string;
}
export interface productMainPopularItem {
  id: number;
  data: any[];
}

//thành phần
export interface Recipe_Ingredients {
  ingredients_id: number;
  ingredient_name: string;
  ingredient_unit: string;
}

// Hướng dẫn thực hiện
export interface Instructions_Images {
  instruction_image_id: number;
  instruction_image_image: string;
}
export interface Recipe_Instructions {
  instruction_id: number;
  instruction_description: string;
  instruction_image_list: Instructions_Images[];
}
///========================

export interface ProductDetailItem {
  id: number;
  image: string;
  recipe_name: string;
  recipe_by: string;
  recipe_by_image: string;
  recipe_follow: string;
  recipe_number: string;
  recipe_servings: number;
  cook_time: string;
  cook_level: string;
  cook_view: string;
  cook_like: string | number;
  description: string;
  recipe_ingredients: Recipe_Ingredients[]; //thành phần
  recipe_instructions: Recipe_Instructions[]; // hướng dẫn Hướng dẫn thực hiện
}
