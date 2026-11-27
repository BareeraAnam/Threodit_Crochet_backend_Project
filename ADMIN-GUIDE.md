# Threodit Crochet Store - Admin Panel Guide

## Overview
The **Threodit Admin Panel** is a pure frontend, client-side management dashboard designed for the Threodit Crochet Store. It operates on a dedicated URL without requiring an external backend or database, using browser `localStorage` for data persistence and real-time cross-tab synchronization.

## Accessing the Admin Panel
* **URL:** `/admin` or `/admin.html` (e.g. `http://127.0.0.1:5173/admin` or `https://your-domain.com/admin`)
* **Default Username:** `admin`
* **Default Password:** `threodit2024`

---

## Core Sections

### 1. 📊 Dashboard
* **Metrics:** Total Products (in-stock status), Total Orders placed, Active Coupons, and visitor Cart Items.
* **Category Breakdown:** Visual distribution bar chart showing inventory balance.
* **Quick Actions:** Instant 1-click navigation to store operations.
* **Featured Showcase:** Quick overview of featured items and their review ratings.

### 2. 📦 Products Management
* **Catalog:** View, filter by category (Bags, Hats, Scarves, Accessories, Home Decor), and live search.
* **CRUD Actions:** Add new products, edit price/details/colors/images, toggle stock status (**In Stock** vs **Out of Stock**), and delete products.
* **Synchronized:** Updates are saved to `thr_adm_products` and load on the live storefront.

### 3. 🛒 Orders Management (Live Checkout Sync)
* **Real-Time Orders:** When a customer completes checkout on `/checkout`, the order immediately syncs to the Admin Panel.
* **Order Details:** Customer name, email, street address, city, state, zip code, payment method, items list (with color variant and quantity), and order total.
* **Cross-Tab Auto-Sync:** Listens to window storage and focus events so new orders appear without needing a manual page reload.

### 4. 📁 Categories
* View all 6 main categories with assigned image paths and product counts.
* Edit category labels and image paths.

### 5. 🏷️ Coupons & Discounts
* **Live Discount Engine:** Create flat ($ off) or percentage (% off) coupon codes (e.g. `SAVE5`, `CROCHET10`).
* **Instant Cart Validation:** Any active coupon created in the Admin Panel can be immediately applied by customers on `/cart`.

### 6. ⚙️ Store Settings
* **Store Profile:** Store name, tagline, support email, phone, and store address.
* **Admin Security:** Change admin username and password.
* **Shipping Rules:** Set base shipping fee and free-shipping threshold.
* **Data Management:**
  * **Export JSON:** Download complete store backup (`threodit-admin.json`).
  * **Import JSON:** Restore or transfer data across browsers/devices.
  * **Reset All:** Reset everything back to clean default demo data.

---

## Deployment Note
When deployed to static hosting platforms (Vercel, Netlify, GitHub Pages, or Hostinger), `/admin` and `/admin.html` are routed directly to the dashboard at the root of the build output (`dist/admin.html`).
