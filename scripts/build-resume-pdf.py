#!/usr/bin/env python3
"""
Build Derren Winata's resume PDF.

Design is reproduced from the original `public/Derren_Winata_Resume.pdf`:
  - US Letter, 1in side margins (72pt -> 540pt text column)
  - Name:      Times New Roman Bold 20pt, centred
  - Contact:   Times New Roman 11pt, centred, link-blue #1155CC, underlined
  - Section:   Times New Roman Bold 14pt, left, with a rule beneath (72 -> 540)
  - Entry:     org Times Bold 11pt (left) + dates Times 11pt (right aligned)
  - Body:      Times New Roman 10.5pt, Arial bullet glyph at 18pt, text at 36pt
  - Skills:    bold label followed by regular content

Content sources (nothing invented):
  src/data/experiences.ts, src/data/projects.ts, src/data/certifications.ts,
  src/data/recommendations.ts, src/lib/site.ts, scripts/draft-resume.md,
  and the original PDF's own contact block.

Run:  python3 scripts/build-resume-pdf.py
"""

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus import ListFlowable, ListItem

import os
import sys

# ---------------------------------------------------------------- constants --

PAGE_W, PAGE_H = LETTER
MARGIN_X = 72.0                      # 1 inch, matches the original
TEXT_W = PAGE_W - 2 * MARGIN_X       # 468pt  (72 -> 540)
MARGIN_TOP = 26.0                    # name baseline block starts here
MARGIN_BOTTOM = 28.0

LINK_BLUE = colors.Color(17 / 255, 86 / 255, 204 / 255)   # #1155CC
BLACK = colors.Color(0, 0, 0)

ROMAN, BOLD = "Times-Roman", "Times-Bold"
GLYPH = "Helvetica"                  # the original used Arial for the bullet

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "public", "Derren_Winata_Resume.pdf")


# ------------------------------------------------------------------- styles --

def S(name, **kw):
    base = dict(
        fontName=ROMAN, fontSize=10.5, leading=12.6,
        textColor=BLACK, alignment=TA_LEFT,
    )
    base.update(kw)
    return ParagraphStyle(name, **base)


st_name = S("name", fontName=BOLD, fontSize=20, leading=22, alignment=TA_CENTER)
st_contact = S("contact", fontSize=11, leading=14, alignment=TA_CENTER)
st_summary = S("summary", fontSize=10.5, leading=12.0, alignment=TA_CENTER,
               leftIndent=10, rightIndent=10)
st_section = S("section", fontName=BOLD, fontSize=14, leading=16.5,
               spaceBefore=0, spaceAfter=2)
st_org = S("org", fontName=BOLD, fontSize=11, leading=12.0)
st_meta = S("meta", fontSize=11, leading=12.0)
st_role = S("role", fontSize=11, leading=12.0, spaceAfter=0)
st_body = S("body", fontSize=10.5, leading=10.4)
st_note = S("note", fontSize=10.5, leading=12.6, spaceBefore=1)
st_skill = S("skill", fontSize=10.5, leading=10.8, spaceAfter=0)
st_cert = S("cert", fontSize=10.5, leading=10.6)
st_cert_head = S("certhead", fontName=BOLD, fontSize=10.5, leading=12.4,
                 spaceBefore=2)


# ----------------------------------------------------------------- helpers --

def section(title):
    """Section heading + full-width rule, as in the original."""
    return [
        Paragraph(title, st_section),
        HRFlowable(width="100%", thickness=0.7, color=BLACK,
                   spaceBefore=1, spaceAfter=2),
    ]


def entry(org, dates, roles):
    """Org (bold, left) + dates (right) + one or more role lines."""
    head = Table(
        [[Paragraph(org, st_org), Paragraph(dates, st_meta)]],
        colWidths=[TEXT_W - 150, 150],
    )
    head.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    out = [head]
    for r in roles:
        out.append(Paragraph(r, st_role))
    return out


def bullets(items):
    """Hanging-indent bullet list, glyph at 18pt / text at 36pt."""
    return ListFlowable(
        [ListItem(Paragraph(t, st_body), leftIndent=18) for t in items],
        bulletType="bullet", start="\u2022",
        bulletFontSize=10.5, bulletFontName=GLYPH, bulletOffsetY=0,
        leftIndent=18, spaceBefore=1, spaceAfter=1,
    )


def skill(label, content):
    return Paragraph(f"<b>{label}</b> {content}", st_skill)


