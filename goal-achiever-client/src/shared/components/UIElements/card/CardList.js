import React from 'react';
import Card from './Card';
import classes from './CardList.module.scss';

const CardList = ({ cardsArrayData }) => {
  const cards = cardsArrayData.map((card) => {
    if (!card) return null;
    const { key, header, footer, content } = card;
    return (
      <Card key={key} header={header} footer={footer}>
        {content}
      </Card>
    );
  });
  return <div className={classes.CardList}>{cards}</div>;
};

export default CardList;
