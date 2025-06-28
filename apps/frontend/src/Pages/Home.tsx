// import React from 'react';

// const Home: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
//       {/* Header */}
//       <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold text-green-400">
//           Code<span className="text-white">HS</span>
//         </h1>
//         <nav className="hidden lg:flex gap-6 text-gray-300 text-sm">
//           <span className="hover:text-white transition">Development</span>
//           <span className="hover:text-white transition">IDE</span>
//           <span className="hover:text-white transition">Resources</span>
//         </nav>
//         <div className="flex gap-3">
//           <button className="text-white hover:underline">Login</button>
//           <button className="bg-green-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-green-500 transition">
//             Sign Up
//           </button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="text-center mt-20 px-4 animate-fade-in">
//         <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
//           Code Here.{' '}
//           <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
//             Code Now.
//           </span>
//         </h2>
//         <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
//           The Top Coding Education Platform for Schools
//         </p>
//         <button className="mt-8 bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105">
//           + Create new project
//         </button>
//       </section>

//       {/* Code Panel */}
//       <section className="max-w-6xl mx-auto mt-20 px-4">
//         <div className="relative bg-[#0d0d0d] rounded-2xl p-6 shadow-lg overflow-hidden animate-fade-in-up">
//           <div className="text-green-400 font-bold mb-4">JavaScript Graphics</div>
//           <pre className="text-sm text-purple-300 font-mono overflow-x-auto whitespace-pre-wrap">
// {`const { createStore, bindActionCreators } = Redux;
// const { Provider, connect } = ReactRedux;

// class App extends React.Component {
//   render() {
//     return (
//       <section className="section">
//         <h1 className="title">Contacts</h1>
//         <AddContact addContact={this.props.addContact} />
//         <Contacts contacts={this.props.contacts} />
//       </section>
//     );
//   }
// }`}
//           </pre>
//           <div className="absolute top-4 right-4 flex flex-wrap gap-3">
//             <button className="bg-green-600 text-white text-sm px-3 py-1 rounded">Run</button>
//             <button className="bg-purple-700 text-white text-sm px-3 py-1 rounded">Clear</button>
//             <button className="bg-gray-700 text-white text-sm px-3 py-1 rounded">Output</button>
//             <button className="bg-gray-700 text-white text-sm px-3 py-1 rounded">Docs</button>
//             <button className="bg-gray-700 text-white text-sm px-3 py-1 rounded">More</button>
//           </div>

//           {/* Glowing Blob */}
//           <div className="absolute bottom-6 right-6 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-80 animate-ping" />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="mt-32 p-6 text-center text-gray-500 text-sm border-t border-gray-800">
//         © 2025 CodeHS Clone. Built with React + Tailwind CSS.
//       </footer>
//     </div>
//   );
// };

// export default Home;



import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import  Badge  from "./ui/badge"
import { Input } from "./ui/input"
import  '../app.css';
import  Button1  from './ui/button1';
import { useNavigate } from "react-router-dom";

