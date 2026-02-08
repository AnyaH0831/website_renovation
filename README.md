# Part 2: Writeup

#### Deployment: https://htn-frontend-challenge-sepia.vercel.app/
#### Date: February 8, 2026

### 1. Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?

#### Planning:

1. Core Features:
      1.1   Event API Fetching
      1.2   Display Events
      1.3   Login/logout
      1.4   Filter Events (Public vs. Private)
      1.5   Related Event Links/Navigations
2. Additional Features Added:
      2.1   Search Functionality (Event Name, Description, Event Type)
      2.2   Pagination 
3. Component Structures:
   - App.jsx: Main application logic, states
   - EventCard.jsx: Individual event card display and related functionalities
   - LoginForm.jsx: Authentication
   - useAuth.js: Custom hooks for authentication (hardcoded)
   - api.js: API Integration
4. Accessibility
   - Accessible on different devices with various screen sizes.
   - Clear visual feedback: hover effects, highlighted cards
  
#### Tech Stack

- React (Vite) + JavaScript
- Tailwind CSS
   - Learned and used for faster/easier UI iteration
- Fuse.js
   - Used for fuzzy string search/matching
   - Return relevance score results. If score > 0.4 the event will appear as one of the search results. 
   - Better user experience as it allows typos
- Vercel for Deployment

#### Problems Encountered

1. Tailwind v4 Vercel Deployment Failure
      - When I initially tried to deploy the website on Vercel, the CSS/styling does not load due to Tailwind v4 was yet to be compatible with Vercel.
      - Then I downgraded to Tailwind v3.4.1 instead
2. Pagination Breaked Related Events
      - The initial logic to lead users to see the related events was a smooth scroll to the related event card.
      - After implemented pagination where there may be multiple pages of events broke the ability to smooth scroll to the event card.
      - Thus, I calculated which page contains the related event and update the current page then smooth scroll to the event.

#### Code that I'm Proud Of...

1. Search Matching Functionality
      - First filter private vs. public permission
      - Apply fuzzy search with Fuse.js
  
  ```javascript
  //Fuzzy 
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
  }
```

2. Debounced Search Implementation
      - Instead of instant search as the users are typing, here applied a 0.3s delay after the user stopped typing.
   ```javascript
      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
      }, [searchQuery]);
   ```
### 2. Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event? Would you add more features and performance metrics? If so, what would they be?

1. Real Authentication System (not hardcoded)
2. Live event updates
3. A calendar/schedule UI so users can clearly visually see when the events are
4. A map of the venue and specific locations marked where the events takes place (Maybe also with optional GPS navigation)
5. Better filters with date/time ranges, event type, speaker
6. Search History
7. Bookmark/saved events
8. Available in other languages
9. Notifications (Push, SMS, Email)
   
### 3. Any other thoughts you have (not limited to the previous questions).

For this project I had the opportunity to consider new technology that may be helpful for developing this website. For example, I learnt about TailwindCSS to accelerate the styling of the website so I can focus on implementing the core features and functionalities. 
