# 🎨 Icon Recommender

An AI-powered icon recommendation system that helps UI/UX designers, product managers, and front-end developers find the perfect icons for their projects using the Iconpark library.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🤖 **AI-Powered Recommendations**
- **Smart Analysis**: Powered by GLM LLM for intelligent icon suggestions
- **Context-Aware**: Considers your specific use case and application context
- **Detailed Explanations**: Each recommendation comes with clear reasoning

### 🎯 **Real Icon Preview**
- **Visual Display**: See actual IconPark icons alongside recommendations
- **Library Validation**: Only shows icons that actually exist in the library
- **Interactive UI**: Clean, modern interface built with Shadcn UI

### 🛠 **Professional Features**
- **Configurable System Prompts**: Edit AI behavior via markdown files
- **Secure Token Management**: API credentials stored safely outside version control
- **Error Handling**: Robust error handling and fallback mechanisms
- **Responsive Design**: Works perfectly on desktop and mobile devices

### 🔧 **Developer Experience**
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: Built with Next.js 15, React 19, and Tailwind CSS
- **Clean Architecture**: Well-organized code structure and separation of concerns
- **Performance Optimized**: Fast icon lookup and efficient rendering

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- GLM API token (from [BigModel](https://open.bigmodel.cn/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alen-h/Icon-Recommender.git
   cd Icon-Recommender
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure API credentials**
   ```bash
   cp config.local.example.js config.local.js
   ```
   
   Edit `config.local.js` and replace `'your-glm-api-token-here'` with your actual GLM API token.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Basic Usage

1. **Describe Your Needs**: Enter a description of the icon you need in the textarea
   ```
   Example: "I need an icon for a delete button in my mobile app"
   ```

2. **Get Recommendations**: Click "Get Recommendations" or press `Cmd+Enter`

3. **View Results**: See AI-powered recommendations with:
   - **Visual Preview**: Actual icon rendered from IconPark library
   - **Icon Name**: Exact name for implementation
   - **Reasoning**: Why this icon is recommended for your use case

### Advanced Usage

- **System Prompt Customization**: Edit `public/system-prompt.md` to customize AI behavior
- **Keyboard Shortcuts**: Use `Cmd+Enter` (Mac) or `Ctrl+Enter` (Windows/Linux) to submit
- **Context-Specific Requests**: Be specific about your application type, user base, and design style

## 🏗 Architecture

### Project Structure

```
Icon-Recommender/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Main application component
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # Reusable UI components
│   └── ui/                      # Shadcn UI components
├── lib/                         # Utility functions
├── public/                      # Static assets
│   ├── icons/
│   │   └── iconpark.json       # IconPark library data
│   └── system-prompt.md        # AI system prompt
├── config.local.js              # API configuration (gitignored)
└── config.local.example.js      # Configuration template
```

### Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) for consistent design system
- **Icons**: [@icon-park/react](https://www.npmjs.com/package/@icon-park/react) for icon rendering
- **AI**: GLM LLM for intelligent recommendations

### Key Components

- **IconParkIcon**: Dynamic icon renderer with fallback handling
- **System Prompt Loader**: Loads customizable AI prompts from markdown
- **Icon Validation**: Ensures recommended icons exist in the library
- **Secure Config**: Environment-safe credential management

## 🔧 Configuration

### API Configuration

The application uses a secure configuration system:

```javascript
// config.local.js (create from template)
export const config = {
  GLM_API_TOKEN: 'your-actual-token-here',
  GLM_API_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
};
```

### System Prompt Customization

Edit `public/system-prompt.md` to customize how the AI analyzes requests and provides recommendations. The file uses markdown format for easy editing and supports:

- Core principles for icon selection
- Knowledge base information
- Output format specifications
- Example interactions

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Alen-h/Icon-Recommender)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `GLM_API_TOKEN` as an environment variable
4. Deploy!

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

Make sure to set up your API credentials in the production environment.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration provided
- Follow the established component patterns
- Write clear, descriptive commit messages

## 📝 API Reference

### GLM API Integration

The application integrates with the GLM (General Language Model) API for intelligent icon recommendations:

- **Endpoint**: `https://open.bigmodel.cn/api/paas/v4/chat/completions`
- **Model**: `glm-4.5-flash`
- **Authentication**: Bearer token
- **Response Format**: JSON with structured icon recommendations

### IconPark Integration

- **Library**: [@icon-park/react](https://www.npmjs.com/package/@icon-park/react)
- **Icons Database**: 2000+ icons across multiple categories
- **Rendering**: Dynamic component loading with fallback handling
- **Validation**: Real-time checking against available icons

## 🐛 Troubleshooting

### Common Issues

**Icons not displaying?**
- Check that `public/icons/iconpark.json` exists
- Verify the icon names in recommendations match the library

**API calls failing?**
- Verify your GLM API token in `config.local.js`
- Check network connectivity
- Ensure the API endpoint is accessible

**TypeScript errors?**
- Run `npm run build` to check for type issues
- Ensure all dependencies are properly installed

**Styling issues?**
- Clear your browser cache
- Check that Tailwind CSS classes are being applied

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [IconPark](https://iconpark.oceanengine.com/) for the comprehensive icon library
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component system
- [GLM](https://open.bigmodel.cn/) for the powerful language model
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for the deployment platform

## 📊 Project Status

This project is actively maintained and open to contributions. Check the [Issues](https://github.com/Alen-h/Icon-Recommender/issues) page for known issues or to request features.

---

**Made with ❤️ for designers and developers**

For questions or support, please [open an issue](https://github.com/Alen-h/Icon-Recommender/issues).