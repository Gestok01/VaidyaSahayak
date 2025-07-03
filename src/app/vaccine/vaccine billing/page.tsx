import React from 'react'

import OxygenBilling from '../oxygen_billing/oxygen_billing';
import Header from '@/app/components/Header';
import NavBar from '@/app/components/NavBar';



const Oxygen = () => {
  return (
   <div className='bg-pink-50' >
    <Header />
      <NavBar />
      <OxygenBilling />
      </div>
  )
}

export default Oxygen;