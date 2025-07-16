// import React from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useNavigate } from "react-router-dom";

// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();

//   const {logout} = useAuth();
//   const handlelogout = () =>{
//     logout();
    
//   }

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-8">
//       <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">
//         Dashboard
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Card 1 */}
//         <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
//           <h2 className="text-xl font-semibold mb-2 text-purple-400">Live Code Rooms</h2>
//           <p className="text-gray-400">Join or create real-time collaborative code sessions.</p>
//         </div>

//         {/* Card 2 */}
//         <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
//           <h2 className="text-xl font-semibold mb-2 text-blue-400">Video Calls</h2>
//           <p className="text-gray-400">Communicate with teammates via integrated video chat.</p>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
//           <h2 className="text-xl font-semibold mb-2 text-pink-400">Projects</h2>
//           <p className="text-gray-400">Organize your collaborative projects and track progress.</p>
//         </div>

//         {/* Card 4: CodeCollabPage */}
//         <div
//           onClick={() => navigate("/CodeCollabPage")}
//           className="cursor-pointer bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition"
//         >
//           <h2 className="text-xl font-semibold mb-2 text-pink-400">CodeTogether</h2>
//           <p className="text-gray-400">
//             Code together in real-time, track edits, and build projects collaboratively.
//           </p>
//         </div>
//       </div>

//       {/* Additional section */}
//       <div className="mt-10 bg-[#121212] border border-gray-700 p-6 rounded-xl">
//         <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
//           Recent Activity
//         </h3>
//         <ul className="text-gray-300 space-y-2">
//           <li>✅ Joined Room: "Bug Fixing Sprint"</li>
//           <li>🎥 Started a video call with Alice</li>
//           <li>🧠 Edited file: authService.ts</li>
//         </ul>
//       </div>

//       <button onClick={handlelogout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import  Badge  from "./ui/badge"
import { Input } from "./ui/input"
import  '../app.css';
import  Button1  from './ui/button1';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"
import Navbar from "./navbar"

import {
  Code,
  Zap,
  Shield,
  Star,
  ChevronDown,
} from "lucide-react"

  

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  const navigate = useNavigate();
  const handleIde = () => {
    navigate("/CodeCollabPage"); 
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-green-400">Code</span>
                <span className="text-white">-Collab</span>
              </div>
            </div>

          <Navbar />
          </div>    
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-0 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-green-900/20"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10 mb-34">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white animate-slide-in-left">Code Here. </span>
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
                Code Now.
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
             Coding For Best Future
            </p>
            <div className=" mb-0 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-700">
              <Button1 onClick={handleIde} />
            </div>
          </div>
        </div>
        {/* Floating Code Editor Preview */}
        <div className="absolute bottom-0 mb-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 animate-float">

          <Card className="bg-gray-900/90 backdrop-blur-md border-gray-700 overflow-hidden ">
            <CardHeader className="bg-gray-800/50 border-b border-gray-700">
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">JavaScript Graphics</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 font-mono text-sm">
              <div className="space-y-2">
                <div className="text-gray-400">{"const { createStore, bindActionCreators } = Redux;"}</div>
                <div className="text-gray-400">{"const { Provider, connect } = ReactRedux;"}</div>
                <div className="text-blue-400 mt-4">{"class App extends React.Component {"}</div>
                <div className="text-gray-300 ml-4">{"render() {"}</div>
                <div className="text-gray-300 ml-8">{"return ("}</div>
                <div className="text-green-400 ml-12">{'<section className="section">'}</div>
                <div className="text-green-400 ml-16">{'<h1 className="title">Contacts</h1>'}</div>
                <div className="animate-pulse">
                  <div className="w-2 h-4 bg-white inline-block"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gray-400" size={32} />
        </div>
      </section>
      {/* Features Section */}
      <section id="platform" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Everything You Need to
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Teach Code
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Our comprehensive platform provides all the tools, resources, and support you need to deliver world-class
              computer science education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-time Collaboration",
                description: "Students can work together on projects with live code sharing and pair programming.",
                color: "from-yellow-400 to-yellow-600",
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Interactive IDE",
                description: "Browser-based coding environment with real-time collaboration and instant feedback.",
                color: "from-green-400 to-green-600",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Safe Environment",
                description: "Secure, monitored platform designed specifically for educational use.",
                color: "from-red-400 to-red-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Loved by
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {" "}
                Educators
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              See what teachers and students are saying about CodeHS
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Computer Science Teacher",
                school: "Lincoln High School",
                content:
                  "CodeHS has transformed how I teach programming. The curriculum is engaging and the IDE makes it so easy for students to get started coding immediately.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Department Head",
                school: "Tech Valley Academy",
                content:
                  "Our students love the interactive lessons and real-time feedback. We've seen a 40% increase in CS course enrollment since adopting CodeHS.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "AP CS Teacher",
                school: "Riverside Prep",
                content:
                  "The automated grading saves me hours each week, and the detailed analytics help me identify exactly where each student needs support.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-300 text-base italic">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-black">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                      <div className="text-sm text-green-400">{testimonial.school}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">
              Stay Updated with Code-Collab
            </h2>
            <p className="text-gray-400 mb-8 animate-fade-in-up animation-delay-200">
              Get the latest updates on new features, curriculum, and educational resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
              />
              <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
