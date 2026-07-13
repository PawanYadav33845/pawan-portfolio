# Pawan Yadav — Interactive Engineering Portfolio

A high-performance, responsive single-page web portfolio engineered to present live code repositories, system design concentrations, and software engineering methodologies directly to technical recruiters.

## 🚀 Live Production Environment

The application is fully compiled, automated, and continuously deployed using custom GitHub Actions infrastructure.
👉 **[View Live Interactive Portfolio](https://PawanYadav33845.github.io/pawan-portfolio/)**

---

## 🛠️ System Architecture & Technology Stack

* **Core UI Framework:** React 19 (compiled with Vite) utilizing declarative component layouts.
* **Animation Engine:** Framer Motion for structural page loading transitions and fluid project breakdowns.
* **Styling Framework:** Tailwind CSS implementing a utility-first, fully responsive dark-mode scheme.
* **Icon Engine:** Lucide-React + clean embedded inline SVGs optimized for fast browser rendering.

---

## ⚡ Real-Time API Node Integration (Dynamic Fetching)

To eliminate manual profile maintenance, the application connects directly to external production interfaces upon initial layout mounting:

* **Dynamic Repository Tree:** The page invokes a secure asynchronous browser hook to query the **GitHub REST API** (`https://api.github.com/users/PawanYadav33845/repos`).
* **Runtime Filtering & Sorting:** The resulting response array automatically filters out external forks, sorts workspaces by their most recent active timestamp (`?sort=updated`), limits the node tree size, and dynamically streams the repository metadata (titles, descriptions, star counts, and language badges) straight into your interface.
* **Frictionless Sync:** Every single time you push a new code improvement or create a new public repository on GitHub, your portfolio automatically updates live for viewing recruiters without needing a rebuild.

---

## 📋 Interactive Engineering Accordions (STAR Framework)

The project portfolio features an interactive technical breakdown designed around the industry-standard **STAR method** (Situation, Task, Action, Result) for engineering highlights:
* **Face Hit:** Web-based game tracking computer vision node coordinates utilizing local storage persistence frameworks.
* **Responsive Alarm System:** Core Object-Oriented Programming (OOP) architectures engineered using custom UI thread execution check loops.
* **Keylogger Diagnostic Tool:** A Python cybersecurity script monitoring hardware level input layers with robust network fallback exceptions.
* **Online Examination Platform:** Structured PHP and relational SQL dashboards built with strict role-based session protection schemas.

---

## 🔧 Local Development & Compilation Steps

To clone the application workspace and initialize the local development hot-reloading engine, run the following sequence in your terminal terminal:

```bash
# Clone the repository workspace
git clone [https://github.com/PawanYadav33845/pawan-portfolio.git](https://github.com/PawanYadav33845/pawan-portfolio.git)

# Navigate into the project application directory
cd pawan-portfolio/pawan-portfolio

# Install production-ready dependency nodes
npm install

# Initialize local developer compilation server
npm run dev