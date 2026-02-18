'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Code, Palette, Users } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide nav when scrolling down
        setShowNav(false);
      }

      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        } ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-40">
            <div className="flex-shrink-0 flex items-start pt-2">
              {/* Logo - positioned in top left */}
              <div className="relative h-56 w-56">
                <div className="absolute inset-0">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/skykin_logo.png"
                      alt="SKYKIN"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-3">
                {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Blog') {
                        window.location.href = 'https://blog.skykintech.com/';
                        return;
                      }
                      scrollToSection(item.toLowerCase());
                    }}
                    className="relative group px-6 py-4 text-base font-bold transition-all duration-300 rounded-xl overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl transition-all duration-300"></div>

                    {/* Text */}
                    <span className="relative z-10 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {item}
                    </span>

                    {/* Bottom accent line */}
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-blue-600 transition-colors duration-300 p-2"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg`}>
          <div className="px-4 pt-3 pb-4 space-y-2 border-t-2 border-blue-200">
            {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Blog') {
                    window.location.href = 'https://blog.skykintech.com/';
                    return;
                  }
                  scrollToSection(item.toLowerCase());
                }}
                className="relative group w-full text-left px-5 py-3 text-base font-bold transition-all duration-300 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-200 bg-gradient-to-r from-transparent to-transparent hover:from-blue-500/10 hover:to-blue-600/10"
              >
                {/* Left accent bar */}
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-500 to-blue-600 group-hover:h-3/4 transition-all duration-300 rounded-r-full"></span>

                {/* Text */}
                <span className="relative z-10 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 ml-2">
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute inset-0 bg-mesh"></div>

        {/* Decorative floating elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-block mb-8">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-2 border-blue-200 px-6 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm shadow-lg">
                Welcome to SkyKin Technologies
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent leading-tight">
              Empowering Digital
              <span className="block">Transformation Globally</span>
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-blue-300"></div>
              <div className="mx-4 text-blue-500 text-2xl">✦</div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-blue-400 to-blue-300"></div>
            </div>

            <p className="text-lg md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Building clean, scalable, and intelligent digital solutions that drive innovation across telecommunications, finance, healthcare, and agriculture.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection('services')}
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl flex items-center btn-animated hover-glow shadow-lg"
              >
                Explore Our Solutions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={22} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-[1.03] btn-animated hover:shadow-2xl shadow-md"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      {/* Why SKYKIN Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-grid opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-2 border-blue-200 px-6 py-2 rounded-full bg-blue-50">
                About Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              SkyKin Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 rounded-full"></div>
          </div>

          {/* Main Content Card - More Decorative */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative bg-gradient-to-br from-white via-blue-50/50 to-white backdrop-blur-sm border-2 border-blue-200 rounded-3xl p-10 md:p-14 shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 animate-scale-in">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-blue-400 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-blue-400 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-blue-400 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-blue-400 rounded-br-3xl"></div>

              {/* Decorative dots */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-500 rounded-full"></div>

              <div className="relative z-10 space-y-8">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light text-justify">
                  A <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">global digital architect</span> dedicated to driving the next era of industrial transformation.
                </p>

                <div className="flex items-center justify-center my-8">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-blue-300"></div>
                  <div className="mx-4 text-blue-500 text-2xl">✦</div>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent via-blue-400 to-blue-300"></div>
                </div>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
                  By merging <span className="font-semibold text-blue-600">cutting-edge innovation</span> with strategic global partnerships, we deliver advanced solutions that empower key sectors across the digital landscape.
                </p>

                <div className="flex items-center justify-center my-8">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-blue-300"></div>
                  <div className="mx-4 text-blue-500 text-2xl">✦</div>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent via-blue-400 to-blue-300"></div>
                </div>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
                  With a foundation of leadership and a diversified portfolio, SkyKin serves as a <span className="font-semibold text-blue-600">trusted partner</span> for organizations navigating the digital age, providing the scalable infrastructure and intelligent software needed to thrive in a boundaryless world.
                </p>
              </div>
            </div>
          </div>

          {/* Key Sectors - More Decorative Grid */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Empowering Key Sectors
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-12 rounded-full"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Telecommunications',
                  icon: '📡',
                  description: 'Next-generation connectivity solutions',
                  gradient: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Finance',
                  icon: '💼',
                  description: 'Secure digital banking systems',
                  gradient: 'from-blue-600 to-blue-700'
                },
                {
                  title: 'Healthcare',
                  icon: '🏥',
                  description: 'Smart healthcare platforms',
                  gradient: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Agriculture',
                  icon: '🌾',
                  description: 'AgriTech innovations',
                  gradient: 'from-blue-600 to-blue-700'
                },
                {
                  title: 'Hotel & Hospitality',
                  icon: '�',
                  description: 'Digital guest experience solutions',
                  gradient: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Infrastructure',
                  icon: '🏗️',
                  description: 'Smart infrastructure management',
                  gradient: 'from-blue-600 to-blue-700'
                }
              ].map((sector, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-blue-50/50 border-2 border-blue-200 p-8 rounded-2xl hover:border-blue-400 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl text-center animate-scale-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Decorative top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sector.gradient}`}></div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200/50 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-200/50 to-transparent rounded-tr-full"></div>

                  <div className="relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{sector.icon}</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{sector.title}</h4>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mb-4 rounded-full"></div>
                    <p className="text-sm text-gray-600 leading-relaxed">{sector.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us - Premium Decorative Cards */}
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Why Choose SkyKin
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
              Experience excellence through our commitment to innovation, quality, and partnership
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: 'Intuitive Design',
                subtitle: 'User-Centered Excellence',
                description: 'We craft elegant, minimalist interfaces that prioritize clarity and user experience, ensuring seamless digital interactions across all touchpoints.',
                color: 'from-blue-500 to-blue-600',
                delay: '0s'
              },
              {
                icon: Code,
                title: 'Scalable Architecture',
                subtitle: 'Built for Growth',
                description: 'Our solutions leverage robust, enterprise-grade architectures designed to scale effortlessly with your business, delivering consistent performance at any level.',
                color: 'from-blue-600 to-blue-700',
                delay: '0.2s'
              },
              {
                icon: Users,
                title: 'Dedicated Partnership',
                subtitle: 'Always By Your Side',
                description: 'We provide comprehensive support and proactive maintenance, ensuring your systems remain secure, optimized, and aligned with your evolving business goals.',
                color: 'from-blue-500 to-blue-600',
                delay: '0.4s'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white via-blue-50/30 to-white border-2 border-blue-200 p-8 rounded-3xl hover:border-blue-400 transition-all duration-500 hover:transform hover:scale-[1.03] hover:shadow-2xl animate-scale-in overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                {/* Decorative top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.color} rounded-t-3xl`}></div>

                {/* Decorative corner accents */}
                <div className="absolute top-2 left-0 w-20 h-20 border-l-4 border-t-4 border-blue-300/50 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-blue-300/50 rounded-br-3xl"></div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 bg-grid"></div>

                <div className="relative z-10">
                  <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <feature.icon size={40} className="text-blue-600" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wide">{feature.subtitle}</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mb-6 rounded-full"></div>
                  <p className="text-base text-gray-600 leading-relaxed mb-8 text-justify">{feature.description}</p>
                  <button className={`bg-gradient-to-r ${feature.color} text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-full shadow-lg`}>
                    Discover More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>

        {/* Decorative background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-2 border-blue-200 px-6 py-2 rounded-full bg-blue-50">
                Our Solutions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Comprehensive Digital Solutions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions designed to transform your business and drive sustainable growth
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'Digital Transformation & IT Consulting',
                description: 'Strategic guidance to modernize your infrastructure, optimize operations, and accelerate your digital journey with cutting-edge technologies.',
                icon: '🚀',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                number: '2',
                title: 'Telecom Solutions',
                description: 'Next-generation telecommunications infrastructure and services that enhance connectivity, reliability, and network performance.',
                icon: '📡',
                gradient: 'from-blue-600 to-blue-700'
              },
              {
                number: '3',
                title: 'Hospitality & Tourism Solutions',
                description: 'Innovative digital platforms for hotels, resorts, and tourism businesses to enhance guest experiences and streamline operations.',
                icon: '🏨',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                number: '4',
                title: 'Agriculture Technology',
                description: 'Smart farming solutions leveraging IoT, AI, and data analytics to optimize crop yields, resource management, and sustainability.',
                icon: '🌾',
                gradient: 'from-blue-600 to-blue-700'
              },
              {
                number: '5',
                title: 'Health & Medical Solutions',
                description: 'Advanced healthcare platforms including telemedicine, patient management systems, and medical data analytics for improved care delivery.',
                icon: '🏥',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                number: '6',
                title: 'Education Technology',
                description: 'Advanced EdTech platforms for schools and universities, enhancing the learning experience and administrative efficiency.',
                icon: '🎓',
                gradient: 'from-blue-600 to-blue-700'
              },
              {
                number: '7',
                title: 'Smart Cities & IoT Solutions',
                description: 'Integrated IoT ecosystems for urban infrastructure, enabling intelligent traffic management, energy efficiency, and public services.',
                icon: '🏙️',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                number: '8',
                title: 'Custom Software Development',
                description: 'Bespoke software solutions tailored to your unique business requirements, from web applications to enterprise systems.',
                icon: '💻',
                gradient: 'from-blue-600 to-blue-700'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white via-blue-50/30 to-white border-2 border-blue-200 p-8 rounded-3xl hover:border-blue-400 transition-all duration-500 hover:transform hover:scale-[1.03] hover:shadow-2xl animate-slide-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative number badge */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">{service.number}</span>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-blue-300/50 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-blue-300/50 rounded-br-3xl"></div>

                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${service.gradient} rounded-t-3xl`}></div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 bg-grid"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <span className="text-4xl">{service.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 pr-12">{service.title}</h3>

                  {/* Decorative underline */}
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mb-4 rounded-full"></div>

                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed mb-6 text-justify">{service.description}</p>

                  {/* Learn More Button */}
                  <button className={`bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center group-hover:gap-2 gap-1`}>
                    Learn More
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-br from-white via-blue-50/50 to-white border-2 border-blue-200 rounded-2xl p-8 shadow-xl">
              <p className="text-lg text-gray-700 mb-4">
                Don't see what you're looking for?
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Let's Discuss Your Needs →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      {/* Clients Section */}
      <section id="portfolio" className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20"></div>

        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-2 border-blue-200 px-6 py-2 rounded-full bg-blue-50">
                Our Clients
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Partners We've Had the Pleasure to Work With
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to have collaborated with these industry leaders, helping them achieve their digital transformation goals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              { name: 'Client 1', image: '/images/client1.jpeg' },
              { name: 'Client 3', image: '/images/client3.jpg' },
              { name: 'Client 4', image: '/images/client4.jpeg' },
              { name: 'Client 5', image: '/images/client5.jpeg' },
              { name: 'Client 6', image: '/images/clien6.jpeg' },
              { name: 'Client 7', image: '/images/clinet7.jpeg' }
            ].map((client, i) => (
              <div
                key={i}
                className="group relative bg-white border border-blue-100 p-6 rounded-2xl hover:border-blue-300 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl flex items-center justify-center card-hover animate-scale-in overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"></div>

                <div className="relative w-full h-40 flex items-center justify-center">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 bg-grid opacity-10"></div>

        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-2 border-blue-200 px-6 py-2 rounded-full bg-blue-50">
                Contact Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how we can help you achieve your goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-slide-in-left">
              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  content: '+251-911-227833',
                  gradient: 'from-blue-500 to-blue-600'
                },
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'info@skykintech.com',
                  gradient: 'from-blue-600 to-blue-700'
                },
                {
                  icon: MapPin,
                  title: 'Website',
                  content: 'www.skykintech.com',
                  gradient: 'from-blue-500 to-blue-600'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white via-blue-50/30 to-white border-2 border-blue-200 p-6 rounded-2xl hover:border-blue-400 transition-all duration-500 hover:shadow-xl"
                >
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-t-2xl`}></div>

                  <div className="flex items-start space-x-4">
                    <div className={`bg-gradient-to-br ${item.gradient} p-4 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="relative bg-gradient-to-br from-white via-blue-50/50 to-white border-2 border-blue-200 p-8 md:p-10 rounded-3xl shadow-xl animate-slide-in-right overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-blue-400 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-blue-400 rounded-br-3xl"></div>

              {/* Decorative dots */}
              <div className="absolute top-3 left-3 w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-blue-500 rounded-full"></div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 relative">
        <div className="absolute inset-0 bg-grid opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
                SKYKIN Technologies
              </h3>
              <p className="text-gray-700 mb-4">
                Transforming ideas into powerful digital experiences with cutting-edge technology and creative excellence.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">About</a></li>
                <li><a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Services</a></li>
                <li><a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-gray-700">
                <p>Phone: +251-911-227833</p>
                <p>Email: info@skykintech.com</p>
                <p>Web: www.skykintech.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              &copy; 2026 SKYKIN Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}