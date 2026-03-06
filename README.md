# ATLAS AI - Health Plan Management System

## Overview

ATLAS AI is a comprehensive health plan management system built for Health Plan Management Group. The system handles both fully insured and self-funded health plans through three distinct user portals: Internal Staff, Members, and Vendors.

## System Architecture

### Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **UI Libraries**: TailwindCSS with custom components
- **Styling**: TailwindCSS v3.4
- **Routing**: React Router v7
- **Data Visualization**: ApexCharts, React ApexCharts
- **Forms**: Custom form components with validation
- **State Management**: React hooks (local state)
- **Date Handling**: Flatpickr

### Module Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── charts/          # Chart components
│   ├── common/          # Common/shared components
│   ├── form/            # Form components (inputs, labels, etc.)
│   ├── modals/          # Modal dialogs
│   ├── tables/          # Table components
│   └── ui/              # Base UI components (buttons, badges, etc.)
├── pages/               # Page components (routed)
│   ├── Members/         # Member management pages
│   ├── Dashboard/       # Dashboard pages
│   └── ...
├── models/              # TypeScript interfaces and types
│   ├── Member.ts        # Member entity model
│   ├── Group.ts         # Group/Account entity model
│   ├── HIPAAAudit.ts    # HIPAA audit log models
│   ├── Dependent.ts     # Dependent entity model
│   └── index.ts         # Central export for models
├── services/            # Business logic and API services
│   ├── memberService.ts      # Member CRUD operations
│   ├── hipaaAuditService.ts  # HIPAA audit logging
│   ├── dependentService.ts   # Dependent management
│   ├── fakeBackend.ts        # Mock backend implementation
│   └── index.ts              # Central export for services
├── data/                # Mock data and constants
│   ├── mockGroups.ts    # Mock group/account data
│   ├── mockDependents.ts # Mock dependent data
│   └── index.ts         # Central export for data
├── hooks/               # Custom React hooks
│   ├── useGoBack.ts     # Navigation hook
│   ├── useModal.ts      # Modal management hook
│   └── index.ts         # Central export for hooks
├── layout/              # Layout components
├── context/             # React Context providers
└── App.tsx              # Main application component
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will run with:
- ✅ Fake backend (no API server needed)
- ✅ Mock data with sample members
- ✅ localStorage for data persistence
- ✅ Simulated network delays (200-400ms)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Configuration

The application supports environment-based backend switching:

### Development Mode (Default)

**`.env.development`**:
```env
VITE_USE_FAKE_BACKEND=true
VITE_API_BASE_URL=http://localhost:3000
```

### Production Mode

**`.env.production`**:
```env
VITE_USE_FAKE_BACKEND=false
VITE_API_BASE_URL=https://api.yourdomain.com
```

See `BACKEND_INTEGRATION.md` for detailed backend integration guide.

## Compliance & Security

- **HIPAA Compliance**: All components handling PHI (Protected Health Information) follow HIPAA guidelines
- **HIPAA Verification**: Required before viewing member records
- **Data Handling**: SSN is masked; only last 4 digits displayed
- **Audit Trails**: All HIPAA verification attempts are logged
- **Access Control**: Verification required with exactly 3 identifiers

## Key Features

### 1. Member Management

- **Multi-Step Member Form**: 4-step enrollment process
  - Identity Information
  - Policy Information
  - Coverage Information
  - Review & Save
- **Member List**: View and search all members
- **Member Details**: Comprehensive member profile view
- **HIPAA Verification Gate**: Required before viewing member data

### 2. HIPAA Verification

- **Verification Types**:
  - Member Verification
  - Provider Verification
  - Authorized Person
  - Failed/Not Authorized
  - Research (no verification required)
- **Identifier Requirements**: Exactly 3 identifiers required
- **Audit Logging**: All verification attempts tracked
- **Session-Based**: Verification required per session

### 3. Household Management

- **Subscriber View**: Display subscriber information
- **Dependents Table**: List all dependents for subscribers
- **Relationship Tracking**: Track family relationships

### 4. Service Wrapper Pattern

- **Environment-Based Switching**: Toggle between fake and real backends
- **Zero Code Changes**: Switch via environment variable only
- **Type-Safe Interfaces**: Both implementations follow same interface
- **Network Simulation**: Realistic delays in fake backend