def link(text, href):
    return f'<a href="{href}" color="#1155CC"><u>{text}</u></a>'


# ------------------------------------------------------------------ content --

CONTACT = " | ".join([
    link("LinkedIn", "https://www.linkedin.com/in/derren-winata/"),
    "(+65) 8355 3698",
    link("wderren17@gmail.com", "mailto:wderren17@gmail.com"),
    link("Website", "https://derren-winata.com"),
    link("GitHub", "https://github.com/darderrdur17"),
])

SUMMARY = (
    "NUS Data Science &amp; Analytics, Class of 2026 &mdash; ships AI apps, "
    "data products, and full-stack software."
)

EXPERIENCE = [
    (
        "AI Singapore, Singapore",
        "Mar 2026 &ndash; Jul 2026",
        ["Programme &amp; Partnerships Assistant &middot; Part-time"],
        [
            "Built and deployed the AI for Good website (Next.js, TypeScript, Tailwind CSS) covering impact stats, SDG alignment, and ASEAN partnership footprint.",
            "Developed the NSWS automation platform (an internal operations tool) using FastAPI, PostgreSQL, Celery, ChromaDB, and LangGraph for AI-assisted operations, briefs, compliance reminders, and reporting agents.",
            "Built the AI Ready ASEAN Youth Challenge 2026 Judging Portal (Next.js, Supabase) with judge assignments, weighted scoring, dashboards, CSV export, and audit logs.",
        ],
    ),
    (
        "360 Cogni, Singapore",
        "Jan 2026 &ndash; Jul 2026",
        ["Product Manager Intern"],
        [
            "Defined MVP scope and roadmap across cognitive screening, personalised results, and brain training resources for 1,000+ users.",
            "Designed 5+ key flows (onboarding, demographics, assessment, results, resources) with mobile-first UX across iOS, Android, and desktop.",
            "Specified integrations (GMS assessment API, Supabase, Vercel, SendGrid), database schema, and Edge Functions for email automation; tracked conversion funnels and folded 20+ user-testing improvements into the shipped MVP at 360cogni.com.",
        ],
    ),
    (
        "AI Singapore, Singapore (Remote)",
        "Mar 2024 &ndash; Jul 2026",
        ["Quality Assurance Assistant &middot; Part-time"],
        [
            "Validated datasets used in product launches, reducing post-launch errors by 30%.",
            "Cross-referenced 1,000+ data files against official government and third-party sources.",
        ],
    ),
    (
        "Sunnystep, Singapore",
        "Mar 2026 &ndash; Apr 2026",
        ["AI Agent Intern"],
        [
            "Built a Node.js marketing intelligence pipeline with Anthropic Claude for daily briefs, monthly calendars, and weekly performance views.",
            "Automated delivery via scheduler so stakeholders received structured updates without manual prep.",
        ],
    ),
    (
        "National University of Singapore, Singapore",
        "Dec 2025 &ndash; Mar 2026",
        ["Full-Stack Web Developer &mdash; Educational Jigsaw Game &middot; Part-time"],
        [
            "Built lobby, shareable sessions, Game Master controls, two-phase puzzles, timers, points, and post-round results.",
            "Delivered touch/drag puzzle play on mobile and used Supabase for real-time updates and leaderboards.",
        ],
    ),
    (
        "National University of Singapore, Singapore",
        "Nov 2025 &ndash; Feb 2026",
        ["Student Researcher &middot; Part-time"],
        [
            "Architected a React/TypeScript and Node.js/Express app for EQ-5D-5L Classic TTO health economics research.",
            "Built real-time utility calculations, Admin/Interviewer dashboards, and an AI co-pilot for protocol guidance.",
            "Implemented GDPR-aligned auth and encryption, plus WCAG 2.1 AA support in English, Spanish, Chinese, and Indonesian.",
        ],
    ),
    (
        "National University of Singapore, Singapore",
        "Sep 2025 &ndash; Nov 2025",
        ["Web &amp; Mobile Development Intern &middot; Part-time"],
        [
            "Developed a full-stack web and mobile app for cognitive health screening in DSFP, a national cognitive-health screening programme.",
            "Added accessibility, English/Chinese/Malay support, and a caregiver management view with analytics.",
        ],
    ),
    (
        "National University of Singapore, Singapore",
        "Sep 2025 &ndash; Oct 2025",
        ["Data Engineering Research Assistant &middot; Part-time"],
        [
            "Built an end-to-end pipeline scraping, cleaning, and validating 2,695+ halal-certified establishments from MUIS, Singapore's Islamic religious authority.",
            "Reached 99.72% address coverage and 100% postal code coverage across 28 postal districts.",
            "Shipped 30+ Python scripts, quality reports, and reproducible Makefile workflows.",
        ],
    ),
    (
        "Firsty.app, Singapore (Hybrid)",
        "May 2025 &ndash; Jul 2025",
        ["Client Development Intern"],
        [
            "Designed and automated a LinkedIn outreach workflow for prospect filtering and message sequencing.",
            "Identified 300+ APAC companies based on ICP criteria to sharpen targeting.",
        ],
    ),
    (
        "Medisaya, Singapore (Hybrid)",
        "Feb 2025 &ndash; Jun 2025",
        ["Software Developer"],
        [
            "Developed Python scrapers that extracted 50k+ records and cut manual collection time by 70%.",
            "Built and maintained Django REST APIs for secure health data access.",
        ],
    ),
    (
        "Marina Bay Sands, Singapore (Hybrid)",
        "May 2024 &ndash; Dec 2024",
        ["eCommerce Analytics Intern"],
        [
            "Automated a critical stakeholder report with Python and Power Automate, reducing preparation time by ~83%.",
            "Led the website Data Layer rollout, improving overall data accuracy to 98%, and configured Tealium IQ tracking, increasing reliability of captured data by 20%.",
            "Analysed traffic and marketing data with recommendations that lifted conversion rates by 15%, and partnered with Performance Marketing on A/B tests that improved campaign ROI by 10%.",
        ],
    ),
]

