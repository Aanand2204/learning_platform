from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    preferences = db.Column(db.JSON) # Example: Store preferences as JSON

    def __repr__(self):
        return f'<User {self.username}>'

class LearningResource(db.Model):
    __tablename__ = 'learning_resources'
    resource_id = db.Column(db.Integer, primary_key=True)
    resource_type = db.Column(db.String(50), nullable=False) # e.g., "video", "article", "book"
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    url = db.Column(db.String(500), nullable=False)
    topic = db.Column(db.String(100)) # e.g., "Python", "Web Development"

    def __repr__(self):
        return f'<LearningResource {self.title}>'

class UserProgress(db.Model):
    __tablename__ = 'user_progress'
    progress_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    resource_id = db.Column(db.Integer, db.ForeignKey('learning_resources.resource_id'), nullable=False)
    progress_percentage = db.Column(db.Float, default=0.0) # Progress as a percentage (0.0 to 100.0)
    db.UniqueConstraint('user_id', 'resource_id', name='unique_user_resource') # Ensure unique progress per user per resource

    user = db.relationship('User', backref=db.backref('learning_progress', lazy=True))
    resource = db.relationship('LearningResource', backref=db.backref('user_progress', lazy=True))

    def __repr__(self):
        return f'<UserProgress user_id={self.user_id}, resource_id={self.resource_id}, progress={self.progress_percentage}>'

class Quiz(db.Model):
    __tablename__ = 'quizzes'
    quiz_id = db.Column(db.Integer, primary_key=True)
    resource_id = db.Column(db.Integer, db.ForeignKey('learning_resources.resource_id'), nullable=False)
    questions = db.Column(db.JSON, nullable=False) # Store quiz questions as JSON
    answers = db.Column(db.JSON, nullable=False)   # Store correct answers as JSON

    resource = db.relationship('LearningResource', backref=db.backref('quiz', uselist=False, lazy=True)) # One-to-one relationship

    def __repr__(self):
        return f'<Quiz quiz_id={self.quiz_id}, resource_id={self.resource_id}>'

class UserQuizResult(db.Model):
    __tablename__ = 'user_quiz_results'
    result_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.quiz_id'), nullable=False)
    score = db.Column(db.Float, nullable=False) # Quiz score as percentage

    user = db.relationship('User', backref=db.backref('quiz_results', lazy=True))
    quiz = db.relationship('Quiz', backref=db.backref('user_results', lazy=True))

    def __repr__(self):
        return f'<UserQuizResult user_id={self.user_id}, quiz_id={self.quiz_id}, score={self.score}>'