#!/bin/bash

# ===============================================
# BrightWell Website Development Environment Setup
# Complete automated setup for development
# ===============================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis for better UX
ROCKET="🚀"
CHECK="✅"
CROSS="❌"
WARNING="⚠️"
INFO="ℹ️"
MEDICAL="🏥"

print_header() {
    echo ""
    echo -e "${CYAN}================================================${NC}"
    echo -e "${PURPLE}${MEDICAL} BrightWell Medical Billing Website${NC}"
    echo -e "${CYAN}    Development Environment Setup${NC}"
    echo -e "${CYAN}================================================${NC}"
    echo ""
}

print_step() {
    echo -e "${BLUE}${ROCKET} $1${NC}"
}

print_success() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_error() {
    echo -e "${RED}${CROSS} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${CYAN}${INFO} $1${NC}"
}

check_prerequisites() {
    print_step "Checking prerequisites..."

    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi

    NODE_VERSION=$(node -v | sed 's/v//')
    REQUIRED_VERSION="18.0.0"

    if ! npx semver -r ">=$REQUIRED_VERSION" "$NODE_VERSION" &> /dev/null; then
        print_error "Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18+."
        exit 1
    fi

    print_success "Node.js $NODE_VERSION detected"

    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi

    print_success "npm $(npm -v) detected"

    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed."
        exit 1
    fi

    print_success "Git $(git --version | cut -d' ' -f3) detected"

    # Check Docker (optional)
    if command -v docker &> /dev/null; then
        print_success "Docker $(docker --version | cut -d' ' -f3 | sed 's/,//') detected"
    else
        print_warning "Docker not found. Container features will not be available."
    fi
}

setup_environment() {
    print_step "Setting up environment files..."

    if [ ! -f ".env.local" ]; then
        cp .env.example .env.local
        print_success "Created .env.local from template"
        print_info "Please update .env.local with your specific configuration"
    else
        print_info ".env.local already exists, skipping..."
    fi
}

install_dependencies() {
    print_step "Installing dependencies..."

    # Clean install
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi

    print_success "Dependencies installed successfully"
}

setup_git_hooks() {
    print_step "Setting up Git hooks..."

    # Install husky if not already done
    npx husky install

    # Setup pre-commit hook
    npx husky add .husky/pre-commit "npm run pre-commit"

    # Setup commit-msg hook
    npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

    print_success "Git hooks configured"
}

run_quality_checks() {
    print_step "Running code quality checks..."

    # TypeScript check
    print_info "Running TypeScript type check..."
    npm run type-check

    # Linting
    print_info "Running ESLint..."
    npm run lint

    # Formatting check
    print_info "Checking Prettier formatting..."
    npm run format:check

    print_success "All quality checks passed"
}

run_tests() {
    print_step "Running tests..."

    # Unit tests
    print_info "Running unit tests..."
    npm test -- --passWithNoTests

    print_success "Tests completed"
}

build_application() {
    print_step "Building application..."

    npm run build

    print_success "Build completed successfully"
}

setup_vscode() {
    print_step "Configuring VS Code workspace..."

    # Print VS Code extension install commands for manual use
    print_info "To install recommended VS Code extensions, run the following commands in your terminal:"
    echo ""
    echo "code --install-extension ms-vscode.vscode-typescript-next --force"
    echo "code --install-extension bradlc.vscode-tailwindcss --force"
    echo "code --install-extension esbenp.prettier-vscode --force"
    echo "code --install-extension dbaeumer.vscode-eslint --force"
    echo "code --install-extension github.copilot --force"
    echo "code --install-extension github.copilot-chat --force"
    echo "code --install-extension ms-vsliveshare.vsliveshare --force"
    echo ""
    print_info "Or install them via the VS Code Extensions sidebar."
}

create_test_data() {
    print_step "Creating test data and examples..."

    # Create mock data directory if it doesn't exist
    mkdir -p lib/mock-data

    print_success "Test data structure created"
}

final_checks() {
    print_step "Performing final system checks..."

    # Check if development server can start
    print_info "Testing development server startup..."

    # Start server in background
    npm run dev &
    SERVER_PID=$!

    sleep 10

    # Check if server is responding
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Development server is working correctly"
    else
        print_warning "Development server may have issues"
    fi

    # Kill the server
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
}

print_completion_message() {
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}${CHECK} Setup completed successfully!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo -e "${CYAN}${MEDICAL} BrightWell Website is ready for development!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo -e "  1. ${BLUE}npm run dev${NC}        - Start development server"
    echo -e "  2. ${BLUE}npm run test${NC}       - Run tests"
    echo -e "  3. ${BLUE}npm run build${NC}      - Build for production"
    echo -e "  4. ${BLUE}npm run docker:dev${NC} - Start with Docker"
    echo ""
    echo -e "${YELLOW}VS Code features:${NC}"
    echo -e "  • Press ${BLUE}F5${NC} to start debugging"
    echo -e "  • Use ${BLUE}Ctrl+Shift+P${NC} for command palette"
    echo -e "  • Type ${BLUE}bw${NC} for BrightWell snippets"
    echo ""
    echo -e "${YELLOW}Documentation:${NC}"
    echo -e "  • README.md - Project overview"
    echo -e "  • .env.example - Environment variables"
    echo -e "  • .vscode/ - VS Code configuration"
    echo ""
    echo -e "${GREEN}Happy coding! 🎉${NC}"
    echo ""
}

main() {
    print_header

    check_prerequisites
    setup_environment
    install_dependencies
    setup_git_hooks
    run_quality_checks
    run_tests
    build_application
    setup_vscode
    create_test_data
    final_checks

    print_completion_message
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "BrightWell Website Development Setup"
        echo ""
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --quick, -q    Quick setup (skip tests and build)"
        echo "  --docker, -d   Setup with Docker"
        echo ""
        exit 0
        ;;
    --quick|-q)
        print_header
        check_prerequisites
        setup_environment
        install_dependencies
        print_completion_message
        ;;
    --docker|-d)
        print_header
        check_prerequisites
        setup_environment
        print_step "Setting up Docker environment..."
        docker-compose up --build -d app
        print_success "Docker environment started"
        print_completion_message
        ;;
    *)
        main
        ;;
esac
        setup_environment
        print_step "Setting up Docker environment..."
        docker-compose up --build -d app
        print_success "Docker environment started"
        print_completion_message
        ;;
    *)
        main
        ;;
esac
