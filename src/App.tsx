import { useCallback, useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import gsap from 'gsap'
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
import heroImage from './assets/hero.png'
import discoverImage from './assets/photos/discover.png'
import defineImage from './assets/photos/define.png'
import designImage from './assets/photos/design.png'
import deliverImage from './assets/photos/deliver.png'
import scaleImage from './assets/photos/scale.png'


const methodVisuals = [
  { img: discoverImage, label: '01 / DISCOVER', tag: 'Market & Strategic Landscape', pos: '15% center' },
  { img: defineImage, label: '02 / DEFINE', tag: 'Strategic Priorities & Decision Framing', pos: '80% center' },
  { img: designImage, label: '03 / DESIGN', tag: 'Architecture & Solution Blueprints', pos: '78% center' },
  { img: deliverImage, label: '04 / DELIVER', tag: 'Platform & Transformation Delivery', pos: '82% center' },
  { img: scaleImage, label: '05 / SCALE', tag: 'Growth Foundations & Optimization', pos: '80% center' },
]

const methodAnchors = [
  { top: '2%', left: '18%' },
  { top: '10%', left: '44%' },
  { top: '22%', left: '28%' },
  { top: '34%', left: '10%' },
  { top: '34%', left: '38%' },
]

const capabilityImages = [
  workImage1,
  workImage3,
  workImage2,
  heroImage,
  workImage1,
  globalMindsetImage,
  aboutImage,
  workImage3,
]

const industryImages = [
  workImage3,
  workImage1,
  aboutImage,
  globalMindsetImage,
  workImage2,
  heroImage,
  aboutImage,
  globalMindsetImage,
]

const solutionImages = [
  aboutImage,
  workImage2,
  workImage1,
  workImage3,
  globalMindsetImage,
  heroImage,
  workImage1,
]

const capabilities = [
  ['01', 'Intelligent Automation', 'Systems that remove repetitive work, connect critical processes, and help teams operate with greater speed and precision.'],
  ['02', 'Digital Experiences', 'Websites and digital platforms designed to communicate clearly, perform reliably, and turn attention into meaningful action.'],
  ['03', 'Scalable Products', 'SaaS products built around real business needs, from the first working version to systems designed for long-term growth.'],
  ['04', 'Cloud Infrastructure', 'Reliable cloud environments engineered for performance, flexibility, security, and the demands of modern operations.'],
  ['05', 'Custom Engineering', 'Purpose-built software that solves specific business challenges and fits the way an organization actually works.'],
  ['06', 'Performance Marketing', 'Data-driven marketing programs designed to acquire and activate customers through targeted campaigns, analytics and continuous optimization.']
]

const conversationServices = [
  'Intelligent Automation',
  'Digital Experiences',
  'Scalable Products',
  'Cloud Infrastructure',
  'Custom Engineering',
  'Growth Systems',
  'Other',
]


const methodStages = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Understand the landscape.',
    description: 'We begin by understanding the business, its environment, customers, opportunities and constraints before defining a direction.',
    areas: [
      'Business & market landscape',
      'Customer & stakeholder insights',
      'Opportunity identification',
      'Current-state assessment',
    ],
  },
  {
    number: '02',
    title: 'Define',
    subtitle: 'Identify what matters.',
    description: 'We translate observations into a clear strategic direction by identifying priorities, challenges, opportunities and the decisions that matter most.',
    areas: [
      'Strategic priorities',
      'Business objectives',
      'Opportunity definition',
      'Direction setting',
    ],
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Create the right path.',
    description: 'We shape practical solutions, experiences and operating models that connect strategic intent with real-world execution.',
    areas: [
      'Solution architecture',
      'Experience design',
      'Operating models',
      'Roadmap definition',
    ],
  },
  {
    number: '04',
    title: 'Deliver',
    subtitle: 'Turn strategy into action.',
    description: 'We move from direction to execution through focused delivery, measurable outcomes and close collaboration with stakeholders.',
    areas: [
      'Implementation',
      'Product delivery',
      'Change enablement',
      'Performance measurement',
    ],
  },
  {
    number: '05',
    title: 'Scale',
    subtitle: 'Build sustainable momentum.',
    description: 'We help successful initiatives evolve, scale and create lasting value across teams, markets and operations.',
    areas: [
      'Scaling operations',
      'Continuous improvement',
      'Market expansion',
      'Long-term capability building',
    ],
  },
]


const industries = ['Technology', 'Financial services', 'Real estate', 'Healthcare', 'Consumer', 'Infrastructure', 'Emerging markets']

export interface CaseStudyProject {
  id: string
  number: string
  category: string
  type: string
  year: string
  title: string
  subtitle: string
  shortDesc: string
  image: string
  overview: string[]
  challenge: string
  approach: string
  outcome: string
  focusAreas: string[]
  capabilities: string[]
}

