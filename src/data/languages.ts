import { SupportedLanguage } from "../types";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    id: "html",
    name: "HTML",
    extension: "html",
    category: "web",
    defaultFramework: "Semantic HTML5",
    availableFrameworks: ["Semantic HTML5", "HTML5 + Canvas", "Web Components"],
    syntaxLang: "html",
    description: "Standard semantic HTML5 markup with accessible tags and clean layout elements."
  },
  {
    id: "react-jsx",
    name: "React JSX",
    extension: "tsx",
    category: "web",
    defaultFramework: "Tailwind CSS",
    availableFrameworks: ["Tailwind CSS", "CSS Modules", "Styled Components", "Inline Styles"],
    syntaxLang: "typescript",
    description: "Modular React 19 functional components with state hooks and responsive styling."
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    extension: "html",
    category: "styling",
    defaultFramework: "Utility First v4",
    availableFrameworks: ["Utility First v4", "JIT Configuration", "Custom Theme"],
    syntaxLang: "html",
    description: "Modern Tailwind CSS classes with flexbox, grid, and dark mode support."
  },
  {
    id: "vue",
    name: "Vue.js",
    extension: "vue",
    category: "web",
    defaultFramework: "Vue 3 Composition API",
    availableFrameworks: ["Vue 3 Composition API", "Options API", "Nuxt 3 Layout"],
    syntaxLang: "html",
    description: "Single-file component (.vue) with script setup, reactive state, and scoped styling."
  },
  {
    id: "javascript",
    name: "JavaScript",
    extension: "js",
    category: "web",
    defaultFramework: "Vanilla ES6+",
    availableFrameworks: ["Vanilla ES6+", "DOM Manipulation", "Event Driven"],
    syntaxLang: "javascript",
    description: "Interactive JavaScript handling DOM events, animations, and async UI data."
  },
  {
    id: "css",
    name: "CSS",
    extension: "css",
    category: "styling",
    defaultFramework: "CSS3 Variables & Flexbox",
    availableFrameworks: ["CSS3 Variables & Flexbox", "CSS Grid", "BEM Methodology"],
    syntaxLang: "css",
    description: "Clean stylesheet rules with custom properties, CSS Grid, and media queries."
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    extension: "html",
    category: "styling",
    defaultFramework: "Bootstrap 5.3",
    availableFrameworks: ["Bootstrap 5.3", "Bootstrap Icons", "Grid System"],
    syntaxLang: "html",
    description: "Responsive Bootstrap container, rows, cols, modals, and navigation badges."
  },
  {
    id: "react-native",
    name: "React Native",
    extension: "tsx",
    category: "mobile",
    defaultFramework: "NativeWind",
    availableFrameworks: ["NativeWind", "StyleSheet.create", "Styled Components"],
    syntaxLang: "typescript",
    description: "Cross-platform mobile UI with View, Text, TouchableOpacity, and FlatList."
  },
  {
    id: "flutter",
    name: "Flutter / Dart",
    extension: "dart",
    category: "mobile",
    defaultFramework: "Material 3",
    availableFrameworks: ["Material 3", "Cupertino (iOS)", "Custom Theme"],
    syntaxLang: "dart",
    description: "Declarative Flutter Widget tree with Scaffold, AppBar, Column, and BoxDecoration."
  },
  {
    id: "python",
    name: "Python",
    extension: "py",
    category: "backend",
    defaultFramework: "Streamlit UI",
    availableFrameworks: ["Streamlit UI", "Tkinter", "PyQt6 / PySide6", "FastAPI Jinja2"],
    syntaxLang: "python",
    description: "Python desktop GUI (Tkinter/PyQt) or interactive web app (Streamlit)."
  },
  {
    id: "java",
    name: "Java",
    extension: "java",
    category: "backend",
    defaultFramework: "JavaFX",
    availableFrameworks: ["JavaFX FXML", "Swing GridBag", "Spring Boot Thymeleaf"],
    syntaxLang: "java",
    description: "Java UI layouts with Stage, Scene, VBox, HBox, and styled Button components."
  },
  {
    id: "csharp",
    name: "C#",
    extension: "cs",
    category: "backend",
    defaultFramework: "Blazor WebAssembly",
    availableFrameworks: ["Blazor WebAssembly", "WPF XAML", ".NET MAUI"],
    syntaxLang: "csharp",
    description: "C# Blazor components or XAML markup for modern desktop and enterprise apps."
  },
  {
    id: "php",
    name: "PHP",
    extension: "php",
    category: "backend",
    defaultFramework: "Blade / Tailwind",
    availableFrameworks: ["Blade / Tailwind", "Pure PHP 8.2", "Laravel Component"],
    syntaxLang: "php",
    description: "Server-rendered PHP UI templates with dynamic variables and clean markup."
  },
  {
    id: "nodejs",
    name: "Node.js",
    extension: "js",
    category: "backend",
    defaultFramework: "Express + EJS",
    availableFrameworks: ["Express + EJS", "Handlebars", "Fastify View"],
    syntaxLang: "javascript",
    description: "Node.js backend rendering server templates or REST API view models."
  },
  {
    id: "sql",
    name: "SQL",
    extension: "sql",
    category: "data",
    defaultFramework: "PostgreSQL DDL",
    availableFrameworks: ["PostgreSQL DDL", "MySQL Schema", "SQLite"],
    syntaxLang: "sql",
    description: "Normalized relational database tables, constraints, and mock seed data derived from UI entities."
  },
  {
    id: "json",
    name: "JSON",
    extension: "json",
    category: "data",
    defaultFramework: "Design Tokens & AST",
    availableFrameworks: ["Design Tokens & AST", "Figma Token Spec", "UI Schema"],
    syntaxLang: "json",
    description: "Structured design tokens, color palette definitions, and component hierarchy AST."
  }
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

export const QUICK_PROMPTS = [
  "Make the design responsive.",
  "Use clean semantic HTML.",
  "Use modern CSS Grid and Flexbox.",
  "Convert into React components.",
  "Use Tailwind CSS.",
  "Make it mobile friendly.",
  "Preserve exact colors and spacing."
];
