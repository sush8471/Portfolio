'use client'

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'

interface TabsSubtleContextValue {
  selectedValue: string
  onSelect: (value: string) => void
  idPrefix: string
  layoutId: string
}

const TabsSubtleContext = createContext<TabsSubtleContextValue | null>(null)

export function useTabsSubtleContext() {
  const ctx = useContext(TabsSubtleContext)
  if (!ctx) throw new Error('TabsSubtleItem/TabsSubtlePanel must be used within TabsSubtle')
  return ctx
}

export interface TabsSubtleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  idPrefix?: string
}

export const TabsSubtle = forwardRef<HTMLDivElement, TabsSubtleProps>(
  (
    { children, value, defaultValue, onValueChange, idPrefix: idPrefixProp, className, ...props },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const generatedId = useId()
    const layoutId = useId()
    const idPrefix = idPrefixProp ?? generatedId

    const items = useMemo(
      () =>
        Children.toArray(children).filter(
          (child): child is ReactElement<{ value: string }> =>
            isValidElement(child) && child.type === TabsSubtleItem,
        ),
      [children],
    )

    const panels = useMemo(
      () =>
        Children.toArray(children).filter(
          (child) => isValidElement(child) && child.type !== TabsSubtleItem,
        ),
      [children],
    )

    const isControlled = value !== undefined
    const [internal, setInternal] = useState(defaultValue ?? items[0]?.props.value ?? '')
    const selectedValue = isControlled ? value : internal

    const onSelect = (next: string) => {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const els = Array.from(
        containerRef.current?.querySelectorAll('[role="tab"]') ?? [],
      ) as HTMLElement[]
      const currentIdx = els.findIndex((el) => el === document.activeElement)
      if (currentIdx === -1) return

      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        const dir = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : -1
        const next = (currentIdx + dir + els.length) % els.length
        els[next]?.focus()
        els[next]?.click()
      } else if (e.key === 'Home') {
        e.preventDefault()
        els[0]?.focus()
        els[0]?.click()
      } else if (e.key === 'End') {
        e.preventDefault()
        els[els.length - 1]?.focus()
        els[els.length - 1]?.click()
      }
    }

    const tablistNode = (
      <div
        ref={(node) => {
          ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-flex items-center gap-0.5 select-none overflow-x-auto max-w-full',
          className,
        )}
        {...props}
      >
        {items}
      </div>
    )

    return (
      <TabsSubtleContext.Provider value={{ selectedValue, onSelect, idPrefix, layoutId }}>
        {panels.length > 0 ? (
          <div className="flex flex-col gap-2">
            {tablistNode}
            {panels}
          </div>
        ) : (
          tablistNode
        )}
      </TabsSubtleContext.Provider>
    )
  },
)
TabsSubtle.displayName = 'TabsSubtle'

export interface TabsSubtleItemProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string
  icon?: ReactNode
  label: string
  pillClassName?: string
}

export const TabsSubtleItem = forwardRef<HTMLButtonElement, TabsSubtleItemProps>(
  ({ value, icon, label, className, pillClassName, ...props }, ref) => {
    const { selectedValue, onSelect, idPrefix, layoutId } = useTabsSubtleContext()
    const reduceMotion = useReducedMotion()
    const isSelected = selectedValue === value

    return (
      <button
        ref={ref}
        type="button"
        id={`${idPrefix}-tab-${value}`}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`${idPrefix}-panel-${value}`}
        tabIndex={isSelected ? 0 : -1}
        onPointerDown={(e) => e.preventDefault()}
        onClick={() => onSelect(value)}
        className={cn(
          'relative z-10 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-wider cursor-pointer bg-transparent border-none outline-none whitespace-nowrap',
          'transition-colors duration-200 motion-reduce:transition-none',
          isSelected ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white',
          'focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black',
          className,
        )}
        {...props}
      >
        {isSelected && (
          <motion.span
            layoutId={reduceMotion ? undefined : `${layoutId}-pill`}
            className={cn(
              'absolute inset-0 -z-10 rounded-lg bg-zinc-800/90 shadow-sm border border-zinc-700/50',
              pillClassName,
            )}
            transition={reduceMotion ? { duration: 0 } : springs.settle}
          />
        )}
        {icon && (
          <span aria-hidden="true" className="shrink-0 [&_svg]:size-4">
            {icon}
          </span>
        )}
        <span>{label}</span>
      </button>
    )
  },
)
TabsSubtleItem.displayName = 'TabsSubtleItem'

export interface TabsSubtlePanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
  value: string
  children: ReactNode
}

export const TabsSubtlePanel = forwardRef<HTMLDivElement, TabsSubtlePanelProps>(
  ({ value, children, className, ...props }, ref) => {
    const { selectedValue, idPrefix } = useTabsSubtleContext()
    const isSelected = selectedValue === value

    return (
      <div
        ref={ref}
        id={`${idPrefix}-panel-${value}`}
        role="tabpanel"
        aria-labelledby={`${idPrefix}-tab-${value}`}
        hidden={!isSelected}
        tabIndex={0}
        className={cn('outline-none', className)}
        {...props}
      >
        {isSelected && children}
      </div>
    )
  },
)
TabsSubtlePanel.displayName = 'TabsSubtlePanel'
