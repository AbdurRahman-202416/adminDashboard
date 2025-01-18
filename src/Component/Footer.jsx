import React from 'react'

function Footer() {
    return (
        <>
            <div>
                
                    <section>
                        <div className="container mx-auto  sm:my-4">

                            <div className="text-center py-2 sm:py-8 mb-8">
                                <h1 className="sm:text-4xl text-base font-bold text-gray-800">Why Shop With Us?</h1>
                                <p className="text-gray-500 mt-2">Discover the benefits of shopping at our  store.</p>
                            </div>

                            {/* Features Section */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-1">
                                {/* Free Shipping */}
                                <div className="flex flex-col items-center p-2 rounded-lg">
                                    <div className="bg-indigo-500 text-white w-12 h-12 flex justify-center items-center rounded-full mb-4">

                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M9 21h6m-7-5h8a2 2 0 001.8-1.2L21 9H3l1.2 6.8A2 2 0 007 16z" />
                                        </svg>
                                    </div>
                                    <h3 className="sm:text-2xl text-base font-semibold">Cash on Delivery</h3>

                                </div>
                                {/* Always Fresh */}
                                <div className="flex flex-col items-center p-2 rounded-lg">
                                    <div className="bg-green-500 text-white w-12 h-12 flex justify-center items-center rounded-full mb-4">

                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="sm:text-lg text-base font-semibold">Always Fresh</h3>

                                </div>
                                {/* Superior Quality */}
                                <div className="flex flex-col items-center p-2 rounded-lg">
                                    <div className="bg-yellow-500 text-white w-12 h-12 flex justify-center items-center rounded-full mb-4">

                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l4-4m0 0l4-4m-4 4H3m13 0h5" />
                                        </svg>
                                    </div>
                                    <h3 className="sm:text-lg text-base font-semibold"><span className="text-blue-500 sm:text-lg text-base">☆⋆</span> Best Quality</h3>

                                </div>
                                {/* Support */}
                                <div className="flex flex-col items-center p-2 rounded-lg">
                                    <div className="bg-red-500 text-white w-12 h-12 flex justify-center items-center rounded-full mb-4">

                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0 4h1v-4h1m-1-6.938a2 2 0 112 0v6.937a2 2 0 11-2 0V9.062z" />
                                        </svg>
                                    </div>
                                    <h3 className="sm:text-lg text-base font-semibold">Support-24/7</h3>

                                </div>
                            </div>
                        </div>

                    </section>
            </div>

        </>
    )
}

export default Footer