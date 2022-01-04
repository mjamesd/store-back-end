const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The Product routes' prefix is `/api/products`

// get all products
router.get('/', async (req, res) => {
  // find all products, including each's associated Category and Tag data
  try {
    const productData = await Product.findAll({
      attributes: {
        exclude: ['id']
      },
      include: [{
        model: Category,
        attributes: {
          exclude: ['id']
        }
      }, {
        model: Tag,
        attributes: {
          exclude: ['id', 'product_tag']
        }
      }]
    });
    return res.status(200).json(productData);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single product by its `id` and include its associated Category and Tag data
  try {
    const productData = await Product.findOne({
      where: {
        id: req.params.id
      },
      attributes: {
        exclude: ['id']
      },
      include: [{
        model: Category,
        attributes: {
          exclude: ['id']
        }
      }, {
        model: Tag,
        attributes: {
          exclude: ['id', 'product_tag']
        }
      }]
    });
    if (!productData)
      return res.status(404).json(`Product with ID "${req.params.id}" not found.`);
    else
      return res.status(200).json(productData);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      category_id: 1,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const productData = await Product.create(req.body);
    if (req.body.tagIds.length) {
      try {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: productData.id,
            tag_id,
          };
        });
        const productTagData = await ProductTag.bulkCreate(productTagIdArr);
        return res.status(200).json(`Product created. Tags accociated.`);
      } catch (err) {
        return res.status(400).json(`ProductTag Error: ${err}`);
      }
    }
    // if no product tags, just respond
    res.status(200).json(`Product created.`);
  } catch (err) {
    return res.status(400).json(`Product Error: ${err}`);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      category_id: 1,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // find all associated tags from ProductTag
    if (req.body.tagIds) {
      try {
        const productTags = await ProductTag.findAll({
          where: {
            product_id: req.params.id
          }
        });
        // get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        // Delete the through table product-tag links
        try {
          await ProductTag.destroy({
            where: {
              id: productTagsToRemove
            }
          });
        } catch (err) {
          return res.status(400).json(`ProductTag.destroy Error: ${err}`);
        }
        // Create new product-tag links in through table
        try {
          await ProductTag.bulkCreate(newProductTags);
        } catch (err) {
          return res.status(400).json(`ProductTag.bulkCreate Error: ${err}`);
        }

        return res.status(200).json(updatedProductTags);
      } catch (err) {
        return res.status(400).json(`ProductTag Error: ${err}`);
      }
    } else {
      return res.status(200).json(`Product updated.`);
    }
  } catch (err) {
    return res.status(400).json(`Product Error: ${err}`);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productData)
      return res.status(404).json(`Product with ID "${req.params.id}" not found.`);
    else if (productData == 1)
      return res.status(200).json(`Product with ID "${req.params.id}" deleted.`);
    else
      return res.status(400).json(`Delete failed with code ${productData}.`);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;