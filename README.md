# Aku Education Student Portal

Aku Education is a personalized AI tutoring platform designed specifically for Ethiopian students, offering curriculum-aligned lessons, gamified learning experiences, and adaptive content for grades 1-12.

## Features

- **Personalized AI Tutoring**: AI-powered tutoring tailored to each student's learning pace and style
- **Curriculum-Aligned**: Content aligned with Ethiopian educational curriculum
- **Gamified Learning**: Interactive and engaging learning experience with achievements and progress tracking
- **Adaptive Content**: Content that adapts to student performance and learning needs
- **Multi-Grade Support**: Supports students from grades 1-12

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd aku_student
```

2. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` file to set your API URL:
```env
VITE_AKU_API_URL=https://api.localhost
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project in development mode
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Environment Configuration

The application uses environment variables for configuration. Copy `.env.example` to `.env` and configure:

- `VITE_AKU_API_URL`: API server URL (required)
- `NODE_ENV`: Environment mode (development/production)

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── data/               # Mock data and static content
├── lib/                # Utility libraries
├── utils/              # Helper functions
└── assets/             # Static assets (images, icons, etc.)
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software developed for Aku Education.

## Contact

For questions or support, please contact the Aku Education development team.