const caseStudyProjects: CaseStudyProject[] = [
  {
    id: 'operating-system-for-tomorrow',
    number: '01',
    category: 'Transformation / 2025',
    type: 'Transformation',
    year: '2025',
    title: 'Operating system for tomorrow',
    subtitle: 'A unified operating model and intelligence platform for connected global operations.',
    shortDesc: 'A placeholder engagement exploring the future of connected operations.',
    image: workImage1,
    overview: [
      'Modern global enterprises often struggle with fragmented operating structures, siloed intelligence, and disjointed decision loops across regions.',
      'Arclane partnered with executive leadership to design and deploy a modern operating framework that connects strategy, platform architecture, and real-time execution across global offices.',
    ],
    challenge: 'Legacy operational silos created significant friction, delayed decision cycles, and obscured emerging growth opportunities across international markets.',
    approach: 'We designed a modular capability framework, established clear governance principles, and introduced unified data flows that allow cross-functional teams to act with shared strategic clarity.',
    outcome: 'Accelerated cross-market decision velocity by 40%, streamlined cross-departmental handoffs, and created a resilient foundation for continuous compounding growth.',
    focusAreas: [
      'Operating Model Redesign',
      'Digital Architecture',
      'Cross-Market Governance',
      'Change Enablement',
    ],
    capabilities: [
      'Strategic Transformation',
      'Platform Architecture',
      'Global Operations',
      'Performance Measurement',
    ],
  },
  {
    id: 'a-new-route-to-market',
    number: '02',
    category: 'Growth Strategy / 2024',
    type: 'Growth strategy',
    year: '2024',
    title: 'A new route to market',
    subtitle: 'A disciplined framework for scaling operations into high-growth international regions.',
    shortDesc: 'A placeholder brief for an ambitious global expansion.',
    image: workImage2,
    overview: [
      'Expanding into adjacent high-growth markets requires balancing aggressive commercial momentum with local regulatory, cultural, and operational precision.',
      'We developed an end-to-end market entry strategy and execution roadmap that enabled rapid customer acquisition while safeguarding core operational margins.',
    ],
    challenge: 'Entering fragmented regional markets without clear positioning risked brand dilution, inefficient capital deployment, and misaligned channel partnerships.',
    approach: 'Conducted deep customer and ecosystem research, identified key distribution leverage points, and established adaptive go-to-market playbooks tailored to each priority territory.',
    outcome: 'Successfully launched across three new target territories within 9 months, achieving sustainable market penetration and 2.5x growth in strategic pipeline.',
    focusAreas: [
      'Market Opportunity Analysis',
      'Go-To-Market Playbooks',
      'Ecosystem & Partner Strategy',
      'Commercial Structuring',
    ],
    capabilities: [
      'Growth Strategy',
      'Market Entry',
      'Customer Research',
      'Scalable Execution',
    ],
  },
  {
    id: 'seeing-around-the-next-corner',
    number: '03',
    category: 'Investment Intelligence / 2024',
    type: 'Investment intelligence',
    year: '2024',
    title: 'Seeing around the next corner',
    subtitle: 'An intelligence platform for clearer capital allocation and foresight.',
    shortDesc: 'A placeholder platform for clearer capital decisions.',
    image: workImage3,
    overview: [
      'In high-frequency and volatile markets, institutional investors and capital allocators require real-time visibility into market shifts and portfolio dynamics.',
      'Arclane designed a sophisticated decision intelligence experience that transforms complex multi-source data streams into actionable executive foresight.',
    ],
    challenge: 'Information overload and delayed reporting prevented decision-makers from reacting swiftly to structural shifts in emerging technology assets.',
    approach: 'Synthesized macro signal tracking, portfolio analytics, and predictive modeling into a clean, editorial dashboard tailored for high-stakes capital decisions.',
    outcome: 'Empowered leadership to reallocate over $120M in strategic capital towards higher-yield opportunities while mitigating portfolio downside risk.',
    focusAreas: [
      'Capital Allocation Frameworks',
      'Data & Intelligence Platforms',
      'Executive Dashboards',
      'Signal Detection & Foresight',
    ],
    capabilities: [
      'Investment Intelligence',
      'Product & Experience Design',
      'Data Systems',
      'Risk Management',
    ],
  },
]

export interface Insight {
  id: number
  number: string
  category: string
  date: string
  year: string
  title: string
  focus: string
  focusAreas: string[]
  description: string
  lead: string
  paragraphs: string[]
}

const insights: Insight[] = [
  {
    id: 1,
    number: '01',
    category: 'Perspective',
    date: 'May 2026',
    year: '2026',
    title: 'The discipline of useful foresight',
    focus: 'Strategy · Foresight · Decision Making',
    focusAreas: ['Strategy', 'Foresight', 'Decision Making'],
    description:
      'Foresight is most valuable when it helps organizations make clearer decisions today. This perspective explores how businesses can translate uncertainty, emerging signals and long-term shifts into practical strategic direction.',
    lead:
      'Foresight is most valuable when it helps organizations make clearer decisions today.',
    paragraphs: [
      'Most corporate foresight exercises fail because they mistake trend observation for strategic preparedness. Scanning horizon signals produces voluminous decks that rarely shift resource allocation or organizational behavior before market volatility forces an urgent pivot.',
      'Useful foresight is different: it is an institutional discipline that tests existing operating hypotheses against high-impact inflection points, identifying asymmetries and establishing pre-emptive capabilities well before consensus emerges.',
      'By integrating continuous signal monitoring with adaptive scenario playbooks, leadership teams can transform uncertainty from an existential risk into a proprietary engine for capital velocity and sustainable market expansion.',
      'Organizations that master this discipline do not merely navigate the future; they systematically shape the competitive landscape to their distinct advantage.',
    ],
  },
  {
    id: 2,
    number: '02',
    category: 'Systems',
    date: 'April 2026',
    year: '2026',
    title: 'Building resilient systems in a volatile world',
    focus: 'Technology · Resilience · Operations',
    focusAreas: ['Technology', 'Resilience', 'Operations'],
    description:
      'Resilience is no longer only about responding to disruption. It is about designing systems, operations and technology that can adapt continuously while maintaining performance and creating room for growth.',
    lead:
      'Resilience is no longer only about responding to disruption. It is about designing systems, operations and technology that can adapt continuously.',
    paragraphs: [
      'Modern enterprise environments are increasingly characterized by hyper-connected dependencies, complex cloud topologies, and rapid market fluctuations. Under these conditions, traditional fail-safe mechanisms often introduce unforeseen points of systemic brittleness.',
      'True operational resilience stems from architectural clarity—creating autonomous modular units, establishing clear boundaries, and implementing graceful degradation pathways across both digital systems and human operating structures.',
      'When volatility strikes, resilient enterprises do not scramble to maintain rigid status-quo structures; instead, their distributed architecture absorbs the disturbance, re-routes critical data and decision flows, and continues delivering core value without friction.',
      'Building for resilience is ultimately an investment in velocity—enabling teams to execute with boldness knowing the system foundation is unbreakable.',
    ],
  },
  {
    id: 3,
    number: '03',
    category: 'Growth',
    date: 'March 2026',
    year: '2026',
    title: 'A new language for global growth',
    focus: 'Growth · Markets · Transformation',
    focusAreas: ['Growth', 'Markets', 'Transformation'],
    description:
      'Global growth requires more than entering new markets. It requires a clearer understanding of customers, cultures, operating models and the systems that connect them. This article explores a more connected approach to sustainable expansion.',
    lead:
      'Global growth requires more than entering new markets. It requires a clearer understanding of customers, cultures and operating models.',
    paragraphs: [
      'The conventional paradigm of global expansion—taking a centralized product and simply localizing language and currencies—no longer suffices in sophisticated international markets with nuanced regulatory, cultural, and distribution ecosystems.',
      'High-performing global enterprises adopt a bilateral operating model: core intelligence, data backbones, and governance are unified globally, while customer touchpoints, commercial strategies, and partner ecosystems are deeply localized.',
      'This strategic dualism creates what we term "contextual agility"—the ability to respond to localized customer demand in real time while leveraging the consolidated scale, security, and capital efficiency of a global network.',
      'The next era of global leaders will not be defined merely by their geographical footprint, but by the speed at which localized insight translates into shared global capability.',
    ],
  },
]

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

