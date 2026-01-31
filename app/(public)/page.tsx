"use client"

import { 
  CheckCircle2, ArrowRight, Star, Shield, Clock, Users, Award, Leaf, Sparkles, 
  ShieldCheck, Zap, ChevronLeft, ChevronRight, TreePine, Instagram,
  Home, Building2, Wind, ShieldAlert, Utensils, Construction,
  Sofa, Layout, Waves, Dumbbell, Car, Calendar, BookOpen, ArrowUpRight
} from 'lucide-react'
import { motion, useTransform, useMotionValue, useSpring, useScroll, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import { INITIAL_BLOG_POSTS } from '@/lib/blog-data'
import { TESTIMONIALS } from '@/lib/testimonials-data'

// Reusable CTA Button Component
interface CTAButtonProps {
  text: string
  href: string
  variant?: "primary" | "secondary" | "dark"
  icon?: React.ComponentType<{ className?: string }> | null
  className?: string
}

const CTAButton = ({ text, href, variant = "primary", icon: Icon = null, className = "" }: CTAButtonProps) => {
  const baseStyles = "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl duration-300"
  const variants = {
    primary: "bg-primary text-white hover:bg-pink-700 shadow-primary/40 hover:shadow-primary/60",
    secondary: "bg-white text-primary hover:bg-slate-50 shadow-slate-300/40",
    dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/40",
  }
  
  return (
    <motion.a 
      href={href}
      className={`${baseStyles} ${variants[variant]} inline-flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
      {Icon && <Icon className="h-5 w-5" />}
    </motion.a>
  )
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth mouse movement for parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const [isClient, setIsClient] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)
  const [blogSliderIndex, setBlogSliderIndex] = useState(0)
  const [teamSliderIndex, setTeamSliderIndex] = useState(0)
  const [testimonialsIndex, setTestimonialsIndex] = useState(0)
  const [airQuality, setAirQuality] = useState(72)
  const [airQualityStatus, setAirQualityStatus] = useState("Moderate")
  const [airQualityColor, setAirQualityColor] = useState("text-amber-500")
  const [airQualityAlert, setAirQualityAlert] = useState("Warning: High Dust Load")
  const [loading, setLoading] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  const [showReelModal, setShowReelModal] = useState(false)

  const heroTexts = [
    "We Clean\nYou Relax",
    "Pure Air\nPure Health",
    "Certified\nExcellence",
    "Family\nSafe Always",
    "Sparkle &\nShine Daily",
    "Trust Our\nExpertise"
  ]

  // Team members data
  const teamMembers = [
    {
      name: "Ahmed Al-Mazrouei",
      role: "Lead Operations Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      experience: "12+ years"
    },
    {
      name: "Fatima Al-Mansoori",
      role: "Head of Quality Control",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
      experience: "10+ years"
    },
    {
      name: "Mohammed Al-Suwaidi",
      role: "Technical Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      experience: "8+ years"
    },
    {
      name: "Layla Al-Kaabi",
      role: "Customer Relations Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
      experience: "9+ years"
    },
    {
      name: "Hassan Al-Mansouri",
      role: "Supervisor - Villa Services",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      experience: "11+ years"
    },
    {
      name: "Sara Al-Naqbi",
      role: "Training & Development Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
      experience: "7+ years"
    },
    {
      name: "Ali Al-Maktoumi",
      role: "AC Duct Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      experience: "9+ years"
    },
    {
      name: "Aisha Al-Hajri",
      role: "Safety & Compliance Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
      experience: "8+ years"
    },
    {
      name: "Khaled Al-Hosani",
      role: "Field Operations Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      experience: "10+ years"
    },
    {
      name: "Mariam Al-Zaabi",
      role: "Client Service Coordinator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
      experience: "6+ years"
    }
  ]

  // Services data with Icons
  const services = [
    { title: "Residential Cleaning", href: "/services/residential-cleaning", icon: <Home className="h-7 w-7" />, description: "Regular hourly cleaning for homes", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800", tag: "Regular" },
    { title: "Villa Deep Cleaning", href: "/services/villa-deep-cleaning", icon: <Building2 className="h-7 w-7" />, description: "Complete interior and exterior sanitization", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", tag: "Deep" },
    { title: "AC Duct Cleaning", href: "/services/ac-duct-cleaning", icon: <Wind className="h-7 w-7" />, description: "Professional air duct sterilization", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800", tag: "Technical" },
    { title: "Office Deep Cleaning", href: "/services/office-deep-cleaning", icon: <ShieldAlert className="h-7 w-7" />, description: "Corporate space sanitization", image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800", tag: "Deep" },
    { title: "Kitchen Deep Cleaning", href: "/services/kitchen-deep-cleaning", icon: <Utensils className="h-7 w-7" />, description: "Heavy-duty degreasing and hood cleaning", image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800", tag: "Deep" },
    { title: "Apartment Deep Cleaning", href: "/services/apartment-deep-cleaning", icon: <Building2 className="h-7 w-7" />, description: "Move-in or move-out cleaning", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800", tag: "Deep" },
    { title: "Post Construction Cleaning", href: "/services/post-construction-cleaning", icon: <Construction className="h-7 w-7" />, description: "Remove dust and construction residue", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800", tag: "Specialist" },
    { title: "Sofa Deep Cleaning", href: "/services/sofa-deep-cleaning", icon: <Sofa className="h-7 w-7" />, description: "Professional upholstery cleaning", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", tag: "Specialist" },
    { title: "Window Cleaning", href: "/services/window-cleaning", icon: <Layout className="h-7 w-7" />, description: "Interior and exterior window service", image: "https://images.unsplash.com/photo-1584775524340-3fb88cd59b13?auto=format&fit=crop&q=80&w=800", tag: "Regular" },
    { title: "Carpet Deep Cleaning", href: "/services/carpets-deep-cleaning", icon: <Sparkles className="h-7 w-7" />, description: "Professional carpet and rug cleaning", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", tag: "Deep" },
    { title: "Water Tank Cleaning", href: "/services/water-tank-cleaning", icon: <Waves className="h-7 w-7" />, description: "Safe water tank sanitization", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800", tag: "Technical" },
    { title: "Gym Deep Cleaning", href: "/services/gym-deep-cleaning", icon: <Dumbbell className="h-7 w-7" />, description: "Equipment and facility sanitization", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", tag: "Deep" }
  ]

  // Blog posts data - using actual blog posts from database
  const blogs = INITIAL_BLOG_POSTS.slice(0, 6).map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    category: post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    date: new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: `${post.readTime} min read`,
    href: `/blog/${post.slug}`
  }))

  const getAirQualityStatus = (aqi: number) => {
    if (aqi <= 30) return { status: "Low Risk - Safe", color: "text-green-500", alert: "Air is relatively clean today." }
    if (aqi <= 50) return { status: "Moderate - Lingering Dust", color: "text-yellow-500", alert: "Minute particles detected in ducts." }
    if (aqi <= 100) return { status: "Warning: High Dust Load", color: "text-orange-500", alert: "AC ducts likely circulating hidden allergens." }
    if (aqi <= 150) return { status: "Danger: Hazardous Air", color: "text-red-500", alert: "Immediate AC Duct Sterilization Recommended." }
    if (aqi <= 200) return { status: "CRITICAL: Breathing Risk", color: "text-red-700", alert: "Toxic buildup detected. Breathing hazard." }
    return { status: "EXTREME: Evacuate Air", color: "text-red-900", alert: "Severe health risk. Deep cleaning mandatory." }
  }

  const fetchRealTimeAirQuality = async () => {
    try {
      setLoading(true)
      // Using Open-Meteo free API for Dubai coordinates
      const response = await fetch(
        'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=25.2048&longitude=55.2708&current=us_aqi'
      )
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Check if the response has the expected structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response: not an object')
      }
      
      if (!data.current || typeof data.current !== 'object') {
        throw new Error('Invalid API response: missing current data')
      }
      
      // US AQI typically ranges 0-500
      const aqi = Math.round(data.current?.us_aqi || 72)
      
      if (isNaN(aqi) || aqi < 0 || aqi > 500) {
        throw new Error(`Invalid AQI value: ${aqi}`)
      }
      
      const { status, color, alert } = getAirQualityStatus(aqi)
      
      setAirQuality(aqi) 
      setAirQualityStatus(status)
      setAirQualityColor(color)
      setAirQualityAlert(alert)
      setLoading(false)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error fetching air quality:', errorMessage)
      
      // Set fallback values
      setAirQuality(72)
      const { status, color, alert } = getAirQualityStatus(72)
      setAirQualityStatus(status)
      setAirQualityColor(color)
      setAirQualityAlert(alert)
      setLoading(false)
    }
  }

  useEffect(() => {
    setIsClient(true)
    fetchRealTimeAirQuality()
    
    // Fetch real-time air quality every 10 minutes
    const airQualityInterval = setInterval(() => {
      fetchRealTimeAirQuality()
    }, 10 * 60 * 1000)
    
    // Add global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      // Prevent the default handler
      event.preventDefault()
    }
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    return () => {
      clearInterval(airQualityInterval)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  // Auto-scroll services slider (infinite loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [services.length])

  // Auto-scroll blog slider to the right (slow speed)
  useEffect(() => {
    const interval = setInterval(() => {
      setBlogSliderIndex((prev) => {
        const maxIndex = blogs.length - 3
        return prev <= 0 ? maxIndex : prev - 1
      })
    }, 4500)
    return () => clearInterval(interval)
  }, [blogs.length])

  // Auto-scroll team slider (infinite loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setTeamSliderIndex((prev) => (prev + 1) % teamMembers.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [teamMembers.length])

  // Auto-scroll testimonials slider (infinite loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialsIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [TESTIMONIALS.length])

  // Only use scroll animations on client side
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])
  
  // Parallax elements for hero
  const heroParallaxX = useTransform(springX, [0, 2000], [-20, 20])
  const heroParallaxY = useTransform(springY, [0, 1000], [-20, 20])
  const blobParallaxX = useTransform(springX, [0, 2000], [50, -50])
  const blobParallaxY = useTransform(springY, [0, 1000], [50, -50])

  return (
    <div ref={containerRef} className="flex flex-col overflow-hidden selection:bg-primary selection:text-white">
      {/* Subtle gradient backdrop */}
      <div className="fixed inset-0 z-30 pointer-events-none bg-linear-to-b from-primary/2 via-transparent to-transparent" />

      {/* Static Geometric Shapes - Optimized */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[5%] w-64 h-64 bg-primary/3 rounded-[40%] blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-pink-100/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section - Enhanced Unique Design */}
      <section className="relative pt-4 pb-6 px-4 md:px-8 overflow-hidden">
        {/* Animated background elements */}
        <style>{`
          @keyframes float-up {
            0% { transform: translateY(0px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100px); opacity: 0; }
          }
          .float-bubble {
            animation: float-up 6s ease-in infinite;
          }
        `}</style>
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="float-bubble absolute rounded-full border border-primary/20 bg-primary/5"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                left: `${10 + i * 18}%`,
                top: `${-50 - i * 10}px`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Main Hero Card - Enhanced */}
            <div className="lg:col-span-8 relative rounded-4xl md:rounded-[3rem] overflow-hidden group h-120 md:h-140 shadow-2xl before:absolute before:inset-0 before:bg-linear-to-tr before:from-slate-900/30 before:via-transparent before:to-transparent before:z-10">
              <video 
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              >
                <source src="https://www.pexels.com/download/video/6197564/" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-black/50" />
              
              {/* Floating accent elements */}
              <motion.div 
                className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-16 h-16 rounded-full border border-primary/50" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-20 left-8 w-12 h-12 rounded-lg bg-primary/20 border border-primary/40"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                {/* Premium badge */}
                <motion.div
                  className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Premium Service</span>
                </motion.div>

                <div className="h-32 flex items-center justify-center">
                  <motion.h1 
                    key={textIndex}
                    className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl whitespace-pre-line"
                    initial={{ opacity: 0, y: 20, scale: 0.8, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8, rotateX: 15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {heroTexts[textIndex]}
                  </motion.h1>
                </div>

                {/* Enhanced Stat Grid with glassmorphism */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8 w-full max-w-3xl">
                  {[
                    { label: "Customers", value: "18K+", icon: Users },
                    { label: "Rating", value: "4.9/5", icon: Star },
                    { label: "Reviews", value: "7K+", icon: CheckCircle2 },
                    { label: "Years", value: "12+", icon: Award },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-4 hover:bg-white/15 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-lg md:text-xl font-black text-white">{stat.value}</div>
                      <div className="text-[8px] md:text-xs font-bold text-white/70 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button - Enhanced */}
                <motion.a
                  href="/book-service"
                  className="mt-8 px-8 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm hover:bg-pink-700 transition-all shadow-xl shadow-primary/40 hover:shadow-primary/60 inline-flex items-center gap-3"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Schedule Your Cleaning</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Right Side Widgets - Enhanced */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Air Quality Widget - Fear Based Selling */}
              <motion.div 
                className="bg-linear-to-br from-white/95 to-white/80 backdrop-blur-xl rounded-4xl p-6 shadow-2xl border border-white/30 flex flex-col justify-between flex-1 relative group cursor-pointer overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(220,38,38,0.15)" }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-black text-slate-950 max-w-35 leading-tight flex items-center gap-2">
                       Hidden Danger? 
                       <ShieldAlert className="h-4 w-4 text-primary animate-pulse" />
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Dubai Outdoor Air Quality</p>
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center gap-6 my-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg className="h-full w-full -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#f1f5f9" strokeWidth="6" fill="none" />
                      <motion.circle 
                        cx="40" cy="40" r="32" stroke={airQuality > 50 ? "#EF4444" : "#DB2777"} strokeWidth="6" fill="none"
                        strokeDasharray="201"
                        initial={{ strokeDashoffset: 201 }}
                        animate={{ strokeDashoffset: 201 - (201 * (Math.min(airQuality, 200) / 200)) }}
                        transition={{ duration: 2 }}
                      />
                    </svg>
                    <div className={`absolute inset-0 flex items-center justify-center font-black text-lg ${airQuality > 50 ? 'text-red-600' : 'text-primary'}`}>
                      {loading ? "..." : airQuality}
                    </div>
                  </div>
                  <div>
                    <div className={`font-black text-sm uppercase leading-tight ${airQualityColor}`}>{airQualityStatus}</div>
                    <p className="text-slate-600 text-[10px] font-bold mt-1 max-w-30">{airQualityAlert}</p>
                  </div>
                </div>

                <motion.a 
                  href="/services/ac-duct-cleaning"
                  className="relative z-10 mt-2 w-full py-3 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Wind className="h-3 w-3" />
                  Is Your AC Clean?
                </motion.a>
              </motion.div>

              {/* Award Badge Widget - Best Deep Cleaning 2025 */}
              <motion.div 
                
              
              
                className="relative rounded-4xl overflow-hidden flex-1 group min-h-55 shadow-2xl bg-slate-100 flex flex-col cursor-pointer"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                onClick={() => setShowReelModal(true)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                
                {/* Instagram Embed - Auto-playing Video */}
                <div className="absolute inset-0 z-0">
                  <iframe
                    src="https://www.instagram.com/reel/DTbMqxECOqv/embed"
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen={true}
                  />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary text-[10px] font-black text-white uppercase tracking-widest">Live Reels</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-white font-black text-xl leading-tight">Satisfying <br />Deep Cleans</h5>
                    <p className="text-white/80 text-xs font-medium">Watch our expert team in action • Click to expand</p>
                    <a 
                      href="https://instagram.com/homeworkuae" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-primary transition-colors mt-2"
                    >
                      Follow @HomeWorkUAE <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Reel Modal */}
      <AnimatePresence>
        {showReelModal && (
          <motion.div 
            className="fixed inset-0 z-9999 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReelModal(false)}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReelModal(false)}
            />
            
            {/* Modal Content */}
            <motion.div 
              className="relative bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button 
                onClick={() => setShowReelModal(false)}
                className="absolute top-6 right-6 z-50 h-12 w-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Reel Container */}
              <div className="relative bg-black aspect-video overflow-hidden">
                <iframe
                  src="https://www.instagram.com/reel/DTbMqxECOqv/embed"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen={true}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-black text-slate-900">Satisfying Deep Cleaning Video</h3>
                <p className="text-slate-600 font-medium">Watch our expert team deliver exceptional cleaning results. Follow us on Instagram for more satisfying before & after transformations!</p>
                <motion.a 
                  href="https://instagram.com/homeworkuae" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-pink-700 transition-all shadow-lg shadow-primary/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="h-5 w-5" />
                  Follow @HomeWorkUAE
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certifications Ribbon */}
      <section className="py-12 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block mb-1">Globally Recognized</span>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Our Certifications</h3>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
              {[
                { name: "ISO", desc: "9001:2015 CERTIFIED", icon: <ShieldCheck className="h-4 w-4" /> },
                { name: "NADCA", desc: "AIR DUCT SPECIALISTS", icon: <Wind className="h-4 w-4" /> },
                { name: "IAF", desc: "GLOBAL ACCREDITATION", icon: <Award className="h-4 w-4" /> },
                { name: "DUBAI", desc: "MUNICIPALITY APPROVED", icon: <Building2 className="h-4 w-4" /> }
              ].map((cert, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer">
                   <div className="h-14 px-6 flex items-center gap-3 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10">
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {cert.icon}
                    </div>
                    <span className="font-black text-slate-900 text-sm tracking-tighter uppercase">{cert.name}</span>
                   </div>
                   <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400 mt-3 group-hover:text-primary transition-colors">{cert.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Leading Businesses - Scrolling Brands */}
      <section className="py-16 px-4 bg-linear-to-r from-slate-50 via-white to-slate-50 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Preferred By Leading Businesses</h3>
            <div className="w-32 h-1 bg-primary rounded-full mx-auto mt-4" />
          </div>

          <style>{`
            @keyframes scroll-brands {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .brands-slider {
              display: flex;
              gap: 2rem;
              animation: scroll-brands 60s linear infinite;
              will-change: transform;
            }
            .brands-slider:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative flex overflow-hidden">
            <div className="brands-slider">
              {Array(2).fill(null).flatMap(() => [
                { name: "Jumeirah Hotels & Resorts", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUTe0SIzf62fpVCe4xCYJLdjBlUmqbyavug&s" },
                { name: "Emaar Properties", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAhFBMVEX///8AAADW1tajo6PT09P4+PjPz88lJSX8/Pzf3998fHyVlZWcnJyQkJDLy8srKyvy8vLo6OhERESvr6+1tbWIiIjCwsJ1dXWpqalqampTU1NhYWFaWlrn5+dNTU3e3t45OTkXFxcREREdHR2Dg4MxMTE/Pz8WFhZmZmZ4eHgNDQ01NTXX1ulhAAAJeElEQVR4nO2c7VobOQyFk5CEb0hooJAUCJDSNnv/97eMNSPJHtmWd5/+O++vkmjG9rEtS7bTyQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/G3O5x5m0TPL+fKsrYxXj9mq8bXM2XK+KhrcjNozey4/YfMw9fChH1l/fXDZ0pYve4/d9+n0pKnuA4/T6feiwQ+7VS+Hb65eFFxi3eonlt0nC38J9z6xVlOnqCOOXw8WB8pNoWlPDw0lXTSL9a375N5dwKIzX9ftrju7lpoPPNTrww05vv36NWrdlbuozfDI2+OJxf02FSu0qtyVmtAby7rduFec7KfVMXkX67J43dz/1HLdOIuaDQ+cZk1ufkdVeQrmZS8hrIP1t6rdI9XCoWrC3DE8ePooX7u+Umo5J8q6LtaXP9F/UE96ZlYHSXtdtTvSW7e+typ2ff1LNteGWF9cilq+vl95xIro7X+7jM/JeFez41X53FuNHu7sTcHoxBZrqF2HayFetIrF6rqW3S3ZVn3Rfnjrk7MaAxee+ufEksb4nHCzWOzkXhzG88HYa9ewcgQW8mDBS2fFkta4eqlZLF4+p/O6MS9DFQlU2OgPSjqU27nLW+XF6kLhHkfo2CyWLCL7qq1Eg2Vh2fF0NOU8+sG8XyiIJUWXnF5Ps1h/pHbVEPLWWZMoMvbHiH2APJBfRQpiyeC/qBfXLNZWaldz2yrxLCaTyvF0OCvS8RE9mI1mSmJxWFGYxqOKesXStauMXJVZFN3n5TSiHsEOJNsAh5xdSSz2wR/j71L+l1jlQaDnyL76yg8eso5a99AU2nEpOR9dEms5fPdWL69VrOdIrMeSqVdWEvVEVgNvqvYarJ9kFucme0ksjlre6wW2ipVsdxQsTyLDQuxAjudMHJDDewQolXqd7GrVKYn10FBqq1gh4T3l2hWWrljVWdaO5D/oaZs31qyHNkpkmRnpJbH4uz/1ElvF6rbypirgzkZF19OI/FpAjqdbydjYl3eGqoT4hZf/zFQqibWr15BpFSu8WwVGuYC7f+/3QjUJcjwhRpJ417WlESzDaiCroh36lcSqd/uoUW6xujjzqCOjzAp0CF/+4bUmuwdCjidMvDN+qSNA7KWlOIPd3d40LYj1OHyVjTsUrWJ1pls9yeyp3qfzq9fBLOc+yfCT/jjUuiCtyeDSxd2ZeVVerLOWElvFWvX9LoXYU4am370agpkXkj4P6u2ZIZCyiez4wR+WbV4sDu5cu/+NYoWF50qXbwbnfTR2plph9xyJfhz+fKppK9xGbxV392zYZsVi714MGBkRa31u8hqNnA33ggwtY3OTKtGJyguVvSdwEleVZ20156GAg32AjHTLOWbEmnGi71gJO5Ik1iAS/YrbzZ7R2Defyejg5dAe52JI1IIAhuaPDKN7ro4R/rJYKixcb16GT39ao9GiLlZUeNigobH/zhajGPJFuovnhxm+kuNR4YckCGUnQrvnykGJuzMOR1is98+7l+12e7eXyk9PncNq4hBrH5kHGXRDOz6Td1K8cBpbmavm7ag7bu1yU2jA6oOzkruLM6+IC8d+L1MVK+4orY1s7SWZ70/1YXHLnsZR5GWkC0o5D42jn/ojOakZH9SwWEfVsO3hcuOdfz1qNTwziayDHx2WP5kyUa37ePpON6vDKJwcTxx7vHFjCrWmMC+eqT/yJbFYJ6ozThvua/S0hQ6h+3hJ+eSCo2n/EQ0MthmnEzQY3q+uFZfsds0gIHrpZfTgb7s2HZGDlwKc58RCm1gPUV0knz4qG4qmORfmyTqOMORkxSR/SvxYfnDUlHg1lCHYqlabWKGW4lZlP16FRce4Hhz3jbb01AmnTXYP7L3yYFpUEjr8w4b/3Wc5OMT9ITGk+AnqdcmEOQAaBcnJJs6Y3A2J6g28dDFJxFKLWtttgTaxdpEuk4n4CV6C6E9xnpzjjtJ6Kna2TJhVcx46679JH5yL+km6kAal6pyy6e5fm1idA9LnCarU3n/TSY1KK3jNTFPcJNMRZJvfvq1B0Yjl0fjBJF8dRfBq97JFrTaxRo0WH32tX6csuOlpAnPMDp5CECBfW+5Ghlbs7sbpjkQQLVfCmsQKLvl+9AkRZt5hPFwyLX9QEidIv1uZCKlvRmHijOI5b+SGKqj3HiY1ijUfKaH26zqfTtrFB3+8dMVj4R9jBMTfTdNol7gotFC2u6OozkqkJfP2q9Uk1mb8arWyrIdZGUfWW7NONHoyB9Wy3I3bQQVmbg6Iu4vydksslUy67/02iXU5HiDq7P177+/3sQH3djQkyfHkVm5+53i2UXm5nQLb3ZliqeNGr1pNYoWBk6YtUuSKOivJ47mm2tkVHE+HhOgjOcdSaOQIUe8e2mLpOy6+bZomsT6teoqrpFwxDRF4TukrQSXH08HvTCfqN6PRoyp2aMeZEUslt77bKE1idXbjrZZpTLqmc5iv/MyiVqRM7mQJeAsf5s/4zCPEnFhyldW3C98iVrAdB4PRjbLx99YBT9nxRA/Fp7ikRelYkY8Q1ZZkViw9thz3lVvEijdojPoZI2GiRt4q+ahUllwwjEaRnPXnsG5M5MWaqF9a1K8ctogVb9Akn/cYUSZv0nCsTA0qng1KIqWHFvnv8q16flAcRkEstQVRP6xs+dFAKNNaZWWD2fImfGLDTvQtZ6qQIEDtaO6SIWMh7o7Xj9JdBz0Taz8Ecf0cZbIO4+lPrqZ8o8Gc+BzPDK5mE/2VQXIeWRDNOC5F3B2vKKyfqQZ3ZvVeueOHTouHHY3fML/NLH0o72h9yWINyQsNrNo2pfQ4T196Uy2ClJxnmHXsAO2MQcVb5UtanH6/Hy5Mft8OFVzk2zhIbq5vUheaUBRx+n/OwxN2lu8Qjdo36kNa1j0zIlQsX1Srsg+uS6Xa26kveRg7Y0vONXovWb/dJ5ed+5MiunBYD4hU26l75O/MTrVSofT7MJ9WoW9L6Rwd1NgRubwlNJqm7L7aZH0sEYZhv8FRf1ByHuo+NUZzoZ3ag8jfQvf9oDzUsM/oMye43Qaz/dMndTupG059kz2pq3pwxw6j/tPFKDB/W+jDr+k+94j6qWY2Yz2fzzx0Xv05mOb+V4DFzfLG/mohRcyfJ2dL+pejyZNzqcByPaHXzD1HoytV5NdMWKr3ZJ951WUBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgL/Nv6KsXZ01mM/4AAAAAElFTkSuQmCC" },
                { name: "Meydan Group", logo: "data:image/png;base64,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" },
                { name: "Nakheel", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAllBMVEX///8ET5IATZEASY8ARY0AQowARI0AR44ATJEAOYgAO4mbrskAQIsAPooASpAAPYrG0+KvwNUrY52oudBkhbBpirNykbiQp8UTVpd/mr04a6L2+fvP1+Ts8fbc5O3w9PhTeqoWWZi7ydvI1OK2xdgAK4PX4Op8mLwAM4aJocGjts9Cb6RVfKsnX5tLdacAL4QAJoEAHX6PuuIYAAATE0lEQVR4nO1diZaiuhY1DAlgAlrOEyraDpTa9/3/zz3IRIBg6b1dZbTdq9dqSiiLTZIz5ZxDq/XGG2+88cYbGRbD2aNv4YeRHpJH38IPAxyOj76Fn0XqRH8X42UA/L9rVn94Vpj99/cIrz0CuJvJ6+6jb+SnkDogvGT/99qPvpMfQhcCEOUHuPfoW/kZ5ISDfAW3f20efS8/gl5OeJkdzLH7V0iuIwLAzw8WEeo/+mZ+AqsQWB/5wSIC/u7Rd/MDIBZwqK0VE2D/BUM8J9kSpgO7dbOjR9/O92OCgDelR8NsMePXn9O5jGbqCFsAuNtsLT/4jr4XXRfYK3qUqydKePfS6nhsWWRJj7xsgAHOyY4fe0vfih4GAXMOR/kAAxJnh4PBY2/qO+EAzNz/2M/5Mguk/etlRdcQQa55x17ON1zlxz388cB7+k50ArhiR31EBxjT6Z065DVjIDOEV+zoiClfb01/2iPrNYf40+fSKQ0AW8FMIa0tbnu9GPa/RuygxwQWgEP6YxwBbl2/FtJ/+EIVfNEn+3lgZ5P79eb0FnETsi34co67QOqnV0IiHMFJxOfzlH8wzi0uFgN5ISRbfnByKV0rEtbVBYEXHOEdn87LD0YvJCJiuXLYgIcPu7fvxA6FdHjJJ38Asynn+5qhjzTIl6sFQ7HpMPdCxpebXC+GPqHCCo7EBxPf4ny9F/QQ43G2fD3XG4lYdAL4dM5F1vyh9/YdSAMvE1VnuYO2+4wsyTcaXfvVZ8RshS0UrDri590p8CRdELycXdkJbRQNYvnjJQgLul7wcptqex/ivYxNds+RMrqWe46v/e4TIl77zlEYjouj7ap0HffldolHv91CMF+CQjLndMn+xUzo1uLDb3O6ixHAoUoXupOXi8F3fTG6ySpyLIVuSMbtl9sdnvWPjNOyXRlch6xqtuRsexzuR50nfgoxH8JOvzS4lk3Go/pc3jouIp+b5RMTZvKotya2OpWxM9DZkamfaeTLz97gdyC1SloIktVWO4R0IyJ4eo28BW4xly0nmqZNWugzW+JPH5zeTXFB18bjUfMAxnkgj2wbzz8F9op/4JB+59q1RwdYYlfiSTEfS5sqW8YaqVxCiCPw3C7iMZDBDLz+Mo101us8t7yafWIxuuRcW5mzlzMoY0toXndcobvcjrrxE9sWWiQieIOctHRiflyvr0ri5byTbJPO7rmeSI/HIr2gVLLTGYYHeIXurn0BhGA3A8Hjfu9p5r3YK4NrZcs3nljEDppzVxajceQo7oVlw2jae4qBbrO9bstXAnPJZ4Qy8dU4vIshLrmOQps5I/Mp8719GxQOQneNMwvEsxsVz5HYJWfKcTHG0Mk+hMj0wogtm894JYdmS+kCDzStyXgNFXsbRutBO5nPN91Rfx3BkFyMjgHtqLyyAmk07aaEsvG8Jr69oKAbRh+pet0inUbQMXhTYsnGKpCLVZrTuIlvYZFlUn1Vz2zZ9f2DudP6nMtZC4shmcvNI78pfXRP5PDCtX4od9N/TA3UDyFdhUI4HeXeoNvkF4wKvsGkci7uttMtNcra/zPTb0x8qks439mnK5fmZ8NvbAMprIIKpzhbva7TnlORNTcyF3NGxzfifGMgA1lW1CBoF3L9WlHFW94FIbAsKepj+7vu+j+AZk/6/MbnpHD+3bThN6bStPIrfGcoT5ZXhFVsXkbEJp+eEefW8QtDgudT1tEVLiQg1f2liZMLP/WT5GrA5BHIs60cbix3fMVyIk23isQV9ql6Kp/rsLxpbNqeW5qJKIuP5S4o6DaHIlMorqgV5HWzL7O9yqeGFUbkd+8zgbVgsUo+yI2Z0GOptGpr/EJcf1WVdGa5i+2MsMjOYUzCjzOl3ZSeMxcqWHPFsb01i14dsJjQJ7o2w/Oc6mGnae3txRJ20nibHvfD4XBy7CU7o30FiZ4rq69SwoeNMfKbCAAp12ziQgflcKBLMOinJpoZZawtVuWeGxOUb+YsUDcpbNoeW6iCrYTMHybh0DARVcE8AqIwdkoNjiChlZRl44GDCbEENxGmQBiMDJ7cQ8TrcbgxgYaZ4UVNy6AmfPpMlLfVXA/gIScDsq3S1pu5+R/Z7I2Yb8ckEcqO2NQ+Vy9NuUyWMgt4MEKX4ajdbh8HU0yK4JaFahaYIehg4DFmrLwun8cbNtQ1n0/UeQxsTsq/9NRg16499ZH0KQzN4cpGC1LjYUYFFVWsIzpla3HoM+HSiM14mxzrCjeeEDn8lm+i8585PT61AxlLKqguVHiRygD1sChtoISDgT4MO9v70tmK9t956/8KcSREFmLzMD9kWqdayBBakB9lcs5DzbonPstBxsaVnnYhgHTiMU1E121MS1eqVmMXS1fi6Njrq0J4IKM/2LQxzpawT1cin8a5Qk4odz7wEh9WKBz5Ll5/satwjARj07JtPzw2kkvm9Xv5MVOzdnk2Lvzik93vL5XsRAbFfLNciQAgOuloTT8/3tsarZRZ3JLw7IZA5EmsY2/69cU/h0UEIDUg2Yx2KROmdZxyeDY3yO6KTck4oFHlxXPMtQ+b0ZGynCu+4Yd3ZyrWVhjcjXGxRyCTzVT7MNsKOPTDDx3hqBqZ+xJrYXNFBm0wpZDJLGZ1hCwgd6Z3ispxOF9OgFvRE3Ev2yDVNEKM5ClU5NSZjjAalq705RK/FUvpNXt/6nb/O0YOe/zM32MmSGtqKcMt4Nc11VeQc7ruZz4MR4cuVT4YvIaQDXfF0spH/c5FPJD5T+YE4kcOHdUdMwUJC3wMeVFwyZqiT+G+qsqJUMXQnE3itkPXJTOkAd9MYxIM4JJwpR/eZ0QcJeGmDaqfRw/ifLrxjQQuhTn9suXBQtF3aZihgYS3Ll1ffCwCNomZtyQCIQL0krv6OVyEXwzNcSDmmE7cYbmUn+WyVJL62UPBd2gmIqS0QQXVcURHmMtTQZiJ6YrpsWDW5+3dLOV+jJANJmDm06fP3AUxpYWNZJHStQM6xPbNxStyCQP49cU/BmY9ccJEtHPgW+JlsSWG+Mbk96XcV6/YbI/FibaoEITF1FvxfIby5hKL4wL/tmXcl/6hSc5Da0QL2vnskxZRhy+/yu4StxWrSR1aJEWSTy2g/0gkQT7fuE1UqI811yikpEF5Z7hbuqYvpIgGgTmGZYbFIR/ElNlWhR+XiCBcuYPDVjD+ypJYejI2jWpJII/FOBeh3LayCstxKm64HI4X2XfRdb8pDiVfCxqWNr0/LKXzoMTexewtsvP45fxKB1yRRFslyfZg2gZ55/em8NVxsZ0wEnHWSqLdkV9q+YOGWO3ypDT5MPDVH79zh5jnMKi21aewG0oFAUUZCED+XuPYLyaBUoBr4ksh+rnUEhugoPh8ViRywLM6L3eheBTIv3RLK3SWnHxU0A1dkzSwQPKrVSSaRQqzRVFN6/l9ZTBnfVmJGcJgOult4gzz3uQzcNXiFjw1MwvgsJEeYTnAGCv1w7Z/Upby5qNIP7WQi0kGDJFSXZ0NPzHHCy5jkpP0hIRSzyyAshxDjIZbIbE3Y3AdTrAvT/afYnMDFodWEX8qBydmK6JkmgIEI3K+rD7XARXhluNpqOa5Sy48lmezUcZW6zIvnFer0t6uh1GFjRd6LB0TrtMpwcgrV2mFDnH7Vdm8NGt2z/NNMiGTq/Gn2bDUkEbydkjudSyTySckxIUULsHhaaSRzEZtIGb4mMlQpSaksTiGBJWG0ULYUwrtFruk20vTXrcT68XyyLSWW/NRHvsQC1Xjrm8ma0ygg2wbOZDg9eSu5MLNP3/qRv8Y8jk9EItV/4KO5bzbnuz3k3Z3fqd2XRzMS1FbpKq78GebGM5M2kuTyMdAxmScP5prdDbRnm61ujJIlyH6g4Hzqbv6c1/2B5Ens0+k/rmzU+WVF15OnaZKr0cjpxhK5dNYUKpDt1EKzz7syJydwwpmaqTRs29nnB4aM+eBbVpEq4JBkQkbNjCuTtBZP9JkzlNssKU62EYCKBne+g2hfamXwXLkoiZSI/8JmmzFRd1hrWiUI4j6rF3LbNc75e3j9BJuecEZX2MXsEQvKhj72l2kuW+7JELAiTDMG4fpY9RbmGl1/Aw9mIqs0MyPuOj0zTaP4ll88nu+bhAXq/y5uSZtojWjDwvGtqPbONvYvJeFFUZT3SIdRbnRBs0rG9bjovq/0UUnrUcgcqGL3ZVumacefR7us/DNGCtjDMJKcIojTrrbuebErA3YmiDGJf9fwUlZx5kvgW/uQhvvIZ/tT9ZmexipjC0nGNzg8S/SacAjI2YW8FxDGpRDczYZH6/uiu3a00C25UGeaTtoX2MeVqOVTgQGPR2ROBldEClCthZZmRSFvhWzFQEVWDYk+Hzaj9JuknQ6STcd7Vcf2Wdq97BsMjzbdBbounaVMtW9tgNh3jTLhdBBYSUsbUUrc3KF74WyaXYjLDw2Mp5zM3bT6A7KlguedTYX6Ewj3cTWsA3J+vnp5pj3I/jlMHsQn8yu/L8Hi/aZwNBqImshl1wae08/KeL04hCIKqQtCzmYrIfbF2PLMNulwynAEcm8pOwfxpE7ng7bnZckW2AWzztJhs5mt3hGe+qNN95444033njjjTfeeOPVsUh62jB5N21oJJr9QlebkJAMh5q3Sc2T4rPlZDjR7KPu9sNjkQ3Q0ULcy057Vvz2ZtDff5Vi/duF0K+n02wP0PV1uY7HA4Yw0G1pnh2Eqr+yWxMcnUWQrhsgROq14gOMHF9sGvYOrgaB6Ef+C2vO4l/8oZ6gjfwvttNpcoZTSxKiNWe6YinWi4ZokhJoPcOhNC0SutXk/eJB526+nwpr+4NDtSt3DwINZJm9vhUobzPBsiAbm/Gr31BLA6OEnfreZZcX35HaGUa4VLbPW067YvQoYavWU4gStofXCMvXq/u6s+CgNt2rdV3UEbaq7XIoYU0KtKgt1ORYUcJqrfSG8S1SGBhhV0+4f4WwdxCrVEPYsmQHPUr4i74wfI5U2zBQwnaNcJErXM/OrxKes69WUjauEQ7LhLEKNJWSiP19Rz0Lx3JI7yBcrVhvICybqGhSxyqEBV9FPNxM2Gp8AQAl7DZtRN1DuJLQ3kC4eKchqvV+KhPesWSAkji8fYRR0+0ywk2q5y7C5YR2PWEmsmi38HpDoRJhwbek8MwiXBZResK0gRTeMNlbFVsq4R0r1CrzNYkwvT21KYGWMH33puWx5iu1TncK4ZhNfafy+hJzCFusu5tT7AloCdN2yRklSrwmtgrCvNoSVV/XYg5hzNSNvZIfawnTeZo32PzID6ot6yThmKXloJrmMoew3xpRk7HIK9ERpiLL+5R3XrG2BOEFK4+160azSYTZS2MKg0tHmI4ra5sUaMQWI9xeMr5I01CqgfC+TvgLPdxkLd9DeEnljDS4NISZyGK3O9SILUrYHrJXXNi6NiuUcGakVbAGNcJgPZYAqgfGLK2xAvUP3UOYv/jJPTYS3iuW+Tyqiy1W/c12/PUNw7q8G1MFQENYOY1UX5Sbtsppte/PXYRbA5r+yw0uDWHadEJwHNfFllLu3rDKulpPCOgIKygRqDsPwb8mzCo1eOlFnTBbgGLkaGvlsthSRxhAXbjENMI7FgwY6AlTkSXdXdb1qtSHkRIOByydUFt5yQmjCiwNYacAqU9pWzn9+98TbrWpqRwkOsLsfUqBNE1o66yS2OJSes7vSVPdzQiHx0kZ1GAtE/baI4mjWv3C7IVhcXakirR7CdP31GfjNtMQprpDWbQb9nAUF0vo4R73C+t/1yg9TLGkLPL2dTXCrE/OugDTPorYkpYWL3CpF+OYR5hXEeK0RljIkooyUft3FLb0iZV7VF9raCJh3vTNXyQVwueGLEJFbCne0geTXNUieRMJt8b0PbrTBJYI7yINWTrEhdhSCM94NrRbVk5GEmZ+U8j8IUmYDTwqhdbYSi3ElhoAiNmSrygnIwm32tRvYiJpWLoKTeYqOnTUC7FVCvHwtz6WXWIzCbcuMtFZEmZ3UX0V2ok5WOLHchAv1SgnQwnP3BphKrLC6n5MB5fEViVMu2ebMqpyMpRw8RJSQZiJrPrrOZnxLcRWNRDPlZPSsPR2wv/JH76+m6Yh3Bo6ZcLM+633EWEvZxFiq7bVcq4qp9sJW9MPFRf5rZSwdS6d/RyKv8Bbiqju8rpfeTo6wqIBqSDMRFZ9w5D14RHh3RrhGfOcLKmc7thqKXvMoSt24HzNWc8+dEqES2ftQ9n+0RLmW0icMBdZGoeP/gEhtmqEWzErzPOEcrqDcBW4pxKuQrSxLRr5qifLulFLmL+qkhNmImtV58sDH9xnrBNudQ6leO1/ICwmm54wOFwhXGH3K/cpf9WoXHDuiVJ5t/udX6LvrDmG2SnMnu/azY4r5bCJjzxg2b/ZI+n52RXwUP2SAcn/FtcBqe/oIHq8/tKeFQRO5MpJjl47Q32zd5Z/3N4Vh/pmbTt6jj2LDj2uROcX+3O4HvDvX9Iralke7Eu417to6xErt1tHT/2mhpNvvPHGG2+YjP8DPhA9GvnUaH4AAAAASUVORK5CYII=" },
                { name: "WASL", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS4AAACnCAMAAACYVkHVAAAB1FBMVEX///+QAACVFBiPAAD37OyTAACVFRmWAAeTCA6UDhP89/fiw8T++/uVEhb48PD17OyTAAnz5ebevL382wTUp6iwWVvQoKGtVFbw3d3FiYrozs/AgYKeNDa4b3GpTU+jPD6oQh3tdiCdKCu2aGr2qD6eOhyyX2Hs19jTrq/9ySXwnjv/+/OySh/NXyHYZiHpcyD80xD8zCD//Ozzww+QLxnoqhm9SQ6HJRfEWCHYiiLdaiDihzW+e33JlJTmy8z9wy77uDr8uzXyni3cey+/Qxzy17LuthXOdyL/9urelSB5FhWnNgDIZyTrljnojSi5NyWtAAD+8tb/7MH90oX8xFP82U/95Yj8xGz8syz95G780Zn8tEn84Dv+8az50qb+9sTxp1L9yz3rsIH92q3lnWr1tWn85cn964jiqpDegzzty7/ciFH94aT+4ZXLYzz8wlf0zWvWkH7NdGW6LgK8g3Xnl0zcn2rjvKt7DwD964J6IB+oV0P90Ii+RSu8dF75py2/ST63XDynUghhAACwaDueaGuFJCWcQCuRT030waP76auWQAzzcQDLagC4ag/ZhVrOj1TGUQDko4KYRzy4Zxzvtpe0JCbKXzbuqWa4LzTjkU/6tVexMqwQAAAWnklEQVR4nO1ci3/TRrbWSJYiyZKRjO34LWontosJ5RGCIbZ3m4QmQEic7EJpSoFSyNKwpbfQLtlt07Tb3W3phWXZvXUL/WfvOaOH5RfBCcT+bfSVX+1oNKOjT2fOfGdmZIbx4MGDBw8ePHjw4MGDBw8ePHjw4MGDBw8ePHjw4MGDBw8ePHjw4MHDLuDY0tLy8vJSsd92DD6Ky7/7/W/eeefNN988fvzokYuXrnmcdUXxzLuXL7/99tu/AQBhR48eOXJk/3seYx1RXHl/87eAZroAVz7ot2kDiKsjm++/T9lqpms/4Mq1fls3YJi7PjUyAnRhZ/w94kNgy6Fr//73jvXbwkHC1YWDIyPgXu+uLM9Zoaq4tPzJxQZf+z0Hs6HcWLhw8ODmrx/NtZYsfXDFpmu/F8FMKDenJy9M3VrtXHrtos3Xpd01a0CBbC1c70IW4toVk64jHl+Am4enJ2+8+JQ/mHQd8fojc/vw9McvcC0T10y6jizvhkWDjLWxsTuNCD+3tPzHTwB/XF5uVg5LVyhdx/e4wg/cHbtjU7C08qktUVFyXby05Drx2BVK1//0w8jBwWcTdxX6pfjR+5cvW5L+TVuiXvnA5U1XkK539nR3jM5MrOEn5ouNDOhNl6JvEHZsP9L1qdI/a/uOezPfyvCxen0TMyBIgd4xJ2+OdsoXl5CuE2f6aG6fkb9/4HMU9VOYAl2+/OlXHy0vzR07tvTjJ+8daeQ/f7ZP/+Ao0HW9j/b2GfcW1wvM3BcLkAGNvHumedRbuuTwdcUuuQh0nd1Sdfy3Ql8c56Jzk5ABjay0pYsQ0H68Yuc/lqpYQrr+tLtGDg5C/MnxBx9DCrTSTU7ZhF2x+LoEdD2Wd83AwUJ2/eTo/PT0Fx08y0bxz2b+Y/XHY0jX2i6ZN2CQjXMnS/OPt8gXrfznovnX706cnb39+k0bROz7y7lDY/MPtzrtGM1/jn9C/1gCur597ZYNJPRz46Wxz7Y+j+Y/x98xU6JPz87+HHjNhg0mousbpQNfulV68dgSonVe3tTzv6ffV87OlqK7ZuIgYd/4zKHx83nrr+LyV5/+9m0rA7p4qWlq/lhDzy+dnZ2I77qpgwB9Y2N8fPRr+n313cv2iqy9YvZn14TEtSO2ni8CXf5+WNt3VGbGga7zoAvO/LppZdiuBHv//osNwi45ev7W7ESwbyb3EfI3o0jXgW9Xf6FrjNS9kK3jNl2QLtphrHjU1vN/2qN0VWsnx08CXfMLFw6ObG7+ugLpdbFYnFtaNhPs5uXFH4GuWRgSK3/do3TFOErXPOSMB9uWGK+9Z/NlL2d8iHpe+ft3f5udqO66rQMAYx3ogiRocnLyeYfiY3+wlsv+YP79I3jX13/57u9nHu9JIaH849zJ8e9LkDPOl57e6ZQ2HnuvaXkR6Dr03Q8K0OXbVUMHA/I5oOvn0vz8oUOlsdNvPew0qWzliz/S82+BQP1BZs48vrvLlg4EkK4DpdKhA0jX4dOPpjvNKlv54hKzr/KP/wXFBd3w6uO9mWL/5dz4xsSDqEXXW288euNhe5csXkS6Pkytr588eXb2Kej5G4/3Yl9kmB/WFzcOfMlEv50w6XoDCLvzMNoyUxg4uh8U/T/PnVz/4TqOibHHe3Q2NcIvjo6ev80EPntq0fXGW2+9dXr+yb9vr62txdfi1QeVz7/8fvQ4JkDjJyPMyuxEJV079YLJxP9m5GujIFLPP8CF/6cWXadPHz58eOzp0wnAecCB0dHxvyJd/9rHVP86W6rX7+/ZhbPwOtB1aAL4Uh6efuTQNTZWghEAcOAAsDU6uv5PoOtCsfLdAaCrFuu31X1DnNJVeoojnfzw+aNH7XQdOH/++8+rF985cer79frGbKmW67fRfURlHemyRercw5vTELuArxLyRfvi159XIU9cBrqgHwJdxl5e8le+PIB0QZy/Ycbv4tzaT/9+8uTJ3SdPvv7swVrUnGWO//3EiVPzi0jX3px2tiF/e96k69EbN7oMeL7Cf9bX/w/o2lgszT7ZXfMGDvLX5yldoLkeTf+02rLguq9a+ZIDfXqohHTNzD9+0FQcgNOVhmaVdV1vaT6g6z1r2pZW2yzWfbriXK/zCjGWvJ6oodyecIsu0FwP1tbyoLtQc41yo+PjJ8chrzx7an7ms5XHTXQUNKGqJ3lnqIzwQ3zLbSZ4PtOj3aEhIa5n+Eq38iAZIuaMiB+u13kaPESG+Nc1axJ94hZdT59S0WVpLmBrfRznLE6dmr+Xn/2Xu55iiHyqQiTJpihC1Ha6pGSPdGXMVvluUTLIsZxNl0q60aW+NrpApX7siK4xW0VYmov7z+cfT05PT08CXc9ONSvUHMdVghxJ2h0iQtg2ukjPdIVpq1yy20aMIBEc72K7ehf7GulimNWbELtMEeGIrvMoufKrX0xS4Mh4q7mSHAkpTKHidNBXQ5dcaW61FUAX12+6oGut/nTz49Onrb44cejbrz9/AFdcvQAAtlaBromlFzfxaujaCkHCOt4l9I0uhDKnr5mI+sy+QNm6sPDFXPTUfG2raa5do2sAvKsj5g5SXC/q9dn5b7Y6e7foGoTO2AkmW1O3GL1eP/W4azRhQsPhXKCZLj0dTsd7HxnlQiIXphgOtB/Locu7Q/3LdEZlOJyOBtJhG7lyyD3o+mPYeC4W3PFTnbt+8ODICLAV3VjcOHWn+4kVTsu00BXlRC6I3qX2QleF53jRBLFaUmKEEPMQvUiTkOjuXUKDLl7k8vs40QG0l7CH3aDAmY3znBh6eTs7oXhrymTL9/PMRunUTy+4S6K20yWQYK+dscypAivyPC8KTkspjhVUjSdwlAiUrpfqjG66WAJ08QgC/2mqIJBhy3BOwsahAD65xEsb2gnm7vFbxcBd0Ba/vGgO9RXR5SeCoPHZWCyWEwWrpQKwpYl4DFDBptx0vVRnRLrkRMxGSuJZgaOulCeswGfKlVgskeZZluxkcf4qZevXonJnfv7w2lfXX3BqZ7poZ+wldmU1luT24beC01JaFEi2SeC7R8budLV4l7tQLhNBMvBbSmP5lGUeXFIMv6yl7VilbL0/xzwHTb/GnLiKB2PJpNEh+e1IF9srXbIhSdZ0WoMuuLNk82nb6ozNxWGRpTmWqqqC66CqbntL99wFDPObS8yNycnpB8y9E7QvholmdDj51XhXIKNqKfOrQ1cA7rtltrub7lJCoYi9d6OtM7bYCxVxnOdY+4KAGM9q253NU365gGydYR4uTC7cYCpPzffycmLHu381dMlJScyaXx26FMJq5ebTunXGwBBxgvUWdAEztHmetS/I7Iyuh/jm/9QKs7pwYeEXJlg7a+Y/McIOdYiHryjUQ3cQzJssgFPRIMYkJVVs7iINuoLNdAmq44hNMrWNLnBjsxNmJJZ3ioAucZt0zS1cuIDydG4KZGoxWq9/aB7P86wqVqK+gM8NOcZ3pYtXk7pPp/+aK7VDjvCClAnBiYEIxh44PyBXIHhlCnqjbgCoJHEsy6clt3ZvoWuo6vPBZeF/2GWhoo7f4V8+lIHhg54ZI4I6lPDn83llR3Q9nwS6Ds4poFOnVhmj/tR+5zNBWJWYGsYFUejuXazKmWit1A5JEASzdU0A4WUeYwVBaroilAn0C2gm3jWWNdMF2sq6LiiRxncEUVmSoR7rk1DgYWGU9pxt0rX2GOiaOsOsTI1Ah4zV6l84RTFQdKoD1vpgJZOuxvRgHmKXn9JlwzwbPtnW6naBap9Iv7UeY52zrTbgwWVcw3QLXWw3qKpGhq2ELp4hIjasIV28uj26lDvTk5MQslanQHcx+fuL912v5OVjSXGoDbxA6eIduqA7cDp2xvZzXxX4TMJ9e3Kmma4OVpoQUo38MBAKC9ASH91BZ3xwGumaK+KP4qwqd2dmWl7s6BiE0GDzgzIOIRodfqt4tSO0jCGG5AyiGOqrL1lN8fn2odnQGbc1MipP5qenFx4yt6ZGNleY22Oluz23oqR4K5ruIsowPtuJpsYO9boCZUiqsJ1ZibUxoOs57YrvM1HMgHqrr+wLpmGME7pP+LwexEF1hnGkDFR4QUz3VtkHoyRJbX1eOz4rzc9D2nOdytQ709M3e6qtp9MZGOPUHeWr20OWQDaezg5neIGOMy8HOZvL0joqn9/67PbqP5dK8zchwx4ZeZc5A6K+t+1c+hCITZXwfdh6HzCIqkoijHUi13WZsr2WqIm0DtnWhFf1/s+lsbUipIybS0UQ9Vu8HNoKnSeECOW+7MeUUxJB8OkeXlqC5IkHm/nh7fgWvii0UXqCvxY39RWzArlQjz96E4jFQvG+bTzxVUOVSLCnaXo5lojFeqzjQnhxY+ZBkar6ORD1V7fZzF7Bs/rijAIp9oUbzFdTI7/u8BeVquVEoh++FkkkIs4f8VjhdV1HqdXr9yBphBA/R8fGnSHCEWtuYXeR5rhh+3se0sKXD/29Qa7Va8G5x5OTvzArm5AD7RA4N9APuobFxlRyhAji8ItO3gHAu2q+29PT06uQBG1+tNPmBoGuOCHc60oxlHr9GXNnfvpj5uomqPqdYhDoYvypyGvbUvuslgs8nT/8kPn1FTjXYND1OpGqJdYmSmM+zBnpsGjN/cb9fusF/0DQH7RHOyXq91ebNjbiEQvxbnTJWKtlakDZV7UvIOehtKWKolf9/mjrbAK0E29ZvoHKfhnoktLUBshcZfPDMh6aabI3EHfs3c5CUKEWi8yAUL01BToVELeWV2CssdLWKkc488byZYHKaKFsS2JfwjyCwLGpE13+rEjLjUqDE1/FgAr0AvEULTYiLgESTWTMC6Vcv8mgm9fis41jSiEMwyDRgS6BKnwuQhMNzkpwgsOYdJBkxW67kG6YS7YjVQP11L2ZmdtFOu8MSFl0hR33jnMCpUuJ8bzKCgIL2SmfoE9MzxBVwCMCywpirhNdvjDBdXc6qSzYaVpBIJLA4villKGYlVQoTTqpTGUIsnZokVU1UrZ9ICQRVdI0nB2111ajwwQzVonSpeLeB0qXqhIqvHw5KBY1iZVIxmy7TETaLtqsatuaQyk/Sy/ej68uHLyOfTHAx9vpYpEuJUuAEg4fDFyT0MIcMR+q+bjSHejyJQnLahw+TNyXYOqhCMFbQPdVwsAB4ZMC4VnJztPLBDNghMYKJG3yFYMTOSOVlTjVujgTzWjw5KBtpIvNDAPShQZdepJnCZ9LpaEZs+0gx7KkgW0lQr56vb7ou7GwsIJ/hbgOdFHvosscOb9P1oNwjyyO1b4hVU3GZQf4C2EtdA3zgsSnsFYBrKdL3cg/yydDUaiQAnoNPKYneFU1V8hCeFPpQlT2+bO8KpCsdVAzaAgoiJJAcB5VMTRBFBNV3GkOod55HceiC4pZQrdZ+LI8S6drUhqrVXwuc7eD/LP6N4Hnkwu0L6a70RUHL+Ht5KIAfYL34cJay6Jzq3fB85SSdqArgwfhFLUhsqRsFQtazupZQU0Vcc1cgR7P2xlNUIQH46cUiJabQQQA/ypQBkXD6lDukVE3iysc68zRxIDYpMykRdeq/7aRrQ3PTU9O4kRXnu9GFzwZ0kjLQrxAKkwU7t9oigCtdOVEVmvMlGQ1Ae4gihzRv5W0KDW2PIeIgBvBC5x7IrtA6ExphahOO0Gky1Bw+liyL95Ol6ypmr1mHSiLrMoVcLOEtvOJuUott3Z6+jk+5QrpRBfELgVsyzSqKIaExRlJEDMVVwxo6YwBQXVtS2CiEKdzmKRYE5lRYvZOp008OQUjg2uQhKjE+/ByVmcLZAl0tpSveT9FM13YGcGveWvUCmZ4VmPR4XBdNlXdoYb117IPxubppHNa7OxdeVx3jbjqlDXcBBTkVBwmjZj95Fvo0qGWe3YgjJsuEkTNODtvhlwRpEKwzbTk2slA3YtUddHunzCmspqIbeLSpvN7IO3eZS21U34lCLooYgIZDcYdkkltS3LZkGvh26Ux3OgcENXO3pX3m8Oj69aoNUEBgjGMO1zGlE0d6HJ7fwXXQrOaZCm6GGnanhSkd2j6mIModPtgHMY4pEbPcRA06a07+oai3btyIFzxoRREdC0riOlpGJNBQnBaeQdbf1PP7s3gS7QYu7vRRQTOHaUq1sPTYxkUTiht8JFvQVeIV7Vmutwbovyd6NIhZgarwFkVRxhNGBIKtlld6ULvClO6dNp1c47lSsig4hGV47Y9TK9/szGD62XVhgktnbHJOMbxLkCgkGJB2bASSsSWUK+b+5gatcBUuUEXNuIqLfC4ttvmXUAXPEYYI7LgWiRs3/oW3pXVoLH8ELiW1rSGoVQhY8AuQcLb5itSX7yPt9WdLp00x64GXQxmlVmQrvgaUztdTd4FPcRgsqK9Kgjh2K0Vy0NY0EIX7h7M7xNwmCsQjTdvPQBZzRbeFSG4cSmtcWmT36BrJ108IeImlO3P8lRrNRTcVc5esVPSkt1R/NSujOQeGZvpYjAfATEV24KuKMTcMtPwLh/otsbuN11U8T29FrqGRRWGAxAkQ3kmZ926MswNRZrogofrzAia3pUHXZtloqL1jKs8Z7iejBzjBbXXdwkb8NVrOBzl4ZGYW/Ki0L1Es33cfJfHQbjxOEK+VrqACjSvE11V+7nKwxpul8xqzppzCpq26VTCEKV0ky7FmTzGXVFl6mOiIcvm/UEuCBow76YL8iZHfVgy1RBR5FlZfRB1dZO9aWn7uwdRqn6j4LYWkFc0nc5pgqBl0by4qiIz+0Bj8eZ6olzhfXaod5DXcOdnJ7r8FiPRYQgk4AONzoiOoKoFiwPezG2od3GxgHUl1nxVMQ0KN00fnwLZlABZY9w9VuN2zVijUaSrimmIOU+olyFmcs0CFUTudrfD4b3U6qidcPeekChEDPiE1MyIFBJwgFSoRarAZ1KhQixJ1AD1rkDBQSQpocTqSBfHpyPBUE7UIH2MMm7vwkZVfjjkDyZAEpmvSlK6NJKMBQtlzM852p10HhSxlIWrG5Cra0lfc+wK4D75VFXHl+/tFDvGQTw3oJmsgNkq3IM/6ACSlF73VTQhVsNeKKdB+PIELOLTaUhxCA4i1qRABOcUNDgiQb6IdMlRrpHeo74PdBwZQbLh/ILIChrV2W66oIJISyHBJgZ92pQuokpghSYJkh0B8ipObeDVIdPH7etN3gUZogqlfNMETgInPqAZusSPT9xo2AuxhtvR8lq2hu4VyIGRkqSRcCAwbH3NWU5bTdIDIgG/rxAR6OIlBzDW5HHhTOJbvctqEgynG2aYHK+lG0G2ahBexOqaJYQoXZUhIkJc0LiMc08goXAnI5ypxmiQ4CS3tKlIeBVKlyhZ04OFDKdBFXgcBtX/hujsZARrdrb8oZTN+OpPGUkjizvulGAWvqYaI7AcTKWTRjoBdx3JJNNyNJk0bIQjPmqgkWwfGavQZDKdsFKWcjKZc41Jir+cNtK5iK2nzJExGktD49mCO7zEE+lMxrDPzGeMjHufgx7JGRkJeNKNpE1yoADHMumy37weVLdhlHf827n2PSiNqaC2WSHFGp4UWiLLLZNHSnMFR6YqAVlxNdHWqIs+W0gocqBtoFcCgUbV9hkrJUBfY5VlV3tyoNFMoIGB/PUVnev9RaUW3bWX0KrqXwZ7my7Oo+ul4XlXT9A5rmd1k+G47NZn/VdCyefzvWYa0Xx+tzdRe/DgwYMHDx48ePDgwYMHDx48ePDgwYMHDx48ePDgwYMHDx48ePDgYef4f4RQeQlW/oTxAAAAAElFTkSuQmCC" },
                { name: "DAMAC", logo: "data:image/png;base64,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" },
                { name: "Meraki Developers", logo: "data:image/png;base64,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" }
              ]).map((brand, i) => (
                <div
                  key={i}
                  className="shrink-0 h-24 px-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-500 flex items-center justify-center group cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-2">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = "text-slate-600 font-black text-sm text-center";
                        fallback.innerText = brand.name;
                        e.currentTarget.parentElement?.appendChild(fallback);
                      }}
                    />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight text-center whitespace-nowrap max-w-30">{brand.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center gap-1 mt-8">
            <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-4 h-0.5 bg-primary rounded-full animate-pulse" />
              Scroll to see more
              <span className="inline-block w-4 h-0.5 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Icons Grid - Elegant Cards */}
      <section className="py-20 px-4 overflow-hidden bg-linear-to-b from-white via-slate-50/30 to-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(236,72,153,0.05),transparent_50%)]" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.3em] mb-4"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Quick Services
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">Everything You Need</h2>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto">Comprehensive cleaning solutions delivered with precision and care</p>
          </div>
          
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .service-slider {
              display: flex;
              gap: 1.5rem;
              animation: scroll-left 60s linear infinite;
              will-change: transform;
            }
            .service-slider:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="relative flex overflow-x-hidden">
            <div className="service-slider">
              {[...services, ...services].map((service, i) => (
                <a 
                  key={i}
                  href={service.href}
                  className="flex flex-col items-center justify-center shrink-0 w-45 p-8 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-5 shadow-sm">
                    {service.icon}
                  </div>
                  <span className="text-xs font-black text-center text-slate-800 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors duration-300 whitespace-normal">
                    {service.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

     
      {/* Vision Mission Values - Redesigned */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(236,72,153,0.03),transparent_70%)]" />
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.3em] mb-6"
            >
              <Shield className="h-3.5 w-3.5" />
              Our Foundation
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              Built on <span className="text-primary">Trust</span> & Excellence
            </h3>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              Setting new standards in the cleaning industry with unwavering commitment to quality and transparency
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative p-12 bg-linear-to-br from-white to-slate-50/50 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-200/60 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
              <div className="relative h-20 w-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="relative text-3xl font-black mb-4 text-slate-900 leading-tight">Our Vision</h3>
              <p className="relative text-slate-600 leading-relaxed font-medium">
                To be the first choice to our employees, suppliers and customers in the region we operate.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative p-12 bg-linear-to-br from-slate-900 to-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-900/30 border border-slate-700 hover:shadow-3xl transition-all duration-500 flex flex-col text-white overflow-hidden"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative h-20 w-20 rounded-2xl bg-linear-to-br from-primary to-pink-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-2xl shadow-primary/40">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="relative text-3xl font-black mb-4 leading-tight">Our Mission</h3>
              <p className="relative text-slate-300 leading-relaxed font-medium">
                To provide reliable , flexible and consistent solution to our internal and external stakeholders in our hygiene business.              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative p-12 bg-linear-to-br from-white to-primary/5 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-200/60 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
              <div className="relative h-20 w-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="relative text-3xl font-black mb-6 text-slate-900 leading-tight">Core Values</h3>
              <ul className="relative space-y-4">
                {[
                  "Certified Excellence - ISO 9001:2015 & NADCA Certified",
                  "Complete Transparency & Integrity",
                  "Customer-Centric Solutions Always",
                  "Sustainable & Eco-Friendly Practices"
                ].map((val, i) => (
                  <li key={i} className="flex items-start gap-3 font-bold text-slate-700 group/item hover:text-primary transition-colors">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 group-hover/item:scale-150 transition-transform" />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Slider */}
      <section className="py-24 bg-linear-to-b from-slate-50/50 to-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.04),transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.3em] mb-6"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Our Services
              </motion.div>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-5">
                Exceptional Care for <br />
                <span className="text-primary">Every Space</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Specialized teams equipped with cutting-edge technology delivering pristine results
              </p>
            </div>
            {/* Slider Navigation for Services */}
            <div className="hidden md:flex items-center gap-2">
              <motion.button 
                onClick={() => setSliderIndex(Math.max(0, sliderIndex - 1))}
                disabled={sliderIndex === 0}
                className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button 
                onClick={() => setSliderIndex(Math.min(services.length - 4, sliderIndex + 1))}
                disabled={sliderIndex >= services.length - 4}
                className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white hover:bg-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Services Slider */}
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: -(sliderIndex * 380) }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Original services */}
              {services.map((service, i) => (
                <motion.div
                  key={`service-${i}`}
                  className="relative h-72 w-90 rounded-4xl overflow-hidden shadow-xl shadow-slate-200/80 shrink-0 bg-white group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <a 
                    href={service.href}
                    className="group relative block h-full w-full cursor-pointer"
                  >
                  {/* Image Background */}
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/30 to-transparent group-hover:from-slate-950 group-hover:via-slate-900/50 transition-all" />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-lg">
                      {service.tag}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <h3 className="text-xl font-black text-white mb-2 leading-tight">{service.title}</h3>
                    <p className="text-slate-300 font-medium text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {service.description}
                    </p>
                    <motion.div 
                      className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Learn More <ArrowRight className="h-3 w-3 text-primary" />
                    </motion.div>
                  </div>
                </a>
              </motion.div>
              ))}
              {/* Duplicate services for infinite loop */}
              {services.map((service, i) => (
                <motion.div
                  key={`service-dup-${i}`}
                  className="relative h-72 w-90 rounded-4xl overflow-hidden shadow-xl shadow-slate-200/80 shrink-0 bg-white group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <a 
                    href={service.href}
                    className="group relative block h-full w-full cursor-pointer"
                  >
                  {/* Image Background */}
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/30 to-transparent group-hover:from-slate-950 group-hover:via-slate-900/50 transition-all" />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-lg">
                      {service.tag}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <h3 className="text-xl font-black text-white mb-2 leading-tight">{service.title}</h3>
                    <p className="text-slate-300 font-medium text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {service.description}
                    </p>
                    <motion.div 
                      className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Learn More <ArrowRight className="h-3 w-3 text-primary" />
                    </motion.div>
                  </div>
                </a>
              </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Slider Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: services.length }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setSliderIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === sliderIndex ? 'w-8 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Expert Team Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.05),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.3em] mb-6"
            >
              <Users className="h-3.5 w-3.5" />
              Meet Our Team
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              Dedicated <span className="text-primary">Professionals</span> You Can Trust
            </h3>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              Our certified cleaning experts are trained, background-checked, and committed to delivering excellence
            </p>
          </div>

          <style>{`
            @keyframes scroll-team {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .team-slider {
              display: flex;
              gap: 2rem;
              animation: scroll-team 60s linear infinite;
              will-change: transform;
            }
            .team-slider:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative flex overflow-hidden">
            <div className="team-slider">
              {Array(2).fill(null).flatMap((_, outerIndex) => 
                teamMembers.map((member, i) => (
                  <div
                    key={`${outerIndex}-${i}`}
                    className="group relative shrink-0 w-70"
                  >
                    <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl shadow-slate-200/50 h-96 bg-slate-100">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Info always visible */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                        <h3 className="text-xl font-black text-white mb-1 leading-tight">{member.name}</h3>
                        <p className="text-primary font-bold text-xs uppercase tracking-wide mb-3">{member.role}</p>
                        <div className="flex items-center gap-2 text-slate-300 font-bold text-xs">
                          <Award className="h-4 w-4 text-primary" />
                          <span>{member.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* UAE Government Sustainability Alignment */}
      <section className="py-24 px-4 bg-linear-to-r from-primary/5 via-blue-50/30 to-primary/5 relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-black text-xs uppercase tracking-[0.3em] border border-primary/30">
                  <Leaf className="h-3.5 w-3.5" />
                  Sustainability
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                  Committed to <span className="text-primary">UAE's Green Vision</span>
                </h2>
              </div>

              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                HomeWork Hygiene aligns with the UAE Government's sustainability initiatives and environmental commitments. We're dedicated to reducing our carbon footprint while delivering exceptional cleaning services to the community.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Leaf, title: "Eco-Friendly Products", desc: "100% biodegradable, non-toxic cleaning solutions" },
                  { icon: Sparkles, title: "Water Conservation", desc: "Advanced techniques that minimize water usage" },
                  { icon: Award, title: "Green Certified", desc: "Aligned with UAE environmental standards" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm uppercase tracking-wide">{item.title}</h4>
                      <p className="text-slate-600 font-medium text-xs mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="/sustainability"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm hover:bg-pink-700 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/40 mt-6"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 h-full min-h-125">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
                  alt="Sustainability"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 to-transparent" />
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/50"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-widest mb-3">
                      <Leaf className="h-3.5 w-3.5" />
                      Green Initiative
                    </div>
                    <p className="text-slate-900 font-black text-lg leading-tight">\"Cleaning Today, Protecting Tomorrow\"</p>
                    <p className="text-slate-500 font-medium text-xs mt-3">Every service contributes to UAE's environmental vision</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Redesigned */}
      <section className="py-24 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.15),transparent_60%)]" />
        <motion.div 
          className="absolute bottom-0 left-0 w-150 h-150 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-black text-xs uppercase tracking-[0.3em] backdrop-blur-sm border border-primary/30"
                >
                  <Award className="h-3.5 w-3.5" />
                  The Difference
                </motion.div>
                <h3 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
                  Why Choose <br />
                  <span className="text-primary">HomeWork UAE</span> Clean?
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">Elevating hygiene standards with certified excellence and innovation</p>
              </div>

              <div className="space-y-10">
                {[
                  {
                    title: "Advanced Bio-Protocols",
                    desc: "We use laboratory-tested solutions that are 99.9% effective against pathogens while remaining family safe.",
                    icon: ShieldCheck
                  },
                  {
                    title: "Dubai Municipality Approved",
                    desc: "Full compliance with the highest government standards for commercial and residential hygiene.",
                    icon: Award
                  },
                  {
                    title: "Zero-Latency Booking",
                    desc: "Our real-time scheduling engine allows you to confirm your expert cleaner in under 60 seconds.",
                    icon: Zap
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-8 group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="h-20 w-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                      <item.icon className="h-10 w-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-3">{item.title}</h4>
                      <p className="text-slate-400 font-medium leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div 
                className="absolute -inset-20 bg-primary/20 blur-[120px] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative bg-slate-800/50 backdrop-blur-2xl rounded-[4rem] p-16 border border-white/10 shadow-3xl">
                <h4 className="text-3xl font-black mb-12 tracking-tight">Direct Support</h4>
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center font-black text-2xl shadow-xl shadow-primary/40">800</div>
                    <div>
                      <div className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Toll Free Support</div>
                      <div className="text-3xl font-black tracking-tighter">800 4663 9675</div>
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="grid gap-6">
                    {[
                      "Instant WhatsApp Booking",
                      "Same-Day Urgent Deep Clean",
                      "Key-Drop Service Available",
                      "Subscription Discounts (-20%)"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-slate-200 font-bold uppercase text-xs tracking-widest">{text}</span>
                      </div>
                    ))}
                  </div>
                  <motion.a 
                    href="https://wa.me/80046639675"
                    className="w-full h-16 bg-white text-slate-950 rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    Chat via WhatsApp
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section - Slider Redesigned */}
      <section className="py-24 bg-linear-to-b from-white to-slate-50/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.03),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.3em] mb-6"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Expert Insights
              </motion.div>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-5">
                Knowledge & <br />
                <span className="text-primary">Expert Tips</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Stay informed with professional cleaning insights and maintenance guides from our specialists
              </p>
            </div>
            {/* Slider Navigation */}
            <div className="flex items-center gap-2">
              <motion.button 
                onClick={() => setBlogSliderIndex(Math.max(0, blogSliderIndex - 1))}
                disabled={blogSliderIndex === 0}
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button 
                onClick={() => setBlogSliderIndex(Math.min(blogs.length - 3, blogSliderIndex + 1))}
                disabled={blogSliderIndex >= blogs.length - 3}
                className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white hover:bg-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Blog Slider */}
          <div className="relative overflow-hidden group/blogslider">
            <motion.div 
              className="flex gap-6"
              animate={{ x: -blogSliderIndex * 400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {blogs.map((blog, i) => (
                <motion.article
                  key={i} 
                  className="relative h-125 w-100 rounded-4xl overflow-hidden shadow-xl shadow-slate-200/80 shrink-0 bg-white group border border-slate-200/50"
                  whileHover={{ y: -15, boxShadow: "0 25px 50px rgba(0,0,0,0.15)", transition: { duration: 0.4, ease: "easeOut" } }}
                >
                  <a 
                    href={blog.href}
                    className="block h-full w-full cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-4 py-1.5 rounded-full bg-primary/90 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 flex flex-col h-[calc(100%-14rem)]">
                      {/* Date and Read Time */}
                      <div className="flex items-center gap-4 mb-4 text-xs font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 line-clamp-3 grow">
                        {blog.excerpt}
                      </p>
                      
                      {/* Read More Link */}
                      <motion.div 
                        className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group-hover:gap-3 transition-all"
                      >
                        <BookOpen className="h-4 w-4" />
                        Read Article
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* Slider Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(blogs.length / 3) }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setBlogSliderIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === blogSliderIndex ? 'w-8 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <motion.a
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm hover:bg-pink-700 transition-all shadow-xl shadow-primary/40 hover:shadow-primary/60"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="h-5 w-5" />
              View All Articles
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Redesigned */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.04),transparent_60%)]" />
        <motion.div 
          className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.3em] mb-6"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              Testimonials
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">What Our Clients Say</h3>
            <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">Trusted by thousands across the UAE for exceptional service</p>
          </div>
          
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-8"
              animate={{ x: testimonialsIndex * 400 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div 
                  key={i}
                  className="bg-linear-to-br from-white to-slate-50/30 p-10 rounded-4xl relative border border-slate-200/60 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col shrink-0 w-95 h-105"
                  whileHover={{ y: -10 }}
                >
                  <div className="flex text-primary mb-6 gap-1">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-lg text-slate-700 font-medium mb-8 leading-relaxed grow line-clamp-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-5 mt-auto pt-6 border-t border-slate-200/60">
                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-200/60 shadow-md" />
                    <div>
                      <h4 className="font-black text-slate-900 text-base">{testimonial.name}</h4>
                      <p className="text-primary font-bold text-xs uppercase tracking-wide">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Slider Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: TESTIMONIALS.length }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setTestimonialsIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === testimonialsIndex ? 'w-8 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-primary via-primary to-pink-700 rounded-[3rem] p-16 md:p-20 relative overflow-hidden shadow-2xl border border-primary/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] opacity-60" />
            <motion.div 
              className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-5">
                  Experience the <br />
                  <span className="text-white/90">Gold Standard</span>
                </h2>
                <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
                  Join 18,000+ satisfied clients across the UAE. Transform your space into a pristine, healthy environment.
                </p>
              </motion.div>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a 
                  href="/book-service" 
                  className="bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:bg-pink-700 transition-all inline-flex items-center gap-3 hover:shadow-primary/60"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Booking Now
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="/quote" 
                  className="bg-white text-primary px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-50 transition-all inline-flex items-center gap-3"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Check Availability
                  <ChevronRight className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
            
            {/* Decorative circles - Optimized */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-pink-300/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.7s' }} />
          </motion.div>
        </div>
      </section>

      {/* Strategic CTA Section - Before Footer Redesigned */}
      <section className="relative py-16 px-4 bg-linear-to-r from-slate-50 via-white to-slate-50 border-y border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.04),transparent_60%)]" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Ready to Transform Your Space?</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">Join thousands of satisfied customers enjoying pristine, healthy environments across the UAE</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <motion.a
                href="/book-service"
                className="px-10 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-wider text-sm hover:bg-pink-700 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 inline-flex items-center justify-center gap-3 whitespace-nowrap border-2 border-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="h-5 w-5" />
                Schedule Now
              </motion.a>
              <motion.a
                href="/quote"
                className="px-10 py-4 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-wider text-sm hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 whitespace-nowrap border-2 border-slate-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Clock className="h-5 w-5" />
                Get Free Quote
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

