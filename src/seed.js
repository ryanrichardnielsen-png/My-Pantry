require('dotenv').config();
const { pool, init } = require('./db');

const meals = [

  // ── BREAKFAST ──────────────────────────────────────────────────────────────

  {
    name: 'Avocado Toast with Poached Eggs',
    meal_category: 'Breakfast',
    notes: null,
    servings: 2,
    method: `1. Fill a saucepan with 3 inches of water and bring to a gentle simmer. Add a splash of white vinegar.
2. Toast the bread slices until golden and crisp.
3. Halve the avocados, remove pits, and scoop flesh into a bowl. Mash with lemon juice, salt, and red pepper flakes.
4. Crack each egg into a small cup. Create a gentle swirl in the simmering water and slide each egg in. Poach 3 minutes for runny yolks.
5. Spread mashed avocado generously on toast.
6. Use a slotted spoon to lift eggs from water, blot dry, and place on top.
7. Season with flaky salt, black pepper, and a drizzle of olive oil.`,
    ingredients: [
      { name: 'Sourdough bread', quantity: '4 slices', category: 'Bakery' },
      { name: 'Avocados', quantity: '2', category: 'Produce' },
      { name: 'Eggs', quantity: '4', category: 'Dairy' },
      { name: 'Lemon', quantity: '1/2', category: 'Produce' },
      { name: 'Red pepper flakes', quantity: 'pinch', category: 'Pantry' },
      { name: 'Olive oil', quantity: '1 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Banana Oat Pancakes',
    meal_category: 'Breakfast',
    notes: null,
    servings: 4,
    method: `1. Blend oats in a blender until they resemble flour.
2. Add bananas, eggs, milk, baking powder, vanilla, and a pinch of salt. Blend until smooth.
3. Let batter rest 5 minutes — it will thicken slightly.
4. Heat a non-stick skillet over medium-low heat and brush with butter.
5. Pour about 1/4 cup batter per pancake. Cook 2-3 minutes until bubbles form and edges look set.
6. Flip and cook another 1-2 minutes.
7. Serve with maple syrup and fresh berries.`,
    ingredients: [
      { name: 'Rolled oats', quantity: '2 cups', category: 'Pantry' },
      { name: 'Bananas', quantity: '2 ripe', category: 'Produce' },
      { name: 'Eggs', quantity: '2', category: 'Dairy' },
      { name: 'Milk', quantity: '1/2 cup', category: 'Dairy' },
      { name: 'Baking powder', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Vanilla extract', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Butter', quantity: '1 tbsp', category: 'Dairy' },
      { name: 'Maple syrup', quantity: null, category: 'Pantry' },
      { name: 'Mixed berries', quantity: '1 cup', category: 'Produce' },
    ],
  },

  {
    name: 'Veggie Breakfast Scramble',
    meal_category: 'Breakfast',
    notes: null,
    servings: 2,
    method: `1. Dice bell pepper, mushrooms, and spinach. Mince garlic.
2. Heat olive oil in a skillet over medium heat. Add bell pepper and mushrooms. Cook 4 minutes until softened.
3. Add garlic and spinach. Stir until spinach wilts, about 1 minute.
4. Whisk eggs with a splash of milk, salt, and pepper.
5. Push vegetables to the side and pour eggs into the pan. Let sit 30 seconds, then gently fold everything together.
6. Cook until eggs are just set but still creamy — don't overcook.
7. Top with crumbled feta and serve with toast.`,
    ingredients: [
      { name: 'Eggs', quantity: '4', category: 'Dairy' },
      { name: 'Bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Mushrooms', quantity: '1 cup', category: 'Produce' },
      { name: 'Spinach', quantity: '2 cups', category: 'Produce' },
      { name: 'Garlic', quantity: '2 cloves', category: 'Produce' },
      { name: 'Feta cheese', quantity: '1/4 cup', category: 'Dairy' },
      { name: 'Olive oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Milk', quantity: '2 tbsp', category: 'Dairy' },
    ],
  },

  {
    name: 'Greek Yogurt Parfait',
    meal_category: 'Breakfast',
    notes: null,
    servings: 2,
    method: `1. Toast granola in a dry pan over medium heat for 2-3 minutes until fragrant (optional but great).
2. In two glasses or bowls, spoon a layer of Greek yogurt.
3. Add a layer of mixed berries.
4. Top with granola.
5. Drizzle honey over everything.
6. Repeat layers if desired.`,
    ingredients: [
      { name: 'Greek yogurt', quantity: '2 cups', category: 'Dairy' },
      { name: 'Granola', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Mixed berries', quantity: '1 cup', category: 'Produce' },
      { name: 'Honey', quantity: '2 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Smoked Salmon Bagels',
    meal_category: 'Breakfast',
    notes: null,
    servings: 2,
    method: `1. Slice bagels in half and toast until golden.
2. Mix cream cheese with a squeeze of lemon juice and a pinch of black pepper.
3. Spread cream cheese generously on each bagel half.
4. Layer smoked salmon over the cream cheese.
5. Top with sliced red onion, capers, and cucumber rounds.
6. Finish with fresh dill and a grind of black pepper.`,
    ingredients: [
      { name: 'Bagels', quantity: '2', category: 'Bakery' },
      { name: 'Smoked salmon', quantity: '4 oz', category: 'Meat & Seafood' },
      { name: 'Cream cheese', quantity: '4 oz', category: 'Dairy' },
      { name: 'Red onion', quantity: '1/4', category: 'Produce' },
      { name: 'Capers', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Cucumber', quantity: '1/2', category: 'Produce' },
      { name: 'Fresh dill', quantity: '2 tbsp', category: 'Produce' },
      { name: 'Lemon', quantity: '1/2', category: 'Produce' },
    ],
  },

  // ── LUNCH ─────────────────────────────────────────────────────────────────

  {
    name: 'Chicken Caesar Salad',
    meal_category: 'Lunch',
    notes: null,
    servings: 2,
    method: `1. Season chicken breasts with salt, pepper, and a drizzle of olive oil.
2. Grill or pan-sear over medium-high heat, 6-7 minutes per side. Let rest 5 minutes, then slice.
3. Chop romaine into bite-sized pieces and place in a large bowl.
4. Add caesar dressing and toss to coat.
5. Top with sliced chicken, parmesan, and croutons.
6. Finish with a squeeze of lemon.`,
    ingredients: [
      { name: 'Chicken breast', quantity: '2', category: 'Meat & Seafood' },
      { name: 'Romaine lettuce', quantity: '1 head', category: 'Produce' },
      { name: 'Caesar dressing', quantity: '1/3 cup', category: 'Pantry' },
      { name: 'Parmesan', quantity: '1/2 cup', category: 'Dairy' },
      { name: 'Croutons', quantity: '1 cup', category: 'Bakery' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
    ],
  },

  {
    name: 'Grilled Cheese & Tomato Soup',
    meal_category: 'Lunch',
    notes: null,
    servings: 4,
    method: `1. Heat tomato soup in a pot over medium heat, stirring occasionally. Stir in heavy cream and season with salt and pepper.
2. Butter one side of each bread slice.
3. Place a slice butter-side down in a skillet over medium-low heat.
4. Add 2 slices of cheddar. Top with second slice of bread, butter-side up.
5. Cook 3-4 minutes until golden. Flip and cook another 2-3 minutes.
6. Repeat for remaining sandwiches.
7. Serve sandwiches alongside bowls of tomato soup for dipping.`,
    ingredients: [
      { name: 'Sourdough bread', quantity: '8 slices', category: 'Bakery' },
      { name: 'Cheddar cheese', quantity: '8 slices', category: 'Dairy' },
      { name: 'Butter', quantity: '4 tbsp', category: 'Dairy' },
      { name: 'Tomato soup', quantity: '2 cans', category: 'Pantry' },
      { name: 'Heavy cream', quantity: '1/4 cup', category: 'Dairy' },
    ],
  },

  {
    name: 'Tuna Niçoise Salad',
    meal_category: 'Lunch',
    notes: null,
    servings: 2,
    method: `1. Boil a pot of salted water. Cook green beans 3 minutes until tender-crisp. Remove and set aside.
2. In the same water, boil eggs 8 minutes for jammy yolks. Transfer to ice water, peel, and halve.
3. Boil small potatoes in the same pot 12-15 minutes until fork-tender. Drain and halve.
4. Whisk together olive oil, Dijon, red wine vinegar, garlic, salt, and pepper for the dressing.
5. Arrange romaine on plates. Top with potatoes, green beans, tomatoes, olives, egg halves, and tuna.
6. Drizzle dressing generously over everything.`,
    ingredients: [
      { name: 'Canned tuna', quantity: '2 cans', category: 'Meat & Seafood' },
      { name: 'Eggs', quantity: '4', category: 'Dairy' },
      { name: 'Small potatoes', quantity: '1/2 lb', category: 'Produce' },
      { name: 'Green beans', quantity: '1/2 lb', category: 'Produce' },
      { name: 'Cherry tomatoes', quantity: '1 cup', category: 'Produce' },
      { name: 'Kalamata olives', quantity: '1/3 cup', category: 'Pantry' },
      { name: 'Romaine lettuce', quantity: '1 head', category: 'Produce' },
      { name: 'Dijon mustard', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Red wine vinegar', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Olive oil', quantity: '3 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Black Bean Burrito Bowls',
    meal_category: 'Lunch',
    notes: null,
    servings: 4,
    method: `1. Cook rice according to package directions. Fluff with a fork and stir in lime juice and cilantro.
2. Drain and rinse black beans. Warm in a small pot with a pinch of cumin and salt.
3. Drain corn and warm in a pan or microwave.
4. Slice avocado and season with lime juice and salt.
5. Assemble bowls: start with rice, then beans, corn, and avocado.
6. Top with salsa, shredded cheese, and sour cream.`,
    ingredients: [
      { name: 'Black beans', quantity: '2 cans', category: 'Pantry' },
      { name: 'White rice', quantity: '2 cups', category: 'Pantry' },
      { name: 'Corn', quantity: '1 can', category: 'Pantry' },
      { name: 'Avocado', quantity: '2', category: 'Produce' },
      { name: 'Salsa', quantity: '1 jar', category: 'Pantry' },
      { name: 'Shredded cheese', quantity: '1 cup', category: 'Dairy' },
      { name: 'Sour cream', quantity: '1/2 cup', category: 'Dairy' },
      { name: 'Lime', quantity: '1', category: 'Produce' },
      { name: 'Cilantro', quantity: '1/2 bunch', category: 'Produce' },
    ],
  },

  {
    name: 'Lentil Soup',
    meal_category: 'Lunch',
    notes: null,
    servings: 4,
    method: `1. Heat olive oil in a large pot over medium heat. Add diced onion, carrot, and celery. Cook 6 minutes until soft.
2. Add garlic, cumin, smoked paprika, and turmeric. Stir and cook 1 minute until fragrant.
3. Add rinsed lentils, diced tomatoes, vegetable broth, and bay leaf.
4. Bring to a boil, then reduce heat and simmer 25-30 minutes until lentils are completely tender.
5. Remove bay leaf. Use an immersion blender to partially blend — leave it chunky.
6. Season generously with salt, pepper, and a squeeze of lemon juice.
7. Serve with crusty bread and a drizzle of olive oil.`,
    ingredients: [
      { name: 'Red lentils', quantity: '1.5 cups', category: 'Pantry' },
      { name: 'Onion', quantity: '1', category: 'Produce' },
      { name: 'Carrot', quantity: '2', category: 'Produce' },
      { name: 'Celery', quantity: '2 stalks', category: 'Produce' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Diced tomatoes', quantity: '1 can', category: 'Pantry' },
      { name: 'Vegetable broth', quantity: '4 cups', category: 'Pantry' },
      { name: 'Cumin', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Smoked paprika', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Turmeric', quantity: '1/2 tsp', category: 'Pantry' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
      { name: 'Olive oil', quantity: '2 tbsp', category: 'Pantry' },
    ],
  },

  // ── DINNER — MEAT FORWARD ─────────────────────────────────────────────────

  {
    name: 'Chicken Tacos',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Season chicken thighs with salt, pepper, cumin, and chili powder.
2. Heat a skillet over medium-high heat with a drizzle of oil.
3. Cook chicken thighs 6-7 minutes per side until cooked through. Let rest 5 minutes, then slice or shred.
4. Warm tortillas in a dry pan or directly over a gas flame for 30 seconds per side.
5. Slice avocado and squeeze lime juice over it.
6. Assemble tacos with chicken, cheese, salsa, sour cream, avocado, and cilantro.`,
    ingredients: [
      { name: 'Chicken thighs', quantity: '1.5 lbs', category: 'Meat & Seafood' },
      { name: 'Flour tortillas', quantity: '1 pack', category: 'Bakery' },
      { name: 'Shredded cheese', quantity: '1 cup', category: 'Dairy' },
      { name: 'Salsa', quantity: '1 jar', category: 'Pantry' },
      { name: 'Sour cream', quantity: '1 cup', category: 'Dairy' },
      { name: 'Avocado', quantity: '2', category: 'Produce' },
      { name: 'Lime', quantity: '2', category: 'Produce' },
      { name: 'Cilantro', quantity: '1 bunch', category: 'Produce' },
    ],
  },

  {
    name: 'Spaghetti Bolognese',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Heat olive oil in a large pan over medium heat. Add diced onion and carrot, cook 5 minutes until soft.
2. Add garlic and cook 1 minute more.
3. Add ground beef, breaking it up with a spoon. Cook until browned, about 8 minutes.
4. Pour in crushed tomatoes. Season with salt, pepper, and a pinch of sugar.
5. Simmer on low for 20-30 minutes, stirring occasionally.
6. Cook spaghetti according to package directions. Reserve 1 cup pasta water before draining.
7. Toss pasta with sauce, adding pasta water as needed to loosen.
8. Serve topped with freshly grated parmesan.`,
    ingredients: [
      { name: 'Ground beef', quantity: '1 lb', category: 'Meat & Seafood' },
      { name: 'Spaghetti', quantity: '1 lb', category: 'Pantry' },
      { name: 'Crushed tomatoes', quantity: '28 oz can', category: 'Pantry' },
      { name: 'Onion', quantity: '1', category: 'Produce' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Carrot', quantity: '1', category: 'Produce' },
      { name: 'Parmesan', quantity: '1/2 cup', category: 'Dairy' },
      { name: 'Olive oil', quantity: '2 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Baked Chicken Thighs & Potatoes',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Preheat oven to 425°F.
2. Cut potatoes into chunks and toss with olive oil, salt, and pepper. Spread on a baking sheet.
3. Pat chicken thighs dry. Rub with olive oil, minced garlic, paprika, salt, and pepper.
4. Nestle chicken thighs over the potatoes. Add rosemary sprigs.
5. Bake 35-40 minutes until chicken skin is crispy and potatoes are golden.
6. Squeeze lemon juice over everything before serving.`,
    ingredients: [
      { name: 'Chicken thighs', quantity: '6', category: 'Meat & Seafood' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Olive oil', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Paprika', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
      { name: 'Rosemary', quantity: '2 sprigs', category: 'Produce' },
      { name: 'Potatoes', quantity: '1 lb', category: 'Produce' },
    ],
  },

  {
    name: 'Beef Tacos',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Brown ground beef in a skillet over medium-high heat, breaking it up as it cooks.
2. Drain excess fat. Add taco seasoning and 2/3 cup water. Stir and simmer 3-4 minutes.
3. Warm corn tortillas in a dry pan for 30 seconds per side.
4. Shred lettuce and dice tomatoes.
5. Fill tortillas with beef, lettuce, tomato, cheese, and sour cream.
6. Add hot sauce to taste.`,
    ingredients: [
      { name: 'Ground beef', quantity: '1 lb', category: 'Meat & Seafood' },
      { name: 'Taco seasoning', quantity: '1 packet', category: 'Pantry' },
      { name: 'Corn tortillas', quantity: '1 pack', category: 'Bakery' },
      { name: 'Shredded lettuce', quantity: '2 cups', category: 'Produce' },
      { name: 'Tomato', quantity: '2', category: 'Produce' },
      { name: 'Shredded cheese', quantity: '1 cup', category: 'Dairy' },
      { name: 'Sour cream', quantity: '1/2 cup', category: 'Dairy' },
      { name: 'Hot sauce', quantity: null, category: 'Pantry' },
    ],
  },

  {
    name: 'Turkey Burgers',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Mix ground turkey with salt, pepper, garlic powder, and Worcestershire sauce. Form into 4 patties.
2. Heat a grill or skillet over medium-high heat with oil.
3. Cook patties 5-6 minutes per side until cooked through (165°F internal).
4. Add cheese in the last minute of cooking to melt.
5. Toast burger buns cut-side down in the pan for 1 minute.
6. Assemble with lettuce, tomato, red onion, avocado, mustard, and ketchup.`,
    ingredients: [
      { name: 'Ground turkey', quantity: '1 lb', category: 'Meat & Seafood' },
      { name: 'Burger buns', quantity: '4', category: 'Bakery' },
      { name: 'Lettuce', quantity: '4 leaves', category: 'Produce' },
      { name: 'Tomato', quantity: '1', category: 'Produce' },
      { name: 'Red onion', quantity: '1/2', category: 'Produce' },
      { name: 'Cheddar cheese', quantity: '4 slices', category: 'Dairy' },
      { name: 'Avocado', quantity: '1', category: 'Produce' },
      { name: 'Mustard', quantity: null, category: 'Pantry' },
      { name: 'Ketchup', quantity: null, category: 'Pantry' },
    ],
  },

  {
    name: 'Pork Fried Rice',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Use day-old cooked rice for best results (or cook and spread to cool first).
2. Slice pork tenderloin thin and season with soy sauce and pepper.
3. Heat oil in a wok or large skillet over high heat. Cook pork 3-4 minutes. Remove.
4. In the same pan, scramble eggs until just set. Remove.
5. Add more oil, then stir fry diced carrots and garlic for 2 minutes.
6. Add frozen peas and rice. Stir fry 3-4 minutes, pressing rice against the pan.
7. Return pork and eggs. Add soy sauce and sesame oil. Toss everything together.
8. Garnish with sliced green onions.`,
    ingredients: [
      { name: 'Pork tenderloin', quantity: '1 lb', category: 'Meat & Seafood' },
      { name: 'Cooked rice', quantity: '3 cups', category: 'Pantry' },
      { name: 'Eggs', quantity: '3', category: 'Dairy' },
      { name: 'Frozen peas', quantity: '1 cup', category: 'Frozen' },
      { name: 'Carrots', quantity: '2', category: 'Produce' },
      { name: 'Soy sauce', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Sesame oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Green onions', quantity: '3', category: 'Produce' },
      { name: 'Garlic', quantity: '2 cloves', category: 'Produce' },
    ],
  },

  {
    name: 'Chicken Stir Fry',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Cook white rice according to package directions.
2. Slice chicken breast into thin strips. Season with salt and pepper.
3. Mix together soy sauce, sesame oil, and a pinch of sugar in a small bowl. Set aside.
4. Heat a wok or large skillet over high heat with oil. Add chicken and cook 4-5 minutes until golden. Remove.
5. In the same pan, stir fry garlic and ginger for 30 seconds.
6. Add broccoli, bell peppers, and snap peas. Stir fry 3-4 minutes until tender-crisp.
7. Return chicken to pan, pour over sauce, and toss everything together for 1 minute.
8. Serve over rice.`,
    ingredients: [
      { name: 'Chicken breast', quantity: '1 lb', category: 'Meat & Seafood' },
      { name: 'Bell peppers', quantity: '2', category: 'Produce' },
      { name: 'Broccoli', quantity: '2 cups', category: 'Produce' },
      { name: 'Snap peas', quantity: '1 cup', category: 'Produce' },
      { name: 'Soy sauce', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Sesame oil', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Ginger', quantity: '1 tbsp', category: 'Produce' },
      { name: 'Garlic', quantity: '3 cloves', category: 'Produce' },
      { name: 'White rice', quantity: '2 cups', category: 'Pantry' },
    ],
  },

  {
    name: 'Homemade Pizza',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Preheat oven to 475°F with a pizza stone or baking sheet inside.
2. Stretch pizza dough on a floured surface to your desired shape and thickness.
3. Brush dough lightly with olive oil. Spread marinara sauce, leaving a 1-inch border.
4. Top with mozzarella, pepperoni, sliced bell pepper, and mushrooms.
5. Carefully slide pizza onto the hot stone or pan.
6. Bake 10-13 minutes until crust is golden and cheese is bubbly.
7. Let cool 2 minutes before slicing.`,
    ingredients: [
      { name: 'Pizza dough', quantity: '1 ball', category: 'Bakery' },
      { name: 'Marinara sauce', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Mozzarella', quantity: '2 cups shredded', category: 'Dairy' },
      { name: 'Pepperoni', quantity: '3 oz', category: 'Meat & Seafood' },
      { name: 'Bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Mushrooms', quantity: '1 cup', category: 'Produce' },
      { name: 'Olive oil', quantity: '1 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Slow Cooker Pulled Pork',
    meal_category: 'Dinner',
    notes: null,
    servings: 6,
    method: `1. Mix brown sugar, smoked paprika, garlic powder, onion powder, cumin, salt, and pepper to make a dry rub.
2. Coat pork shoulder all over with the rub.
3. Place onion slices in the bottom of the slow cooker. Set pork on top.
4. Pour apple cider vinegar and chicken broth around (not over) the pork.
5. Cook on low 8-10 hours or high 4-5 hours until pork shreds easily with a fork.
6. Remove pork, shred with two forks, and toss with BBQ sauce.
7. Serve on toasted buns with coleslaw.`,
    ingredients: [
      { name: 'Pork shoulder', quantity: '3 lbs', category: 'Meat & Seafood' },
      { name: 'BBQ sauce', quantity: '1 cup', category: 'Pantry' },
      { name: 'Burger buns', quantity: '6', category: 'Bakery' },
      { name: 'Onion', quantity: '1', category: 'Produce' },
      { name: 'Smoked paprika', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Brown sugar', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Garlic powder', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Apple cider vinegar', quantity: '1/4 cup', category: 'Pantry' },
      { name: 'Chicken broth', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Coleslaw mix', quantity: '1 bag', category: 'Produce' },
    ],
  },

  // ── DINNER — SEAFOOD FORWARD ──────────────────────────────────────────────

  {
    name: 'Sheet Pan Salmon & Broccoli',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Preheat oven to 400°F.
2. Whisk together olive oil, soy sauce, honey, and minced garlic.
3. Cut broccoli into florets and toss with half the sauce. Spread on a sheet pan.
4. Place salmon fillets on the same pan. Brush with remaining sauce.
5. Season everything with salt and pepper. Add lemon slices on top of salmon.
6. Roast 15-18 minutes until salmon flakes easily and broccoli is tender with crispy edges.`,
    ingredients: [
      { name: 'Salmon fillets', quantity: '4', category: 'Meat & Seafood' },
      { name: 'Broccoli', quantity: '1 head', category: 'Produce' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
      { name: 'Garlic', quantity: '3 cloves', category: 'Produce' },
      { name: 'Olive oil', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Soy sauce', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Honey', quantity: '1 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Shrimp Pasta',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Cook linguine according to package directions. Reserve 1/2 cup pasta water before draining.
2. Pat shrimp dry and season with salt, pepper, and red pepper flakes.
3. Heat olive oil and 2 tbsp butter in a large pan over medium-high heat.
4. Cook shrimp 1-2 minutes per side until pink. Remove and set aside.
5. In the same pan, add remaining butter and garlic. Cook 1 minute.
6. Add drained pasta and a splash of pasta water. Toss to coat.
7. Return shrimp to pan. Add lemon juice and parsley. Toss everything together.
8. Serve topped with parmesan.`,
    ingredients: [
      { name: 'Shrimp', quantity: '1 lb', category: 'Meat & Seafood' },
      { name: 'Linguine', quantity: '12 oz', category: 'Pantry' },
      { name: 'Garlic', quantity: '5 cloves', category: 'Produce' },
      { name: 'Butter', quantity: '4 tbsp', category: 'Dairy' },
      { name: 'Olive oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
      { name: 'Parsley', quantity: '1/4 cup', category: 'Produce' },
      { name: 'Parmesan', quantity: '1/2 cup', category: 'Dairy' },
      { name: 'Red pepper flakes', quantity: 'pinch', category: 'Pantry' },
    ],
  },

  {
    name: 'Fish Tacos with Mango Slaw',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Mix cumin, chili powder, garlic powder, salt, and pepper. Rub over cod fillets.
2. Make slaw: toss shredded cabbage, diced mango, cilantro, lime juice, and a pinch of salt.
3. Mix mayo and sriracha for the sauce. Set aside.
4. Heat oil in a pan over medium-high heat. Cook cod 3-4 minutes per side until flaky.
5. Break fish into large chunks.
6. Warm tortillas in a dry pan.
7. Assemble tacos with fish, mango slaw, sriracha mayo, and extra lime.`,
    ingredients: [
      { name: 'Cod fillets', quantity: '1.5 lbs', category: 'Meat & Seafood' },
      { name: 'Corn tortillas', quantity: '1 pack', category: 'Bakery' },
      { name: 'Shredded cabbage', quantity: '2 cups', category: 'Produce' },
      { name: 'Mango', quantity: '1', category: 'Produce' },
      { name: 'Cilantro', quantity: '1/4 cup', category: 'Produce' },
      { name: 'Lime', quantity: '2', category: 'Produce' },
      { name: 'Mayo', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Sriracha', quantity: '1 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Garlic Butter Shrimp & Rice',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Cook white rice according to package directions.
2. Pat shrimp dry and season with salt, paprika, and garlic powder.
3. Melt butter in a large skillet over medium-high heat.
4. Add minced garlic and cook 30 seconds until fragrant.
5. Add shrimp in a single layer. Cook 1-2 minutes per side until pink and curled.
6. Add lemon juice and parsley. Toss to coat.
7. Serve over rice with extra lemon wedges.`,
    ingredients: [
      { name: 'Shrimp', quantity: '1 lb', category: 'Meat & Seafood' },
      { name: 'White rice', quantity: '2 cups', category: 'Pantry' },
      { name: 'Butter', quantity: '4 tbsp', category: 'Dairy' },
      { name: 'Garlic', quantity: '5 cloves', category: 'Produce' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
      { name: 'Parsley', quantity: '1/4 cup', category: 'Produce' },
      { name: 'Paprika', quantity: '1 tsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Miso Glazed Salmon',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Preheat broiler to high.
2. Whisk together white miso, mirin, soy sauce, and honey until smooth.
3. Pat salmon dry and place on a foil-lined baking sheet. Season with pepper.
4. Brush miso glaze generously over the top of each fillet.
5. Broil 8-10 minutes until glaze is caramelized and salmon flakes easily — watch carefully.
6. Cook rice and steam or sauté bok choy with a little sesame oil and garlic.
7. Serve salmon over rice with bok choy and a sprinkle of sesame seeds.`,
    ingredients: [
      { name: 'Salmon fillets', quantity: '4', category: 'Meat & Seafood' },
      { name: 'White miso paste', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Mirin', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Soy sauce', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Honey', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Bok choy', quantity: '2 heads', category: 'Produce' },
      { name: 'White rice', quantity: '2 cups', category: 'Pantry' },
      { name: 'Sesame seeds', quantity: '1 tbsp', category: 'Pantry' },
      { name: 'Sesame oil', quantity: '1 tbsp', category: 'Pantry' },
    ],
  },

  // ── DINNER — VEGGIE FORWARD ───────────────────────────────────────────────

  {
    name: 'Vegetable Curry',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Cook rice according to package directions.
2. Heat oil in a large pot over medium heat. Add diced onion and cook 5 minutes.
3. Add garlic, ginger, and curry powder. Stir and cook 1-2 minutes until fragrant.
4. Add diced tomatoes and coconut milk. Stir to combine.
5. Drain and add chickpeas. Simmer 15 minutes.
6. Stir in spinach and cook until wilted, about 2 minutes.
7. Season with salt to taste. Serve over rice.`,
    ingredients: [
      { name: 'Chickpeas', quantity: '2 cans', category: 'Pantry' },
      { name: 'Coconut milk', quantity: '1 can', category: 'Pantry' },
      { name: 'Diced tomatoes', quantity: '1 can', category: 'Pantry' },
      { name: 'Onion', quantity: '1', category: 'Produce' },
      { name: 'Garlic', quantity: '4 cloves', category: 'Produce' },
      { name: 'Ginger', quantity: '1 tbsp', category: 'Produce' },
      { name: 'Curry powder', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Spinach', quantity: '2 cups', category: 'Produce' },
      { name: 'White rice', quantity: '2 cups', category: 'Pantry' },
    ],
  },

  {
    name: 'Pesto Pasta',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Cook penne according to package directions. Reserve 1/2 cup pasta water before draining.
2. While pasta cooks, halve cherry tomatoes and mince garlic.
3. Heat olive oil in a pan over medium heat. Add garlic and cook 1 minute.
4. Add cherry tomatoes and cook 3-4 minutes until they begin to burst.
5. Toss drained pasta with pesto, adding pasta water a splash at a time until creamy.
6. Add tomatoes and toss to combine.
7. Serve topped with fresh parmesan.`,
    ingredients: [
      { name: 'Penne pasta', quantity: '1 lb', category: 'Pantry' },
      { name: 'Pesto', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Cherry tomatoes', quantity: '1 cup', category: 'Produce' },
      { name: 'Parmesan', quantity: '1/2 cup', category: 'Dairy' },
      { name: 'Olive oil', quantity: '2 tbsp', category: 'Pantry' },
      { name: 'Garlic', quantity: '2 cloves', category: 'Produce' },
    ],
  },

  {
    name: 'Mushroom Risotto',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Warm vegetable broth in a saucepan over low heat — it must be warm when you add it.
2. Heat olive oil and 1 tbsp butter in a wide pan over medium heat. Add diced onion, cook 5 minutes.
3. Add garlic and arborio rice. Stir and toast rice 2 minutes.
4. Add white wine and stir until absorbed.
5. Add warm broth one ladle at a time, stirring frequently and waiting until each ladle is absorbed before adding the next. This takes about 20-25 minutes total.
6. In a separate pan, sauté sliced mushrooms in butter with a pinch of salt until golden.
7. When risotto is creamy and rice is tender, stir in mushrooms, remaining butter, and parmesan.
8. Season generously and serve immediately.`,
    ingredients: [
      { name: 'Arborio rice', quantity: '1.5 cups', category: 'Pantry' },
      { name: 'Mixed mushrooms', quantity: '1 lb', category: 'Produce' },
      { name: 'Vegetable broth', quantity: '5 cups', category: 'Pantry' },
      { name: 'White wine', quantity: '1/2 cup', category: 'Beverages' },
      { name: 'Onion', quantity: '1', category: 'Produce' },
      { name: 'Garlic', quantity: '3 cloves', category: 'Produce' },
      { name: 'Parmesan', quantity: '3/4 cup', category: 'Dairy' },
      { name: 'Butter', quantity: '3 tbsp', category: 'Dairy' },
      { name: 'Olive oil', quantity: '2 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Roasted Veggie Buddha Bowl',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Preheat oven to 425°F.
2. Chop sweet potato, broccoli, and red onion into similar-sized pieces. Toss with olive oil, salt, and cumin. Spread on two baking sheets.
3. Roast 25-30 minutes, flipping halfway, until edges are caramelized.
4. Cook quinoa: combine 1 cup quinoa with 2 cups water, bring to a boil, reduce heat and simmer 15 minutes. Fluff with a fork.
5. Make tahini dressing: whisk tahini, lemon juice, garlic, and water until smooth.
6. Assemble bowls with quinoa, roasted veggies, and avocado.
7. Drizzle with tahini dressing and top with pumpkin seeds.`,
    ingredients: [
      { name: 'Sweet potato', quantity: '2', category: 'Produce' },
      { name: 'Broccoli', quantity: '1 head', category: 'Produce' },
      { name: 'Red onion', quantity: '1', category: 'Produce' },
      { name: 'Quinoa', quantity: '1 cup', category: 'Pantry' },
      { name: 'Avocado', quantity: '2', category: 'Produce' },
      { name: 'Tahini', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
      { name: 'Pumpkin seeds', quantity: '1/4 cup', category: 'Pantry' },
      { name: 'Olive oil', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Cumin', quantity: '1 tsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Eggplant Parmesan',
    meal_category: 'Dinner',
    notes: null,
    servings: 4,
    method: `1. Preheat oven to 400°F. Slice eggplant into 1/2-inch rounds. Salt both sides and let sit 20 minutes to draw out moisture. Pat dry.
2. Set up a breading station: flour in one bowl, beaten eggs in another, breadcrumbs mixed with half the parmesan in a third.
3. Dredge each eggplant slice in flour, then egg, then breadcrumbs.
4. Heat olive oil in a large pan over medium-high heat. Fry eggplant in batches 2-3 minutes per side until golden. Transfer to a baking sheet.
5. Spread marinara over each slice. Top with mozzarella and remaining parmesan.
6. Bake 20 minutes until cheese is melted and bubbly.
7. Finish under the broiler 2 minutes for a golden top. Serve with pasta or a green salad.`,
    ingredients: [
      { name: 'Eggplant', quantity: '2 large', category: 'Produce' },
      { name: 'Marinara sauce', quantity: '2 cups', category: 'Pantry' },
      { name: 'Mozzarella', quantity: '2 cups shredded', category: 'Dairy' },
      { name: 'Parmesan', quantity: '3/4 cup', category: 'Dairy' },
      { name: 'Eggs', quantity: '2', category: 'Dairy' },
      { name: 'Breadcrumbs', quantity: '1.5 cups', category: 'Pantry' },
      { name: 'All-purpose flour', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Olive oil', quantity: '1/4 cup', category: 'Pantry' },
    ],
  },

  // ── SNACKS ────────────────────────────────────────────────────────────────

  {
    name: 'Hummus & Veggie Plate',
    meal_category: 'Snack',
    notes: null,
    servings: 4,
    method: `1. Drain and rinse chickpeas, reserving the liquid (aquafaba).
2. Add chickpeas, tahini, lemon juice, garlic, and salt to a food processor. Blend 1 minute.
3. With the motor running, drizzle in olive oil and 2-4 tbsp of the reserved chickpea liquid until you reach a smooth, creamy texture.
4. Taste and adjust salt and lemon.
5. Spread hummus on a plate, drizzle with olive oil, and dust with paprika.
6. Serve with sliced carrots, cucumber, bell pepper, and pita wedges.`,
    ingredients: [
      { name: 'Chickpeas', quantity: '1 can', category: 'Pantry' },
      { name: 'Tahini', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Lemon', quantity: '1', category: 'Produce' },
      { name: 'Garlic', quantity: '1 clove', category: 'Produce' },
      { name: 'Olive oil', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Carrots', quantity: '2', category: 'Produce' },
      { name: 'Cucumber', quantity: '1', category: 'Produce' },
      { name: 'Bell pepper', quantity: '1', category: 'Produce' },
      { name: 'Pita bread', quantity: '2', category: 'Bakery' },
    ],
  },

  {
    name: 'Guacamole & Chips',
    meal_category: 'Snack',
    notes: null,
    servings: 4,
    method: `1. Halve and pit avocados. Scoop flesh into a bowl.
2. Mash with a fork to your preferred texture — chunky or smooth.
3. Finely dice red onion, jalapeño, and cilantro. Fold in.
4. Add lime juice and salt. Taste and adjust.
5. Press plastic wrap directly on the surface of the guacamole if not serving immediately (prevents browning).
6. Serve with tortilla chips.`,
    ingredients: [
      { name: 'Avocados', quantity: '3 ripe', category: 'Produce' },
      { name: 'Red onion', quantity: '1/4', category: 'Produce' },
      { name: 'Jalapeño', quantity: '1', category: 'Produce' },
      { name: 'Cilantro', quantity: '1/4 cup', category: 'Produce' },
      { name: 'Lime', quantity: '1', category: 'Produce' },
      { name: 'Tortilla chips', quantity: '1 bag', category: 'Pantry' },
    ],
  },

  {
    name: 'Peanut Butter Apple Slices',
    meal_category: 'Snack',
    notes: null,
    servings: 2,
    method: `1. Core and slice apples into wedges.
2. Arrange on a plate.
3. Drizzle or dollop peanut butter alongside for dipping.
4. Optional: sprinkle with granola or a drizzle of honey.`,
    ingredients: [
      { name: 'Apples', quantity: '2', category: 'Produce' },
      { name: 'Peanut butter', quantity: '4 tbsp', category: 'Pantry' },
      { name: 'Honey', quantity: '1 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Cheese & Charcuterie Board',
    meal_category: 'Snack',
    notes: null,
    servings: 4,
    method: `1. Remove cheeses from fridge 30 minutes before serving so they come to room temperature.
2. Arrange crackers and bread slices around a board or large plate.
3. Place cheeses in different corners — slice some, leave some whole for guests to break into.
4. Fan salami and prosciutto between the cheeses.
5. Add grapes, nuts, and olives in small clusters to fill gaps.
6. Add a small jar of jam or honey for dipping.`,
    ingredients: [
      { name: 'Aged cheddar', quantity: '4 oz', category: 'Dairy' },
      { name: 'Brie', quantity: '1 round', category: 'Dairy' },
      { name: 'Salami', quantity: '3 oz', category: 'Meat & Seafood' },
      { name: 'Prosciutto', quantity: '2 oz', category: 'Meat & Seafood' },
      { name: 'Crackers', quantity: '1 box', category: 'Pantry' },
      { name: 'Grapes', quantity: '1 cup', category: 'Produce' },
      { name: 'Mixed nuts', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Olives', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Fig jam', quantity: '2 tbsp', category: 'Pantry' },
    ],
  },

  // ── DESSERT ───────────────────────────────────────────────────────────────

  {
    name: 'Chocolate Chip Cookies',
    meal_category: 'Dessert',
    notes: null,
    servings: 24,
    method: `1. Preheat oven to 375°F. Line two baking sheets with parchment paper.
2. Whisk flour, baking soda, and salt together. Set aside.
3. Beat softened butter with both sugars using a mixer or by hand until light and fluffy, about 3 minutes.
4. Beat in eggs one at a time, then vanilla extract.
5. Stir in flour mixture until just combined — don't overmix.
6. Fold in chocolate chips.
7. Scoop rounded tablespoons onto baking sheets, spacing 2 inches apart.
8. Bake 9-11 minutes until edges are golden but centers look slightly underdone.
9. Let cool on the pan 5 minutes before transferring — they'll firm up as they cool.`,
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 1/4 cups', category: 'Pantry' },
      { name: 'Butter', quantity: '1 cup', category: 'Dairy' },
      { name: 'Granulated sugar', quantity: '3/4 cup', category: 'Pantry' },
      { name: 'Brown sugar', quantity: '3/4 cup', category: 'Pantry' },
      { name: 'Eggs', quantity: '2', category: 'Dairy' },
      { name: 'Vanilla extract', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Baking soda', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Chocolate chips', quantity: '2 cups', category: 'Pantry' },
    ],
  },

  {
    name: 'Banana Bread',
    meal_category: 'Dessert',
    notes: null,
    servings: 8,
    method: `1. Preheat oven to 350°F. Butter a 9x5 loaf pan.
2. Mash very ripe bananas in a large bowl until smooth.
3. Whisk in melted butter, sugar, egg, vanilla, and baking soda.
4. Add a pinch of salt. Fold in flour until just incorporated — lumps are fine.
5. Pour into prepared pan. Optional: press extra banana slices and a sprinkle of sugar on top.
6. Bake 55-65 minutes until a toothpick inserted in the center comes out clean.
7. Cool in pan 10 minutes, then turn out onto a rack.`,
    ingredients: [
      { name: 'Ripe bananas', quantity: '3', category: 'Produce' },
      { name: 'All-purpose flour', quantity: '1 1/2 cups', category: 'Pantry' },
      { name: 'Butter', quantity: '1/3 cup', category: 'Dairy' },
      { name: 'Sugar', quantity: '3/4 cup', category: 'Pantry' },
      { name: 'Egg', quantity: '1', category: 'Dairy' },
      { name: 'Vanilla extract', quantity: '1 tsp', category: 'Pantry' },
      { name: 'Baking soda', quantity: '1 tsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Mango Sorbet',
    meal_category: 'Dessert',
    notes: null,
    servings: 4,
    method: `1. Peel and dice mangoes. Freeze flat on a parchment-lined tray for at least 4 hours or overnight.
2. Add frozen mango chunks to a blender or food processor.
3. Add lime juice and honey.
4. Blend until completely smooth, scraping down sides as needed.
5. For soft-serve consistency: serve immediately.
6. For scoopable sorbet: transfer to a container and freeze 1-2 more hours until firm.`,
    ingredients: [
      { name: 'Mangoes', quantity: '3 ripe', category: 'Produce' },
      { name: 'Lime', quantity: '1', category: 'Produce' },
      { name: 'Honey', quantity: '2 tbsp', category: 'Pantry' },
    ],
  },

  {
    name: 'Tiramisu',
    meal_category: 'Dessert',
    notes: null,
    servings: 8,
    method: `1. Brew strong coffee and let cool. Add a splash of coffee liqueur if using.
2. Separate eggs. Beat yolks with sugar until pale and thick, about 3 minutes.
3. Add mascarpone to yolk mixture and beat until smooth.
4. In a clean bowl, whisk egg whites to stiff peaks. Gently fold into mascarpone mixture in two additions.
5. One at a time, quickly dip ladyfingers in the coffee — about 1 second per side, don't soak.
6. Arrange a single layer of dipped ladyfingers in a dish.
7. Spread half the mascarpone cream on top.
8. Add a second layer of ladyfingers and the remaining cream.
9. Dust generously with cocoa powder.
10. Refrigerate at least 4 hours, ideally overnight.`,
    ingredients: [
      { name: 'Mascarpone', quantity: '16 oz', category: 'Dairy' },
      { name: 'Ladyfinger cookies', quantity: '1 pack', category: 'Bakery' },
      { name: 'Eggs', quantity: '4', category: 'Dairy' },
      { name: 'Sugar', quantity: '1/2 cup', category: 'Pantry' },
      { name: 'Strong coffee', quantity: '1.5 cups', category: 'Beverages' },
      { name: 'Cocoa powder', quantity: '3 tbsp', category: 'Pantry' },
      { name: 'Coffee liqueur', quantity: '2 tbsp', category: 'Beverages' },
    ],
  },

];

const staples = [
  { name: 'Olive oil', category: 'Pantry' },
  { name: 'Butter', category: 'Dairy' },
  { name: 'Eggs', category: 'Dairy' },
  { name: 'Garlic', category: 'Produce' },
  { name: 'Salt', category: 'Pantry' },
  { name: 'Black pepper', category: 'Pantry' },
  { name: 'Soy sauce', category: 'Pantry' },
  { name: 'Chicken broth', category: 'Pantry' },
  { name: 'Canned tomatoes', category: 'Pantry' },
  { name: 'Pasta', category: 'Pantry' },
  { name: 'White rice', category: 'Pantry' },
  { name: 'All-purpose flour', category: 'Pantry' },
  { name: 'Sugar', category: 'Pantry' },
  { name: 'Honey', category: 'Pantry' },
  { name: 'Red pepper flakes', category: 'Pantry' },
  { name: 'Parmesan', category: 'Dairy' },
  { name: 'Lemons', category: 'Produce' },
  { name: 'Onions', category: 'Produce' },
  { name: 'Milk', category: 'Dairy' },
  { name: 'Hot sauce', category: 'Pantry' },
];

async function seed() {
  await init();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query('DELETE FROM week_plan');
    await client.query('DELETE FROM ingredients');
    await client.query('DELETE FROM meals');

    for (const meal of meals) {
      const { rows: [m] } = await client.query(
        'INSERT INTO meals (name, notes, method, servings, meal_category) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [meal.name, meal.notes, meal.method, meal.servings || 4, meal.meal_category || 'Dinner']
      );
      for (const ing of meal.ingredients) {
        await client.query(
          'INSERT INTO ingredients (meal_id, name, quantity, category) VALUES ($1, $2, $3, $4)',
          [m.id, ing.name, ing.quantity, ing.category]
        );
      }
    }
    console.log(`Seeded ${meals.length} meals.`);

    const { rows: sr } = await client.query('SELECT COUNT(*) FROM staples');
    if (parseInt(sr[0].count) === 0) {
      for (let i = 0; i < staples.length; i++) {
        await client.query(
          'INSERT INTO staples (name, category, sort_order) VALUES ($1, $2, $3)',
          [staples[i].name, staples[i].category, i]
        );
      }
      console.log(`Seeded ${staples.length} staples.`);
    } else {
      console.log('Staples already exist — skipping.');
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => { console.error(err); process.exit(1); });