import {
  Code,
  Users,
  BookOpen,
  Award,
  Zap,
  Shield,
  Globe,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Monitor,
} from "lucide-react"

  

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login"); // programmatically go to /about
  };
  const handleSignUp = () => {
    navigate("/signup"); // programmatically go to /about
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              
              <a href="#development" className="text-gray-300 hover:text-white transition-colors">
                Development
              </a>
              <a href="#ide" className="text-gray-300 hover:text-white transition-colors">
                IDE
              </a>
              <a href="#resources" className="text-gray-300 hover:text-white transition-colors">
                Resources
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              
              <Button onClick={handleLogin} variant="ghost" className="text-white hover:bg-gray-800">
                Login
              </Button>
              <Button onClick={handleSignUp} className="bg-green-500 hover:bg-green-600 text-black font-semibold">Sign Up</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4 mt-4">
                
                <a href="#development" className="text-gray-300 hover:text-white transition-colors">
                  Development
                </a>
                <a href="#ide" className="text-gray-300 hover:text-white transition-colors">
                  IDE
                </a>
                <a href="#resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" className="text-white hover:bg-gray-800 justify-start">
                    Login
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold justify-start">
                    Sign Up
                  </Button>
                </div>
              </nav>
            </div>
          )}
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
             
              <Button1 />
              
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">10M+</div>
              <div className="text-gray-300">Students Taught</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-300">Schools</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-4xl md:text-5xl font-bold text-pink-400 mb-2">100+</div>
              <div className="text-gray-300">Countries</div>
            </div>
            <div className="animate-fade-in-up animation-delay-600">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">99%</div>
              <div className="text-gray-300">Satisfaction</div>
            </div>
          </div>
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
                icon: <Code className="w-8 h-8" />,
                title: "Interactive IDE",
                description: "Browser-based coding environment with real-time collaboration and instant feedback.",
                color: "from-green-400 to-green-600",
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Comprehensive Curriculum",
                description: "Standards-aligned courses covering Python, Java, JavaScript, HTML/CSS, and more.",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Classroom Management",
                description: "Track student progress, assign homework, and manage multiple classes effortlessly.",
                color: "from-purple-400 to-purple-600",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Automated Grading",
                description: "Save time with automatic code evaluation and detailed feedback for students.",
                color: "from-pink-400 to-pink-600",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-time Collaboration",
                description: "Students can work together on projects with live code sharing and pair programming.",
                color: "from-yellow-400 to-yellow-600",
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

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Curriculum Built for </span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Every Level
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                From complete beginners to advanced programmers, our curriculum adapts to every student's journey.
              </p>

              <div className="space-y-6">
                {[
                  { level: "Beginner", courses: "Intro to Programming, Scratch, Hour of Code", students: "Ages 6-12" },
                  { level: "Intermediate", courses: "Python, JavaScript, Web Development", students: "Ages 13-16" },
                  { level: "Advanced", courses: "Java, Data Structures, AP Computer Science", students: "Ages 16+" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center font-bold text-black">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.level}</h3>
                      <p className="text-gray-400 mb-1">{item.courses}</p>
                      <p className="text-sm text-green-400">{item.students}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-right">
              <Card className="bg-gray-900/80 border-gray-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="w-6 h-6" />
                    <span>Live Coding Session</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gray-900 p-6 font-mono text-sm">
                    <div className="text-green-400 mb-2"># Python Basics - Variables and Functions</div>
                    <div className="text-gray-400 mb-4">{"# Let's create our first program!"}</div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-blue-400">def</span> <span className="text-yellow-400">greet</span>
                        <span className="text-white">(name):</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-blue-400">return</span>{" "}
                        {/* <span className="text-green-300">f"Hello, {name}!"</span> */}
                        <span className="text-green-300">f"Hello, Vaishnavi"</span>
                      </div>
                      <div className="mt-4">
                        <span className="text-gray-400"># Call the function</span>
                      </div>
                      <div>
                        <span className="text-white">message = </span>
                        <span className="text-yellow-400">greet</span>
                        <span className="text-white">(</span>
                        <span className="text-green-300">"CodeHS Student"</span>
                        <span className="text-white">)</span>
                      </div>
                      <div>
                        <span className="text-blue-400">print</span>
                        <span className="text-white">(message)</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-black rounded border border-gray-700">
                      <div className="text-green-400">Output:</div>
                      <div className="text-white">Hello, CodeHS Student!</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Simple,
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Choose the plan that works best for your classroom or school
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                description: "Perfect for trying out CodeHS",
                features: ["Up to 30 students", "Basic curriculum access", "Community support", "Limited IDE features"],
                popular: false,
                color: "from-gray-600 to-gray-700",
              },
              {
                name: "Pro",
                price: "$25",
                period: "per month",
                description: "Most popular for individual teachers",
                features: [
                  "Unlimited students",
                  "Full curriculum library",
                  "Advanced IDE features",
                  "Priority support",
                  "Detailed analytics",
                  "Custom assignments",
                ],
                popular: true,
                color: "from-green-500 to-green-600",
              },
              {
                name: "School",
                price: "Custom",
                period: "pricing",
                description: "For schools and districts",
                features: [
                  "Everything in Pro",
                  "Multiple teacher accounts",
                  "Admin dashboard",
                  "Professional development",
                  "Custom integrations",
                  "Dedicated support",
                ],
                popular: false,
                color: "from-purple-500 to-purple-600",
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
                  plan.popular ? "ring-2 ring-green-500 scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-black font-semibold px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold transform hover:scale-105 transition-all duration-300`}
                  >
                    {plan.name === "Free"
                      ? "Get Started"
                      : plan.name === "School"
                        ? "Contact Sales"
                        : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-500 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-xl text-green-100 mb-8 animate-fade-in-up animation-delay-200">
              Join thousands of educators who are already using CodeHS to inspire the next generation of programmers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">
              Stay Updated with CodeHS
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

      {/* Footer */}
      <footer className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="text-2xl font-bold">
                  <span className="text-green-400">Code</span>
                  <span className="text-white">-Collab</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering educators to teach computer science with confidence and inspiring students to code their
                future.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Curriculum
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    IDE
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Assignments
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CodeHS. All rights reserved. Built with ❤️ for educators and students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
