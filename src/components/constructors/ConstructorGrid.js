import React from 'react'
import ConstructorItem from './ConstructorItem'

const ConstructorGrid = ({ items, isLoading }) => {
  return isLoading ? (
      <h1>Loading...</h1>
  ) : (
    <section className='constructors'>
    <h1>Current Constructors</h1>
      {items.map((item) => (
          <ConstructorItem key={item.constructorId} item={item} ></ConstructorItem>
      ))}  
    </section>
  );
}

export default ConstructorGrid