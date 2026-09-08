const { Button, Card, Logo, Icon, Tag } = window.UnibridgeNLDesignSystem_3cb2d1;

function useIsMobile(breakpoint) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update); else mq.addListener(update);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', update); else mq.removeListener(update); };
  }, [breakpoint]);
  return isMobile;
}

function SiteHeader({ route, go }) {
  const nav = [["home","How it works"],["universities","Universities"],["quiz","Find my field"],["services","Services"],["apply","Apply"]];
  const isMobile = useIsMobile(860);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = (target) => { setMenuOpen(false); go(target); };

  return (
    <header style={{position:'sticky',top:0,zIndex:20,background:'rgba(251,244,236,.92)',backdropFilter:'blur(10px)',borderBottom:'1px solid var(--border-hairline)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'14px var(--gutter-inline)',display:'flex',alignItems:'center',gap:'var(--space-6)'}}>
        <div onClick={()=>navigate('home')} style={{display:'flex',alignItems:'center',gap:12,cursor:'pointer',flex:'0 0 auto'}}>
          <img src="/assets/logo-badge.jpg" alt="UniBridge NL" style={{width:40,height:40,borderRadius:999}}/>
          <Logo size={26}/>
        </div>

        {!isMobile && (
          <nav style={{display:'flex',gap:'var(--space-6)',marginLeft:'auto'}}>
            {nav.map(([k,l])=>(
              <a key={k} onClick={()=>go(k)} style={{cursor:'pointer',fontSize:'var(--text-body-sm)',fontWeight:route===k?700:500,color:route===k?'var(--text-heading)':'var(--text-muted)',textDecoration:'none',whiteSpace:'nowrap',paddingBottom:2,borderBottom:'2px solid '+(route===k?'var(--gold-500)':'transparent')}}>{l}</a>
            ))}
          </nav>
        )}
        {!isMobile && <Button size="sm" variant="secondary" onClick={()=>go('call')}>Free 15-min call</Button>}
        {!isMobile && <Button size="sm" onClick={()=>go('apply')}>Start free</Button>}

        {isMobile && (
          <button onClick={()=>setMenuOpen(o=>!o)} aria-label="Menu" style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',padding:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Icon name={menuOpen ? 'x' : 'menu'} size={24} color="var(--text-heading)"/>
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',padding:'var(--space-2) var(--gutter-inline) var(--space-6)',borderTop:'1px solid var(--border-hairline)',background:'var(--surface-page)'}}>
          {nav.map(([k,l])=>(
            <a key={k} onClick={()=>navigate(k)} style={{cursor:'pointer',fontSize:'var(--text-body)',fontWeight:route===k?700:500,color:route===k?'var(--text-heading)':'var(--text-body)',textDecoration:'none',padding:'var(--space-2) 0'}}>{l}</a>
          ))}
          <Button variant="secondary" full onClick={()=>navigate('call')}>Free 15-min call</Button>
          <Button full onClick={()=>navigate('apply')}>Start free</Button>
        </div>
      )}
    </header>
  );
}

function SiteFooter({ go }) {
  const cols = [
    ["Programmes", [["Bachelor","universities"],["Master","universities"],["Exchange","universities"],["Foundation year","universities"]]],
    ["Services", [["Enrolment","services"],["Housing","services"],["Visa & BSN","services"],["Bank & insurance","services"]]],
    ["Company", [["About","home"],["Partner universities","universities"],["Contact","call"],["Privacy","privacy"]]]
  ];
  return (
    <footer style={{background:'var(--surface-inverse)',color:'var(--text-on-inverse)',marginTop:'var(--section-y)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-16) var(--gutter-inline) var(--space-10)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'var(--space-10)'}}>
        <div style={{gridColumn:'1 / -1',maxWidth:420}}>
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
              {items.map(([label,target])=><a key={label} onClick={()=>go(target)} style={{cursor:'pointer',fontSize:'var(--text-body-sm)',color:'var(--cream-200)',textDecoration:'none'}}>{label}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-5) var(--gutter-inline)',borderTop:'1px solid rgba(251,244,236,.14)',display:'flex',flexWrap:'wrap',gap:'var(--space-2) var(--space-6)',justifyContent:'space-between',fontSize:'var(--text-caption)',color:'var(--ink-200)'}}>
        <span>© 2026 UniBridge NL · Amsterdam, KvK 42087386</span><span>Made for students, not for paperwork.</span>
      </div>
    </footer>
  );
}

function Section({ overline, title, lead, children, tone }) {
  return (
    <section style={{background:tone==='cream'?'var(--surface-page)':'transparent',padding:'var(--section-y) 0'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
        {overline && <div className="ub-overline">{overline}</div>}
        {overline && <hr className="ub-rule" style={{width:56,margin:'12px 0 16px'}}/>}
        {title && <h2 style={{fontSize:'var(--text-h2)',maxWidth:'24ch'}}>{title}</h2>}
        {lead && <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'62ch'}}>{lead}</p>}
        <div style={{marginTop:'var(--space-10)'}}>{children}</div>
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

function TrustPanel() {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
      <Card rule>
        <p style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontSize:'var(--text-h4)',lineHeight:1.45,color:'var(--text-heading)'}}>They talked me out of two universities I would have wasted money applying to. That advice paid for the whole service.</p>
        <div style={{display:'flex',alignItems:'center',gap:12,marginTop:'var(--space-5)'}}>
          <div style={{width:38,height:38,borderRadius:999,background:'var(--surface-tertiary-soft)',color:'var(--moss-700)',display:'flex',alignItems:'center',justifyContent:'center',font:'700 14px var(--font-sans)'}}>D</div>
          <div><div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>Diego F.</div><div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>Utrecht University, MSc Data Science</div></div>
        </div>
      </Card>
      <Card tone="sunken" elevation="none">
        <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>Why students choose us</div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {[["shield-check","No commission from universities or landlords"],["message-circle","One advisor, start to finish"],["house","Licensed housing partner, not random listings"]].map(([icon,text])=>(
            <div key={text} style={{display:'flex',gap:10,fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}>
              <Icon name={icon} size={16} color="var(--moss-500)" style={{marginTop:2,flex:'0 0 auto'}}/>{text}
            </div>
          ))}
        </div>
      </Card>
      <div style={{display:'flex',gap:'var(--space-6)',padding:'0 var(--space-2)'}}>
        {[["16","partner universities"],["13","cities"]].map(([n,l])=>(
          <div key={l}><div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:26,color:'var(--text-heading)'}}>{n}</div><div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>{l}</div></div>
        ))}
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

Object.assign(window, { SiteHeader, SiteFooter, Section, Placeholder, CookieBanner, TrustPanel });
