# 🚀 Quick Start Guide

**Author:** Mostafa-SAID7  
**Version:** 1.0.0

---

## ⚡ Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
cd clothing-shop
npm install
```

This will install all required packages (may take 2-3 minutes).

---

### Step 2: Verify Environment Variables

The `.env` file is already configured with Stripe test keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

✅ **You're ready to go!**

---

### Step 3: Start the Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

---

## 🎯 What to Do Next

### 1. Browse Products
- Open http://localhost:3000
- Explore the product catalog
- Try filtering by category (T-Shirts, Hoodies, Jeans, etc.)

### 2. Test Shopping Cart
- Click "Add to Cart" on any product
- Select size and color
- Click the cart icon to view your items
- Adjust quantities or remove items

### 3. Try Checkout
- Click "Checkout" in the cart
- Fill in the shipping form
- Click "Proceed to Payment"

### 4. Test Stripe Payment
Use these test card numbers:

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 9995` | ❌ Declined |

- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

### 5. View Success Page
After successful payment, you'll be redirected to the success page with order details.

---

## 📸 Capture Screenshots

Screenshots should be saved in the `screenshots/` folder. See [screenshots/README.md](screenshots/README.md) for detailed instructions.

### Recommended Screenshots:
1. Homepage with product grid
2. Category filter in action
3. Shopping cart with items
4. Checkout form
5. Stripe payment page
6. Success page
7. Mobile responsive view

---

## 🛠️ Available Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Stripe Keys Not Working
- Verify `.env` file exists in the root directory
- Check that keys start with `pk_test_` and `sk_test_`
- Restart the dev server after changing `.env`

---

## 📚 Documentation

- **[RELEASE.md](RELEASE.md)** - Version history and features
- **[README.md](README.md)** - Complete project documentation
- **[docs/GETTING_STARTED.md](docs/GETTING_STARTED.md)** - Detailed setup guide
- **[docs/API.md](docs/API.md)** - API reference
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment guides

---

## 💡 Tips

- **Hot Reload:** Changes to code will automatically refresh the browser
- **Console Logs:** Open browser DevTools (F12) to see logs
- **Network Tab:** Monitor API calls to Stripe in DevTools
- **Responsive Testing:** Use DevTools device toolbar (Ctrl+Shift+M)

---

## ✅ Success Checklist

- [ ] Dependencies installed successfully
- [ ] Dev server running on http://localhost:3000
- [ ] Can browse products
- [ ] Can add items to cart
- [ ] Can proceed to checkout
- [ ] Can complete test payment
- [ ] Screenshots captured

---

## 🎉 You're All Set!

The application is now running. Explore the features, test the checkout flow, and capture screenshots for your documentation.

**Need help?** Check the [docs/](docs/) folder or open an issue on GitHub.

---

<div align="center">

Made with ❤️ by [Mostafa-SAID7](https://github.com/Mostafa-SAID7)

**⭐ Star the repo if you find it helpful!**

</div>