function CaseStudyModal({
  project,
  onClose,
}: {
  project: CaseStudyProject
  onClose: () => void
}) {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)

  const handleClose = useCallback(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: onClose,
      })
    } else {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    const origOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
    }
    if (backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }

    return () => {
      document.body.style.overflow = origOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  return (
    <div
      className="case-study-backdrop"
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          handleClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
    >
      <div className="case-study-modal" ref={modalRef}>
        <header className="case-study-header">
          <div className="case-study-header-left">
            <span className="case-study-section-tag">05 / SELECTED WORK</span>
            <span className="case-study-divider">—</span>
            <span className="case-study-project-tag">{project.category}</span>
          </div>
          <button
            className="case-study-close-btn"
            onClick={handleClose}
            aria-label="Close Case Study"
          >
            <span>CLOSE</span>
            <span className="close-x">×</span>
          </button>
        </header>

        <div className="case-study-body">
          <div className="case-study-hero">
            <span className="case-study-big-number">{project.number}</span>
            <div className="case-study-hero-text">
              <p className="case-study-eyebrow">{project.category}</p>
              <h2 id={`modal-title-${project.id}`} className="case-study-title">
                {project.title}
              </h2>
              <p className="case-study-subtitle">{project.subtitle}</p>
            </div>
          </div>

          <div className="case-study-media">
            <img src={project.image} alt={project.title} className="case-study-img" />
            <div className="case-study-media-wash" aria-hidden="true" />
            <span className="case-study-media-badge">{project.number} // ARCLANE CASE STUDY</span>
          </div>

          <div className="case-study-grid">
            <div className="case-study-main">
              <section className="case-study-section">
                <h3>OVERVIEW</h3>
                {project.overview.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </section>

              <section className="case-study-section">
                <h3>THE CHALLENGE</h3>
                <p>{project.challenge}</p>
              </section>

              <section className="case-study-section">
                <h3>THE APPROACH</h3>
                <p>{project.approach}</p>
              </section>

              <section className="case-study-section">
                <h3>THE OUTCOME</h3>
                <p>{project.outcome}</p>
              </section>
            </div>

            <aside className="case-study-sidebar">
              <div className="case-study-side-block">
                <h4>FOCUS AREAS</h4>
                <ul>
                  {project.focusAreas.map((area) => (
                    <li key={area}>
                      <span aria-hidden="true">—</span> {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="case-study-side-block">
                <h4>CAPABILITIES</h4>
                <div className="case-study-tags">
                  {project.capabilities.map((cap) => (
                    <span key={cap} className="case-study-tag">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="case-study-side-cta">
                <p>Interested in applying this strategy to your business?</p>
                <button
                  className="button small"
                  onClick={() => {
                    handleClose()
                    const contact = document.getElementById('contact')
                    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  START A CONVERSATION <Arrow />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArticleModal({
  insight,
  onClose,
}: {
  insight: Insight
  onClose: () => void
}) {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)

  const handleClose = useCallback(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: onClose,
      })
      if (backdropRef.current) {
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    } else {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    const origOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
    }
    if (backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }

    return () => {
      document.body.style.overflow = origOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  return (
    <div
      className="article-modal-backdrop"
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          handleClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`article-modal-title-${insight.id}`}
    >
      <div className="article-modal-container text-only" ref={modalRef}>
        <header className="article-modal-header">
          <div className="article-modal-header-left">
            <span className="article-modal-section-tag">06 / INSIGHTS</span>
            <span className="article-modal-divider">—</span>
            <span className="article-modal-category-tag">{insight.category} / {insight.year}</span>
          </div>
          <button
            type="button"
            className="article-modal-close-btn"
            onClick={handleClose}
            aria-label="Close article modal"
          >
            <span>CLOSE</span>
            <span className="close-x">×</span>
          </button>
        </header>

        <div className="article-modal-body text-only-body">
          <div className="article-modal-hero">
            <div className="article-modal-hero-text">
              <p className="article-modal-eyebrow">
                {insight.category.toUpperCase()} / {insight.year}
              </p>
              <h2
                id={`article-modal-title-${insight.id}`}
                className="article-modal-title"
              >
                {insight.title.toUpperCase()}.
              </h2>
              <p className="article-modal-description">{insight.description}</p>
            </div>
          </div>

          <div className="article-modal-divider-line" />

          <div className="article-modal-grid text-only-grid">
            <div className="article-modal-main">
              <section className="article-content-section">
                <h3>ARTICLE</h3>
                <p className="article-lead-thesis">{insight.lead}</p>
                {insight.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </section>
            </div>

            <aside className="article-modal-sidebar">
              <div className="article-sidebar-block">
                <h4>FOCUS AREAS</h4>
                <div className="article-focus-tags">
                  {insight.focusAreas.map((area) => (
                    <span key={area} className="article-focus-tag">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="article-sidebar-cta">
                <h4>STRATEGIC INQUIRY</h4>
                <p>Discuss how these perspectives apply to your organization.</p>
                <button
                  type="button"
                  className="button small"
                  onClick={() => {
                    handleClose()
                    const contact = document.getElementById('contact')
                    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  START A CONVERSATION <Arrow />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

function InsightRow({
  insight,
  onSelect,
}: {
  insight: Insight
  onSelect: (insight: Insight) => void
}) {
  const rowRef = useRef<HTMLElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const quickX = useRef<((value: number) => void) | null>(null)
  const quickY = useRef<((value: number) => void) | null>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.set(cardRef.current, { opacity: 0, scale: 0.97, y: 15, x: 0 })
      quickX.current = gsap.quickTo(cardRef.current, 'x', { duration: 0.5, ease: 'power3.out' })
      quickY.current = gsap.quickTo(cardRef.current, 'y', { duration: 0.5, ease: 'power3.out' })
    }
  }, [])

  const handleMouseEnter = () => {
    if (!cardRef.current || window.innerWidth < 800) return
    gsap.killTweensOf(cardRef.current)
    gsap.to(cardRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!rowRef.current || !cardRef.current || window.innerWidth < 800) return
    const rect = rowRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5

    // Movement: x: ±15px, y: ±10px
    if (quickX.current) quickX.current(relX * 30)
    if (quickY.current) quickY.current(relY * 20)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.killTweensOf(cardRef.current)
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.97,
      x: 0,
      y: 10,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  return (
    <article
      ref={rowRef}
      className="insight-row"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(insight)}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${insight.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(insight)
        }
      }}
    >
      <div className="insight-row-content">
        <span className="insight-category-date">
          {insight.category} — {insight.date}
        </span>
        <h3 className="insight-title">{insight.title}</h3>
        <button
          type="button"
          className="text-link insight-cta"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(insight)
          }}
          aria-label={`Read article: ${insight.title}`}
        >
          Read article <Arrow />
        </button>
      </div>

      <div
        ref={cardRef}
        className="insight-text-preview-card"
        aria-hidden="true"
      >
        <div className="insight-card-header">
          <span className="insight-card-num-category">
            {insight.number} / {insight.category.toUpperCase()}
          </span>
        </div>
        <h4 className="insight-card-title">{insight.title}</h4>
        <div className="insight-card-focus">{insight.focus}</div>
        <p className="insight-card-desc">{insight.description}</p>
      </div>
    </article>
  )
}

function ProjectCard({
  project,
  index,
  onOpenCaseStudy,
}: {
  project: CaseStudyProject
  index: number
  onOpenCaseStudy: (project: CaseStudyProject) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const quickX = useRef<((value: number) => void) | null>(null)
  const quickY = useRef<((value: number) => void) | null>(null)

  useEffect(() => {
    if (imgRef.current) {
      quickX.current = gsap.quickTo(imgRef.current, 'x', { duration: 0.7, ease: 'power3.out' })
      quickY.current = gsap.quickTo(imgRef.current, 'y', { duration: 0.7, ease: 'power3.out' })
    }
  }, [])

  const handleMouseEnter = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1.06, duration: 0.8, ease: 'power3.out' })
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    }
    if (labelRef.current) {
      gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 800) return
    const rect = containerRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5

    if (quickX.current) quickX.current(relX * 30)
    if (quickY.current) quickY.current(relY * 20)
  }

  const handleMouseLeave = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' })
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    }
    if (labelRef.current) {
      gsap.to(labelRef.current, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' })
    }
  }

  return (
    <article className={`project project-${index}`}>
      <div
        ref={containerRef}
        className="project-art"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenCaseStudy(project)}
        role="button"
        tabIndex={0}
        aria-label={`View case study for ${project.title}`}
      >
        <img ref={imgRef} src={project.image} alt={`${project.title} preview`} className="project-img" />
        <div ref={overlayRef} className="project-overlay" aria-hidden="true" />
        <div ref={labelRef} className="project-label">
          <span className="project-label-title">{project.title}</span>
          <span className="project-label-link">
            VIEW CASE <span className="arrow-icon">↗</span>
          </span>
        </div>
      </div>
      <div className="project-meta">
        <span>
          {project.type} / {project.year}
        </span>
        <h3>{project.title}</h3>
        <p>{project.shortDesc}</p>
        <button
          className="text-link view-case-btn"
          onClick={() => onOpenCaseStudy(project)}
        >
          View case <Arrow />
        </button>
      </div>
    </article>
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
  const [selectedFocus, setSelectedFocus] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)
  const successRef = useRef<HTMLDivElement | null>(null)
  const [heroInView, setHeroInView] = useState(true)
  const [strategyIndex, setStrategyIndex] = useState(0)
  const [strategyPaused, setStrategyPaused] = useState(false)
  const [railPaused, setRailPaused] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyProject | null>(null)
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null)
  const [activeVisualIndex, setActiveVisualIndex] = useState<number | null>(null)

  // Conversation Modal state
  const [isConversationModalOpen, setIsConversationModalOpen] = useState(false)
  const [cmName, setCmName] = useState('')
  const [cmEmail, setCmEmail] = useState('')
  const [cmCompany, setCmCompany] = useState('')
  const [cmPhone, setCmPhone] = useState('')
  const [cmService, setCmService] = useState('')
  const [cmMessage, setCmMessage] = useState('')
  const [cmErrors, setCmErrors] = useState<{ name?: string; email?: string; message?: string; form?: string }>({})
  const [cmSubmitting, setCmSubmitting] = useState(false)
  const [cmSent, setCmSent] = useState(false)

  const openConversationModal = () => {
    setIsConversationModalOpen(true)
    setCmErrors({})
  }

  const closeConversationModal = () => {
    setIsConversationModalOpen(false)
  }

  const resetAndCloseConversationModal = () => {
    setIsConversationModalOpen(false)
    setCmName('')
    setCmEmail('')
    setCmCompany('')
    setCmPhone('')
    setCmService('')
    setCmMessage('')
    setCmErrors({})
    setCmSent(false)
  }

  const submitConversationModal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCmErrors({})
    if (cmSubmitting) return

    const errors: { name?: string; email?: string; message?: string; form?: string } = {}
    const trimmedName = cmName.trim()
    const trimmedEmail = cmEmail.trim()
    const trimmedMessage = cmMessage.trim()

    if (!trimmedName) {
      errors.name = 'Full name is required.'
    }

    if (!trimmedEmail) {
      errors.email = 'Work email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid work email address.'
    }

    if (!trimmedMessage) {
      errors.message = 'Message is required.'
    }

    if (Object.keys(errors).length > 0) {
      setCmErrors(errors)
      return
    }

    setCmSubmitting(true)
    try {
      await submitEnquiry({
        name: trimmedName,
        workEmail: trimmedEmail,
        company: cmCompany.trim(),
        phone: cmPhone.trim() || null,
        focusArea: cmService || 'Other',
        message: trimmedMessage,
      })
      setCmSent(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again in a moment.'
      setCmErrors({ form: msg })
    } finally {
      setCmSubmitting(false)
    }
  }
  const methodMapRef = useRef<HTMLDivElement | null>(null)
  const floatingVisualRef = useRef<HTMLDivElement | null>(null)
  const floatingImgRef = useRef<HTMLImageElement | null>(null)
  const pathSvgRef = useRef<SVGSVGElement | null>(null)
  const quickVisualX = useRef<((value: number) => void) | null>(null)
  const quickVisualY = useRef<((value: number) => void) | null>(null)
  const quickPathX = useRef<((value: number) => void) | null>(null)
  const quickPathY = useRef<((value: number) => void) | null>(null)
  const resumeTimer = useRef<number | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const megaRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const visual = floatingVisualRef.current
    const svg = pathSvgRef.current
    if (visual) {
      quickVisualX.current = gsap.quickTo(visual, 'x', { duration: 0.6, ease: 'power3.out' })
      quickVisualY.current = gsap.quickTo(visual, 'y', { duration: 0.6, ease: 'power3.out' })
    }
    if (svg) {
      quickPathX.current = gsap.quickTo(svg, 'x', { duration: 1.2, ease: 'power2.out' })
      quickPathY.current = gsap.quickTo(svg, 'y', { duration: 1.2, ease: 'power2.out' })
    }
  }, [])

  const handleMethodMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!methodMapRef.current) return
    const rect = methodMapRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5

    if (quickVisualX.current) quickVisualX.current(relX * 36)
    if (quickVisualY.current) quickVisualY.current(relY * 36)
    if (quickPathX.current) quickPathX.current(relX * 16)
    if (quickPathY.current) quickPathY.current(relY * 16)
  }

  useEffect(() => {
    const visual = floatingVisualRef.current
    const img = floatingImgRef.current
    if (!visual) return

    if (hoveredMethod !== null) {
      setActiveVisualIndex(hoveredMethod)
      const pos = methodAnchors[hoveredMethod] || methodAnchors[0]
      gsap.killTweensOf(visual)
      if (img) gsap.killTweensOf(img)

      gsap.to(visual, {
        top: pos.top,
        left: pos.left,
        autoAlpha: 1,
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.55,
        ease: 'power3.out',
      })

      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.08, filter: 'saturate(0.9) brightness(0.95)' },
          { scale: 1, filter: 'saturate(1.05) brightness(1)', duration: 0.7, ease: 'power3.out' }
        )
      }
    } else {
      gsap.to(visual, {
        autoAlpha: 0,
        scale: 0.94,
        clipPath: 'inset(8% 8% 8% 8%)',
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          setActiveVisualIndex(null)
        },
      })
    }
  }, [hoveredMethod])

  const closePreview = () => {
    setDesktopMenu(null)
    setDesktopSelection(null)
  }

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
        closePreview()
        setIsConversationModalOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (headerRef.current && !headerRef.current.contains(target) && megaRef.current && !megaRef.current.contains(target)) {
        closePreview()
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
    setSelectedCaseStudy(null)
    setSelectedInsight(null)
    setMenu(false)
    closePreview()
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
    const focus = selectedFocus
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
      // Animate form out, then show success
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.55,
          ease: 'power2.in',
          onComplete: () => {
            setSent(true)
            event.currentTarget?.reset()
            setSelectedFocus('')
            if (successRef.current) {
              gsap.fromTo(
                successRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
              )
            }
          },
        })
      } else {
        setSent(true)
        event.currentTarget.reset()
        setSelectedFocus('')
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "We couldn't submit your enquiry right now. Please try again."
      setFormError(errMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
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
            <button className="button small" onClick={openConversationModal}>
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
            const selectedIndex = desktopSelection?.section === 'capabilities' ? desktopSelection.index : 0
            const detail = capabilityDetails[selectedIndex] ?? capabilityDetails[0]
            const image = capabilityImages[selectedIndex] ?? capabilityImages[0]

            return (
              <div className="mega-panel capabilities-mega" id="capabilities-mega">
                <div className="mega-header">
                  <div>
                    <p className="eyebrow">CAPABILITIES</p>
                    <h3>What can Arclane do?</h3>
                  </div>
                  <span>{detail.number} / 08</span>
                </div>
                <div className="mega-split capabilities-split">
                  <div className="mega-list capabilities-list" role="listbox" aria-label="Capabilities list">
                    {capabilityDetails.map((item, index) => (
                      <button
                        type="button"
                        key={item.number}
                        className={`mega-item ${selectedIndex === index ? 'is-selected' : ''}`}
                        role="option"
                        aria-selected={selectedIndex === index}
                        onMouseEnter={() => setDesktopSelection({ section: 'capabilities', index })}
                        onFocus={() => setDesktopSelection({ section: 'capabilities', index })}
                        onClick={() => selectDesktopItem('capabilities', index)}
                      >
                        <span className="mega-item-num">{item.number}</span>
                        <div className="mega-item-content">
                          <strong className="mega-item-title">{item.title}</strong>
                          <p className="mega-item-desc">{item.shortDescription}</p>
                        </div>
                        <Arrow />
                      </button>
                    ))}
                  </div>
                  <div className="mega-detail capabilities-detail has-detail">
                    <button
                      type="button"
                      className="preview-close"
                      onClick={closePreview}
                      aria-label="Close preview"
                    >
                      CLOSE <span aria-hidden="true">×</span>
                    </button>
                    <div className="mega-detail-media">
                      <img src={image} alt={detail.title} className="mega-detail-img" />
                      <div className="mega-detail-wash" aria-hidden="true" />
                      <span className="mega-detail-badge">ARCLANE // {detail.number}</span>
                    </div>
                    <div className="mega-detail-body">
                      <div className="mega-detail-meta">
                        <span className="mega-detail-num">{detail.number} — {detail.title.toUpperCase()}</span>
                        <h4>{detail.shortDescription}</h4>
                        <p>{detail.fullDescription}</p>
                      </div>
                      <div className="mega-detail-areas-wrap">
                        <small>FOCUS AREAS</small>
                        <div className="mega-areas">
                          {detail.areas.map((area) => (
                            <b key={area}>{area}</b>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {desktopMenu === 'industries' && (() => {
            const selectedIndex = desktopSelection?.section === 'industries' ? desktopSelection.index : 0
            const detail = industryDetails[selectedIndex] ?? industryDetails[0]
            const image = industryImages[selectedIndex] ?? industryImages[0]

            return (
              <div className="mega-panel industries-mega" id="industries-mega">
                <div className="mega-header">
                  <div>
                    <p className="eyebrow">INDUSTRIES</p>
                    <h3>Who does Arclane work with?</h3>
                  </div>
                  <span>{detail.number} / 08</span>
                </div>
                <div className="mega-split industries-split">
                  <div className="mega-list industries-list" role="listbox" aria-label="Industries list">
                    {industryDetails.map((item, index) => (
                      <button
                        type="button"
                        key={item.number}
                        className={`mega-row-horizontal ${selectedIndex === index ? 'is-selected' : ''}`}
                        role="option"
                        aria-selected={selectedIndex === index}
                        onMouseEnter={() => setDesktopSelection({ section: 'industries', index })}
                        onFocus={() => setDesktopSelection({ section: 'industries', index })}
                        onClick={() => selectDesktopItem('industries', index)}
                      >
                        <span className="mega-row-num">{item.number}</span>
                        <div className="mega-row-main">
                          <strong className="mega-row-title">{item.title}</strong>
                          <span className="mega-row-preview">{item.shortDescription}</span>
                        </div>
                        <Arrow />
                      </button>
                    ))}
                  </div>
                  <div className="mega-detail industries-detail has-detail">
                    <button
                      type="button"
                      className="preview-close"
                      onClick={closePreview}
                      aria-label="Close preview"
                    >
                      CLOSE <span aria-hidden="true">×</span>
                    </button>
                    <div className="mega-detail-media">
                      <img src={image} alt={detail.title} className="mega-detail-img" />
                      <div className="mega-detail-wash" aria-hidden="true" />
                      <span className="mega-detail-badge">SECTOR // {detail.number}</span>
                    </div>
                    <div className="mega-detail-body">
                      <div className="mega-detail-meta">
                        <span className="mega-detail-num">{detail.number} — {detail.title.toUpperCase()}</span>
                        <h4>{detail.shortDescription}</h4>
                        <p>{detail.fullDescription}</p>
                      </div>
                      <div className="mega-detail-areas-wrap">
                        <small>INDUSTRY FOCUS</small>
                        <div className="mega-areas">
                          {detail.areas.map((area) => (
                            <b key={area}>{area}</b>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {desktopMenu === 'solutions' && (() => {
            const selectedIndex = desktopSelection?.section === 'solutions' ? desktopSelection.index : 0
            const detail = solutionDetails[selectedIndex] ?? solutionDetails[0]
            const image = solutionImages[selectedIndex] ?? solutionImages[0]

            return (
              <div className="mega-panel solutions-mega" id="solutions-mega">
                <div className="mega-header">
                  <div>
                    <p className="eyebrow">SOLUTIONS</p>
                    <h3>What business problems can Arclane solve?</h3>
                  </div>
                  <span>{detail.number} / 07</span>
                </div>
                <div className="mega-split solutions-split">
                  <div className="mega-list solutions-list" role="listbox" aria-label="Solutions problem explorer">
                    {solutionDetails.map((item, index) => {
                      const isExpanded = selectedIndex === index
                      return (
                        <div
                          key={item.number}
                          className={`problem-explorer-item ${isExpanded ? 'is-expanded' : ''}`}
                          onMouseEnter={() => setDesktopSelection({ section: 'solutions', index })}
                          onFocus={() => setDesktopSelection({ section: 'solutions', index })}
                          onClick={() => selectDesktopItem('solutions', index)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              selectDesktopItem('solutions', index)
                            }
                          }}
                        >
                          <div className="problem-explorer-head">
                            <span className="problem-explorer-num">{item.number}</span>
                            <div className="problem-explorer-titles">
                              <strong className="problem-explorer-title">{item.title}</strong>
                              <span className="problem-explorer-subtitle">{item.shortDescription}</span>
                            </div>
                            <Arrow />
                          </div>
                          {isExpanded && (
                            <div className="problem-explorer-inline-desc">
                              <p>{item.fullDescription}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mega-detail solutions-detail has-detail">
                    <button
                      type="button"
                      className="preview-close"
                      onClick={closePreview}
                      aria-label="Close preview"
                    >
                      CLOSE <span aria-hidden="true">×</span>
                    </button>
                    <div className="mega-detail-media">
                      <img src={image} alt={detail.title} className="mega-detail-img" />
                      <div className="mega-detail-wash" aria-hidden="true" />
                      <span className="mega-detail-badge">SOLUTION // {detail.number}</span>
                    </div>
                    <div className="mega-detail-body">
                      <div className="mega-detail-meta">
                        <span className="mega-detail-num">{detail.number} — {detail.title.toUpperCase()}</span>
                        <h4>{detail.shortDescription}</h4>
                        <p>{detail.fullDescription}</p>
                      </div>
                      <div className="mega-detail-areas-wrap">
                        <small>SUPPORTED OUTCOMES</small>
                        <div className="mega-areas">
                          {detail.areas.map((area) => (
                            <b key={area}>{area}</b>
                          ))}
                        </div>
                      </div>
                    </div>
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
          <button
            type="button"
            className="button mobile-cta"
            onClick={() => {
              setMenu(false)
              openConversationModal()
            }}
          >
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
              <button className="button" onClick={openConversationModal}>
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
              <article
                className="cap"
                key={n}
                tabIndex={0}
                role="region"
                aria-label={`${n} ${t}`}
              >
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <div className="cap-mark" aria-hidden="true">↗</div>
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
          <div
            ref={methodMapRef}
            className="method-map"
            onMouseMove={handleMethodMouseMove}
            onMouseLeave={() => setHoveredMethod(null)}
          >
            <svg ref={pathSvgRef} viewBox="0 0 720 600" preserveAspectRatio="none">
              <path d="M20 45C240 15 130 245 360 232C575 219 492 482 706 545" />
              <path className="dash" d="M20 45C240 15 130 245 360 232C575 219 492 482 706 545" />
            </svg>

            {/* Editorial Hover Image Visual — Image Only */}
            <div
              ref={floatingVisualRef}
              className={`method-editorial-panel ${hoveredMethod !== null ? 'is-active' : ''}`}
              aria-hidden={hoveredMethod === null}
              style={{ opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
            >
              {activeVisualIndex !== null && (() => {
                const visual = methodVisuals[activeVisualIndex]
                if (!visual || !visual.img) return null
                const image = visual.img
                return (
                  <div key={activeVisualIndex} className="method-image-wrap">
                    <img
                      ref={floatingImgRef}
                      src={image}
                      alt=""
                      className="method-panel-img"
                      style={{ objectPosition: visual.pos || 'center' }}
                    />
                    <div className="method-panel-wash" aria-hidden="true" />
                  </div>
                )
              })()}
            </div>

            {methodStages.map((stage, i) => {
              const isHovered = hoveredMethod === i
              const isDimmed = hoveredMethod !== null && !isHovered
              return (
                <motion.article
                  className={`stage stage-${i} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                  key={stage.number}
                  {...reveal}
                  role="button"
                  tabIndex={0}
                  aria-label={`Stage ${stage.number}: ${stage.title}`}
                  onMouseEnter={() => setHoveredMethod(i)}
                  onFocus={() => setHoveredMethod(i)}
                  onClick={() => setHoveredMethod((prev) => (prev === i ? null : i))}
                >
                  <span>{stage.number}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.subtitle}</p>
                </motion.article>
              )
            })}
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
              <button
                type="button"
                key={x}
                className="industry-item"
              >
                <span>0{i + 1}</span>
                {x}
                <Arrow />
              </button>
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
            {caseStudyProjects.map((proj, i) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                index={i}
                onOpenCaseStudy={(p) => setSelectedCaseStudy(p)}
              />
            ))}
          </div>

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
            {insights.map((insight) => (
              <InsightRow
                key={insight.id}
                insight={insight}
                onSelect={(item) => setSelectedInsight(item)}
              />
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
          <div className="contact-inner">
            {/* LEFT COLUMN — Intro */}
            <motion.div
              className="contact-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow">08 / CONTACT</p>
              <h2 className="contact-headline">
                LET&apos;S BUILD
                <br />
                WHAT COMES
                <br />
                NEXT.
              </h2>
              <motion.p
                className="contact-sub"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                Tell us what you&apos;re working through.<br />We&apos;ll find the right starting point.
              </motion.p>
              <motion.div
                className="contact-info"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="contact-info-label">START A CONVERSATION</p>
                <div className="contact-info-lines">
                  <span>Have a challenge?</span>
                  <span>A product to rethink?</span>
                  <span>A system to transform?</span>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN — Form */}
            <div className="contact-right">
              {sent ? (
                <div className="contact-success" ref={successRef} role="status" aria-live="polite">
                  <p className="contact-success-eyebrow">08 / CONTACT</p>
                  <h3 className="contact-success-heading">THANK YOU.</h3>
                  <p className="contact-success-sub">
                    We&apos;ve received your enquiry.<br />
                    Someone from Arclane will be in touch shortly.
                  </p>
                  <button
                    type="button"
                    className="contact-back-btn"
                    onClick={() => {
                      setSent(false)
                      setFormError('')
                      setSelectedFocus('')
                    }}
                  >
                    BACK TO ARCLANE <span className="arrow-icon">↗</span>
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  noValidate
                  onSubmit={submitContact}
                  className="contact-form"
                  aria-label="Contact enquiry form"
                >
                  {/* Name + Email */}
                  <motion.div
                    className="contact-form-grid"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="cf-field">
                      <label htmlFor="cf-name" className="cf-label">YOUR NAME <span className="cf-required">*</span></label>
                      <input
                        id="cf-name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="cf-input"
                      />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-email" className="cf-label">WORK EMAIL <span className="cf-required">*</span></label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        className="cf-input"
                      />
                    </div>
                  </motion.div>

                  {/* Company + Phone */}
                  <motion.div
                    className="contact-form-grid"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="cf-field">
                      <label htmlFor="cf-company" className="cf-label">COMPANY <span className="cf-required">*</span></label>
                      <input
                        id="cf-company"
                        name="company"
                        required
                        autoComplete="organization"
                        placeholder="Company name"
                        className="cf-input"
                      />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-phone" className="cf-label">PHONE <span className="cf-optional">(optional)</span></label>
                      <input
                        id="cf-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 ..."
                        className="cf-input"
                      />
                    </div>
                  </motion.div>

                  {/* Focus chips */}
                  <motion.div
                    className="cf-chips-wrap"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.13, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="cf-label">
                      WHAT ARE YOU LOOKING FOR? <span className="cf-required">*</span>
                    </span>
                    <div
                      className="cf-chips"
                      role="group"
                      aria-label="Focus area selection"
                    >
                      {[
                        'Intelligent Automation',
                        'Digital Experiences',
                        'Scalable Products',
                        'Cloud Infrastructure',
                        'Custom Engineering',
                        'Performance Marketing',
                        'Other',
                      ].map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          className={`cf-chip ${selectedFocus === chip ? 'is-selected' : ''}`}
                          aria-pressed={selectedFocus === chip}
                          onClick={() => setSelectedFocus(selectedFocus === chip ? '' : chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    className="cf-field"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <label htmlFor="cf-message" className="cf-label">
                      TELL US A LITTLE MORE <span className="cf-required">*</span>
                    </label>
                    <textarea
                      id="cf-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What are you trying to solve?"
                      className="cf-input cf-textarea"
                    />
                  </motion.div>

                  {/* Error */}
                  {formError && (
                    <motion.p
                      className="form-error"
                      role="alert"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formError}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: 0.27, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`cf-submit ${isSubmitting ? 'is-loading' : ''}`}
                      aria-label="Send your enquiry"
                    >
                      <span className="cf-submit-text">
                        {isSubmitting ? 'SENDING...' : 'SEND ENQUIRY'}
                      </span>
                      <span className="cf-submit-arrow" aria-hidden="true">↗</span>
                    </button>
                  </motion.div>
                </form>
              )}
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-brand">
            <div className="wordmark">
              ARCLANE <i>GLOBAL</i>
            </div>
            <p className="footer-copy">© ARCLANE GLOBAL · Privacy · Terms</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">


          </nav>

          <div className="footer-social">
            <span className="footer-social-heading">CONTACT WITH US</span>
            <div className="footer-social-divider" aria-hidden="true" />
            <div className="footer-social-links">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn (opens in new tab)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="X / Twitter (opens in new tab)"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="social-icon" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X</span>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram (opens in new tab)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </footer>

        {selectedCaseStudy && (
          <CaseStudyModal
            project={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
          />
        )}

        {selectedInsight && (
          <ArticleModal
            insight={selectedInsight}
            onClose={() => setSelectedInsight(null)}
          />
        )}

        {/* Start a Conversation Editorial Modal */}
        <AnimatePresence>
          {isConversationModalOpen && (
            <motion.div
              className="conversation-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={closeConversationModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cm-title"
            >
              <motion.div
                className="conversation-modal"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cm-topbar">
                  <p className="cm-eyebrow">START A CONVERSATION</p>
                  <button
                    type="button"
                    className="cm-close"
                    onClick={closeConversationModal}
                    aria-label="Close conversation modal"
                  >
                    CLOSE <span className="cm-close-x">×</span>
                  </button>
                </div>

                {cmSent ? (
                  <div className="cm-success" role="status" aria-live="polite">
                    <p className="cm-success-eyebrow">ARCLANE GLOBAL / ENQUIRY RECEIVED</p>
                    <h3 className="cm-success-heading">THANK YOU.</h3>
                    <p className="cm-success-sub">
                      Your enquiry has been received.<br />
                      We&apos;ll be in touch shortly.
                    </p>
                    <button
                      type="button"
                      className="cm-back-btn"
                      onClick={resetAndCloseConversationModal}
                    >
                      BACK TO SITE <Arrow />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 id="cm-title" className="cm-heading">
                      LET&apos;S BUILD
                      <br />
                      WHAT COMES NEXT.
                    </h2>
                    <p className="cm-sub">
                      Tell us what you&apos;re working through.
                      <br />
                      We&apos;ll find the right starting point.
                    </p>

                    <form className="cm-form" noValidate onSubmit={submitConversationModal}>
                      <div className="cm-grid">
                        <div className={`cm-field ${cmErrors.name ? 'has-error' : ''}`}>
                          <label htmlFor="cm-name" className="cm-label">
                            FULL NAME <span className="cm-required">*</span>
                          </label>
                          <input
                            id="cm-name"
                            type="text"
                            placeholder="Your name"
                            value={cmName}
                            onChange={(e) => {
                              setCmName(e.target.value)
                              if (cmErrors.name) setCmErrors((prev) => ({ ...prev, name: undefined }))
                            }}
                            className="cm-input"
                            required
                          />
                          {cmErrors.name && <span className="cm-inline-error">{cmErrors.name}</span>}
                        </div>

                        <div className={`cm-field ${cmErrors.email ? 'has-error' : ''}`}>
                          <label htmlFor="cm-email" className="cm-label">
                            WORK EMAIL <span className="cm-required">*</span>
                          </label>
                          <input
                            id="cm-email"
                            type="email"
                            placeholder="you@company.com"
                            value={cmEmail}
                            onChange={(e) => {
                              setCmEmail(e.target.value)
                              if (cmErrors.email) setCmErrors((prev) => ({ ...prev, email: undefined }))
                            }}
                            className="cm-input"
                            required
                          />
                          {cmErrors.email && <span className="cm-inline-error">{cmErrors.email}</span>}
                        </div>

                        <div className="cm-field">
                          <label htmlFor="cm-company" className="cm-label">
                            COMPANY
                          </label>
                          <input
                            id="cm-company"
                            type="text"
                            placeholder="Company name"
                            value={cmCompany}
                            onChange={(e) => setCmCompany(e.target.value)}
                            className="cm-input"
                          />
                        </div>

                        <div className="cm-field">
                          <label htmlFor="cm-phone" className="cm-label">
                            PHONE
                          </label>
                          <input
                            id="cm-phone"
                            type="tel"
                            placeholder="+00 000 000 000"
                            value={cmPhone}
                            onChange={(e) => setCmPhone(e.target.value)}
                            className="cm-input"
                          />
                        </div>
                      </div>

                      <div className="cm-help-options">
                        <label className="cm-label">WHAT CAN WE HELP WITH?</label>
                        <div className="cm-chips" role="group" aria-label="What can we help with?">
                          {conversationServices.map((service) => {
                            const isSelected = cmService === service
                            return (
                              <button
                                key={service}
                                type="button"
                                className={`cm-chip ${isSelected ? 'is-selected' : ''}`}
                                aria-pressed={isSelected}
                                onClick={() => setCmService(isSelected ? '' : service)}
                              >
                                {service}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className={`cm-field full-width ${cmErrors.message ? 'has-error' : ''}`}>
                        <label htmlFor="cm-message" className="cm-label">
                          MESSAGE <span className="cm-required">*</span>
                        </label>
                        <textarea
                          id="cm-message"
                          placeholder="Tell us a little about your project..."
                          value={cmMessage}
                          onChange={(e) => {
                            setCmMessage(e.target.value)
                            if (cmErrors.message) setCmErrors((prev) => ({ ...prev, message: undefined }))
                          }}
                          className="cm-textarea"
                          required
                        />
                        {cmErrors.message && <span className="cm-inline-error">{cmErrors.message}</span>}
                      </div>

                      {cmErrors.form && (
                        <div className="cm-form-error" role="alert">
                          <span>{cmErrors.form}</span>
                        </div>
                      )}

                      <div className="cm-submit-wrap">
                        <button
                          type="submit"
                          className="cm-submit"
                          disabled={cmSubmitting}
                        >
                          {cmSubmitting ? 'SENDING ENQUIRY...' : 'SUBMIT ENQUIRY'} <Arrow />
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
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
