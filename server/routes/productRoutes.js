const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require('sequelize'); 

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.json([]);
    }

    const products = await db.Product.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { brand: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        db.Category,
        {
          model: db.Color,
          through: { attributes: [] },
        },
        {
          model: db.Size,
          through: { attributes: [] },
        },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка поиска товаров' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { gender, slug } = req.query;

    const products = await db.Product.findAll({
      include: [
        {
          model: db.Category,
          where: {
            gender,
            slug,
          },
          required: true,
        },
        {
          model: db.Color,
          through: { attributes: [] },
        },
        {
          model: db.Size,
          through: { attributes: [] },
        },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await db.Product.findByPk(id, {
      include: [
        db.Category,
        {
          model: db.Color,
          through: { attributes: [] },
        },
        {
          model: db.Size,
          through: { attributes: [] },
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;