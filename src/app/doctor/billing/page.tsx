import Header from '@/app/components/Header'
import NavBar from '@/app/components/NavBar'
import React from 'react'
import BookAppointmentTable from './BookAppointmentTable'

const page = () => {
  return (
    <div><Header />
    <NavBar />
    <BookAppointmentTable />
    </div>
  )
}

export default page