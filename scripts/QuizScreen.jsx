const { Card, Button, Field, Input, Icon, Badge, Alert, Tag } = window.UnibridgeNLDesignSystem_3cb2d1;

const Q1 = [
  ["Solving technical or engineering problems", ["Engineering","Computer Science"]],
  ["Working with numbers, markets and money", ["Business","Economics"]],
  ["Helping people's health and wellbeing", ["Health","Life Sciences"]],
  ["Understanding people and how society works", ["Psychology","Humanities"]],
  ["Law, justice and how rules are made", ["Law","International Relations"]],
  ["Design, media and creative work", ["Media & Design","Arts"]],
  ["Environment, food systems and sustainability", ["Environment & Food","Life Sciences"]],
  ["Data, computers and building software", ["Data Science","Computer Science"]]
];

const Q2 = [
  ["Mathematics", ["Data Science","Engineering","Economics"]],
  ["Physics", ["Engineering","Computer Science"]],
  ["Biology", ["Life Sciences","Health"]],
  ["Chemistry", ["Life Sciences","Health"]],
  ["Economics / Business studies", ["Business","Economics"]],
  ["History", ["Humanities","International Relations"]],
  ["Languages / Literature", ["Humanities","Communication"]],
  ["Art / Design", ["Media & Design","Arts"]],
  ["Computer Science / IT", ["Computer Science","Data Science"]],
  ["Social studies / Psychology", ["Psychology","International Relations"]]
];

const Q3 = [
  ["Helping others directly", ["Health","Psychology"]],
  ["Solving hard technical problems", ["Engineering","Computer Science","Data Science"]],
  ["Creative freedom", ["Media & Design","Arts"]],
  ["Financial stability and growth", ["Business","Economics"]],
  ["Global impact and travel", ["International Relations","Environment & Food"]],
  ["Structure, fairness and clear rules", ["Law"]]
];

function scoreFields(interest, subjects, value) {
  const scores = {};
  const add = (fields, pts) => fields.forEach(f => { scores[f] = (scores[f]||0) + pts; });
  if (interest) add(Q1.find(q=>q[0]===interest)[1], 2);
  subjects.forEach(s => add(Q2.find(q=>q[0]===s)[1], 1));
  if (value) add(Q3.find(q=>q[0]===value)[1], 2);
  return Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([f])=>f);
}

