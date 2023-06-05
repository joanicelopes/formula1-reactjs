import React from 'react'
import '../../App.css' 
const ConstructorItem = ({ item }) => {
	const constructorClass = `constructor constructor-${item.constructorId}`;
	return (
		<div className={constructorClass}>
			<ul reversed>
				<li>
					<span>{item.name}</span>
					<span>lorem ipsum</span>
				</li>
			</ul>
		</div>
	)
}

export default ConstructorItem