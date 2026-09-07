const { Button, Card, Icon, Badge, Tag, Stepper } = window.UnibridgeNLDesignSystem_3cb2d1;

function HomeScreen({ go }) {
  const services = [
    ["graduation-cap","University enrolment","We file your application at up to five Dutch universities and chase every decision."],
    ["house","Housing support","We work with a licensed housing intermediary who sources verified rooms, and we check the contract before you sign."],
    ["id-card","Visa & BSN","Residence permit paperwork and a booked BSN appointment in your arrival week."],
    ["wallet","Bank & insurance","A Dutch IBAN, student health insurance and your OV travel card, sorted."],
    ["bike","Arrival week","Airport pickup, a bike, SIM card and a walk through your new neighbourhood."],
    ["calendar-check","Deadline tracking","One checklist with every date, so nothing expires in a mailbox."]
  ];
  return (
    <main>
      <section style={{padding:'var(--space-20) 0 var(--space-16)'}}>
        <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)',display:'grid',gridTemplateColumns:'1.05fr .95fr',gap:'var(--space-16)',alignItems:'center'}}>
          <div>
            <Badge tone="accent">September 2027 intake open</Badge>
            <h1 style={{fontSize:'var(--text-display-2)',lineHeight:'var(--leading-tight)',margin:'var(--space-5) 0 var(--space-4)'}}>Your bridge to student life in the Netherlands</h1>
            <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'46ch'}}>You handle the studying. We handle enrolment, your residence permit and the first week — and put you in front of a licensed housing partner instead of a scam listing.</p>
            <div style={{display:'flex',gap:'var(--space-3)',marginTop:'var(--space-8)'}}>
              <Button size="lg" onClick={()=>go('apply')} iconRight={<Icon name="arrow-right" size={18}/>}>Start my application</Button>
              <Button size="lg" variant="secondary" onClick={()=>go('call')}>Book a free 15-min call</Button>
            </div>
            <div style={{display:'flex',gap:'var(--space-8)',marginTop:'var(--space-10)'}}>
              {[["13","cities across the Netherlands"],["16","partner universities"],["1","advisor from start to arrival"]].map(([n,l])=>(
                <div key={l}><div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:30,color:'var(--text-heading)'}}>{n}</div><div style={{fontSize:'var(--text-caption)',color:'var(--text-muted)'}}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={{position:'relative'}}>
            <Placeholder label="Hero photo · students on a canal bridge" ratio="4 / 5"/>
            <Card elevation="lg" style={{position:'absolute',bottom:-26,left:-26,width:290}}>
              <div className="ub-overline">Your checklist</div>
              <Stepper orientation="vertical" current={2} style={{marginTop:12}} steps={[{label:"Profile",meta:"Complete"},{label:"University choice",meta:"Erasmus, Utrecht"},{label:"Documents",meta:"2 of 5 uploaded"},{label:"Housing partner"}]}/>
            </Card>
          </div>
        </div>
      </section>

      <Section tone="cream" overline="What we do" title="Everything between an offer letter and your first lecture" lead="Six services, one fee, no forwarding you to a call centre.">
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--space-5)'}}>
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
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--space-8)'}}>
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
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--space-5)'}}>
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
        <Card tone="ink" padding="var(--space-16)" style={{display:'grid',gridTemplateColumns:'1.3fr auto',gap:'var(--space-10)',alignItems:'center',borderRadius:'var(--radius-2xl)'}}>
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
