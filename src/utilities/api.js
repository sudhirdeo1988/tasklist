import axios from "axios";
import uuid from "react-uuid";

const apiId = "7b4d72d9";
const apiKey = "4ec1579c4ff720552144992599052595";
const baseUrl = "https://api.edamam.com";
export const apiCall = axios.create({
  baseURL: baseUrl,
  method: "GET",
});

export const getRecipeData = async (searchKey, pageFrom, pageTo) => {
  if (searchKey === "" || searchKey === undefined) {
    searchKey = "all";
  }
  const recipeDataUpdate = await apiCall.get(
    `/search?q=${searchKey}&from=${pageFrom}&to=${pageTo}&app_id=${apiId}&app_key=${apiKey}`
  );

  const newRecipeData = await recipeDataUpdate.data.hits.map(function (el) {
    const o = Object.assign({}, el);
    o.recipe.id = uuid();
    return o.recipe;
  });

  return newRecipeData;
};
