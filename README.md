# Baby Activity Tracker

This project is a **Baby Activity Tracker** designed to help parents monitor and log their baby's daily activities, including sleep, breastfeeding, and diaper changes. The app allows for easy data input and provides a timeline-based view of the baby's activities.

## Features

- **Sleep Tracking**: Log start and end times of sleep sessions.
- **Breastfeeding Tracking**: Record feeding sessions, including the side used.
- **Diaper Change Tracking**: Keep track of diaper changes by type (pee, poop, etc.).
- **Activity Timeline**: View a detailed timeline of all logs grouped by day.
- **Multi-User Support**: Allows multiple users (e.g., parents) to collaborate on logs for the same baby.
- **Polymorphic Log System**: Uses a flexible data model for managing different log types under a unified structure.

## Technologies Used

### Backend
- **Laravel**: PHP framework for building robust APIs and business logic.
- **Eloquent ORM**: For interacting with the database.
- **Polymorphic Relationships**: To manage diverse activity logs efficiently.

### Frontend
- **Inertia.js**: Bridges the Laravel backend with a modern React-based frontend.
- **React**: For building a dynamic and responsive user interface.
- **TypeScript**: Adds type safety to the frontend codebase.
- **TailwindCSS**: Provides a utility-first approach to styling.

### Database
- **PostgreSQL**: The relational database used for storing baby activity logs, users, and other entities.

