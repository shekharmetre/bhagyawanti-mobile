'use client'

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

interface Breakpoints {
  [key: number]: number // screen width in px: perView count
}

interface Props extends PropsWithChildren {
  autoplay?: boolean
  slideContainerClassName?: string
  spacing?: number
  showArrows?: boolean
  showLeftArrow?: boolean
  showRightArrow?: boolean
  autoplayDelay?: number
  perView?: number
  breakpoints?: Breakpoints
  showPagination?: boolean
  paginationClassName?: string
}

export default function UnistSliderWrapper({
  children,
  autoplay = false,
  slideContainerClassName = '',
  spacing = 16,
  showArrows = true,
  showLeftArrow = true,
  showRightArrow = true,
  autoplayDelay = 4000,
  perView = 1,
  breakpoints = {},
  showPagination = false,
  paginationClassName = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [childCount, setChildCount] = useState(0)
  const [currentPerView, setCurrentPerView] = useState(perView)

  // Update perView on screen resize
  const updatePerView = () => {
    const width = window.innerWidth
    let matched = perView

    for (const bp of Object.keys(breakpoints).map(Number).sort((a, b) => a - b)) {
      if (width >= bp) {
        matched = breakpoints[bp]
      }
    }

    setCurrentPerView(matched)
  }

  useEffect(() => {
    updatePerView()
    window.addEventListener('resize', updatePerView)
    return () => window.removeEventListener('resize', updatePerView)
  }, [breakpoints])

  // Scroll to child
  const scrollToChild = (index: number) => {
    const container = containerRef.current
    if (!container) return
    const children = Array.from(container.children)
    if (children[index]) {
      children[index].scrollIntoView({ behavior: 'smooth', inline: 'start' })
      setCurrentIndex(index)
    }
  }

  // Autoplay
  useEffect(() => {
    if (!autoplay || childCount === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + Math.ceil(currentPerView)) % childCount
        scrollToChild(next)
        return next
      })
    }, autoplayDelay)

    return () => clearInterval(interval)
  }, [autoplay, childCount, currentPerView])

  // Count children on mount
  useEffect(() => {
    if (containerRef.current) {
      setChildCount(containerRef.current.children.length)
    }
  }, [children])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`flex overflow-x-auto no-scrollbar scroll-smooth ${slideContainerClassName}`}
        style={{ gap: `${spacing}px` }}
      >
        {React.Children.map(children, (child) => (
          <div
            className="shrink-0"
            style={{
              scrollSnapAlign: 'start',
              flex: `0 0 calc(${100 / currentPerView}% - ${(spacing * (currentPerView - 1)) / currentPerView}px)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && childCount > currentPerView && (
        <>
          {showLeftArrow && (
            <Arrow
              left
              disabled={currentIndex === 0}
              onClick={() =>
                scrollToChild(Math.max(0, currentIndex - Math.ceil(currentPerView)))
              }
            />
          )}
          {showRightArrow && (
            <Arrow
              disabled={currentIndex + currentPerView >= childCount}
              onClick={() =>
                scrollToChild(
                  Math.min(childCount - Math.ceil(currentPerView), currentIndex + Math.ceil(currentPerView))
                )
              }
            />
          )}
        </>
      )}

      {showPagination && (
        <div className={`flex justify-center mt-4 gap-2 ${paginationClassName}`}>
          {Array.from({ length: Math.ceil(childCount / currentPerView) }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToChild(i * Math.floor(currentPerView))}
              className={`w-2 h-2 rounded-full ${
                i === Math.floor(currentIndex / currentPerView)
                  ? 'bg-black'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type ArrowProps = {
  disabled: boolean
  left?: boolean
  onClick: () => void
}

function Arrow({ disabled, left, onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 ${
        left ? 'left-2' : 'right-2'
      } bg-white shadow-md rounded-full p-1 z-10 ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'
      }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        {left ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  )
}
