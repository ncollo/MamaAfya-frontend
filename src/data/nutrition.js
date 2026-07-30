export const dailyMeals = {
  breakfast: {
    label: 'Breakfast',
    icon: 'wb_sunny',
    title: 'Morning Nourishment',
    description: 'Start your day with energy-packed local ingredients to support you and your baby.',
    plate: {
      segments: [
        { label: 'Grains', color: '#caead2', percent: 40 },
        { label: 'Protein', color: '#ffdbce', percent: 30 },
        { label: 'Veggies', color: '#ffe17a', percent: 30 },
      ],
    },
    ingredients: [
      {
        id: 1,
        name: 'Uji wa Wimbi',
        benefit: 'Provides sustained energy and soothes morning nausea.',
        color: 'primary',
        icon: 'grain',
        nutrients: ['Iron', 'Folate', 'Fibre'],
      },
      {
        id: 2,
        name: 'Boiled Eggs',
        benefit: 'High-quality protein essential for baby\'s brain development.',
        color: 'secondary',
        icon: 'egg',
        nutrients: ['Protein', 'Choline', 'Vitamin D'],
      },
      {
        id: 3,
        name: 'Pawpaw (Papaya)',
        benefit: 'Rich in Vitamin C to boost immunity and aid digestion.',
        color: 'tertiary',
        icon: 'nutrition',
        nutrients: ['Vitamin C', 'Folate', 'Potassium'],
      },
    ],
  },
  lunch: {
    label: 'Lunch',
    icon: 'light_mode',
    title: 'Midday Strength',
    description: 'A balanced midday meal to keep your energy levels stable throughout the afternoon.',
    plate: {
      segments: [
        { label: 'Grains', color: '#caead2', percent: 35 },
        { label: 'Protein', color: '#ffdbce', percent: 35 },
        { label: 'Veggies', color: '#ffe17a', percent: 30 },
      ],
    },
    ingredients: [
      {
        id: 4,
        name: 'Sukuma Wiki',
        benefit: 'Rich in iron and folate, essential for baby\'s development.',
        color: 'primary',
        icon: 'eco',
        nutrients: ['Iron', 'Folate', 'Calcium'],
      },
      {
        id: 5,
        name: 'Omena (Dagaa)',
        benefit: 'Excellent source of calcium and protein for strong bones.',
        color: 'secondary',
        icon: 'set_meal',
        nutrients: ['Calcium', 'Protein', 'Omega-3'],
      },
      {
        id: 6,
        name: 'Brown Ugali',
        benefit: 'Whole grain energy that keeps blood sugar stable.',
        color: 'tertiary',
        icon: 'grain',
        nutrients: ['Complex Carbs', 'Fibre', 'B Vitamins'],
      },
    ],
  },
  dinner: {
    label: 'Dinner',
    icon: 'nights_stay',
    title: 'Evening Recovery',
    description: 'Light but nourishing dinner to help your body recover and support overnight growth.',
    plate: {
      segments: [
        { label: 'Protein', color: '#ffdbce', percent: 40 },
        { label: 'Veggies', color: '#ffe17a', percent: 35 },
        { label: 'Grains', color: '#caead2', percent: 25 },
      ],
    },
    ingredients: [
      {
        id: 7,
        name: 'Kunde (Cowpeas)',
        benefit: 'Plant-based protein and iron to prevent anaemia.',
        color: 'primary',
        icon: 'spa',
        nutrients: ['Plant Protein', 'Iron', 'Zinc'],
      },
      {
        id: 8,
        name: 'Sweet Potatoes',
        benefit: 'Beta-carotene converts to Vitamin A for baby\'s eye development.',
        color: 'tertiary',
        icon: 'nutrition',
        nutrients: ['Vitamin A', 'Potassium', 'Fibre'],
      },
      {
        id: 9,
        name: 'Mchicha (Amaranth)',
        benefit: 'Leafy greens packed with calcium and antioxidants.',
        color: 'secondary',
        icon: 'eco',
        nutrients: ['Calcium', 'Antioxidants', 'Vitamin K'],
      },
    ],
  },
};

export const tips = [
  {
    id: 1,
    icon: 'water_drop',
    title: 'Stay Hydrated',
    body: 'Drink at least 8-10 glasses of clean water daily. Dehydration can cause premature contractions.',
    color: 'primary',
  },
  {
    id: 2,
    icon: 'block',
    title: 'Foods to Avoid',
    body: 'Avoid raw fish, undercooked meat, unpasteurised milk, and excess caffeine during pregnancy.',
    color: 'error',
  },
  {
    id: 3,
    icon: 'volunteer_activism',
    title: 'Iron-Rich Foods',
    body: 'Eat iron-rich foods with Vitamin C (like oranges) to help your body absorb more iron.',
    color: 'secondary',
  },
  {
    id: 4,
    icon: 'wb_sunny',
    title: 'Morning Sickness',
    body: 'Eat small, frequent meals. Uji wa wimbi and ginger tea can help ease nausea.',
    color: 'tertiary',
  },
];

export const weeklyPlan = [
  { day: 'Mon', breakfast: 'Uji + Eggs', lunch: 'Sukuma + Ugali', dinner: 'Kunde + Rice' },
  { day: 'Tue', breakfast: 'Mandazi + Milk', lunch: 'Omena + Ugali', dinner: 'Sweet Potato + Greens' },
  { day: 'Wed', breakfast: 'Pawpaw + Porridge', lunch: 'Beans + Chapati', dinner: 'Mchicha + Ugali' },
  { day: 'Thu', breakfast: 'Uji + Banana', lunch: 'Chicken + Rice', dinner: 'Lentils + Bread' },
  { day: 'Fri', breakfast: 'Eggs + Avocado', lunch: 'Fish + Ugali', dinner: 'Kunde + Sweet Potato' },
  { day: 'Sat', breakfast: 'Uji wa Wimbi', lunch: 'Pilau + Salad', dinner: 'Vegetable Stew' },
  { day: 'Sun', breakfast: 'Pancakes + Fruits', lunch: 'Nyama + Ugali', dinner: 'Light Soup' },
];
