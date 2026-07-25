import { memo } from 'react'
import { FadeSection } from '../components/ui/FadeSection'
import { SectionLabel } from '../components/ui/SectionLabel'
import { SocialPill } from '../components/ui/SocialPill'
import { GithubIcon, LinkedinIcon, LeetcodeIcon, EmailIcon } from '../components/ui/Icons'
import { SITE_CONFIG } from '../constants/siteConfig'

export const ContactSection = memo(function ContactSection() {
  return (
    <FadeSection id="contact">
      <SectionLabel>Contact</SectionLabel>
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="contact-heading"
          className="mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            letterSpacing: '-0.035em',
            color: '#f1f5f9',
            lineHeight: 1.1,
          }}
        >
          Let's build impactful
          <br />
          <span style={{ color: '#06b6d4' }}>software together.</span>
        </h2>
        <p
          className="mb-8"
          style={{ color: '#94a3b8', fontFamily: 'var(--font-body)', lineHeight: 1.7, fontSize: 15 }}
        >
          Open to software engineering internships, research collaborations, and ambitious technical challenges. If you're building high-impact products, I'd love to connect.
        </p>

        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="w-full sm:w-auto max-w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-4 sm:px-8 py-3.5 rounded-full font-semibold text-xs xs:text-sm sm:text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02] mb-8 truncate"
          style={{ background: '#06b6d4', color: '#0c1020', fontFamily: 'var(--font-body)' }}
        >
          <EmailIcon size={18} />
          <span className="truncate">{SITE_CONFIG.email}</span>
        </a>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <SocialPill href={SITE_CONFIG.social.github} label="GitHub">
            <GithubIcon />
          </SocialPill>
          <SocialPill href={SITE_CONFIG.social.linkedin} label="LinkedIn">
            <LinkedinIcon />
          </SocialPill>
          <SocialPill href={SITE_CONFIG.social.leetcode} label="LeetCode">
            <LeetcodeIcon />
          </SocialPill>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#64748b', letterSpacing: '0.08em' }}>
          {SITE_CONFIG.location}
        </p>
      </div>
    </FadeSection>
  )
})
