// config/products.js
const products = [
  {
    id: 'rtcdp',
    letter: 'A',
    keyword: 'ACTIVATION',
    logo: '/images/rtcdp.jpg',
    rosterIndex: 8, // Points to position 9: "9. Real-Time CDP" (0-indexed)
    clue: 'Which customer data application allows brands to instantly personalize experiences across paid and owned channels in milliseconds?',
    name: 'Adobe Real-Time CDP',
    type: 'SaaS (Ready-to-Use Application)',
    category: 'Commercial Profile Activation',
    focus: 'Instant Cross-Channel Customer Personalization',
    audience: 'Hybrid (B2C Omnichannel Marketers & B2B Account-Based Marketing Teams)',
    capabilities: [
      'Turns fragmented real-time customer actions into active, instantly targetable profiles.',
      'Launches marketing audiences to 500+ global ad, social, and email systems in milliseconds.',
      'Saves advertising spend by automatically suppressing existing buyers from redundant paid ads.'
    ],
    accent: '#7C3AED'
  },
  {
    id: 'aep',
    letter: 'D',
    keyword: 'DATA',
    logo: '/images/aeplogo.webp',
    rosterIndex: 1, // Points to position 2: "2. Adobe Experience Platform (AEP)"
    clue: 'What enterprise-wide foundation serves as the central brain for all customer data across the entire Adobe infrastructure?',
    name: 'Adobe Experience Platform (AEP)',
    type: 'PaaS (Extensible Enterprise Foundation)',
    category: 'Enterprise Data Foundation',
    focus: 'Centralized Data Integration & Legal Compliance',
    audience: 'Enterprise Technology Leaders & Data Governance Teams',
    capabilities: [
      'Acts as the unified "central data lake" combining legacy systems and live streaming channels.',
      'Enforces global privacy compliance and customer consent rules automatically before data leaves the company.',
      'Feeds clean, standardized enterprise data pools directly into executive AI and reporting dashboards.'
    ],
    accent: '#1473E6'
  },
  {
    id: 'camp',
    letter: 'O',
    keyword: 'ORCHESTRATION',
    logo: '/images/campaign.webp',
    rosterIndex: 2, // Points to position 3: "3. Campaign"
    clue: 'What massive scale engine allows global brands to schedule and safely deliver millions of outbound messages daily without fatiguing their audience?',
    name: 'Adobe Campaign',
    type: 'SaaS (Ready-to-Use Application)',
    category: 'Direct Outbound Communications',
    focus: 'High-Volume Enterprise Lifecycle Marketing',
    audience: 'B2C Enterprise Relationship Marketers & Mobile App Growth Teams',
    capabilities: [
      'Designs multi-step customer journeys across Email, SMS, Push notifications, and Direct Mail from one canvas.',
      'Protects brand reputation by automatically capping message frequency so customers are never spammed.',
      'Reliably delivers millions of critical transaction notifications (e.g., shipping updates, statements) instantly.'
    ],
    accent: '#F97316'
  },
  {
    id: 'gen',
    letter: 'B',
    keyword: 'BRAND',
    logo: '/images/genstudio.webp',
    rosterIndex: 12, // Points to position 13: "13. GenStudio"
    clue: 'What content application utilizes generative AI to create hundreds of localized marketing variations while strictly protecting corporate style guidelines?',
    name: 'Adobe GenStudio for Performance Marketing',
    type: 'SaaS (Ready-to-Use Application)',
    category: 'AI-First Content Operations',
    focus: 'Scaling Content Production Speed via Safe Generative AI',
    audience: 'B2B Creative Directors, Content Operations Managers, & Digital Advertisers',
    capabilities: [
      'Eliminates agency bottlenecks by instantly creating hundreds of localized ad image and text variations.',
      'Ensures 100% brand safety by using AI that cannot violate pre-approved corporate colors, fonts, and styles.',
      'Tracks content performance variations to tell creative teams exactly which images drive the highest revenue.'
    ],
    accent: '#EC4899'
  },
  {
    id: 'aam',
    letter: 'E',
    keyword: 'EXTERNAL',
    logo: '/images/aam.png',
    rosterIndex: 4, // Points to position 5: "5. Audience Manager"
    clue: 'What traditional data platform specializes in capturing anonymous web visitors and external third-party data to scale paid advertising reach?',
    name: 'Adobe Audience Manager (AAM)',
    type: 'SaaS (Ready-to-Use Application)',
    category: 'Anonymous Audience Monetization',
    focus: 'Prospect Acquisition & Third-Party Advertising Enrichment',
    audience: 'B2C Digital Media Buyers & Programmatic Media Operations',
    capabilities: [
      'Groups anonymous web traffic based on behavioral interests to discover net-new target customers.',
      'Leverages external third-party marketplaces to enrich what a brand knows about prospects before their first purchase.',
      'Pushes optimized audience lists straight to advertising platforms to acquire cold traffic efficiently.'
    ],
    accent: '#10B981'
  }
];

module.exports = products;