# Amazon Clone — Frontend

Lightweight Amazon-like frontend built with React. Implements product listing, category results, product details, cart, and a global context for state (cart/basket).

## Features

- Landing page with carousel, categories and products
- Category search / results page
- Product detail page
- Cart with add / remove and subtotal
- Global state using React Context + useReducer (DataProvider)
- Responsive layout for desktop, tablet and mobile

## Tech stack

- React (function components, hooks)
- React Router v6
- CSS Modules
- Axios (HTTP requests)
- Vite / Create React App (project bootstrapped locally)

## Quick start (Windows)

1. Install dependencies
   - npm: `npm install`
2. Start dev server
   - `npm run dev` (or `npm start` if your project uses CRA)
3. Open: http://localhost:3000 or the port printed by the dev server

## Environment

Create a .env file (if needed) for API base URLs and keys. Example:

```
VITE_API_BASE_URL=https://your-api.example.com
```

In code the endpoints are imported from `src/Api/endPoints.js` — update that file to point to your backend.

## Important files

- src/main.jsx — app bootstrap and DataProvider mount
- src/components/dataprovider/DataProvider.jsx — global state provider (useReducer)
- src/utility/reducer.js — reducer and initialState (cart actions)
- src/components/header/Header.jsx + Header.module.css — top + lower header
- src/components/product/ProductCard.jsx & product.module.css — product UI, add-to-cart
- src/pages/cart/Cart.jsx & cart.module.css — cart page

## Notes / Known issues

- Header stickiness: header bars are fixed; if you see overlap, ensure `.main_content` has top margin/padding equal to combined header heights (change in CSS or Layout.jsx).
- Route paths must match links (e.g., `/product/:productid` vs `/products/:productid`). Update `src/Routing.jsx` if navigation logs "No routes matched".
- DataProvider must be imported/exported correctly (named vs default). Confirm `DataProvider` export matches its import in `src/main.jsx`.
- If an image or element causes horizontal scroll on small screens, ensure `img { max-width:100%; height:auto }` and responsive CSS for product cards.

## Contributing

- Open an issue for bugs or feature requests.
- Create PRs for fixes; keep changes scoped and include screenshots for UI updates.

## License

MIT — use and modify as needed.
