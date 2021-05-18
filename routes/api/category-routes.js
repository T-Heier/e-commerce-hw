const router = require('express').Router();
const { reset } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catData = await Catergory.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    
    if (!catData) {
      res.status(404).json({ message: `No category found with that id!` });
      return;
    }
    
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err)
  }

  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Catergory.create(req.body);
    res.status(200).json(catData)
  } catch {
    res.status(404).json({ message: 'Something went wrong, failed to create!' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(
      {
        catergory_name: req.body.catergory_name,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(catData)
  } catch {
    res.status(404).json({ message: 'Failed to find item with that id!' })
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Catergory.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(catData)
  } catch {
    res.status(404).json({ message: 'Failed to delete, no id matched' })
  }
});

module.exports = router;
