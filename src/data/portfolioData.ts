export interface NavSection {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  accent: "green" | "yellow" | "blue" | "coral";
}

export interface EducationItem {
  level: string;
  school: string;
  period: string;
  details: string;
}

export interface LearningObjective {
  id: string;
  title: string;
  color: "yellow" | "blue" | "coral";
  rotation: string;
  points: string[];
}

export interface CourseAccordionItem {
  id: string;
  title: string;
  badge: string;
  summary: string;
  items: string[];
}

export type ActivityCategory =
  | "All"
  | "Worksheets & Activities"
  | "Assignments"
  | "Reports & Presentations"
  | "Lesson Plans"
  | "Quizzes & Exams"
  | "Performance Tasks"
  | "Demonstration Teaching";

export interface LearningActivity {
  id: string;
  title: string;
  category: Exclude<ActivityCategory, "All">;
  module: string;
  date: string;
  summary: string;
  highlights: string[];
  reflection: string;
  status: string;
}

export type GalleryCategory =
  | "All Photos"
  | "Classroom Activities"
  | "Demonstration Teaching"
  | "Submitted Outputs"
  | "Certificates"
  | "Graded Activities";

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  category: Exclude<GalleryCategory, "All Photos">;
  date: string;
  description: string;
  objectPosition?: string;
  isUserUpload?: boolean;
}

export interface FamilyPhoto {
  id: string;
  src: string;
  caption: string;
  date: string;
  description: string;
  objectPosition?: string;
  isUserUpload?: boolean;
}

export interface GalleryVideo {
  id: string;
  src: string;
  title: string;
  tag: string;
  date: string;
  description: string;
  isUserUpload?: boolean;
}

export interface ReflectionEntry {
  id: string;
  number: string;
  title: string;
  tag: string;
  accent: "green" | "yellow" | "blue" | "coral";
  content: string[];
}

export const titlePageData = {
  republic: "Republic of the Philippines",
  university: "NORTH EASTERN MINDANAO STATE UNIVERSITY",
  campus: "Lianga Campus • Lianga, Surigao del Sur",
  college: "College of Teacher Education",
  portfolioTitle: "ACADEMIC E-PORTFOLIO",
  fulfillment:
    "In Partial Fulfillment of the Requirements for the Degree of Bachelor of Elementary Education (BEEd)",
  programSection: "Bachelor of Elementary Education (BEEd) – Section 2C",
  submittedBy: "Romnick P. Ramacula",
  submittedTo: "Prof. Crispina B. Guillen",
  instructorTitle: "Course Instructor",
  academicYear: "Academic Year 2025–2026",
};

export const studentProfile = {
  name: "Romnick P. Ramacula",
  shortName: "Romnick Ramacula",
  program: "Bachelor of Elementary Education (BEEd)",
  section: "Section 2C",
  programBadge: "BEEd – Section 2C",
  university: "North Eastern Mindanao State University (NEMSU) – Lianga Campus",
  universityShort: "NEMSU – Lianga Campus",
  address: "Ladislawa Garden Village, Buhangin, Davao City",
  instructor: "Prof. Crispina B. Guillen",
  instructorImage: "/images/prof.jpg",
  academicTerm: "Academic E-Portfolio • A.Y. 2025–2026",
  profileImage: "/images/romnick.jpg",
  heroQuote:
    "My journey as a college student is not always easy. Behind every smile, achievement, and success is a story of sacrifices, challenges, hard work, and faith. I am just an ordinary person with extraordinary dreams. I believe that my background does not define my future, and my present situation will never limit what I can achieve.",
};

