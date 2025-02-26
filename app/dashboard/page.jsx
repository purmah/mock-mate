import React from 'react'
import InterviewList from './_components/InterviewList'
import AddNewInterview from './_components/AddNewInterview'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <InterviewList />
        </div>
        <div>
          <AddNewInterview />
        </div>
      </div>
    </div>
  )
}