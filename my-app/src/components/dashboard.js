import React from 'react'

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem('UserDetails'));
  const name=user[0].firstName;

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body'>
          Hi {name}</div>
      </div>
    </div>
  )
}

export default Dashboard