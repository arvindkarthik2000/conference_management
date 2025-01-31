use conference_db;

INSERT INTO mentors (name, area_of_expertise) VALUES
('Dr. Alice Johnson', 'Machine Learning'),
('Prof. Michael Smith', 'Natural Language Processing'),
('Dr. Emma Brown', 'Computer Vision'),
('Dr. Daniel Davis', 'Reinforcement Learning'),
('Prof. Sophia Martinez', 'Explainable AI');

INSERT INTO mentor_availability (mentor_id, available_date, available_time)
VALUES
(1, '2025-03-10', '10:00:00'),
(1, '2025-03-10', '14:00:00'),
(2, '2025-03-11', '09:30:00'),
(2, '2025-03-11', '13:30:00'),
(3, '2025-03-12', '11:00:00'),
(3, '2025-03-12', '15:00:00'),
(4, '2025-03-13', '10:00:00'),
(4, '2025-03-13', '16:00:00'),
(5, '2025-03-14', '09:00:00'),
(5, '2025-03-14', '14:30:00');


INSERT INTO Schedule (title, time, speaker, description)
VALUES ('Opening Keynote: Future of AI', '2025-03-01 09:00:00', 'Dr. Jane Doe', 'A visionary talk on the transformative potential of AI in the next decade.');

INSERT INTO Schedule (title, time, speaker, description)
VALUES ('Generative AI: Opportunities and Risks', '2025-03-01 11:00:00', 'Prof. Alan Turing', 'A deep dive into the latest advancements in generative AI and ethical considerations for its usage.');

INSERT INTO Schedule (title, time, speaker, description)
VALUES ('AI in Healthcare: Revolutionizing Medicine', '2025-03-01 14:00:00', 'Dr. Emily Carter', 'Explore how AI is transforming diagnostics, treatment, and patient care in the healthcare industry.');

INSERT INTO Schedule (title, time, speaker, description)
VALUES ('Panel Discussion: AI for Sustainability', '2025-03-01 16:00:00', 'Panel of Industry Experts', 'A discussion on how AI can address climate change, energy efficiency, and environmental sustainability.');

INSERT INTO Schedule (title, time, speaker, description)
VALUES ('Closing Keynote: Ethics and Governance in AI', '2025-03-01 18:00:00', 'Dr. John Smith', 'A thought-provoking session on ethical challenges and governance frameworks needed for responsible AI adoption.');


INSERT INTO articles (name, location)
VALUES ('The Role of AI in Revolutionizing Healthcare', 'https://www.alation.com/blog/ai-healthcare-top-use-cases/');

INSERT INTO articles (name, location)
VALUES ('How AI is Enhancing Cybersecurity', 'https://kpmg.com/ch/en/insights/cybersecurity-risk/artificial-intelligence-influences.html');

INSERT INTO articles (name, location)
VALUES ('The Future of AI in Education', 'https://www.weforum.org/stories/2024/04/future-learning-ai-revolutionizing-education-4-0/');

INSERT INTO articles (name, location)
VALUES ('AI in Environmental Sustainability: Innovations and Challenges', 'https://www.sciencedirect.com/science/article/abs/pii/S0268401220300967');

INSERT INTO articles (name, location)
VALUES ('The Impact of AI on Financial Services and Fraud Detection', 'https://www.infosysbpm.com/blogs/bpm-analytics/fraud-detection-with-ai-in-banking-sector.html');


INSERT INTO webinars (name, date, location)
VALUES ('AI for Math', '2025-02-15 14:00:00', 'https://icml.cc/virtual/2024/workshop/29948');

INSERT INTO webinars (name, date, location)
VALUES ('Models of Human Feedback for AI Alignment', '2025-03-10 16:30:00', 'https://icml.cc/virtual/2024/workshop/29943');

INSERT INTO webinars (name, date, location)
VALUES ('ML for Life and material science', '2025-04-05 10:00:00', 'https://icml.cc/virtual/2024/workshop/29955');

INSERT INTO webinars (name, date, location)
VALUES ('Next Generation of AI Safety', '2025-05-12 13:00:00', 'https://icml.cc/virtual/2024/workshop/29944');

INSERT INTO webinars (name, date, location)
VALUES ('AI, LLMS and more', '2025-06-20 15:00:00', 'https://www.brighttalk.com/webcast/19090/629805?utm_source=brighttalk-portal&utm_medium=web&utm_campaign=topic&utm_content=on-demand');


INSERT INTO job_posts (title, description, company, application_email)
VALUES (
    'Machine Learning Engineer',
    'Develop and optimize machine learning models for predictive analytics. Collaborate with data scientists to implement AI solutions in production environments.',
    'TechInnovate Inc.',
    'careers@techinnovate.com'
);

INSERT INTO job_posts (title, description, company, application_email)
VALUES (
    'AI Research Scientist',
    'Conduct cutting-edge research in artificial intelligence, focusing on NLP and computer vision. Publish findings and contribute to open-source projects.',
    'NextGen AI Labs',
    'jobs@nextgenai.com'
);

INSERT INTO job_posts (title, description, company, application_email)
VALUES (
    'Data Scientist in Healthcare AI',
    'Analyze and interpret complex healthcare datasets. Build AI-driven solutions to improve patient outcomes and hospital operations.',
    'HealthTech Solutions',
    'hr@healthtech.com'
);

INSERT INTO job_posts (title, description, company, application_email)
VALUES (
    'Cybersecurity Analyst with AI Expertise',
    'Monitor and prevent cyber threats using AI-powered detection tools. Collaborate with IT teams to improve security infrastructure.',
    'SecureNet Corp.',
    'jobs@securenet.com'
);

INSERT INTO job_posts (title, description, company, application_email)
VALUES (
    'AI Product Manager',
    'Lead the development of AI-based products, ensuring alignment with market needs. Coordinate between engineering, design, and business teams.',
    'InnoVision Systems',
    'careers@innovision.com'
);


INSERT INTO conferences (name, date, location, recorded_link) 
VALUES 
('Future of AI in Healthcare', '2025-05-10 10:00:00', 'https://www.youtube.com/embed/8MCT3bsGgeU?si=WEblTwT59SUnUKrL', 'https://www.youtube.com/watch?v=8MCT3bsGgeU');

INSERT INTO conferences (name, date, location, recorded_link) 
VALUES 
('Cybersecurity and AI Innovations', '2025-06-15 14:00:00', 'https://www.youtube.com/embed/iTxSAZitJG8?si=Jyb4tJpkFtDroUMt', 'https://www.youtube.com/watch?v=iTxSAZitJG8');

INSERT INTO conferences (name, date, location, recorded_link) 
VALUES 
('Sustainable AI for Climate Action', '2025-07-20 16:00:00', 'https://www.youtube.com/embed/KrRD7r7y7NY?si=8eF2eaAnE3V7MdOt', 'https://www.youtube.com/watch?v=s0dMTAQM4cw');

INSERT INTO conferences (name, date, location, recorded_link) 
VALUES 
('Next-Gen Machine Learning Techniques', '2025-08-05 12:00:00', 'https://www.youtube.com/embed/vmKKpIXyQbI?si=9bqfc3Af-2wl3gd7', 'https://www.youtube.com/watch?v=vmKKpIXyQbI');

