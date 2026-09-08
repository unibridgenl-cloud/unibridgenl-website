const { Card, Tag, Badge, Button, Input, Select, Tabs, Icon, Tooltip } = window.UnibridgeNLDesignSystem_3cb2d1;

const UNIS = [
  { name:"University of Amsterdam", initials:"UvA", color:"var(--gold-500)", city:"Amsterdam", level:"Bachelor · Master", fields:["Business","Economics","Health","Communication"], tuition:"€2,530 / €16,900", deadline:"1 May", rate:"High" },
  { name:"VU Amsterdam", initials:"VU", color:"var(--clay-500)", city:"Amsterdam", level:"Bachelor · Master", fields:["Health","Law","Life Sciences"], tuition:"€2,530 / €15,800", deadline:"1 May", rate:"High" },
  { name:"Amsterdam UAS (HvA)", initials:"HvA", color:"var(--moss-500)", city:"Amsterdam", level:"Bachelor", fields:["Business","Media & Design","Engineering"], tuition:"€2,530 / €9,600", deadline:"1 May", rate:"High" },
  { name:"Erasmus University Rotterdam", initials:"EUR", color:"var(--gold-700)", city:"Rotterdam", level:"Bachelor · Master", fields:["Business","Economics","Health"], tuition:"€2,530 / €16,400", deadline:"1 May", rate:"High" },
  { name:"Utrecht University", initials:"UU", color:"var(--clay-700)", city:"Utrecht", level:"Master", fields:["Data Science","Law","Humanities"], tuition:"€2,530 / €19,400", deadline:"1 April", rate:"Medium" },
  { name:"TU Delft", initials:"TUD", color:"var(--moss-700)", city:"Delft", level:"Bachelor · Master", fields:["Engineering","Architecture","Computer Science"], tuition:"€2,530 / €18,750", deadline:"15 January", rate:"Selective" },
  { name:"Leiden University", initials:"LU", color:"var(--gold-500)", city:"Leiden", level:"Bachelor · Master", fields:["Law","Humanities","Life Sciences","Psychology"], tuition:"€2,530 / €17,300", deadline:"1 April", rate:"Medium" },
  { name:"University of Groningen", initials:"RUG", color:"var(--clay-500)", city:"Groningen", level:"Bachelor", fields:["Life Sciences","Business","Arts"], tuition:"€2,530 / €15,200", deadline:"1 May", rate:"High" },
  { name:"Eindhoven University of Technology", initials:"TU/e", color:"var(--moss-500)", city:"Eindhoven", level:"Bachelor · Master", fields:["Engineering","Computer Science","Data Science"], tuition:"€2,530 / €18,100", deadline:"1 April", rate:"Selective" },
  { name:"Tilburg University", initials:"TiU", color:"var(--gold-700)", city:"Tilburg", level:"Master", fields:["Economics","Psychology","Data Science"], tuition:"€2,530 / €14,700", deadline:"1 June", rate:"High" },
  { name:"Maastricht University", initials:"UM", color:"var(--clay-700)", city:"Maastricht", level:"Bachelor · Master", fields:["Business","Health","International Relations"], tuition:"€2,530 / €16,000", deadline:"1 May", rate:"High" },
  { name:"Radboud University", initials:"RU", color:"var(--moss-700)", city:"Nijmegen", level:"Bachelor · Master", fields:["Life Sciences","Psychology","Humanities"], tuition:"€2,530 / €14,300", deadline:"1 May", rate:"High" },
  { name:"Wageningen University", initials:"WUR", color:"var(--gold-500)", city:"Wageningen", level:"Master", fields:["Life Sciences","Environment & Food"], tuition:"€2,530 / €19,200", deadline:"1 April", rate:"Medium" },
  { name:"University of Twente", initials:"UT", color:"var(--clay-500)", city:"Enschede", level:"Bachelor · Master", fields:["Engineering","Computer Science","Business"], tuition:"€2,530 / €16,750", deadline:"1 May", rate:"High" },
  { name:"The Hague UAS", initials:"THUAS", color:"var(--moss-500)", city:"The Hague", level:"Bachelor", fields:["International Relations","Business","Media & Design"], tuition:"€2,530 / €8,900", deadline:"1 May", rate:"High" },
  { name:"Rotterdam UAS", initials:"RUAS", color:"var(--gold-700)", city:"Rotterdam", level:"Bachelor", fields:["Engineering","Business","Health"], tuition:"€2,530 / €9,200", deadline:"1 May", rate:"High" }
];

