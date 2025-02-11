-- Insert initial learning resources (Example Data)
INSERT INTO learning_resources (resource_type, title, description, url, topic) VALUES
('video', 'Python for Beginners', 'A beginner-friendly introduction to Python programming.', 'https://www.youtube.com/watch?v=your_python_video_id_1', 'Python'),
('article', 'CSS Styling Fundamentals', 'Learn the basics of CSS for web page styling.', 'https://www.example-css-article.com/fundamentals', 'Web Development'),
('course', 'Advanced JavaScript Concepts', 'An in-depth course on advanced JavaScript features.', 'https://www.example-javascript-course.com/advanced', 'Web Development'),
('video', 'Data Structures in Python', 'Learn about common data structures in Python.', 'https://www.youtube.com/watch?v=your_python_video_id_2', 'Python');

-- Insert quiz for 'Python for Beginners' resource (Example Quiz Data - JSON format)
INSERT INTO quizzes (resource_id, questions, answers) VALUES (
    (SELECT resource_id FROM learning_resources WHERE title = 'Python for Beginners'),
    '[
        {
            "questionText": "What type of language is Python?",
            "options": ["Compiled", "Interpreted", "Assembly", "Machine Code"],
            "correctAnswerIndex": 1
        },
        {
            "questionText": "Which keyword is used to define a function in Python?",
            "options": ["function", "def", "fun", "define"],
            "correctAnswerIndex": 1
        }
    ]',
    '[1, 1]' -- Correct answer indices for each question
);

-- You can add more initial data (users, more resources, more quizzes) as needed.