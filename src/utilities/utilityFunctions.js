export const checkFoodType = recipe =>{
  const foodType = recipe.includes('Vegetarian');
  return foodType;
}

export const checkInFav = (favRecipe, recipeDtls) =>{
  let checkObj = null;
  if(favRecipe.length === 0){
    checkObj = false;
  }else{
    checkObj = favRecipe.some(item => item.id === recipeDtls.id);
  }
  return checkObj;
}
