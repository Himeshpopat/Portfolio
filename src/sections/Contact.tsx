import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
import Card from '../components/Card';
import Button from '../components/Button';
import SocialIconButton from '../components/SocialIconButton';
import ErrorState from '../components/ErrorState';
import { Github, Linkedin, Award, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');

    // Input diagnostics
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setErrorMsg('Invalid source header. Field [SENDER_EMAIL] must contain a valid email address structure.');
      return;
    }

    if (message.trim().length < 10) {
      setStatus('error');
      setErrorMsg('Data payload size too small. Field [MESSAGE_BODY] must contain at least 10 characters to establish data connection.');
      return;
    }

    // Simulate transmission success
    setStatus('success');
  };

  return (
    <SectionWrapper id="contact" ariaLabel="Contact Himesh Popat">
      <Container>
        <SectionEyebrow label="UPLINK_COMMUNICATION" code="0x06" />
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-text-primary">
          Establish Connection
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <p className="text-xl font-display font-bold text-signal-cyan leading-snug">
                Open to SWE internships and full-time roles.
              </p>
              
              <p className="text-sm text-text-muted leading-relaxed font-sans">
                Initiate a transmission via the console terminal form, or reach out directly through standard channel feeds.
              </p>

              {/* Direct channels */}
              <div className="space-y-4 pt-2 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-3 border border-line bg-surface/50 p-3 rounded-[10px] select-all">
                  <Mail className="w-4 h-4 text-signal-cyan shrink-0" />
                  <span>himeshpopat2006@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 border border-line bg-surface/50 p-3 rounded-[10px] select-all">
                  <Phone className="w-4 h-4 text-signal-cyan shrink-0" />
                  <span>+91 82650 31634</span>
                </div>
              </div>
            </div>

            {/* Redundant social row */}
            <div className="pt-4 border-t border-line/60">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-3.5 select-none">
                Uplink Feeds
              </span>
              <div className="flex items-center gap-3">
                <SocialIconButton 
                  href="https://github.com/Himeshpopat"
                  icon={Github} 
                  label="GitHub Profile" 
                />
                <SocialIconButton 
                  href="https://linkedin.com/in/himesh-popat"
                  icon={Linkedin} 
                  label="LinkedIn Profile" 
                />
                <SocialIconButton 
                  href="https://leetcode.com/u/himesh_popat/"
                  icon={Award} 
                  label="LeetCode Profile" 
                />
              </div>
            </div>
          </div>

          {/* Form Console Column */}
          <div className="lg:col-span-7">
            <Card className="p-6 md:p-8 h-full flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-4">
                <span className="font-mono text-[10px] tracking-wider text-signal-cyan uppercase block mb-1.5 select-none">
                  [Terminal Command: SEND_MESSAGE]
                </span>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-mono text-[11px] text-text-muted uppercase block">
                    Source Email [sender_email]
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-bg border border-line rounded-[10px] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/40 font-sans outline-none transition-colors focus:border-signal-cyan"
                    disabled={status === 'success'}
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="font-mono text-[11px] text-text-muted uppercase block">
                    Payload Message [message_body]
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter engineering requirement parameters..."
                    className="w-full bg-bg border border-line rounded-[10px] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/40 font-sans outline-none transition-colors focus:border-signal-cyan resize-none"
                    disabled={status === 'success'}
                  />
                </div>

                {/* Status elements */}
                {status === 'error' && (
                  <ErrorState message={errorMsg} onRetry={() => setStatus('idle')} />
                )}

                {status === 'success' && (
                  <div className="p-4 bg-signal-cyan/5 border border-signal-cyan/35 rounded-[10px] flex gap-3 text-signal-cyan font-mono text-xs select-none">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold uppercase tracking-wider mb-1">
                        [TRANSMISSION_ESTABLISHED]
                      </p>
                      <p className="text-text-muted leading-relaxed">
                        Data packets successfully broadcast. Connection buffer opened. I will establish a feedback sequence shortly.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === 'success'}
                    className="w-full text-xs font-mono uppercase tracking-wider gap-2.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message</span>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
