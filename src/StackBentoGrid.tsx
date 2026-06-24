import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type ToolSize = 'small' | 'wide' | 'tall' | 'large';
type ToolGroup = 'languages' | 'backend' | 'tools';

interface Tool {
  name: string;
  category: string;
  group: ToolGroup;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  glowColor: string; // rgba value for brand-specific hover spotlights
  proficiency: number; // percentage (0-100) for visual progress bar
  experience: string;  
  projectsCount: string; 
  focusAreas: string[];
}

// ==========================================
// BRAND SVG ICONS DEFINITIONS
// ==========================================

const PythonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z" fill="url(#py-blue)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z" fill="url(#py-yellow)"/>
    <defs>
      <linearGradient id="py-blue" x1="12.4809" y1="2" x2="12.4809" y2="22.7407" gradientUnits="userSpaceOnUse">
        <stop stopColor="#327EBD"/>
        <stop offset="1" stopColor="#1565A7"/>
      </linearGradient>
      <linearGradient id="py-yellow" x1="19.519" y1="9.25928" x2="19.519" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFDA4B"/>
        <stop offset="1" stopColor="#F9C600"/>
      </linearGradient>
    </defs>
  </svg>
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 509.64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/>
    <path fill="#FCF2EE" fillRule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"/>
  </svg>
);

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 122.88 122.88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon fill="#F7DF1E" points="0,0 122.88,0 122.88,122.88 0,122.88 0,0"/>
    <path fill="#000000" fillRule="evenodd" clipRule="evenodd" d="M32.31,102.69l9.4-5.69c1.81,3.22,3.46,5.94,7.42,5.94c3.79,0,6.19-1.48,6.19-7.26V56.41h11.55v39.43 c0,11.96-7.01,17.4-17.24,17.4C40.39,113.24,35.03,108.46,32.31,102.69L32.31,102.69L32.31,102.69z M73.14,101.45l9.4-5.44 c2.48,4.04,5.69,7.01,11.38,7.01c4.78,0,7.84-2.39,7.84-5.69c0-3.96-3.13-5.36-8.41-7.67l-2.89-1.24c-8.33-3.55-13.86-8-13.86-17.4 c0-8.66,6.6-15.26,16.91-15.26c7.34,0,12.62,2.56,16.41,9.24l-8.99,5.77c-1.98-3.55-4.12-4.95-7.42-4.95 c-3.38,0-5.53,2.14-5.53,4.95c0,3.46,2.14,4.87,7.09,7.01l2.89,1.24c9.82,4.21,15.34,8.5,15.34,18.15 c0,10.39-8.17,16.08-19.14,16.08C83.45,113.25,76.52,108.13,73.14,101.45L73.14,101.45L73.14,101.45z M73.14,101.45L73.14,101.45 L73.14,101.45L73.14,101.45z"/>
  </svg>
);

const HTMLIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 108.35 122.88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon fill="#E44D26" points="108.35,0 98.48,110.58 54.11,122.88 9.86,110.6 0,0 108.35,0"/>
    <polygon fill="#F16529" points="54.17,113.48 90.03,103.54 98.46,9.04 54.17,9.04 54.17,113.48"/>
    <path fill="#EBEBEB" fillRule="evenodd" clipRule="evenodd" d="M34.99,36.17h19.19V22.61H20.16l0.32,3.64l3.33,37.38h30.35V50.06H36.23L34.99,36.17L34.99,36.17L34.99,36.17z M38.04,70.41H24.43l1.9,21.3l27.79,7.71l0.06-0.02V85.29l-0.06,0.02l-15.11-4.08L38.04,70.41L38.04,70.41L38.04,70.41z"/>
    <path fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M54.13,63.63h16.7l-1.57,17.59L54.13,85.3v14.11l27.81-7.71l0.2-2.29l3.19-35.71l0.33-3.64H54.13V63.63 L54.13,63.63z M54.13,36.14v0.03h32.76l0.27-3.05l0.62-6.88l0.32-3.64H54.13V36.14L54.13,36.14L54.13,36.14z"/>
  </svg>
);

const CSSIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 296297 333333" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="css-id4" gradientUnits="userSpaceOnUse" x1="54128.7" y1="79355.5" x2="240318" y2="79355.5">
        <stop offset="0" stopColor="#e8e7e5"/>
        <stop offset="1" stopColor="#fff"/>
      </linearGradient>
      <linearGradient id="css-id5" gradientUnits="userSpaceOnUse" x1="62019.3" y1="202868" x2="233515" y2="202868">
        <stop offset="0" stopColor="#e8e7e5"/>
        <stop offset="1" stopColor="#fff"/>
      </linearGradient>
      <linearGradient id="css-id6" gradientUnits="userSpaceOnUse" x1="104963" y1="99616.9" x2="104963" y2="171021">
        <stop offset="0" stopColor="#d1d3d4"/>
        <stop offset=".388" stopColor="#d1d3d4"/>
        <stop offset="1" stopColor="#d1d3d4"/>
      </linearGradient>
      <linearGradient id="css-id7" gradientUnits="userSpaceOnUse" x1="194179" y1="61185.8" x2="194179" y2="135407">
        <stop offset="0" stopColor="#d1d3d4"/>
        <stop offset=".388" stopColor="#d1d3d4"/>
        <stop offset="1" stopColor="#d1d3d4"/>
      </linearGradient>
      <mask id="css-id0">
        <linearGradient id="css-id1" gradientUnits="userSpaceOnUse" x1="104963" y1="99616.9" x2="104963" y2="171021">
          <stop offset="0" stopOpacity="0" stopColor="#fff"/>
          <stop offset=".388" stopColor="#fff"/>
          <stop offset="1" stopOpacity=".831" stopColor="#fff"/>
        </linearGradient>
        <path fill="url(#css-id1)" d="M61737 99467h86453v71704H61737z"/>
      </mask>
      <mask id="css-id2">
        <linearGradient id="css-id3" gradientUnits="userSpaceOnUse" x1="194179" y1="61185.8" x2="194179" y2="135407">
          <stop offset="0" stopOpacity="0" stopColor="#fff"/>
          <stop offset=".388" stopColor="#fff"/>
          <stop offset="1" stopOpacity=".831" stopColor="#fff"/>
        </linearGradient>
        <path fill="url(#css-id3)" d="M147890 61036h92578v74521h-92578z"/>
      </mask>
    </defs>
    <g id="Layer_x0020_1">
      <g id="_513085304">
        <path fill="#2062af" d="M268517 300922l-120369 32411-120371-32411L0 0h296297z"/>
        <path fill="#3c9cd7" d="M148146 24374v283109l273 74 97409-26229 22485-256954z"/>
        <path fill="#fff" d="M148040 99617l-86153 35880 2857 35524 83296-35614 88604-37883 3674-36339-92278 38432z"/>
        <path mask="url(#css-id0)" fill="url(#css-id6)" d="M61887 135497l2857 35524 83295-35614V99617z"/>
        <path mask="url(#css-id2)" fill="url(#css-id7)" d="M240318 61186l-92278 38431v35790l88604-37883z"/>
        <path fill="url(#css-id5)" d="M62019 135497l2858 35524 127806 407-2859 47365-42055 11840-40428-10208-2450-29399H67327l4900 56756 75950 22457 75538-22050 9800-112692z"/>
        <path className="fill-[#000] fill-opacity-[0.05098]" d="M148040 135497H61888l2857 35524 83295 266v-35790zm0 95022l-408 114-40422-10208-2450-29399H67197l4899 56756 75944 22457v-39720z"/>
        <path fill="url(#css-id4)" d="M54129 61186h186189l-3674 36339H58620l-4491-36339z"/>
        <path className="fill-[#000] fill-opacity-[0.05098]" d="M148040 61186H54129l4491 36339h89420z"/>
      </g>
    </g>
  </svg>
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347z" fill="url(#supabase-Linear1)" fillRule="nonzero" transform="translate(19.834 12.62) scale(4.33237)"/>
    <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347z" fill="url(#supabase-Linear2)" fillRule="nonzero" transform="translate(19.834 12.62) scale(4.33237)"/>
    <path d="M216.165 21.593c12.386-15.6 37.51-7.053 37.804 12.867l1.915 291.356H62.426c-35.486 0-55.277-40.984-33.208-68.776L216.165 21.593z" fill="#3ecf8e" fillRule="nonzero"/>
    <defs>
      <linearGradient id="supabase-Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(22.753 -109.622 161.61) scale(43.5812)">
        <stop offset="0" stopColor="#249361"/>
        <stop offset="1" stopColor="#3ecf8e"/>
      </linearGradient>
      <linearGradient id="supabase-Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="scale(39.0687) rotate(62.022 -.188 1.161)">
        <stop offset="0" stopOpacity=".2"/>
        <stop offset="1" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const N8NIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 179.2c0 28.267-23.51 51.2-52.522 51.2-24.448 0-45.014-16.32-50.86-38.4h-73.3c-12.843 0-23.787 9.045-25.9 21.397l-2.154 12.63A50.917 50.917 0 01290.197 256c8.79 7.552 15.02 18.005 17.067 29.973l2.133 12.63c2.262 12.458 13.291 21.546 25.942 21.397l20.8 0c5.824-22.08 26.39-38.4 50.859-38.4 29.013 0 52.5 22.933 52.5 51.2 0 28.267-23.53 51.2-52.5 51.2-24.47 0-45.014-16.32-50.86-38.4l-20.8 0c-25.685 0-47.573-18.09-51.797-42.773l-2.154-12.63c-2.262-12.437-13.27-21.525-25.899-21.397h-21.461c-6.57 20.992-26.582 36.267-50.262 36.267s-43.69-15.275-50.24-36.267H84.148c-6.571 20.992-26.582 36.267-50.24 36.267-29.014 0-52.523-22.934-52.523-51.2 0-28.267 23.51-51.2 52.523-51.2 25.237 0 46.336 17.386 51.37 40.533h28.523c5.035-23.147 26.133-40.533 51.37-40.533 25.26 0 46.337 17.386 51.371 40.533h20.31c12.821 0 23.786-9.045 25.877-21.397l2.176-12.63c4.224-24.682 26.133-42.773 51.798-42.773l73.3 0c5.846-22.08 26.412-38.4 50.86-38.4 29.018 0 52.528 22.933 52.528 51.2zm-26.24 0c0 14.144-11.776 25.6-26.282 25.6-14.507 0-26.24-11.456-26.24-25.6 0-14.144 11.733-25.6 26.24-25.6 14.506 0 26.26 11.456 26.26 25.6zm-433.259 100.267c14.507 0 26.24-11.456 26.24-25.6 0-14.144-11.733-25.6-26.24-25.6-14.506 0-26.261 11.456-26.261 25.6 0 14.144 11.733 25.6 26.24 25.6zm131.264 0c14.507 0 26.262-11.456 26.262-25.6 0-14.144-11.734-25.6-26.24-25.6-14.507 0-26.262 11.456-26.262 25.6 0 14.144 11.734 25.6 26.24 25.6zm223.19 78.933c14.507 0 26.24-11.456 26.24-25.6 0-14.144-11.733-25.6-26.24-25.6-14.507 0-26.24 11.456-26.24 25.6 0 14.144 11.733 25.6 26.24 25.6z" fill="#ea4b71"/>
  </svg>
);

const CIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 109.19 122.88" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#3949AB" fillRule="evenodd" clipRule="evenodd" d="M107.81,92.16c0.86-1.48,1.39-3.16,1.39-4.66V35.38c0-1.5-0.53-3.17-1.39-4.66L54.6,61.44L107.81,92.16 L107.81,92.16L107.81,92.16z"/>
    <path fill="#283593" fillRule="evenodd" clipRule="evenodd" d="M59.33,121.75l45.14-26.06c1.3-0.75,2.48-2.05,3.34-3.53L54.6,61.44L1.39,92.16c0.86,1.48,2.04,2.78,3.34,3.53 l45.14,26.06C52.47,123.25,56.72,123.25,59.33,121.75L59.33,121.75L59.33,121.75z"/>
    <path fill="#5C6BC0" fillRule="evenodd" clipRule="evenodd" d="M107.81,30.72c-0.86-1.48-2.04-2.78-3.34-3.53L59.33,1.13c-2.6-1.5-6.86-1.5-9.46,0L4.73,27.19 C2.13,28.69,0,32.38,0,35.38V87.5c0,1.5,0.53,3.17,1.39,4.66L54.6,61.44L107.81,30.72L107.81,30.72L107.81,30.72z"/>
    <path fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M54.6,97.84c-20.07,0-36.4-16.33-36.4-36.4s16.33-36.4,36.4-36.4c12.95,0,25.03,6.97,31.52,18.19l-15.75,9.12 c-3.25-5.62-9.29-9.1-15.77-9.1c-10.04,0-18.2,8.16-18.2,18.2c0,10.03,8.16,18.2,18.2,18.2c6.48,0,12.52-3.49,15.77-9.1l15.75,9.12 C79.63,90.87,67.55,97.84,54.6,97.84L54.6,97.84L54.6,97.84z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 640 640" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/>
  </svg>
);