## Architecture Highlights

### Service Layer

All services follow a consistent interface pattern:

```typescript
interface IService {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, data: Omit<T, "id">): Promise<void>;
  delete(id: string): Promise<void>;
}
```

**Available Services**:
- `memberService` - Member CRUD operations
- `hipaaAuditService` - HIPAA audit logging
- `dependentService` - Dependent management

### Import Patterns

Centralized exports for cleaner imports:

```typescript
// Models
import { Member, Group, HIPAAAuditLog, Dependent } from "../../models";

// Services
import { memberService, hipaaAuditService, dependentService } from "../../services";

// Data
import { mockGroups, mockDependents } from "../../data";

// Hooks
import { useGoBack, useModal } from "../../hooks";
```

## Development Guidelines

### Code Standards

1. **TypeScript First**: All new code must be TypeScript
2. **Functional Components**: Use functional components with hooks
3. **Centralized Imports**: Use index files for imports
4. **Type Safety**: All models properly typed
5. **Error Handling**: Proper error handling in all services

### File Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Services: `camelCase.ts`
- Models: `PascalCase.ts`
- Constants: `camelCase.ts`

### Component Structure

```typescript
// Component header with description
export default function ComponentName() {
  // State
  // Effects
  // Handlers
  // Render
}
```

## Documentation

- **`README.md`** - This file (project overview)
- **`ARCHITECTURE.md`** - Code architecture and patterns
- **`BACKEND_INTEGRATION.md`** - Backend integration guide
- **`REFACTORING_SUMMARY.md`** - Refactoring history
- **`MODULE_ARCHITECTURE.md`** - Module organization
- **`HIPAA_IMPLEMENTATION.md`** - HIPAA compliance details
- **`QUICK_START.md`** - Quick start guide

## API Endpoints (Production)

### Member Service
```
GET    /api/members           - Get all members
GET    /api/members/:id       - Get member by ID
POST   /api/members           - Create new member
PUT    /api/members/:id       - Update member
DELETE /api/members/:id       - Delete member
```

### HIPAA Audit Service
```
GET    /api/hipaa-audit                    - Get all audit logs
POST   /api/hipaa-audit                    - Create audit log
GET    /api/hipaa-audit/member/:id         - Get logs by member ID
GET    /api/hipaa-audit/date-range         - Get logs by date range
DELETE /api/hipaa-audit                    - Clear all logs
```

### Dependent Service
```
GET    /api/dependents/subscriber/:id  - Get dependents by subscriber ID
GET    /api/dependents/:id             - Get dependent by ID
POST   /api/dependents                 - Create new dependent
PUT    /api/dependents/:id             - Update dependent
DELETE /api/dependents/:id             - Delete dependent
```

## Data Persistence

### Development Mode (Fake Backend)
- Data stored in browser localStorage
- Persists across page refreshes
- Clear localStorage to reset data

### Production Mode (Real Backend)
- Data stored in backend database
- Requires API server running
- See `BACKEND_INTEGRATION.md` for setup

## Known Limitations

- Currently defaults to fake backend for development
- Authentication not fully implemented
- No real-time updates
- Export functionality is front-end only

## Future Roadmap

- [ ] Complete backend API integration
- [ ] Authentication & Authorization (OAuth 2.0)
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Document management system
- [ ] Automated compliance reports
- [ ] Mobile responsive improvements

## Troubleshooting

### Issue: Changes not appearing
**Solution:** Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Data disappeared
**Solution:** Check if localStorage was cleared. The fake backend will reseed data on next page load.

### Issue: Environment changes not working
**Solution:** Restart the dev server (Ctrl+C, then `npm run dev`)

### Issue: TypeScript errors
**Solution:** Run `npm run lint` to check for errors

## Support & Contact

For issues or questions, contact the development team.

## License

- Design and Code is Copyright © [TailAdmin](https://tailadmin.com)
- Licensed under [MIT]
- Distributed by [ThemeWagon](https://themewagon.com)
- Modified for ATLAS AI - Health Plan Management Group

---

**Last Updated**: March 6, 2026  
**Version**: 1.0.0  
**Maintained By**: ATLAS AI Development Team
