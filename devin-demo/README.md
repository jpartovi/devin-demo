# Devin Demo App

A simple Next.js application designed to demonstrate behavioral testing migration capabilities with Cognition's Devin.

## Features

- **Landing Page**: Clean, responsive homepage with navigation to the dashboard
- **User Management Dashboard**: Full CRUD operations for user management
  - Add users with name, email, and role
  - View users in a table format
  - Delete individual users
  - Clear all users
  - Role-based styling (Admin, Moderator, User)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React hooks (useState)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) (or 3001 if 3000 is busy) to view the app

## Application Structure

```
src/
├── app/
│   ├── page.tsx           # Landing page
│   ├── dashboard/
│   │   └── page.tsx       # User management dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
```

## Behavioral Testing Features

The app is designed with testable elements in mind:

- **Data attributes**: All interactive elements have `data-testid` attributes for easy targeting
- **Clear user flows**: Simple navigation between pages
- **State management**: Predictable state changes for user operations
- **Visual feedback**: Clear success/error states and user count display
- **Responsive design**: Works across different screen sizes

## Key Components for Testing

### Landing Page (`/`)
- Navigation link to dashboard
- Responsive design with gradient background

### Dashboard (`/dashboard`)
- **Add User Form**: 
  - Name input (`data-testid="user-name-input"`)
  - Email input (`data-testid="user-email-input"`)
  - Role selector (`data-testid="user-role-select"`)
  - Add button (`data-testid="add-user-button"`)
- **User Table**:
  - Dynamic user rows (`data-testid="user-row-{id}"`)
  - Delete buttons (`data-testid="delete-user-{id}"`)
  - Clear all button (`data-testid="clear-all-button"`)
- **Empty State**: Message when no users exist (`data-testid="no-users-message"`)

## Perfect for Testing Scenarios

This app provides excellent opportunities to test:

1. **Form interactions**: Adding users with validation
2. **List management**: Adding/removing items from a list
3. **State persistence**: Verifying state changes across interactions
4. **Navigation**: Moving between pages
5. **Conditional rendering**: Empty states vs populated states
6. **User feedback**: Dynamic counters and status updates

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License - feel free to use this for testing and demonstration purposes.
