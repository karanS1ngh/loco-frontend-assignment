import dynamic from 'next/dynamic';

// Dynamically import the Calendar component
const DynamicCalendar = dynamic(() => import('../components/Calendar'), {
  loading: () => <p>Loading calendar...</p>,  // Optional: Show a loading indicator
});

export default function Home() {
  return (
    <div className='flex flex-col items-center mb-4'>
      <h1 className='text-xl font-semibold'>Calendar Event Scheduler</h1>
      {/* Render the dynamic Calendar component */}
      <DynamicCalendar />
    </div>
  );
}
