# Development Setup Guide

Complete step-by-step guide for setting up your local development environment.

---

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Development Tools](#development-tools)
- [Database Setup](#database-setup)
- [Troubleshooting](#troubleshooting)
- [IDE Configuration](#ide-configuration)

---

## System Requirements

### Minimum Requirements

- **Operating System**: Windows 10+, macOS 11+, or Linux (Ubuntu 20.04+)
- **Node.js**: 20.x or higher (LTS recommended)
- **npm**: 11.x or higher
- **Git**: 2.x or higher
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for dependencies and build artifacts

### Recommended Tools

- **VS Code**: Latest version with Extensions
- **Git GUI**: GitHub Desktop or Sourcetree
- **API Client**: Postman or Insomnia
- **Database GUI**: DBeaver or pgAdmin (if using PostgreSQL)

---

## Installation Steps

### 1. Install Node.js & npm

#### Windows

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version (20.x or higher)
3. Run the installer and follow prompts
4. Accept license agreement
5. Install npm along with Node.js
6. Verify installation:

```bash
node --version    # v20.x.x
npm --version     # 11.x.x
```

#### macOS

```bash
# Using Homebrew (recommended)
brew install node@20

# Or download from nodejs.org
# Then verify:
node --version
npm --version
```

#### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### 2. Install Git

#### Windows

1. Download from [git-scm.com](https://git-scm.com/)
2. Run installer with default settings
3. Verify: `git --version`

#### macOS

```bash
# Using Homebrew
brew install git

# Or via Xcode Command Line Tools
xcode-select --install
```

#### Linux

```bash
sudo apt install git
```

### 3. Configure Git

Set your identity for commits:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# View configuration
git config --global --list
```

### 4. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Brankovanov/newportmaeve-arhive.git

# Navigate to project directory
cd newportmaeve-achives

# (Optional) Add upstream remote for sync
git remote add upstream https://github.com/Brankovanov/newportmaeve-arhive.git
```

### 5. Install Project Dependencies

```bash
# Install all dependencies from package.json
npm install

# Verify installation (should complete without errors)
npm list
```

**Note:** On Windows, you might need to run PowerShell as Administrator if permission errors occur.

### 6. Verify Installation

```bash
# Check Node.js version
node -v

# Check npm version
npm -v

# Check Angular CLI
npx ng version

# Build a test
npm run build
```

---

## Environment Configuration

### 1. Create Environment File

```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
# Windows (PowerShell)
notepad .env.local

# macOS/Linux
nano .env.local
```

### 2. Configure Essential Variables

Minimum required variables for development:

```bash
NODE_ENV=development
SERVER_PORT=4200
SERVER_HOST=localhost
DEBUG=true
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000
```

### 3. Development Secrets (Optional)

For local development without backend:

```bash
# Use mock API
MOCK_API=true

# Disable authentication
SKIP_AUTH=false
```

**⚠️ SECURITY:** Never commit `.env.local` or actual secrets to git. Keep `.env.example` updated instead.

---

## Running the Application

### Development Server

```bash
# Start development server with HMR (Hot Module Replacement)
npm start

# Server runs at: http://localhost:4200

# Output will show:
# ✔ Successfully compiled after XXXms
# ▸ localhost:4200
```

**Access Points:**
- Main app: http://localhost:4200
- API backend: http://localhost:3000 (if running separately)

### Building for Production

```bash
# Build production-optimized bundle
npm run build

# Output location: dist/newportmaeve-achives/

# Output includes:
# - Minified JavaScript
# - Optimized styles
# - Lazy-loaded chunks
# - Source maps (optional)
```

### Build with Different Configurations

```bash
# Development build
ng build --configuration development

# Production build
ng build --configuration production

# With source maps
ng build --source-map

# With progress reporting
ng build --progress
```

### Serve Production Build

```bash
# Serve locally with SSR
npm run serve:ssr:newportmaeve-achives

# Access at: http://localhost:4200
```

---

## Development Tools

### Code Formatting

```bash
# Format all files with Prettier
npm run format

# Or manually:
npx prettier --write src/

# Check formatting (without changing)
npx prettier --check src/
```

### Linting

```bash
# Run ESLint (when configured)
npm run lint

# Or manually:
npx eslint src/

# Fix auto-fixable issues
npx eslint src/ --fix
```

### Type Checking

```bash
# Check TypeScript types without building
npx tsc --noEmit

# Show errors only
npx tsc --noEmit --pretty false
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- archive.service

# Run with coverage report
npm test -- --coverage

# Run in watch mode (re-run on file changes)
npm test -- --watch

# Run in UI mode (Vitest UI)
npm test -- --ui
```

### Test Coverage Report

```bash
# Generate coverage report
npm test -- --coverage

# Open HTML report (in browser)
open coverage/index.html        # macOS
xdg-open coverage/index.html    # Linux
start coverage/index.html       # Windows
```

---

## Database Setup

### PostgreSQL Setup

#### Windows

1. Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer and follow prompts
3. Remember superuser password
4. Default port: 5432

#### macOS

```bash
# Using Homebrew
brew install postgresql@15

# Start service
brew services start postgresql@15

# Create superuser
createuser -s postgres
```

#### Linux

```bash
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql

# Create superuser
sudo -u postgres createuser -s postgres
```

### Create Development Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE newportmaeve_archives;

# Create development user
CREATE USER dev_user WITH PASSWORD 'dev_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE newportmaeve_archives TO dev_user;

# Exit
\q
```

### Update Environment Variables

```bash
# In .env.local
DB_HOST=localhost
DB_PORT=5432
DB_NAME=newportmaeve_archives
DB_USER=dev_user
DB_PASSWORD=dev_password
```

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: `npm install` fails with permission error

**Windows:**
```bash
# Run PowerShell as Administrator
# Then try again
npm install
```

**macOS/Linux:**
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install

# If still failing, use sudo (not recommended)
sudo npm install
```

#### Issue: Port 4200 already in use

```bash
# Option 1: Use different port
npm start -- --port 4300

# Option 2: Kill process using port 4200
# Windows (PowerShell as Admin)
Get-Process | Where-Object {$_.Handles -eq "4200"} | Stop-Process -Force

# macOS/Linux
lsof -ti:4200 | xargs kill -9
```

#### Issue: Node modules corrupted

```bash
# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: TypeScript compilation errors

```bash
# Clear Angular cache
rm -rf .angular

# Rebuild
npm run build

# Check TypeScript version
npx tsc --version
```

#### Issue: Tests failing with module errors

```bash
# Update dependencies
npm update

# Clear test cache
npm test -- --clearCache

# Run tests again
npm test
```

#### Issue: GitHub authentication fails

```bash
# Generate SSH key (if not exists)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Add public key to GitHub:
# 1. Go to GitHub Settings > SSH and GPG keys
# 2. Click New SSH key
# 3. Paste content of ~/.ssh/id_ed25519.pub

# Test connection
ssh -T git@github.com
```

### Getting Help

1. **Check Logs**: Look at console error messages carefully
2. **Search Issues**: Check [GitHub Issues](https://github.com/Brankovanov/newportmaeve-arhive/issues)
3. **Documentation**: Review [README.md](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Stack Overflow**: Search relevant technologies
5. **Ask Questions**: Create an issue with `[question]` label

---

## IDE Configuration

### VS Code Setup

#### Recommended Extensions

Install these extensions from VS Code marketplace:

1. **Angular Extension Pack** (johnpapa.angular-essentials)
2. **Prettier - Code formatter** (esbenp.prettier-vscode)
3. **ESLint** (dbaeumer.vscode-eslint)
4. **TypeScript Vue Plugin** (Vue.volar)
5. **GitLens** (eamodio.gitlens)
6. **REST Client** (humao.rest-client)
7. **Thunder Client** (rangav.vscode-thunder-client)

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    ".angular": true
  },
  "files.exclude": {
    "**/.angular": true
  }
}
```

#### VS Code Keybindings (Optional)

Create `.vscode/keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+b",
    "command": "workbench.action.tasks.runTask",
    "args": "npm: build"
  },
  {
    "key": "ctrl+shift+t",
    "command": "workbench.action.tasks.runTask",
    "args": "npm: test"
  }
]
```

#### VS Code Launch Configuration

Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}",
      "sourceMaps": true
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/.bin/vitest",
      "args": ["--inspect-brk"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Other IDEs

**WebStorm / IntelliJ:**
- Built-in Angular support
- No additional setup needed
- Configure code style in Settings > Code Style

**Sublime Text:**
- Install TypeScript plugin
- Install Prettier plugin
- Enable format on save

---

## Development Workflow Checklist

Before starting development, ensure:

- [ ] Node.js and npm installed and verified
- [ ] Repository cloned locally
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created and configured
- [ ] Development server runs (`npm start`)
- [ ] Tests pass (`npm test`)
- [ ] IDE configured with linting/formatting
- [ ] Git configured with your name/email
- [ ] SSH key added to GitHub (if using SSH)

---

## Next Steps

1. **Start Development Server**: `npm start`
2. **Open Application**: http://localhost:4200
3. **Read Architecture Guide**: [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Review Code Standards**: [.claude/CLAUDE.md](./.claude/CLAUDE.md)
5. **Start Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Quick Reference Commands

```bash
# Development
npm start              # Start dev server (http://localhost:4200)
npm test              # Run unit tests
npm test -- --watch   # Run tests in watch mode
npm run build         # Production build

# Code Quality
npm run format        # Format code with Prettier
npm run lint         # Run linter
npx tsc --noEmit     # Type check

# Git
git status           # Check status
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
git pull             # Pull from remote

# Database (if using)
psql -U postgres     # Connect to PostgreSQL
npm run migrate      # Run migrations (when added)

# Building & Deployment
npm run build        # Build for production
npm run serve:ssr    # Serve with SSR
```

---

**Last Updated:** 2026-06-23  
**Version:** 1.0  
**Maintained By:** Project Team
