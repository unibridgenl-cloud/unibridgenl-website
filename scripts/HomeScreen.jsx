const { Button, Card, Icon, Badge, Tag, Stepper } = window.UnibridgeNLDesignSystem_3cb2d1;

const SERVICES = [
  ["graduation-cap","University enrolment","We file your application at up to five Dutch universities and chase every decision."],
  ["house","Housing support","A licensed partner agency sources verified rooms. We read the contract before you sign."],
  ["id-card","Visa & BSN","Residence permit paperwork and a booked BSN appointment in your arrival week."],
  ["wallet","Bank & insurance","A Dutch IBAN, student health insurance and your OV chip card, sorted."],
  ["plane-takeoff","Arrival week","A bike, a SIM card, your first shop and a walk through your new neighbourhood."],
  ["calendar-check","Deadline tracking","One checklist with every date, so nothing expires in a mailbox."]
];

const UNI_LOGOS = [
  ["University of Amsterdam","uva.nl"],["VU Amsterdam","vu.nl"],["TU Delft","tudelft.nl"],
  ["Utrecht University","uu.nl"],["Leiden University","universiteitleiden.nl"],["Erasmus University Rotterdam","eur.nl"],
  ["University of Groningen","rug.nl"],["Eindhoven University of Technology","tue.nl"],["Maastricht University","maastrichtuniversity.nl"],
  ["Radboud University","ru.nl"],["University of Twente","utwente.nl"],["Tilburg University","tilburguniversity.edu"]
];

/* Scroll-scrubbed scene: the journey advances as the panel is pinned. */
const CHAPTERS = [
  { k:"Apply", t:"We file, you study", d:"Up to five applications, documents certified, every deadline two weeks ahead of the university's own.", icon:"graduation-cap",
    label:"Application file", stat:"5", statLabel:"universities filed",
    rows:[["check","Diploma certified & translated"],["check","Motivation letter reviewed"],["check","IELTS 6.5 verified"],["clock","UvA decision expected 12 Apr"]] },
  { k:"Live", t:"A room, checked before you sign", d:"Our licensed partner agency sources verified listings. We read the contract line by line.", icon:"house",
    label:"Housing shortlist", stat:"3", statLabel:"verified rooms shortlisted",
    rows:[["check","Registration allowed at address"],["check","Deposit capped at two months"],["check","Contract read by your advisor"],["clock","Viewing booked 18 Apr, 14:00"]] },
  { k:"Stay", t:"Permit, BSN, and the paperwork nobody explains", d:"Residence permit filed, municipality appointment booked inside your arrival week.", icon:"id-card",
    label:"Permit & BSN", stat:"14", statLabel:"days to decision",
    rows:[["check","Proof of funds letter accepted"],["check","Residence permit filed by university"],["check","Health insurance arranged"],["clock","Municipality appointment 2 Sep"]] },
  { k:"Arrive", t:"Keys, bank card, bike", d:"Met on your first morning, walked through your neighbourhood, and set up before the weekend.", icon:"plane-takeoff",
    label:"Arrival week", stat:"7", statLabel:"days, fully set up",
    rows:[["check","Arrival day planned hour by hour"],["check","Keys collected, meter read"],["check","Bank card & SIM active"],["clock","Bike handover Saturday 11:00"]] }
];

/* Scroll-scrubbed chapters. The parent owns ONE scroll listener and hands each row its
   own 0→1 travel through the viewport, so the panels drift, tilt and settle as you read,
   and the tracker above them fills in step. */
function useRowTravel(count) {
  const refs = React.useRef([]);
  const [ps, setPs] = React.useState(() => new Array(count).fill(0));
  React.useEffect(() => {
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setPs(new Array(count).fill(0.5)); return; }
    let raf = 0;
    const read = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      setPs(refs.current.map(el => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      }));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    read();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [count]);
  return [refs, ps];
}

