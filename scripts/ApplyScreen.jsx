const { Card, Button, Field, Input, Select, Radio, Checkbox, Textarea, Stepper, Alert, Toast, Icon, Badge } = window.UnibridgeNLDesignSystem_3cb2d1;
const { PageHero, Reveal, Rise, Stagger, Magnetic } = window;

const WEB3FORMS_KEY = "a828545d-4f6f-4f85-8ddf-888a55281203";

const COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica","Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe","Other"];

function ApplyScreen({ go }) {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [country, setCountry] = React.useState("India");
  const [diploma, setDiploma] = React.useState("Secondary school");

  const [studyLevel, setStudyLevel] = React.useState("Master");
  const [intake, setIntake] = React.useState("September 2027");
  const [studyField, setStudyField] = React.useState("Data Science");
  const [budget, setBudget] = React.useState("€600 – €800");
  const [notes, setNotes] = React.useState("");

  const [svcEnrolment, setSvcEnrolment] = React.useState(true);
  const [svcHousing, setSvcHousing] = React.useState(true);
  const [svcVisa, setSvcVisa] = React.useState(false);
  const [svcArrival, setSvcArrival] = React.useState(false);
  /* Under-18s cannot validly enter this agreement themselves, so we flag it at
     intake and contract with the parent or legal guardian instead. */
  const [underEighteen, setUnderEighteen] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);

  const steps = [{label:"About you",meta:"2 min"},{label:"Study plan",meta:"1 min"},{label:"Services",meta:"30 sec"}];

  const submit = async () => {
    setSubmitting(true);
    setError(false);
    const services = [
      svcEnrolment && "University enrolment",
      svcHousing && "Housing via a licensed letting agency",
      svcVisa && "Visa & BSN",
      svcArrival && "Arrival week"
    ].filter(Boolean).join(", ") || "None selected";
    const message = `New application via unibridgenl.com

Name: ${firstName} ${lastName}
Email: ${email}
WhatsApp: ${whatsapp || "Not provided"}
Country of citizenship: ${country}
Under 18 at intake: ${underEighteen ? "YES, refer out, we do not take minors" : "No"}
Highest diploma: ${diploma}

Study level: ${studyLevel}
Intake: ${intake}
Study field: ${studyField}
Monthly rent budget: ${budget}
Notes: ${notes || "Not provided"}

Requested services: ${services}
Privacy statement agreed: ${agreed ? "Yes" : "No"}`;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New application: ${firstName} ${lastName}`,
          from_name: `${firstName} ${lastName}`.trim() || "UniBridge NL website",
          email: email,
          message: message
        })
      });
      const data = await res.json();
      if (data.success) { setSent(true); } else { setError(true); }
    } catch (e) {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <PageHero overline="Free application" tone="moss" title="Let's map your route"
        lead="Three short steps. An advisor replies within one working day with a shortlist and the real costs."/>

      <div style={{maxWidth:960,margin:'0 auto',padding:'var(--space-10) var(--gutter-inline) 0'}}>
      <Rise delay={80}><Stepper current={step} steps={steps} style={{margin:'0 0 var(--space-8)'}}/></Rise>

      <Reveal y={18}>
      <Card padding="var(--space-8)">
        <div key={step} className="ub-page">
        {step === 0 && (
          <div className="ub-stagger" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'var(--space-5)'}}>
            <Field label="First name" required><Input placeholder="Your first name" value={firstName} onChange={e=>setFirstName(e.target.value)}/></Field>
            <Field label="Last name" required><Input placeholder="Your last name" value={lastName} onChange={e=>setLastName(e.target.value)}/></Field>
            <Field label="Email" required hint="We reply here, so check your spam folder once."><Input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
            <Field label="WhatsApp number"><Input type="tel" placeholder="+31 6 …" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)}/></Field>
            <Field label="Country of citizenship" required><Select value={country} onChange={e=>setCountry(e.target.value)} options={COUNTRIES}/></Field>
            <Field label="Highest diploma" required><Select value={diploma} onChange={e=>setDiploma(e.target.value)} options={["Secondary school","Bachelor","Master"]}/></Field>
          </div>
        )}
        {step === 1 && (
          <div className="ub-stagger" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'var(--space-5)'}}>
            <Field label="Study level" required><Radio name="lvl" value={studyLevel} onChange={e=>setStudyLevel(e.target.value)} options={["Bachelor","Master","Exchange"]}/></Field>
            <Field label="Intake" required><Radio name="intake" value={intake} onChange={e=>setIntake(e.target.value)} options={["September 2027","February 2028","Not sure yet"]}/></Field>
            <Field label="Study field" required><Select value={studyField} onChange={e=>setStudyField(e.target.value)} options={["Business & Economics","Computer Science","Data Science","Engineering","Architecture","Law","International Relations","Health & Medicine","Life Sciences","Psychology","Humanities","Communication","Media & Design","Environment & Food","Arts"]}/></Field>
            <Field label="Monthly budget for rent" hint="Amsterdam averages €950 for a studio; nearby cities are cheaper."><Select value={budget} onChange={e=>setBudget(e.target.value)} options={["Under €600","€600 – €800","€800 – €1,000","Over €1,000"]}/></Field>
            <Field label="Anything we should know?" style={{gridColumn:'1 / -1'}}><Textarea rows={3} placeholder="Scholarships you're applying for, family in NL, health needs…" value={notes} onChange={e=>setNotes(e.target.value)}/></Field>
          </div>
        )}
        {step === 2 && (
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
            <Stagger step={80} y={14}>
            <Alert tone="warning" title="September deadlines close 1 May">Nine weeks left. Applications filed after 15 April get a rush fee from the university, not from us.</Alert>
            <Checkbox checked={svcEnrolment} onChange={e=>setSvcEnrolment(e.target.checked)} label="University enrolment" description="Up to five applications, documents certified and filed."/>
            <Checkbox checked={svcHousing} onChange={e=>setSvcHousing(e.target.checked)} label="Housing via a licensed letting agency" description="We refer you to a licensed intermediary and check the contract. We don't own or guarantee the rooms."/>
            <Checkbox checked={svcVisa} onChange={e=>setSvcVisa(e.target.checked)} label="Visa & BSN" description="Residence permit paperwork and a booked municipality appointment."/>
            <Checkbox checked={svcArrival} onChange={e=>setSvcArrival(e.target.checked)} label="Arrival week" description="Bike, SIM card, neighbourhood walk."/>
            <Checkbox checked={underEighteen} onChange={e=>setUnderEighteen(e.target.checked)} label="I will be under 18 when my course starts" description="We only take students who are 18 or over on their first day, because universities require a formal guardianship arrangement for minors and that is not something we arrange. Tick this anyway. We will tell you what your university needs and point you to someone who can help, at no cost."/>
            <Checkbox checked={agreed} onChange={e=>setAgreed(e.target.checked)} label="I agree to the privacy statement" description="We share documents only with the universities you pick."/>
            <a onClick={()=>go('privacy')} style={{cursor:'pointer',fontSize:'var(--text-body-sm)',color:'var(--text-link)',textDecoration:'underline',marginLeft:32}}>Read our privacy statement</a>
            </Stagger>
          </div>
        )}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-3)',justifyContent:'space-between',alignItems:'center',marginTop:'var(--space-8)',borderTop:'1px solid var(--border-hairline)',paddingTop:'var(--space-5)'}}>
          <Button variant="ghost" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))} iconLeft={<Icon name="arrow-left" size={16}/>}>Back</Button>
          <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>Step {step+1} of 3 · nothing is charged today</span>
          {step < 2
            ? <Magnetic strength={0.18}><Button disabled={step===0 && (!firstName || !lastName || !email.includes('@'))} onClick={()=>setStep(s=>s+1)} iconRight={<Icon name="arrow-right" size={16}/>}>Continue</Button></Magnetic>
            : <Magnetic strength={0.18}><Button disabled={!agreed || submitting} onClick={submit}>{submitting ? "Sending…" : "Send my application"}</Button></Magnetic>}
        </div>
        {error && <Alert tone="warning" title="Something went wrong" style={{marginTop:'var(--space-5)'}}>Your application didn't send. Please try again, or WhatsApp us directly at 06 25 29 40 80.</Alert>}
      </Card>
      </Reveal>

      <Reveal delay={120} y={14}>
      <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-4) var(--space-6)',margin:'var(--space-6) 0 0',fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>
        <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Icon name="shield-check" size={16} color="var(--moss-500)"/>Documents encrypted, deleted on request</span>
        <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Icon name="clock" size={16} color="var(--moss-500)"/>Answer within 1 working day</span>
        <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Icon name="message-circle" size={16} color="var(--moss-500)"/>Or WhatsApp 06 25 29 40 80</span>
      </div>
      </Reveal>
      </div>

      {sent && <div style={{position:'fixed',right:24,bottom:24,zIndex:50}}><Toast tone="success" title="Application sent" message="Harsh Raj, your advisor in Amsterdam, will reply by tomorrow afternoon." onClose={()=>setSent(false)}/></div>}
    </main>
  );
}
Object.assign(window, { ApplyScreen });
