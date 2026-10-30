import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Sparkles, ExternalLink, Code2, Layers } from 'lucide-react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// PURE SELF-CONTAINED SVG BRAND ICONS
// Crisp, unmessed, 100% reliable across browsers
// ==========================================

const PythonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z"
      fill="url(#py-blue-tab)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z"
      fill="url(#py-yellow-tab)"
    />
    <defs>
      <linearGradient id="py-blue-tab" x1="12.48" y1="2" x2="12.48" y2="22.74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#327EBD" />
        <stop offset="1" stopColor="#1565A7" />
      </linearGradient>
      <linearGradient id="py-yellow-tab" x1="19.52" y1="9.26" x2="19.52" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFDA4B" />
        <stop offset="1" stopColor="#F9C600" />
      </linearGradient>
    </defs>
  </svg>
);

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path
      fill="#000000"
      d="M34 105l10-6c2 3.5 4 6.5 8.5 6.5 4.5 0 7.5-2 7.5-8V55h13v42.5c0 13-8 19-19.5 19-10 0-16.5-5.5-19.5-11.5zm43-1.5l10-5.8c2.8 4.6 6.5 8.3 13 8.3 5.5 0 9-2.8 9-6.8 0-4.8-4-6.5-11-9.5-10-4.3-16.5-9.5-16.5-20.5 0-10.2 8-18 20.5-18 8.8 0 15 3.5 19.2 11l-9.8 6.3c-2.2-4-5-6-9.4-6-4.2 0-7.2 2.6-7.2 6 0 4.2 3.5 5.8 10.5 8.8 11.2 4.8 17.2 10 17.2 21.2 0 12-9.5 18.5-22.5 18.5-12.5 0-19.8-6.2-23-14.5z"
    />
  </svg>
);

const CIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 109.19 122.88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#3949AB"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M107.81,92.16c0.86-1.48,1.39-3.16,1.39-4.66V35.38c0-1.5-0.53-3.17-1.39-4.66L54.6,61.44L107.81,92.16z"
    />
    <path
      fill="#283593"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M59.33,121.75l45.14-26.06c1.3-0.75,2.48-2.05,3.34-3.53L54.6,61.44L1.39,92.16c0.86,1.48,2.04,2.78,3.34,3.53l45.14,26.06C52.47,123.25,56.72,123.25,59.33,121.75z"
    />
    <path
      fill="#5C6BC0"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M107.81,30.72c-0.86-1.48-2.04-2.78-3.34-3.53L59.33,1.13c-2.6-1.5-6.86-1.5-9.46,0L4.73,27.19C2.13,28.69,0,32.38,0,35.38V87.5c0,1.5,0.53,3.17,1.39,4.66L54.6,61.44L107.81,30.72z"
    />
    <path
      fill="#FFFFFF"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M54.6,97.84c-20.07,0-36.4-16.33-36.4-36.4s16.33-36.4,36.4-36.4c12.95,0,25.03,6.97,31.52,18.19l-15.75,9.12c-3.25-5.62-9.29-9.1-15.77-9.1c-10.04,0-18.2,8.16-18.2,18.2c0,10.03,8.16,18.2,18.2,18.2c6.48,0,12.52-3.49,15.77-9.1l15.75,9.12C79.63,90.87,67.55,97.84,54.6,97.84z"
    />
  </svg>
);

// Unmessed official W3C HTML5 Logo
const HTML5Icon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#E44D26" d="M107.6 464l-34.6-388h365.9l-34.6 387.8L256 504.7z" />
    <path fill="#F16529" d="M256 470.5l117.8-32.6 28.5-319.4H256z" />
    <path fill="#EBEBEB" d="M256 226.6h-60.7l-4.2-47.1H256v-45.7H141.8l12.4 138.5H256zm0 131.7l-.4.1-51.9-14-3.3-37.3h-45.8l6.6 73.9 94.6 26.2.4-.1z" />
    <path fill="#FFFFFF" d="M255.8 226.6v45.7h60.7l-5.7 64.2-55 14.8v47.2l94.6-26.2 13-145.7zm0-92.8v45.7h114.2l4.2-45.7z" />
  </svg>
);

