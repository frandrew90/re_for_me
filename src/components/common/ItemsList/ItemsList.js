/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '../Paper/Paper';
import CardWithMenu from '../CardWithMenu/CardWithMenu';
import { ListStyles } from '../../../styles/listStyles';

const ItemsList = ({ items, onEditItem, onDeleteItem, link }) => {
  // console.log('itemsList');

  // useEffect(() => {
  //   console.log('items');
  // }, [items]);
  // useEffect(() => {
  //   console.log('onEditItem');
  // }, [onEditItem]);
  // useEffect(() => {
  //   console.log('onDeleteItem');
  // }, [onDeleteItem]);

  return (
    <ul css={ListStyles}>
      {items.map(item => (
        <li key={item.id}>
          <Paper>
            <CardWithMenu
              item={item}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item)}
              link={link}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default memo(ItemsList);
// export default ItemsList;
