'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from 'react'
import reactLogo from 'runeicons-brands/svg/react.svg'
import nextLogo from 'runeicons-brands/svg/nextdotjs.svg'
import typescriptLogo from 'runeicons-brands/svg/typescript.svg'
import motionLogo from 'runeicons-brands/svg/motion.svg'
import radixLogo from 'runeicons-brands/svg/radix-ui.svg'
import shadcnLogo from 'runeicons-brands/svg/shadcn-ui.svg'
import npmLogo from 'runeicons-brands/svg/npm.svg'
import vercelLogo from 'runeicons-brands/svg/vercel.svg'
import { cn } from '@/lib/utils'

export type SocialProofLogo = {
  name: string
  src: string
  invert?: 'dark' | 'light' | boolean
  href?: string
  category?: string
  glowColor?: string
  proficiency?: number
}

export const SOCIAL_PROOF_LOGOS: SocialProofLogo[] = [
  {
    name: 'React',
    src: reactLogo,
    invert: 'dark',
    href: 'https://react.dev',
    category: 'Frontend Library',
    glowColor: '97, 218, 251',
    proficiency: 92,
  },
  {
    name: 'Next.js',
    src: nextLogo,
    invert: 'dark',
    href: 'https://nextjs.org',
    category: 'Fullstack Framework',
    glowColor: '255, 255, 255',
    proficiency: 90,
  },
  {
    name: 'TypeScript',
    src: typescriptLogo,
    href: 'https://www.typescriptlang.org',
    category: 'Typed Language',
    glowColor: '49, 120, 198',
    proficiency: 90,
  },
  {
    name: 'Motion',
    src: motionLogo,
    invert: 'dark',
    href: 'https://motion.dev',
    category: 'Animation Engine',
    glowColor: '255, 0, 128',
    proficiency: 86,
  },
  {
    name: 'Radix UI',
    src: radixLogo,
    invert: 'dark',
    href: 'https://www.radix-ui.com',
    category: 'UI Primitives',
    glowColor: '255, 255, 255',
    proficiency: 88,
  },
  {
    name: 'shadcn/ui',
    src: shadcnLogo,
    href: 'https://ui.shadcn.com',
    category: 'Component System',
    glowColor: '255, 255, 255',
    proficiency: 94,
  },
  {
    name: 'npm',
    src: npmLogo,
    href: 'https://www.npmjs.com',
    category: 'Package Ecosystem',
    glowColor: '203, 56, 55',
    proficiency: 88,
  },
  {
    name: 'Vercel',
    src: vercelLogo,
    invert: 'dark',
    href: 'https://vercel.com',
    category: 'Cloud Platform',
    glowColor: '255, 255, 255',
    proficiency: 90,
  },
]

export const LOGOS_TITLE = 'Built on the tools you already ship'
export const LOGOS_DESCRIPTION =
  'Written in TypeScript for React and Next.js, animated with Motion, shaped by Radix patterns and installed through the shadcn CLI.'

export interface LogosBlockProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  logos?: SocialProofLogo[]
}

export const LogosSection = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'> & { labelledBy: string }
>(({ labelledBy, className, children, ...props }, ref) => (
  <section
    ref={ref}
    aria-labelledby={labelledBy}
    className={cn('w-full bg-(--color-bg) px-6 py-16 sm:px-8 md:py-24', className)}
    {...props}
  >
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10">{children}</div>
  </section>
))
LogosSection.displayName = 'LogosSection'

export function LogosHeader({
  id,
  title,
  description,
}: {
  id: string
  title: ReactNode
  description?: ReactNode
}) {
  if (!title && !description) return null

  return (
    <div className="flex max-w-md flex-col gap-2">
      {title && (
        <h2
          id={id}
          className="text-balance text-xl font-normal tracking-tight text-(--color-fg) md:text-2xl"
        >
          {title}
        </h2>
      )}
      {description && (
        <p className="text-pretty text-sm text-(--color-muted) md:text-base">{description}</p>
      )}
    </div>
  )
}

export function LogoImage({
  logo,
  className,
  style,
}: {
  logo: SocialProofLogo
  className?: string
  style?: CSSProperties
}) {
  return (
    <span className={cn('relative flex items-center justify-center h-7 w-24 sm:h-8 sm:w-28', className)} style={style}>
      <img
        src={logo.src}
        alt={logo.name}
        className={cn(
          'max-h-full max-w-full object-contain',
          (logo.invert === 'dark' || logo.invert === true) && 'invert',
          logo.invert === 'light' && 'invert-0',
        )}
        loading="lazy"
      />
    </span>
  )
}