// Unmessed official W3C CSS3 Logo
const CSS3Icon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#264DE4" d="M107.6 464l-34.6-388h365.9l-34.6 387.8L256 504.7z" />
    <path fill="#2965F1" d="M256 470.5l117.8-32.6 28.5-319.4H256z" />
    <path fill="#EBEBEB" d="M256 226.6h-59.7l-4.2-47.1H256v-45.7H142.8l12.4 138.5H256zm0 131.7l-.4.1-51.9-14-3.3-37.3h-45.8l6.6 73.9 94.6 26.2.4-.1z" />
    <path fill="#FFFFFF" d="M255.8 226.6v45.7h59.7l-5.7 64.2-54 14.8v47.2l94.6-26.2 13-145.7zm0-92.8v45.7h114.2l4.2-45.7z" />
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-8 -8 144 144" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="16" fill="#3178C6" />
    <path
      fill="#FFFFFF"
      d="M30 46h42v12H57v52H44V58H30V46zm47 43l11-6.5c3.2 5.2 7.5 9.2 14.8 9.2 6.2 0 10.2-3.2 10.2-7.8 0-5.5-4.5-7.5-12.5-10.8-11.5-5-18.8-11-18.8-23.5 0-11.8 9.2-20.5 23.5-20.5 10 0 17.2 4 22 12.5l-11 7.2c-2.5-4.5-5.8-6.8-11-6.8-4.8 0-8.2 3-8.2 6.8 0 4.8 4 6.8 12 10.2 12.8 5.5 19.5 11.5 19.5 24.2 0 13.8-10.8 21.2-25.8 21.2-14.2 0-22.8-7-26.2-16.2z"
    />
  </svg>
);

const GitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#F05032"
      d="M125.7 57.6L70.4 2.3c-3.1-3.1-8.1-3.1-11.2 0L47.5 14c4 4.3 6.5 10 6.5 16.4 0 3.3-.7 6.4-1.9 9.3l17.7 17.7c2.9-1.2 6-1.9 9.3-1.9 13.3 0 24.1 10.8 24.1 24.1s-10.8 24.1-24.1 24.1c-13.3 0-24.1-10.8-24.1-24.1 0-3.3.7-6.4 1.9-9.3L40.2 53.6c-2.9 1.2-6 1.9-9.3 1.9-6.4 0-12.1-2.5-16.4-6.5L2.3 60.9c-3.1 3.1-3.1 8.1 0 11.2l55.3 55.3c3.1 3.1 8.1 3.1 11.2 0l56.9-56.9c3.1-3.1 3.1-8.1 0-11.2l.0-1.7z"
    />
    <circle cx="79.1" cy="79.6" r="13" fill="#FFFFFF" />
    <circle cx="30.9" cy="30.4" r="13" fill="#FFFFFF" />
    <circle cx="79.1" cy="79.6" r="7" fill="#F05032" />
    <circle cx="30.9" cy="30.4" r="7" fill="#F05032" />
  </svg>
);

const DockerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 640 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#2496ED"
      d="M349.9 236.3h-66.1v-59.4h66.1zm0-204.3h-66.1v60.7h66.1zm78.2 144.8H362v59.4h66.1zm-156.3-72.1h-66.1v60.1h66.1zm78.1 0h-66.1v60.1h66.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4c-3.3-24-16.7-44.9-41.1-63.7l-14-9.3l-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8c-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1c37.1 43.9 92.7 66.2 165.4 66.2c157.4 0 273.9-72.5 328.4-204.2c21.4.4 67.6.1 91.3-45.2c1.5-2.5 6.6-13.2 8.5-17.1zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1zm78.1 0h-66.1v59.4h66.1zm-78.1-72.1h-66.1v60.1h66.1z"
    />
  </svg>
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-36 -36 584 581.64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#D77655"
      d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
    />
    <path
      fill="#FCF2EE"
      fillRule="nonzero"
      d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"
    />
  </svg>
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 109 113" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M62.17 111.68c-2.45 3.03-7.44 1.34-7.49-2.54l-1.03-73.71h45.47c4.32 0 6.64 5.06 3.84 8.35L62.17 111.68z"
      fill="url(#sb-Linear1-tab)"
    />
    <path
      d="M62.17 111.68c-2.45 3.03-7.44 1.34-7.49-2.54l-1.03-73.71h45.47c4.32 0 6.64 5.06 3.84 8.35L62.17 111.68z"
      fill="url(#sb-Linear2-tab)"
    />
    <path
      d="M47.19 1.32c2.45-3.03 7.44-1.34 7.49 2.54l.43 73.71H9.95c-4.32 0-6.64-5.06-3.84-8.35L47.19 1.32z"
      fill="#3ECF8E"
    />
    <defs>
      <linearGradient id="sb-Linear1-tab" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(22.75 -109.6 161.6) scale(43.58)">
        <stop offset="0" stopColor="#249361" />
        <stop offset="1" stopColor="#3ECF8E" />
      </linearGradient>
      <linearGradient id="sb-Linear2-tab" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="scale(39.06) rotate(62.02 -.18 1.16)">
        <stop offset="0" stopOpacity=".2" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const N8NIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 115 512 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M512 179.2c0 28.267-23.51 51.2-52.522 51.2-24.448 0-45.014-16.32-50.86-38.4h-73.3c-12.843 0-23.787 9.045-25.9 21.397l-2.154 12.63A50.917 50.917 0 01290.197 256c8.79 7.552 15.02 18.005 17.067 29.973l2.133 12.63c2.262 12.458 13.291 21.546 25.942 21.397l20.8 0c5.824-22.08 26.39-38.4 50.859-38.4 29.013 0 52.5 22.933 52.5 51.2 0 28.267-23.53 51.2-52.5 51.2-24.47 0-45.014-16.32-50.86-38.4l-20.8 0c-25.685 0-47.573-18.09-51.797-42.773l-2.154-12.63c-2.262-12.437-13.27-21.525-25.899-21.397h-21.461c-6.57 20.992-26.582 36.267-50.262 36.267s-43.69-15.275-50.24-36.267H84.148c-6.571 20.992-26.582 36.267-50.24 36.267-29.014 0-52.523-22.934-52.523-51.2 0-28.267 23.51-51.2 52.523-51.2 25.237 0 46.336 17.386 51.37 40.533h28.523c5.035-23.147 26.133-40.533 51.37-40.533 25.26 0 46.337 17.386 51.371 40.533h20.31c12.821 0 23.786-9.045 25.877-21.397l2.176-12.63c4.224-24.682 26.133-42.773 51.798-42.773l73.3 0c5.846-22.08 26.412-38.4 50.86-38.4 29.018 0 52.528 22.933 52.528 51.2zm-26.24 0c0 14.144-11.776 25.6-26.282 25.6-14.507 0-26.24-11.456-26.24-25.6 0-14.144 11.733-25.6 26.24-25.6 14.506 0 26.26 11.456 26.26 25.6zm-433.259 100.267c14.507 0 26.24-11.456 26.24-25.6 0-14.144-11.733-25.6-26.24-25.6-14.506 0-26.261 11.456-26.261 25.6 0 14.144 11.733-25.6 26.24-25.6 14.507 0-26.262 11.456-26.262 25.6 0-14.144-11.734-25.6-26.24-25.6 0-14.144-11.734-25.6-26.24-25.6zm131.264 0c14.507 0 26.262-11.456 26.262-25.6 0-14.144-11.734-25.6-26.24-25.6 0-14.144-11.733-25.6-26.24-25.6-14.507 0-26.262 11.456-26.262 25.6 0 14.144 11.734 25.6 26.24 25.6zm223.19 78.933c14.507 0 26.24-11.456 26.24-25.6 0-14.144-11.733-25.6-26.24-25.6-14.507 0-26.24 11.456-26.24 25.6 0 14.144 11.733 25.6 26.24 25.6z"
      fill="#EA4B71"
    />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 640 640" className={className} fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
    <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z" />
  </svg>
);

const VercelIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-16 -12 160 135" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFFFFF" d="M64 0l64 110.9H0z" />
  </svg>
);

// ==========================================
// TOOL ITEM INTERFACE
// ==========================================
export interface ToolItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  glowColor: string;
  proficiency: number;
  description: string;
  href?: string;
}

