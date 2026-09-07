const { Card, Button, Field, Input, Select, Radio, Checkbox, Textarea, Stepper, Alert, Toast, Icon, Badge } = window.UnibridgeNLDesignSystem_3cb2d1;

const COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica","Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe","Other"];

function ApplyScreen({ go }) {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [country, setCountry] = React.useState("Ghana");
  const [diploma, setDiploma] = React.useState("Secondary school");

  const [level, setLevel] = React.useState("Master");
  const [intake, setIntake] = React.useState("September 2027");
  const [field, setField] = React.useState("Data Science");
  const [budget, setBudget] = React.useState("€600 – €800");
  const [notes, setNotes] = React.useState("");

  const [wantEnrolment, setWantEnrolment] = React.useState(true);
  const [wantHousing, setWantHousing] = React.useState(true);
  const [wantVisa, setWantVisa] = React.useState(false);
  const [wantArrival, setWantArrival] = React.useState(false);
  const [agreePrivacy, setAgreePrivacy] = React.useState(false);

  const steps = [{label:"About you",meta:"2 min"},{label:"Study plan",meta:"1 min"},{label:"Services",meta:"30 sec"}];

  const canSend = firstName && lastName && email.includes('@') && agreePrivacy;

  const submitApplication = async () => {
    if (!canSend) return;
    setSending(true);
    setError(false);
    try {
      const services = [
        wantEnrolment && "University enrolment",
        wantHousing && "Housing via partner agency",
        wantVisa && "Visa & BSN",
        wantArrival && "Arrival week"
      ].filter(Boolean).join(", ");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "a828545d-4f6f-4f85-8ddf-888a55281203",
          subject: "New application — UniBridge NL",
          from_name: "UniBridge NL website",
          email: email,
          "First name": firstName,
          "Last name": lastName,
          "Applicant email": email,
          "WhatsApp": whatsapp,
          "Country of citizenship": country,
          "Highest diploma": diploma,
          "Study level": level,
          "Intake": intake,
          "Study field": field,
          "Monthly rent budget": budget,
          "Notes": notes,
          "Services requested": services
        })
      });
      const data = await res.json();
      if (data.success) { setSent(true); } else { setError(true); }
    } catch (e) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <main style={{maxWidth:960,margin:'0 auto',padding:'var(--space-12) var(--gutter-inline) 0'}}>
      <div className="ub-overline">Free application</div>
      <h1 style={{fontSize:'var(--text-h1)',margin:'var(--space-3) 0 var(--space-2)'}}>Let's map your route</h1>
      <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'54ch'}}>Three short steps. An advisor replies within one working day with a shortlist and the real costs.</p>

      <Stepper current={step} steps={steps} style={{margin:'var(--space-10) 0 var(--space-8)'}}/>

      <Card padding="var(--space-8)">
        {step === 0 && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-5)'}}>
            <Field label="First name" required><Input placeholder="Jane" value={firstName} onChange={e=>setFirstName(e.target.value)}/></Field>
            <Field label="Last name" required><Input placeholder="Doe" value={lastName} onChange={e=>setLastName(e.target.value)}/></Field>
            <Field label="Email" required hint="We reply here — check your spam folder once."><Input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></Field>
            <Field label="WhatsApp number"><Input type="tel" placeholder="+233 …" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)}/></Field>
            <Field label="Country of citizenship" required><Select value={country} onChange={e=>setCountry(e.target.value)} options={COUNTRIES}/></Field>
            <Field label="Highest diploma" required><Select value={diploma} onChange={e=>setDiploma(e.target.value)} options={["Secondary school","Bachelor","Master"]}/></Field>
          </div>
        )}
        {step === 1 && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-5)'}}>
            <Field label="Study level" required><Radio name="lvl" value={level} onChange={setLevel} options={["Bachelor","Master","Exchange"]}/></Field>
            <Field label="Intake" required><Radio name="intake" value={intake} onChange={setIntake} options={["September 2027","February 2028","Not sure yet"]}/></Field>
            <Field label="Study field" required><Select value={field} onChange={e=>setField(e.target.value)} options={["Business & Economics","Computer Science","Data Science","Engineering","Architecture","Law","International Relations","Health & Medicine","Life Sciences","Psychology","Humanities","Communication","Media & Design","Environment & Food","Arts"]}/></Field>
            <Field label="Monthly budget for rent" hint="Amsterdam averages €950 for a studio; nearby cities are cheaper."><Select value={budget} onChange={e=>setBudget(e.target.value)} options={["Under €600","€600 – €800","€800 – €1,000","Over €1,000"]}/></Field>
            <Field label="Anything we should know?" style={{gridColumn:'1 / -1'}}><Textarea rows={3} placeholder="Scholarships you're applying for, family in NL, health needs…" value={notes} onChange={e=>setNotes(e.target.value)}/></Field>
          </div>
        )}
        {step === 2 && (
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
            <Alert tone="warning" title="September deadlines close 1 May">Nine weeks left. Applications filed after 15 April get a rush fee from the university, not from us.</Alert>
            <Checkbox checked={wantEnrolment} onChange={setWantEnrolment} label="University enrolment" description="Up to five applications, documents certified and filed."/>
            <Checkbox checked={wantHousing} onChange={setWantHousing} label="Housing via our partner agency" description="We refer you to a licensed intermediary and check the contract. We don't own or guarantee the rooms."/>
            <Checkbox checked={wantVisa} onChange={setWantVisa} label="Visa & BSN" description="Residence permit paperwork and a booked municipality appointment."/>
            <Checkbox checked={wantArrival} onChange={setWantArrival} label="Arrival week" description="Bike, SIM card, neighbourhood walk."/>
            <Checkbox checked={agreePrivacy} onChange={setAgreePrivacy} label="I agree to the privacy statement" description="We share documents only with the universities you pick."/>
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'var(--space-8)',borderTop:'1px solid var(--border-hairline)',paddingTop:'var(--space-5)'}}>
          <Button variant="ghost" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))} iconLeft={<Icon name="arrow-left" size={16}/>}>Back</Button>
          <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>Step {step+1} of 3 · nothing is charged today</span>
          {step < 2
            ? <Button onClick={()=>setStep(s=>s+1)} iconRight={<Icon name="arrow-right" size={16}/>}>Continue</Button>
            : <Button onClick={submitApplication} disabled={sending || !canSend}>{sending ? "Sending…" : "Send my application"}</Button>}
        </div>
        {step === 2 && !agreePrivacy && <p style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)',textAlign:'right',marginTop:'var(--space-3)'}}>Agree to the privacy statement to send.</p>}
        {error && <Alert tone="warning" title="Something went wrong sending your application" style={{marginTop:'var(--space-5)'}}>Please try again, or reach us directly on WhatsApp 06 25 29 40 80.</Alert>}
      </Card>

      <div style={{display:'flex',gap:'var(--space-6)',margin:'var(--space-6) 0 0',fontSize:'var(--text-body-sm)',color:'var(--text-muted)'}}>
        <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Icon name="shield-check" size={16} color="var(--moss-500)"/>Documents encrypted, deleted on request</span>
        <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Icon name="clock" size={16} color="var(--moss-500)"/>Answer within 1 working day</span>
        <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Icon name="message-circle" size={16} color="var(--moss-500)"/>Or WhatsApp 06 25 29 40 80</span>
      </div>

      {sent && <div style={{position:'fixed',right:24,bottom:24,zIndex:50}}><Toast tone="success" title="Application sent" message="Harsh Raj, your advisor in Amsterdam, will reply by tomorrow afternoon." onClose={()=>setSent(false)}/></div>}
    </main>
  );
}
Object.assign(window, { ApplyScreen });
