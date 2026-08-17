import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { submitEnquiry } from './services/enquiryService'
import { AdminLogin } from './pages/AdminLogin'
import { AdminDashboard } from './pages/AdminDashboard'
import { ProtectedAdminRoute } from './components/admin/ProtectedAdminRoute'
import aboutImage from './assets/photos/about.png'
import workImage1 from './assets/photos/2nd-page-image.jpg'
import workImage2 from './assets/photos/work-2.png'
import workImage3 from './assets/photos/work-3.png'
import heroBackgroundVideo from './assets/video/PixVerse_V6_Image_Text_540P_Create_a_premium_c.mp4'
import globalMindsetImage from './assets/photos/global_mindset.png'

const capabilities = [
  ['01', 'Strategy', 'Positioning, portfolio direction and decisive roadmaps.'],
  ['02', 'Intelligence', 'Signals and insight that turn uncertainty into focus.'],
  ['03', 'Technology', 'Connected platforms designed for meaningful advantage.'],
  ['04', 'Transformation', 'Change made practical, deliberate and enduring.'],
  ['05', 'Investment', 'A sharper view of value, opportunity and momentum.'],
  ['06', 'Global growth', 'New pathways across markets, people and possibility.'],
]

const method = [
  ['01', 'Discover', 'Understand the landscape.'],
  ['02', 'Define', 'Identify what matters.'],
  ['03', 'Design', 'Create the right path.'],
  ['04', 'Deliver', 'Turn strategy into action.'],
  ['05', 'Scale', 'Build sustainable momentum.'],
]

const industries = ['Technology', 'Financial services', 'Real estate', 'Healthcare', 'Consumer', 'Infrastructure', 'Emerging markets']
const projects = [
  ['Transformation', 'Operating system for tomorrow', 'A placeholder engagement exploring the future of connected operations.', '2025'],
  ['Growth strategy', 'A new route to market', 'A placeholder brief for an ambitious global expansion.', '2024'],
  ['Investment intelligence', 'Seeing around the next corner', 'A placeholder platform for clearer capital decisions.', '2024'],
]

const projectImages = [workImage1, workImage2, workImage3]


type DetailItem = {
  number: string
  title: string
  shortDescription: string
  fullDescription: string
  areas: string[]
}

const capabilityDetails: DetailItem[] = [
  {
    number: '01',
    title: 'Digital Transformation',
    shortDescription: 'Turn complex operations into connected, scalable systems.',
    fullDescription: 'We help organizations simplify fragmented operations, align priorities and modernize the systems that shape how work gets done. The result is a clearer operating model that can adapt without losing control.',
    areas: ['Digital Strategy', 'Transformation Roadmaps', 'Enterprise Modernization', 'Process Optimization', 'Technology Advisory'],
  },
  {
    number: '02',
    title: 'Product Engineering',
    shortDescription: 'Build digital products designed for adoption, scale and long-term value.',
    fullDescription: 'We shape products from concept through delivery with a focus on usability, architecture and the business outcome behind the interface. The work stays practical, resilient and ready to evolve.',
    areas: ['Product Strategy', 'Product Design', 'MVP Development', 'Product Engineering', 'Product Modernization'],
  },
  {
    number: '03',
    title: 'Application Development',
    shortDescription: 'Design and engineer applications that move business forward.',
    fullDescription: 'We create web, mobile and enterprise applications that connect teams, improve workflows and support meaningful growth. Delivery is guided by integration needs, system clarity and long-term maintainability.',
    areas: ['Web Applications', 'Mobile Applications', 'Enterprise Applications', 'API Development', 'System Integration'],
  },
  {
    number: '04',
    title: 'AI & Intelligence',
    shortDescription: 'Turn data and emerging intelligence into practical business advantage.',
    fullDescription: 'We help teams apply AI where it adds real value: improving decisions, increasing speed and reducing friction. The emphasis is on practical intelligence, not abstract experimentation.',
    areas: ['AI Strategy', 'Machine Learning', 'Generative AI', 'Intelligent Automation', 'Predictive Analytics'],
  },
  {
    number: '05',
    title: 'Data & Analytics',
    shortDescription: 'Make information usable, measurable and actionable.',
    fullDescription: 'We connect data strategy, engineering and visualization so leaders can see what is happening and decide what to do next. The focus is on clarity, reliability and decisions that can scale.',
    areas: ['Data Strategy', 'Data Engineering', 'Business Intelligence', 'Data Visualization', 'Predictive Analytics'],
  },
  {
    number: '06',
    title: 'Cloud & DevOps',
    shortDescription: 'Build infrastructure that is resilient, scalable and ready for change.',
    fullDescription: 'We design cloud environments and delivery practices that support speed without sacrificing governance or resilience. This creates a stronger foundation for modern products and internal systems.',
    areas: ['Cloud Strategy', 'Cloud Migration', 'Cloud Architecture', 'DevOps', 'Platform Engineering'],
  },
  {
    number: '07',
    title: 'Experience & Design',
    shortDescription: 'Create digital experiences people understand and want to use.',
    fullDescription: 'We align research, interface design and design systems to make digital experiences clearer and more consistent. The outcome is a more usable experience across product, platform and touchpoint.',
    areas: ['UX Strategy', 'Product Design', 'UI Design', 'Design Systems', 'Experience Optimization'],
  },
  {
    number: '08',
    title: 'Cybersecurity',
    shortDescription: 'Protect the systems, identities and data that keep businesses moving.',
    fullDescription: 'We help organizations reduce risk across applications, access, infrastructure and operating practices. Security is treated as a business enabler, not a separate layer of complexity.',
    areas: ['Security Strategy', 'Application Security', 'Identity & Access', 'Risk Assessment', 'Security Testing'],
  },
]

