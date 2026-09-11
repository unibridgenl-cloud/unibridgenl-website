const { Card, Tag, Badge, Button, Input, Select, Tabs, Icon, Tooltip } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Tilt, Counter, Stagger, Magnetic } = window;

/** Monogram crest: the university's favicon when it resolves, initials otherwise. */
function UniLogo({ name, domain, size = 96 }) {
  const [failed, setFailed] = React.useState(false);
  const initials = name.replace(/[^A-Z]/g, "").slice(0, 3) || name.slice(0, 2).toUpperCase();
  return (
    <div style={{width:size,height:size,flex:'0 0 auto',background:'var(--surface-page)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-md)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:6,padding:10,overflow:'hidden'}}>
      {!failed
        ? <img src={"https://www.google.com/s2/favicons?domain=" + domain + "&sz=128"} alt={name + " logo"} loading="lazy" decoding="async" onError={()=>setFailed(true)}
            style={{width:32,height:32,objectFit:'contain'}}/>
        : <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:size*0.26,lineHeight:1,color:'var(--gold-700)'}}>{initials}</span>}
      <span style={{fontSize:10,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text-subtle)',whiteSpace:'nowrap'}}>{domain}</span>
    </div>
  );
}

const UNIS = [
  { name:"University of Amsterdam", domain:"uva.nl", city:"Amsterdam", level:"Bachelor · Master", fields:["Business","Economics","Health","Communication"], tuition:"€2,530 / €16,900", deadline:"1 May", rate:"High" },
  { name:"VU Amsterdam", domain:"vu.nl", city:"Amsterdam", level:"Bachelor · Master", fields:["Health","Law","Life Sciences"], tuition:"€2,530 / €15,800", deadline:"1 May", rate:"High" },
  { name:"Amsterdam UAS (HvA)", domain:"hva.nl", city:"Amsterdam", level:"Bachelor", fields:["Business","Media & Design","Engineering"], tuition:"€2,530 / €9,600", deadline:"1 May", rate:"High" },
  { name:"Erasmus University Rotterdam", domain:"eur.nl", city:"Rotterdam", level:"Bachelor · Master", fields:["Business","Economics","Health"], tuition:"€2,530 / €16,400", deadline:"1 May", rate:"High" },
  { name:"Utrecht University", domain:"uu.nl", city:"Utrecht", level:"Master", fields:["Data Science","Law","Humanities"], tuition:"€2,530 / €19,400", deadline:"1 April", rate:"Medium" },
  { name:"TU Delft", domain:"tudelft.nl", city:"Delft", level:"Bachelor · Master", fields:["Engineering","Architecture","Computer Science"], tuition:"€2,530 / €18,750", deadline:"15 January", rate:"Selective" },
  { name:"Leiden University", domain:"universiteitleiden.nl", city:"Leiden", level:"Bachelor · Master", fields:["Law","Humanities","Life Sciences","Psychology"], tuition:"€2,530 / €17,300", deadline:"1 April", rate:"Medium" },
  { name:"University of Groningen", domain:"rug.nl", city:"Groningen", level:"Bachelor", fields:["Life Sciences","Business","Arts"], tuition:"€2,530 / €15,200", deadline:"1 May", rate:"High" },
  { name:"Eindhoven University of Technology", domain:"tue.nl", city:"Eindhoven", level:"Bachelor · Master", fields:["Engineering","Computer Science","Data Science"], tuition:"€2,530 / €18,100", deadline:"1 April", rate:"Selective" },
  { name:"Tilburg University", domain:"tilburguniversity.edu", city:"Tilburg", level:"Master", fields:["Economics","Psychology","Data Science"], tuition:"€2,530 / €14,700", deadline:"1 June", rate:"High" },
  { name:"Maastricht University", domain:"maastrichtuniversity.nl", city:"Maastricht", level:"Bachelor · Master", fields:["Business","Health","International Relations"], tuition:"€2,530 / €16,000", deadline:"1 May", rate:"High" },
  { name:"Radboud University", domain:"ru.nl", city:"Nijmegen", level:"Bachelor · Master", fields:["Life Sciences","Psychology","Humanities"], tuition:"€2,530 / €14,300", deadline:"1 May", rate:"High" },
  { name:"Wageningen University", domain:"wur.nl", city:"Wageningen", level:"Master", fields:["Life Sciences","Environment & Food"], tuition:"€2,530 / €19,200", deadline:"1 April", rate:"Medium" },
  { name:"University of Twente", domain:"utwente.nl", city:"Enschede", level:"Bachelor · Master", fields:["Engineering","Computer Science","Business"], tuition:"€2,530 / €16,750", deadline:"1 May", rate:"High" },
  { name:"The Hague UAS", domain:"dehaagsehogeschool.nl", city:"The Hague", level:"Bachelor", fields:["International Relations","Business","Media & Design"], tuition:"€2,530 / €8,900", deadline:"1 May", rate:"High" },
  { name:"Rotterdam UAS", domain:"hogeschoolrotterdam.nl", city:"Rotterdam", level:"Bachelor", fields:["Engineering","Business","Health"], tuition:"€2,530 / €9,200", deadline:"1 May", rate:"High" }
];

const CITIES = ["All cities","Amsterdam","Rotterdam","Utrecht","Delft","Leiden","Groningen","Eindhoven","Tilburg","Maastricht","Nijmegen","Wageningen","Enschede","The Hague"];
const FIELD_TAGS = ["Business","Economics","Engineering","Computer Science","Data Science","Law","Health","Life Sciences","Psychology","Humanities","Architecture","Media & Design","International Relations","Communication","Environment & Food","Arts"];
const RATE_ORDER = { High:0, Medium:1, Selective:2 };

/** One course row inside an expanded university: info + working Add-to-list. */
function CourseRow({ uni, c }) {
  const list = useStudyList();
  const saved = list.some(it => it.id === studyListId(uni, c.name));
  const [justAdded, setJustAdded] = React.useState(false);
  const add = () => {
    const ok = addToStudyList({ uni, name:c.name, level:c.level, field:c.field, duration:c.duration, language:c.language, url:c.url });
    if (ok) { setJustAdded(true); setTimeout(()=>setJustAdded(false), 1600); }
  };
  return (
    <div style={{padding:'var(--space-4) 0',borderTop:'1px solid var(--border-hairline)'}}>
      <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-3)',alignItems:'flex-start',justifyContent:'space-between'}}>
        <div style={{flex:'1 1 260px',minWidth:0}}>
          <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:8}}>
            <span style={{fontSize:'var(--text-body)',fontWeight:700,color:'var(--text-heading)'}}>{c.name}</span>
            <Badge tone={c.level==='Bachelor'?'moss':'accent'}>{c.level}</Badge>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px 14px',marginTop:6,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="graduation-cap" size={14}/>{c.field}</span>
            {c.duration && <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="clock" size={14}/>{c.duration}</span>}
            {c.language && <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="languages" size={14}/>{c.language}</span>}
            {c.format && <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="calendar-check" size={14}/>{c.format}</span>}
          </div>
          {c.desc && <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-body)',margin:'var(--space-3) 0 0',maxWidth:'60ch',lineHeight:1.55}}>{c.desc}</p>}
          {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:'var(--space-3)',fontSize:'var(--text-body-sm)',color:'var(--text-link)',textDecoration:'none',fontWeight:600}}>View official course page<Icon name="arrow-right" size={14}/></a>}
        </div>
        <div style={{flex:'0 0 auto'}}>
          {saved
            ? <Button size="sm" variant="ghost" disabled iconLeft={<Icon name="check" size={15}/>} style={{color:'var(--moss-700)'}}>In your list</Button>
            : <Button size="sm" variant={justAdded?'primary':'secondary'} onClick={add} iconLeft={<Icon name={justAdded?'check':'graduation-cap'} size={15}/>}>{justAdded?'Added':'Add to list'}</Button>}
        </div>
      </div>
    </div>
  );
}

