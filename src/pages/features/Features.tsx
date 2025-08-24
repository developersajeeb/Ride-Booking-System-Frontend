import { Users, Car, Shield, CheckCircle, MapPin, Navigation, CreditCard, MessageSquare, History, Settings, BarChart, DollarSign } from 'lucide-react';

const Features = () => {
    return (
        <div className="min-h-screen">
            <div className="max-w-[1300px] mx-auto px-4 pb-20 pt-28 md:pb-32 md:pt-40">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                        Powerful Features for Everyone
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Discover how our platform connects riders and drivers seamlessly with intuitive tools for all users.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Rider Features */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                        <div className="bg-[#004AAD] p-6">
                            <div className="flex items-center">
                                <Users className="h-8 w-8 text-white" />
                                <h2 className="ml-3 text-2xl font-bold text-white">Rider Features</h2>
                            </div>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <MapPin className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Request rides from any location with precise pickup points</span>
                                </li>
                                <li className="flex items-start">
                                    <Navigation className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Real-time driver tracking with live GPS navigation</span>
                                </li>
                                <li className="flex items-start">
                                    <CreditCard className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Multiple payment options including digital wallets</span>
                                </li>
                                <li className="flex items-start">
                                    <MessageSquare className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">In-app chat with drivers for seamless communication</span>
                                </li>
                                <li className="flex items-start">
                                    <History className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Access ride history and digital receipts</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Driver Features */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                        <div className="bg-[#004AAD] p-6">
                            <div className="flex items-center">
                                <Car className="h-8 w-8 text-white" />
                                <h2 className="ml-3 text-2xl font-bold text-white">Driver Features</h2>
                            </div>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Accept ride requests with flexible availability settings</span>
                                </li>
                                <li className="flex items-start">
                                    <Navigation className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Optimized navigation with turn-by-turn directions</span>
                                </li>
                                <li className="flex items-start">
                                    <DollarSign className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Track earnings and detailed trip analytics</span>
                                </li>
                                <li className="flex items-start">
                                    <MessageSquare className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Direct communication with riders through secure chat</span>
                                </li>
                                <li className="flex items-start">
                                    <Settings className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Manage driver profile and vehicle information</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Admin Features */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                        <div className="bg-[#004AAD] p-6">
                            <div className="flex items-center">
                                <Shield className="h-8 w-8 text-white" />
                                <h2 className="ml-3 text-2xl font-bold text-white">Admin Features</h2>
                            </div>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <BarChart className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Comprehensive dashboard with real-time analytics</span>
                                </li>
                                <li className="flex items-start">
                                    <Users className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Manage riders and drivers with advanced filtering</span>
                                </li>
                                <li className="flex items-start">
                                    <MapPin className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Monitor all active rides on live map</span>
                                </li>
                                <li className="flex items-start">
                                    <Settings className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Configure pricing, zones, and promotions</span>
                                </li>
                                <li className="flex items-start">
                                    <History className="h-5 w-5 text-[#004AAD] dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Generate detailed reports and financial statements</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="inline-flex rounded-md shadow">
                        <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#004AAD] hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
                            Get Started Today
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Join thousands of satisfied riders and drivers using our platform
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Features;