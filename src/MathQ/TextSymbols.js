import React from 'react';
import { symbols } from './symbols';
import { StaticMathField } from 'react-mathquill'

export default function Symbols({ onClick }) {
  const buttonNodes = symbols.map(symbol => (
    <button type="button" key={symbol.icon} className="tex-button it-inset-shadow " onClick={() => onClick(symbol.data)}>
      <StaticMathField>{symbol.data}</StaticMathField>
    </button>
  ));

  return (
    <div className='math-btns-grid'>
      {buttonNodes}
    </div>
  )
}