const industryDetails: DetailItem[] = [
  {
    number: '01',
    title: 'Technology & Digital Products',
    shortDescription: 'Software, platforms, SaaS and technology-led businesses.',
    fullDescription: 'We work with teams building products, platforms and digital businesses where speed, architecture and adoption matter equally. The emphasis is on helping the business move without weakening the product foundation.',
    areas: ['Software', 'Platforms', 'SaaS', 'Technology-led businesses'],
  },
  {
    number: '02',
    title: 'Financial Services',
    shortDescription: 'Banking, fintech, insurance, investment and financial platforms.',
    fullDescription: 'We help financial organizations modernize customer experiences, internal systems and data flows while maintaining trust, compliance and operational discipline.',
    areas: ['Banking', 'Fintech', 'Insurance', 'Investment', 'Financial Platforms'],
  },
  {
    number: '03',
    title: 'Healthcare',
    shortDescription: 'Digital health, healthcare operations and connected patient experiences.',
    fullDescription: 'We support healthcare teams creating clearer digital experiences, stronger operations and more connected services across the patient journey and internal workflows.',
    areas: ['Digital Health', 'Healthcare Operations', 'Connected Patient Experiences'],
  },
  {
    number: '04',
    title: 'Real Estate & Infrastructure',
    shortDescription: 'Property, construction, infrastructure and connected asset ecosystems.',
    fullDescription: 'We work on the systems and experiences that help physical assets perform better, from operations and reporting through to digital coordination and service delivery.',
    areas: ['Property', 'Construction', 'Infrastructure', 'Connected Asset Ecosystems'],
  },
  {
    number: '05',
    title: 'Retail & Commerce',
    shortDescription: 'Retail operations, ecommerce, customer experience and digital commerce.',
    fullDescription: 'We help retail and commerce teams connect customer journeys, operational systems and digital channels so growth feels coordinated rather than fragmented.',
    areas: ['Retail Operations', 'Ecommerce', 'Customer Experience', 'Digital Commerce'],
  },
  {
    number: '06',
    title: 'Manufacturing',
    shortDescription: 'Connected operations, industrial technology, automation and supply chains.',
    fullDescription: 'We support industrial organizations improving visibility, automation and planning across the systems that keep production and supply moving.',
    areas: ['Connected Operations', 'Industrial Technology', 'Automation', 'Supply Chains'],
  },
  {
    number: '07',
    title: 'Education & Learning',
    shortDescription: 'Learning platforms, education technology and digital learning ecosystems.',
    fullDescription: 'We help education organizations create clearer digital learning journeys and more coherent platforms for students, staff and stakeholders.',
    areas: ['Learning Platforms', 'Education Technology', 'Digital Learning Ecosystems'],
  },
  {
    number: '08',
    title: 'Travel & Hospitality',
    shortDescription: 'Travel platforms, hospitality operations and customer experiences.',
    fullDescription: 'We support travel and hospitality businesses improving the experience, operational flow and digital systems that shape every stay, booking and journey.',
    areas: ['Travel Platforms', 'Hospitality Operations', 'Customer Experiences'],
  },
]

const solutionDetails: DetailItem[] = [
  {
    number: '01',
    title: 'Customer Experience',
    shortDescription: 'Connect every interaction into a clearer customer journey.',
    fullDescription: 'We bring CRM, portals and customer data together so organizations can create more coherent experiences across channels and touchpoints.',
    areas: ['CRM', 'Customer Portals', 'Personalization', 'Customer Data', 'Omnichannel Experiences'],
  },
  {
    number: '02',
    title: 'Digital Commerce',
    shortDescription: 'Build commerce experiences designed for conversion and scale.',
    fullDescription: 'We help commerce teams connect storefronts, payments and journey design so the experience supports both growth and operational control.',
    areas: ['Ecommerce Platforms', 'Digital Marketplaces', 'Payments', 'Commerce Integrations', 'Customer Journeys'],
  },
  {
    number: '03',
    title: 'Enterprise Systems',
    shortDescription: 'Connect the systems that keep complex organizations running.',
    fullDescription: 'We modernize and integrate the core systems that shape operations, from CRM and ERP through to broader enterprise application landscapes.',
    areas: ['ERP', 'CRM', 'Enterprise Applications', 'System Integration', 'Legacy Modernization'],
  },
  {
    number: '04',
    title: 'Business Automation',
    shortDescription: 'Remove friction from repetitive work and complex operations.',
    fullDescription: 'We identify opportunities to automate workflows and operational tasks in ways that improve consistency, speed and visibility.',
    areas: ['Workflow Automation', 'RPA', 'AI Automation', 'Process Optimization', 'Intelligent Operations'],
  },
  {
    number: '05',
    title: 'Data & Decision Intelligence',
    shortDescription: 'Turn fragmented information into decisions that move the business.',
    fullDescription: 'We create the data foundations and decision layers that help leaders understand performance, forecast more clearly and act with confidence.',
    areas: ['Data Platforms', 'BI', 'Analytics', 'AI/ML', 'Forecasting'],
  },
  {
    number: '06',
    title: 'Digital Platforms',
    shortDescription: 'Create connected platforms that bring customers, teams and operations together.',
    fullDescription: 'We design platform experiences that align internal teams, external users and connected services around a stronger digital core.',
    areas: ['Customer Platforms', 'Partner Portals', 'Internal Platforms', 'Workflow Platforms', 'Digital Ecosystems'],
  },
  {
    number: '07',
    title: 'Modernization',
    shortDescription: 'Move legacy technology toward a more resilient digital future.',
    fullDescription: 'We help teams plan and deliver modernization work that reduces technical friction while creating a better foundation for what comes next.',
    areas: ['Legacy Modernization', 'Application Modernization', 'Cloud Migration', 'Architecture Modernization', 'Technology Roadmaps'],
  },
]

