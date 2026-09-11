const { Card, Button, Icon, Badge, Tag, Alert } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Stagger, Magnetic } = window;

function MyListRow({ item }) {
  return (
    <Card style={{display:'flex',flexWrap:'wrap',gap:'var(--space-4)',alignItems:'flex-start'}}>
      <div style={{flex:'1 1 300px',minWidth:0}}>
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:8}}>
          <span style={{fontSize:'var(--text-body)',fontWeight:700,color:'var(--text-heading)'}}>{item.name}</span>
          {item.level && <Badge tone={item.level==='Bachelor'?'moss':'accent'}>{item.level}</Badge>}
        </div>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:6,fontSize:'var(--text-body-sm)',fontWeight:600,color:'var(--gold-700)'}}>
          <Icon name="map-pin" size={14}/>{item.uni}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'6px 14px',marginTop:8,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>
          {item.field && <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="graduation-cap" size={14}/>{item.field}</span>}
          {item.duration && <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="clock" size={14}/>{item.duration}</span>}
          {item.language && <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="languages" size={14}/>{item.language}</span>}
        </div>
        {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:'var(--space-3)',fontSize:'var(--text-body-sm)',color:'var(--text-link)',textDecoration:'none',fontWeight:600}}>View official course page<Icon name="arrow-right" size={14}/></a>}
      </div>
      <div style={{flex:'0 0 auto'}}>
        <Button size="sm" variant="ghost" onClick={()=>removeFromStudyList(item.id)} iconLeft={<Icon name="minus" size={15}/>} style={{color:'var(--clay-700)'}}>Remove</Button>
      </div>
    </Card>
  );
}

function MyListScreen({ go }) {
  const items = useStudyList();
  const byUni = React.useMemo(() => {
    const m = {};
    items.forEach(it => { (m[it.uni] = m[it.uni] || []).push(it); });
    return m;
  }, [items]);
  const unis = Object.keys(byUni);

  const emailList = () => {
    const lines = items.map(it => "- " + it.name + " (" + it.level + ") — " + it.uni + (it.url ? "\n  " + it.url : "")).join("\n");
    const subject = encodeURIComponent("My UniBridge NL study list");
    const body = encodeURIComponent("Hi UniBridge NL,\n\nHere are the university courses on my study list:\n\n" + lines + "\n\nI'd like help with these. Thanks!");
    window.location.href = "mailto:unibridgenl@gmail.com?subject=" + subject + "&body=" + body;
  };

  return (
    <main>
      <PageHero overline="My study list" tone="ink" title="Your university and course choices"
        lead="Every item is a specific course at a specific university. Review them, remove what no longer fits, and bring the list to your free call."/>

      <div style={{maxWidth:920,margin:'0 auto',padding:'var(--space-10) var(--gutter-inline) 0'}}>
        {items.length === 0 ? (
          <Reveal>
          <Card tone="sunken" elevation="none" padding="var(--space-10)" style={{textAlign:'center'}}>
            <div style={{width:56,height:56,margin:'0 auto var(--space-5)',borderRadius:999,background:'var(--surface-accent-soft)',color:'var(--gold-700)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Icon name="graduation-cap" size={26}/>
            </div>
            <h2 style={{fontSize:'var(--text-h3)',margin:'0 0 var(--space-2)'}}>Your list is empty for now</h2>
            <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'46ch',margin:'0 auto var(--space-6)'}}>Browse universities to add real programmes, or take the quiz and we'll recommend courses that fit you.</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-3)',justifyContent:'center'}}>
              <Magnetic strength={0.18}><Button onClick={()=>go('universities')} iconRight={<Icon name="arrow-right" size={16}/>}>Browse universities</Button></Magnetic>
              <Button variant="secondary" onClick={()=>go('quiz')}>Find my field</Button>
            </div>
          </Card>
          </Reveal>
        ) : (
          <div>
            <Reveal>
            <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-4)',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--space-6)'}}>
              <span style={{fontSize:'var(--text-body)',color:'var(--text-body)'}}>
                <strong style={{color:'var(--text-heading)'}}>{items.length}</strong> course{items.length!==1?'s':''} across <strong style={{color:'var(--text-heading)'}}>{unis.length}</strong> universit{unis.length!==1?'ies':'y'}
              </span>
              <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-3)'}}>
                <Button size="sm" variant="secondary" onClick={emailList} iconLeft={<Icon name="mail" size={15}/>}>Email my list to UniBridge</Button>
                <Button size="sm" variant="ghost" onClick={()=>{ if (window.confirm('Remove all courses from your study list?')) clearStudyList(); }} style={{color:'var(--clay-700)'}}>Clear all</Button>
              </div>
            </div>
            </Reveal>

            {unis.map((uni, ui) => (
              <div key={uni} style={{marginBottom:'var(--space-8)'}}>
                <Reveal delay={ui*40}>
                <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>{uni}</div>
                </Reveal>
                <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
                  {byUni[uni].map(it => <Reveal key={it.id} y={14}><MyListRow item={it}/></Reveal>)}
                </div>
              </div>
            ))}

            <Reveal>
            <Alert tone="info" title="Before you apply" style={{marginTop:'var(--space-4)'}}>
              Course availability, tuition, admission requirements and deadlines change each intake. Always confirm the current details on each official course page before you apply. Your list is saved only in this browser.
            </Alert>
            </Reveal>

            <Reveal>
            <Card padding="var(--space-10)" style={{marginTop:'var(--space-8)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'var(--space-6)',alignItems:'center',borderRadius:'var(--radius-2xl)'}}>
              <div>
                <h2 style={{color:'var(--cream-100)',fontSize:'var(--text-h3)',margin:'0 0 var(--space-2)',maxWidth:'22ch'}}>Ready to turn this list into a plan?</h2>
                <p style={{color:'var(--ink-100)',margin:0,maxWidth:'44ch'}}>Bring it to a free 15-minute call and we'll tell you which of these you can realistically get into.</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)',alignItems:'flex-start'}}>
                <Magnetic strength={0.18}><Button onClick={()=>go('call')} iconLeft={<Icon name="video" size={17}/>}>Book a free call</Button></Magnetic>
                <Button variant="ghost" style={{color:'var(--cream-200)'}} onClick={()=>go('apply')}>Start my application</Button>
              </div>
            </Card>
            </Reveal>
          </div>
        )}
      </div>
    </main>
  );
}
Object.assign(window, { MyListScreen });
