const { Button, Logo, Icon, Tag } = window.UnibridgeNLDesignSystem_3cb2d1;

function SiteHeader({ route, go }) {
  const nav = [["home","How it works"],["universities","Universities"],["services","Services"],["apply","Apply"]];
  return (
    <header style={{position:'sticky',top:0,zIndex:20,background:'rgba(251,244,236,.88)',backdropFilter:'blur(10px)',borderBottom:'1px solid var(--border-hairline)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'14px var(--gutter-inline)',display:'flex',alignItems:'center',gap:'var(--space-8)'}}>
        <div onClick={()=>go('home')} style={{display:'flex',alignItems:'center',gap:12,cursor:'pointer'}}>
          <img src="/assets/logo-badge.jpg" alt="UniBridge NL" style={{width:40,height:40,borderRadius:999}}/>
          <Logo size={26}/>
        </div>
        <nav style={{display:'flex',gap:'var(--space-6)',marginLeft:'auto'}}>
          {nav.map(([k,l])=>(
            <a key={k} onClick={()=>go(k)} style={{cursor:'pointer',fontSize:'var(--text-body-sm)',fontWeight:route===k?700:500,color:route===k?'var(--text-heading)':'var(--text-muted)',textDecoration:'none',paddingBottom:2,borderBottom:'2px solid '+(route===k?'var(--gold-500)':'transparent')}}>{l}</a>
          ))}
        </nav>
        <Button size="sm" variant="secondary" onClick={()=>go('call')}>Free 15-min call</Button>
        <Button size="sm" onClick={()=>go('apply')}>Start free</Button>
      </div>
    </header>
  );
}

function SiteFooter({ go }) {
  const cols = [["Programmes",["Bachelor","Master","Exchange","Foundation year"]],["Services",["Enrolment","Housing","Visa & BSN","Bank & insurance"]],["Company",["About","Partner universities","Contact","Privacy"]]];
  return (
    <footer style={{background:'var(--surface-inverse)',color:'var(--text-on-inverse)',marginTop:'var(--section-y)'}}>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-16) var(--gutter-inline) var(--space-10)',display:'grid',gridTemplateColumns:'1.4fr 1fr 1fr 1fr',gap:'var(--space-10)'}}>
        <div>
          <Logo size={28} tone="cream"/>
          <p style={{marginTop:'var(--space-4)',fontSize:'var(--text-body-sm)',color:'var(--ink-100)',maxWidth:'32ch'}}>Your bridge to student life in the Netherlands — enrolment, housing and arrival, handled in one place.</p>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:'var(--space-5)'}}>
            <a href="mailto:unibridgenl@gmail.com" style={{display:'inline-flex',alignItems:'center',gap:10,fontSize:'var(--text-body-sm)',color:'var(--cream-200)',textDecoration:'none'}}><Icon name="mail" size={17} color="var(--gold-300)"/>unibridgenl@gmail.com</a>
            <a href="https://wa.me/31625294080" style={{display:'inline-flex',alignItems:'center',gap:10,fontSize:'var(--text-body-sm)',color:'var(--cream-200)',textDecoration:'none'}}><Icon name="message-circle" size={17} color="var(--gold-300)"/>WhatsApp 06 25 29 40 80</a>
          </div>
        </div>
        {cols.map(([t,items])=>(
          <div key={t}>
            <div style={{font:'700 12px/1 var(--font-sans)',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--gold-300)',marginBottom:'var(--space-4)'}}>{t}</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {items.map(i=><a key={i} onClick={()=>go('services')} style={{cursor:'pointer',fontSize:'var(--text-body-sm)',color:'var(--cream-200)',textDecoration:'none'}}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-5) var(--gutter-inline)',borderTop:'1px solid rgba(251,244,236,.14)',display:'flex',justifyContent:'space-between',fontSize:'var(--text-caption)',color:'var(--ink-200)'}}>
        <span>© 2026 UniBridge NL · Amsterdam, KvK 90210345</span><span>Made for students, not for paperwork.</span>
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

Object.assign(window, { SiteHeader, SiteFooter, Section, Placeholder });
