const { Button, Card, Icon, Badge, Tag, Stepper } = window.UnibridgeNLDesignSystem_3cb2d1;

function BridgeHero() {
  const [buildKey, setBuildKey] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setBuildKey(k => k + 1), 5600);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div style={{position:'relative',aspectRatio:'4 / 5',borderRadius:'var(--radius-media)',overflow:'hidden',border:'1px solid var(--border-hairline)',background:'var(--cream-300)'}}>
        <style>{`
          @keyframes ubDraw { to { stroke-dashoffset: 0; } }
          @keyframes ubGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
          @keyframes ubPop { 0% { opacity:0; transform: scale(0); } 65% { opacity:1; transform: scale(1.18); } 100% { opacity:1; transform: scale(1); } }
          @keyframes ubPopLogo { 0% { opacity:0; transform: translateX(-50%) scale(0); } 65% { opacity:1; transform: translateX(-50%) scale(1.15); } 100% { opacity:1; transform: translateX(-50%) scale(1); } }
          @keyframes ubFade { from { opacity:0; } to { opacity:1; } }
          @keyframes ubShimmer { 0%,100% { opacity:.45; } 50% { opacity:.8; } }
          .ub-water { animation: ubFade .6s ease both; }
          .ub-shimmer { animation: ubShimmer 3.5s ease-in-out infinite; }
          .ub-deck { stroke-dasharray:1; stroke-dashoffset:1; animation: ubDraw .8s cubic-bezier(.22,1,.36,1) .2s both; }
          .ub-arch { stroke-dasharray:1; stroke-dashoffset:1; animation: ubDraw 1.3s cubic-bezier(.22,1,.36,1) .55s both; }
          .ub-hanger { transform-origin: top; animation: ubGrow .35s cubic-bezier(.22,1,.36,1) both; }
          .ub-bead { animation: ubPop .45s cubic-bezier(.34,1.56,.64,1) both; }
          .ub-badge { animation: ubFade .6s ease 1.95s both; }
          .ub-birds { animation: ubFade .6s ease 2.15s both; }
          @media (prefers-reduced-motion: reduce) {
            .ub-water, .ub-deck, .ub-arch, .ub-hanger, .ub-bead, .ub-badge, .ub-birds, .ub-shimmer { animation: none !important; opacity: 1 !important; transform: none !important; stroke-dashoffset: 0 !important; }
          }
        `}</style>
        <svg key={buildKey} viewBox="0 0 400 500" width="100%" height="100%" style={{display:'block'}} pathLength="1">
          <defs>
            <linearGradient id="ubSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--cream-100)"/>
              <stop offset="100%" stopColor="var(--cream-300)"/>
            </linearGradient>
            <linearGradient id="ubWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold-100)"/>
              <stop offset="100%" stopColor="var(--cream-400)"/>
            </linearGradient>
            <filter id="ubShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="var(--ink-900)" floodOpacity="0.16"/>
            </filter>
          </defs>
          <rect width="400" height="500" fill="url(#ubSky)"/>
          <rect className="ub-water" x="0" y="400" width="400" height="100" fill="url(#ubWater)"/>
          <line className="ub-water ub-shimmer" x1="0" y1="400" x2="400" y2="400" stroke="var(--gold-300)" strokeWidth="2"/>
          <g className="ub-birds">
            <path d="M60,110 Q70,100 80,110 Q90,100 100,110" stroke="var(--ink-300)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M140,90 Q150,80 160,90 Q170,80 180,90" stroke="var(--ink-300)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </g>
          <g className="ub-badge">
            <circle cx="330" cy="55" r="22" fill="var(--gold-500)"/>
            <line x1="356" y1="55" x2="368" y2="55" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="348.4" y1="73.4" x2="356.9" y2="81.9" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="330" y1="81" x2="330" y2="93" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="311.6" y1="73.4" x2="303.1" y2="81.9" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="304" y1="55" x2="292" y2="55" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="311.6" y1="36.6" x2="303.1" y2="28.1" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="330" y1="29" x2="330" y2="17" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="348.4" y1="36.6" x2="356.9" y2="28.1" stroke="var(--gold-500)" strokeWidth="3" strokeLinecap="round"/>
          </g>
          <g filter="url(#ubShadow)">
            <line className="ub-deck" x1="50" y1="380" x2="350" y2="380" pathLength="1" stroke="var(--ink-700)" strokeWidth="4" strokeLinecap="round"/>
            <line className="ub-hanger" style={{animationDelay:'.95s'}} x1="90" y1="320" x2="90" y2="380" stroke="var(--ink-500)" strokeWidth="2"/>
            <line className="ub-hanger" style={{animationDelay:'1.05s'}} x1="140" y1="270" x2="140" y2="380" stroke="var(--ink-500)" strokeWidth="2"/>
            <line className="ub-hanger" style={{animationDelay:'1.15s'}} x1="190" y1="235" x2="190" y2="380" stroke="var(--ink-500)" strokeWidth="2"/>
            <line className="ub-hanger" style={{animationDelay:'1.25s'}} x1="240" y1="245" x2="240" y2="380" stroke="var(--ink-500)" strokeWidth="2"/>
            <line className="ub-hanger" style={{animationDelay:'1.35s'}} x1="290" y1="290" x2="290" y2="380" stroke="var(--ink-500)" strokeWidth="2"/>
            <line className="ub-hanger" style={{animationDelay:'1.45s'}} x1="330" y1="350" x2="330" y2="380" stroke="var(--ink-500)" strokeWidth="2"/>
            <path className="ub-arch" d="M50,400 Q200,60 350,400" pathLength="1" stroke="var(--ink-900)" strokeWidth="8" fill="none" strokeLinecap="round"/>
          </g>
          <circle className="ub-bead" style={{animationDelay:'1.55s'}} cx="90" cy="320" r="9" fill="var(--gold-500)"/>
          <circle className="ub-bead" style={{animationDelay:'1.65s'}} cx="140" cy="270" r="9" fill="var(--clay-500)"/>
          <circle className="ub-bead" style={{animationDelay:'1.75s'}} cx="190" cy="235" r="9" fill="var(--moss-500)"/>
          <circle className="ub-bead" style={{animationDelay:'1.85s'}} cx="240" cy="245" r="9" fill="var(--gold-700)"/>
          <circle className="ub-bead" style={{animationDelay:'1.95s'}} cx="290" cy="290" r="9" fill="var(--moss-700)"/>
        </svg>
        <img key={'logo'+buildKey} src="/assets/logo-badge.jpg" alt="UniBridge NL" style={{position:'absolute',top:'8%',left:'50%',width:56,height:56,borderRadius:999,border:'3px solid var(--cream-100)',boxShadow:'var(--shadow-md)',opacity:0,animation:'ubPopLogo .55s cubic-bezier(.34,1.56,.64,1) 2.15s both'}}/>
      </div>
    </div>
  );
}

