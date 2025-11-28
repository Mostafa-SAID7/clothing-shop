#!/bin/bash

# Complete development environment setup
# Usage: ./.devops/scripts/setup/dev-setup.sh

set -e

echo "🚀 Setting up Style Haven Clothing Shop Development Environment..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ git is required but not installed."; exit 1; }

echo "✅ Prerequisites check passed"

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js 18+ recommended. Current: $(node -v)"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment file
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env from .env.example"
        echo "⚠️  Please update .env with your credentials"
    else
        echo "⚠️  No .env.example found"
    fi
fi

# Setup Git hooks
echo "🔧 Setting up Git hooks..."
if [ -d .git ]; then
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
EOF
    chmod +x .git/hooks/pre-commit
    echo "✅ Git pre-commit hook installed"
fi

# Run initial build
echo "🏗️  Running initial build..."
npm run build

# Setup complete
echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Update .env with your Stripe API keys"
echo "   2. Run 'npm run dev' to start development server"
echo "   3. Visit http://localhost:3000"
echo ""
echo "📚 Useful commands:"
echo "   npm run dev       - Start development server"
echo "   npm run build     - Build for production"
echo "   npm run lint      - Run ESLint"
echo "   npm run start     - Start production server"
echo ""