PROJECTS = [
    "<b>360 Cogni</b> &mdash; React 19, React Native, Supabase &middot; dementia and cognitive health platform, live at 360cogni.com (1,000+ user target)",
    "<b>EQ-5D-5L TTO Research Tool</b> &mdash; React, Node.js, PostgreSQL &middot; real-time health-economics utility scoring with an AI co-pilot, WCAG 2.1 AA and GDPR-aligned",
    "<b>Bayesian Pair Trading</b> &mdash; Python, Optuna &middot; walk-forward optimised S&amp;P 500 pairs trading with dual cointegration testing",
    "<b>Pulse &mdash; Social Intelligence</b> &mdash; Go, PostgreSQL, Kafka &middot; concurrent Hacker News and Reddit crawler streaming scored events through Kafka",
    "<b>Sunnystep Strides</b> &mdash; React 18, Supabase, Recharts &middot; AI marketing automation dashboard with agent-driven briefs and content calendars",
    "<b>Halal Food Landscape</b> &mdash; Python, Pandas, Selenium &middot; MUIS registry pipeline covering 2,695+ establishments at 99.72% address coverage",
]

SKILLS = [
    ("Languages:", "Python, TypeScript, SQL, Go, Bash/Shell scripting"),
    ("Frontend:", "React 19, React Native, Next.js, Expo, Tailwind CSS, Recharts"),
    ("Backend &amp; APIs:", "Node.js, Express, FastAPI, Django REST Framework, Supabase, Vercel, Edge Functions"),
    ("Data &amp; Pipelines:", "PostgreSQL, Snowflake, Databricks, ChromaDB, Pandas, Apache Airflow, Kafka, Celery, ETL/ELT, data warehousing, database administration, RBAC"),
    ("AI &amp; LLM:", "LangGraph, Anthropic Claude, Amazon Bedrock, Model Context Protocol (MCP), RAG, prompt engineering, tool calling, agent monitoring"),
    ("Analytics &amp; Measurement:", "Tealium IQ, Google Analytics, Tableau, Power Automate, Selenium, Optuna, A/B testing, conversion funnels, KPI optimisation"),
    ("Product:", "MVP scoping, roadmap definition, UX flows, user testing, stakeholder reporting"),
    ("Accessibility &amp; Compliance:", "WCAG 2.1 AA, GDPR-aligned auth and encryption"),
    ("Practices:", "Reproducible Makefile workflows, quality reporting, code review, QA sign-off"),
]