export const navSections: NavSection[] = [
  {
    id: "cover",
    number: "01",
    title: "Cover & Introduction",
    shortTitle: "Cover",
    subtitle: "Student profile, program details, and personal motto",
    accent: "green",
  },
  {
    id: "toc",
    number: "02",
    title: "Table of Contents",
    shortTitle: "Contents",
    subtitle: "Classroom index board for quick navigation",
    accent: "yellow",
  },
  {
    id: "about",
    number: "03",
    title: "Introduction / About Me",
    shortTitle: "About Me",
    subtitle: "Background, education timeline, goals, and teaching philosophy",
    accent: "blue",
  },
  {
    id: "objectives",
    number: "04",
    title: "Learning Objectives",
    shortTitle: "Objectives",
    subtitle: "What I want to learn, skills to build, and knowledge to gain",
    accent: "coral",
  },
  {
    id: "course",
    number: "05",
    title: "Course Overview",
    shortTitle: "Course",
    subtitle: "Syllabus, objectives, competencies, and lessons covered",
    accent: "green",
  },
  {
    id: "activities",
    number: "06",
    title: "Learning Activities & Outputs",
    shortTitle: "Activities",
    subtitle: "Worksheets, lesson plans, reports, exams, and demo teaching",
    accent: "yellow",
  },
  {
    id: "gallery",
    number: "07",
    title: "Evidence of Learning & Gallery",
    shortTitle: "Gallery",
    subtitle: "Polaroid classroom scrapbook and instructor feedback",
    accent: "blue",
  },
  {
    id: "reflection",
    number: "08",
    title: "Reflection and Insights",
    shortTitle: "Reflection",
    subtitle: "Personal growth, faith, hard work, and classroom readiness",
    accent: "coral",
  },
];

export const aboutData = {
  personalIntro: [
    "Hello! I am Romnick P. Ramacula, a dedicated second-year student taking up Bachelor of Elementary Education (BEEd) – Section 2C at North Eastern Mindanao State University (NEMSU) – Lianga Campus. Currently residing in Ladislawa Garden Village, Buhangin, Davao City, I carry with me the values of perseverance, humility, and service everywhere my academic journey leads.",
    "Choosing elementary education is more than earning a degree—it is answering a calling to nurture young minds during their most formative years. Every lesson I prepare, every classroom activity I participate in, and every challenge I overcome brings me one step closer to becoming the compassionate and effective elementary teacher my future learners deserve.",
  ],
  educationTimeline: [
    {
      level: "Tertiary Education (Present)",
      school: "North Eastern Mindanao State University (NEMSU) – Lianga Campus",
      period: "2024 – Present",
      details:
        "Bachelor of Elementary Education (BEEd), Section 2C. Actively engaged in pedagogy workshops, instructional material crafting, and demonstration teaching.",
    },
    {
      level: "Senior High School",
      school: "General Academic / Humanities & Social Sciences Track",
      period: "Completed",
      details:
        "Strengthened foundational communication, critical thinking, and community leadership skills that sparked my passion for teaching.",
    },
    {
      level: "Junior High School",
      school: "Secondary Education",
      period: "Completed",
      details:
        "Developed discipline, collaborative study habits, and active participation in school organizations and peer tutoring.",
    },
    {
      level: "Elementary Education",
      school: "Primary Foundation",
      period: "Completed",
      details:
        "Where inspiring teachers first showed me how patience, encouragement, and warmth can transform a child's life.",
    },
  ] as EducationItem[],
  interests: [
    "Designing visual instructional aids & creative classroom boards",
    "Reading educational articles, inspirational stories, and children's literature",
    "Community outreach and mentoring younger learners",
    "Music, reflective journaling, and organizing study notes",
    "Exploring digital tools that make elementary lessons interactive",
  ],
  goals: [
    "Excel academically in BEEd 2C and graduate with honor and integrity from NEMSU – Lianga Campus.",
    "Pass the Licensure Examination for Professional Teachers (LEPT) and serve in the public elementary education sector.",
    "Build inclusive, joyful, and student-centered classrooms where every child feels valued and capable.",
    "Give back to my family and community by turning sacrifices into lasting positive impact.",
  ],
  philosophy: {
    heading: "Personal Philosophy in Education",
    quote:
      "I believe that every child is a seed of extraordinary potential waiting for patience, encouragement, and the right environment to bloom. Teaching is not merely transferring facts from a textbook to a notebook—it is lighting a spark of curiosity, modeling kindness, and showing learners that their background never limits how far they can dream.",
    pillars: [
      "Child-Centered & Inclusive Learning",
      "Learning by Doing & Tactile Exploration",
      "Compassion, Patience & Faith in Every Learner",
    ],
  },
};

