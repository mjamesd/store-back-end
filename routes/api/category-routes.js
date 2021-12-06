const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    attributes: ['category_name'],
    include: {
      model: Product,
      attributes: {
        exclude: ['id', 'category_id']
      }
    }
  });
  return res.status(200).json(categoryData);
});

router.get('/:id', async (req, res) => {
  // Validate input
  let getId = req.params.id;
  if (isNaN(getId))
    return res.status(400).json(`Invalid parameter "${getId}"`);
  else
    getId = parseInt(getId);
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryData = await Category.findOne({
    where: {
      id: getId
    },
    attributes: ['category_name'],
    include: {
      model: Product,
      attributes: {
        exclude: ['id', 'category_id']
      }
    }
  });
  if (!categoryData)
    return res.status(404).json(`Category with ID "${getId}" not found.`);
  else
    return res.status(200).json(categoryData);
});

router.post('/', async (req, res) => {
  if (Object.keys(req.body)[0] !== 'category_name')
    return res.json(`Invalid field name "${Object.keys(req.body)[0]}" in input.`);
  // create a new category
  const categoryData = await Category.create(req.body);
  return res.status(200).json(`Tag "${categoryData.category_name}" created at ID ${categoryData.id}!`);
});

router.put('/:id', async (req, res) => {
  // Validate input
  let putId = req.params.id;
  if (isNaN(putId))
    return res.status(400).json(`Invalid parameter "${putId}"`);
  else
    putId = parseInt(putId);
  // update a category by its `id` value
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: putId
      }
    }
  );
  if (!categoryData)
    return res.status(404).json(`Category with ID "${putId}" not found.`);
  else if (categoryData == 1)
    return res.status(200).json(`Category name updated to "${req.body.category_name}".`);
  else
    return res.status(400).json(`Update failed with code ${categoryData}.`);
});

router.delete('/:id', async (req, res) => {
  // Validate input
  let delId = req.params.id;
  if (isNaN(delId))
    return res.status(400).json(`Invalid parameter "${delId}"`);
  else
    delId = parseInt(delId);
  // delete a category by its `id` value
  const categoryData = await Category.destroy({
    where: {
      id: delId
    }
  });
  if (!categoryData)
    return res.status(404).json(`Category with ID "${delId}" not found.`);
  else if (categoryData == 1)
    return res.status(200).json(`Category with ID "${delId}" deleted.`);
  else
    return res.status(400).json(`Delete failed with code ${categoryData}.`);  
});

module.exports = router;