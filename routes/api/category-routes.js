const router = require('express').Router();
const { Category, Product } = require('../../models');

// The Category routes' prefix is `/api/categories`

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
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
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value, including its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
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
      return res.status(404).json(`Category with ID "${req.params.id}" not found.`);
    else
      return res.status(200).json(categoryData);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    return res.status(200).json(`Tag "${categoryData.category_name}" created at ID ${categoryData.id}.`);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!categoryData)
      return res.status(404).json(`Category with ID "${req.params.id}" not found.`);
    else if (categoryData == 1)
      return res.status(200).json(`Category name updated to "${req.body.category_name}".`);
    else
      return res.status(400).json(`Update failed with code ${categoryData}.`);
    } catch (err) {
      return res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData)
      return res.status(404).json(`Category with ID "${req.params.id}" not found.`);
    else if (categoryData == 1)
      return res.status(200).json(`Category with ID "${req.params.id}" deleted.`);
    else
      return res.status(400).json(`Delete failed with code ${categoryData}.`);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;