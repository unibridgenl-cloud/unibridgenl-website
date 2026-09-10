const { Card, Icon, Badge, Button } = window.UnibridgeNLDesignSystem_3cb2d1;

const VALUES = [
  ["shield-check","We say no when the answer is no","If your grades don't clear a university's bar, we tell you before you pay. No commission from universities means nothing pushes us to oversell."],
  ["file-text","Everything in writing","One fee, fixed before you pay. Every deadline, every document, every cost written down where you can read it back."],
  ["message-circle","One advisor, not a call centre","The person on your first call is the person who files your application and answers your WhatsApp in August."]
];

function AboutScreen({ go }) {
  return (
    <main>
      <div style={{background:'var(--surface-inverse)',color:'var(--text-on-inverse)',padding:'var(--space-16) 0'}}>
        <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
          <div className="ub-overline" style={{color:'var(--gold-300)'}}>About us</div>
          <h1 style={{color:'var(--cream-100)',fontSize:'var(--text-h1)',margin:'var(--space-3) 0 var(--space-3)',maxWidth:'22ch'}}>We built the service we needed as students</h1>
          <p style={{color:'var(--ink-100)',fontSize:'var(--text-body-lg)',margin:'0 0 var(--space-5)',maxWidth:'56ch'}}>UniBridge NL is a small Amsterdam team that walks international students from a first question to a room, a student number and a residence permit, without the guesswork.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-6)'}}>
            {[["map-pin","Amsterdam, the Netherlands"],["file-text","KvK 42087386"],["graduation-cap","16 partner universities"]].map(([i,t])=>(
              <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)',color:'var(--cream-200)'}}><Icon name={i} size={16} color="var(--gold-300)"/>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <Reveal>
      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-16) var(--gutter-inline) 0',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'var(--space-10)',alignItems:'center'}}>
        <div>
          <div className="ub-overline">Why we exist</div>
          <hr className="ub-rule" style={{width:56,margin:'12px 0 18px'}}/>
          <h2 style={{fontSize:'var(--text-h2)',margin:'0 0 var(--space-4)',maxWidth:'22ch'}}>Moving countries is thirty small deadlines</h2>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',margin:'0 0 var(--space-4)'}}>Every year, students with the grades to study here lose their place to a missing translation, a deposit paid to the wrong account, or a permit filed a week late.</p>
          <p style={{color:'var(--text-body)',margin:0}}>We keep the list, file two weeks ahead of every university deadline, and stay reachable in the weeks where it actually matters, the ones between an offer letter and your first lecture.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'var(--space-4)'}}>
          {[["16","partner universities"],["13","cities in the Netherlands"],["5","university applications filed per student"],["1","advisor per student, start to finish"]].map(([n,l])=>(
            <Card key={l} padding="var(--space-5)">
              <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:36,lineHeight:1,color:'var(--gold-700)'}}>{n}</div>
              <div style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',marginTop:6}}>{l}</div>
            </Card>
          ))}
        </div>
      </section>
      </Reveal>

      <Section overline="How we work" title="Three rules we don't bend">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'var(--space-5)'}}>
          {VALUES.map(([ic,t,d],i)=>(
            <Reveal key={t} delay={i*0.1}>
            <Card padding="var(--space-6)" style={{height:'100%'}}>
              <span style={{display:'inline-flex',width:46,height:46,borderRadius:'var(--radius-md)',alignItems:'center',justifyContent:'center',background:'var(--surface-accent-soft)',color:'var(--gold-700)'}}><Icon name={ic} size={22}/></span>
              <h3 style={{margin:'var(--space-5) 0 8px',fontSize:'var(--text-h4)'}}>{t}</h3>
              <p style={{margin:0,color:'var(--text-muted)',fontSize:'var(--text-body-sm)',lineHeight:1.6}}>{d}</p>
            </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <section style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline) var(--space-20)'}}>
        <Reveal>
        <Card tone="ink" padding="var(--space-12)" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'var(--space-8)',alignItems:'center',borderRadius:'var(--radius-2xl)'}}>
          <div>
            <h2 style={{color:'var(--cream-100)',fontSize:'var(--text-h2)',margin:'0 0 var(--space-3)',maxWidth:'24ch'}}>Ask us anything, before you commit</h2>
            <p style={{color:'var(--ink-100)',margin:0,maxWidth:'46ch'}}>Fifteen minutes on Google Meet. No payment, no obligation, and often we tell people they don't need us.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)',alignItems:'flex-start'}}>
            <Button size="lg" onClick={()=>go('call')} iconLeft={<Icon name="video" size={17}/>}>Book a free 15-min call</Button>
            <Button size="lg" variant="ghost" style={{color:'var(--cream-200)'}} onClick={()=>go('contact')}>See all the ways to reach us</Button>
          </div>
        </Card>
        </Reveal>
      </section>
    </main>
  );
}
Object.assign(window, { AboutScreen });