export const learningObjectives: LearningObjective[] = [
  {
    id: "learn",
    title: "What I Want to Learn",
    color: "yellow",
    rotation: "-1.5deg",
    points: [
      "Effective, developmentally appropriate teaching strategies for diverse elementary learners.",
      "How to design engaging, standards-aligned lesson plans that balance mastery and creativity.",
      "Practical classroom management techniques that foster respect, warmth, and active participation.",
      "Authentic assessment methods that genuinely measure understanding and guide learner growth.",
    ],
  },
  {
    id: "skills",
    title: "Skills I Want to Develop",
    color: "blue",
    rotation: "1.2deg",
    points: [
      "Confident classroom delivery, clear voice modulation, and expressive storytelling during demonstration teaching.",
      "Crafting both tactile classroom instructional materials and interactive digital presentations.",
      "Reflective teaching—listening openly to mentor feedback and continuously refining my practice.",
      "Time management, teamwork, and resilience under academic pressure.",
    ],
  },
  {
    id: "knowledge",
    title: "Knowledge I Want to Gain",
    color: "coral",
    rotation: "-1deg",
    points: [
      "Deep mastery of core elementary curriculum content and DepEd learning competencies.",
      "Understanding child cognitive, social, and emotional development across primary and intermediate grades.",
      "Ethical standards, professional conduct, and responsibilities of a licensed Filipino educator.",
      "Inclusive pedagogy approaches for supporting learners with varying paces and learning styles.",
    ],
  },
];

export const courseOverviewData = {
  courseTitle: "Foundations of Elementary Pedagogy & Instructional Practice",
  instructor: "Prof. Crispina B. Guillen",
  program: "BEEd – Section 2C | NEMSU – Lianga Campus",
  accordions: [
    {
      id: "description",
      title: "Subject Description",
      badge: "01",
      summary:
        "An essential professional education course equipping future elementary teachers with pedagogical principles, instructional planning, and hands-on classroom teaching experiences.",
      items: [
        "Bridges educational theory with practical elementary classroom realities in the Philippine education context.",
        "Guides pre-service teachers in preparing well-structured lesson plans, creative instructional materials, and authentic assessments.",
        "Cultivates reflective practice, ethical professionalism, and learner-centered instruction under the mentorship of Prof. Crispina B. Guillen.",
      ],
    },
    {
      id: "objectives",
      title: "Course Objectives",
      badge: "02",
      summary:
        "Clear academic milestones designed to build competence, confidence, and compassion in every BEEd 2C student.",
      items: [
        "Demonstrate mastery of learner-centered teaching principles tailored to elementary-grade learners.",
        "Construct detailed and semi-detailed lesson plans aligned with curriculum standards and SMART learning outcomes.",
        "Design appropriate formative and summative assessment tools alongside clear performance rubrics.",
        "Execute engaging micro-teaching and demonstration teaching sessions with poise and responsiveness.",
      ],
    },
    {
      id: "competencies",
      title: "Learning Competencies",
      badge: "03",
      summary:
        "Core competencies aligned with the Philippine Professional Standards for Teachers (PPST) for Beginning Teachers.",
      items: [
        "Content Knowledge & Pedagogy: Apply research-based principles of teaching and learning across elementary subjects.",
        "Learning Environment: Maintain safe, supportive, and motivating classroom spaces that celebrate diversity.",
        "Curriculum & Planning: Translate curriculum guides into sequenced, engaging daily learning activities.",
        "Assessment & Reporting: Gather, document, and reflect on learning evidence to improve instruction.",
      ],
    },
    {
      id: "lessons",
      title: "Lessons Covered",
      badge: "04",
      summary:
        "Key modules and topics completed throughout the semester.",
      items: [
        "Unit 1: The Elementary Learner & Principles of Child-Centered Teaching",
        "Unit 2: Formulating SMART Objectives & Aligning with Curriculum Guides",
        "Unit 3: Lesson Planning Frameworks (4As, 5Es, and Detailed Lesson Plans)",
        "Unit 4: Selecting & Crafting Tactile and Digital Instructional Materials",
        "Unit 5: Classroom Management, Questioning Techniques & Active Engagement",
        "Unit 6: Authentic Assessment, Rubrics, and Demonstration Teaching Practicum",
      ],
    },
  ] as CourseAccordionItem[],
};

export const activityCategories: ActivityCategory[] = [
  "All",
  "Worksheets & Activities",
  "Assignments",
  "Reports & Presentations",
  "Lesson Plans",
  "Quizzes & Exams",
  "Performance Tasks",
  "Demonstration Teaching",
];

