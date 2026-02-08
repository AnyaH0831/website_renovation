import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { fetchEvents } from './services/api';
import EventCard from './components/EventCard';
import {useAuth} from './hooks/useAuth';
import LoginForm from './components/LoginForm';
import Fuse from 'fuse.js';
// import EventCard from './components/EventCard'

function App() {
  //To store events data
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const {isLoggedIn, login, logout} = useAuth();

  //When components load, fetchevents
  useEffect(() => {
    const getEvents = async () => {
      try{
        const data = await fetchEvents();
        // console.log('Fetched events:', data);
        const sortedData = data.sort((a,b) => a.start_time - b.start_time)
        console.log(sortedData)
        setEvents(sortedData);
        setLoading(false);
      }catch (error){
        console.error('Error:', error);
        setLoading(false);
      }
    }

    getEvents();
  }, [])

  

  if (loading) {
    return <div>Loading events...</div>
  }

  let filteredEvents;
  if (isLoggedIn){
    filteredEvents = events;
  }else{
    filteredEvents = events.filter(event => event.permission === 'public')
  }

  // Fuzzy search
  if (searchQuery) {

    const fuse = new Fuse(filteredEvents, {
        keys: [
          'name',
          'description',
          'event_type'
        ],
        threshold: 0.4,
        ignoreLocation: true
      });

    const results = fuse.search(searchQuery);

    filteredEvents = results.map(function(result) {
      return result.item;
    })
      // return event.name.toLowerCase().includes(query) ||
      //        event.description.toLowerCase().includes(query) ||
      //        event.event_type.toLowerCase().includes(query);
    
  }
   

  return (
    <div className="min-h-screen bg-black font-mono">
      {/* Navigation Bar */}
      <nav className="bg-ultrasonic-blue border-b-2 border-neon-pink shadow-sm">
        <div className="container mx-auto px-4 py-1 max-w-7xl flex justify-between items-center">
          <h1 className="text-2xl font-bold font-mono text-vivid-royal drop-shadow-[0_0_2px_#f72585]">Hack the North Events</h1>
          
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={function(e) { setSearchQuery(e.target.value) }}
                className="px-4 py-1 bg-vivid-royal text-white border border-electric-sapphire rounded focus:outline-none focus:border-neon-pink placeholder-sky-aqua"
              />
            </div>

            {/* Login/Logout Button */}
            {!isLoggedIn && (
              <button
                onClick={function() { setShowLoginForm(true) }}
                className="px-4 py-1 bg-neon-pink text-white rounded hover:bg-raspberry-plum transition-colors"
              >
                Login
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={logout}
                className="px-4 py-2 bg-raspberry-plum text-white rounded hover:bg-indigo-bloom transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Login Form Modal */}
      {!isLoggedIn && showLoginForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={function() { setShowLoginForm(false) }}
              className="absolute top-2 right-2 text-sky-aqua hover:text-neon-pink"
            >
              ✕
            </button>
            <LoginForm onLogin={login} />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <p className="text-sky-aqua mb-8">Showing {filteredEvents.length} events</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} allEvents={events} isLoggedIn={isLoggedIn} />
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default App
