const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const { gender, slug } = req.query;

    const products = await db.Product.findAll({
      include: [
        {
          model: db.Category,
          where: {
            ...(gender && { gender }),
            ...(slug && { slug }),
          },
        },
        db.Color,
        db.Size,
      ],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;