const { Button, Logo, Icon, Tag } = window.UnibridgeNLDesignSystem_3cb2d1;

function SiteHeader({ route, go }) {
  const _list = (typeof useStudyList === 'function') ? useStudyList() : [];
  const listCount = _list.length;
  const nav = [["home","How it works"],["universities","Universities"],["services","Services"],["guide","Handbook"],["quiz","Find my field"],["about","About us"]];
  const y = useScrollY();
  const overHero = route === 'home' && y < 70;
  const fg = overHero ? 'var(--cream-200)' : 'var(--text-muted)';
  return (
    <header style={{position:'fixed',top:0,left:0,right:0,zIndex:30,
      background: overHero ? 'transparent' : 'rgba(251,244,236,.82)',
      backdropFilter: overHero ? 'none' : 'saturate(150%) blur(16px)',
      WebkitBackdropFilter: overHero ? 'none' : 'saturate(150%) blur(16px)',
      borderBottom:'1px solid ' + (overHero ? 'transparent' : 'var(--border-hairline)'),
      transition:'background-color 400ms var(--ease-standard), border-color 400ms var(--ease-standard)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'14px var(--gutter-inline)',display:'flex',alignItems:'center',gap:'clamp(10px,2vw,28px)',flexWrap:'nowrap'}}>
        <div onClick={()=>go('home')} style={{display:'flex',alignItems:'center',gap:12,cursor:'pointer'}}>
          <img src="/assets/logo-badge.jpg" alt="UniBridge NL" style={{width:40,height:40,borderRadius:999}}/>
          <span className="ub-wordmark"><Logo size={26} tone={overHero ? 'cream' : 'ink'}/></span>
        </div>
        <nav className="ub-nav" style={{display:'flex',flexWrap:'nowrap',gap:'clamp(10px,1.6vw,22px)',marginLeft:'auto',minWidth:0}}>
          {nav.map(([k,l])=>{
            const on = route===k;
            return (
            <a key={k} onClick={()=>go(k)} className="ub-navlink" style={{position:'relative',cursor:'pointer',fontSize:'var(--text-body-sm)',fontWeight:on?700:500,color:on?(overHero?'var(--cream-100)':'var(--text-heading)'):fg,textDecoration:'none',paddingBottom:4,transition:'color 400ms var(--ease-standard)'}}>
              {l}
              <span aria-hidden="true" style={{position:'absolute',left:0,right:0,bottom:0,height:2,borderRadius:2,background:'var(--gold-500)',transformOrigin:'left center',transform:`scaleX(${on?1:0})`,transition:'transform 460ms var(--ease-out)'}}/>
            </a>);
          })}
        </nav>
        <button onClick={()=>go('mylist')} aria-label="My list" title="My study list" style={{position:'relative',display:'inline-flex',alignItems:'center',gap:6,cursor:'pointer',background:'none',border:'1px solid '+(overHero?'rgba(251,244,236,.35)':'var(--border-default)'),borderRadius:'var(--radius-pill)',padding:'7px 12px',color:overHero?'var(--cream-200)':'var(--text-heading)',font:'600 var(--text-body-sm) var(--font-sans)',whiteSpace:'nowrap',transition:'color 400ms var(--ease-standard), border-color 400ms var(--ease-standard)'}}>
          <Icon name="graduation-cap" size={16}/>
          <span className="ub-wordmark">List</span>
          {listCount > 0 && <span style={{minWidth:18,height:18,padding:'0 5px',borderRadius:999,background:'var(--gold-500)',color:'var(--cream-100)',font:'700 11px/18px var(--font-sans)',textAlign:'center'}}>{listCount}</span>}
        </button>
        <span className="ub-navcall"><Button size="sm" variant={overHero ? 'ghost' : 'secondary'} onClick={()=>go('call')} style={overHero?{color:'var(--cream-200)',border:'1px solid rgba(251,244,236,.35)',whiteSpace:'nowrap'}:{whiteSpace:'nowrap'}}>Free 15-min call</Button></span>
        <Magnetic strength={0.16}><Button size="sm" onClick={()=>go('apply')} style={{whiteSpace:'nowrap'}}>Start free</Button></Magnetic>
      </div>
    </header>
  );
}

/** Reserves the fixed header's height on routes that don't run content underneath it. */
function HeaderSpacer() { return <div style={{height:69}}/>; }

function SiteFooter({ go }) {
  const cols = [
    ["Programmes",[["Bachelor","universities"],["Master","universities"],["Find my field","quiz"],["My study list","mylist"]]],
    ["Services",[["Enrolment","services"],["Housing","services"],["Visa & BSN","services"],["Plans & pricing","services"],["Student handbook, €15","guide"]]],
    ["Company",[["About us","about"],["Partner universities","universities"],["Contact","contact"],["Privacy statement","privacy"]]]
  ];
  return (
    <footer style={{background:'var(--surface-inverse)',color:'var(--text-on-inverse)',marginTop:'var(--section-y)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-16) var(--gutter-inline) var(--space-10)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'var(--space-10)'}}>
        <div>
          <Logo size={28} tone="cream"/>
          <p style={{marginTop:'var(--space-4)',fontSize:'var(--text-body-sm)',color:'var(--ink-100)',maxWidth:'32ch'}}>Your bridge to student life in the Netherlands. Enrolment, housing and arrival, handled in one place.</p>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:'var(--space-5)'}}>
            <a href="mailto:unibridgenl@gmail.com" style={{display:'inline-flex',alignItems:'center',gap:10,fontSize:'var(--text-body-sm)',color:'var(--cream-200)',textDecoration:'none'}}><Icon name="mail" size={17} color="var(--gold-300)"/>unibridgenl@gmail.com</a>
            <a href="https://wa.me/31625294080" style={{display:'inline-flex',alignItems:'center',gap:10,fontSize:'var(--text-body-sm)',color:'var(--cream-200)',textDecoration:'none'}}><Icon name="message-circle" size={17} color="var(--gold-300)"/>WhatsApp 06 25 29 40 80</a>
          </div>
        </div>
        {cols.map(([t,items])=>(
          <div key={t}>
            <div style={{font:'700 12px/1 var(--font-sans)',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--gold-300)',marginBottom:'var(--space-4)'}}>{t}</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {items.map(([i,r])=><a key={i} onClick={()=>go(r)} className="ub-footlink" style={{cursor:'pointer',fontSize:'var(--text-body-sm)',color:'var(--cream-200)',textDecoration:'none',transition:'color 300ms var(--ease-standard), transform 300ms var(--ease-out)',display:'inline-block'}}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-5) var(--gutter-inline)',borderTop:'1px solid rgba(251,244,236,.14)',display:'flex',justifyContent:'space-between',fontSize:'var(--text-caption)',color:'var(--ink-200)'}}>
        <span>© 2026 UniBridge NL · Amsterdam, KvK 42087386</span><span>Made for students, not for paperwork.</span>
      </div>
    </footer>
  );
}

function Section({ overline, title, lead, children, tone }) {
  return (
    <section style={{background:tone==='cream'?'var(--surface-page)':'transparent',padding:'var(--section-y) 0'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
        <Reveal>
          {overline && <div className="ub-overline">{overline}</div>}
          {overline && <hr className="ub-rule" style={{width:56,margin:'12px 0 16px'}}/>}
          {title && <h2 style={{fontSize:'clamp(26px,3.2vw,42px)',letterSpacing:'-.02em',maxWidth:'24ch'}}>{title}</h2>}
          {lead && <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'62ch'}}>{lead}</p>}
        </Reveal>
        <Reveal delay={120}><div style={{marginTop:'var(--space-10)'}}>{children}</div></Reveal>
      </div>
    </section>
  );
}

function Placeholder({ label = "Photo", ratio = "4 / 3", style }) {
  return (
    <div style={{aspectRatio:ratio,background:'var(--surface-sunken)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-media)',display:'flex',alignItems:'center',justifyContent:'center',...style}}>
      <span style={{font:'700 11px/1 var(--font-sans)',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--text-subtle)'}}>{label}</span>
    </div>
  );
}

/** The handbook cover, drawn rather than photographed so it stays sharp at any size.
    `width` drives every measurement, so the whole thing scales proportionally. */
function HandbookCover({ width = 280, style }) {
  const w = width;
  return (
    <div style={{width:'100%',maxWidth:w,margin:'0 auto',aspectRatio:'210 / 297',position:'relative',overflow:'hidden',
      borderRadius:'var(--radius-lg)',background:'var(--ink-900)',color:'var(--cream-200)',boxShadow:'var(--shadow-lg)',
      display:'flex',flexDirection:'column',justifyContent:'space-between',padding:w*0.095,...style}}>
      <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',
        background:'radial-gradient(80% 60% at 12% 18%, rgba(184,124,70,.34), transparent 62%), radial-gradient(70% 55% at 92% 96%, rgba(193,97,63,.26), transparent 64%)'}}/>
      <div aria-hidden="true" style={{position:'absolute',left:0,top:0,bottom:0,width:Math.max(3,w*0.016),
        background:'linear-gradient(90deg, rgba(251,244,236,.20), rgba(251,244,236,0))',pointerEvents:'none'}}/>

      <div style={{position:'relative',display:'flex',alignItems:'center',gap:w*0.035}}>
        <img src="/assets/logo-badge.jpg" alt="" style={{width:w*0.11,height:w*0.11,borderRadius:999,display:'block'}}/>
        <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,
          fontSize:w*0.058,color:'var(--cream-200)',lineHeight:1}}>UniBridge NL</span>
      </div>

      <div style={{position:'relative'}}>
        <div style={{fontSize:Math.max(7,w*0.034),fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',
          color:'var(--gold-300)',marginBottom:w*0.04}}>2026 / 27 edition</div>
        <div style={{height:Math.max(2,w*0.008),width:w*0.24,background:'var(--gold-500)',marginBottom:w*0.055}}/>
        <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,
          fontSize:w*0.142,lineHeight:1.05,color:'var(--cream-100)',letterSpacing:'-.02em'}}>
          The Netherlands<br/>
          <em style={{fontStyle:'italic',fontWeight:500,color:'var(--gold-300)'}}>Student</em> Handbook
        </div>
      </div>

      <div style={{position:'relative',borderTop:'1px solid rgba(251,244,236,.22)',paddingTop:w*0.035,
        fontSize:Math.max(7,w*0.036),color:'var(--ink-100)',display:'flex',justifyContent:'space-between',gap:8}}>
        <span>unibridgenl.com</span><span>Amsterdam</span>
      </div>
    </div>
  );
}

