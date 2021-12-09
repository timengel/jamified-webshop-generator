'use strict';

import {generateProducts} from './data/data.js';
import axios from 'axios';
import prompt from 'prompt';
import colors from 'colors';

const apiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

const generateAndCreateProducts = async (n) => {
  let nCreated = 0;
  if (n <= 0) {
    return nCreated;
  }
  const existingProducts = await fetchExistingProducts();

  const promises = generateProducts(n, existingProducts.length).map(
      async (p) => {
        const created = await createProduct(p);
        if (created) {
          nCreated = nCreated + 1;
        }
      });
  await Promise.all(promises);
  return nCreated;
}

const createProduct = async (product) => {
  let config = {
    headers: {
      'content-type': 'application/json',
    },
    meta: {
      pagination: {
        limit: 1000000,
      }
    }
  }

  const newEntry = await axios.post(`${apiUrl}/products`, product, config)
  .then(res => {
    console.log(
        `### POST: status: ${res.status} (id/slug: ${res.data.id}/${res.data.slug})`);
    return true;
  })
  .catch(err => {
    console.log('### POST: Error');
    console.error(err);
    return false;
  });
  return !!newEntry;
}

const fetchExistingProducts = async () => {
  let config = {
    headers: {
      'content-type': 'application/json',
    }
  }
  return await axios.get(`${apiUrl}/products`, config)
  .then(res => {
    console.log(
        `### GET: status: ${res.status} (${res.data.length} products found)`);
    return res.data;
  })
  .catch(err => {
    console.log('### POST: Error');
    console.error(err);
  });
}

//#################### Main ####################\\
const promptSchema = {
  properties: {
    number: {
      pattern: /^\d+$/,
      message: 'Input must be only whole numbers!',
      required: true,
      hidden: false,
      default: 0,
    },
  }
};

prompt.message = colors.green('How many products shall be created? ');
prompt.delimiter = colors.red('><');

prompt.start();
const {number} = await prompt.get(promptSchema);
console.log(`######### Starting to create products: ${number}`);

await generateAndCreateProducts(parseInt(number))
.then(res => console.log(
    `######### generateAndCreateProducts: Done (${res} created)`))
.catch(err => {
  console.log('######### generateAndCreateProducts: Error');
  console.error(err);
});
prompt.stop();