// ==========================================
// BOX 1: CORE PROGRAMMING LANGUAGES & STANDARDS
// Column 1 (Left): C, JavaScript
// Column 2 (Middle): Python
// Column 3 (Right): HTML5, CSS3 (unmessed logos)
// ==========================================
const LANG_C: ToolItem = {
  name: 'C',
  category: 'Systems Language',
  icon: CIcon,
  glowColor: '101, 154, 210',
  proficiency: 75,
  description: 'Low-level software development, memory structures, and hardware control.',
  href: 'https://en.cppreference.com/w/c',
};

const LANG_JS: ToolItem = {
  name: 'JavaScript',
  category: 'Web Scripting',
  icon: JavaScriptIcon,
  glowColor: '247, 223, 30',
  proficiency: 88,
  description: 'Dynamic frontend interactions, asynchronous logic, and runtime building.',
  href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
};

const LANG_PYTHON: ToolItem = {
  name: 'Python',
  category: 'Core Language',
  icon: PythonIcon,
  glowColor: '55, 118, 171',
  proficiency: 90,
  description: 'Scripting, backend systems, data pipelines, and automation prototyping.',
  href: 'https://www.python.org',
};

const LANG_HTML: ToolItem = {
  name: 'HTML5',
  category: 'Markup Language',
  icon: HTML5Icon,
  glowColor: '227, 79, 38',
  proficiency: 92,
  description: 'Semantic markup structure for accessible, modern, and SEO-friendly web products.',
  href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
};

const LANG_CSS: ToolItem = {
  name: 'CSS3',
  category: 'Styling Language',
  icon: CSS3Icon,
  glowColor: '38, 77, 228',
  proficiency: 90,
  description: 'Modern styling systems, layout configurations, animations, and fluid responsive design.',
  href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
};

// ==========================================
// BOX 2: FRAMEWORKS, AI & ARCHITECTURE TOOLKIT
// Column 1 (Left): TypeScript, Docker
// Column 2 (Middle 2x2): Claude AI, Supabase, n8n, GitHub
// Column 3 (Right): Git, Vercel
// ==========================================
const TOOL_DOCKER: ToolItem = {
  name: 'Docker',
  category: 'Containerization',
  icon: DockerIcon,
  glowColor: '36, 150, 237',
  proficiency: 85,
  description: 'Containerized environments, multi-stage Dockerfiles, compose clusters, and reproducible deployment setups.',
  href: 'https://www.docker.com',
};

const TOOL_CLAUDE: ToolItem = {
  name: 'Claude AI',
  category: 'AI Assistant & LLM',
  icon: ClaudeIcon,
  glowColor: '217, 119, 82',
  proficiency: 88,
  description: 'Advanced prompt engineering, agentic reasoning pipelines, and structured generation.',
  href: 'https://claude.ai',
};

const TOOL_SUPABASE: ToolItem = {
  name: 'Supabase',
  category: 'Database & Auth',
  icon: SupabaseIcon,
  glowColor: '62, 207, 142',
  proficiency: 85,
  description: 'PostgreSQL backend hosting, row-level security, and realtime subscriptions.',
  href: 'https://supabase.com',
};

const TOOL_N8N: ToolItem = {
  name: 'n8n',
  category: 'Workflow Automation',
  icon: N8NIcon,
  glowColor: '255, 108, 55',
  proficiency: 82,
  description: 'Visual event-driven automation pipelines and webhook endpoint orchestration.',
  href: 'https://n8n.io',
};

const TOOL_GITHUB: ToolItem = {
  name: 'GitHub',
  category: 'Platform & CI/CD',
  icon: GitHubIcon,
  glowColor: '255, 255, 255',
  proficiency: 88,
  description: 'Distributed version control, GitHub Actions CI/CD pipelines, and project workflows.',
  href: 'https://github.com',
};

const TOOL_TYPESCRIPT: ToolItem = {
  name: 'TypeScript',
  category: 'Typed Language',
  icon: TypeScriptIcon,
  glowColor: '49, 120, 198',
  proficiency: 90,
  description: 'Strong typing, scalable architecture, and robust enterprise patterns.',
  href: 'https://www.typescriptlang.org',
};

