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
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(9);

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

  // Debounced search - wait 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, isLoggedIn, eventsPerPage]);

  

  if (loading) {
    return (
      <div className="min-h-screen bg-black font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-aqua mb-4"></div>
          <p className="text-sky-aqua text-lg">Loading events...</p>
        </div>
      </div>
    )
  }

  let filteredEvents;
  if (isLoggedIn){
    filteredEvents = events;
  }else{
    filteredEvents = events.filter(event => event.permission === 'public')
  }

  // Fuzzy search
  if (debouncedQuery) {

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

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
   

  return (
    <div className="min-h-screen bg-black font-mono">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 shadow-sm relative">
        <div className="container mx-auto px-4 py-2 max-w-7xl flex flex-wrap justify-between items-center gap-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-raspberry-plum drop-shadow-[0_0_2px_#f72585]" style={{WebkitTextStroke: '1px #4cc9f0'}}>Hack the North Events</h1>
          
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={function(e) { setSearchQuery(e.target.value) }}
                className="w-32 sm:w-48 md:w-64 px-2 sm:px-4 py-1 text-sm bg-gray-800 text-white border border-electric-sapphire rounded focus:outline-none focus:border-neon-pink placeholder-sky-aqua"
              />
            </div>

            {/* Login/Logout Button */}
            {!isLoggedIn && (
              <button
                onClick={function() { setShowLoginForm(true) }}
                className="px-3 sm:px-4 py-1 text-sm sm:text-base bg-neon-pink text-white rounded hover:bg-raspberry-plum transition-colors whitespace-nowrap"
              >
                Login
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={logout}
                className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-raspberry-plum text-white rounded hover:bg-indigo-bloom transition-colors whitespace-nowrap"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        {/* Animated gradient menu border */}
        <div 
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, #f72585, #4361ee, #4cc9f0, #4361ee, #f72585)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite'
          }}
        />
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


      {/* Pagination */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <p className="text-sky-aqua">Showing {currentEvents.length} of {filteredEvents.length} events</p>
          
          <div className="flex items-center gap-2">
            <label className="text-sky-aqua text-sm">Events per page:</label>
            <select
              value={eventsPerPage}
              onChange={function(e) { setEventsPerPage(Number(e.target.value)) }}
              className="px-3 py-1 bg-gray-800 text-white border border-electric-sapphire rounded focus:outline-none focus:border-sky-aqua"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={30}>30</option>
              <option value={filteredEvents.length}>All</option>
            </select>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-white mb-2">No Events Found :C</h3>
            <p className="text-blue-energy">Try adjusting your search</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentEvents.map(event => (
                <EventCard key={event.id} event={event} allEvents={events} isLoggedIn={isLoggedIn} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={function() { setCurrentPage(currentPage - 1) }}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-electric-sapphire text-white rounded hover:bg-blue-energy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <span className="text-sky-aqua font-mono">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={function() { setCurrentPage(currentPage + 1) }}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-electric-sapphire text-white rounded hover:bg-blue-energy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        
      </div>
    </div>
  )
}

export default App
