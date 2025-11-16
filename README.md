# Code Collab

A real-time collaborative code editor platform that enables developers to code together, share ideas, and collaborate seamlessly in a distributed environment.

## Overview

Code Collab is a full-stack collaborative coding platform built with modern web technologies. It provides real-time code editing capabilities, user authentication, project management, and integrated chat functionality. The platform uses Yjs for conflict-free replicated data types (CRDTs) to ensure seamless real-time collaboration.

## Features

- **Real-time Collaborative Editing**: Multiple users can edit code simultaneously with live cursor tracking
- **User Authentication**: Secure authentication system powered by Supabase
- **Project Management**: Create, manage, and organize coding projects
- **Integrated Chat**: Built-in chat system for team communication
- **Monaco Editor Integration**: Professional-grade code editor with syntax highlighting
- **Room-based Collaboration**: Create or join coding rooms for focused collaboration
- **Dark/Light Mode**: Toggle between themes for comfortable coding experience
- **Session Timer**: Built-in stopwatch to track coding sessions

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Monaco Editor** for code editing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Supabase Client** for authentication

### Backend
- **Express.js** REST API server
- **WebSocket Server** for real-time communication
- **Yjs WebSocket Server** for CRDT-based collaboration
- **Supabase** for database and authentication
- **JWT** for token-based authentication

### Infrastructure
- **Turborepo** for monorepo management
- **pnpm** for package management
- **TypeScript** throughout the stack
- **ESLint** for code quality
- **Prettier** for code formatting

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `frontend`: React + Vite application with Monaco Editor and collaboration features
- `Api-server`: Express.js REST API server handling authentication and user management
- `websocket-server`: WebSocket server for real-time communication
- `yjs-server`: Yjs WebSocket server for collaborative editing with CRDTs

### Packages

- `@repo/ui`: Shared React component library
- `@repo/common`: Common types and utilities shared across apps
- `@repo/backend-common`: Shared backend utilities and configurations
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0 or higher
- Supabase account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harish-Naruto/code-collab.git
cd code-collab
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
   - Configure Supabase credentials for the frontend and API server
   - Set up necessary environment variables in each app directory

### Development

To run all apps in development mode:

```bash
pnpm dev
```

This will start:
- Frontend on default Vite port (usually 5173)
- API server
- WebSocket server
- Yjs server

### Build

To build all apps and packages:

```bash
pnpm build
```

### Other Commands

```bash
# Run linting across all packages
pnpm lint

# Format code
pnpm format

# Type checking
pnpm check-types
```

## Project Structure

```
code-collab/
├── apps/
│   ├── frontend/          # React frontend application
│   ├── Api-server/        # Express REST API
│   ├── websocket-server/  # Real-time WebSocket server
│   └── yjs-server/        # Yjs CRDT collaboration server
├── packages/
│   ├── ui/                # Shared UI components
│   ├── common/            # Common utilities
│   ├── backend-common/    # Backend utilities
│   ├── eslint-config/     # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
└── supabase/              # Supabase migrations and types
```

## Routes

- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - User dashboard
- `/profile` - User profile management
- `/create-room` - Create a new collaboration room
- `/join-room` - Join an existing room
- `/code-collab-page` - Main collaborative coding interface
- `/forgot-password` - Password recovery

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
