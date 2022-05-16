import React from 'react';
import Card from './Card';
import classes from './CardList.module.scss';

const CardList = ({ cardsData = [] }) => {
  const cards = cardsData.map((card) => {
    if (!card) return null;
    return (
      <Card
        key={card.key}
        headerMeduim={card.headerMeduim}
        footer={card.footer}
      >
        {card.content}
      </Card>
    );
  });
  return <div className={classes.CardList}>{cards}</div>;
};

export default CardList;