export const learningActivities: LearningActivity[] = [
  {
    id: "act-1",
    title: "Learner Profiles & Developmental Needs Worksheet",
    category: "Worksheets & Activities",
    module: "Unit 1 • Classroom Foundations",
    date: "Week 2",
    summary:
      "Structured classroom worksheet analyzing cognitive, emotional, and social characteristics of Grades 1–6 learners.",
    highlights: [
      "Mapped age-appropriate classroom strategies for primary vs. intermediate grades",
      "Identified inclusive accommodations for visual, auditory, and kinesthetic learners",
      "Completed collaborative peer-review reflection table",
    ],
    reflection:
      "This activity reminded me that effective teaching always begins by deeply understanding who our learners are.",
    status: "Completed & Graded",
  },
  {
    id: "act-2",
    title: "SMART Learning Objectives Alignment Matrix",
    category: "Assignments",
    module: "Unit 2 • Curriculum Alignment",
    date: "Week 4",
    summary:
      "Individual take-home assignment crafting cognitive, affective, and psychomotor objectives aligned with Bloom's Revised Taxonomy.",
    highlights: [
      "Drafted 15 measurable objectives across English, Math, and Science",
      "Paired each objective with a matching formative check for understanding",
      "Revised based on Prof. Crispina B. Guillen's constructive feedback",
    ],
    reflection:
      "Writing clear, measurable objectives gave my lesson flow structure and made assessment far more intentional.",
    status: "Submitted",
  },
  {
    id: "act-3",
    title: "Interactive Teaching Strategies Group Report",
    category: "Reports & Presentations",
    module: "Unit 3 • Instructional Methods",
    date: "Week 6",
    summary:
      "Visual classroom presentation showcasing cooperative learning structures like Think-Pair-Share, Jigsaw, and Gallery Walk.",
    highlights: [
      "Designed colorful visual aids and handout summaries for BEEd 2C classmates",
      "Facilitated a 5-minute live icebreaker demonstrating Think-Pair-Share",
      "Answered Q&A prompts on managing large elementary class sizes",
    ],
    reflection:
      "Presenting in front of classmates sharpened my pacing, eye contact, and confidence in facilitating group discussions.",
    status: "Presented",
  },
  {
    id: "act-4",
    title: "Detailed Lesson Plan (DLP) using the 4As Approach",
    category: "Lesson Plans",
    module: "Unit 3 • Lesson Planning",
    date: "Week 8",
    summary:
      "Comprehensive Detailed Lesson Plan featuring Activity, Analysis, Abstraction, and Application phases with teacher-learner dialogue.",
    highlights: [
      "Integrated motivational storytelling and hands-on group sorting cards",
      "Included differentiated enrichment and remediation tasks",
      "Attached custom scoring rubric and formative quiz items",
    ],
    reflection:
      "Crafting a full DLP taught me how much thoughtful preparation happens behind every smooth 45-minute elementary class.",
    status: "Approved for Demo",
  },
  {
    id: "act-5",
    title: "Midterm & Unit Mastery Assessments",
    category: "Quizzes & Exams",
    module: "Units 1–4 • Summative Checks",
    date: "Week 9",
    summary:
      "Written quizzes and midterm examination testing pedagogical theories, lesson plan components, and classroom scenario analysis.",
    highlights: [
      "Consistent preparation through organized study guides and peer review",
      "Applied situational judgment to real-world elementary classroom dilemmas",
      "Tracked personal score progression across weekly formative checks",
    ],
    reflection:
      "Every quiz became a checkpoint for growth—showing me what I already mastered and where to study deeper.",
    status: "Graded",
  },
  {
    id: "act-6",
    title: "Tactile Instructional Materials (IMs) Craft Showcase",
    category: "Performance Tasks",
    module: "Unit 4 • Instructional Aids",
    date: "Week 11",
    summary:
      "Hands-on performance task creating durable, reusable visual flip-charts, flashcards, and manipulative boards for elementary learners.",
    highlights: [
      "Used high-contrast, kid-friendly typography and durable recycled board materials",
      "Designed interactive Velcro and pocket-chart elements for pupil participation",
      "Evaluated for legibility, creativity, and pedagogical relevance",
    ],
    reflection:
      "Seeing how colorful tactile materials immediately draw attention showed me the joy of making learning concrete for children.",
    status: "Exemplary Output",
  },
  {
    id: "act-7",
    title: "Classroom Demonstration Teaching Practicum",
    category: "Demonstration Teaching",
    module: "Unit 6 • Culminating Practicum",
    date: "Week 14",
    summary:
      "Live classroom demonstration teaching session observed and evaluated by Prof. Crispina B. Guillen and BEEd 2C peers.",
    highlights: [
      "Executed full 4As lesson with lively motivation, guided practice, and wrap-up",
      "Demonstrated positive reinforcement, clear board work, and smooth transitions",
      "Incorporated post-conference feedback into my teaching reflection journal",
    ],
    reflection:
      "Standing at the front of the room felt exhilarating—it confirmed beyond a doubt that teaching is where my heart belongs.",
    status: "Completed",
  },
];

