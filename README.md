# Prompt Organizer

A modern, web-based app to manage, organize, and search your AI prompts. Built with React, Tailwind CSS, and IndexedDB (Dexie.js) for local-first, privacy-friendly prompt management.

---

## Features

- **Add, edit, and delete prompts**
- **Tagging and filtering** for easy organization
- **Full-text search** across title, description, and template
- **Sort by title or creation date**
- **Responsive UI** for desktop and mobile
- **Prompt template preview** (shows template, hover for description)
- **Local storage** (no server required, your data stays on your device)

---

## How to Install and Run

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Step 1: Clone the Repository
```bash
git clone https://github.com/snowan/prompt-organizer.git
cd prompt-organizer/prompt-organizer
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

### Step 4: Open the App in Your Browser
Go to [http://localhost:5173/](http://localhost:5173/) to use the app.

---

## Running the App

After installing dependencies, you can start the development server:

```bash
npm run dev
```

You should see output similar to:

```
Prompt Organizer:
➜  Local:   http://localhost:5173/
```

Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to use the app.



### Troubleshooting

- If you see `ERR_CONNECTION_REFUSED`, make sure the server is running and you are visiting the correct port.
- If you get an error about `package.json` not found, make sure you are in the `prompt-organizer/prompt-organizer` directory.
- If you change code, the app will hot-reload automatically.

---

## Full Example

```bash
git clone https://github.com/snowan/prompt-organizer.git
cd prompt-organizer/prompt-organizer
npm install
npm run dev
# Then open http://localhost:5173/ in your browser
```

---

## Usage
- **Add a prompt:** Click the + button, fill in the details, and save.
- **Edit or delete:** Use the Edit/Delete buttons on each card.
- **Search:** Use the search bar to filter prompts by title, description, or template.
- **Filter by tags:** Click tags to filter prompts.
- **Sort:** Use the sort buttons to order by title or date.
- **Preview:** Prompt template is shown by default; hover to see the description overlay.

---

## Tech Stack
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Dexie.js (IndexedDB)](https://dexie.org/)
- [Vite](https://vitejs.dev/)
- TypeScript

---

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License
MIT

---

## Repository
[https://github.com/snowan/prompt-organizer](https://github.com/snowan/prompt-organizer) 