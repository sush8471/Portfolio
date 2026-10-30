import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'motion/react'
import {
  FOOTER_SOCIALS,
  FooterSocialLinks,
  type FooterSocialItem,
} from '@/components/ui/footer'
import { cn } from '@/lib/utils'

function Signature({
  text,
  label,
  fontFamily,
}: {
  text: string
  label: string
  fontFamily: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const reduceMotion = useReducedMotion()
  const [inView, setInView] = useState(false)
  const drawn = Boolean(reduceMotion) || inView

  useEffect(() => {
    const node = ref.current
    if (!node || reduceMotion) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  const width = Math.max(300, text.length * 24)
  const cx = width / 2
  const DASH = Math.max(600, text.length * 70)

  return (
    <svg
      ref={ref}
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} 76`}
      className="h-14 w-auto overflow-visible select-none"
    >
      <text
        x={cx}
        y="52"
        textAnchor="middle"
        fontSize="54"
        strokeWidth="1.2"
        strokeDasharray={DASH}
        style={{
          fontFamily: fontFamily || "'Caveat', cursive",
          strokeDashoffset: drawn ? 0 : DASH,
          fillOpacity: drawn ? 1 : 0,
          transition: reduceMotion
            ? 'none'
            : 'stroke-dashoffset 1.8s ease-in-out, fill-opacity 0.8s ease-out 1.3s',
        }}
        className="fill-white stroke-white"
      >
        {text}
      </text>
    </svg>
  )
}

export interface FooterSignatureProps extends ComponentPropsWithoutRef<'footer'> {
  signature?: string
  signatureLabel?: string
  signatureFont?: string
  socials?: FooterSocialItem[]
  copyright?: ReactNode
}

export const FooterSignature = forwardRef<HTMLElement, FooterSignatureProps>(
  (
    {
      signature = 'Being Sushant',
      signatureLabel = 'Signed, Being Sushant',
      signatureFont = "var(--font-handwriting, 'Caveat'), cursive",
      socials = FOOTER_SOCIALS,
      copyright = '© 2026 Sushant Chaudhary',
      className,
      ...props
    },
    ref,
  ) => (
    <footer
      ref={ref}
      className={cn('w-full border-t border-zinc-900 bg-black py-4', className)}
      {...props}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
        {/* Center Signature (desktop order 2) */}
        <div className="text-white md:order-2 flex justify-center">
          <Signature text={signature} label={signatureLabel} fontFamily={signatureFont} />
        </div>

        {/* Left Copyright & Right Socials */}
        <div className="flex w-full items-center justify-between md:contents">
          {copyright && (
            <p className="text-xs leading-5 text-zinc-500 md:order-1">{copyright}</p>
          )}
          <FooterSocialLinks
            items={socials}
            className="-me-3 md:order-3 md:justify-self-end"
          />
        </div>
      </div>
    </footer>
  ),
)
FooterSignature.displayName = 'FooterSignature'