// ==========================================
// TOOLS DATA WITH PROFICIENCY & GROUPS
// ==========================================

const tools: Tool[] = [
  {
    name: 'Python',
    category: 'Language',
    group: 'languages',
    icon: PythonIcon,
    description: 'Scripting, backend systems, and rapid automation prototyping.',
    glowColor: '55, 118, 171',
    proficiency: 65,
    experience: '3+ Years',
    projectsCount: '18 Completed',
    focusAreas: ['FastAPI & Flask', 'Automation Scripts', 'Data ETL Pipelines'],
  },
  {
    name: 'Claude',
    category: 'AI Assistant',
    group: 'tools',
    icon: ClaudeIcon,
    description: 'Reasoning, advanced prompt engineering, and intelligent agent flows.',
    glowColor: '217, 119, 82',
    proficiency: 85,
    experience: '1.5+ Years',
    projectsCount: '40+ Pipelines',
    focusAreas: ['Agentic Workflows', 'Prompt Engineering', 'Structured JSON outputs'],
  },
  {
    name: 'JavaScript',
    category: 'Language',
    group: 'languages',
    icon: JavaScriptIcon,
    description: 'Dynamic frontend interactions, asynchronous logic, and runtime building.',
    glowColor: '247, 223, 30',
    proficiency: 40,
    experience: '4+ Years',
    projectsCount: '25+ Websites',
    focusAreas: ['ES6+ Syntax', 'DOM Manipulation', 'Async/Await & APIs'],
  },
  {
    name: 'HTML',
    category: 'Frontend',
    group: 'languages',
    icon: HTMLIcon,
    description: 'Semantic markup structure for accessible and SEO-friendly web products.',
    glowColor: '227, 79, 38',
    proficiency: 90,
    experience: '5+ Years',
    projectsCount: '40+ Projects',
    focusAreas: ['Semantic Web', 'W3C Accessibility', 'SEO Best Practices'],
  },
  {
    name: 'Supabase',
    category: 'Database',
    group: 'backend',
    icon: SupabaseIcon,
    description: 'Postgres backend hosting, robust auth, and realtime database subscriptions.',
    glowColor: '62, 207, 142',
    proficiency: 80,
    experience: '2+ Years',
    projectsCount: '12 Apps',
    focusAreas: ['Postgres SQL Queries', 'Row Level Security (RLS)', 'Realtime Channels'],
  },
  {
    name: 'n8n',
    category: 'Automation',
    group: 'tools',
    icon: N8NIcon,
    description: 'Visual event-driven pipelines and advanced API endpoint orchestration.',
    glowColor: '255, 108, 55',
    proficiency: 80,
    experience: '1.5+ Years',
    projectsCount: '30+ Active Workflows',
    focusAreas: ['Self-hosted setups', 'Webhook Orchestration', 'Node Customization'],
  },
  {
    name: 'C',
    category: 'Language',
    group: 'languages',
    icon: CIcon,
    description: 'Low-level software development, computer hardware control, and memory structures.',
    glowColor: '101, 154, 210',
    proficiency: 40,
    experience: '1+ Year',
    projectsCount: '5 Projects',
    focusAreas: ['Pointer Operations', 'Memory Allocation', 'Embedded Systems'],
  },
  {
    name: 'CSS',
    category: 'Styling',
    group: 'languages',
    icon: CSSIcon,
    description: 'Modern styling systems, layout configurations, animations, and fluid responsive design.',
    glowColor: '21, 114, 182',
    proficiency: 80,
    experience: '5+ Years',
    projectsCount: '40+ Interfaces',
    focusAreas: ['Flexbox & Grid layouts', 'TailwindCSS / Utility frameworks', 'Custom Keyframes'],
  },
  {
    name: 'GitHub',
    category: 'Platform',
    group: 'tools',
    icon: GitHubIcon,
    description: 'Version control systems, distributed code hosting, and actions pipeline automation.',
    glowColor: '255, 255, 255',
    proficiency: 40,
    experience: '4+ Years',
    projectsCount: '50+ Repositories',
    focusAreas: ['Git Branching Models', 'GitHub Actions CI/CD', 'Code Review & PRs'],
  },
];

