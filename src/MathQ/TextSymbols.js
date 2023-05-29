import React from 'react';
import {MathSymbol} from 'brainly-style-guide';
import {symbols} from './symbols';
import MathExp from '../MathExp';

export default function Symbols({onClick}) {
  const buttonNodes = symbols.map(symbol => (
    <button type="button" key={symbol.icon} className="tex-button" onClick={() => onClick(symbol.data)}>
      {symbol.icon}
    </button>
  ));

  return (
    <div style={{display: 'grid', gridAutoFlow: 'column',gridTemplateRows: 'auto auto', gridGap: 5}}>
      {buttonNodes}
    </div>
  )
}