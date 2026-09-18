export type ViewMode =
  | "dashboard"
  | "workspace"
  | "history"
  | "projects"
  | "templates"
  | "ai-settings"
  | "docs"
  | "api-integration";

export type DeviceMode = "desktop" | "tablet" | "mobile";

export interface SupportedLanguage {
  id: string;
  name: string;
  extension: string;
  category: "web" | "mobile" | "backend" | "styling" | "data";
  defaultFramework: string;
  availableFrameworks: string[];
  syntaxLang: string;
  description: string;
}

export interface CodeFile {
  name: string;
  content: string;
  language: string;
}

export interface ConversionItem {
  id: string;
  timestamp: number;
  title: string;
  language: string;
  framework: string;
  imagePreview: string; // base64 or URL
  code: string;
  files: CodeFile[];
  detectedElements: string[];
  colorPalette: string[];
  explanation: string;
  promptUsed: string;
  modelUsed: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  activeConversion: ConversionItem;
  tags: string[];
}

export interface AiSettings {
  selectedModel: string;
  temperature: number;
  responsiveFlexGrid: boolean;
  useTailwindCDN: boolean;
  preserveExactColors: boolean;
  generateMultiFile: boolean;
  customSystemInstruction: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: "Free Tier" | "Pro Developer" | "Enterprise AI";
  isGuest: boolean;
}

export interface DashboardStats {
  totalConversions: number;
  generatedProjects: number;
  supportedLanguages: number;
  apiUsage: number;
  successRate: number;
}

export interface ToastNotification {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
}

export interface SampleTemplate {
  id: string;
  title: string;
  category: string;
  difficulty: "Simple" | "Moderate" | "Complex";
  thumbnail: string;
  description: string;
  targetLanguage: string;
  targetFramework: string;
  detectedElements: string[];
  colorPalette: string[];
  code: string;
  files: CodeFile[];
}

export interface CodeVersion {
  id: string;
  timestamp: number;
  label: string;
  description?: string;
  code: string;
  language: string;
  framework: string;
  lineCount: number;
  charCount: number;
  author: "AI" | "User" | "Optimizer";
}

export interface CodeExplanationResult {
  summary: string;
  functionality: string;
  structure: string;
  keyComponents: { name: string; purpose: string }[];
  stylingAndTheme: string;
  accessibility: string;
  customizationTips: string[];
}
