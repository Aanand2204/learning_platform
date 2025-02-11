CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    preferences JSONB
);

CREATE TABLE learning_resources (
    resource_id SERIAL PRIMARY KEY,
    resource_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    topic VARCHAR(100)
);

CREATE TABLE user_progress (
    user_id INT,
    resource_id INT,
    progress_percentage FLOAT DEFAULT 0.0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, resource_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (resource_id) REFERENCES learning_resources(resource_id)
);

CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    resource_id INT,
    questions JSONB,
    answers JSONB,
    FOREIGN KEY (resource_id) REFERENCES learning_resources(resource_id)
);

CREATE TABLE user_quiz_results (
    result_id SERIAL PRIMARY KEY,
    user_id INT,
    quiz_id INT,
    score INT,
    submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);