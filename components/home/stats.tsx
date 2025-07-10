export function Stats() {
    return (
        <section className="px-4 py-12 md:py-16 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">12+</div>
                        <p className="text-gray-600 font-medium">Years Experience</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">50K+</div>
                        <p className="text-gray-600 font-medium">Happy Customers</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">99%</div>
                        <p className="text-gray-600 font-medium">On-Time Delivery</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
                        <p className="text-gray-600 font-medium">Customer Support</p>
                    </div>
                </div>
            </div>
        </section>

    )
}