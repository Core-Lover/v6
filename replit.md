# AIQX Foundation - Decentralized AI Infrastructure

## Overview
AIQX Refund Program is a React + TypeScript + Vite web application providing blockchain tooling for both Solana and EVM chains. The application features token creation, minting, burning, multi-send, and various blockchain operations through an intuitive UI.

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives + Tailwind CSS
- **Blockchain**: 
  - Solana Web3.js + Metaplex Foundation libraries
  - Ethers.js for EVM chains
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Query (TanStack Query)

### Directory Structure
```
/src
  /components      - UI components (buttons, forms, dialogs, etc.)
  /contexts        - React contexts (UpgradeContext)
  /features        - Feature modules (lab for blockchain tools)
  /hooks           - Custom React hooks
  /lib             - Utilities and shared libraries
  /pages           - Page components
  /assets          - Static assets
/shared            - Shared schemas and types
/public            - Public assets
```

### Key Features
- **Lab Interface**: Multi-chain blockchain operations
  - Solana: Token creation, minting, freezing, authority management, multi-send
  - EVM: Token creation, minting, burning, pausing, approvals, multi-send
- **Wallet Integration**: Support for Solana and EVM wallets
- **Form Validation**: Zod schemas for all blockchain operations
- **Responsive UI**: Tailwind CSS with dark theme support

## Development

### Server Configuration
- **Host**: 0.0.0.0
- **Port**: 5000
- **Dev Server**: Vite with HMR configured for Replit proxy
- **Cache Control**: Disabled for development

### Running the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Recent Changes
- 2024-11-20: Added chain-specific landing pages with navigation improvements
  - Created dedicated landing pages for Solana, Ethereum, and BSC
  - Downloaded and integrated official blockchain logos
  - Sidebar navigation with tool list for easy access
  - "Show Tools" button on mobile to toggle sidebar
  - Added feature grids and "How to Use" guides for each chain
  - Landing pages show by default, tools appear on selection
  - Wallet connection always visible and accessible on all pages
  - Improved UX flow - forms accessible without immediate wallet connection

- 2024-11-20: Initial import and Replit environment setup
  - Configured Vite for Replit proxy support
  - Installed all dependencies
  - Set up dev workflow on port 5000

## Configuration Notes
- Vite config includes Node.js polyfills for blockchain libraries
- HMR configured to work with Replit's domain proxy
- Build optimization with code splitting for vendor, blockchain, and UI libraries
- allowedHosts set to true for Replit iframe proxy support
