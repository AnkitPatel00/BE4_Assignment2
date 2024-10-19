const initializeDatabase = require('./db/db.connect')
const experss = require('express')
const cors = require('cors')
const app = experss()
app.use(experss.json())
app.use(cors({origin:"*"}))

const RecipeModel = require('./models/recipe.model')

// 2
initializeDatabase()

//3,4,5 add recipes function

const addRecipes =async (recipeData) => {
  try {
    const newRecipe = new RecipeModel(recipeData)
    if (newRecipe)
    {
      const savedRecipe = await newRecipe.save()
      return savedRecipe
    }
  }
  catch (error)
  {
    console.log("Error in adding recipe")
  }
}

//3,4,5 add recipes handle requiests

app.post('/recipes', async (req, res) => {
  const recipeData=req.body
  try {
    const savedRecipe = await addRecipes(recipeData)
    if (savedRecipe)
    {
      res.status(201).json({message:'new recipe added successfully:',savedRecipe})
    }
  }
  catch (error)
  {
res.status(500).json({error:"failed to add recipe",error})
  }
})

//6. read all recipe function

const readAllRecipe =async () => {
  try {
    const allRecipes = await RecipeModel.find()
    return allRecipes
  }
  catch (error)
  {
console.log('Error in read all recipes',error)
  }
}

//6. handle requiest for read all recipe

app.get('/recipes',async (req,res) => {
  try {
    const allRecipes = await readAllRecipe()
    res.status(200).json(allRecipes)
  }
  catch (error)
  {
    res.status(500).json({error:'failed to get all recipes',error})
  }
})

//7. get recipe by title

const readRecipeByTitile =async (recipeTitle) => {
  try {
    const recipes = await RecipeModel.findOne({ title: recipeTitle })
    return recipes
  }
  catch (error)
  {
    console.log('error in read recipe by title',error)
  }
}

//7. hadle requiest for recipe by title

app.get('/recipes/:recipeTitle', async (req, res) => {
  const recipeTitle = req.params.recipeTitle
  try {
    const recipes = await readRecipeByTitile(recipeTitle)
    if (recipes)
    {
      res.status(200).json({recipes})
    }
  }
  catch (error)
  {
res.status.json({error:"failed to get recipes by title",error})
  }
})

// 8. get all recipes by author

const readRecipesByAuthor = async (recipeAuthor) => {
  try {
    const recipes = await RecipeModel.find({ author: recipeAuthor })
    if (recipes)
    {
      return recipes
    }
  }
  catch (error)
  {
    console.log('error in get all recipes by author',error)
  }
}

// 8. handle requiest for get all recipes by author

app.get('/recipes/author/:recipeAuthor', async (req, res) => {
  const recipeAuthor = req.params.recipeAuthor
  try {
    const recipes = await readRecipesByAuthor(recipeAuthor)
    res.status(200).json(recipes)
  }
  catch (error)
  {
res.status(500).json({error:'failed to get all recipes by author',error})
  }
})

// 9. get recipes by difficulty level.

const readRecipeByDifficulty =async (difficultyLevel) => {
  try {
    const recipes = await RecipeModel.find({ difficulty: difficultyLevel })
    if (recipes)
    {
      return recipes
    }
  }
  catch (error)
  {
    console.log('error in get recipes by difficulty level',error)
  }
}

// 9. handle request for get recipes by difficulty level.

app.get('/recipes/difficulty/:difficultyLevel',async (req, res) => {
  const difficultyLevel = req.params.difficultyLevel
  try {
    const recipes = await readRecipeByDifficulty(difficultyLevel)
    if (recipes)
    {
      res.status(200).json(recipes)
    }
  }
  catch (error)
  {
    res.status(500).json({error:'failed to get recipes by difficulty level',error})
  }
})

//10. upadate recipe by Id

const updateRecipeById = async (recipeId) => {
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId,{new:true})
    if (updatedRecipe)
    {
      return updatedRecipe
    }

  }
  catch (error)
  {
    console.log('error in upadate recipe by Id',error)
  }
}

//10. handle requirest for upadate recipe by Id
app.post('/recipes/updateById/:recipeID', async (req, res) => {
  const recipeID= req.params.recipeID
  try {
    const updatedRecipe = await updateRecipeById(recipeID)
    if (updatedRecipe)
    {
res.status(200).json({message:"Recipe Updated Successfully.",updatedRecipe})
    }
    else
    {
      res.status(404).json({error:'recipe not found in upadate recipe by Id '})
      }
    
  }
  catch (error)
  {
   res.status(500).json({error:"failed to updated recipe by Id",error})
  }
})

//11. update recipe by title

const updateRecipeByTitle =async (recipeTitle) => {
  try {
    const updatedrecipe = await RecipeModel.findOneAndUpdate({ title:recipeTitle }, { new: true })
    if (updatedrecipe)
    {
      return updatedrecipe
    }
  }
  catch (error)
  {
console.log('error in update recipe by title',error)
  }
}

//11. handle requiest for update recipe by title

app.post('/recipes/updateByTitle/:recipeTitle',async (req, res) => {
  const recipeTitle= req.params.recipeTitle
  try {
    const updatedRecipe = await updateRecipeByTitle(recipeTitle)
    if (updatedRecipe)
    {
      res.status(200).json({message:"Recipe Updated Successfully.",updatedRecipe})
    }
    else
    {
      res.status(404).json({error:'recipe not found in update recipe by title'})
      }
  }
  catch (error)
  {
    res.status(500).json({error:'failed to update recipe by title',error})
  }
})


//12 delete recipe by Id

const deleterecipeById =async (recipeId) => {
  try {
    const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId)
    if (deletedRecipe)
    {
      return deletedRecipe
    }
  }
  catch (error)
  {
    console.log('error in delete recipe by Id',error)
  }
}

//12 handle requiest for delete recipe by Id

app.delete('/recipes/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId
  try {
    const deletedRecipe = await deleterecipeById(recipeId)
    if (deletedRecipe)
    {
res.status(200).json({message:"Recipe Deleted Successfully.",deletedRecipe})
    }
    else
    {
      res.status(404).json({error:"recipe not found in delete recipe by Id"})
      }
  }
  catch (error)
  {
    res.status(500).json({error:"failed to delete recipe by Id",error})
  }
})


app.get('/', (req,res) => {
  res.send('welocome to Recipe server!')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`)
})