CERTIFICATIONS = [
    ("AI &amp; LLM:",
     "Snowflake Generative AI Professional Certificate &mdash; Snowflake &middot; Coursera, Sep 2026 (ID M5ZEUB06DKRU); "
     "Claude with the Anthropic API, Claude with Amazon Bedrock, Claude Platform 101, AI Fluency: Framework &amp; Foundations, "
     "Introduction to Model Context Protocol &mdash; Anthropic, Aug 2026; "
     "AI Fundamentals: Language and Vision in AI, AI Fundamentals: Foundations for Understanding AI &mdash; IBM, Aug 2026"),
    ("Data &amp; Analytics:",
     "IBM Relational Database Administrator with GenAI Professional Certificate &mdash; IBM &middot; Coursera, Sep 2026 (ID IGHUSCNY8XUT); "
     "Snowflake Data Engineering Professional Certificate &mdash; Snowflake &middot; Coursera, Sep 2026 (ID 4GUSO181FPT6); "
     "ETL and Data Pipelines with Shell, Airflow and Kafka &mdash; IBM &middot; Coursera, Sep 2026 (ID LBCATH579UE3); "
     "Google Data Analytics Professional Certificate &mdash; Google &middot; Coursera, Aug 2026 (ID ZLCROBCFKI5Y); "
     "Databricks Fundamentals Accreditation &mdash; Databricks, Aug 2026; "
     "Google Analytics Certification &mdash; Google, Aug 2026 (expires Aug 2027, ID 191811640); "
     "Data Analytics and Visualization Job Simulation &mdash; Accenture &middot; Forage, Dec 2023"),
    ("Project Management:",
     "Google Project Management Professional Certificate &mdash; Google &middot; Coursera, Aug 2026 (ID UBNQ12MMPGA0)"),
    ("Finance:",
     "Bloomberg Market Concepts (BMC) &mdash; Bloomberg for Education, Sep 2026"),
]

# -------------------------------------------------------------------- build --

def build():
    doc = BaseDocTemplate(
        OUT, pagesize=LETTER,
        leftMargin=MARGIN_X, rightMargin=MARGIN_X,
        topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM,
        title="Derren Winata - Resume",
        author="Derren Winata",
        subject="Data Science & Analytics, AI and full-stack engineering",
        creator="Derren Winata",
    )
    frame = Frame(MARGIN_X, MARGIN_BOTTOM, TEXT_W,
                  PAGE_H - MARGIN_TOP - MARGIN_BOTTOM, id="body",
                  leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame])])

    f = []
    f.append(Paragraph("Derren Winata", st_name))
    f.append(Spacer(1, 3))
    f.append(Paragraph(CONTACT, st_contact))
    f.append(Spacer(1, 5))
    f.append(Paragraph(SUMMARY, st_summary))
    f.append(Spacer(1, 7))

    # Education
    f += section("Education")
    f += entry(
        "National University of Singapore, Singapore, SG",
        "Aug &lsquo;22 &ndash; Aug &lsquo;26",
        ["Bachelor of Science, Data Science and Analytics"],
    )
    f.append(Paragraph(
        "<b>Coursework:</b> Data Structures and Algorithms, Probability, "
        "Data Analytics Tools, Linear Algebra, Calculus, Programming "
        "Methodology (Python)", st_note))
    f.append(Spacer(1, 6))

    # Experience
    f += section("Experience")
    for org, dates, roles, items in EXPERIENCE:
        f += entry(org, dates, roles)
        f.append(bullets(items))
        f.append(Spacer(1, 0))

    # Selected Projects
    f += section("Selected Projects")
    for text in PROJECTS:
        f.append(Paragraph(text, st_body))
        f.append(Spacer(1, 1))

    # Skills
    f += section("Skills")
    for label, content in SKILLS:
        f.append(skill(label, content))

    # Certifications
    f += section("Certifications")
    for group, items in CERTIFICATIONS:
        f.append(Paragraph(f"<b>{group}</b> {items}", st_cert))
        f.append(Spacer(1, 0))

    # Awards & Languages
    f += section("Awards &amp; Languages")
    f.append(Paragraph(
        "<b>Awards:</b> Bronze Award &mdash; Mathematical Olympiads. "
        "Thailand IMO &amp; GBA Olympiad &bull; 2021&ndash;2022", st_skill))
    f.append(Paragraph(
        "<b>Languages:</b> Fluent in English and Bahasa Indonesia; "
        "limited working proficiency in Chinese", st_skill))

    doc.build(f)


if __name__ == "__main__":
    build()
    size = os.path.getsize(OUT)
    print(f"wrote {OUT} ({size:,} bytes)")