function HomeScreen({ go }) {
  const services = [
    ["graduation-cap","University enrolment","We file your application at up to five Dutch universities and chase every decision."],
    ["house","Housing support","We work with a licensed housing intermediary who sources verified rooms, and we check the contract before you sign."],
    ["id-card","Visa & BSN","Residence permit paperwork and a booked BSN appointment in your arrival week."],
    ["wallet","Bank & insurance","A Dutch IBAN, student health insurance and your OV travel card, sorted."],
    ["bike","Arrival week","A bike, SIM card and a walk through your new neighbourhood."],
    ["calendar-check","Deadline tracking","One checklist with every date, so nothing expires in a mailbox."]
  ];
  return (
    <main>
      <section style={{padding:'var(--space-20) 0 var(--space-16)'}}>
        <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'var(--space-16)',alignItems:'center'}}>
          <div>
            <Badge tone="accent">September 2027 intake open</Badge>
            <h1 style={{fontSize:'var(--text-display-2)',lineHeight:'var(--leading-tight)',margin:'var(--space-5) 0 var(--space-4)'}}>Your bridge to student life in the Netherlands</h1>
            <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'46ch'}}>You handle the studying. We handle enrolment, your residence permit and the first week, and put you in front of a licensed housing partner instead of a scam listing.</p>
            <div style={{display:'flex',gap:'var(--space-3)',marginTop:'var(--space-8)',flexWrap:'wrap'}}>
              <Button size="lg" onClick={()=>go('apply')} iconRight={<Icon name="arrow-right" size={18}/>}>Start my application</Button>
              <Button size="lg" variant="secondary" onClick={()=>go('call')}>Book a free 15-min call</Button>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-8)',marginTop:'var(--space-10)'}}>
              {[["13","cities across the Netherlands"],["16","partner universities"],["1","advisor from start to arrival"]].map(([n,l])=>(
                <div key={l}><div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:30,color:'var(--text-heading)'}}>{n}</div><div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>{l}</div></div>
              ))}
            </div>
          </div>
          <div>
            <BridgeHero/>
            <Card elevation="lg" style={{marginTop:'var(--space-6)',maxWidth:290}}>
              <div className="ub-overline">Your checklist</div>
              <Stepper orientation="vertical" current={2} style={{marginTop:12}} steps={[{label:"Profile",meta:"Complete"},{label:"University choice",meta:"Erasmus, Utrecht"},{label:"Documents",meta:"2 of 5 uploaded"},{label:"Housing partner"}]}/>
            </Card>
          </div>
        </div>
      </section>

      <Section tone="cream" overline="What we do" title="Everything between an offer letter and your first lecture" lead="Six services, one fee, no forwarding you to a call centre.">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'var(--space-5)'}}>
          {services.map(([icon,t,d])=>(
            <Card key={t} interactive onClick={()=>go('services')}>
              <span style={{display:'inline-flex',width:44,height:44,borderRadius:'var(--radius-md)',background:'var(--surface-accent-soft)',color:'var(--gold-700)',alignItems:'center',justifyContent:'center'}}><Icon name={icon} size={22}/></span>
              <h3 style={{fontSize:'var(--text-h4)',margin:'var(--space-4) 0 var(--space-2)'}}>{t}</h3>
              <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:0}}>{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section overline="How it works" title="Three steps, twelve weeks">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'var(--space-8)'}}>
          {[["01","Tell us your plan","Fifteen minutes. Study level, field, budget, cities you'd live in."],["02","We build your route","A shortlist of universities you'll actually get into, with dates and costs written out."],["03","You arrive settled","A room found through our housing partner, bank card, BSN appointment and a bike in your arrival week."]].map(([n,t,d])=>(
            <div key={n}>
              <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:48,color:'var(--gold-300)',lineHeight:1}}>{n}</div>
              <hr className="ub-rule" style={{width:40,margin:'var(--space-4) 0'}}/>
              <h3 style={{fontSize:'var(--text-h4)'}}>{t}</h3>
              <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" overline="Students" title="What it felt like on the other side">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'var(--space-5)'}}>
          {[["Amara O.","University of Amsterdam","I landed on a Tuesday and had my BSN appointment on the Thursday. Nothing was left to figure out at the airport."],["Diego F.","Utrecht University, MSc Data Science","They talked me out of two universities I would have wasted money applying to. That advice paid for the whole service."],["Nour H.","VU Amsterdam, BSc Architecture","Housing was the part I was scared of. Their partner agency found the room and UniBridge read the contract before I signed."]].map(([n,s,q])=>(
            <Card key={n} rule>
              <p style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontSize:'var(--text-h4)',lineHeight:1.45,color:'var(--text-heading)'}}>{q}</p>
              <div style={{display:'flex',alignItems:'center',gap:12,marginTop:'var(--space-5)'}}>
                <div style={{width:38,height:38,borderRadius:999,background:'var(--surface-tertiary-soft)',color:'var(--moss-700)',display:'flex',alignItems:'center',justifyContent:'center',font:'700 14px var(--font-sans)'}}>{n[0]}</div>
                <div><div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{n}</div><div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>{s}</div></div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
        <Card tone="ink" padding="var(--space-16)" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'var(--space-10)',alignItems:'center',borderRadius:'var(--radius-2xl)'}}>
          <div>
            <h2 style={{color:'var(--cream-200)',fontSize:'var(--text-h2)',maxWidth:'26ch'}}>Applications for September close on 1 May.</h2>
            <p style={{color:'var(--ink-100)',fontSize:'var(--text-body-lg)',margin:0,maxWidth:'48ch'}}>Start now and we'll map your route this week. No payment until you accept a plan.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
            <Button size="lg" onClick={()=>go('apply')}>Start my application</Button>
            <Button size="lg" variant="ghost" style={{color:'var(--cream-200)'}}>See partner universities</Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
Object.assign(window, { HomeScreen });