export function LogoMark({
  logo,
  linked = true,
  className,
  imageClassName,
  imageStyle,
  onClick,
}: {
  logo: SocialProofLogo
  linked?: boolean
  className?: string
  imageClassName?: string
  imageStyle?: CSSProperties
  onClick?: () => void
}) {
  const image = <LogoImage logo={logo} className={imageClassName} style={imageStyle} />
  const base = 'flex size-full min-h-11 items-center justify-center select-none'

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={`${logo.name} — Click to view proficiency`}
        aria-label={`View ${logo.name} proficiency`}
        className={cn(
          base,
          'rounded-md outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-accent)',
          className,
        )}
      >
        {image}
      </button>
    )
  }

  if (linked && logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        title={`${logo.name} official site`}
        aria-label={`Visit ${logo.name} website`}
        className={cn(
          base,
          'rounded-md outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-accent)',
          className,
        )}
      >
        {image}
      </a>
    )
  }

  return <span className={cn(base, className)}>{image}</span>
}

export interface LogoGridProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  logos: SocialProofLogo[]
  linked?: boolean
  variant?: 'tabular' | 'grid'
  imageClassName?: string
  imageStyle?: (index: number) => CSSProperties | undefined
  onSelectLogo?: (logo: SocialProofLogo) => void
}

/**
 * Tabular logo layout matching the 3-column / 8-logo design:
 * Column 1 (Span 1): React (top), Radix UI (bottom) [Divided by right vertical border]
 * Column 2 (Span 2): Next.js & TS (top), shadcn/ui & npm (bottom) [Divided by right vertical border]
 * Column 3 (Span 1): Motion (top), Vercel (bottom)
 */
export const TabularLogoGrid = forwardRef<HTMLDivElement, LogoGridProps>(
  ({ logos, linked = false, imageClassName, imageStyle, onSelectLogo, className, ...props }, ref) => {
    const reactItem = logos[0] ?? SOCIAL_PROOF_LOGOS[0]
    const nextItem = logos[1] ?? SOCIAL_PROOF_LOGOS[1]
    const tsItem = logos[2] ?? SOCIAL_PROOF_LOGOS[2]
    const motionItem = logos[3] ?? SOCIAL_PROOF_LOGOS[3]
    const radixItem = logos[4] ?? SOCIAL_PROOF_LOGOS[4]
    const shadcnItem = logos[5] ?? SOCIAL_PROOF_LOGOS[5]
    const npmItem = logos[6] ?? SOCIAL_PROOF_LOGOS[6]
    const vercelItem = logos[7] ?? SOCIAL_PROOF_LOGOS[7]

    const renderCell = (item: SocialProofLogo | undefined, index: number) => {
      if (!item) return null
      return (
        <div key={item.name} className="flex h-16 sm:h-20 md:h-24 items-center justify-center p-2">
          <LogoMark
            logo={item}
            linked={linked}
            onClick={onSelectLogo ? () => onSelectLogo(item) : undefined}
            imageClassName={cn('transition-all duration-300', imageClassName)}
            imageStyle={imageStyle?.(index)}
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-4 w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a]',
          className,
        )}
        {...props}
      >
        {/* Column 1: React & Radix UI (Span 1) */}
        <div className="col-span-1 flex flex-col border-r border-zinc-800">
          {renderCell(reactItem, 0)}
          {renderCell(radixItem, 4)}
        </div>

        {/* Column 2: Next.js, TS, shadcn/ui, npm (Span 2) */}
        <div className="col-span-2 grid grid-cols-2 border-r border-zinc-800">
          {renderCell(nextItem, 1)}
          {renderCell(tsItem, 2)}
          {renderCell(shadcnItem, 5)}
          {renderCell(npmItem, 6)}
        </div>

        {/* Column 3: Motion & Vercel (Span 1) */}
        <div className="col-span-1 flex flex-col">
          {renderCell(motionItem, 3)}
          {renderCell(vercelItem, 7)}
        </div>
      </div>
    )
  },
)
TabularLogoGrid.displayName = 'TabularLogoGrid'

export const LogoGrid = forwardRef<HTMLDivElement, LogoGridProps>(
  ({ variant = 'tabular', onSelectLogo, ...props }, ref) => {
    if (variant === 'tabular') {
      return <TabularLogoGrid ref={ref} onSelectLogo={onSelectLogo} {...props} />
    }

    const { logos, linked = true, imageClassName, imageStyle, className, ...rest } = props
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-2 gap-px overflow-hidden rounded-md border border-(--color-border) bg-(--color-border) sm:grid-cols-4',
          className,
        )}
        {...rest}
      >
        {logos.map((logo, index) => (
          <div key={logo.name} className="flex h-20 bg-(--color-bg) sm:h-24 items-center justify-center">
            <LogoMark
              logo={logo}
              linked={linked}
              onClick={onSelectLogo ? () => onSelectLogo(logo) : undefined}
              imageClassName={imageClassName}
              imageStyle={imageStyle?.(index)}
            />
          </div>
        ))}
      </div>
    )
  },
)
LogoGrid.displayName = 'LogoGrid'
