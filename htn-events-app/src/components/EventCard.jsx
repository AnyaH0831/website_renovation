function EventCard({ event, allEvents, isLoggedIn }) {
    const formattedDate = new Date(event.start_time).toLocaleString()

    const scrollToEvent = (eventId) => {
        const element = document.getElementById('event-' + eventId);

        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    const getEventName = (eventId) => {
        const foundEvent = allEvents.find(function(e) {
            return e.id === eventId;
        });
        
        if (foundEvent) {
            return foundEvent.name;
        }else{
            return 'Event ' + eventId;
        }
    }

    // Filter related events based on login status
    const getFilteredRelatedEvents = () => {
        if (isLoggedIn) {
            return event.related_events;
        } else {
            // Only show public related events if not logged in
            return event.related_events.filter(function(relatedId) {
                const relatedEvent = allEvents.find(function(e) {
                    return e.id === relatedId;
                });
                return relatedEvent && relatedEvent.permission === 'public';
            });
        }
    }

    const filteredRelatedEvents = getFilteredRelatedEvents();
  
    return (
        <div
            id={'event-' + event.id}
            className="bg-ultrasonic-blue border-2 border-electric-sapphire rounded-lg p-6 shadow-sm hover:border-neon-pink transition-all">
            <h3 className="text-xl font-bold mb-2 text-sky-aqua">{event.name}</h3>
            
            <div className="flex gap-3 mb-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-electric-sapphire text-white rounded-full">
                    {event.event_type}
                </span>
                <span className="text-sm text-blue-energy">{formattedDate}</span>
            </div>
            
            <p className="text-white mb-4 text-sm">{event.description}</p>

            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-sky-aqua">Speakers:</span>
                {event.speakers.map((speaker, index) => (
                    <span key={index} className="text-sm text-neon-pink">
                        {speaker.name}{index < event.speakers.length - 1 ? ',' : ''}
                    </span>
                ))}
            </div>

            {filteredRelatedEvents.length > 0 && (
                <div className = "border-t border-bright-indigo mt-4 pt-4">
                    <span className="text-sm font-semibold text-sky-aqua">Related Events: </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {filteredRelatedEvents.map((relatedId) => {
                            
                            return (
                                <button
                                    key = {relatedId}
                                    onClick={() => scrollToEvent(relatedId)}
                                    className="text-sm bg-electric-sapphire text-white px-2 py-1 rounded hover:bg-blue-energy transition-colors"
                                > {getEventName(relatedId)}</button>
                            )
                            
                        })}
                    </div>
                    
                </div>
            )}

        </div>
    );
}

export default EventCard;