function ChapterRow({ c, n, t, setRef }) {
  const flip = n % 2 === 1;
  const ease = Math.min(1, Math.max(0, (t - 0.08) / 0.30));      // entrance
  const leave = Math.min(1, Math.max(0, (1.04 - t) / 0.22));      // soft exit
  const vis = Math.min(ease, leave);
  const drift = (0.5 - t) * 64;                                   // panel parallax
  const textDrift = (0.5 - t) * 22;
  const live = t > 0.30 && t < 0.86;
  return (
    <div ref={setRef} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'clamp(24px,4vw,64px)',alignItems:'center',padding:'clamp(36px,5vw,64px) 0',borderTop:n?'1px solid rgba(251,244,236,.10)':'none'}}>
      <div style={{order:flip?2:1,opacity:.25+vis*.75,transform:`translate3d(0,${textDrift}px,0)`,transition:'opacity 500ms var(--ease-standard)'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:'var(--space-5)'}}>
          <span style={{display:'inline-flex',width:48,height:48,borderRadius:'var(--radius-md)',alignItems:'center',justifyContent:'center',
            background:live?'rgba(184,124,70,.30)':'rgba(184,124,70,.16)',border:'1px solid rgba(214,168,119,'+(live?.62:.34)+')',color:'var(--gold-300)',
            transform:`scale(${0.92+vis*0.08})`,transition:'background-color 520ms var(--ease-standard), border-color 520ms var(--ease-standard), transform 520ms var(--ease-out)',
            animation:'ub-float 6s var(--ease-standard) infinite'}}><Icon name={c.icon} size={23}/></span>
          <span style={{fontSize:'var(--text-caption)',fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--gold-300)'}}>{String(n+1).padStart(2,'0')} · {c.k}</span>
          <span aria-hidden="true" style={{flex:1,height:1,background:'linear-gradient(90deg, rgba(214,168,119,.55), transparent)',transformOrigin:'left center',transform:`scaleX(${vis})`,transition:'transform 620ms var(--ease-out)'}}/>
        </div>
        <h2 style={{color:'var(--cream-100)',fontSize:'clamp(28px,3.4vw,48px)',letterSpacing:'-.03em',lineHeight:1.06,margin:'0 0 var(--space-4)',maxWidth:'19ch'}}>{c.t}</h2>
        <p style={{color:'var(--ink-100)',fontSize:'clamp(16px,1.4vw,20px)',lineHeight:1.55,maxWidth:'46ch',margin:0,textWrap:'pretty'}}>{c.d}</p>
      </div>
      <div style={{order:flip?1:2,position:'relative',display:'flex',justifyContent:'center'}}>
        <div aria-hidden="true" style={{position:'absolute',width:'min(380px,88%)',aspectRatio:'1',borderRadius:'50%',
          background:'conic-gradient(from 0deg, transparent 0 62%, rgba(214,168,119,.45) 78%, transparent 92%)',
          maskImage:'radial-gradient(circle, transparent 61%, #000 62%, #000 63.4%, transparent 64%)',
          WebkitMaskImage:'radial-gradient(circle, transparent 61%, #000 62%, #000 63.4%, transparent 64%)',
          animation:'ub-orbit 26s linear infinite',opacity:.35+vis*.5,top:'50%',marginTop:'-19%',
          rotate:(t*90)+'deg'}}/>
        <div style={{width:'min(400px,100%)',transform:`translate3d(0,${drift}px,0) scale(${0.94+vis*0.06}) rotate(${(0.5-t)*1.1}deg)`,opacity:.35+vis*.65,willChange:'transform'}}>
          <Tilt max={3.5}>
            <div style={{position:'relative',width:'100%',borderRadius:'var(--radius-xl)',border:'1px solid rgba(251,244,236,'+(live?.30:.16)+')',overflow:'hidden',
              background:'linear-gradient(180deg, rgba(251,244,236,.10), rgba(251,244,236,.04))',
              backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',
              boxShadow:live?'0 50px 110px -46px rgba(0,0,0,.95)':'0 40px 90px -50px rgba(0,0,0,.9)',
              transition:'border-color 520ms var(--ease-standard), box-shadow 520ms var(--ease-standard)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,padding:'16px 20px',borderBottom:'1px solid rgba(251,244,236,.12)'}}>
                <span style={{fontSize:'var(--text-caption)',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--gold-300)'}}>{c.label}</span>
                <span style={{display:'flex',alignItems:'center',gap:7,fontSize:'var(--text-caption)',color:'rgba(251,244,236,.62)'}}>
                  <span style={{width:7,height:7,borderRadius:'50%',background:'var(--moss-500)',animation:'ub-pulse 2.4s var(--ease-standard) infinite'}}/>On track
                </span>
              </div>
              <div style={{padding:'18px 20px',display:'flex',flexDirection:'column',gap:12}}>
                {c.rows.map(([ic,txt],ri)=>{
                  const shown = t > 0.24 + ri * 0.055;
                  return (
                    <div key={txt} style={{display:'flex',alignItems:'center',gap:11,
                      opacity:shown?1:0,transform:shown?'none':'translate3d(-10px,0,0)',
                      transition:`opacity 480ms var(--ease-out) ${ri*70}ms, transform 480ms var(--ease-out) ${ri*70}ms`}}>
                      <span style={{display:'inline-flex',width:22,height:22,flex:'0 0 22px',borderRadius:'50%',alignItems:'center',justifyContent:'center',
                        background:ic==='check'?'rgba(94,122,90,.30)':'rgba(184,124,70,.22)',
                        color:ic==='check'?'var(--cream-100)':'var(--gold-300)'}}><Icon name={ic} size={12}/></span>
                      <span style={{fontSize:'var(--text-body-sm)',color:'rgba(251,244,236,.86)'}}>{txt}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{display:'flex',alignItems:'baseline',gap:10,padding:'14px 20px 18px',borderTop:'1px solid rgba(251,244,236,.12)'}}>
                <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,
                  fontSize:'clamp(26px,2.6vw,36px)',lineHeight:1,color:'var(--cream-100)',letterSpacing:'-.02em'}}>
                  {/^\d+$/.test(c.stat) ? <Counter to={Number(c.stat)} duration={1100}/> : c.stat}
                </span>
                <span style={{fontSize:'var(--text-body-sm)',color:'rgba(251,244,236,.58)'}}>{c.statLabel}</span>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
}

/** Sticky chapter tracker: fills as the four rows travel past. */
function JourneyTracker({ ps }) {
  const each = 1 / CHAPTERS.length;
  const fill = Math.min(1, ps.reduce((sum,t) => sum + Math.min(1, Math.max(0, (t - 0.22) / 0.42)) * each, 0));
  const active = ps.reduce((acc,t,i) => (t > 0.30 ? i : acc), 0);
  return (
    <div style={{position:'sticky',top:78,zIndex:2,padding:'var(--space-4) 0 var(--space-5)',backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)'}}>
      <div style={{display:'flex',flexWrap:'wrap',gap:'clamp(12px,3vw,34px)',marginBottom:12}}>
        {CHAPTERS.map((c,i)=>{
          const on = i <= active;
          return (
            <span key={c.k} style={{display:'inline-flex',alignItems:'center',gap:9,fontSize:'var(--text-caption)',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',
              color:i===active?'var(--gold-300)':on?'rgba(251,244,236,.60)':'rgba(251,244,236,.28)',transition:'color 460ms var(--ease-standard)'}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:i===active?'var(--gold-300)':on?'rgba(214,168,119,.55)':'rgba(251,244,236,.22)',
                transform:i===active?'scale(1.5)':'scale(1)',transition:'transform 460ms var(--ease-out), background-color 460ms var(--ease-standard)'}}/>
              {String(i+1).padStart(2,'0')} {c.k}
            </span>
          );
        })}
      </div>
      <div style={{height:2,background:'rgba(251,244,236,.12)',borderRadius:2,overflow:'hidden'}}>
        <div style={{height:'100%',width:(fill*100)+'%',background:'linear-gradient(90deg,var(--gold-700),var(--gold-300))',transition:'width 220ms linear'}}/>
      </div>
    </div>
  );
}

function JourneyScene() {
  const y = useScrollY();
  const [refs, ps] = useRowTravel(CHAPTERS.length);
  // overflow:clip, not hidden — hidden would make this section the sticky tracker's
  // scrollport and stop it sticking; clip still trims the aurora and starfield.
  return (
    <section style={{position:'relative',background:'var(--ink-900)',overflow:'clip',padding:'clamp(56px,8vw,110px) 0'}}>
      <div aria-hidden="true" className="ub-aurora" style={{position:'absolute',inset:'-25% -10%',opacity:.55,pointerEvents:'none'}}/>
      <div aria-hidden="true" style={{position:'absolute',inset:0,opacity:.5,pointerEvents:'none',
        background:'radial-gradient(1px 1px at 12% 18%, rgba(214,168,119,.9), transparent 60%),radial-gradient(1px 1px at 78% 12%, rgba(251,244,236,.7), transparent 60%),radial-gradient(1.5px 1.5px at 62% 62%, rgba(214,168,119,.7), transparent 60%),radial-gradient(1px 1px at 34% 82%, rgba(251,244,236,.5), transparent 60%),radial-gradient(1px 1px at 90% 46%, rgba(214,168,119,.6), transparent 60%)',
        transform:`translate3d(0,${(y % 2000) * -0.02}px,0)`}}/>
      <div style={{position:'relative',maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
        <Rise>
          <div className="ub-overline" style={{color:'rgba(251,244,236,.42)'}}>The four things that actually happen</div>
        </Rise>
        <DrawRule delay={200} style={{margin:'14px 0 var(--space-4)'}}/>
        <h2 style={{color:'var(--cream-100)',fontSize:'clamp(26px,3vw,40px)',letterSpacing:'-.025em',maxWidth:'22ch',margin:'0 0 var(--space-4)'}}>
          <RevealWords text="Apply, live, stay, arrive" delay={80}/>
        </h2>
        <JourneyTracker ps={ps}/>
        {CHAPTERS.map((c,n)=>(
          <ChapterRow key={c.k} c={c} n={n} t={ps[n] || 0} setRef={el => { refs.current[n] = el; }}/>
        ))}
      </div>
    </section>
  );
}

const UB_COMPARE = [
  { k:"alone", title:"On your own", sub:"Forums, embassy PDFs and hope.", tone:"quiet",
    rows:[
      ["Price","Costs surface one at a time: translations, deposits, re-applications."],
      ["Route","You guess which universities will take you, and pay to find out."],
      ["Expertise","Advice written for a different country, a different year."],
      ["Fit","You adapt to whatever you manage to find in time."]
    ] },
  { k:"agency", title:"A typical agency", sub:"Twelve destinations, one brochure.", tone:"quiet",
    rows:[
      ["Price","A headline fee, with extras billed once you're committed."],
      ["Route","A predetermined package, the same one everybody is sold."],
      ["Expertise","Every country at once, none of them in depth."],
      ["Fit","You are moved toward whichever package is for sale."]
    ] },
  { k:"ub", title:"UniBridge NL", sub:"One country, one plan, one price.", tone:"gold",
    rows:[
      ["Price","Fixed price, agreed in writing before anything begins."],
      ["Route","Built around your profile, your goals and your preferences."],
      ["Expertise","One destination. One area of expertise. The Netherlands."],
      ["Fit","No one-size-fits-all routes. We find the one that fits you."]
    ] }
];

function CompareColumn({ c }) {
  const gold = c.tone === 'gold';
  return (
    <Card
      elevation={gold ? "lg" : "none"}
      padding="var(--space-8)"
      style={{height:'100%',display:'flex',flexDirection:'column',
        background: gold ? 'var(--surface-card)' : 'transparent',
        border: gold ? '1px solid var(--border-accent)' : '1px solid var(--border-hairline)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,minHeight:26}}>
        <h3 style={{fontSize:'var(--text-h4)',margin:0,color:gold?'var(--text-heading)':'var(--text-muted)'}}>{c.title}</h3>
        {gold && <Badge tone="accent">Us</Badge>}
      </div>
      <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'var(--space-2) 0 0'}}>{c.sub}</p>
      <hr className="ub-rule" style={{width:'100%',margin:'var(--space-6) 0 var(--space-5)',opacity:gold?1:.35}}/>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
        {c.rows.map(([label,text])=>(
          <div key={label} style={{display:'grid',gridTemplateColumns:'22px 1fr',gap:12,alignItems:'start'}}>
            <span style={{display:'inline-flex',width:22,height:22,marginTop:2,borderRadius:'50%',alignItems:'center',justifyContent:'center',
              background: gold ? 'var(--surface-tertiary-soft)' : 'var(--surface-sunken)',
              color: gold ? 'var(--moss-700)' : 'var(--text-subtle)'}}>
              <Icon name={gold ? 'check' : 'minus'} size={12}/>
            </span>
            <div>
              <div style={{fontSize:'var(--text-caption)',fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',
                color: gold ? 'var(--gold-700)' : 'var(--text-subtle)',marginBottom:5}}>{label}</div>
              <p style={{fontSize:'var(--text-body-sm)',lineHeight:1.55,margin:0,textWrap:'pretty',
                color: gold ? 'var(--text-body)' : 'var(--text-muted)'}}>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompareSection({ go }) {
  return (
    <section style={{background:'var(--surface-page)',padding:'clamp(84px,11vw,150px) var(--gutter-inline)',borderTop:'1px solid var(--border-hairline)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto'}}>
        <Reveal><div className="ub-overline">Why UniBridge</div><hr className="ub-rule" style={{width:56,margin:'12px 0 20px'}}/></Reveal>
        <Reveal delay={80}>
          <h2 style={{fontSize:'clamp(28px,3.4vw,46px)',letterSpacing:'-.025em',maxWidth:'22ch',margin:'0 0 var(--space-4)'}}>The same move, three very different ways to make it</h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'52ch',margin:'0 0 var(--space-10)'}}>
            One country, a price fixed before we start, and a route built for your profile rather than pulled off a shelf.
          </p>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:'var(--space-5)',alignItems:'stretch'}}>
          {UB_COMPARE.map((c,i)=>(
            <Reveal key={c.k} delay={i*110} style={{height:'100%'}}>
              <CompareColumn c={c}/>
            </Reveal>
          ))}
        </div>
        <Reveal delay={260}>
          <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'var(--space-4)',marginTop:'var(--space-10)'}}>
            <Magnetic><Button onClick={()=>go('call')} iconLeft={<Icon name="video" size={16}/>} style={{whiteSpace:'nowrap'}}>Get your fixed price</Button></Magnetic>
            <span style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>Nothing is charged until you accept a plan.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomeScreen({ go }) {
  const y = useScrollY();
  const heroFade = Math.max(0, 1 - Math.max(0, y - 140) / 480);
  const heroLift = Math.min(90, Math.max(0, y - 140) * 0.22);
  const heroScale = 1 + Math.min(0.05, Math.max(0, y - 140) * 0.00012);

  return (
    <main style={{overflowX:'clip'}}>

      {/* ── Hero ── */}
      <section style={{position:'relative',minHeight:'min(92vh, 780px)',background:'var(--ink-900)',color:'var(--cream-200)',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <div aria-hidden="true" className="ub-aurora" style={{position:'absolute',inset:'-20%',pointerEvents:'none'}}/>
        <div aria-hidden="true" style={{position:'absolute',inset:0,background:'radial-gradient(120% 80% at 50% 0%, rgba(184,124,70,.20) 0%, rgba(46,21,4,0) 62%)',pointerEvents:'none'}}/>
        <div style={{position:'relative',maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(88px,11vh,140px) var(--gutter-inline) clamp(72px,9vh,120px)',textAlign:'center',width:'100%',opacity:heroFade,transform:`translate3d(0,${-heroLift}px,0) scale(${heroScale})`}}>
          <Rise delay={60}>
            <span style={{display:'inline-flex',alignItems:'center',gap:8,border:'1px solid rgba(214,168,119,.45)',borderRadius:'var(--radius-pill)',padding:'6px 16px',fontSize:'var(--text-caption)',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color:'var(--gold-300)'}}>
              <span className="ub-pulse" style={{width:6,height:6,borderRadius:999,background:'var(--gold-300)'}}/>September 2027 intake open
            </span>
          </Rise>
          <h1 className="ub-sheen" style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:'clamp(46px,8.2vw,118px)',lineHeight:.98,letterSpacing:'-.035em',color:'var(--cream-100)',margin:'clamp(20px,3vh,32px) auto clamp(16px,2.5vh,24px)',maxWidth:'15ch'}}>
            <RevealWords text="Your bridge to Dutch student life" delay={140} onMount/>
          </h1>
          <Rise delay={440}>
            <p style={{fontSize:'clamp(17px,1.6vw,22px)',lineHeight:1.5,color:'var(--ink-100)',maxWidth:'52ch',margin:'0 auto'}}>
              You handle the studying. We handle enrolment, your residence permit and the first week, with one advisor who answers the phone.
            </p>
          </Rise>
          <Rise delay={600}>
            <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-3)',justifyContent:'center',marginTop:'clamp(24px,4vh,40px)'}}>
              <Magnetic><Button size="lg" onClick={()=>go('apply')} style={{whiteSpace:'nowrap'}}>Start my application</Button></Magnetic>
              <Magnetic><Button size="lg" variant="ghost" onClick={()=>go('call')} iconLeft={<Icon name="video" size={17}/>} style={{color:'var(--cream-200)',border:'1px solid rgba(251,244,236,.3)',whiteSpace:'nowrap'}}>Book a free 15-min call</Button></Magnetic>
            </div>
          </Rise>
        </div>
        <div style={{position:'absolute',bottom:26,left:'50%',transform:'translateX(-50%)',opacity:heroFade}}>
          <span className="ub-scrollhint" style={{display:'block',width:22,height:34,border:'1px solid rgba(251,244,236,.35)',borderRadius:999}}/>
        </div>
      </section>

      {/* ── Logo marquee ── */}
      <section style={{background:'var(--ink-900)',padding:'clamp(28px,4vw,44px) 0',borderTop:'1px solid rgba(251,244,236,.09)'}}>
        <div style={{textAlign:'center',marginBottom:'var(--space-6)'}}>
          <span className="ub-overline" style={{color:'rgba(251,244,236,.42)'}}>16 partner universities</span>
        </div>
        <Marquee items={UNI_LOGOS} speed={54} height={58} render={([name,domain])=>(
          <span title={domain} style={{display:'flex',alignItems:'center',gap:12,padding:'0 6px',opacity:.6,transition:'opacity 400ms var(--ease-standard)'}}
            onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.6}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--gold-500)',flex:'0 0 6px'}}/>
            <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,
              fontSize:20,letterSpacing:'-.01em',color:'var(--cream-100)',whiteSpace:'nowrap'}}>{name}</span>
          </span>
        )}/>
      </section>

      {/* ── Statement ── */}
      <section style={{padding:'clamp(96px,14vw,180px) var(--gutter-inline)',maxWidth:1100,margin:'0 auto',textAlign:'center'}}>
        <Reveal>
          <p style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:'clamp(28px,4.4vw,60px)',lineHeight:1.14,letterSpacing:'-.028em',color:'var(--text-heading)',margin:0}}>
            Moving countries is thirty small deadlines wearing one big coat.
            <span style={{color:'var(--ink-200)'}}> We keep every one of them.</span>
          </p>
        </Reveal>
      </section>

      {/* ── Scroll-scrubbed journey ── */}
      <JourneyScene/>

      {/* ── Services ── */}
      <section style={{padding:'clamp(84px,11vw,150px) var(--gutter-inline)',maxWidth:'var(--content-max)',margin:'0 auto'}}>
        <Reveal><div className="ub-overline">What we do</div><hr className="ub-rule" style={{width:56,margin:'12px 0 20px'}}/></Reveal>
        <Reveal delay={80}><h2 style={{fontSize:'clamp(28px,3.4vw,46px)',letterSpacing:'-.025em',maxWidth:'20ch',marginBottom:'var(--space-10)'}}>Everything between an offer letter and your first lecture</h2></Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'var(--space-5)'}}>
          {SERVICES.map(([icon,t,d],i)=>(
            <Reveal key={t} delay={i*90} style={{height:'100%'}}>
              <Tilt>
                <Card interactive onClick={()=>go('services')} padding="var(--space-8)" style={{height:'100%'}}>
                  <span style={{display:'inline-flex',width:48,height:48,borderRadius:'var(--radius-md)',background:'var(--surface-accent-soft)',color:'var(--gold-700)',alignItems:'center',justifyContent:'center'}}><Icon name={icon} size={23}/></span>
                  <h3 style={{fontSize:'var(--text-h4)',margin:'var(--space-5) 0 var(--space-2)'}}>{t}</h3>
                  <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:0}}>{d}</p>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Why UniBridge (comparison) ── */}
      <CompareSection go={go}/>

      {/* ── Dashboard panel ── */}
      <section style={{background:'var(--ink-900)',color:'var(--cream-200)',padding:'clamp(80px,11vw,150px) var(--gutter-inline)'}}>
        <div style={{maxWidth:'var(--content-max)',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'clamp(40px,6vw,88px)',alignItems:'center'}}>
          <div>
            <Reveal><span className="ub-overline" style={{color:'var(--gold-300)'}}>Your dashboard</span></Reveal>
            <Reveal delay={90}><h2 style={{color:'var(--cream-100)',fontSize:'clamp(28px,3.6vw,50px)',letterSpacing:'-.028em',lineHeight:1.08,margin:'var(--space-4) 0 var(--space-5)',maxWidth:'16ch'}}>Every date, document and decision in one place</h2></Reveal>
            <Reveal delay={180}><p style={{color:'var(--ink-100)',fontSize:'var(--text-body-lg)',maxWidth:'44ch'}}>No inbox archaeology. You always know what is done, what is with us, and what needs you today.</p></Reveal>
            <Reveal delay={260}>
              <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-8)',marginTop:'var(--space-10)'}}>
                {[[16,"partner universities"],[13,"cities in the Netherlands"],[1,"advisor, start to arrival"]].map(([n,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:42,lineHeight:1,color:'var(--gold-300)'}}><Counter to={n}/></div>
                    <div style={{fontSize:'var(--text-caption)',color:'var(--ink-100)',marginTop:6}}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={200} y={44}>
            <Tilt max={5}>
              <Card elevation="lg" padding="var(--space-6)">
                <div className="ub-overline">Your checklist</div>
                <Stepper orientation="vertical" current={2} style={{marginTop:'var(--space-4)'}} steps={[{label:"Profile",meta:"Complete"},{label:"University choice",meta:"UvA, Utrecht"},{label:"Documents",meta:"3 of 5 uploaded"},{label:"Housing",meta:"Partner shortlist"},{label:"Arrival",meta:"August 2027"}]}/>
              </Card>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ── Three steps ── */}
      <section style={{padding:'clamp(84px,11vw,150px) var(--gutter-inline)',maxWidth:'var(--content-max)',margin:'0 auto'}}>
        <Reveal><div className="ub-overline">How it works</div><hr className="ub-rule" style={{width:56,margin:'12px 0 20px'}}/></Reveal>
        <Reveal delay={80}><h2 style={{fontSize:'clamp(28px,3.4vw,46px)',letterSpacing:'-.025em',marginBottom:'var(--space-12)'}}>Three steps, twelve weeks</h2></Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'clamp(32px,4vw,56px)'}}>
          {[["01","Tell us your plan","Fifteen minutes. Study level, field, budget, cities you'd live in."],["02","We build your route","A shortlist you'll actually get into, with dates and costs written out."],["03","You arrive settled","Keys, bank card, BSN appointment and a bike in your arrival week."]].map(([n,t,d],i)=>(
            <Reveal key={n} delay={i*120}>
              <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:'clamp(44px,5vw,68px)',color:'var(--gold-300)',lineHeight:1,letterSpacing:'-.035em'}}>{n}</div>
              <hr className="ub-rule" style={{width:40,margin:'var(--space-5) 0'}}/>
              <h3 style={{fontSize:'var(--text-h4)'}}>{t}</h3>
              <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{background:'var(--surface-page)',padding:'clamp(80px,11vw,150px) var(--gutter-inline)'}}>
        <div style={{maxWidth:'var(--content-max)',margin:'0 auto'}}>
          <Reveal><h2 style={{fontSize:'clamp(28px,3.4vw,46px)',letterSpacing:'-.025em',marginBottom:'var(--space-10)'}}>What it felt like on the other side</h2></Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'var(--space-5)'}}>
            {[["Amara O.","University of Amsterdam","I landed on a Tuesday and had my BSN appointment on the Thursday. Nothing was left to figure out at the airport."],["Diego F.","Utrecht University, MSc Data Science","They talked me out of two universities I would have wasted money applying to. That advice paid for the whole service."],["Nour H.","VU Amsterdam, BSc Architecture","Housing was the part I was scared of. Their partner agency found the room and UniBridge read the contract before I signed."]].map(([n,s,q],i)=>(
              <Reveal key={n} delay={i*110} style={{height:'100%'}}>
                <Tilt max={5}>
                  <Card rule padding="var(--space-8)" style={{height:'100%'}}>
                    <p style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontSize:'var(--text-h4)',lineHeight:1.45,color:'var(--text-heading)'}}>{q}</p>
                    <div style={{display:'flex',alignItems:'center',gap:12,marginTop:'var(--space-6)'}}>
                      <div style={{width:38,height:38,borderRadius:999,background:'var(--surface-tertiary-soft)',color:'var(--moss-700)',display:'flex',alignItems:'center',justifyContent:'center',font:'700 14px var(--font-sans)'}}>{n[0]}</div>
                      <div><div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{n}</div><div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>{s}</div></div>
                    </div>
                  </Card>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'clamp(60px,8vw,110px) var(--gutter-inline)'}}>
        <Reveal y={36}>
          <Card tone="ink" padding="clamp(40px,6vw,80px)" style={{borderRadius:'var(--radius-2xl)',textAlign:'center',position:'relative',overflow:'hidden'}}>
            <div aria-hidden="true" style={{position:'absolute',inset:0,background:'radial-gradient(90% 120% at 50% 0%, rgba(184,124,70,.22), transparent 60%)'}}/>
            <div style={{position:'relative'}}>
              <h2 style={{color:'var(--cream-100)',fontSize:'clamp(28px,3.8vw,52px)',letterSpacing:'-.028em',lineHeight:1.08,maxWidth:'18ch',margin:'0 auto var(--space-4)'}}>Applications for September close on 1 May</h2>
              <p style={{color:'var(--ink-100)',fontSize:'var(--text-body-lg)',maxWidth:'46ch',margin:'0 auto var(--space-8)'}}>Start now and we'll map your route this week. Nothing is charged until you accept a plan.</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-3)',justifyContent:'center'}}>
                <Magnetic><Button size="lg" onClick={()=>go('apply')} style={{whiteSpace:'nowrap'}}>Start my application</Button></Magnetic>
                <Magnetic><Button size="lg" variant="ghost" onClick={()=>go('universities')} style={{color:'var(--cream-200)',border:'1px solid rgba(251,244,236,.3)',whiteSpace:'nowrap'}}>See universities</Button></Magnetic>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
Object.assign(window, { HomeScreen, JourneyScene, CompareSection });
