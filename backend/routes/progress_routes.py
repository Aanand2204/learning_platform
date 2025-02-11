from flask import Blueprint, request, jsonify
from models import UserProgress, db

progress_bp = Blueprint('progress_bp', __name__)

@progress_bp.route('/<int:user_id>/<int:resource_id>', methods=['GET'])
def get_progress(user_id, resource_id):
    progress = UserProgress.query.filter_by(user_id=user_id, resource_id=resource_id).first()
    if progress:
        return jsonify({'progress_percentage': progress.progress_percentage}), 200
    else:
        return jsonify({'progress_percentage': 0.0}), 200 # Default to 0 if no progress recorded

@progress_bp.route('/<int:user_id>/<int:resource_id>', methods=['POST'])
def update_progress(user_id, resource_id):
    data = request.get_json()
    progress_percentage = data.get('progress_percentage')

    if progress_percentage is None:
        return jsonify({'message': 'Progress percentage is required'}), 400

    progress = UserProgress.query.filter_by(user_id=user_id, resource_id=resource_id).first()
    if progress:
        progress.progress_percentage = progress_percentage
        db.session.commit()
        return jsonify({'message': 'Progress updated successfully'}), 200
    else:
        new_progress = UserProgress(user_id=user_id, resource_id=resource_id, progress_percentage=progress_percentage)
        db.session.add(new_progress)
        db.session.commit()
        return jsonify({'message': 'Progress recorded successfully'}), 201 # Created