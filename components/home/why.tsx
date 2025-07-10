import { Award, Clock, Heart, Shield, Truck, Users2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function Why() {
    return (
        <section className="px-4 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We've built our reputation on trust, quality, and exceptional service over the past 12 years.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Genuine Products</h3>
                            <p className="text-gray-600">
                                All our products are authentic and come with official warranty. No fake or refurbished items.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">On-Time Delivery</h3>
                            <p className="text-gray-600">
                                99% on-time delivery record. We value your time and ensure prompt delivery every time.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">12 Years Experience</h3>
                            <p className="text-gray-600">
                                Over a decade of expertise in mobile technology and customer service excellence.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users2 className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
                            <p className="text-gray-600">
                                Our knowledgeable team provides expert advice and 24/7 customer support.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Delivery</h3>
                            <p className="text-gray-600">
                                Free delivery on orders above ₹999. Fast and secure shipping across India.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. We go the extra mile to ensure you're happy.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}