import React from "react";
export default function Aboutus() {
    return (
        <>
            <div className="bg-white min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
                    <p className="text-lg text-center mb-8">
                        Welcome to College Chit-Chat! We are a platform dedicated to connecting college students
                        through meaningful conversations and interactions.
                    </p>

                    <div className="flex flex-col md:flex-row justify-around items-center mb-8">
                        <div className="max-w-sm mb-6 md:mb-0">
                            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D" alt="Our Mission" className="rounded-lg shadow-lg" />
                            <h2 className="text-2xl font-semibold mt-4">Our Mission</h2>
                            <p className="mt-2">
                                To provide a safe and engaging platform for students to share their thoughts,
                                experiences, and connect with their peers.
                            </p>
                        </div>
                        <div className="max-w-sm mb-6 md:mb-0">
                            <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D" alt="Our Vision" className="rounded-lg shadow-lg" />
                            <h2 className="text-2xl font-semibold mt-4">Our Vision</h2>
                            <p className="mt-2">
                                To foster a vibrant community where students can support each other and grow together.
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Meet the Developer</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="w-40 text-center">
                                <img src="/Frontend/Chat_front/public/mainvasu.png" alt="Team Member" className="rounded-full  mx-auto mb-2" />
                                <h3 className="text-lg font-medium">Vashisth Toshniwal</h3>
                            </div>
                            {/* Add more team members as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}