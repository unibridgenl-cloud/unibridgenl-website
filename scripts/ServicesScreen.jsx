const { Card, Button, Icon, Badge, Alert, Tabs, Checkbox, Tag, Tooltip } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Tilt, Stagger, Magnetic, DrawRule, MoneyCounter } = window;

const PLANS = [
  { name:"Bridge Basic", tier:"Basic", price:"€500", amount:500, note:"one-off",
    who:"You know where you want to apply and just need the paperwork done right.",
    items:[["check","Two university applications"],["check","Document check & certified copies"],["check","Credential evaluation guidance"],["check","Deadline tracking in your dashboard"],["check","Email support, answered in 1 working day"]],
    excl:["Housing search","Visa & BSN support","Arrival week"], cta:"secondary" },
  { name:"Bridge Full", tier:"Full", price:"€1,200", amount:1200, note:"one-off",
    who:"The whole move handled, from shortlist to the keys in your hand.",
    items:[["check","Up to five university applications"],["check","Everything in Bridge Basic"],["check","Housing search with a licensed letting agency"],["check","Contract review before you sign"],["check","Visa & BSN appointment booking"],["check","Bank, insurance and OV chip card"],["check","Arrival week support"],["check","WhatsApp line to your advisor"]],
    excl:[], cta:"primary" },
  { name:"Bridge Settled", tier:"Settled", price:"€1,750", amount:1750, note:"one-off",
    who:"You want somebody in your corner past arrival week, through the whole first year.",
    items:[["check","Everything in Bridge Full"],["check","Allowance check: whether you qualify for healthcare and rent allowance, walked through on a call"],["check","Huisarts and dentist registration, before you need one"],["check","Second-year housing search, started in January"],["check","Monthly check-in through your first two semesters"],["check","Parent briefing call in your language"],["check","Priority WhatsApp, answered same day"]],
    excl:[], cta:"secondary" }
];

const ADDONS = [
  ["file-check","Extra university application","€150","per application beyond your plan"],
  ["house","Housing search only","€450","licensed agency referral + contract review"],
  ["id-card","Visa & BSN only","€400","residence permit file and municipality booking"],
  ["plane-takeoff","Arrival week only","€350","keys, bank, insurance, bike"],
  ["languages","Document translation","€60","per certified page, sworn translator"],
  ["message-circle","Single advice call","€75","45 minutes, credited if you book a plan"]
];

const COMPARE = [
  ["University applications","2","Up to 5","Up to 5"],
  ["Documents certified & filed","yes","yes","yes"],
  ["Deadline dashboard","yes","yes","yes"],
  ["Housing search via agency","no","yes","yes"],
  ["Contract review","no","yes","yes"],
  ["Visa & BSN booking","no","yes","yes"],
  ["Bank, insurance, OV card","no","yes","yes"],
  ["Arrival week support","no","yes","yes"],
  ["Parent briefing call","no","no","yes"],
  ["Allowance check","no","no","yes"],
  ["Huisarts registration","no","no","yes"],
  ["Second-year housing search","no","no","yes"],
  ["Check-ins through first year","no","no","yes"],
  ["Support channel","Email","WhatsApp","Priority WhatsApp"]
];

const FAQ = [
  ["Do you guarantee admission?","No. Nobody honestly can. We only put universities on your list where your grades clear their bar, and we tell you the odds in plain numbers."],
  ["Do you guarantee housing?","No. We work with a licensed housing intermediary who sources verified rooms, and we read every contract before you sign. Deposits go straight to the landlord or agency."],
  ["When do I pay?","After the free 15-minute call, once you accept the route in writing. You can split any plan into three interest-free instalments."],
  ["What if my visa is refused?","We refile once at no cost and, if it fails again, refund the visa portion of your fee."],
  ["What if I'm rejected by every university?","If none of your applications lead to an offer for the intake you paid for, we carry your plan to the next intake at no extra cost."],
  ["Can my parents join the calls?","Yes, and on Bridge Settled we schedule a briefing call for them in Hindi, Dutch or English."],
  ["What does Bridge Settled actually add?","Bridge Full stops once you have your keys. Bridge Settled keeps going for a year. The two things students most often miss are allowances, healthcare and rent support you may be entitled to every month, and a huisarts, because practices near student housing fill up and you do not want to be finding one while ill. We also start your second-year housing hunt in January rather than June, which is the difference between choosing a room and taking whatever is left."],
  ["Will you be under 18 when your course starts?","Then we are not the right fit, and we would rather say so now than halfway through. Universities require a formal guardianship arrangement for students under 18, and we are not set up to handle that. We work with students who are 18 or over on their first day."]
];

