# Inventory Management

This project is the implementation of the **Flex Business Solutions Tech Test**.  
The goal of this task is to create a simple inventory management app based on the provided Figma design.

The app allows users to:
- View a list of job sites with their statuses.
- Create new job sites.
- Navigate to a job site’s inventory dashboard.
- Search and filter job sites and inventory items.
- Update inventory items by editing table cells.

All the project is done in React.js using context api and lucide react for icons.

---

## 🚀 Tech Stack
- **React (with Vite)** – Frontend framework & development environment
- **Vanilla CSS** – Styling
- **React Testing Library / Vitest** – Unit testing

---

## 📸 Screenshots
Finished app screenshots are included inside the `screenshots/` folder of this repository.

---

## 📦 Installation & Running the App

Clone the repository:

```bash
git clone https://github.com/Haki-Celmeta/Inventory-Management.git
cd inventory-management
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Run unit tests:
```bash
npm test
```

## Improvement
Improvements we can make related to security and scaling.

### How to make the app more secure?
1. Adding validation to every input, using min and max length, trimming and sanitizing for XSS attack.
2. Adding authentication with token rotation
3. Handle errors safely
4. Using only HTTPS

### How to scale the app?
1. Reusable pure components
2. Lazy loading
3. Using state management strategy with context api, custom hooks, zustand or redux
4. Automated test (unit test, integration test and end-to-end test)