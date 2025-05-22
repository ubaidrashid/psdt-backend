import {cards} from '../data/cardsData.js';

export const getAllCards = (req, res) => {
  res.json(cards);
};

export const getCardById = (req, res) => {
  const card = cards.find((c) => c.id === req.params.id);
  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
};
