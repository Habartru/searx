import { Source } from '@/types';

interface DemoResponse {
  content: string;
  sources: Source[];
}

export const DEMO_RESPONSES: Record<string, DemoResponse> = {
  "default": {
    content: "I can help you with that! Let me provide some relevant information based on available sources.",
    sources: [
      {
        title: "Introduction to AI Assistants",
        url: "https://example.com/ai-assistants",
        snippet: "AI assistants are becoming increasingly sophisticated in their ability to understand and respond to user queries."
      }
    ]
  },
  "what is typescript": {
    content: "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static types, classes, and modules to JavaScript, making it easier to develop large-scale applications. TypeScript is developed and maintained by Microsoft.",
    sources: [
      {
        title: "TypeScript Documentation",
        url: "https://www.typescriptlang.org/docs/",
        snippet: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."
      },
      {
        title: "TypeScript on GitHub",
        url: "https://github.com/microsoft/TypeScript",
        snippet: "TypeScript is a language for application-scale JavaScript development."
      }
    ]
  },
  "how to center a div": {
    content: "There are several ways to center a div in CSS. Here are the most common approaches:\n\n1. Using Flexbox:\n```css\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n```\n\n2. Using Grid:\n```css\n.parent {\n  display: grid;\n  place-items: center;\n}\n```\n\n3. Using absolute positioning:\n```css\n.child {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n```",
    sources: [
      {
        title: "CSS Tricks - Centering in CSS",
        url: "https://css-tricks.com/centering-css-complete-guide/",
        snippet: "A complete guide to centering elements using modern CSS techniques."
      }
    ]
  }
};

export function getDemoResponse(query: string): DemoResponse {
  // Convert query to lowercase for case-insensitive matching
  const normalizedQuery = query.toLowerCase();
  
  // Find a matching response or return default
  return DEMO_RESPONSES[normalizedQuery] || DEMO_RESPONSES.default;
}