function Arrow() {
  return <span className="arrow" aria-hidden>↗</span>
}

const strategyItems = ['STRATEGY', 'INTELLIGENCE', 'TECHNOLOGY', 'TRANSFORMATION', 'GLOBAL GROWTH']

function HeroRail({
  activeIndex,
  paused,
  onItemEnter,
  onItemLeave,
  onRailEnter,
  onRailLeave,
  reducedMotion,
}: {
  activeIndex: number
  paused: boolean
  onItemEnter: (index: number) => void
  onItemLeave: () => void
  onRailEnter: () => void
  onRailLeave: () => void
  reducedMotion: boolean
}) {
  return (
    <>
      <aside
        className={`hero-strategy ${paused ? 'is-paused' : ''}`}
        aria-label="Current focus"
        onPointerEnter={onRailEnter}
        onPointerLeave={onRailLeave}
      >
        <div className="strategy-count">
          {String(activeIndex + 1).padStart(2, '0')} <span>/ 05</span>
        </div>
        <div className="strategy-list">
          {strategyItems.map((item, index) => (
            <motion.div
              key={item}
              className={`strategy-item ${index === activeIndex ? 'is-active' : ''}`}
              tabIndex={0}
              initial={false}
              animate={reducedMotion ? { opacity: index === activeIndex ? 1 : 0.5 } : { opacity: index === activeIndex ? 1 : 0.45, y: index === activeIndex ? -2 : 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              onPointerEnter={() => onItemEnter(index)}
              onFocus={() => onItemEnter(index)}
              onPointerLeave={onItemLeave}
            >
              <span className="strategy-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="strategy-divider" aria-hidden="true">-</span>
              <span className="strategy-name">{item}</span>
            </motion.div>
          ))}
        </div>
      </aside>
      <div
        className={`hero-rail ${paused ? 'is-paused' : ''}`}
        aria-hidden="true"
        onPointerEnter={onRailEnter}
        onPointerLeave={onRailLeave}
      >
        <div className="hero-rail-track">
          {[0, 1].map((set) => (
            <div className="hero-rail-row" key={set}>
              {strategyItems.map((item, index) => (
                <span key={`${set}-${item}`} className={`rail-word ${index === activeIndex ? 'is-active' : ''}`}>
                  <span>{item}</span>
                  {index < strategyItems.length - 1 && <i className="rail-separator">/</i>}
                </span>
              ))}
            </div>
          ))}
        </div>
        <strong>ARCLANE GLOBAL<br />SYSTEM 01</strong>
      </div>
      <div className="hero-edge" aria-hidden="true">ARCLANE GLOBAL / STRATEGY / DIRECTION / GROWTH</div>
    </>
  )
}

function Pathway({ dark = false, focusIndex = 0, pulseKey = 0 }: { dark?: boolean; focusIndex?: number; pulseKey?: number }) {
  const reduce = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 32, damping: 18 })
  const y = useSpring(pointerY, { stiffness: 32, damping: 18 })
  const focusedPoint = [
    { cx: 336, cy: 353 },
    { cx: 403, cy: 160 },
    { cx: 521, cy: 309 },
    { cx: 190, cy: 313 },
    { cx: 557, cy: 218 },
  ][focusIndex] ?? { cx: 336, cy: 353 }

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || reduce) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 14)
  }

  return (
    <motion.div
      className={`pathway ${dark ? 'on-dark' : ''}`}
      aria-hidden="true"
      onPointerMove={move}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
      style={{ x, y }}
    >
      <svg viewBox="0 0 700 620" fill="none">
        <defs>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6E1E2A" stopOpacity=".15" />
            <stop offset=".6" stopColor="#6E1E2A" />
            <stop offset="1" stopColor="#F7F5EF" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-35 510C125 480 120 105 330 256C450 342 420 464 720 168"
          stroke="url(#route)"
          strokeWidth="2"
          animate={reduce ? {} : { pathLength: [0.35, 1, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-10 238C176 328 211 42 402 160C540 245 532 345 730 360"
          stroke="#6E1E2A"
          strokeOpacity=".48"
          strokeWidth="1"
          animate={reduce ? {} : { opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <path d="M52 620C188 498 215 420 336 353C445 293 521 309 716 94" stroke="currentColor" strokeOpacity=".22" strokeWidth="1" />
        <path d="M29 76C189 111 204 335 338 353C487 374 498 139 690 17" stroke="currentColor" strokeOpacity=".16" strokeWidth="1" />
        <motion.circle
          key={`${focusIndex}-${pulseKey}`}
          cx={focusedPoint.cx}
          cy={focusedPoint.cy}
          r="21"
          fill="#6E1E2A"
          fillOpacity=".08"
          initial={reduce ? false : { opacity: 0.06, scale: 0.96 }}
          animate={reduce ? {} : { scale: [0.96, 1.04, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 0.78, ease: 'easeOut' }}
        />
        {[
          ['336', '353', 8],
          ['403', '160', 5],
          ['521', '309', 5],
          ['190', '313', 4],
          ['557', '218', 4],
        ].map(([cx, cy, r], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r as number}
            fill={i === 0 ? '#6E1E2A' : '#6E1E2A'}
            animate={reduce ? {} : { r: [r as number, (r as number) + 3, r as number], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5 + i, repeat: Infinity }}
          />
        ))}
        <path d="M336 353l125-72 50 84-125 72z" fill="#6E1E2A" fillOpacity=".1" stroke="#6E1E2A" strokeOpacity=".7" />
        <path d="M461 281l50 84-39 20-50-84z" fill="#6E1E2A" fillOpacity=".13" />
        {!reduce && (
          <>
            <motion.circle
              r="3.5"
              fill="#F7F5EF"
              style={{ offsetPath: "path('M-35 510C125 480 120 105 330 256C450 342 420 464 720 168')" }}
              animate={{ offsetDistance: ['0%', '100%'] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              r="3"
              fill="#6E1E2A"
              style={{ offsetPath: "path('M-10 238C176 328 211 42 402 160C540 245 532 345 730 360')" }}
              animate={{ offsetDistance: ['0%', '100%'] }}
              transition={{ duration: 12, delay: 2, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}
      </svg>
      <motion.div className="plane plane-a" animate={reduce ? {} : { rotate: [28, 32, 28], y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="plane plane-b" animate={reduce ? {} : { rotate: [28, 24, 28], y: [0, 8, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
    </motion.div>
  )
}

function PublicApp() {
  const [menu, setMenu] = useState(false)
  const [desktopMenu, setDesktopMenu] = useState<'capabilities' | 'industries' | 'solutions' | null>(null)
  const [desktopSelection, setDesktopSelection] = useState<{ section: 'capabilities' | 'industries' | 'solutions'; index: number } | null>(null)
  const [mobilePanel, setMobilePanel] = useState<'capabilities' | 'industries' | 'solutions' | null>(null)
  const [mobileSelection, setMobileSelection] = useState<Record<'capabilities' | 'industries' | 'solutions', number | null>>({
    capabilities: null,
    industries: null,
    solutions: null,
  })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formError, setFormError] = useState('')
  const [heroInView, setHeroInView] = useState(true)
  const [strategyIndex, setStrategyIndex] = useState(0)
  const [strategyPaused, setStrategyPaused] = useState(false)
  const [railPaused, setRailPaused] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)
  const resumeTimer = useRef<number | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const megaRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false)
        setDesktopMenu(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (headerRef.current && !headerRef.current.contains(target) && megaRef.current && !megaRef.current.contains(target)) {
        setDesktopMenu(null)
      }
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    const node = heroRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(node)
    setHeroInView(true)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduceMotion || !heroInView || strategyPaused || railPaused) return
    const timer = window.setInterval(() => {
      setStrategyIndex((current) => (current + 1) % strategyItems.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [heroInView, strategyPaused, railPaused, reduceMotion])

  useEffect(() => {
    if (reduceMotion || !heroInView) return
    setPulseKey((current) => current + 1)
  }, [strategyIndex, heroInView, reduceMotion])

  const reveal = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.7 },
  }

  const go = (id: string) => {
    setMenu(false)
    setDesktopMenu(null)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const pauseStrategy = (index: number) => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = null
    setStrategyPaused(true)
    setStrategyIndex(index)
  }

  const scheduleStrategyResume = () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => {
      setStrategyPaused(false)
      resumeTimer.current = null
    }, 2000)
  }

  const openDesktopMenu = (key: 'capabilities' | 'industries' | 'solutions') => {
    setDesktopMenu(key)
    setDesktopSelection(null)
  }

  const selectDesktopItem = (section: 'capabilities' | 'industries' | 'solutions', index: number) => {
    setDesktopMenu(section)
    setDesktopSelection((current) => (current?.section === section && current.index === index ? null : { section, index }))
  }

  const selectMobileItem = (section: 'capabilities' | 'industries' | 'solutions', index: number) => {
    setMobileSelection((current) => {
      return { ...current, [section]: current[section] === index ? null : index }
    })
  }

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    }
  }, [])

  const activeDetail = (section: 'capabilities' | 'industries' | 'solutions') => {
    const selection = desktopSelection?.section === section ? desktopSelection.index : 0
    if (section === 'capabilities') return capabilityDetails[selection] ?? capabilityDetails[0]
    if (section === 'industries') return industryDetails[selection] ?? industryDetails[0]
    return solutionDetails[selection] ?? solutionDetails[0]
  }

  const mobileDetail = (section: 'capabilities' | 'industries' | 'solutions', index: number) => {
    if (section === 'capabilities') return capabilityDetails[index] ?? capabilityDetails[0]
    if (section === 'industries') return industryDetails[index] ?? industryDetails[0]
    return solutionDetails[index] ?? solutionDetails[0]
  }

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const focus = String(formData.get('focus') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const phoneOk = !phone || /^[+()\-. \d]{7,}$/.test(phone)

    if (!name || !email || !company || !focus || !message) {
      setFormError('Please complete every required field before sending.')
      return
    }

    if (!emailOk) {
      setFormError('Please enter a valid work email address.')
      return
    }

    if (!phoneOk) {
      setFormError('Please enter a valid phone number, or leave it blank.')
      return
    }

    setIsSubmitting(true)
    try {
      await submitEnquiry({
        name,
        workEmail: email,
        company,
        phone,
        focusArea: focus,
        message,
      })
      setSent(true)
      event.currentTarget.reset()
    } catch {
      setFormError('Submission failed. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <motion.header
        ref={headerRef}
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="wordmark" onClick={() => go('top')} aria-label="Back to top">
          ARCLANE <i>GLOBAL</i>
        </button>
        <nav aria-label="Main navigation">
          {[
            { label: 'Capabilities', panel: 'capabilities' as const },
            { label: 'Approach', panel: null },
            { label: 'Industries', panel: 'industries' as const },
            { label: 'Solutions', panel: 'solutions' as const },
            { label: 'Insights', panel: null },
            { label: 'About', panel: null },
          ].map((item, i) => (
            <motion.button
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.06, duration: 0.45 }}
              key={item.label}
              aria-expanded={item.panel ? desktopMenu === item.panel : undefined}
              aria-controls={item.panel ? `${item.panel}-mega` : undefined}
              className={desktopMenu === item.panel ? 'is-active-nav' : ''}
              onMouseEnter={() => item.panel && openDesktopMenu(item.panel)}
              onFocus={() => item.panel && openDesktopMenu(item.panel)}
              onClick={() => (item.panel ? openDesktopMenu(item.panel) : go(item.label.toLowerCase()))}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="contact-link" onClick={() => go('contact')}>
            Contact
          </button>
          <button className="button small" onClick={() => go('contact')}>
            Start a conversation <Arrow />
          </button>
        </div>
        <button className="menu-button" aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>
          <span />
          <span />
        </button>
      </motion.header>

      <div ref={megaRef} className={`desktop-mega ${desktopMenu ? 'open' : ''}`} aria-hidden={!desktopMenu} onMouseLeave={() => setDesktopMenu(null)}>
        {desktopMenu === 'capabilities' && (() => {
          const detail = activeDetail('capabilities')
          return (
            <div className="mega-panel capabilities-mega" id="capabilities-mega">
              <div className="mega-header">
                <div>
                  <p className="eyebrow">CAPABILITIES</p>
                  <h3>What can Arclane do?</h3>
                </div>
                <span>01 / 08</span>
              </div>
              <div className="mega-split">
                <div className="mega-grid capabilities-grid">
                  {capabilityDetails.map((item, index) => (
                    <button type="button"
                      key={item.number}
                      className={`mega-card ${desktopSelection?.section === 'capabilities' && desktopSelection.index === index ? 'is-selected' : ''}`}
                      aria-pressed={desktopSelection?.section === 'capabilities' && desktopSelection.index === index}
                      onClick={() => selectDesktopItem('capabilities', index)}
                    >
                      <span>{item.number}</span>
                      <strong>{item.title}</strong>
                      <p>{item.shortDescription}</p>
                      <em>{item.areas.join(' • ')}</em>
                    </button>
                  ))}
                </div>
                <div className={`mega-detail ${desktopSelection?.section === 'capabilities' ? 'has-detail' : 'is-empty'}`}>
                <button type="button" className="mega-close" onClick={() => setDesktopSelection(null)} aria-label="Close detail">Close</button>
                  <span>{detail.number} — {detail.title.toUpperCase()}</span>
                  <h4>{detail.shortDescription}</h4>
                  <p>{detail.fullDescription}</p>
                  <small>FOCUS AREAS</small>
                  <div className="mega-areas">{detail.areas.map((area) => <b key={area}>{area}</b>)}</div>
                  <button className="mega-link" onClick={() => go('capabilities')}>
                    Explore capability <Arrow />
                  </button>
                </div>
              </div>
            </div>
          )
        })()}

        {desktopMenu === 'industries' && (() => {
          const detail = activeDetail('industries')
          return (
            <div className="mega-panel" id="industries-mega">
              <div className="mega-header">
                <div>
                  <p className="eyebrow">INDUSTRIES</p>
                  <h3>Who does Arclane work with?</h3>
                </div>
                <span>08</span>
              </div>
              <div className="mega-split">
                <div className="mega-grid industries-grid">
                  {industryDetails.map((item, index) => (
                    <button type="button"
                      key={item.number}
                      className={`mega-row ${desktopSelection?.section === 'industries' && desktopSelection.index === index ? 'is-selected' : ''}`}
                      aria-pressed={desktopSelection?.section === 'industries' && desktopSelection.index === index}
                      onClick={() => selectDesktopItem('industries', index)}
                    >
                      <span>{item.number}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.shortDescription}</p>
                      </div>
                      <Arrow />
                    </button>
                  ))}
                </div>
                <div className={`mega-detail ${desktopSelection?.section === 'industries' ? 'has-detail' : 'is-empty'}`}>
                <button type="button" className="mega-close" onClick={() => setDesktopSelection(null)} aria-label="Close detail">Close</button>
                  <span>{detail.number} — {detail.title.toUpperCase()}</span>
                  <h4>{detail.shortDescription}</h4>
                  <p>{detail.fullDescription}</p>
                  <small>INDUSTRY FOCUS</small>
                  <div className="mega-areas">{detail.areas.map((area) => <b key={area}>{area}</b>)}</div>
                  <button className="mega-link" onClick={() => go('industries')}>
                    Explore industries <Arrow />
                  </button>
                </div>
              </div>
            </div>
          )
        })()}

        {desktopMenu === 'solutions' && (() => {
          const detail = activeDetail('solutions')
          return (
            <div className="mega-panel" id="solutions-mega">
              <div className="mega-header">
                <div>
                  <p className="eyebrow">SOLUTIONS</p>
                  <h3>What business problems can Arclane solve?</h3>
                </div>
                <span>07</span>
              </div>
              <div className="mega-split">
                <div className="mega-grid solutions-grid">
                  {solutionDetails.map((item, index) => (
                    <button type="button"
                      key={item.number}
                      className={`mega-row ${desktopSelection?.section === 'solutions' && desktopSelection.index === index ? 'is-selected' : ''}`}
                      aria-pressed={desktopSelection?.section === 'solutions' && desktopSelection.index === index}
                      onClick={() => selectDesktopItem('solutions', index)}
                    >
                      <span>{item.number}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.shortDescription}</p>
                      </div>
                      <Arrow />
                    </button>
                  ))}
                </div>
                <div className={`mega-detail ${desktopSelection?.section === 'solutions' ? 'has-detail' : 'is-empty'}`}>
                <button type="button" className="mega-close" onClick={() => setDesktopSelection(null)} aria-label="Close detail">Close</button>
                  <span>{detail.number} — {detail.title.toUpperCase()}</span>
                  <h4>{detail.shortDescription}</h4>
                  <p>{detail.fullDescription}</p>
                  <small>SUPPORTED OUTCOMES</small>
                  <div className="mega-areas">{detail.areas.map((area) => <b key={area}>{area}</b>)}</div>
                  <button className="mega-link" onClick={() => go('about')}>
                    Explore solutions <Arrow />
                  </button>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
      <div id="mobile-navigation" className={`mobile-menu ${menu ? 'open' : ''}`}>
          <button type="button" className="mobile-accordion" aria-expanded={mobilePanel === 'capabilities'} onClick={() => setMobilePanel(mobilePanel === 'capabilities' ? null : 'capabilities')}>
          <span>CAPABILITIES</span>
          <Arrow />
        </button>
        <div className={`mobile-panel ${mobilePanel === 'capabilities' ? 'open' : ''}`}>
          {capabilityDetails.map((item, index) => (
            <button type="button"
              key={item.number}
              className={mobileSelection.capabilities === index ? 'is-selected' : ''}
              aria-pressed={mobileSelection.capabilities === index}
              onClick={() => selectMobileItem('capabilities', index)}
            >
              <span>{item.number}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.shortDescription}</p>
              </div>
            </button>
          ))}
          {mobilePanel === 'capabilities' && mobileSelection.capabilities !== null && (() => {
            const detail = mobileDetail('capabilities', mobileSelection.capabilities ?? 0)
            return (
              <div className="mobile-detail">
                <h4>{detail.shortDescription}</h4>
                <p>{detail.fullDescription}</p>
                <small>FOCUS AREAS</small>
                <div className="mobile-areas">{detail.areas.map((area) => <b key={area}>{area}</b>)}</div>
              </div>
            )
          })()}
        </div>

        <button type="button" className="mobile-accordion direct" onClick={() => go('approach')}>
          <span>APPROACH</span>
          <Arrow />
        </button>

        <button type="button" className="mobile-accordion" aria-expanded={mobilePanel === 'industries'} onClick={() => setMobilePanel(mobilePanel === 'industries' ? null : 'industries')}>
          <span>INDUSTRIES</span>
          <Arrow />
        </button>
        <div className={`mobile-panel ${mobilePanel === 'industries' ? 'open' : ''}`}>
          {industryDetails.map((item, index) => (
            <button type="button"
              key={item.number}
              className={mobileSelection.industries === index ? 'is-selected' : ''}
              aria-pressed={mobileSelection.industries === index}
              onClick={() => selectMobileItem('industries', index)}
            >
              <span>{item.number}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.shortDescription}</p>
              </div>
            </button>
          ))}
          {mobilePanel === 'industries' && mobileSelection.industries !== null && (() => {
            const detail = mobileDetail('industries', mobileSelection.industries ?? 0)
            return (
              <div className="mobile-detail">
                <h4>{detail.shortDescription}</h4>
                <p>{detail.fullDescription}</p>
                <small>INDUSTRY FOCUS</small>
                <div className="mobile-areas">{detail.areas.map((area) => <b key={area}>{area}</b>)}</div>
              </div>
            )
          })()}
        </div>

        <button type="button" className="mobile-accordion" aria-expanded={mobilePanel === 'solutions'} onClick={() => setMobilePanel(mobilePanel === 'solutions' ? null : 'solutions')}>
          <span>SOLUTIONS</span>
          <Arrow />
        </button>
        <div className={`mobile-panel ${mobilePanel === 'solutions' ? 'open' : ''}`}>
          {solutionDetails.map((item, index) => (
            <button type="button"
              key={item.number}
              className={mobileSelection.solutions === index ? 'is-selected' : ''}
              aria-pressed={mobileSelection.solutions === index}
              onClick={() => selectMobileItem('solutions', index)}
            >
              <span>{item.number}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.shortDescription}</p>
              </div>
            </button>
          ))}
          {mobilePanel === 'solutions' && mobileSelection.solutions !== null && (() => {
            const detail = mobileDetail('solutions', mobileSelection.solutions ?? 0)
            return (
              <div className="mobile-detail">
                <h4>{detail.shortDescription}</h4>
                <p>{detail.fullDescription}</p>
                <small>SUPPORTED OUTCOMES</small>
                <div className="mobile-areas">{detail.areas.map((area) => <b key={area}>{area}</b>)}</div>
              </div>
            )
          })()}
        </div>

        {['Insights', 'About', 'Contact'].map((x) => (
          <button type="button" key={x} className="mobile-accordion direct" onClick={() => go(x.toLowerCase())}>
            <span>{x.toUpperCase()}</span>
            <Arrow />
          </button>
        ))}
        <button type="button" className="button mobile-cta" onClick={() => go('contact')}>
          Start a conversation <Arrow />
        </button>
      </div>
      <section id="top" className="hero" ref={heroRef}>
        <video
          className="hero-background-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={heroBackgroundVideo} type="video/mp4" />
        </video>
        <div className="hero-background-overlay" aria-hidden="true" />
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6 }}>
            ARCLANE GLOBAL / STRATEGIC PARTNERS
          </motion.p>
          <motion.h1 initial="hidden" animate="show" transition={{ staggerChildren: 0.12, delayChildren: 0.38 }}>
            <span className="headline-line">
              <motion.span variants={{ hidden: { opacity: 0, y: '105%' }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 58, damping: 19 } } }}>
                WHERE
              </motion.span>
            </span>
            <span className="headline-line">
              <motion.em variants={{ hidden: { opacity: 0, y: '105%' }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 58, damping: 19 } } }}>
                COMPLEXITY
              </motion.em>
            </span>
            <span className="headline-line">
              <motion.span variants={{ hidden: { opacity: 0, y: '105%' }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 58, damping: 19 } } }}>
                MEETS CLARITY.
              </motion.span>
            </span>
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.88, duration: 0.65 }}>
            Strategy, intelligence and execution for organizations moving toward what comes next.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.02, duration: 0.55 }}>
            <button className="button" onClick={() => go('contact')}>
              Start a conversation <Arrow />
            </button>
            <button className="text-link" onClick={() => go('approach')}>
              Explore our approach <Arrow />
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.18, duration: 0.7 }}>
            <HeroRail
              activeIndex={strategyIndex}
              paused={strategyPaused || railPaused}
              reducedMotion={Boolean(reduceMotion)}
              onItemEnter={pauseStrategy}
              onItemLeave={scheduleStrategyResume}
              onRailEnter={() => setRailPaused(true)}
              onRailLeave={() => setRailPaused(false)}
            />
          </motion.div>
        </div>
      </section>

      <motion.section className="statement" {...reveal}>
        <div className="statement-copy">
          <p className="eyebrow">OUR POINT OF VIEW</p>
          <h2>Turning complexity into direction.</h2>
          <p>From strategic decisions to transformation programs, we help organizations create a clearer path from where they are to where they need to be.</p>
        </div>
        <div className="statement-image">
          <img src={workImage1} alt="Business leaders in a modern meeting room overlooking a city skyline" />
        </div>
      </motion.section>

      <section id="capabilities" className="section capabilities">
        <div className="section-intro">
          <p className="eyebrow">01 / CAPABILITIES</p>
          <h2>
            WHAT WE
            <br />
            BUILD.
          </h2>
        </div>
        <div className="cap-list">
          {capabilities.map(([n, t, d]) => (
            <article className="cap" key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <div className="cap-mark">⌁</div>
            </article>
          ))}
        </div>
      </section>

      <section id="approach" className="method">
        <div>
          <p className="eyebrow">02 / OUR APPROACH</p>
          <h2>
            THE ARCLANE
            <br />
            METHOD.
          </h2>
          <p className="lead">A disciplined way to turn moving parts into a clear, compounding direction.</p>
        </div>
        <div className="method-map">
          <svg viewBox="0 0 720 600" preserveAspectRatio="none">
            <path d="M20 45C240 15 130 245 360 232C575 219 492 482 706 545" />
            <path className="dash" d="M20 45C240 15 130 245 360 232C575 219 492 482 706 545" />
          </svg>
          {method.map(([n, t, d], i) => (
            <motion.article className={`stage stage-${i}`} key={n} {...reveal}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="network">
        <img className="network-image" src={globalMindsetImage} alt="Global city skyline at sunset" />
        <div className="network-image-wash" aria-hidden="true" />
        <div>
          <p className="eyebrow">03 / GLOBAL MINDSET</p>
          <motion.h2 className="network-heading">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            >
              BUILT FOR A WORLD
            </motion.span>
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.35, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              WITHOUT BORDERS.
            </motion.span>
          </motion.h2>
          <p>Ideas, capital, technology and opportunity move differently now. We create the connections that let them travel farther.</p>
        </div>
        <Pathway dark focusIndex={strategyIndex} pulseKey={pulseKey} />
        <div className="network-stats">
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            07 <small>focus markets</small>
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            24/7 <small>connected thinking</small>
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            01 <small>shared direction</small>
          </motion.span>
        </div>
      </section>

      <section id="industries" className="section industries">
        <p className="eyebrow">04 / INDUSTRIES</p>
        <h2>
          WHERE WE
          <br />
          CREATE IMPACT.
        </h2>
        <div className="industry-list">
          {industries.map((x, i) => (
            <motion.button
              key={x}
              whileHover={reduceMotion ? undefined : { x: 4 }}
              whileFocus={reduceMotion ? undefined : { x: 4 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <span>0{i + 1}</span>
              {x}
              <Arrow />
            </motion.button>
          ))}
        </div>
      </section>

      <section className="work">
        <p className="eyebrow">05 / SELECTED WORK</p>
        <h2>
          THOUGHTFUL WORK.
          <br />
          CLEAR OUTCOMES.
        </h2>
        <div className="work-grid">
          {projects.map(([type, title, desc, year], i) => (
            <article className={`project project-${i}`} key={title}>
              <div className="project-art">
                <img src={projectImages[i]} alt={`${title} preview`} />
              </div>
              <div className="project-meta">
                <span>
                  {type} / {year}
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <button className="text-link">
                  View case <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="placeholder">Selected work shown as illustrative placeholders while engagements remain confidential.</p>
      </section>

      <section id="insights" className="section insights">
        <div>
          <p className="eyebrow">06 / INSIGHTS</p>
          <h2>
            THINKING FOR
            <br />
            WHAT COMES NEXT.
          </h2>
        </div>
        <div className="articles">
          {[
            ['Perspective', 'The discipline of useful foresight', 'May 2026'],
            ['Briefing', 'Building resilient systems in a volatile world', 'April 2026'],
            ['Field note', 'A new language for global growth', 'March 2026'],
          ].map((a) => (
            <article key={a[1]}>
              <span>
                {a[0]} - {a[2]}
              </span>
              <h3>{a[1]}</h3>
              <button className="text-link">
                Read article <Arrow />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <p className="eyebrow">07 / ABOUT ARCLANE</p>
        <h2>
          WE CONNECT THE
          <br />
          PIECES THAT MOVE
          <br />
          <span>BUSINESSES FORWARD.</span>
        </h2>
        <div className="about-media">
          <img src={aboutImage} alt="Arclane Global team walking through a modern office corridor" />
        </div>
        <div className="about-bottom">
          <p>Arclane Global brings together strategic thinking, intelligence, technology and execution to help organizations move with greater clarity and confidence.</p>
          <div>
            <b>VISION</b>
            <span>Long-term advantage</span>
            <b>PHILOSOPHY</b>
            <span>Clarity creates momentum</span>
            <b>GLOBAL MINDSET</b>
            <span>Local context, shared ambition</span>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <Pathway dark />
        <div className="contact-heading">
          <p className="eyebrow">08 / CONTACT</p>
          <h2>
            READY TO FIND
            <br />
            THE NEXT PATH?
          </h2>
          <p>Bring us your challenge, ambition or opportunity.</p>
        </div>
        <form noValidate onSubmit={submitContact}>
          {sent ? (
            <div className="thanks">
              THANK YOU.
              <br />
              WE&apos;LL BE IN TOUCH.
            </div>
          ) : (
            <>
              <div className="form-grid">
                <label>
                  Name
                  <input name="name" required autoComplete="name" placeholder="Your name" />
                </label>
                <label>
                  Work email
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
                </label>
                <label>
                  Company
                  <input name="company" required autoComplete="organization" placeholder="Company name" />
                </label>
                <label>
                  Phone
                  <input name="phone" autoComplete="tel" placeholder="+00 000 000 000" />
                </label>
              </div>
              <label>
                What can we help with?
                <select name="focus" defaultValue="" required>
                  <option value="" disabled>
                    Select a focus area
                  </option>
                  <option value="Strategy">Strategy</option>
                  <option value="Technology">Technology</option>
                  <option value="Transformation">Transformation</option>
                  <option value="Global growth">Global growth</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={3} required placeholder="Tell us a little about what's next." />
              </label>
              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}
              <button className="button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send enquiry'} <Arrow />
              </button>
            </>
          )}
        </form>
      </section>

      <footer>
        <div className="wordmark">
          ARCLANE <i>GLOBAL</i>
        </div>
        <div>
          <button onClick={() => go('capabilities')}>Capabilities</button>
          <button onClick={() => go('approach')}>Approach</button>
          <button onClick={() => go('industries')}>Industries</button>
          <button onClick={() => go('contact')}>Contact</button>
        </div>
        <p>© ARCLANE GLOBAL · Privacy · Terms</p>
      </footer>
    </main>
  )
}

function App() {
  const pathname = window.location.pathname

  if (pathname === '/admin/login') return <AdminLogin />
  if (pathname === '/admin') {
    return (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    )
  }

  return <PublicApp />
}

export default App