function QuizScreen({ go }) {
  const [step, setStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [interest, setInterest] = React.useState(null);
  const [subjects, setSubjects] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const [sent, setSent] = React.useState(false);

  const toggleSubject = (s) => setSubjects(prev => prev.includes(s) ? prev.filter(x=>x!==s) : (prev.length<4 ? [...prev,s] : prev));

  const top5 = React.useMemo(() => (step >= 4 ? scoreFields(interest, subjects, value) : []), [step, interest, subjects, value]);

  const sendResults = () => {
    const subject = encodeURIComponent("My UniBridge NL field shortlist");
    const body = encodeURIComponent(
      `Visitor email: ${email}\n\nInterest: ${interest}\nBest subjects: ${subjects.join(", ")}\nWhat they value: ${value}\n\nTop 5 shortlisted fields:\n${top5.map((f,i)=>`${i+1}. ${f}`).join("\n")}`
    );
    window.location.href = `mailto:unibridgenl@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const OptionButton = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      textAlign:'left',width:'100%',padding:'var(--space-4) var(--space-5)',cursor:'pointer',
      border:'1px solid '+(active?'var(--gold-500)':'var(--border-hairline)'),
      background:active?'var(--surface-accent-soft)':'var(--surface-card)',
      borderRadius:'var(--radius-md)',font:(active?700:400)+' 15px var(--font-sans)',
      color:'var(--text-heading)',transition:'var(--transition-control)',display:'flex',
      alignItems:'center',justifyContent:'space-between'}}>
      {children}
      {active && <Icon name="check" size={17} color="var(--gold-700)"/>}
    </button>
  );

  return (
    <main style={{maxWidth:760,margin:'0 auto',padding:'var(--space-12) var(--gutter-inline) var(--space-20)'}}>
      <div className="ub-overline">Free · 2 minutes</div>
      <h1 style={{fontSize:'var(--text-h1)',margin:'var(--space-3) 0 var(--space-2)'}}>Find your field</h1>
      <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'56ch'}}>Answer a few questions about your interests, strongest subjects and what you value in future work — we'll shortlist the five study fields that fit you best.</p>

      <Card padding="var(--space-8)" style={{marginTop:'var(--space-8)'}}>
        {step === 0 && (
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>Step 1 of 4</div>
            <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>Where should we send your shortlist?</h3>
            <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'0 0 var(--space-5)'}}>We'll only use this to send your results — no spam, ever.</p>
            <Field label="Your email" required><Input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:'var(--space-6)'}}>
              <Button disabled={!email.includes('@')} onClick={()=>setStep(1)} iconRight={<Icon name="arrow-right" size={16}/>}>Continue</Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>Step 2 of 4</div>
            <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-5)'}}>What kind of problems interest you most?</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
              {Q1.map(([label])=>(
                <OptionButton key={label} active={interest===label} onClick={()=>setInterest(label)}>{label}</OptionButton>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'var(--space-6)'}}>
              <Button variant="ghost" onClick={()=>setStep(0)} iconLeft={<Icon name="arrow-left" size={16}/>}>Back</Button>
              <Button disabled={!interest} onClick={()=>setStep(2)} iconRight={<Icon name="arrow-right" size={16}/>}>Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>Step 3 of 4</div>
            <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-2)'}}>Which subjects were your highest grades in?</h3>
            <p style={{fontSize:'var(--text-body-sm)',color:'var(--text-muted)',margin:'0 0 var(--space-5)'}}>Pick up to 4.</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-3)'}}>
              {Q2.map(([label])=>(
                <OptionButton key={label} active={subjects.includes(label)} onClick={()=>toggleSubject(label)}>{label}</OptionButton>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'var(--space-6)'}}>
              <Button variant="ghost" onClick={()=>setStep(1)} iconLeft={<Icon name="arrow-left" size={16}/>}>Back</Button>
              <Button disabled={subjects.length===0} onClick={()=>setStep(3)} iconRight={<Icon name="arrow-right" size={16}/>}>Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>Step 4 of 4</div>
            <h3 style={{fontSize:'var(--text-h4)',margin:'0 0 var(--space-5)'}}>What do you value most in future work?</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
              {Q3.map(([label])=>(
                <OptionButton key={label} active={value===label} onClick={()=>setValue(label)}>{label}</OptionButton>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'var(--space-6)'}}>
              <Button variant="ghost" onClick={()=>setStep(2)} iconLeft={<Icon name="arrow-left" size={16}/>}>Back</Button>
              <Button disabled={!value} onClick={()=>setStep(4)} iconRight={<Icon name="arrow-right" size={16}/>}>See my shortlist</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="ub-overline" style={{marginBottom:'var(--space-3)'}}>Your shortlist</div>
            <h3 style={{fontSize:'var(--text-h3)',margin:'0 0 var(--space-5)'}}>These five fields fit you best</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
              {top5.map((f,i)=>(
                <div key={f} style={{display:'flex',alignItems:'center',gap:'var(--space-4)',padding:'var(--space-4)',background:'var(--surface-sunken)',borderRadius:'var(--radius-md)'}}>
                  <span style={{fontFamily:'var(--font-display)',fontVariationSettings:'var(--display-variation)',fontWeight:600,fontSize:23,color:'var(--gold-700)',width:28}}>{i+1}</span>
                  <span style={{fontSize:'var(--text-body)',fontWeight:700,color:'var(--text-heading)'}}>{f}</span>
                </div>
              ))}
            </div>
            <Alert tone="info" title="Want to see which universities offer these?" style={{marginTop:'var(--space-6)'}}>Browse the Universities page and filter by any of the fields above.</Alert>
            <div style={{display:'flex',gap:'var(--space-3)',marginTop:'var(--space-6)',flexWrap:'wrap'}}>
              {!sent
                ? <Button onClick={sendResults} iconLeft={<Icon name="mail" size={16}/>}>Email me this shortlist</Button>
                : <Badge tone="success" dot>Opening your email app…</Badge>}
              <Button variant="secondary" onClick={()=>go('universities')}>Browse universities</Button>
              <Button variant="ghost" onClick={()=>go('call')}>Talk it through on a free call</Button>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
Object.assign(window, { QuizScreen });
