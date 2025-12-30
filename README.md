# 🚀 yainier.dev

![yainier.dev Preview](/public/assets/preview.png)

Personal portfolio and biography website for **Yainier Martínez Ruben**, a Senior Full Stack Engineer with over 10 years of experience. This site showcases professional experience, projects, blog articles, and curated resources.

**🌐 Live at: [yainier.com](https://yainier.com)**

## ✨ Features

- **🌍 Multi-language Support**: Fully localized in English and Spanish.
- **⚡ Built with Astro**: Optimized for performance and SEO.
- **🎨 Modern UI/UX**:
  - Interactive Hero section with Typewriter effect.
  - Smooth animations powered by `Framer Motion` (`motion`).
  - Dynamic Timeline to visualize professional growth.
  - Project gallery with detailed markdown-based case studies.
- **📝 Content Driven**:
  - Blog section for technical thoughts and tutorials.
  - "Recommended" resources (Videos, Stories, Tools, Tips).
- **📩 Integrated Contact Flow**: Custom "Hire Me" flow and general contact modals.
- **💅 Styled with Tailwind CSS**: Responsive and clean design.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **UI Components**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Astro Icon](https://github.com/natemoo-re/astro-icon)
- **Forms & API**: [Resend](https://resend.com/) (Emailing) & [Astro Actions](https://docs.astro.build/en/guides/actions/)

## 📂 Project Structure

```text
src/
├── components/     # Reusable React & Astro components
├── content/        # Markdown content (Blog, Projects, Timeline, Recommendations)
│   ├── blog/
│   ├── projects/
│   ├── timeline/
│   ├── reco_categories/
│   └── reco_items/
├── i18n/           # Localization strings and configuration
├── layouts/        # Page layouts
├── pages/          # Astro pages (Routes)
└── stores/         # Nano Stores for lightweight state management
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yruben/yainier.dev.git
   cd yainier.dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4321`

## 📦 Building for Production

To build the static site, run:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/yruben/yainier.dev/blob/main/LICENSE) file for details.

---

Crafted with ❤️ by [Yainier Martínez Ruben](https://yainier.com)