const TOOL_GIT: ToolItem = {
  name: 'Git',
  category: 'Version Control',
  icon: GitIcon,
  glowColor: '240, 80, 50',
  proficiency: 88,
  description: 'Branching models, distributed source control, and release workflows.',
  href: 'https://git-scm.com',
};

const TOOL_VERCEL: ToolItem = {
  name: 'Vercel',
  category: 'Edge Cloud Platform',
  icon: VercelIcon,
  glowColor: '255, 255, 255',
  proficiency: 90,
  description: 'Zero-config global deployments, preview branches, and high-performance edge compute.',
  href: 'https://vercel.com',
};

// Qualitative label mapping
const getProficiencyLabel = (score: number): string => {
  if (score >= 90) return 'Expert / Core Stack';
  if (score >= 80) return 'Advanced / Fluent';
  if (score >= 70) return 'Proficient / Active';
  return 'Familiar / Exploring';
};

// ==========================================
// REUSABLE TABULAR CELL COMPONENT
// ==========================================
function TabularCell({
  tool,
  index,
  revealed,
  isHovered,
  onHover,
  onSelect,
  className,
  iconClassName,
}: {
  tool: ToolItem;
  index: number;
  revealed: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onSelect: (tool: ToolItem) => void;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tool)}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      title={`${tool.name} — Click for comfort rating`}
      aria-label={`View ${tool.name} proficiency details`}
      className={`group relative flex w-full items-center justify-center outline-none select-none transition-colors duration-200 hover:bg-white/[0.03] focus-visible:bg-white/[0.05] ${
        className || 'h-20 sm:h-24 md:h-28'
      }`}
    >
      <div
        className={`flex items-center justify-center transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-none ${
          revealed
            ? 'translate-y-0 opacity-80 blur-none group-hover:opacity-100 group-hover:scale-120'
            : 'translate-y-3 opacity-0 blur-xs'
        }`}
        style={{
          transitionDelay: `${index * 55}ms`,
          filter: isHovered
            ? `drop-shadow(0 0 16px rgba(${tool.glowColor}, 0.85))`
            : undefined,
        }}
      >
        <tool.icon className={iconClassName || "h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 transition-transform duration-200"} />
      </div>
    </button>
  );
}

