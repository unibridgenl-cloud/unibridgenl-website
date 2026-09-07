const { Card, Button, Field, Input, Select, Radio, Checkbox, Textarea, Stepper, Alert, Toast, Icon, Badge } = window.UnibridgeNLDesignSystem_3cb2d1;

function ApplyScreen({ go }) {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const steps = [{label:"About you",meta:"2 min"},{label:"Study plan",meta:"1 min"},{label:"Services",meta:"30 sec"}];
  return (
    <main style={{maxWidth:960,margin:'0 auto',padding:'var(--space-12) var(--gutter-inline) 0'}}>
      <div className="ub-overline">Free application</div>
      <h1 style={{fontSize:'var(--text-h1)',margin:'var(--space-3) 0 var(--space-2)'}}>Let's map your route</h1>
      <p style={{fontSize:'var(--text-body-lg)',color:'var(--text-muted)',maxWidth:'54ch'}}>Three short steps. An advisor replies within one working day with a shortlist and the real costs.</p>

      <Stepper current={step} steps={steps} style={{margin:'var(--space-10) 0 var(--space-8)'}}/>

      <Card padding="var(--space-8)">
        {step === 0 && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-5)'}}>
            <Field label="First name" required><Input defaultValue="Amara"/></Field>
            <Field label="Last name" required><Input defaultValue="Osei"/></Field>
            <Field label="Email" required hint="We reply here — check your spam folder once."><Input type="email" defaultValue="amara.osei@mail.com"/></Field>
            <Field label="WhatsApp number"><Input type="tel" placeholder="+233 …"/></Field>
            <Field label="Country of citizenship" required><Select defaultValue="Ghana" options={["Ghana","India","Türkiye","Brazil","Nigeria","Other"]}/></Field>
            <Field label="Highest diploma" required><Select defaultValue="Secondary school" options={["Secondary school","Bachelor","Master"]}/></Field>
          </div>
        )}
        {step === 1 && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-5)'}}>
            <Field label="Study level" required><Radio name="lvl" defaultValue="Master" options={["Bachelor","Master","Exchange"]}/></Field>
            <Field label="Intake" required><Radio name="intake" defaultValue="September 2027" options={["September 2027","February 2028","Not sure yet"]}/></Field>
            <Field label="Study field" required><Select defaultValue="Data Science" options={["Business & Economics","Computer Science","Data Science","Engineering","Architecture","Law","International Relations","Health & Medicine","Life Sciences","Psychology","Humanities","Communication","Media & Design","Environment & Food","Arts"]}/></Field>
            <Field label="Monthly budget for rent" hint="Amsterdam averages €950 for a studio; nearby cities are cheaper."><Select defaultValue="€600 – €800" options={["Under €600","€600 – €800","€800 – €1,000","Over €1,000"]}/></Field>
            <Field label="Anything we should know?" style={{gridColumn:'1 / -1'}}><Textarea rows={3} placeholder="Scholarships you're applying for, family in NL, health needs…"/></Field>
          </div>
        )}
        {step === 2 && (
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
            <Alert tone="warning" title="September deadlines close 1 May">Nine weeks left. Applications filed after 15 April get a rush fee from the university, not from us.</Alert>
            <Checkbox defaultChecked label="University enrolment" description="Up to five applications, documents certified and filed."/>
            <Checkbox defaultChecked label="Housing via our partner agency" description="We refer you to a licensed intermediary and check the contract. We don't own or guarantee the rooms."/>
            <Checkbox label="Visa & BSN" description="Residence permit paperwork and a booked municipality appointment."/>
            <Checkbox label="Arrival week" description="Airport pickup, bike, SIM card, neighbourhood walk."/>
            <Checkbox label="I agree to the privacy statement" description="We share documents only with the universities you pick."/>
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'var(--space-8)',borderTop:'1px solid var(--border-hairline)',paddingTop:'var(--space-5)'}}>
          <Button variant="ghost" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))} iconLeft={<Icon name="arrow-left" size={16}/>}>Back</Button>
          <span style={{fontSize:'var(--text-caption)',color:'var(--text-subtle)'}}>Step {step+1} of 3 · nothing is charged today</span>
          {step < 2
            ? <Button onClick={()=>setStep(s=>s+1)} iconRight={<Icon name="arrow-right" size={16}/>}>Continue</Button>
            : <Button onClick={()=>setSent(true)}>Send my application</Button>}
        </div>
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
