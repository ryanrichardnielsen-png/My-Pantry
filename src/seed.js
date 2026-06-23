require('dotenv').config();
const { pool, init } = require('./db');

const meals = [
  {
    name: 'Chicken Tacos',
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
    name: 'Sheet Pan Salmon',
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
    name: 'Chicken Stir Fry',
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
    name: 'Black Bean Burrito Bowls',
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
    name: 'Beef Tacos',
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
    name: 'Chicken Caesar Salad',
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
    name: 'Shrimp Pasta',
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
    name: 'Turkey Burgers',
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
    name: 'Vegetable Curry',
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
    name: 'Pork Fried Rice',
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
    name: 'Grilled Cheese & Tomato Soup',
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
      { name: 'Sourdough bread', quantity: '1 loaf', category: 'Bakery' },
      { name: 'Cheddar cheese', quantity: '8 slices', category: 'Dairy' },
      { name: 'Butter', quantity: '4 tbsp', category: 'Dairy' },
      { name: 'Tomato soup', quantity: '2 cans', category: 'Pantry' },
      { name: 'Heavy cream', quantity: '1/4 cup', category: 'Dairy' },
    ],
  },
  {
    name: 'Baked Chicken Thighs',
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
    name: 'Pesto Pasta',
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

    // Clear and re-seed meals
    await client.query('DELETE FROM week_plan');
    await client.query('DELETE FROM ingredients');
    await client.query('DELETE FROM meals');

    for (const meal of meals) {
      const { rows: [m] } = await client.query(
        'INSERT INTO meals (name, notes, method, servings) VALUES ($1, $2, $3, $4) RETURNING id',
        [meal.name, meal.notes, meal.method, meal.servings || 4]
      );
      for (const ing of meal.ingredients) {
        await client.query(
          'INSERT INTO ingredients (meal_id, name, quantity, category) VALUES ($1, $2, $3, $4)',
          [m.id, ing.name, ing.quantity, ing.category]
        );
      }
    }
    console.log(`Seeded ${meals.length} meals with methods.`);

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
