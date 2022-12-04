import { Card } from '../models/card.js';
import { BadRequestError, NotFoundError, ForbiddenError } from '../errors/index.js';

// POST-запрос для создания новой карточки
export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

// GET-запрос для загрузки всех карточек
export const findCards = (req, res, next) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

// GET-запрос карточки по id
export const findCardById = (req, res, next) => {
  Card.findById(req.params.cardId).populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректные данные. ${err.message}`));
      } else {
        next(err);
      }
    });
};

// DELETE-запрос на удаление карточки по id
export const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Доступ запрещен');
      } else {
        return card.remove().then(() => { res.send(card); });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

// PUT-запрос постановки лайка
export const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

// DELETE-запрос удаления лайка
export const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // удалить _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};