function CrestBadge({ initials, color }) {
  return (
    <div style={{aspectRatio:'1 / 1',borderRadius:'var(--radius-md)',background:color,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:15,color:'var(--cream-100)',letterSpacing:'-0.01em'}}>{initials}</span>
    </div>
  );
}

function UniversitiesScreen({ go }) {
  const [city, setCity] = React.useState("All cities");
  const [level, setLevel] = React.useState("All");
  const rows = UNIS.filter(u => (city === "All cities" || u.city === city) && (level === "All" || u.level.includes(level)));
  const rateTone = { High:"success", Medium:"warning", Selective:"danger" };
  return (
    <main>
      <div style={{background:'var(--surface-page)',borderBottom:'1px solid var(--border-hairline)',padding:'var(--space-12) 0'}}>
        <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'0 var(--gutter-inline)'}}>
          <div className="ub-overline">{UNIS.length} partner universities · research universities and universities of applied sciences</div>
          <h1 style={{fontSize:'var(--text-h1)',margin:'var(--space-3) 0 var(--space-2)'}}>Where you could study</h1>
          <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'56ch'}}>Tuition shown as EU / non-EU per year. Deadlines are the university's own — we file two weeks ahead of them.</p>
        </div>
      </div>

      <div style={{maxWidth:'var(--content-max)',margin:'0 auto',padding:'var(--space-10) var(--gutter-inline) 0',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'var(--space-8)'}}>
        <aside style={{display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
          <Input placeholder="Search universities" iconLeft="search"/>
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>City</div>
            <Select value={city} onChange={e=>setCity(e.target.value)} options={["All cities","Amsterdam","Rotterdam","Utrecht","Delft","Leiden","Groningen","Eindhoven","Tilburg","Maastricht","Nijmegen","Wageningen","Enschede","The Hague"]}/>
          </div>
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>Study field</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {["Business","Economics","Engineering","Computer Science","Data Science","Law","Health","Life Sciences","Psychology","Humanities","Architecture","Media & Design","International Relations","Communication","Environment & Food","Arts"].map(t=><Tag key={t}>{t}</Tag>)}
            </div>
          </div>
          <Card tone="sunken" elevation="none">
            <div style={{fontSize:'var(--text-body-sm)',fontWeight:700,color:'var(--text-heading)'}}>Not sure yet?</div>
            <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'6px 0 var(--space-4)'}}>We'll shortlist five you can realistically get into.</p>
            <Button size="sm" full onClick={()=>go('quiz')}>Get my shortlist</Button>
          </Card>
        </aside>

        <div>
          <Tabs items={[{value:"All",label:"All levels"},{value:"Bachelor",label:"Bachelor"},{value:"Master",label:"Master"}]} value={level} onChange={setLevel}/>
          <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginTop:'var(--space-5)'}}>
            <span style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>{rows.length} of {UNIS.length} shown</span>
            <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>Sorted by chance of admission</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',marginTop:'var(--space-4)'}}>
            {rows.map(u=>(
              <Card key={u.name} interactive style={{display:'flex',flexWrap:'wrap',gap:'var(--space-5)',alignItems:'center'}}>
                <div style={{width:64,height:64,flex:'0 0 auto'}}><CrestBadge initials={u.initials} color={u.color}/></div>
                <div style={{flex:'1 1 220px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                    <h3 style={{fontSize:'var(--text-h4)',margin:0}}>{u.name}</h3>
                    <Badge tone={rateTone[u.rate]} dot>{u.rate} chance</Badge>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:14,marginTop:6,fontSize:'var(--text-body-sm)',color:'var(--text-muted)',flexWrap:'wrap'}}>
                    <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="map-pin" size={15}/>{u.city}</span>
                    <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="graduation-cap" size={15}/>{u.level}</span>
                    <span style={{display:'inline-flex',alignItems:'center',gap:6}}><Icon name="calendar-check" size={15}/>Deadline {u.deadline}</span>
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:'var(--space-3)',flexWrap:'wrap'}}>{u.fields.map(t=><Tag key={t}>{t}</Tag>)}</div>
                </div>
                <div style={{flex:'0 0 auto'}}>
                  <Tooltip label="EU / non-EU tuition per year" placement="left">
                    <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:'var(--text-h4)',color:'var(--text-heading)'}}>{u.tuition}</span>
                  </Tooltip>
                  <div style={{marginTop:'var(--space-4)'}}><Button size="sm" variant="secondary">Add to list</Button></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
Object.assign(window, { UniversitiesScreen });
