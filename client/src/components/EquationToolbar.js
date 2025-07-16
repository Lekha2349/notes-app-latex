import React from 'react';

const symbols = [
  { label: '∑', latex: '\\sum' },
  { label: '∫', latex: '\\int' },
  { label: '√', latex: '\\sqrt{}' },
  { label: 'π', latex: '\\pi' },
  { label: 'H₂O', latex: 'H_2O' },
  { label: 'CO₂', latex: 'CO_2' },
  { label: '⇌', latex: '\\rightleftharpoons' },
];

export default function EquationToolbar({ onInsert }) {
  return (
    <div>
      {symbols.map(sym => (
        <button key={sym.label} onClick={() => onInsert(sym.latex)}>
          {sym.label}
        </button>
      ))}
    </div>
  );
}