/** The expandable courses panel for a university card. */
function UniCourses({ uni, go }) {
  const courses = coursesFor(uni);
  if (!courses.length) {
    return (
      <div style={{marginTop:'var(--space-4)',paddingTop:'var(--space-4)',borderTop:'1px solid var(--border-hairline)'}}>
        <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:0}}>We're still adding programmes for this university. Meanwhile, browse them on the official site.</p>
        <a href={finderFor(uni)} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:'var(--space-3)',fontSize:'var(--text-body-sm)',color:'var(--text-link)',textDecoration:'none',fontWeight:600}}>Official programme finder<Icon name="arrow-right" size={14}/></a>
      </div>
    );
  }
  return (
    <div style={{marginTop:'var(--space-4)'}}>
      {courses.map(c => <CourseRow key={c.name} uni={uni} c={c}/>)}
      <div style={{display:'flex',flexWrap:'wrap',gap:10,alignItems:'center',justifyContent:'space-between',marginTop:'var(--space-4)',paddingTop:'var(--space-4)',borderTop:'1px solid var(--border-hairline)'}}>
        <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',maxWidth:'52ch'}}>Tuition, deadlines and admission requirements change each intake. Verify current details on the official course page.</span>
        <a href={finderFor(uni)} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:'var(--text-body-sm)',color:'var(--text-link)',textDecoration:'none',fontWeight:600,whiteSpace:'nowrap'}}>All programmes<Icon name="arrow-right" size={14}/></a>
      </div>
    </div>
  );
}

