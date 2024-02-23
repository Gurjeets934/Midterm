const Recipe = require('../model/recipe');

exports.getAllRecipe = async(req, res)=>{
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})

    }
};

exports.getAllIngredients = async(req, res)=>{
    try{
        const ingredients = await Recipe.distinct('ingredients')
        res.json(ingredients);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
};

exports.getRecipiesByCuisine = async(req, res)=>{
    try{
        const cuisine = req.params.cuisine;
        const recipes = await Recipe.find({ cuisine });
        res.json(recipes);
        console.log('cusine controller function');
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})

    }
};

exports.getIngredientName = async(req, res)=>{
    try{
        const ingredientName = req.params.ingredientName;
        const recipes = await Recipe.find({ ingredients: ingredientName });
        res.json({
            ingredientName,
            usageCount: recipes.length,
            recipesUsingIngredient: recipes
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})

    }
};


exports.findRecipe= async(req, res)=>{
  try{
      const id = req.params.id;
      const findRecipe =  await Recipe.findById(id);
      if (!findRecipe) {
          return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(findRecipe);
      
  }
  catch(error){
      console.error(error);
      res.status(500).json({error:"Internal server error"})
  }
};
