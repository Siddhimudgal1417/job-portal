// Mock data for JobConnect
export const jobs = [
  { id: "1", title: "Frontend Engineer Intern", company: "Stripe", logo: "S", location: "Bangalore, India", type: "Internship", salary: "₹40k–60k/mo", tags: ["React", "TypeScript", "Tailwind"], posted: "2d ago", match: 92, remote: true },
  { id: "2", title: "Junior Data Analyst", company: "Razorpay", logo: "R", location: "Bangalore", type: "Full-time", salary: "₹8–12 LPA", tags: ["SQL", "Python", "Tableau"], posted: "1d ago", match: 87, remote: false },
  { id: "3", title: "Product Design Intern", company: "Linear", logo: "L", location: "Remote", type: "Internship", salary: "$2k/mo", tags: ["Figma", "UX", "Prototyping"], posted: "5h ago", match: 78, remote: true },
  { id: "4", title: "Backend Developer", company: "Zerodha", logo: "Z", location: "Bangalore", type: "Full-time", salary: "₹12–18 LPA", tags: ["Node.js", "Postgres", "Redis"], posted: "3d ago", match: 81, remote: false },
  { id: "5", title: "ML Research Intern", company: "Sarvam AI", logo: "SA", location: "Bangalore", type: "Internship", salary: "₹50k/mo", tags: ["PyTorch", "NLP", "Python"], posted: "1w ago", match: 73, remote: true },
  { id: "6", title: "Growth Marketing Associate", company: "Cred", logo: "C", location: "Mumbai", type: "Full-time", salary: "₹10–14 LPA", tags: ["SEO", "Analytics", "Content"], posted: "6d ago", match: 65, remote: false },
  { id: "7", title: "Full Stack Engineer", company: "Postman", logo: "P", location: "Remote", type: "Full-time", salary: "₹18–25 LPA", tags: ["React", "Go", "AWS"], posted: "12h ago", match: 89, remote: true },
  { id: "8", title: "QA Automation Intern", company: "Freshworks", logo: "F", location: "Chennai", type: "Internship", salary: "₹25k/mo", tags: ["Selenium", "Cypress", "JS"], posted: "4d ago", match: 70, remote: false },
];

export const applications = [
  { id: "a1", company: "Stripe", role: "Frontend Engineer Intern", status: "Interview", date: "2025-06-18", stage: 3 },
  { id: "a2", company: "Razorpay", role: "Junior Data Analyst", status: "Under Review", date: "2025-06-20", stage: 2 },
  { id: "a3", company: "Linear", role: "Product Design Intern", status: "Applied", date: "2025-06-22", stage: 1 },
  { id: "a4", company: "Zerodha", role: "Backend Developer", status: "Rejected", date: "2025-06-10", stage: 0 },
  { id: "a5", company: "Postman", role: "Full Stack Engineer", status: "Offer", date: "2025-06-15", stage: 4 },
  { id: "a6", company: "Sarvam AI", role: "ML Research Intern", status: "Rejected", date: "2025-06-05", stage: 0 },
  { id: "a7", company: "Cred", role: "Growth Marketing", status: "Under Review", date: "2025-06-19", stage: 2 },
  { id: "a8", company: "Freshworks", role: "QA Automation Intern", status: "Applied", date: "2025-06-23", stage: 1 },
];

export const referrals = [
  { id: "r1", name: "Ananya Kapoor", role: "SDE-2 @ Stripe", avatar: "AK", openings: 3, response: "94%", skills: ["React", "TypeScript"] },
  { id: "r2", name: "Rohan Mehta", role: "Engineering Manager @ Razorpay", avatar: "RM", openings: 5, response: "88%", skills: ["Backend", "Systems"] },
  { id: "r3", name: "Priya Sharma", role: "Product Designer @ Linear", avatar: "PS", openings: 2, response: "97%", skills: ["UX", "Figma"] },
  { id: "r4", name: "Karthik Iyer", role: "ML Engineer @ Sarvam", avatar: "KI", openings: 1, response: "82%", skills: ["ML", "Python"] },
];

export const testimonials = [
  { name: "Aditi Verma", role: "CS Student → Stripe Intern", avatar: "AV", quote: "JobConnect told me exactly why I was getting rejected. Fixed my resume, got 4 interviews in 2 weeks." },
  { name: "Vikram Singh", role: "Fresher → Razorpay SDE", avatar: "VS", quote: "The Failure Analyzer is unreal. It found 6 missing skills I never noticed. Got hired in 30 days." },
  { name: "Sneha Reddy", role: "MBA → Cred PM", avatar: "SR", quote: "Mock interviews felt real. The feedback was specific, actionable, and brutally honest. Loved it." },
];

export const applicationTrend = [
  { week: "W1", applied: 12, interviews: 1, offers: 0 },
  { week: "W2", applied: 18, interviews: 2, offers: 0 },
  { week: "W3", applied: 22, interviews: 4, offers: 1 },
  { week: "W4", applied: 16, interviews: 5, offers: 1 },
  { week: "W5", applied: 20, interviews: 7, offers: 2 },
  { week: "W6", applied: 14, interviews: 6, offers: 3 },
];

export const skillRadar = [
  { skill: "React", you: 85, market: 90 },
  { skill: "TypeScript", you: 72, market: 85 },
  { skill: "System Design", you: 45, market: 75 },
  { skill: "DSA", you: 68, market: 80 },
  { skill: "Communication", you: 78, market: 70 },
  { skill: "SQL", you: 60, market: 75 },
];

export const careerScores = {
  ats: 78,
  resume: 84,
  interview: 66,
  success: 23,
  skill: 71,
  growth: 82,
};

export const employerApplicants = [
  { id: "e1", name: "Aarav Gupta", role: "Frontend Intern", match: 94, status: "Interview", exp: "Fresher" },
  { id: "e2", name: "Diya Nair", role: "Frontend Intern", match: 91, status: "Shortlisted", exp: "1 yr" },
  { id: "e3", name: "Ishaan Roy", role: "Frontend Intern", match: 87, status: "Applied", exp: "Fresher" },
  { id: "e4", name: "Meera Joshi", role: "Frontend Intern", match: 82, status: "Applied", exp: "2 yrs" },
  { id: "e5", name: "Yash Patel", role: "Frontend Intern", match: 76, status: "Review", exp: "Fresher" },
];

export const interviewQuestions = [
  { id: "q1", q: "Tell me about a time you debugged a really hard production issue.", topic: "Behavioral", difficulty: "Medium" },
  { id: "q2", q: "Explain the difference between useMemo and useCallback in React.", topic: "Frontend", difficulty: "Easy" },
  { id: "q3", q: "Design a URL shortener like bit.ly. Walk me through the system.", topic: "System Design", difficulty: "Hard" },
  { id: "q4", q: "Reverse a linked list in-place. Optimize for space.", topic: "DSA", difficulty: "Medium" },
  { id: "q5", q: "Why do you want to work here, and where do you see yourself in 3 years?", topic: "Behavioral", difficulty: "Easy" },
];
