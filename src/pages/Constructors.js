import ConstructorGrid from '../components/constructors/ConstructorGrid';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () =>  {

const [items, setItems] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`http://ergast.com/api/f1/current/constructors.json`)
      setItems(result.data.MRData.ConstructorTable.Constructors)
      setIsLoading(false)
    }
    fetchItems()
},[]) 
    return (
        <ConstructorGrid isLoading={isLoading} items={items} />
    )
}

export default Home