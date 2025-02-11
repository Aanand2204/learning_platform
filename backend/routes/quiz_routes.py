from flask import Blueprint, jsonify, request
from models import Quiz, UserQuizResult, db

quiz_bp = Blueprint('quiz_bp', __name__)

@quiz_bp.route('/<int:resource_id>', methods=['GET'])
def get_quiz(resource_id):
    quiz = Quiz.query.filter_by(resource_id=resource_id).first()
    if quiz:
        quiz_data = {
            'quiz_id': quiz.quiz_id,
            'resource_id': quiz.resource_id,
            'questions': quiz.questions # Assuming questions are already in JSON format
        }
        return jsonify({'quiz': quiz_data}), 200
    else:
        return jsonify({'message': 'Quiz not found for this resource'}), 404 # Not Found

@quiz_bp.route('/submit_quiz/<int:quiz_id>', methods=['POST'])
def submit_quiz(quiz_id):
    data = request.get_json()
    user_answers = data.get('answers') # Assuming answers are sent as a list of indices
    user_id = 1 # Replace with actual user authentication to get current user ID

    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({'message': 'Quiz not found'}), 404 # Not Found

    if not quiz.answers or not quiz.questions:
        return jsonify({'message': 'Quiz questions or answers not properly configured'}), 500 # Internal Server Error

    correct_answers = quiz.answers
    if not isinstance(correct_answers, list): # Handle if answers are loaded as string from JSON
        import json
        correct_answers = json.loads(correct_answers)


    if not isinstance(user_answers, list):
        return jsonify({'message': 'Invalid answer format'}), 400 # Bad Request


    score = 0
    for i in range(min(len(user_answers), len(correct_answers))): # Handle cases of different lengths
        if user_answers[i] is not None and user_answers[i] == correct_answers[i]: # Check for null answers
            score += 1

    percentage_score = (score / len(quiz.questions)) * 100 if quiz.questions else 0

    # Store quiz result in database
    quiz_result = UserQuizResult(user_id=user_id, quiz_id=quiz_id, score=percentage_score) # Store percentage
    db.session.add(quiz_result)
    db.session.commit()

    return jsonify({'score': percentage_score, 'message': 'Quiz submitted and graded'}), 200