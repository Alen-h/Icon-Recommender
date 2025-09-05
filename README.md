# Icon Recommender 🎨

An AI-powered icon recommendation tool that helps developers and designers find the perfect icons for their projects. Describe what you need, and get curated suggestions from multiple popular icon libraries.

![Icon Recommender](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- **AI-Powered Recommendations**: Uses advanced language models to understand your requirements and suggest relevant icons
- **Multiple Icon Libraries**: Supports 5 popular icon libraries:
  - [IconPark](https://iconpark.oceanengine.com/) - Modern and versatile icons
  - [Font Awesome](https://fontawesome.com/) - The web's most popular icon set
  - [Ant Design Icons](https://ant.design/components/icon/) - Beautiful icons from Ant Design
  - [Heroicons](https://heroicons.com/) - Clean SVG icons by Tailwind CSS creators
  - [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- **Real-time Icon Validation**: Automatically filters out invalid icon names
- **Copy to Clipboard**: Easy copying of icon names and React code snippets
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🚀 Demo

Simply describe what kind of icon you need:
- "I need an icon for a delete button in my mobile app"
- "Looking for icons for a user profile section"
- "Need icons for a shopping cart feature"

The AI will analyze your request and provide relevant icon suggestions with explanations for why each icon fits your needs.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: Multiple libraries (IconPark, Font Awesome, Ant Design, Heroicons, Lucide)
- **AI**: GLM-4.5-Flash model for intelligent recommendations

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/icon-recommender.git
   cd icon-recommender
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up configuration:**
   ```bash
   cp config.local.example.js config.local.js
   ```
   Edit `config.local.js` with your API credentials if needed.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

The application uses a system prompt loaded from `public/system-prompt.md` to guide the AI's icon recommendations. You can customize this prompt to adjust the recommendation behavior.

## 🎯 Usage

1. **Enter your requirement**: Describe what kind of icon you need in the text area
2. **Get recommendations**: Click "Get Recommendations" or press `Cmd+Enter`
3. **Browse results**: View AI-curated icon suggestions with explanations
4. **Copy what you need**: Use the copy buttons to get icon names or React code snippets

## 📁 Project Structure

```
icon-recommender/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and configuration
├── public/               # Static assets
│   ├── icons/           # Icon library data
│   └── system-prompt.md # AI system prompt
└── ...config files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [IconPark](https://iconpark.oceanengine.com/) for their beautiful icon collection
- [Font Awesome](https://fontawesome.com/) for the most popular web icons
- [Ant Design](https://ant.design/) for their design system and icons
- [Heroicons](https://heroicons.com/) for clean and consistent SVG icons
- [Lucide](https://lucide.dev/) for their beautiful icon toolkit
- [shadcn/ui](https://ui.shadcn.com/) for the excellent UI components
- [Vercel](https://vercel.com/) for the deployment platform

## 🐛 Issues & Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/icon-recommender/issues) on GitHub.

---

Made with ❤️ by [Your Name](https://github.com/yourusername)