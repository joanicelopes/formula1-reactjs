import React from 'react'
const DriverItem = ({ item }) => {
    const name = item.givenName + ' ' + item.familyName
	const imagePath =  '../../assets/images/drivers/'
	const imageSource = `${imagePath}${item.driverId}.png`

	/*const driverNameStyle = {
		display: 'inline-block',
		paddingLeft: '8px',
		fontWeight: 'bold',
		fontSize: '18px',
		color: '#333',
		borderBottom: `4px solid ${item.teamColor}`,
		marginBottom: '12px'
	};*/
	
  return (
    <div className="wrapper">
		
	<ol >
		<li>
			<span>{item.permanentNumber}</span>
			<span >{name}</span>
			<img src={'imageSource'}/>
			
		</li>
	</ol>
</div>
  )
}

export default DriverItem