from flask import Blueprint, jsonify

recommendation_bp = Blueprint('recommendation_bp', __name__)

@recommendation_bp.route('/', methods=['GET'])
def get_recommendations():
    # In a real application, recommendations would be personalized based on user data and AI algorithms.
    # For now, let's return a placeholder or perhaps the latest resources as "recommendations".

    # Example: Return latest 3 resources as recommendations (most recently added - you might need to adjust ordering)
    from backend.models import LearningResource
    latest_resources = LearningResource.query.order_by(LearningResource.resource_id.desc()).limit(3).all() # Adjust ordering as needed

    recommendations_list = []
    for resource in latest_resources:
        recommendation_data = {
            'resource_id': resource.resource_id,
            'title': resource.title,
            'description': resource.description,
            'resource_type': resource.resource_type,
            'topic': resource.topic
        }
        recommendations_list.append(recommendation_data)

    return jsonify({'recommendations': recommendations_list}), 200