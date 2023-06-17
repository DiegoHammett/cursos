import React from 'react';
import { symbols } from './symbols';
import { StaticMathField } from 'react-mathquill'

export default function Symbols({ onClick }) {
  const buttonNodes = symbols.map(symbol => (
    <button type="button" key={symbol.icon} className="tex-button" onClick={() => onClick(symbol.data)}>
      <StaticMathField>{symbol.data}</StaticMathField>
    </button>
  ));

  return (
    <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'auto auto', gridGap: 5 }}>
      {buttonNodes}
    </div>
  )
}