// Map numerical score to professional qualitative rank labels
const getProficiencyLabel = (score: number): string => {
  if (score >= 90) return 'Expert / Core Stack';
  if (score >= 75) return 'Advanced / Fluent';
  if (score >= 60) return 'Proficient / Active';
  return 'Familiar / Exploring';
};

const StackBentoGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<'all' | ToolGroup>('all');

  // Stagger entry animations for headers and cards
  useEffect(() => {
    if (reducedMotion) {
      gsap.set(
        [
          ...(headerRef.current?.children || []),
          ...cardsRef.current.filter(Boolean),
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Carousel cards stagger
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, x: 50, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Re-run card animations when filter selection changes
  useEffect(() => {
    if (reducedMotion) return;
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.96, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [selectedGroup, reducedMotion]);

  // Modal GSAP Animation
  useEffect(() => {
    if (modalOpen && activeTool) {
      if (reducedMotion) {
        setBarWidth(activeTool.proficiency);
        return;
      }
      // Calculate dynamic scatter metrics based on proficiency percentage
      const targetScale = 0.75 + (activeTool.proficiency / 100) * 0.65; 
      const targetOpacity = 0.12 + (activeTool.proficiency / 100) * 0.12; 
      const targetBlur = 75 + (activeTool.proficiency / 100) * 45; 

      // Open transition
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalContentRef.current,
        { scale: 0.9, y: 20 },
        { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
      // Cinematic brand light scattering animation proportional to progress
      gsap.fromTo(
        glowRef.current,
        { scale: 0.05, opacity: 0, filter: 'blur(30px)' },
        { 
          scale: targetScale, 
          opacity: targetOpacity, 
          filter: `blur(${targetBlur}px)`,
          duration: 2.2, 
          ease: 'power3.out' 
        }
      );
      
      // Delay progress bar to run after modal enters
      const timer = setTimeout(() => {
        setBarWidth(activeTool.proficiency);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setBarWidth(0);
    }
  }, [modalOpen, activeTool, reducedMotion]);

  const handleCardClick = (tool: Tool) => {
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
      scale: 0.9,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(glowRef.current, {
      scale: 0.05,
      opacity: 0,
      filter: 'blur(30px)',
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setModalOpen(false);
        setActiveTool(null);
      },
    });
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    el.style.transform = `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) scale3d(1.01, 1.01, 1.01)`;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  // Filter tools based on active group state
  const filteredTools = tools.filter(
    (t) => selectedGroup === 'all' || t.group === selectedGroup
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative">
        {/* Header & Navigation controls */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              The Toolkit
            </p>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Stack that powers
              <br />
              <span className="text-zinc-400">the craft</span>
            </h2>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scrollCarousel('left')}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/30 text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/30 text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Categories Tab Filtering Navigation Row */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-zinc-900 pb-6">
          {(
            [
              { id: 'all', label: 'All Stack' },
              { id: 'languages', label: 'Languages & Frontend' },
              { id: 'backend', label: 'Backend & DB' },
              { id: 'tools', label: 'Workflows & Tools' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedGroup(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 backdrop-blur-md border ${
                selectedGroup === tab.id
                  ? 'bg-white border-white text-black shadow-lg shadow-white/5'
                  : 'bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Slidable Carousel track */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-2 -mx-2 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredTools.map((tool, index) => {
            const LogoComponent = tool.icon;

            return (
              <div
                key={tool.name}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => handleCardClick(tool)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] h-[340px] group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/10 p-6 backdrop-blur-md transition-[border-color,box-shadow] duration-300 cursor-pointer hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(var(--glow),0.05)]"
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  scrollSnapAlign: 'start',
                  ['--glow' as any]: tool.glowColor,
                }}
              >
                {/* Brand-Specific Spotlight Gradient on Hover */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(220px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(${tool.glowColor}, 0.15), transparent 80%)`,
                  }}
                />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    {/* Top row: Icon and Category badge */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center justify-center rounded-2xl bg-zinc-900/80 border border-zinc-800/60 p-3.5 text-zinc-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] w-14 h-14">
                        <LogoComponent className="h-full w-full" />
                      </div>
                      <span className="rounded-full border border-zinc-800/50 bg-zinc-900/60 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 backdrop-blur-sm shadow-sm">
                        {tool.category}
                      </span>
                    </div>

                    {/* Mid row: Name and Description */}
                    <h3 className="font-bold text-white text-xl md:text-2xl tracking-wide mb-3">
                      {tool.name}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                  {/* Bottom: Action bar showing stats prompt */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-white transition-colors duration-300">
                      Explore Proficiency
                    </span>
                    {/* Pulse element */}
                    <span className="relative flex h-2 w-2">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: `rgb(${tool.glowColor})` }}
                      ></span>
                      <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ backgroundColor: `rgb(${tool.glowColor})` }}
                      ></span>
                    </span>
                  </div>
                </div>

                {/* Bottom subtle edge light matching brand color */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to right, transparent, rgba(${tool.glowColor}, 0.3), transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* PREMIUM DETAILS POPUP MODAL */}
      {modalOpen && activeTool && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={handleCloseModal}
        >
          <div
            ref={modalContentRef}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950 p-6 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 0 50px -10px rgba(${activeTool.glowColor}, 0.15), inset 0 1px 1px rgba(255,255,255,0.05)`,
            }}
          >
            {/* Ambient Background Spotlight matching Brand Color */}
            <div
              ref={glowRef}
              className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
              style={{ backgroundColor: `rgb(${activeTool.glowColor})`, transformOrigin: 'center center' }}
            />

            {/* Header section with brand logo & close button */}
            <div className="flex items-start justify-between relative mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 p-3.5 text-zinc-300 w-16 h-16 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
                  {React.createElement(activeTool.icon, { className: 'h-full w-full' })}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {activeTool.category}
                  </span>
                  <h4 className="text-2xl font-bold text-white tracking-wide">
                    {activeTool.name}
                  </h4>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="rounded-full border border-zinc-800/80 bg-zinc-900/60 p-2 text-zinc-400 transition-all duration-300 hover:border-zinc-700 hover:text-white"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body content with qualitative progress rating (Recruiter-Friendly) */}
            <div className="relative">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Sparkles size={12} style={{ color: `rgb(${activeTool.glowColor})` }} />
                  Comfort Rating
                </span>
                {/* Qualititative Level instead of raw numerical percentage */}
                <span
                  className="text-sm font-extrabold uppercase tracking-wide px-3 py-1 rounded-full border bg-zinc-900/60 border-zinc-800/80"
                  style={{ color: `rgb(${activeTool.glowColor})`, borderColor: `rgba(${activeTool.glowColor}, 0.2)` }}
                >
                  {getProficiencyLabel(activeTool.proficiency)}
                </span>
              </div>

              {/* Progress track */}
              <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/30 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${barWidth}%`,
                    background: `linear-gradient(to right, rgb(${activeTool.glowColor}), rgba(${activeTool.glowColor}, 0.5))`,
                    boxShadow: `0 0 10px rgba(${activeTool.glowColor}, 0.5)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StackBentoGrid;
