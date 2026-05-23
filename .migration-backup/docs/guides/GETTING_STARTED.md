# Getting Started Guide

Welcome to Style Haven! This guide will help you get the application up and running on your local machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Making Your First Changes](#making-your-first-changes)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

| Software    | Minimum Version | Download Link                       |
| ----------- | --------------- | ----------------------------------- |
| **Node.js** | 18.0.0          | [nodejs.org](https://nodejs.org/)   |
| **npm**     | 9.0.0           | Comes with Node.js                  |
| **Git**     | 2.0.0           | [git-scm.com](https://git-scm.com/) |

### Verify Installation

Open your terminal and run:

```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 9.0.0 or higher
git --version   # Should show 2.0.0 or higher
```

### Stripe Account

You'll need a Stripe account for payment processing:

1. Sign up at [stripe.com](https://stripe.com)
2. No credit card required for test mode
3. Free tier is sufficient for development

---

## Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd clothing-shop
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

This will install all dependencies listed in `package.json`. It may take 2-3 minutes.

### Step 3: Verify Installation

```bash
# Check if installation was successful
npm list --depth=0
```

You should see a list of installed packages without errors.

---

## Configuration

### Step 1: Create Environment File

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Or create it manually with this content:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Step 2: Get Stripe API Keys

1. **Log in to Stripe Dashboard**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Log in with your account

2. **Enable Test Mode**
   - Toggle "Test mode" in the top right corner
   - This ensures you're using test keys

3. **Get Your Keys**
   - Navigate to: Developers → API keys
   - Copy the **Publishable key** (starts with `pk_test_`)
   - Copy the **Secret key** (starts with `sk_test_`)

4. **Update .env File**
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51abc...
   STRIPE_SECRET_KEY=sk_test_51xyz...
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Step 3: Verify Configuration

```bash
# Check if .env file exists
cat .env

# Ensure it's not tracked by Git
git status  # .env should NOT appear in the list
```

---

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

You should see:

```
▲ Next.js 15.4.2
- Local:        http://localhost:3000
- Ready in 2.3s
```

### Open in Browser

1. Open your browser
2. Navigate to [http://localhost:3000](http://localhost:3000)
3. You should see the Style Haven homepage! 🎉

### What You Should See

- Header with "STYLE HAVEN" logo
- Search bar
- Shopping cart icon
- Category filters (All, T-Shirts, Jeans, Hoodies, Jackets)
- Product grid with 4 products

---

## Project Structure

Here's what each folder contains:

```
clothing-shop/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (main product listing)
│   ├── checkout/          # Checkout page
│   ├── success/           # Order success page
│   └── api/               # API routes (Stripe integration)
│
├── components/            # React components
│   ├── product-card.tsx  # Individual product display
│   └── ui/               # Reusable UI components
│
├── lib/                   # Utility functions and data
│   ├── data.ts           # Product catalog
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
│
├── docs/                  # Documentation
├── .env                   # Environment variables (not in Git)
└── package.json          # Dependencies and scripts
```

---

## Making Your First Changes

### 1. Add a New Product

Edit `lib/data.ts`:

```typescript
export const products: Product[] = [
  // ... existing products
  {
    id: 5,
    name: "Your New Product",
    price: 49.99,
    image: "https://images.unsplash.com/photo-...",
    category: "T-Shirts",
    isNew: true,
    description: "Your product description",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Blue", hex: "#0000FF" }],
    stock: 20,
  },
];
```

Save the file and the page will automatically reload!

### 2. Change the Store Name

Edit `app/page.tsx`:

```typescript
<h1 className="text-2xl font-bold text-gray-900">YOUR STORE NAME</h1>
```

### 3. Customize Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

---

## Common Tasks

### Testing the Checkout Flow

1. **Add Items to Cart**
   - Click on a product
   - Select size and color
   - Click "Add to Cart"

2. **View Cart**
   - Click the shopping cart icon
   - Verify items are listed

3. **Proceed to Checkout**
   - Click "Proceed to Checkout"
   - Fill in the form with test data

4. **Complete Payment**
   - Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

5. **Verify Success**
   - You should be redirected to the success page
   - Cart should be empty

### Viewing Stripe Payments

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Ensure "Test mode" is enabled
3. Click "Payments" in the sidebar
4. You should see your test payment

### Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

### Linting Code

```bash
# Check for code issues
npm run lint

# Auto-fix issues (if possible)
npm run lint -- --fix
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or use a different port:

```bash
PORT=3001 npm run dev
```

### Stripe Checkout Not Working

**Problem**: Clicking "Proceed to Payment" does nothing

**Solutions**:

1. Check browser console for errors (F12)
2. Verify Stripe keys in `.env` file
3. Ensure keys start with `pk_test_` and `sk_test_`
4. Restart the development server

### Images Not Loading

**Problem**: Product images show broken image icon

**Solutions**:

1. Check internet connection
2. Verify image URLs in `lib/data.ts`
3. Check `next.config.js` has correct image configuration

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit

# If errors persist, check tsconfig.json
```

---

## Next Steps

Now that you have the app running, here's what to explore next:

### 1. Learn the Codebase

- [ ] Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- [ ] Review [API.md](API.md) for API documentation
- [ ] Check [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines

### 2. Customize the Store

- [ ] Add your own products
- [ ] Change colors and styling
- [ ] Update store name and branding
- [ ] Add your own product images

### 3. Add Features

- [ ] Product reviews
- [ ] User accounts
- [ ] Order history
- [ ] Email notifications
- [ ] Advanced filtering

### 4. Deploy to Production

- [ ] Read [DEPLOYMENT.md](DEPLOYMENT.md)
- [ ] Get Stripe live API keys
- [ ] Deploy to Vercel or your preferred platform
- [ ] Set up custom domain

### 5. Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

## Getting Help

If you run into issues:

1. **Check Documentation**
   - Review the docs in the `docs/` folder
   - Check the README.md

2. **Search Issues**
   - Look through existing GitHub issues
   - Someone may have had the same problem

3. **Ask for Help**
   - Open a new GitHub issue
   - Include error messages and steps to reproduce
   - Provide your environment details

4. **Community Resources**
   - [Next.js Discord](https://discord.gg/nextjs)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

## Congratulations! 🎉

You've successfully set up Style Haven on your local machine. Happy coding!

For more detailed information, check out the other documentation files:

- [README.md](../README.md) - Project overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [API.md](API.md) - API documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