function CookieBanner({ go }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    try { if (!localStorage.getItem('ub_cookie_choice')) setVisible(true); } catch(e) { setVisible(true); }
  }, []);
  const choose = (value) => {
    try { localStorage.setItem('ub_cookie_choice', value); } catch(e) {}
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div style={{position:'fixed',left:0,right:0,bottom:0,zIndex:60,background:'var(--surface-inverse)',color:'var(--text-on-inverse)',borderTop:'1px solid rgba(251,244,236,.14)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-5) var(--gutter-inline)',display:'flex',alignItems:'center',gap:'var(--space-6)',flexWrap:'wrap'}}>
        <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--ink-100)',flex:'1 1 260px'}}>We use cookies for essential site functions. See our <a onClick={()=>go && go('privacy')} style={{color:'var(--gold-300)',cursor:'pointer',textDecoration:'underline'}}>privacy statement</a> for details. You can accept all cookies or continue with only the essential ones.</p>
        <div style={{display:'flex',gap:'var(--space-3)',flex:'0 0 auto'}}>
          <Button size="sm" variant="ghost" style={{color:'var(--cream-200)'}} onClick={()=>choose('essential')}>Essential only</Button>
          <Button size="sm" onClick={()=>choose('all')}>Accept all</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SiteHeader, HeaderSpacer, SiteFooter, Section, Placeholder, CookieBanner, HandbookCover });
