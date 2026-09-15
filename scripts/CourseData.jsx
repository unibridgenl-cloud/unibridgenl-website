/* CourseData.jsx — shared course database + My Study List store.
   Programmes are real, well-established English-taught degrees at each university.
   Tuition, duration, deadlines and admission requirements change every intake:
   always verify on the official course page linked from each course. */

const COURSE_DB = {
  "University of Amsterdam": {
    finder: "https://www.uva.nl/en/education/education.html",
    courses: [
      { name:"BSc Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Broad management degree covering strategy, marketing, finance and organisation, with an international classroom and a semester abroad option.",
        url:"https://www.uva.nl/en/programmes/bachelors/business-administration/business-administration.html" },
      { name:"BSc Communication Science", level:"Bachelor", field:"Communication", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study how communication shapes society, from media and persuasion to corporate and political communication.",
        url:"https://www.uva.nl/en/programmes/bachelors/communication-science/communication-science.html" },
      { name:"BSc Economics and Business Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Rigorous economics degree with tracks in economics, finance and business economics, strong in quantitative methods.",
        url:"https://www.uva.nl/en/programmes/bachelors/economics--business-economics/economics--business-economics.html" },
      { name:"BSc Politics, Psychology, Law and Economics (PPLE)", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"Selective interdisciplinary honours degree combining four social sciences around real-world problems.",
        url:"https://www.uva.nl/en/programmes/bachelors/politics-psychology-law-and-economics/politics-psychology-law-and-economics.html" },
      { name:"BSc Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"How people think, feel and behave, with a strong grounding in research methods and statistics. Students choose from several specialisation tracks in the later years.",
        url:"https://www.uva.nl/en/programmes/bachelors/psychology/psychology.html" },
      { name:"LLM International and European Law", level:"Master", field:"Law", duration:"1 year", language:"English", format:"Full-time",
        desc:"How international and European legal frameworks handle cross-border problems. Four tracks, from EU competition law to public international law.",
        url:"https://www.uva.nl/en/programmes/masters/international-and-european-law/international-and-european-law.html" },
      { name:"MSc Artificial Intelligence", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"A technical, research-oriented master run jointly with VU Amsterdam. Covers machine learning, computer vision, natural language processing and multi-agent systems.",
        url:"https://www.uva.nl/en/programmes/masters/artificial-intelligence/artificial-intelligence.html" },
      { name:"MSc Business Administration", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"One-year master with specialisation tracks such as strategy, marketing, finance and international management.",
        url:"https://www.uva.nl/en/programmes/masters/business-administration/business-administration.html" },
      { name:"MSc Data Science and Business Analytics", level:"Master", field:"Data Science", duration:"1 year", language:"English", format:"Full-time",
        desc:"Applied data science combining machine learning, statistics and programming with real datasets.",
        url:"https://www.uva.nl/en/programmes/masters/data-science-and-business-analytics-data-science/data-science-and-business-analytics-data-science.html" },
    ]
  },
  "VU Amsterdam": {
    finder: "https://vu.nl/en/education/bachelor/programmes",
    courses: [
      { name:"BSc Computer Science", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Foundations of software, algorithms and systems, with strong ties to Amsterdam's tech and research scene.",
        url:"https://vu.nl/en/education/bachelor/computer-science" },
      { name:"BSc International Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"International management degree with a global classroom, exchange semester and a broad business foundation.",
        url:"https://vu.nl/en/education/bachelor/international-business-administration" },
      { name:"BSc Law in Society (PPE-style)", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"Understand law in its social and political context rather than as pure legal training.",
        url:"https://vu.nl/en/education/bachelor" },
      { name:"LLM International Business Law", level:"Master", field:"Law", duration:"1 year", language:"English", format:"Full-time",
        desc:"International trade, investment and corporate law, worked through with real cases from international business.",
        url:"https://vu.nl/en/education/master/international-business-law" },
      { name:"MSc Artificial Intelligence", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Research-oriented AI master spanning machine learning, cognitive systems and intelligent agents.",
        url:"https://vu.nl/en/education/master" },
      { name:"MSc Global Health", level:"Master", field:"Health", duration:"1 year", language:"English", format:"Full-time",
        desc:"Interdisciplinary public and global health master with an international fieldwork component.",
        url:"https://vu.nl/en/education/master" },
      { name:"MSc Management, Policy Analysis and Entrepreneurship in Health and Life Sciences", level:"Master", field:"Health", duration:"2 years", language:"English", format:"Full-time",
        desc:"Health policy analysis, management and entrepreneurship in one interdisciplinary master, covering eHealth, patient-centred care and how health systems are governed.",
        url:"https://vu.nl/en/education/master/management-policy-analysis-and-entrepreneurship-in-the-health-life-sciences" },
    ]
  },
  "Amsterdam UAS (HvA)": {
    finder: "https://www.amsterdamuas.com/study/education/all-programmes-and-courses",
    courses: [
      { name:"BA Fashion and Textile Technologies", level:"Bachelor", field:"Media & Design", duration:"4 years", language:"English", format:"Full-time",
        desc:"The Amsterdam Fashion Institute programme, covering garment design and production, branding and fashion management, with graduation tracks in each.",
        url:"https://www.amsterdamuas.com/programmes/amfi-amsterdam-fashion-institute-en" },
      { name:"BBA International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Practice-oriented business degree with internships and real company projects.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" },
      { name:"BEng Aviation", level:"Bachelor", field:"Engineering", duration:"4 years", language:"English", format:"Full-time",
        desc:"Applied aviation engineering and operations degree with strong industry links at Schiphol.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" },
      { name:"BSc Communication and Multimedia Design", level:"Bachelor", field:"Media & Design", duration:"4 years", language:"English", format:"Full-time",
        desc:"Design digital products and interactive media, combining creativity, UX and technology.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" },
      { name:"BSc Digital Society", level:"Bachelor", field:"Media & Design", duration:"4 years", language:"English", format:"Full-time",
        desc:"Study how digital technology reshapes society, business and everyday life.",
        url:"https://www.amsterdamuas.com/study/education/all-programmes-and-courses" },
      { name:"BSc Physiotherapy", level:"Bachelor", field:"Health", duration:"3 years", language:"English", format:"Full-time",
        desc:"An intensive English-taught honours programme at the European School of Physiotherapy, combining science, hands-on skills training and clinical placements.",
        url:"https://www.amsterdamuas.com/programmes/european-school-of-physiotherapy" },
      { name:"BSc Sport Studies, International Sports Management and Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Sport management, marketing, finance and sport psychology aimed at the international sport industry, with three internships at sport organisations.",
        url:"https://www.amsterdamuas.com/programmes/sport-studies" },
      { name:"MSc Digital Driven Business", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Turning data analytics and digital technology into business value, over four quarters. Assumes a bachelor in business, economics, engineering, maths or ICT.",
        url:"https://www.amsterdamuas.com/programmes/master-digital-driven-business" },
    ]
  },
  "Erasmus University Rotterdam": {
    finder: "https://www.eur.nl/en/education/study-programmes/overview",
    courses: [
      { name:"BSc International Bachelor Communication and Media", level:"Bachelor", field:"Communication", duration:"3 years", language:"English", format:"Full-time",
        desc:"Media and communication and their social, political and cultural impact, taught from a comparative international perspective with exchange and internship options.",
        url:"https://www.eur.nl/en/bachelor/international-bachelor-communication-and-media" },
      { name:"BSc International Bachelor Econometrics and Operations Research", level:"Bachelor", field:"Data Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Maths-heavy degree applying statistics and modelling to economics, finance and logistics.",
        url:"https://www.eur.nl/en/bachelor/international-bachelor-econometrics-and-operations-research" },
      { name:"BSc International Bachelor Economics and Business Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Quantitative economics degree at the Erasmus School of Economics with finance and marketing tracks.",
        url:"https://www.eur.nl/en/bachelor/international-bachelor-economics-and-business-economics" },
      { name:"BSc International Bachelor Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"Perception, cognition, learning and mental health alongside research methods. Students pick a specialisation such as clinical, educational, or work and organisational psychology.",
        url:"https://www.eur.nl/en/bachelor/international-bachelor-psychology" },
      { name:"BSc International Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Flagship business degree at RSM, one of Europe's leading business schools, with a global cohort.",
        url:"https://www.rsm.nl/bachelor/international-business-administration/" },
      { name:"LLM International Business Law", level:"Master", field:"Law", duration:"1 year", language:"English", format:"Full-time",
        desc:"A one-year law master on the commercial side of international trade and transactions, taught by staff who combine academic work with legal practice.",
        url:"https://www.eur.nl/en/master/international-business-law" },
      { name:"MSc Finance & Investments", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Highly ranked finance master at RSM covering corporate finance, investments and markets.",
        url:"https://www.rsm.nl/master/msc-programmes/" },
      { name:"MSc Health Economics, Policy and Law", level:"Master", field:"Health", duration:"1 year", language:"English", format:"Full-time",
        desc:"Interdisciplinary master on how health systems are financed, governed and regulated.",
        url:"https://www.eur.nl/en/master/health-economics-policy-law" },
      { name:"MSc Strategic Management", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Strategic analysis and how business strategy is formed and put into practice, combining research-based theory with applied projects in an international cohort.",
        url:"https://www.eur.nl/en/master/strategic-management" },
    ]
  },
  "Utrecht University": {
    finder: "https://www.uu.nl/en/education",
    courses: [
      { name:"BA/BSc University College Utrecht", level:"Bachelor", field:"Humanities", duration:"3 years", language:"English", format:"Full-time",
        desc:"A residential liberal arts and sciences college where you build your own curriculum across humanities, social sciences and sciences. The degree awarded depends on what you choose.",
        url:"https://www.uu.nl/en/bachelors/university-college-utrecht" },
      { name:"BSc Economics and Business Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Economic theory alongside business economics and the quantitative analysis of current policy questions. Utrecht runs an English version next to a Dutch one with the same content.",
        url:"https://www.uu.nl/en/bachelors/economics-and-business-economics" },
      { name:"BSc Global Sustainability Science", level:"Bachelor", field:"Environment & Food", duration:"3 years", language:"English", format:"Full-time",
        desc:"Climate change, energy and resource use, approached through both natural and social science. Project-based, with a choice of specialisation tracks.",
        url:"https://www.uu.nl/en/bachelors/global-sustainability-science" },
      { name:"BSc University College Utrecht (Liberal Arts)", level:"Bachelor", field:"Humanities", duration:"3 years", language:"English", format:"Full-time",
        desc:"Selective liberal arts and sciences honours college where you design your own curriculum.",
        url:"https://www.uu.nl/en/organisation/university-college-utrecht" },
      { name:"LLM Public International Law", level:"Master", field:"Law", duration:"1 year", language:"English", format:"Full-time",
        desc:"Advanced legal master on international law, human rights and global governance.",
        url:"https://www.uu.nl/en/masters" },
      { name:"MSc Applied Cognitive Psychology", level:"Master", field:"Psychology", duration:"1 year", language:"English", format:"Full-time",
        desc:"How people process information and what that means for everyday things like signage, product usability and how we deal with technology. Includes an internship.",
        url:"https://www.uu.nl/en/masters/applied-cognitive-psychology" },
      { name:"MSc Applied Data Science", level:"Master", field:"Data Science", duration:"1 year", language:"English", format:"Full-time",
        desc:"Convert a disciplinary background into data science skills applied to real research problems.",
        url:"https://www.uu.nl/en/masters/applied-data-science" },
      { name:"MSc Artificial Intelligence", level:"Master", field:"Data Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Research master combining machine learning, logic and cognitive science.",
        url:"https://www.uu.nl/en/masters" },
    ]
  },
  "TU Delft": {
    finder: "https://www.tudelft.nl/en/education/programmes",
    courses: [
      { name:"BSc Aerospace Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"World-renowned aerospace degree covering aerodynamics, structures and flight.",
        url:"https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ae/bsc-aerospace-engineering" },
      { name:"BSc Applied Earth Sciences", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study the subsurface for energy, water and raw materials with a strong engineering base.",
        url:"https://www.tudelft.nl/en/education/programmes/bachelors" },
      { name:"BSc Architecture (Bouwkunde)", level:"Bachelor", field:"Architecture", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design-led architecture and built-environment degree at a top-ranked faculty.",
        url:"https://www.tudelft.nl/en/education/programmes/bachelors" },
      { name:"BSc Computer Science and Engineering", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Rigorous CS engineering degree spanning software, algorithms, security and systems.",
        url:"https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/computer-science-and-engineering/bachelor-of-computer-science-and-engineering" },
      { name:"BSc Earth, Climate and Technology", level:"Bachelor", field:"Environment & Food", duration:"3 years", language:"English", format:"Full-time",
        desc:"Earth sciences joined to engineering, covering climate modelling, geothermal energy and sustainable resource extraction. The renewed version of Applied Earth Sciences.",
        url:"https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ect/bsc-earth-climate-and-technology" },
      { name:"BSc Nanobiology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"A joint degree with Erasmus Rotterdam combining mathematics, physics and biology to study living systems at molecular scale. Teaching alternates between the two campuses.",
        url:"https://www.tudelft.nl/en/education/programmes/bachelors/nb/bsc-nanobiology/" },
      { name:"MSc Aerospace Engineering", level:"Master", field:"Engineering", duration:"2 years", language:"English", format:"Full-time",
        desc:"Five tracks covering aerodynamics and wind energy, structures and materials, control and operations, flight performance and propulsion, and space.",
        url:"https://www.tudelft.nl/en/education/programmes/masters/ae/msc-aerospace-engineering" },
      { name:"MSc Architecture, Urbanism and Building Sciences", level:"Master", field:"Architecture", duration:"2 years", language:"English", format:"Full-time",
        desc:"Architectural design combined with building technology and engineering, across five tracks including architecture, urbanism and landscape architecture.",
        url:"https://www.tudelft.nl/en/education/programmes/masters/aubs/msc-architecture-urbanism-and-building-sciences" },
      { name:"MSc Computer Science", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Specialise in areas like data science, cyber security, software technology or AI.",
        url:"https://www.tudelft.nl/en/education/programmes/masters" },
      { name:"MSc Robotics", level:"Master", field:"Engineering", duration:"2 years", language:"English", format:"Full-time",
        desc:"Interdisciplinary robotics master spanning mechanics, control and intelligent systems.",
        url:"https://www.tudelft.nl/en/education/programmes/masters" },
    ]
  },
  "Leiden University": {
    finder: "https://www.universiteitleiden.nl/en/education/study-programmes",
    courses: [
      { name:"BA International Studies", level:"Bachelor", field:"Humanities", duration:"3 years", language:"English", format:"Full-time",
        desc:"Combine a world region, a language and the social sciences to understand global affairs.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/international-studies" },
      { name:"BA Urban Studies", level:"Bachelor", field:"Humanities", duration:"3 years", language:"English", format:"Full-time",
        desc:"Cities examined through four themes: sustainable, multicultural, safe and healthy. Draws on humanities, social science, natural science and law. Based in The Hague.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/urban-studies" },
      { name:"BSc Life Science and Technology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"Molecular and cellular life sciences with a strong lab and technology component.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes" },
      { name:"BSc Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"Scientific study of behaviour and the mind, with specialisations from clinical to cognitive.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/psychology" },
      { name:"LLB International Business Law / Law", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"English-taught legal degree with international and comparative focus.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes" },
      { name:"LLM European and International Business Law", level:"Master", field:"Law", duration:"1 year", language:"English", format:"Full-time",
        desc:"How EU, international and national business law interact for companies working across borders. Seminar-based, with moot court training and a thesis.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/master/european-and-international-business-law" },
      { name:"MSc Computer Science", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Specialisations spanning advanced computing and systems, artificial intelligence, bioinformatics and data science, ending in a research project.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/master/computer-science" },
      { name:"MSc Industrial Ecology", level:"Master", field:"Environment & Food", duration:"2 years", language:"English", format:"Full-time",
        desc:"Taught with TU Delft, on the environmental impact of how we produce and consume. Covers life cycle assessment, the circular economy and decarbonisation.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes/master/industrial-ecology" },
      { name:"MSc International Relations", level:"Master", field:"International Relations", duration:"1 year", language:"English", format:"Full-time",
        desc:"Advanced study of diplomacy, security and global political economy.",
        url:"https://www.universiteitleiden.nl/en/education/study-programmes" },
    ]
  },
  "University of Groningen": {
    finder: "https://www.rug.nl/education/programme-search/?lang=en",
    courses: [
      { name:"BA Arts, Culture and Media", level:"Bachelor", field:"Arts", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study film, music, theatre and visual culture with a critical, analytical lens.",
        url:"https://www.rug.nl/bachelors/" },
      { name:"BA International Relations and International Organization", level:"Bachelor", field:"International Relations", duration:"3 years", language:"English", format:"Full-time",
        desc:"Politics, history, economics and law brought together on global affairs and the organisations that shape them, followed by a minor and a thesis.",
        url:"https://www.rug.nl/bachelors/international-relations-and-international-organization/?lang=en" },
      { name:"BSc Artificial Intelligence", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Blend of computer science, cognitive science and mathematics.",
        url:"https://www.rug.nl/bachelors/artificial-intelligence/" },
      { name:"BSc Biology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"From ecology to molecular biology, with strong research training.",
        url:"https://www.rug.nl/bachelors/biology/" },
      { name:"BSc International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Broad international management degree with exchange and specialisation options.",
        url:"https://www.rug.nl/bachelors/international-business/" },
      { name:"LLB International and European Law", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"Built around international, European and comparative law rather than one national system, with a compulsory semester abroad in the third year.",
        url:"https://www.rug.nl/bachelors/international-and-european-law/?lang=en" },
      { name:"MA Religion, Conflict and Globalization", level:"Master", field:"Humanities", duration:"1 year", language:"English", format:"Full-time",
        desc:"Religion, conflict and peacebuilding seen through anthropology, sociology and political science, with a placement and a thesis.",
        url:"https://www.rug.nl/masters/religion-conflict-and-globalization/?lang=en" },
      { name:"MSc Computing Science", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Tracks in machine learning and visual computing, AI engineering, software engineering and distributed systems, combining coursework with a research project or industry placement.",
        url:"https://www.rug.nl/masters/computing-science/?lang=en" },
      { name:"MSc Energy and Environmental Sciences", level:"Master", field:"Environment & Food", duration:"2 years", language:"English", format:"Full-time",
        desc:"Energy conversion, circular economy and sustainability transitions across natural and social science. The second year is research and an external placement.",
        url:"https://www.rug.nl/masters/energy-and-environmental-sciences/?lang=en" },
    ]
  },
  "Eindhoven University of Technology": {
    finder: "https://www.tue.nl/en/education/degree-programs",
    courses: [
      { name:"BSc Applied Mathematics", level:"Bachelor", field:"Data Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Mathematical modelling of practical problems and how to compute the answers, applied to everything from medical imaging to supply chains.",
        url:"https://www.tue.nl/en/education/bachelor-college/bachelor-applied-mathematics" },
      { name:"BSc Computer Science and Engineering", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Software, data and systems engineering at a leading Dutch tech university.",
        url:"https://www.tue.nl/en/education/bachelor-college/bachelor-computer-science-and-engineering" },
      { name:"BSc Data Science", level:"Bachelor", field:"Data Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Joint TU/e-Tilburg degree combining maths, computing and business analytics.",
        url:"https://www.tue.nl/en/education/bachelor-college/bachelor-data-science" },
      { name:"BSc Industrial Design", level:"Bachelor", field:"Media & Design", duration:"3 years", language:"English", format:"Full-time",
        desc:"Designing products, services and interactive systems that bring together technology, data and what users actually need. The programme is project-based throughout.",
        url:"https://www.tue.nl/en/education/bachelor-college/bachelor-industrial-design" },
      { name:"BSc Industrial Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Optimise processes, logistics and operations where engineering meets management.",
        url:"https://www.tue.nl/en/education/bachelor-college/bachelor-industrial-engineering" },
      { name:"BSc Mechanical Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design and build machines and systems, from automotive to high-tech manufacturing.",
        url:"https://www.tue.nl/en/education/bachelor-college/bachelor-mechanical-engineering" },
      { name:"MSc Computer Science and Engineering", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Designing and analysing complex computational systems, with six tracks including algorithms, data engineering, software engineering and visualisation.",
        url:"https://www.tue.nl/en/education/graduate-school/master-computer-science-and-engineering" },
      { name:"MSc Data Science and Artificial Intelligence", level:"Master", field:"Data Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Advanced master in machine learning, data engineering and AI systems.",
        url:"https://www.tue.nl/en/education/graduate-school/master-data-science-and-artificial-intelligence" },
      { name:"MSc Embedded Systems", level:"Master", field:"Engineering", duration:"2 years", language:"English", format:"Full-time",
        desc:"Systems with strict performance and reliability demands, run jointly by computer science and electrical engineering. Tracks include edge intelligence and cyber-physical systems.",
        url:"https://www.tue.nl/en/education/graduate-school/master-embedded-systems" },
    ]
  },
  "Tilburg University": {
    finder: "https://www.tilburguniversity.edu/education",
    courses: [
      { name:"BSc Cognitive Science and Artificial Intelligence", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Programming and machine learning alongside cognitive neuroscience and human-computer interaction, including the ethics of intelligent systems.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/cognitive-science-and-artificial-intelligence" },
      { name:"BSc Data Science", level:"Bachelor", field:"Data Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Joint Tilburg-TU/e programme blending analytics, computing and social impact.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/data-science" },
      { name:"BSc Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Strong economics degree with behavioural and policy emphasis.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/economics" },
      { name:"BSc Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"Behavioural science degree with clinical, social and economic psychology tracks.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/psychology" },
      { name:"LLB Global Law", level:"Bachelor", field:"Law", duration:"3 years", language:"English", format:"Full-time",
        desc:"Legal problems studied across several jurisdictions instead of one national system, adding EU and public international law in the later years.",
        url:"https://www.tilburguniversity.edu/education/bachelors-programs/global-law" },
      { name:"MSc Communication and Information Sciences", level:"Master", field:"Communication", duration:"1 year", language:"English", format:"Full-time",
        desc:"Communication science, cognitive science and user experience design brought together to build communication strategies that are actually evidence-based.",
        url:"https://www.tilburguniversity.edu/education/masters-programs/communication-and-information-sciences" },
      { name:"MSc Finance", level:"Master", field:"Economics", duration:"1 year", language:"English", format:"Full-time",
        desc:"Corporate finance and investment management, covering cost of capital, mergers and acquisitions, portfolio decisions and derivatives. CFA and sustainable finance tracks available.",
        url:"https://www.tilburguniversity.edu/education/masters-programs/finance" },
      { name:"MSc Human Resource Studies", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Designing HR policy that serves both company performance and the people in it, with profiles covering diversity and inclusion, learning and development, and people analytics.",
        url:"https://www.tilburguniversity.edu/education/masters-programs/human-resource-studies" },
      { name:"MSc Marketing Management", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Analytics-driven marketing master with a strong quantitative core.",
        url:"https://www.tilburguniversity.edu/education/masters-programs" },
    ]
  },
  "Maastricht University": {
    finder: "https://www.maastrichtuniversity.nl/education/bachelor/programmes",
    courses: [
      { name:"BA European Studies", level:"Bachelor", field:"International Relations", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study European politics, law, economics and history in an interdisciplinary way.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/programmes/european-studies" },
      { name:"BSc Data Science and Artificial Intelligence", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Mathematics, programming and machine learning, with projects applying AI methods to practical problems. Run by the Faculty of Science and Engineering.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/programmes/data-science-and-artificial-intelligence" },
      { name:"BSc Economics and Business Economics", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Economic theory applied to business and policy problems, with specialisation tracks in the later years and problem-based learning throughout.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/programmes/economics-and-business-economics" },
      { name:"BSc European Public Health", level:"Bachelor", field:"Health", duration:"3 years", language:"English", format:"Full-time",
        desc:"How health systems and health policy work across European countries, taught in English using Maastricht's problem-based learning. The English-taught alternative to the Dutch health sciences degree.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/programmes/european-public-health" },
      { name:"BSc International Business", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Taught through Problem-Based Learning in small groups, highly international.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor/programmes/international-business" },
      { name:"BSc International Business (Economics track)", level:"Bachelor", field:"Economics", duration:"3 years", language:"English", format:"Full-time",
        desc:"Economics-focused pathway within Maastricht's international business school.",
        url:"https://www.maastrichtuniversity.nl/education/bachelor" },
      { name:"MA European Public Affairs", level:"Master", field:"International Relations", duration:"1 year", language:"English", format:"Full-time",
        desc:"EU decision-making and policy practice, aimed squarely at work in the EU institutions, public affairs and advocacy.",
        url:"https://www.maastrichtuniversity.nl/education/master/programmes/european-public-affairs" },
      { name:"MSc Global Health", level:"Master", field:"Health", duration:"1 year", language:"English", format:"Full-time",
        desc:"How local and global forces shape population health and health inequity, and how to assess health policy critically across different countries.",
        url:"https://www.maastrichtuniversity.nl/education/master/programmes/global-health" },
      { name:"MSc International Business", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Specialisation-based business master with strong employability focus.",
        url:"https://www.maastrichtuniversity.nl/education/master" },
    ]
  },
  "Radboud University": {
    finder: "https://www.ru.nl/en/education",
    courses: [
      { name:"BA International Business Communication", level:"Bachelor", field:"Communication", duration:"3 years", language:"English", format:"Full-time",
        desc:"Study communication across languages and cultures in a business context.",
        url:"https://www.ru.nl/en/education/bachelors" },
      { name:"BSc Artificial Intelligence", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Cognitive-science-flavoured AI degree combining computing, neuroscience and logic.",
        url:"https://www.ru.nl/en/education/bachelors/artificial-intelligence" },
      { name:"BSc Biology", level:"Bachelor", field:"Life Sciences", duration:"3 years", language:"English", format:"Full-time",
        desc:"From molecules to ecosystems, with strong lab and fieldwork.",
        url:"https://www.ru.nl/en/education/bachelors/biology" },
      { name:"BSc International Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"How organisations work across borders, drawing on marketing, HR, strategy, economics and law. The third year allows electives, an internship or study abroad.",
        url:"https://www.ru.nl/en/education/bachelors/international-business-administration" },
      { name:"BSc Psychology", level:"Bachelor", field:"Psychology", duration:"3 years", language:"English", format:"Full-time",
        desc:"Research-led psychology degree linked to the Donders brain institute.",
        url:"https://www.ru.nl/en/education/bachelors/psychology" },
      { name:"LLM International and European Law", level:"Master", field:"Law", duration:"1 year", language:"English", format:"Full-time",
        desc:"Four specialisations spanning international and EU legal orders, business law, and human rights and migration, with sustainability and digitalisation running through.",
        url:"https://www.ru.nl/en/education/masters/international-and-european-law" },
      { name:"MSc Environment and Society Studies", level:"Master", field:"Environment & Food", duration:"1 year", language:"English", format:"Full-time",
        desc:"Environmental policy and governance from a social science angle, covering climate, biodiversity, circular economy, energy and food systems.",
        url:"https://www.ru.nl/en/education/masters/environment-and-society-studies" },
      { name:"MSc Political Science", level:"Master", field:"International Relations", duration:"1 year", language:"English", format:"Full-time",
        desc:"How political power is exercised and contested, across seven specialisations including international relations and EU politics. Dual degree routes available.",
        url:"https://www.ru.nl/en/education/masters/political-science" },
    ]
  },
  "Wageningen University": {
    finder: "https://www.wur.nl/en/education/bachelor/programmes",
    courses: [
      { name:"BSc Environmental Sciences", level:"Bachelor", field:"Environment & Food", duration:"3 years", language:"English", format:"Full-time",
        desc:"Tackle climate, water and ecosystems with an interdisciplinary science base.",
        url:"https://www.wur.nl/en/education/bachelor/bachelors-environmental-sciences" },
      { name:"BSc Food Technology", level:"Bachelor", field:"Environment & Food", duration:"3 years", language:"English", format:"Full-time",
        desc:"Science of food production, safety and innovation at the world's top agri-food university.",
        url:"https://www.wur.nl/en/education/bachelor/bachelors-food-technology" },
      { name:"BSc International Land and Water Management", level:"Bachelor", field:"Environment & Food", duration:"3 years", language:"English", format:"Full-time",
        desc:"Managing land and water resources across natural science, engineering and social science. Students tackle erosion, irrigation and flooding in an international context.",
        url:"https://www.wur.nl/en/education/bachelor/bachelors-international-land-and-water-management" },
      { name:"BSc Tourism", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"A joint degree looking at tourism through social, economic and environmental lenses, including its effects on destinations and the communities living in them.",
        url:"https://www.wur.nl/en/education/bachelor/bachelors-tourism" },
      { name:"MSc Biotechnology", level:"Master", field:"Life Sciences", duration:"2 years", language:"English", format:"Full-time",
        desc:"Biotechnological techniques across microbiology, biochemistry and process engineering, applied to pharmaceuticals, food production and biobased materials.",
        url:"https://www.wur.nl/en/education/master/masters-biotechnology" },
      { name:"MSc Environmental Sciences", level:"Master", field:"Environment & Food", duration:"2 years", language:"English", format:"Full-time",
        desc:"Natural science, social science and technology brought together on environmental problems, with specialisations from environmental technology to policy and economics.",
        url:"https://www.wur.nl/en/education/master/masters-environmental-sciences" },
      { name:"MSc Food Technology", level:"Master", field:"Environment & Food", duration:"2 years", language:"English", format:"Full-time",
        desc:"Advanced food science and engineering with specialisation tracks.",
        url:"https://www.wur.nl/en/education/master/masters-food-technology" },
      { name:"MSc Nutrition and Health", level:"Master", field:"Health", duration:"2 years", language:"English", format:"Full-time",
        desc:"The link between nutrition and health, from cellular mechanisms up to population dietary patterns, combining biochemical, physiological and epidemiological approaches.",
        url:"https://www.wur.nl/en/education/master/masters-nutrition-and-health" },
    ]
  },
  "University of Twente": {
    finder: "https://www.utwente.nl/en/education/",
    courses: [
      { name:"BSc Communication Science", level:"Bachelor", field:"Communication", duration:"3 years", language:"English", format:"Full-time",
        desc:"How people, organisations, media and technology interact, and how to design and test communication that works. Strong focus on behaviour in digital environments.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/communication-science/" },
      { name:"BSc Creative Technology", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design smart, interactive products where engineering meets creativity.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/creative-technology/" },
      { name:"BSc International Business Administration", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"Technology-oriented business degree bridging management and engineering.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/international-business-administration/" },
      { name:"BSc Mechanical Engineering", level:"Bachelor", field:"Engineering", duration:"3 years", language:"English", format:"Full-time",
        desc:"Design and build machines and systems, strong in high-tech and robotics.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/mechanical-engineering/" },
      { name:"BSc Technical Computer Science", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"Software, networks and intelligent systems with hands-on project learning.",
        url:"https://www.utwente.nl/en/education/bachelor/programmes/technical-computer-science/" },
      { name:"MSc Computer Science", level:"Master", field:"Computer Science", duration:"2 years", language:"English", format:"Full-time",
        desc:"Specialise in areas like data science, cyber security or software technology.",
        url:"https://www.utwente.nl/en/education/master/" },
      { name:"MSc European Studies", level:"Master", field:"International Relations", duration:"1 year", language:"English", format:"Full-time",
        desc:"How European public policy is designed and delivered across layers of government, with attention to digital transformation. No technical background needed.",
        url:"https://www.utwente.nl/en/education/master/programmes/european-studies/" },
      { name:"MSc Health Sciences", level:"Master", field:"Health", duration:"1 year", language:"English", format:"Full-time",
        desc:"Policy, organisation and innovation in healthcare, analysed with data. Two specialisations, digital health and healthcare management, with projects in real care settings.",
        url:"https://www.utwente.nl/en/education/master/programmes/health-sciences/" },
      { name:"MSc Sustainable Energy Technology", level:"Master", field:"Engineering", duration:"2 years", language:"English", format:"Full-time",
        desc:"Generating, distributing and storing energy, from solar and wind to hydrogen and smart grids, with the markets and business models alongside the engineering.",
        url:"https://www.utwente.nl/en/education/master/programmes/sustainable-energy-technology/" },
    ]
  },
  "The Hague UAS": {
    finder: "https://www.thuas.com/programmes",
    courses: [
      { name:"BA European Studies", level:"Bachelor", field:"International Relations", duration:"4 years", language:"English", format:"Full-time",
        desc:"European politics, business and languages combined in one interdisciplinary degree. Graduates tend towards policy advice, public affairs and international organisations.",
        url:"https://www.thuas.com/programmes/bachelors/european-studies-4-years" },
      { name:"BA International Communication Management", level:"Bachelor", field:"Media & Design", duration:"3 years", language:"English", format:"Full-time",
        desc:"Practice-led degree in cross-cultural corporate communication and PR.",
        url:"https://www.thuas.com/programmes/bachelors/international-communication-management" },
      { name:"BA Safety and Security Management Studies", level:"Bachelor", field:"International Relations", duration:"4 years", language:"English", format:"Full-time",
        desc:"Study global security, crisis management and governance.",
        url:"https://www.thuas.com/programmes/bachelors/safety-and-security-management-studies" },
      { name:"BBA International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Hands-on international business degree with internships and company projects.",
        url:"https://www.thuas.com/programmes/bachelors/international-business-4-years" },
      { name:"BBA International Financial Management and Control", level:"Bachelor", field:"Economics", duration:"4 years", language:"English", format:"Full-time",
        desc:"Accounting, risk management and financial decision-making, with two internship periods built into the four years.",
        url:"https://www.thuas.com/programmes/bachelors/international-financial-management-control-4-years" },
      { name:"BSc Applied Computer Science", level:"Bachelor", field:"Computer Science", duration:"3 years", language:"English", format:"Full-time",
        desc:"A project-based ICT degree covering programming, cybersecurity, embedded systems and data science, taught in English at the Delft campus on an accelerated three-year route.",
        url:"https://www.thuas.com/programmes/bachelors/applied-computer-science" },
      { name:"BSc Industrial Design Engineering", level:"Bachelor", field:"Media & Design", duration:"3 years", language:"English", format:"Full-time",
        desc:"Designing products and services with users and stakeholders rather than for them, combining design work with engineering and materials knowledge on real client projects.",
        url:"https://www.thuas.com/programmes/bachelors/industrial-design-engineering" },
      { name:"BSc Sport Studies, International Sport Management", level:"Bachelor", field:"Business", duration:"3 years", language:"English", format:"Full-time",
        desc:"The organisation, governance and commercial side of the sports industry, taught in English at the Zuiderpark sports campus in The Hague.",
        url:"https://www.thuas.com/programmes/bachelors/sport-studies-international-sport-management" },
      { name:"LLB International and European Law", level:"Bachelor", field:"International Relations", duration:"4 years", language:"English", format:"Full-time",
        desc:"Applied law degree set in the international-law capital, The Hague.",
        url:"https://www.thuas.com/programmes/bachelors/international-and-european-law" },
    ]
  },
  "Rotterdam UAS": {
    finder: "https://www.rotterdamuas.com/programmes/",
    courses: [
      { name:"BA Fine Art", level:"Bachelor", field:"Arts", duration:"4 years", language:"English", format:"Full-time",
        desc:"Artistic research, concept development and technical skill at the Willem de Kooning Academy, specialising in autonomous, social or commercial practice.",
        url:"https://www.rotterdamuas.com/programmes/bachelor/fine-art/" },
      { name:"BA Graphic Design", level:"Bachelor", field:"Media & Design", duration:"4 years", language:"English", format:"Full-time",
        desc:"Visual communication, image making, typography and editorial work at the Willem de Kooning Academy, mixing creative research with practical design projects.",
        url:"https://www.rotterdamuas.com/programmes/bachelor/graphic-design/" },
      { name:"BBA International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Rotterdam Business School's business degree, specialising from the second year in marketing, commerce, supply chain or organisation and change, with an internship and an exchange semester.",
        url:"https://www.rotterdamuas.com/programmes/bachelor/international-business/" },
      { name:"BEng Mechanical Engineering", level:"Bachelor", field:"Engineering", duration:"4 years", language:"English", format:"Full-time",
        desc:"Hands-on engineering degree with strong industry placement.",
        url:"https://www.rotterdamuas.com/programmes/" },
      { name:"BSc International Business", level:"Bachelor", field:"Business", duration:"4 years", language:"English", format:"Full-time",
        desc:"Applied international business degree with internships in the Rotterdam port economy.",
        url:"https://www.rotterdamuas.com/programmes/" },
      { name:"BSc Physiotherapy", level:"Bachelor", field:"Health", duration:"4 years", language:"English", format:"Full-time",
        desc:"Clinical health degree training physiotherapists with practical placements.",
        url:"https://www.rotterdamuas.com/programmes/" },
      { name:"MSc Consultancy and Entrepreneurship", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"For people heading into consultancy or starting their own venture. Intakes run in September and February.",
        url:"https://www.rotterdamuas.com/programmes/master/master-in-consultancy-and-entrepreneurship-fulltime/" },
      { name:"MSc International Supply Chain Management", level:"Master", field:"Business", duration:"1 year", language:"English", format:"Full-time",
        desc:"Sourcing, purchasing, planning, transport, warehousing and inventory, worked through at strategic, tactical and operational level.",
        url:"https://www.rotterdamuas.com/programmes/master/master-in-international-supply-chain-management/" },
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

// ---- My Study List: browser-only, per-visit persistence (sessionStorage) ----
// sessionStorage survives page navigation within the visit, and is cleared by the
// browser when the tab or site is closed, so every return visit starts on an empty
// list. Swap the two UB_STORE lines back to localStorage to make the list persist.
const UB_LIST_KEY = "ub_study_list_v1";
const UB_LIST_EVENT = "ub-study-list-change";
function ubStore() { return window.sessionStorage; }

function readStudyList() {
  try { return JSON.parse(ubStore().getItem(UB_LIST_KEY) || "[]"); }
  catch (e) { return []; }
}
function writeStudyList(items) {
  try { ubStore().setItem(UB_LIST_KEY, JSON.stringify(items)); } catch (e) {}
  try { window.dispatchEvent(new CustomEvent(UB_LIST_EVENT)); } catch (e) {}
}
// One-time cleanup: clear any list left in localStorage by the previous build,
// otherwise old saved courses would linger on returning visitors' devices.
try { window.localStorage.removeItem(UB_LIST_KEY); } catch (e) {}
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

// React hook so any component re-renders when the list changes (even across tabs),
// and re-reads from sessionStorage whenever the page is revisited after being backgrounded
// (mobile browsers restore a frozen page instead of re-running JS,
// so without this the list can show stale data until the visitor manually reloads).
function useStudyList() {
  const [items, setItems] = React.useState(readStudyList());
  React.useEffect(() => {
    const refresh = () => setItems(readStudyList());
    const onVisibility = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener(UB_LIST_EVENT, refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("pageshow", refresh); // fires on bfcache restore (closed tab / app switch)
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener(UB_LIST_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return items;
}

Object.assign(window, {
  COURSE_DB, ALL_COURSES, coursesFor, finderFor,
  readStudyList, writeStudyList, inStudyList, addToStudyList,
  removeFromStudyList, clearStudyList, useStudyList, studyListId
});