export const galleryCategories: GalleryCategory[] = [
  "All Photos",
  "Classroom Activities",
  "Demonstration Teaching",
  "Submitted Outputs",
  "Certificates",
  "Graded Activities",
];

/**
 * PHOTO MAPPING GUIDE:
 * Drop Romnick's photos into `public/images/` using the filenames below
 * (or upload directly in the Photo Gallery on the site).
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "photo-top1",
    src: "/images/top-1-recognition.jpg",
    caption: "Congratulations Top 1! Classroom Recognition",
    category: "Certificates",
    date: "BEEd 2C Milestone",
    description:
      "Proud classroom moment receiving a 'Congratulations Top 1!' recognition gift in front of our Group Activity instructional board.",
    objectPosition: "object-[center_35%]",
  },
  {
    id: "photo-1",
    src: "/images/demo-teaching-1.jpg",
    caption: "Demonstration Teaching with Interactive Slides & Scoreboard",
    category: "Demonstration Teaching",
    date: "Practicum • NEMSU Lianga",
    description:
      "Delivering a live demonstration lesson in barong attire with headset mic, classroom TV assignment prompts, and group star scoreboards.",
    objectPosition: "object-[center_78%]",
  },
  {
    id: "photo-2",
    src: "/images/classroom-ims-1.jpg",
    caption: "Classroom Rules (W-A-T-E-R) & Behavioral Chart IMs",
    category: "Demonstration Teaching",
    date: "Instructional Materials",
    description:
      "Standing beside colorful SpongeBob-themed Classroom Rules, Bikini Bottom Behavioral Chart, and Score Board designed to keep elementary pupils engaged.",
    objectPosition: "object-[center_82%]",
  },
  {
    id: "photo-3",
    src: "/images/classroom-activity-group.jpg",
    caption: "BEEd 2C Campus Activity & Team Performance",
    category: "Classroom Activities",
    date: "NEMSU – Lianga Campus",
    description:
      "Celebrating teamwork, school spirit, and camaraderie with BEEd 2C classmates during a lively campus group presentation.",
    objectPosition: "object-center",
  },
  {
    id: "photo-4",
    src: "/images/submitted-eportfolio-output.jpg",
    caption: "Digital Portfolio & Educational Tech Output",
    category: "Submitted Outputs",
    date: "EdTech Showcase",
    description:
      "Glimpse of my BEEd-2C digital portfolio showcasing modern educational technology and student-centered elementary classroom solutions.",
    objectPosition: "object-[center_45%]",
  },
  {
    id: "photo-5",
    src: "/images/romnick-outdoor-portrait.jpg",
    caption: "Future Elementary Educator — BEEd 2C",
    category: "Classroom Activities",
    date: "Student Profile",
    description:
      "Carrying optimism, gratitude, and determination as I work toward my dream of becoming a licensed elementary teacher.",
    objectPosition: "object-[center_20%]",
  },
  {
    id: "photo-6",
    src: "/images/romnick-study-moment.jpg",
    caption: "Behind-the-Scenes Study & Lesson Preparation",
    category: "Graded Activities",
    date: "Study & Review",
    description:
      "Quiet moments preparing lesson plans, reviewing course notes, and completing graded requirements for BEEd 2C.",
    objectPosition: "object-[center_35%]",
  },
  {
    id: "photo-7",
    src: "/images/romnick-journey-commute.jpg",
    caption: "On the Road — Every Step Counts",
    category: "Classroom Activities",
    date: "Student Journey",
    description:
      "A glimpse of my everyday journey—reminding myself that every sacrifice, early morning, and mile brings me closer to my goals.",
    objectPosition: "object-[center_30%]",
  },
];

export const familyStoryData = {
  title: "My Family: My Greatest Inspiration in Life",
  closing: "All Glory to God Alone.",
  paragraphs: [
    "My family is one of the greatest blessings and inspirations in my life. We are six in the family, and each of us has our own dreams, responsibilities, and achievements. My father is an engineer, while my mother was a hardworking businesswoman who has already passed away. Although she is no longer physically with us, her love, sacrifices, and lessons will forever remain in my heart.",
    "I am blessed to have siblings who have also achieved success in their respective careers. My older brother is a ship captain working internationally, my older sister is a manager, and my youngest sibling is a customs broker and a board member. We also have an accountant in our family. Seeing their achievements makes me proud and reminds me that hard work, determination, and perseverance can lead us toward our dreams.",
    "Among us, I am the only one who is still studying. As a second-year Bachelor of Elementary Education student, I sometimes feel that I still have a long journey ahead. However, I do not see this as a weakness or a reason to compare myself with my siblings. Instead, I see it as an opportunity to build my own future, discover my purpose, and create a meaningful story of my own.",
    "Losing my mother has taught me that life is precious and that we should never take our loved ones for granted. I wish she could still witness my journey, celebrate my achievements, and see how far I can go. There are moments when I miss her, especially when I need her encouragement, but I carry her love as my strength to continue.",
    "Through my family, I have learned the importance of empathy, respect, understanding, and unconditional love. I realized that success is not measured only by professional titles, financial stability, or achievements. True success is also about having a loving family, appreciating one another, and remaining humble despite life's accomplishments.",
    "As I continue my education, I promise myself that I will also achieve my dreams in my own time. I want to make my father and my family proud, honor my mother's memory, and become a successful educator someday.",
    "My family is not just a part of my story; they are the reason why I continue writing it with courage, faith, and hope.",
  ],
};

export const familyPhotos: FamilyPhoto[] = [
  {
    id: "family-1",
    src: "/images/family-1.jpg",
    caption: "Whole Family Gathering at Home",
    date: "Family Celebration",
    description:
      "Gathered together around the dining table with Papa, siblings, nieces, nephews, and Mama's loving portrait right at the center.",
    objectPosition: "object-[center_68%]",
  },
  {
    id: "family-2",
    src: "/images/family-2.jpg",
    caption: "In Loving Memory of Mama",
    date: "Birthday Tribute",
    description:
      "Honoring Mama's love, sacrifices, and lessons that forever remain in our hearts.",
    objectPosition: "object-[center_35%]",
  },
  {
    id: "family-3",
    src: "/images/family-3.jpg",
    caption: "Family Dinner Together",
    date: "Shared Blessings",
    description:
      "Grateful moments sharing meals, laughter, and stories with the whole family.",
    objectPosition: "object-[center_72%]",
  },
  {
    id: "family-4",
    src: "/images/family-4.jpg",
    caption: "Family Park Outing & Smiles",
    date: "Quality Time",
    description:
      "Making joyful memories outdoors with siblings and the little ones.",
    objectPosition: "object-[center_62%]",
  },
  {
    id: "family-5",
    src: "/images/family-5.jpg",
    caption: "Cherished Home Memories with Mama",
    date: "Forever in Our Hearts",
    description:
      "Precious moments at home that remind me never to take our loved ones for granted.",
    objectPosition: "object-[center_25%]",
  },
  {
    id: "family-6",
    src: "/images/family-6.jpg",
    caption: "Remembering Mama Together",
    date: "Family Visit",
    description:
      "United in love and gratitude as we visit Mama's resting place together.",
    objectPosition: "object-center",
  },
  {
    id: "family-7",
    src: "/images/family-7.jpg",
    caption: "Simple Joys & Family Dining",
    date: "Family Outing",
    description:
      "Enjoying simple, happy moments together outside of busy school days.",
    objectPosition: "object-[center_28%]",
  },
  {
    id: "family-8",
    src: "/images/family-8.jpg",
    caption: "Family Pride & Inspiration",
    date: "Brotherhood",
    description:
      "Inspired every day by the hard work, discipline, and perseverance of my siblings.",
    objectPosition: "object-[center_28%]",
  },
  {
    id: "family-9",
    src: "/images/family-9.jpg",
    caption: "Guided by Faith & Blessings",
    date: "Family Blessing",
    description:
      "Faith and gratitude keep our family grounded through every chapter of life.",
    objectPosition: "object-[center_30%]",
  },
  {
    id: "family-10",
    src: "/images/family-10.jpg",
    caption: "Davao de Oro Public Service Milestone",
    date: "Sibling Achievement",
    description:
      "Celebrating dedication and public service in the Province of Davao de Oro.",
    objectPosition: "object-[center_55%]",
  },
  {
    id: "family-11",
    src: "/images/family-11.jpg",
    caption: "Family Wedding Celebration",
    date: "Blessed Union",
    description:
      "Celebrating love, faith, and new beginnings together at church.",
    objectPosition: "object-[center_45%]",
  },
  {
    id: "family-12",
    src: "/images/family-12.jpg",
    caption: "Honoring Mama Juanita P. Ramacula",
    date: "Loving Remembrance",
    description:
      "Carrying Mama's love and legacy forward with the younger generation.",
    objectPosition: "object-[center_55%]",
  },
  {
    id: "family-13",
    src: "/images/family-13.jpg",
    caption: "Sharing Wisdom & Excellence on Stage",
    date: "LPU Davao",
    description:
      "Seeing my siblings excel motivates me to work hard and achieve my own dreams in education.",
    objectPosition: "object-[center_35%]",
  },
];

export const galleryVideos: GalleryVideo[] = [];

export const instructorFeedback = {
  instructorName: "Prof. Crispina B. Guillen",
  instructorImage: "/images/prof.jpg",
  role: "Course Instructor • NEMSU – Lianga Campus",
  date: "End-of-Term Evaluation",
  note: "Romnick consistently demonstrates genuine heart, humility, and determination in his preparation as a future elementary educator. His outputs reflect careful organization, creativity in designing learner-friendly materials, and a willingness to grow from every piece of feedback. Keep nurturing that warmth and perseverance—your future pupils will be blessed to have you as their teacher.",
  tags: [
    "Dedicated & Resilient",
    "Creative Instructional Aids",
    "Reflective Future Educator",
  ],
};

export const reflectionEntries: ReflectionEntry[] = [
  {
    id: "ref-1",
    number: "Entry 01",
    title: "Key Course Takeaways",
    tag: "Pedagogical Foundations",
    accent: "green",
    content: [
      "This course transformed how I view the craft of teaching. Before this semester, I saw teaching mostly from a student's seat; now I deeply appreciate the deliberate artistry behind every learning objective, instructional material, and classroom routine.",
      "Under the guidance of Prof. Crispina B. Guillen, I learned that great elementary instruction blends structure with warmth—clear SMART objectives, engaging hands-on tasks, and thoughtful assessments that meet children where they are.",
    ],
  },
  {
    id: "ref-2",
    number: "Entry 02",
    title: "Growth as a Future Elementary Educator",
    tag: "Personal & Professional Growth",
    accent: "yellow",
    content: [
      "Looking back at my first worksheets compared to my culminating demonstration teaching, I can genuinely see how much my confidence and clarity have grown. I have become more comfortable speaking in front of a class, asking open-ended questions, and adapting when unexpected moments happen.",
      "Most importantly, I learned to welcome constructive feedback not as criticism, but as a compass pointing me toward becoming a better teacher every single day.",
    ],
  },
  {
    id: "ref-3",
    number: "Entry 03",
    title: "Overcoming Challenges Through Faith & Hard Work",
    tag: "Perseverance & Faith",
    accent: "coral",
    content: [
      "College life brings late nights, financial and personal sacrifices, and moments of quiet exhaustion. There were days when balancing coursework, crafting instructional materials, and managing daily responsibilities felt heavy.",
      "Yet through prayer, steadfast faith, and the support of my loved ones and BEEd 2C classmates, I kept moving forward. Every obstacle reminded me why I started: my background does not define my future, and with hard work and grace, extraordinary dreams are within reach.",
    ],
  },
  {
    id: "ref-4",
    number: "Entry 04",
    title: "Future Classroom Application",
    tag: "Vision for My Future Pupils",
    accent: "blue",
    content: [
      "When I finally step into my own elementary classroom, I want my pupils to walk in feeling safe, celebrated, and excited to discover new things. I will carry forward the tactile instructional materials, structured 4As lessons, and compassionate classroom management I practiced here.",
      "Above all, I promise to be the kind of teacher who sees the quiet child in the back row, believes in their potential, and reminds them that they are capable of greatness.",
    ],
  },
];
