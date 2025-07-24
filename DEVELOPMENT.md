# 🏥 BrightWell Website - Step-by-Step Development Setup

## 🚀 1. Quick Start

### 1.1 Automated Setup (Recommended)

1. **Open your terminal** in the project root directory (`BrightWell-Website`).
2. **For macOS/Linux:** Make the setup script executable and run it:

   ```bash
   chmod +x scripts/setup.sh && ./scripts/setup.sh
   ```

   This installs dependencies, copies environment files, and validates your setup.

   **For Windows users:**
   Open PowerShell in the project folder and run:

   ```powershell
   ./scripts/setup.ps1
   ```

   This script will install Node.js dependencies, copy `.env.example` to `.env.local`, and run validation checks.

   _If you get a security warning, right-click the file and select "Run with PowerShell" or run:_

   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

### 1.2 Manual Setup

1. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

2. **Copy the example environment file to create your local config:**

   ```bash
   cp .env.example .env.local
   ```

   _(On Windows, use `copy .env.example .env.local`)_

3. **Validate your environment configuration:**

   ```bash
   npm run validate
   ```

   This checks for required environment variables and project prerequisites.

4. **Start the development server (Next.js):**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📋 2. Feature Overview

- **VS Code Environment:** Includes recommended settings, launch/debug configs, tasks, extensions, keybindings, and custom code snippets for productivity.
- **GitHub Copilot:** Configured for medical billing context, privacy, and tailored code suggestions.
- **Repository Structure:** Includes `.gitignore`, `.gitattributes`, GitHub Actions workflows, issue and PR templates for streamlined collaboration.
- **Workflow Integration:** Supports Docker, Docker Compose, environment variables, npm scripts for build/test/lint, and code quality tools.
- **Collaboration:** Dev containers for isolated environments, Live Share for pair programming, security scanning, performance monitoring, and comprehensive documentation.

---

## 🛠️ 3. Development Scripts

### 3.1 Core Development

- `npm run dev` – Start the local development server (hot reload enabled)
- `npm run build` – Build the app for production
- `npm run start` – Start the production server (after build)
- `npm run validate` – Check environment and project setup

### 3.2 Code Quality

- `npm run lint` – Run ESLint to check code style and errors
- `npm run lint:fix` – Auto-fix lint issues
- `npm run format` – Format code using Prettier
- `npm run type-check` – Run TypeScript type checks

### 3.3 Testing

- `npm test` – Run all unit tests once
- `npm run test:watch` – Watch files and re-run tests on changes
- `npm run test:coverage` – Generate test coverage report
- `npm run test:e2e` – Run end-to-end tests

### 3.4 Docker Operations

- `npm run docker:dev` – Start development environment in Docker
- `npm run docker:prod` – Build and run production container
- `npm run docker:full` – Full Docker workflow (build, test, run)

### 3.5 Analysis & Optimization

- `npm run analyze` – Analyze bundle size and performance
- `npm run security:audit` – Run security audit on dependencies
- `npm run lighthouse` – Run Lighthouse performance and accessibility checks

---

## 🎯 4. VS Code Usage

- **Run Tasks:** Press `Ctrl+Shift+P`, type `Tasks: Run Task`, and select a task (e.g., "Start Development Server").
- **Debug:** Press `F5` or click the green "Run and Debug" button in the sidebar to launch the debugger.
- **Snippets:** Type a snippet prefix (e.g., `bwfc`) in any file and press `Tab` to expand.

---

## 📚 5. Documentation

- [`README.md`](README.md) – Project overview, goals, and main instructions
- [`.env.example`](.env.example) – List of required environment variables and descriptions
- [`.vscode/`](.vscode/) – Editor settings, launch configs, and recommended extensions
- [`docs/docker.md`](docs/docker.md) – Docker and container setup instructions
- [`docs/testing.md`](docs/testing.md) – Unit and E2E testing strategies and tools
- [`docs/security.md`](docs/security.md) – Security practices, HIPAA compliance, and audit steps

---

## 🎉 6. Quick Tips

- **Copy & Paste:** Use the copy buttons above each code block to quickly copy commands.
- **VS Code Tasks:** `Ctrl+Shift+P` → `Tasks: Run Task` for common workflows.
- **Debug:** Press `F5` in VS Code to start debugging with breakpoints.

---

**🏥 Build the future of medical billing, step by step! 🚀**

---

<details>
<summary>Copy All Core Analysis Commands</summary>

```bash
npm run analyze
npm run security:audit
npm run lighthouse
```

</details>

## 🎯 VS Code Features

- **Tasks:** Open Command Palette (`Ctrl+Shift+P`) → `Tasks: Run Task` → Select a task (e.g., "Start Development Server", "Build Production").
- **Debug:** Click the green "Run and Debug" button in the sidebar or press `F5`.
- **Snippets:** Type a snippet prefix (e.g., `bwfc`) and press `Tab` to insert boilerplate code.

## 📚 Documentation

- [README.md](README.md) – Project overview and quick start
- [.env.example](.env.example) – Environment configuration guide
- [VS Code Setup](.vscode/) – Editor configuration files
- [Docker Guide](docs/docker.md) – Container development setup
- [Testing Guide](docs/testing.md) – Unit and E2E testing strategies
- [Security Guide](docs/security.md) – HIPAA compliance and security practices

## 🎉 Quick Tips

- **Run any command:** Click the copy button above, then paste into your terminal (`Ctrl+V` or open Terminal in VS Code).
- **Run VS Code tasks:** `Ctrl+Shift+P` → `Tasks: Run Task`
- **Debug:** Press `F5` in VS Code.

---

**🏥 Ready to revolutionize medical billing with cutting-edge technology!** 🚀

- [VS Code Setup](.vscode/) – Editor configuration files
- [Docker Guide](docs/docker.md) – Container development setup
- [Testing Guide](docs/testing.md) – Unit and E2E testing strategies
- [Security Guide](docs/security.md) – HIPAA compliance and security practices

## 🎉 Quick Tips

- **Run any command:**
  Click the copy button above, then paste into your terminal (`Ctrl+` or open Terminal in VS Code).
- **Run VS Code tasks:**
  `Ctrl+Shift+P` → `Tasks: Run Task`
- **Debug:**
  Press `F5` in VS Code.

---

**🏥 Ready to revolutionize medical billing with cutting-edge technology!** 🚀
