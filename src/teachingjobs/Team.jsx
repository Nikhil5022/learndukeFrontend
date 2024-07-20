import React from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Project Manager',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Jane Smith',
    role: 'Lead Developer',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: 'Sara Johnson',
    role: 'UX/UI Designer',
    image: 'https://via.placeholder.com/150'
  },
  // Add more team members as needed
];

export default function Team() {
  return (
    <div className='w-full lg:w-10/12 mx-auto p-4 mt-10'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold'>Our Team</h1>
        <p className='text-lg mt-2'>Meet our talented and diverse teams, working collaboratively to deliver exceptional results.</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-16'>
        {teamMembers.map((member, index) => (
          <div key={index} className='flex flex-col'>
            <img src={member.image} alt={member.name} className='rounded-lg mb-4' />
            <h2 className='text-xl font-semibold ml-2'>{member.name}</h2>
            <p className='text-gray-600 ml-2' style={{color:"#67A4FF"}}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