/** Accordion row: height-animated answer, rotating chevron. */
function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const inner = React.useRef(null);
  const [full, setFull] = React.useState(0);
  React.useEffect(() => {
    const measure = () => inner.current && setFull(inner.current.scrollHeight);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const h = open ? full : 0;
  return (
    <Card padding="0" style={{overflow:'hidden'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:'100%',display:'flex',alignItems:'center',gap:14,justifyContent:'space-between',
        padding:'18px var(--space-6)',background:open?'var(--surface-accent-soft)':'transparent',border:0,cursor:'pointer',textAlign:'left',
        font:'700 17px/1.4 var(--font-sans)',color:'var(--text-heading)',transition:'background-color 320ms var(--ease-standard)'}}>
        {q}
        <span style={{display:'inline-flex',flex:'0 0 auto',transform:open?'rotate(180deg)':'none',transition:'transform 380ms var(--ease-out)'}}>
          <Icon name="chevron-down" size={18} color="var(--gold-700)"/>
        </span>
      </button>
      <div style={{height:h,overflow:'hidden',transition:'height 420ms var(--ease-out)'}}>
        <div ref={inner} style={{padding:'0 var(--space-6) 18px'}}>
          <p style={{margin:0,color:'var(--text-body)',lineHeight:1.7,opacity:open?1:0,transform:open?'none':'translateY(-6px)',
            transition:'opacity 380ms var(--ease-out) 60ms, transform 380ms var(--ease-out) 60ms'}}>{a}</p>
        </div>
      </div>
    </Card>
  );
}

function Cell({ v }) {
  if (v === "yes") return <Icon name="check" size={17} color="var(--moss-500)"/>;
  if (v === "no") return <Icon name="minus" size={17} color="var(--ink-200)"/>;
  return <span style={{fontSize:'var(--text-body-sm)',fontWeight:600,color:'var(--text-heading)'}}>{v}</span>;
}

function ServicesScreen({ go }) {
  const [tab, setTab] = React.useState("plans");
  return (
    <main>
      <PageHero overline="Services & pricing"
        title="One fee, written down before you pay"
        lead="We take no commission from universities or landlords, so the price you see is the whole price. Nothing is charged until you accept a plan."
        meta={[["shield-check","No commission from universities"],["file-text","Fee fixed in writing"],["message-circle","One advisor, start to finish"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}><Icon name={i} size={16} color="var(--moss-500)"/>{t}</span>
        ))}/>

      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-10) var(--gutter-inline) 0'}}>
        <Rise><Tabs variant="pill" items={[{value:"plans",label:"Plans"},{value:"compare",label:"Compare"},{value:"addons",label:"Add-ons"},{value:"faq",label:"FAQ"}]} value={tab} onChange={setTab} style={{display:'inline-flex',marginBottom:'var(--space-8)'}}/></Rise>

        <div key={tab} className="ub-page">
        {tab === "plans" && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'var(--space-5)',alignItems:'stretch'}}>
            {PLANS.map((p,pi)=>{
              const hero = p.cta === 'primary';
              return (
                <Reveal key={p.name} delay={pi*110} y={26}>
                <Tilt max={hero?4:2.6}>
                <Card elevation={hero?'lg':'sm'} padding="var(--space-6)"
                  style={{display:'flex',flexDirection:'column',height:'100%',...(hero?{border:'1px solid var(--gold-500)'}:{})}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',minHeight:24}}>
                    <span className="ub-overline">{p.tier}</span>
                    {hero && <Badge tone="accent">Most chosen</Badge>}
                  </div>
                  <h3 style={{fontSize:'var(--text-h4)',margin:'var(--space-3) 0 var(--space-2)'}}>{p.name}</h3>
                  <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:0,minHeight:44}}>{p.who}</p>
                  <div style={{display:'flex',alignItems:'baseline',gap:8,marginTop:'var(--space-5)'}}>
                    <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:44,lineHeight:1,color:'var(--text-heading)'}}><MoneyCounter to={p.amount}/></span>
                    <span style={{fontSize:'var(--text-caption)',color:'var(--text-muted)',whiteSpace:'nowrap'}}>{p.note}</span>
                  </div>
                  <div style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',marginTop:6}}>or three instalments, no interest</div>
                  <hr className="ub-rule" style={{margin:'var(--space-5) 0'}}/>
                  <div style={{display:'flex',flexDirection:'column',gap:10}}>
                    {p.items.map(([,label])=>(
                      <div key={label} style={{display:'flex',gap:10,fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}>
                        <Icon name="check" size={16} color="var(--moss-500)" style={{marginTop:2,flex:'0 0 auto'}}/>{label}
                      </div>
                    ))}
                    {p.excl.map(label=>(
                      <div key={label} style={{display:'flex',gap:10,fontSize:'var(--text-body-sm)',color:'var(--text-subtle)'}}>
                        <Icon name="minus" size={16} color="var(--ink-200)" style={{marginTop:2,flex:'0 0 auto'}}/>{label}
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:'auto',paddingTop:'var(--space-6)'}}>
                    <Button full variant={p.cta} onClick={()=>go('call')}>{`Choose ${p.tier}`}</Button>
                  </div>
                  <div style={{textAlign:'center',fontSize:'var(--text-caption)',color:'var(--text-subtle)',marginTop:10}}>Free call first, no payment today</div>
                </Card>
                </Tilt>
                </Reveal>
              );
            })}
          </div>
        )}

        {tab === "compare" && (
          <Card padding="0">
            <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1fr',padding:'var(--space-5) var(--space-6)',alignItems:'end'}}>
              <span className="ub-overline">What's included</span>
              {PLANS.map(p=>(
                <div key={p.name} style={{textAlign:'center'}}>
                  <div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{p.tier}</div>
                  <div style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:23,color:'var(--text-heading)'}}><MoneyCounter to={p.amount} duration={800}/></div>
                </div>
              ))}
            </div>
            {COMPARE.map((r,i)=>(
              <Reveal key={r[0]} delay={Math.min(i,8)*45} y={10} blur={false}>
              <div className="ub-liftrow" style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1fr',padding:'var(--space-3) var(--space-6)',borderTop:'1px solid var(--border-hairline)',background:i%2?'var(--surface-page)':'transparent',alignItems:'center'}}>
                <span style={{fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}>{r[0]}</span>
                {r.slice(1).map((v,j)=><span key={j} style={{display:'flex',justifyContent:'center'}}><Cell v={v}/></span>)}
              </div>
              </Reveal>
            ))}
            <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1fr',padding:'var(--space-5) var(--space-6)',borderTop:'1px solid var(--border-hairline)'}}>
              <span/>
              {PLANS.map(p=><div key={p.name} style={{display:'flex',justifyContent:'center'}}><Button size="sm" variant={p.cta} onClick={()=>go('call')}>Choose</Button></div>)}
            </div>
          </Card>
        )}

        {tab === "addons" && (
          <div>
            <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'56ch',marginTop:0}}>Bolt these onto any plan, or take one on its own if you only need a single piece.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'var(--space-4)',marginTop:'var(--space-6)'}}>
              {ADDONS.map(([i,t,price,note],ai)=>(
                <Reveal key={t} delay={ai*80} y={22}>
                <Tilt max={3}>
                <Card interactive onClick={()=>go('call')} style={{height:'100%'}}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
                    <span style={{width:40,height:40,flex:'0 0 auto',borderRadius:'var(--radius-md)',background:'var(--surface-accent-soft)',color:'var(--gold-700)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={i} size={20}/></span>
                    <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:23,color:'var(--text-heading)'}}><MoneyCounter to={Number(String(price).replace(/[^0-9]/g,''))} duration={800}/></span>
                  </div>
                  <h4 style={{margin:'var(--space-4) 0 4px'}}>{t}</h4>
                  <p style={{margin:0,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>{note}</p>
                </Card>
                </Tilt>
                </Reveal>
              ))}
            </div>
            <Alert tone="info" title="What you pay elsewhere" style={{marginTop:'var(--space-6)'}}>
              University application fees (€50 to €100 each), the IND residence permit fee (€243 in 2027) and your housing deposit are paid directly to those parties, never to us.
            </Alert>
          </div>
        )}

        {tab === "faq" && (
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)',maxWidth:'var(--prose-max)'}}>
            {FAQ.map(([q,a],n)=>(
              <Reveal key={q} delay={n*80} y={16}>
                <FaqItem q={q} a={a} defaultOpen={n===0}/>
              </Reveal>
            ))}
          </div>
        )}
        </div>
      </div>

      <div style={{maxWidth:'var(--content-max)',margin:'var(--section-y) auto 0',padding:'0 var(--gutter-inline)'}}>
        <Reveal>
        <Card tone="ink" padding="clamp(32px,5vw,56px)" style={{position:'relative',overflow:'hidden',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'var(--space-10)',alignItems:'center',borderRadius:'var(--radius-2xl)'}}>
          <div className="ub-aurora" aria-hidden="true" style={{position:'absolute',inset:'-40%',opacity:.55,pointerEvents:'none'}}/>
          <div style={{position:'relative'}}>
            <h2 style={{color:'var(--cream-200)',fontSize:'var(--text-h2)',maxWidth:'26ch'}}>Not sure which plan fits?</h2>
            <p style={{color:'var(--ink-100)',fontSize:'var(--text-body-lg)',margin:0,maxWidth:'50ch'}}>Take the free 15-minute call. Harsh will tell you which plan you actually need, often the cheaper one.</p>
          </div>
          <div style={{position:'relative',display:'flex',flexDirection:'column',gap:'var(--space-3)',alignItems:'flex-start'}}>
            <Magnetic><Button size="lg" onClick={()=>go('call')} iconLeft={<Icon name="video" size={17}/>}>Book a free 15-min call</Button></Magnetic>
            <Button size="lg" variant="ghost" style={{color:'var(--cream-200)'}} onClick={()=>go('apply')}>Start my application</Button>
          </div>
        </Card>
        </Reveal>
      </div>
    </main>
  );
}
Object.assign(window, { ServicesScreen });
