import Image from "next/image"
import KeenSliderWrapper from "../ui/slider"
import { Button } from "../ui/button"

export default function HeroNext() {
  return (
    <KeenSliderWrapper autoplay={false} slideContainerClassName="h-[200px] md:h-[250px]  lg:h-[400px]">
        <section className="keen-slider__slide  number-slide1 bg-gradient-to-br md:-mt-16 py-5 from-teal-500 to-teal-600 ">
          <div className="lg:px-20 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-10 leading-tight">
                  We're here to serve your local mobile needs.
                </h2>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
                >
                  Shop Now
                </Button>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  <Image
                    src="landing/hand.png"
                    alt="Blue iPhone in hand"
                    className="w-48 md:w- lg:w-96 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      <div className="keen-slider__slide number-slide2 bg-[#0e0a4d00]">2</div>
      <div className="keen-slider__slide number-slide3">3</div>
      <div className="keen-slider__slide number-slide4">4</div>
      <div className="keen-slider__slide number-slide5">5</div>
      <div className="keen-slider__slide number-slide6">6</div>
    </KeenSliderWrapper>
  )
}