function UniversitiesScreen({ go }) {
  const [city, setCity] = React.useState("All cities");
  const [level, setLevel] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [fields, setFields] = React.useState([]);
  const [openUni, setOpenUni] = React.useState(null);
  const list = useStudyList();

  const toggleField = (t) => setFields(f => f.includes(t) ? f.filter(x=>x!==t) : [...f, t]);
  const clear = () => { setCity("All cities"); setLevel("All"); setQuery(""); setFields([]); };
  const filtered = fields.length || query.trim() || city !== "All cities" || level !== "All";

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNIS
      .filter(u =>
        (city === "All cities" || u.city === city) &&
        (level === "All" || u.level.includes(level)) &&
        (!fields.length || fields.some(f => u.fields.includes(f))) &&
        (!q || u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.fields.join(" ").toLowerCase().includes(q)))
      .sort((a,b) => RATE_ORDER[a.rate] - RATE_ORDER[b.rate]);
  }, [city, level, query, fields]);

  const listKey = city + "|" + level + "|" + query.trim().toLowerCase() + "|" + fields.join(",");
  const rateTone = { High:"success", Medium:"warning", Selective:"danger" };
  const savedCount = list.length;

  return (
    <main>
      <PageHero overline={UNIS.length + " partner universities · research and applied sciences"}
        title="Where you could study"
        lead="Pick a university to see real English-taught programmes, then add the ones you like to your study list. Tuition shown as EU / non-EU per year."
        meta={[["map-pin","13 cities"],["graduation-cap","Bachelor, Master & exchange"],["calendar-check","Filed two weeks early"]].map(([i,t])=>(
          <span key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:'var(--text-body-sm)',color:'var(--text-body)'}}><Icon name={i} size={16} color="var(--moss-500)"/>{t}</span>
        ))}/>

      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-10) var(--gutter-inline) 0',display:'flex',flexWrap:'wrap',alignItems:'flex-start',gap:'clamp(24px,3vw,32px)'}}>
        <aside style={{flex:'1 1 240px',minWidth:0,display:'flex',flexDirection:'column',gap:'var(--space-6)',position:'sticky',top:92,alignSelf:'start'}}>
          <Input placeholder="Search universities" iconLeft="search" value={query} onChange={e=>setQuery(e.target.value)}/>
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>City</div>
            <Select value={city} onChange={e=>setCity(e.target.value)} options={CITIES}/>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:10,marginBottom:'var(--space-3)'}}>
              <span className="ub-overline">Study field</span>
              {fields.length > 0 && (
                <button onClick={()=>setFields([])} style={{border:'none',background:'none',padding:0,cursor:'pointer',font:'600 12px var(--font-sans)',color:'var(--text-link)'}}>Reset</button>
              )}
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {FIELD_TAGS.map(t=>(
                <Tag key={t} selected={fields.includes(t)} onSelect={()=>toggleField(t)}>{t}</Tag>
              ))}
            </div>
          </div>
          <Card tone="sunken" elevation="none">
            <div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>Not sure yet?</div>
            <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'6px 0 var(--space-4)'}}>Answer a few questions and we'll recommend real programmes that fit you.</p>
            <Button size="sm" full onClick={()=>go('quiz')}>Find my field</Button>
          </Card>
          {savedCount > 0 && (
            <Card>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:'var(--space-2)'}}>
                <Icon name="check" size={16} color="var(--gold-700)"/>
                <span style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>{savedCount} in your study list</span>
              </div>
              <Button size="sm" variant="secondary" full onClick={()=>go('mylist')}>Review my list</Button>
            </Card>
          )}
        </aside>

        <div style={{flex:'3 1 min(100%,520px)',minWidth:0}}>
          <Tabs items={[{value:"All",label:"All levels"},{value:"Bachelor",label:"Bachelor"},{value:"Master",label:"Master"}]} value={level} onChange={setLevel}/>
          <div style={{display:'flex',flexWrap:'wrap',alignItems:'baseline',justifyContent:'space-between',gap:10,marginTop:'var(--space-5)'}}>
            <span style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>
              <Counter to={rows.length} key={rows.length} duration={520}/> of {UNIS.length} shown
              {filtered && <button onClick={clear} style={{marginLeft:12,border:'none',background:'none',padding:0,cursor:'pointer',font:'600 13px var(--font-sans)',color:'var(--text-link)'}}>Clear filters</button>}
            </span>
            <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>Sorted by chance of admission</span>
          </div>

          {rows.length === 0 ? (
            <Card tone="sunken" elevation="none" padding="var(--space-8)" style={{marginTop:'var(--space-4)',textAlign:'center'}}>
              <div style={{fontSize:'var(--text-h4)',color:'var(--text-heading)',marginBottom:'var(--space-2)'}}>Nothing matches that combination</div>
              <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'0 0 var(--space-5)'}}>Try one filter at a time, or let us build the shortlist for you.</p>
              <Button size="sm" variant="secondary" onClick={clear}>Clear filters</Button>
            </Card>
          ) : (
            <div key={listKey} className="ub-unilist" style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',marginTop:'var(--space-4)'}}>
              {rows.map((u)=>{
                const open = openUni === u.name;
                const nCourses = coursesFor(u.name).length;
                return (
                <Card key={u.name} style={{display:'flex',flexDirection:'column'}}>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-5)',alignItems:'center'}}>
                    <UniLogo name={u.name} domain={u.domain}/>
                    <div style={{flex:'1 1 260px',minWidth:0}}>
                      <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:10}}>
                        <h3 style={{fontSize:'var(--text-h4)',margin:0}}>{u.name}</h3>
                        <Badge tone={rateTone[u.rate]} dot>{u.rate} chance</Badge>
                      </div>
                      <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'6px 14px',marginTop:6,fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>
                        <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="map-pin" size={15}/>{u.city}</span>
                        <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="graduation-cap" size={15}/>{u.level}</span>
                        <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="calendar-check" size={15}/>Deadline {u.deadline}</span>
                      </div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:'var(--space-3)'}}>
                        {u.fields.map(t=><Tag key={t} tone={fields.includes(t)?'gold':'moss'}>{t}</Tag>)}
                      </div>
                    </div>
                    <div style={{flex:'0 0 auto',marginLeft:'auto',textAlign:'right'}}>
                      <Tooltip label="EU / non-EU tuition per year" placement="left">
                        <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:'var(--text-h4)',color:'var(--text-heading)',whiteSpace:'nowrap'}}>{u.tuition}</span>
                      </Tooltip>
                      <div style={{marginTop:'var(--space-4)'}}>
                        <Button size="sm" variant={open?'primary':'secondary'} onClick={()=>setOpenUni(open?null:u.name)} iconRight={<Icon name={open?'minus':'chevron-down'} size={15}/>}>
                          {open ? 'Hide courses' : (nCourses ? nCourses + ' courses' : 'View courses')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {open && <UniCourses uni={u.name} go={go}/>}
                </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
Object.assign(window, { UniversitiesScreen });
