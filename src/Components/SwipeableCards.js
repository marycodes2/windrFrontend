import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Card from './Card'

const styles = {
  slide: {
  },
  slide1: {
    backgroundColor: 'lightcyan',
  },
  slide2: {
    backgroundColor: 'pink',
  },
  slide3: {
    backgroundColor: 'violet',
  },
};

function DemoSimple() {
  return (
    <SwipeableViews enableMouseEvents>
      <div style={Object.assign({}, styles.slide, styles.slide1)}><Card/></div>
      <div style={Object.assign({}, styles.slide, styles.slide2)}><Card/></div>
      <div style={Object.assign({}, styles.slide, styles.slide3)}><Card/></div>
    </SwipeableViews>
  );
}

export default DemoSimple;
