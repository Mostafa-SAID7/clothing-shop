#!/bin/bash

# Setup script for development environment
# Usage: ./scripts/setup.sh

set -e

echo "🚀 Setting up Style Haven Clothing Shop..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.x"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version should be 18.x or higher"
fi

echo "✅ Node.js version: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file. Please update it with your credentials."
    else
        echo "❌ .env.example not found"
    fi
else
    echo "✅ .env file exists"
fi

# Run linter
echo "🔍 Running linter..."
npm run lint || echo "⚠️  Linting issues found"

# Build the project
echo "🏗️  Building project..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Update .env with your Stripe keys"
echo "   2. Run 'npm run dev' to start development server"
echo "   3. Visit http://localhost:3000"
echo ""
