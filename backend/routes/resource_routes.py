from flask import Blueprint, jsonify, request
from models import LearningResource, db

resource_bp = Blueprint('resource_bp', __name__)

@resource_bp.route('/', methods=['GET'])
def get_resources():
    topic_filter = request.args.get('topic')
    search_text = request.args.get('search')

    query = LearningResource.query

    if topic_filter:
        query = query.filter(LearningResource.topic == topic_filter)
    if search_text:
        query = query.filter(LearningResource.title.ilike(f'%{search_text}%') | LearningResource.description.ilike(f'%{search_text}%'))

    resources = query.all()

    resource_list = []
    for resource in resources:
        resource_data = {
            'resource_id': resource.resource_id,
            'resource_type': resource.resource_type,
            'title': resource.title,
            'description': resource.description,
            'url': resource.url,
            'topic': resource.topic
        }
        resource_list.append(resource_data)

    return jsonify({'resources': resource_list}), 200

@resource_bp.route('/<int:resource_id>', methods=['GET'])
def get_resource_detail(resource_id):
    resource = LearningResource.query.get(resource_id)
    if not resource:
        return jsonify({'message': 'Resource not found'}), 404 # Not Found

    resource_detail = {
        'resource_id': resource.resource_id,
        'resource_type': resource.resource_type,
        'title': resource.title,
        'description': resource.description,
        'url': resource.url,
        'topic': resource.topic
    }
    return jsonify({'resource': resource_detail}), 200