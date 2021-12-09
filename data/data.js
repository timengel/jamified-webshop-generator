import {
  capitalizeFirstLetter,
  generateRandomInteger,
  generateRandomNumber
} from '../utils/utils.js';
import loremIpsum from 'lorem-ipsum'

const lorem = new loremIpsum.LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 1
  },
  wordsPerSentence: {
    max: 12,
    min: 5
  }
});

const generateProduct = ({id, title, description, price, slug, categories}) => {
  return {
    id: id,
    title: title,
    description: description,
    price: price,
    slug: slug,
    status: 'published',
    Custom_field: [
      {
        id: id,
        title: 'Select the size of your sticker',
        required: true,
        options: 'Small[+0.00]|Medium[+0.40]|Large[+0.80]',
      },
    ],
    image: null,
    categories: categories,
  }
};

const getCategories = () => {
  return [
    {
      id: 1,
      name: "Back",
      slug: "back",
    },
    {
      id: 2,
      name: "Front",
      slug: "front",
    },
    {
      id: 3,
      name: "SSG",
      slug: "ssg",
    },
    {
      id: 4,
      name: "Container",
      slug: "container",
    },
    {
      id: 5,
      name: "Database",
      slug: "database",
    },
    {
      id: 6,
      name: "Other",
      slug: "other",
    },
  ]
}

const getRandomCategories = () => {
  // How many categories to assign
  const numberOfCategories = generateRandomInteger(1, 3); // 1, 3 => 2 categories
  // Generate unique category indexes
  const indexes = [];
  const categories = getCategories();
  while (indexes.length < numberOfCategories) {
    let category = generateRandomInteger(1, categories.length);
    if (indexes.indexOf(category) === -1) {
      indexes.push(category);
    }
  }
  // Return category objects by index
  const result = [];
  indexes.map(i => {
    result.push(categories[i]);
  });
  return result;
}

export const generateProducts = (n, nExist) => {
  let generatedProducts = [];
  for (let i = nExist + 1; i <= (nExist + n); i++) {
    const name = lorem.generateWords(1);
    const title = capitalizeFirstLetter(name);
    const slug =
        name + '-' + i.toString() + '-' + generateRandomInteger(1, 100000);
    const categoryIds = getRandomCategories().map((c) => c.id)

    generatedProducts.push(generateProduct({
          id: i,
          title: title,
          description: lorem.generateSentences(1),
          price: generateRandomNumber(1, 1000, 100),
          slug: slug,
          categories: categoryIds,
        }
    ))
  }
  return generatedProducts;
}



