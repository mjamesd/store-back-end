const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const tagData = await Tag.findAll({
    attributes: ['tag_name'],
    include: {
      model: Product,
      attributes: {
        exclude: ['id', 'tag_id']
      }
    }
  });
  return res.status(200).json(tagData);
});

router.get('/:id', async (req, res) => {
  // Validate input
  let getId = req.params.id;
  if (isNaN(getId))
    return res.status(400).json(`Invalid parameter "${getId}"`);
  else
    getId = parseInt(getId);
  // find one tag by its `id` value
  // be sure to include its associated Products
  const tagData = await Tag.findOne({
    where: {
      id: getId
    },
    attributes: ['tag_name'],
    include: {
      model: Product,
      attributes: {
        exclude: ['id', 'tag_id']
      }
    }
  });
  if (!tagData)
    return res.status(404).json(`Tag with ID "${getId}" not found.`);
  else
    return res.status(200).json(tagData);
});

router.post('/', async (req, res) => {
  if (Object.keys(req.body)[0] !== 'tag_name')
    return res.json(`Invalid field name "${Object.keys(req.body)[0]}" in input.`);
  // create a new tag
  const tagData = await Tag.create(req.body);
  return res.status(200).json(`Tag "${tagData.tag_name}" created at ID ${tagData.id}!`);
});

router.put('/:id', async (req, res) => {
  // Validate input
  let putId = req.params.id;
  if (isNaN(putId))
    return res.status(400).json(`Invalid parameter "${putId}"`);
  else
    putId = parseInt(putId);
  // update a tag by its `id` value
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: putId
      }
    }
  );
  if (!tagData)
    return res.status(404).json(`Tag with ID "${putId}" not found.`);
  else if (tagData == 1)
    return res.status(200).json(`Tag name updated to "${req.body.tag_name}".`);
  else
    return res.status(400).json(`Update failed with code ${tagData}.`);
});

router.delete('/:id', async (req, res) => {
  // Validate input
  let delId = req.params.id;
  if (isNaN(delId))
    return res.status(400).json(`Invalid parameter "${delId}"`);
  else
    delId = parseInt(delId);
  // delete a tag by its `id` value
  const tagData = await Tag.destroy({
    where: {
      id: delId
    }
  });
  if (!tagData)
    return res.status(404).json(`Tag with ID "${delId}" not found.`);
  else if (tagData == 1)
    return res.status(200).json(`Tag with ID "${delId}" deleted.`);
  else
    return res.status(400).json(`Delete failed with code ${tagData}.`);  
});

module.exports = router;