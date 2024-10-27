# Nexorand Leaderboard

A React-based leaderboard application built with Vite, featuring a modern UI using shadcn/ui components and TailwindCSS.

## Features

- Modern React (v18) setup with Vite
- Fully responsive design
- UI components from shadcn/ui library
- Type-safe development environment
- Built-in routing with react-router-dom
- Form handling with @hookform/resolvers
- Modern styling with TailwindCSS

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd nexorand-leaderboard
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Locally preview production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
nexorand-leaderboard/
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **UI Components:** shadcn/ui
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Form Handling:** @hookform/resolvers
- **Code Quality:** ESLint

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

### TailwindCSS

TailwindCSS is configured with custom animations through `tailwindcss-animate`. Modify `tailwind.config.js` to add custom styles.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.