from flask import request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models import Resource, Quiz, QuizQuestion
from . import library_bp

@library_bp.route('/materials', methods=['GET'])
@jwt_required()
def list_materials():
    materials = Resource.query.all()
    return jsonify([{
        'id': m.id,
        'title': m.title,
        'description': m.description,
        'resource_type': m.resource_type,
        'url': m.url,
        'lesson_id': m.lesson_id,
    } for m in materials]), 200

@library_bp.route('/materials/<material_id>/summarize', methods=['POST'])
@jwt_required()
def summarize_material(material_id):
    resource = Resource.query.get(material_id)
    if not resource:
        return jsonify({'error': 'Material not found'}), 404

    text = resource.description or resource.title or ''
    summary = ' '.join(text.split()[:30]) + ('...' if len(text.split()) > 30 else '')

    return jsonify({'material_id': material_id, 'summary': summary}), 200

@library_bp.route('/materials/<material_id>/quiz', methods=['POST'])
@jwt_required()
def generate_material_quiz(material_id):
    resource = Resource.query.get(material_id)
    if not resource:
        return jsonify({'error': 'Material not found'}), 404

    title = f'Quiz for {resource.title}'
    quiz = Quiz(lesson_id=resource.lesson_id, title=title, description=resource.description or '')
    db.session.add(quiz)
    db.session.commit()

    questions_data = [
        {'question': f'What is the key idea of {resource.title}?', 'answer': 'Summarize the material.'},
        {'question': f'What would you do after reading {resource.title}?', 'answer': 'Apply the concepts in context.'},
    ]

    for question_item in questions_data:
        question = QuizQuestion(quiz_id=quiz.id, question=question_item['question'], answer=question_item['answer'])
        db.session.add(question)

    db.session.commit()

    return jsonify({
        'quiz_id': quiz.id,
        'title': quiz.title,
        'questions': questions_data,
    }), 201
