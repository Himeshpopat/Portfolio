import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import Container from '../components/Container';
import SectionEyebrow from '../components/SectionEyebrow';
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
      setErrorMsg('Data payload size too small. Field [MESSAGE_BODY] must contain at least 10 characters to establish connection.');
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

        {/* Partitioned Spec Grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-line/40 rounded-[12px] overflow-hidden bg-surface/5 backdrop-blur-sm items-stretch">
          
          {/* Left Panel: Direct Feeds (col-span-5) */}
          <div className="lg:col-span-5 border-r border-b border-line/40 p-6 md:p-8 flex flex-col justify-between gap-8 hover:bg-surface/10 transition-colors duration-300">
            <div className="space-y-5">
              <span className="font-mono text-[9px] tracking-widest text-signal-cyan/60 uppercase block select-none">
                [01 // CONTACT_CHANNELS]
              </span>
              
              <h3 className="text-xl font-display font-bold text-signal-cyan leading-snug">
                Open to SWE internships and full-time roles.
              </h3>
              
              <p className="text-xs text-text-muted leading-relaxed font-sans">
                Initiate a transmission via the console terminal form, or reach out directly through standard channel feeds.
              </p>

              {/* Direct channels as telemetry node blocks */}
              <div className="space-y-3 pt-2 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-3 border border-line/40 bg-surface/30 p-3 rounded-[8px] select-all">
                  <Mail className="w-4 h-4 text-signal-cyan shrink-0" />
                  <span>himeshpopat2006@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 border border-line/40 bg-surface/30 p-3 rounded-[8px] select-all">
                  <Phone className="w-4 h-4 text-signal-cyan shrink-0" />
                  <span>+91 82650 31634</span>
                </div>
              </div>
            </div>

            {/* Social icons row */}
            <div className="pt-4 border-t border-line/30 select-none">
              <span className="font-mono text-[9px] text-text-muted/60 uppercase tracking-widest block mb-3.5">
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

          {/* Right Panel: Form Uplink Console (col-span-7) */}
          <div className="lg:col-span-7 border-r border-b border-line/40 p-6 md:p-8 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex justify-between items-center select-none">
                <span className="font-mono text-[9px] tracking-widest text-signal-cyan/60 uppercase block">
                  [02 // UPLINK_TRANSMISSION]
                </span>
                <span className="font-mono text-[9px] text-text-muted/40">
                  STATUS: awaiting_payload
                </span>
              </div>

              {/* Email Input Field - Redesigned bottom line style */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-[10px] text-text-muted uppercase block tracking-wider">
                  Source Email [sender_email]
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparent border-b border-line/60 focus:border-signal-cyan/80 text-sm text-text-primary placeholder:text-text-muted/30 font-sans outline-none py-2 transition-all duration-200 rounded-none focus:placeholder:translate-x-1"
                  disabled={status === 'success'}
                  required
                />
              </div>

              {/* Message Input Field - Redesigned bottom line style */}
              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-[10px] text-text-muted uppercase block tracking-wider">
                  Payload Message [message_body]
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter engineering requirements..."
                  className="w-full bg-transparent border-b border-line/60 focus:border-signal-cyan/80 text-sm text-text-primary placeholder:text-text-muted/30 font-sans outline-none py-2 transition-all duration-200 rounded-none resize-none focus:placeholder:translate-x-1 min-h-[100px]"
                  disabled={status === 'success'}
                  required
                />
              </div>

              {/* Error messages block */}
              {status === 'error' && (
                <ErrorState message={errorMsg} onRetry={() => setStatus('idle')} />
              )}

              {/* Transmission established success panel */}
              {status === 'success' && (
                <div className="p-4 bg-signal-cyan/5 border border-signal-cyan/30 rounded-[8px] flex gap-3 text-signal-cyan font-mono text-xs select-none">
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
                  className="w-full text-xs font-mono uppercase tracking-wider gap-2 py-3 outline-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </Button>
              </div>

            </form>
          </div>

        </div>
      </Container>
    </SectionWrapper>
  );
}
