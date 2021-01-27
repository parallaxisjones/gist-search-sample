import React from 'react';
import './Body.css';

export const Body: React.FC = ({ children }) => {
  return (
    <section className="Body">
      {children}
    </section>
  );
}

export default Body;