// ==========================================
// BOX 1: CORE PROGRAMMING LANGUAGES & STANDARDS
// Left: C & JavaScript
// Middle: Python (Centered)
// Right: HTML5 & CSS3
// ==========================================
function LanguagesTabularCard({
  onSelect,
}: {
  onSelect: (tool: ToolItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* Category Subheader */}
      <div className="mb-3 flex items-center justify-end gap-2 px-2">
        <Code2 size={13} className="text-zinc-500" />
        <h3 className="text-[11px] font-mono tracking-wider text-zinc-500">
          Core Programming Languages & Standards
        </h3>
      </div>

      {/* Tabular Container */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a] shadow-2xl transition-all duration-500 hover:border-zinc-700/80"
      >
        <div className="grid grid-cols-4 w-full">
          {/* Column 1: C (Top) & JavaScript (Bottom) [Span 1] */}
          <div className="col-span-1 flex flex-col border-r border-zinc-800">
            <TabularCell
              tool={LANG_C}
              index={0}
              revealed={revealed}
              isHovered={hoveredIndex === 0}
              onHover={(h) => setHoveredIndex(h ? 0 : null)}
              onSelect={onSelect}
            />
            <TabularCell
              tool={LANG_JS}
              index={1}
              revealed={revealed}
              isHovered={hoveredIndex === 1}
              onHover={(h) => setHoveredIndex(h ? 1 : null)}
              onSelect={onSelect}
            />
          </div>

          {/* Column 2: Python (Centered across wide column) [Span 2] */}
          <div className="col-span-2 flex items-center justify-center border-r border-zinc-800">
            <TabularCell
              tool={LANG_PYTHON}
              index={2}
              revealed={revealed}
              isHovered={hoveredIndex === 2}
              onHover={(h) => setHoveredIndex(h ? 2 : null)}
              onSelect={onSelect}
              className="h-40 sm:h-48 md:h-56"
            />
          </div>

          {/* Column 3: HTML5 (Top) & CSS3 (Bottom) [Span 1] */}
          <div className="col-span-1 flex flex-col">
            <TabularCell
              tool={LANG_HTML}
              index={3}
              revealed={revealed}
              isHovered={hoveredIndex === 3}
              onHover={(h) => setHoveredIndex(h ? 3 : null)}
              onSelect={onSelect}
            />
            <TabularCell
              tool={LANG_CSS}
              index={4}
              revealed={revealed}
              isHovered={hoveredIndex === 4}
              onHover={(h) => setHoveredIndex(h ? 4 : null)}
              onSelect={onSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// BOX 2: FRAMEWORKS, AI & ARCHITECTURE TOOLKIT
// Left: TypeScript, Docker
// Middle: Claude AI, Supabase, n8n, GitHub
// Right: Git, Vercel
// ==========================================
function ToolkitTabularCard({
  onSelect,
}: {
  onSelect: (tool: ToolItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* Category Subheader */}
      <div className="mb-3 flex items-center justify-end gap-2 px-2">
        <Layers size={13} className="text-zinc-500" />
        <h3 className="text-[11px] font-mono tracking-wider text-zinc-500">
          Frameworks, AI & Architecture Toolkit
        </h3>
      </div>

      {/* Tabular Container */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a] shadow-2xl transition-all duration-500 hover:border-zinc-700/80"
      >
        <div className="grid grid-cols-4 w-full">
          {/* Column 1: TypeScript (Top) & Docker (Bottom) [Span 1] */}
          <div className="col-span-1 flex flex-col border-r border-zinc-800">
            <TabularCell
              tool={TOOL_TYPESCRIPT}
              index={0}
              revealed={revealed}
              isHovered={hoveredIndex === 0}
              onHover={(h) => setHoveredIndex(h ? 0 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
            <TabularCell
              tool={TOOL_DOCKER}
              index={1}
              revealed={revealed}
              isHovered={hoveredIndex === 1}
              onHover={(h) => setHoveredIndex(h ? 1 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
          </div>

          {/* Column 2: Claude AI, Supabase, n8n, GitHub (2x2 Grid) [Span 2] */}
          <div className="col-span-2 grid grid-cols-2 border-r border-zinc-800">
            <TabularCell
              tool={TOOL_CLAUDE}
              index={2}
              revealed={revealed}
              isHovered={hoveredIndex === 2}
              onHover={(h) => setHoveredIndex(h ? 2 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
            <TabularCell
              tool={TOOL_SUPABASE}
              index={3}
              revealed={revealed}
              isHovered={hoveredIndex === 3}
              onHover={(h) => setHoveredIndex(h ? 3 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
            <TabularCell
              tool={TOOL_N8N}
              index={4}
              revealed={revealed}
              isHovered={hoveredIndex === 4}
              onHover={(h) => setHoveredIndex(h ? 4 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
            <TabularCell
              tool={TOOL_GITHUB}
              index={5}
              revealed={revealed}
              isHovered={hoveredIndex === 5}
              onHover={(h) => setHoveredIndex(h ? 5 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
          </div>

          {/* Column 3: Git (Top) & Vercel (Bottom) [Span 1] */}
          <div className="col-span-1 flex flex-col">
            <TabularCell
              tool={TOOL_GIT}
              index={6}
              revealed={revealed}
              isHovered={hoveredIndex === 6}
              onHover={(h) => setHoveredIndex(h ? 6 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
            <TabularCell
              tool={TOOL_VERCEL}
              index={7}
              revealed={revealed}
              isHovered={hoveredIndex === 7}
              onHover={(h) => setHoveredIndex(h ? 7 : null)}
              onSelect={onSelect}
              iconClassName="h-5.5 w-5.5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
const StackBentoGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  // GSAP Entrance for Section Header
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Modal Animation on Logo Click
  useEffect(() => {
    if (modalOpen && activeTool) {
      if (reducedMotion) {
        setBarWidth(activeTool.proficiency);
        return;
      }

      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalContentRef.current,
        { scale: 0.92, y: 15 },
        { scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' }
      );
      gsap.fromTo(
        glowRef.current,
        { scale: 0.1, opacity: 0 },
        { scale: 1, opacity: 0.25, duration: 1.5, ease: 'power3.out' }
      );

      const timer = setTimeout(() => {
        setBarWidth(activeTool.proficiency);
      }, 180);

      return () => clearTimeout(timer);
    } else {
      setBarWidth(0);
    }
  }, [modalOpen, activeTool, reducedMotion]);

  const handleOpenModal = (tool: ToolItem) => {
    setActiveTool(tool);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    if (reducedMotion) {
      setModalOpen(false);
      setActiveTool(null);
      return;
    }

    gsap.to(modalContentRef.current, {
      scale: 0.92,
      y: 15,
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setModalOpen(false);
        setActiveTool(null);
      },
    });
  };

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-black py-24 md:py-32"
    >
      <div id="languages" className="absolute -top-24" />

      {/* ========================================================= */}
      {/* SECTION HEADER                                            */}
      {/* ========================================================= */}
      <div className="mx-auto mb-16 max-w-7xl px-6 md:mb-20 md:px-12 lg:px-24">
        <div ref={headerRef}>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
            The Toolkit
          </p>
          <h2
            className="text-5xl font-normal leading-none tracking-tight text-white md:text-7xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Stack that powers
            <br />
            <span className="text-zinc-400">the craft</span>
          </h2>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TABULAR BOXES SECTION                                     */}
      {/* ========================================================= */}
      <div className="mx-auto flex max-w-4xl flex-col gap-y-12 md:gap-y-16 px-6 md:px-8">
        {/* BOX 1: CORE LANGUAGES */}
        <LanguagesTabularCard onSelect={handleOpenModal} />

        {/* BOX 2: FRAMEWORKS & TOOLKIT */}
        <ToolkitTabularCard onSelect={handleOpenModal} />
      </div>

      {/* ========================================================= */}
      {/* COMFORT RATING / PROFICIENCY POPUP MODAL                  */}
      {/* ========================================================= */}
      {modalOpen && activeTool && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            ref={modalContentRef}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-7"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 0 60px -10px rgba(${activeTool.glowColor}, 0.25), inset 0 1px 1px rgba(255,255,255,0.08)`,
            }}
          >
            {/* Ambient Background Spotlight */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full blur-[90px]"
              style={{ backgroundColor: `rgb(${activeTool.glowColor})` }}
            />

            {/* Modal Header: Stack Name & Icon */}
            <div className="relative mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-inner"
                  style={{
                    boxShadow: `0 0 25px -5px rgba(${activeTool.glowColor}, 0.35)`,
                  }}
                >
                  <activeTool.icon className="h-full w-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {activeTool.category}
                  </span>
                  <h4 className="text-xl font-bold tracking-wide text-white">
                    {activeTool.name}
                  </h4>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="rounded-full border border-zinc-800/80 bg-zinc-900/60 p-2 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
                aria-label="Close details"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tool Description */}
            <p className="relative mb-6 text-xs leading-relaxed text-zinc-400">
              {activeTool.description}
            </p>

            {/* Comfort Rating Progress */}
            <div className="relative">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  <Sparkles size={13} style={{ color: `rgb(${activeTool.glowColor})` }} />
                  Comfort Rating
                </span>
                <span
                  className="rounded-full border bg-zinc-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wide"
                  style={{
                    color: `rgb(${activeTool.glowColor})`,
                    borderColor: `rgba(${activeTool.glowColor}, 0.3)`,
                  }}
                >
                  {getProficiencyLabel(activeTool.proficiency)}
                </span>
              </div>

              {/* Progress bar track & animated fill */}
              <div className="h-2.5 w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-900 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${barWidth}%`,
                    background: `linear-gradient(to right, rgb(${activeTool.glowColor}), rgba(${activeTool.glowColor}, 0.5))`,
                    boxShadow: `0 0 10px rgba(${activeTool.glowColor}, 0.5)`,
                  }}
                />
              </div>

              {/* Official Documentation Link */}
              {activeTool.href && (
                <div className="mt-5 flex justify-end">
                  <a
                    href={activeTool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>Official Documentation</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StackBentoGrid;
