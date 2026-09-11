/* CourseData.jsx — shared course database + My Study List store.
   Programmes are real, well-established English-taught degrees at each university.
   Tuition, duration, deadlines and admission requirements change every intake:
   always verify on the official course page linked from each course. */

const COURSE_DB = {
  "University of Amsterdam": {
    finder: "https://www.uva.nl/en/education/programmes.html",
    courses: [
      { name:"BSc Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Broad management degree covering strategy, marketing, finance and organisation, with an international classroom and a semester abroad option.",
        url:"https://www.uva.nl/en/programmes/bachelors/business-administration/business-administration.html" },
      { name:"BSc Economics and Business Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Rigorous economics degree with tracks in economics, finance and business economics, strong in quantitative methods.",
        url:"https://www.uva.nl/en/programmes/bachelors/economics-and-business-economics/economics-and-business-economics.html" },
      { name:"BSc Politics, Psychology, Law and Economics (PPLE)", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"Selective interdisciplinary honours degree combining four social sciences around real-world problems.",
        url:"https://www.uva.nl/en/programmes/bachelors/pple-politics-psychology-law-and-economics/pple.html" },
      { name:"BSc Communication Science", level:"Bachelor", field:"Communication", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study how communication shapes society, from media and persuasion to corporate and political communication.",
        url:"https://www.uva.nl/en/programmes/bachelors/communication-science/communication-science.html" },
      { name:"MSc Data Science", level:"Master", field:"Data Science", duration:"1 year", language:"English", format:"Full-time",
        desc:"Applied data science combining machine learning, statistics and programming with real datasets.",
        url:"https://www.uva.nl/en/programmes/masters/masters-programmes.html" },
      { name:"MSc Business Administration", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"One-year master with specialisation tracks such as strategy, marketing, finance and international management.",
        url:"https://www.uva.nl/en/programmes/masters/masters-programmes.html" }
    ]
  },
  "VU Amsterdam": {
    finder: "https://vu.nl/en/education/bachelor",
    courses: [
      { name:"BSc International Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"International management degree with a global classroom, exchange semester and a broad business foundation.",
        url:"https://vu.nl/en/education/bachelor/international-business-administration" },
      { name:"BSc Computer Science", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Foundations of software, algorithms and systems, with strong ties to Amsterdam's tech and research scene.",
        url:"https://vu.nl/en/education/bachelor/computer-science" },
      { name:"BSc Health and Life Sciences", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study human health from molecule to population, with majors from biomedical sciences to global health.",
        url:"https://vu.nl/en/education/bachelor/health-and-life-sciences" },
      { name:"BSc Law in Society (PPE-style)", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"Understand law in its social and political context rather than as pure legal training.",
        url:"https://vu.nl/en/education/bachelor" },
      { name:"MSc Artificial Intelligence", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Research-oriented AI master spanning machine learning, cognitive systems and intelligent agents.",
        url:"https://vu.nl/en/education/master" },
      { name:"MSc Global Health", level:"Master", field:"Health", duration:"1 year", language:"English", format:"Full-time",
        desc:"Interdisciplinary public and global health master with an international fieldwork component.",
        url:"https://vu.nl/en/education/master" }
    ]
  },
  "Amsterdam UAS (HvA)": {
    finder: "https://www.amsterdamuas.com/study/education/all-programmes-and-courses",
    courses: [
      { name:"BBA International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Practice-oriented business degree with internships and real company projects.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" },
      { name:"BSc Communication and Multimedia Design", level:"Bachelor", field:"Media & Design", duration:"4 years", language:"English", format:"Full-time",
        desc:"Design digital products and interactive media, combining creativity, UX and technology.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" },
      { name:"BEng Aviation", level:"Bachelor", field:"Engineering", duration:"4 years", language:"English", format:"Full-time",
        desc:"Applied aviation engineering and operations degree with strong industry links at Schiphol.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" },
      { name:"BSc Digital Society", level:"Bachelor", field:"Media & Design", duration:"4 years", language:"English", format:"Full-time",
        desc:"Study how digital technology reshapes society, business and everyday life.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" }
    ]
  },
  "Erasmus University Rotterdam": {
    finder: "https://www.eur.nl/en/education/bachelor",
    courses: [
      { name:"BSc International Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Flagship business degree at RSM, one of Europe's leading business schools, with a global cohort.",
        url:"https://www.rsm.nl/bachelor/international-business-administration/" },
      { name:"BSc Economics and Business Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Quantitative economics degree at the Erasmus School of Economics with finance and marketing tracks.",
        url:"https://www.eur.nl/en/ese/education/bachelor/economics-business-economics" },
      { name:"BSc Econometrics and Operations Research", level:"Bachelor", field:"Data Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Maths-heavy degree applying statistics and modelling to economics, finance and logistics.",
        url:"https://www.eur.nl/en/ese/education/bachelor/econometrics-operations-research" },
      { name:"BSc International Bachelor Health Sciences", level:"Bachelor", field:"Health", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study health policy, prevention and healthcare systems from a management perspective.",
        url:"https://www.eur.nl/en/education/bachelor" },
      { name:"MSc Finance & Investments", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Highly ranked finance master at RSM covering corporate finance, investments and markets.",
        url:"https://www.rsm.nl/master/msc-programmes/" },
      { name:"MSc Health Economics, Policy and Law", level:"Master", field:"Health", duration:"1 year", language:"English", format:"Full-time",
        desc:"Interdisciplinary master on how health systems are financed, governed and regulated.",
        url:"https://www.eur.nl/en/education/master" }
    ]
  },
  "Utrecht University": {
    finder: "https://www.uu.nl/en/masters",
    courses: [
      { name:"MSc Applied Data Science", level:"Master", field:"Data Science", duration:"1 year", language:"English", format:"Full-time",
        desc:"Convert a disciplinary background into data science skills applied to real research problems.",
        url:"https://www.uu.nl/en/masters/applied-data-science" },
      { name:"MSc Artificial Intelligence", level:"Master", field:"Data Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Research master combining machine learning, logic and cognitive science.",
        url:"https://www.uu.nl/en/masters" },
      { name:"LLM Public International Law", level:"Master", field:"Law", duration:"1 year", language:"English", format:"Full-time",
        desc:"Advanced legal master on international law, human rights and global governance.",
        url:"https://www.uu.nl/en/masters" },
      { name:"BSc University College Utrecht (Liberal Arts)", level:"Bachelor", field:"Humanities", duration:"3 years", language:"English", format:"Full-time",
        desc:"Selective liberal arts and sciences honours college where you design your own curriculum.",
        url:"https://www.uu.nl/en/organisation/university-college-utrecht" }
    ]
  },
  "TU Delft": {
    finder: "https://www.tudelft.nl/en/education/programmes",
    courses: [
      { name:"BSc Computer Science and Engineering", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Rigorous CS engineering degree spanning software, algorithms, security and systems.",
        url:"https://www.tudelft.nl/en/education/programmes/bachelors/cse/bsc-computer-science-and-engineering" },
      { name:"BSc Aerospace Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"World-renowned aerospace degree covering aerodynamics, structures and flight.",
        url:"https://www.tudelft.nl/en/education/programmes/bachelors/ae/bsc-aerospace-engineering" },
      { name:"BSc Applied Earth Sciences", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study the subsurface for energy, water and raw materials with a strong engineering base.",
        url:"https://www.tudelft.nl/en/education/programmes/bachelors" },
      { name:"BSc Architecture (Bouwkunde)", level:"Bachelor", field:"Architecture", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design-led architecture and built-environment degree at a top-ranked faculty.",
        url:"https://www.tudelft.nl/en/education/programmes/bachelors" },
      { name:"MSc Computer Science", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Specialise in areas like data science, cyber security, software technology or AI.",
        url:"https://www.tudelft.nl/en/education/programmes/masters" },
      { name:"MSc Robotics", level:"Master", field:"Engineering", duration:"2 years", language:"English", format:"Full-time",
        desc:"Interdisciplinary robotics master spanning mechanics, control and intelligent systems.",
        url:"https://www.tudelft.nl/en/education/programmes/masters" }
    ]
  },
  "Leiden University": {
    finder: "https://www.universiteitleiden.nl/en/education/study-programmes",
    courses: [
      { name:"BA International Studies", level:"Bachelor", field:"Humanities", duration:"3 years", language:"English", format:"Full-time",
        desc:"Combine a world region, a language and the social sciences to understand global affairs.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/international-studies" },
      { name:"LLB International Business Law / Law", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"English-taught legal degree with international and comparative focus.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes" },
      { name:"BSc Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"Scientific study of behaviour and the mind, with specialisations from clinical to cognitive.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/psychology" },
      { name:"BSc Life Science and Technology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"Molecular and cellular life sciences with a strong lab and technology component.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes" },
      { name:"MSc International Relations", level:"Master", field:"International Relations", duration:"1 year", language:"English", format:"Full-time",
        desc:"Advanced study of diplomacy, security and global political economy.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes" }
    ]
  },
  "University of Groningen": {
    finder: "https://www.rug.nl/education/bachelor/",
    courses: [
      { name:"BSc International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Broad international management degree with exchange and specialisation options.",
        url:"https://www.rug.nl/bachelors/international-business/" },
      { name:"BSc Biology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"From ecology to molecular biology, with strong research training.",
        url:"https://www.rug.nl/bachelors/biology/" },
      { name:"BSc Artificial Intelligence", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Blend of computer science, cognitive science and mathematics.",
        url:"https://www.rug.nl/bachelors/artificial-intelligence/" },
      { name:"BA Arts, Culture and Media", level:"Bachelor", field:"Arts", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study film, music, theatre and visual culture with a critical, analytical lens.",
        url:"https://www.rug.nl/bachelors/" }
    ]
  },
  "Eindhoven University of Technology": {
    finder: "https://www.tue.nl/en/education/study-at-tue-ec/bachelor-college",
    courses: [
      { name:"BSc Computer Science and Engineering", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Software, data and systems engineering at a leading Dutch tech university.",
        url:"https://www.tue.nl/en/education/study-at-tue-ec/bachelor-college/bachelor-programs/computer-science-and-engineering" },
      { name:"BSc Data Science", level:"Bachelor", field:"Data Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Joint TU/e-Tilburg degree combining maths, computing and business analytics.",
        url:"https://www.tue.nl/en/education/study-at-tue-ec/bachelor-college/bachelor-programs/data-science" },
      { name:"BSc Mechanical Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design and build machines and systems, from automotive to high-tech manufacturing.",
        url:"https://www.tue.nl/en/education/study-at-tue-ec/bachelor-college/bachelor-programs/mechanical-engineering" },
      { name:"BSc Industrial Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Optimise processes, logistics and operations where engineering meets management.",
        url:"https://www.tue.nl/en/education/study-at-tue-ec/bachelor-college" },
      { name:"MSc Data Science and Artificial Intelligence", level:"Master", field:"Data Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Advanced master in machine learning, data engineering and AI systems.",
        url:"https://www.tue.nl/en/education/graduate-school/masters-programs" }
    ]
  },
  "Tilburg University": {
    finder: "https://www.tilburguniversity.edu/education/bachelors-programs",
    courses: [
      { name:"BSc Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Strong economics degree with behavioural and policy emphasis.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/economics" },
      { name:"BSc Data Science", level:"Bachelor", field:"Data Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Joint Tilburg-TU/e programme blending analytics, computing and social impact.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/data-science" },
      { name:"BSc Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"Behavioural science degree with clinical, social and economic psychology tracks.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/psychology" },
      { name:"MSc Marketing Management", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Analytics-driven marketing master with a strong quantitative core.",
        url:"https://www.tilburguniversity.edu/education/masters-programs" }
    ]
  },
  "Maastricht University": {
    finder: "https://www.maastrichtuniversity.nl/education/bachelor",
    courses: [
      { name:"BSc International Business", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Taught through Problem-Based Learning in small groups, highly international.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/bachelor-international-business" },
      { name:"BA European Studies", level:"Bachelor", field:"International Relations", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study European politics, law, economics and history in an interdisciplinary way.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/bachelor-european-studies" },
      { name:"BSc Health Sciences", level:"Bachelor", field:"Health", duration:"3 years", language:"English", format:"Full-time",
        desc:"Broad health degree covering policy, prevention, biology and health promotion.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/bachelor-health-sciences" },
      { name:"BSc International Business (Economics track)", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Economics-focused pathway within Maastricht's international business school.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor" },
      { name:"MSc International Business", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Specialisation-based business master with strong employability focus.",
        url:"https://www.maastrichtuniversity.nl/education/master" }
    ]
  },
  "Radboud University": {
    finder: "https://www.ru.nl/en/education/bachelors",
    courses: [
      { name:"BSc Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"Research-led psychology degree linked to the Donders brain institute.",
        url:"https://www.ru.nl/en/education/bachelors/psychology" },
      { name:"BSc Artificial Intelligence", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Cognitive-science-flavoured AI degree combining computing, neuroscience and logic.",
        url:"https://www.ru.nl/en/education/bachelors/artificial-intelligence" },
      { name:"BSc Biology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"From molecules to ecosystems, with strong lab and fieldwork.",
        url:"https://www.ru.nl/en/education/bachelors/biology" },
      { name:"BA International Business Communication", level:"Bachelor", field:"Communication", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study communication across languages and cultures in a business context.",
        url:"https://www.ru.nl/en/education/bachelors" }
    ]
  },
  "Wageningen University": {
    finder: "https://www.wur.nl/en/education/bachelor.htm",
    courses: [
      { name:"BSc Food Technology", level:"Bachelor", field:"Environment & Food", duration:"3 years", language:"English", format:"Full-time",
        desc:"Science of food production, safety and innovation at the world's top agri-food university.",
        url:"https://www.wur.nl/en/education/bachelor.htm" },
      { name:"BSc Environmental Sciences", level:"Bachelor", field:"Environment & Food", duration:"3 years", language:"English", format:"Full-time",
        desc:"Tackle climate, water and ecosystems with an interdisciplinary science base.",
        url:"https://www.wur.nl/en/education/bachelor.htm" },
      { name:"BSc Biotechnology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"Apply biology and chemistry to health, food and sustainable production.",
        url:"https://www.wur.nl/en/education/bachelor.htm" },
      { name:"MSc Food Technology", level:"Master", field:"Environment & Food", duration:"2 years", language:"English", format:"Full-time",
        desc:"Advanced food science and engineering with specialisation tracks.",
        url:"https://www.wur.nl/en/education/master.htm" }
    ]
  },
  "University of Twente": {
    finder: "https://www.utwente.nl/en/education/bachelor/",
    courses: [
      { name:"BSc Technical Computer Science", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Software, networks and intelligent systems with hands-on project learning.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/technical-computer-science/" },
      { name:"BSc Mechanical Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design and build machines and systems, strong in high-tech and robotics.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/mechanical-engineering/" },
      { name:"BSc International Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Technology-oriented business degree bridging management and engineering.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/international-business-administration/" },
      { name:"BSc Creative Technology", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design smart, interactive products where engineering meets creativity.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/creative-technology/" },
      { name:"MSc Computer Science", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Specialise in areas like data science, cyber security or software technology.",
        url:"https://www.utwente.nl/en/education/master/" }
    ]
  },
  "The Hague UAS": {
    finder: "https://www.thehagueuniversity.com/study-choice/bachelors",
    courses: [
      { name:"BA International Communication Management", level:"Bachelor", field:"Media & Design", duration:"4 years", language:"English", format:"Full-time",
        desc:"Practice-led degree in cross-cultural corporate communication and PR.",
        url:"https://www.thehagueuniversity.com/study-choice/bachelors" },
      { name:"BSc International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Hands-on international business degree with internships and company projects.",
        url:"https://www.thehagueuniversity.com/study-choice/bachelors" },
      { name:"BA International and European Law", level:"Bachelor", field:"International Relations", duration:"4 years", language:"English", format:"Full-time",
        desc:"Applied law degree set in the international-law capital, The Hague.",
        url:"https://www.thehagueuniversity.com/study-choice/bachelors" },
      { name:"BA Safety and Security Management Studies", level:"Bachelor", field:"International Relations", duration:"4 years", language:"English", format:"Full-time",
        desc:"Study global security, crisis management and governance.",
        url:"https://www.thehagueuniversity.com/study-choice/bachelors" }
    ]
  },
  "Rotterdam UAS": {
    finder: "https://www.rotterdamuas.com/programmes/",
    courses: [
      { name:"BSc International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Applied international business degree with internships in the Rotterdam port economy.",
        url:"https://www.rotterdamuas.com/programmes/" },
      { name:"BEng Mechanical Engineering", level:"Bachelor", field:"Engineering", duration:"4 years", language:"English", format:"Full-time",
        desc:"Hands-on engineering degree with strong industry placement.",
        url:"https://www.rotterdamuas.com/programmes/" },
      { name:"BSc Physiotherapy", level:"Bachelor", field:"Health", duration:"4 years", language:"English", format:"Full-time",
        desc:"Clinical health degree training physiotherapists with practical placements.",
        url:"https://www.rotterdamuas.com/programmes/" }
    ]
  }
};

// ---- flat list of all courses, each tagged with its university ----
const ALL_COURSES = Object.entries(COURSE_DB).flatMap(([uni, data]) =>
  data.courses.map((c, i) => ({ ...c, uni, id: uni + "::" + c.name, cid: uni + "::" + i }))
);

function coursesFor(uni) {
  return (COURSE_DB[uni] && COURSE_DB[uni].courses) || [];
}
function finderFor(uni) {
  return (COURSE_DB[uni] && COURSE_DB[uni].finder) || "#";
}

// ---- My Study List: browser-only persistence (localStorage) ----
const UB_LIST_KEY = "ub_study_list_v1";
const UB_LIST_EVENT = "ub-study-list-change";

function readStudyList() {
  try { return JSON.parse(localStorage.getItem(UB_LIST_KEY) || "[]"); }
  catch (e) { return []; }
}
function writeStudyList(items) {
  try { localStorage.setItem(UB_LIST_KEY, JSON.stringify(items)); } catch (e) {}
  try { window.dispatchEvent(new CustomEvent(UB_LIST_EVENT)); } catch (e) {}
}
function studyListId(uni, courseName) { return uni + "::" + courseName; }
function inStudyList(uni, courseName) {
  return readStudyList().some(it => it.id === studyListId(uni, courseName));
}
function addToStudyList(item) {
  // item: { uni, name, level, field, duration, language, url }
  const items = readStudyList();
  const id = studyListId(item.uni, item.name);
  if (items.some(it => it.id === id)) return false; // already there, no duplicate
  items.push({ ...item, id, added: Date.now() });
  writeStudyList(items);
  return true;
}
function removeFromStudyList(id) {
  writeStudyList(readStudyList().filter(it => it.id !== id));
}
function clearStudyList() { writeStudyList([]); }

// React hook so any component re-renders when the list changes (even across tabs)
function useStudyList() {
  const [items, setItems] = React.useState(readStudyList());
  React.useEffect(() => {
    const refresh = () => setItems(readStudyList());
    window.addEventListener(UB_LIST_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(UB_LIST_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return items;
}

Object.assign(window, {
  COURSE_DB, ALL_COURSES, coursesFor, finderFor,
  readStudyList, writeStudyList, inStudyList, addToStudyList,
  removeFromStudyList, clearStudyList, useStudyList, studyListId
});
