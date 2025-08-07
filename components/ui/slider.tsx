'use client'

import React, { useState, PropsWithChildren } from 'react'
import { useKeenSlider, KeenSliderOptions } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { createAutoplayPlugin } from './plugins/autoplay'

interface Props extends PropsWithChildren {
  autoplay?: boolean
  slideContainerClassName?: string
  config?: KeenSliderOptions
  showPagination?: boolean
  paginationClassName?: string
  showArrows?: boolean
}

export default function KeenSliderWrapper({
  children,
  autoplay = false,
  slideContainerClassName = '',
  config = {},
  showArrows = true,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const defaultConfig: KeenSliderOptions = {
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    mode: 'free',
    renderMode: 'performance',
    rubberband: true,
    slides: {
      perView: 'auto',
      spacing: 16,
    },
    drag: true,
    ...config,
  }

  const isFreeMode = defaultConfig.mode === 'free'

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    defaultConfig,
    !isFreeMode && autoplay ? [createAutoplayPlugin(5000)] : []
  )

  return (
    <div className="navigation-wrapper relative">
      <div ref={sliderRef} className={`keen-slider ${slideContainerClassName}`}>
        {children}
      </div>

      {loaded && instanceRef.current && showArrows && !isFreeMode && (
        <>
          <Arrow
            left
            onClick={(e) => {
              e.stopPropagation()
              instanceRef.current?.prev()
            }}
            disabled={currentSlide === 0}
          />
          <Arrow
            onClick={(e) => {
              e.stopPropagation()
              instanceRef.current?.next()
            }}
            disabled={
              currentSlide >= instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  )
}

type ArrowProps = {
  disabled: boolean
  left?: boolean
  onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}

function Arrow({ disabled, left, onClick }: ArrowProps) {
  return (
    <svg
      onClick={onClick}
      className={`arrow absolute top-1/2 transform -translate-y-1/2 ${
        left ? 'left-2' : 'right-2'
      } w-6 h-6 cursor-pointer ${
        disabled ? 'opacity-30 pointer-events-none' : ''
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
