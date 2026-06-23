require('dotenv').config();
const { pool, init } = require('./db');

const meals = [
  {
    name: 'Chicken Tacos',
    notes: null,
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

    // Skip if already seeded
    const { rows } = await client.query('SELECT COUNT(*) FROM meals');
    if (parseInt(rows[0].count) > 0) {
      console.log('Already seeded — skipping meals.');
    } else {
      for (const meal of meals) {
        const { rows: [m] } = await client.query(
          'INSERT INTO meals (name, notes) VALUES ($1, $2) RETURNING id',
          [meal.name, meal.notes]
        );
        for (const ing of meal.ingredients) {
          await client.query(
            'INSERT INTO ingredients (meal_id, name, quantity, category) VALUES ($1, $2, $3, $4)',
            [m.id, ing.name, ing.quantity, ing.category]
          );
        }
      }
      console.log(`Seeded ${meals.length} meals.`);
    }

    const { rows: sr } = await client.query('SELECT COUNT(*) FROM staples');
    if (parseInt(sr[0].count) > 0) {
      console.log('Staples already seeded — skipping.');
    } else {
      for (let i = 0; i < staples.length; i++) {
        await client.query(
          'INSERT INTO staples (name, category, sort_order) VALUES ($1, $2, $3)',
          [staples[i].name, staples[i].category, i]
        );
      }
      console.log(`Seeded ${staples.length} staples.`);
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
