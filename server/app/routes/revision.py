









# import os
# import json
# import random
# from flask import request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from app.models import Progress, Lesson, Flashcard, User, Quiz, QuizQuestion  # Matches your models exactly
# from app import db
# from . import revision_bp
# from groq import Groq

# # Initialize the Groq Client safely
# GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
# if not GROQ_API_KEY:
#     print("⚠️ WARNING: GROQ_API_KEY environment variable is missing.")

# groq_client = Groq(api_key=GROQ_API_KEY)


# @revision_bp.route('/weak-topics', methods=['GET', 'OPTIONS'])
# @jwt_required(optional=True)
# def weak_topics():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     user_id = get_jwt_identity()
#     if not user_id:
#         return jsonify([]), 200
    
#     incomplete_lessons = Lesson.query.outerjoin(
#         Progress, (Progress.lesson_id == Lesson.id) & (Progress.user_id == user_id)
#     ).filter(
#         (Progress.completed == False) | (Progress.id == None)
#     ).limit(5).all()

#     return jsonify([{
#         'lesson_id': lesson.id,
#         'title': lesson.title,
#         'description': lesson.description,
#         'retention_rate': random.randint(35, 68) 
#     } for lesson in incomplete_lessons]), 200


# @revision_bp.route('/flashcards', methods=['GET', 'OPTIONS'])
# @jwt_required()
# def list_flashcards():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     user_id = get_jwt_identity()
#     flashcards = Flashcard.query.filter_by(user_id=user_id).order_by(Flashcard.id.desc()).all()
#     return jsonify([{
#         'id': f.id,
#         'question': f.question,
#         'answer': f.answer,
#         'deck_name': f.deck_name,
#         'reviewed_at': f.reviewed_at.isoformat() if f.reviewed_at else None,
#     } for f in flashcards]), 200


# # ========================================================================
# # FIXED ROUTING NODES: EXPLICITLY CAPTURING PREFLIGHTS ON DYNAMIC UUIDs
# # ========================================================================

# @revision_bp.route('/flashcards/<card_id>/known', methods=['POST', 'OPTIONS'])
# @jwt_required()
# def mark_card_known(card_id):
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     user_id = get_jwt_identity()
#     card = Flashcard.query.filter_by(id=card_id, user_id=user_id).first()
#     if not card:
#         return jsonify({"error": "Flashcard index structural node missing"}), 404
        
#     db.session.commit()
#     return jsonify({"status": "success", "message": "Marked as retained in memory matrix."}), 200


# @revision_bp.route('/flashcards/<card_id>/unknown', methods=['POST', 'OPTIONS'])
# @jwt_required()
# def mark_card_unknown(card_id):
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     user_id = get_jwt_identity()
#     card = Flashcard.query.filter_by(id=card_id, user_id=user_id).first()
#     if not card:
#         return jsonify({"error": "Flashcard index structural node missing"}), 404
        
#     db.session.commit()
#     return jsonify({"status": "success", "message": "Target shifted into active queue review node."}), 200


# @revision_bp.route('/quizzes', methods=['GET', 'OPTIONS'])
# @jwt_required()
# def get_quizzes():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     quizzes = Quiz.query.order_by(Quiz.created_at.desc()).all()
    
#     output = []
#     for q in quizzes:
#         try:
#             q_count = q.questions.count() if hasattr(q.questions, 'count') else len(q.questions)
#         except Exception:
#             q_count = 0
            
#         output.append({
#             'id': q.id,
#             'title': q.title,
#             'questions_count': q_count,
#             'duration': q_count * 2
#         })
        
#     return jsonify(output), 200


# @revision_bp.route('/quizzes/<string:quiz_id>/start', methods=['GET', 'POST', 'OPTIONS'])
# @jwt_required()
# def start_quiz_session(quiz_id):
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     quiz = Quiz.query.filter_by(id=quiz_id).first()
#     if not quiz:
#         return jsonify({"error": "Assessment module not found"}), 404
        
#     questions_list = []
#     all_questions = quiz.questions.all() if hasattr(quiz.questions, 'all') else quiz.questions
    
#     for q in all_questions:
#         try:
#             parsed_answer_payload = json.loads(q.answer)
#             options = parsed_answer_payload.get("options", ["Option A", "Option B", "Option C", "Option D"])
#             correct_index = parsed_answer_payload.get("correct_index", 0)
#         except Exception:
#             options = [q.answer or "No solution options compiled.", "Alternative B", "Alternative C", "Alternative D"]
#             correct_index = 0

#         questions_list.append({
#             'id': q.id,
#             'text': q.question,
#             'options': options,
#             'correct_index': correct_index
#         })
        
#     return jsonify({
#         'id': quiz.id,
#         'title': quiz.title,
#         'questions': questions_list
#     }), 200


# @revision_bp.route('/generate-quiz', methods=['POST', 'OPTIONS'])
# @jwt_required()
# def generate_ai_quiz():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     user_id = get_jwt_identity()
#     target_lesson = Lesson.query.first()
#     if not target_lesson:
#         return jsonify({"error": "No lessons exist in the database to bind a revision quiz to."}), 400

#     context_text = f"{target_lesson.title}: {target_lesson.description or ''}"
#     if not target_lesson.description:
#         context_text = "System Design fundamentals, microservices latency patterns, and localized caching matrices."

#     try:
#         system_prompt = (
#             "You are the MindBridge AI Twin system core. You must generate a single, strict JSON object "
#             "based on the provided context materials. Do not include markdown wraps like ```json or text blocks. "
#             "Match this schema precisely:\n"
#             "{\n"
#             "  \"title\": \"Descriptive Quiz Name\",\n"
#             "  \"questions\": [\n"
#             "    {\n"
#             "      \"text\": \"The conceptual problem prompt definition question?\",\n"
#             "      \"options\": [\"Option 0\", \"Option 1\", \"Option 2\", \"Option 3\"],\n"
#             "      \"correct_index\": 1\n"
#             "    }\n"
#             "  ]\n"
#             "}"
#         )

#         user_prompt = f"Generate 3 customized, challenging multiple-choice questions for this module:\n{context_text}"

#         completion = groq_client.chat.completions.create(
#             model="llama3-70b-8192",
#             messages=[
#                 {"role": "system", "content": system_prompt},
#                 {"role": "user", "content": user_prompt}
#             ],
#             response_format={"type": "json_object"},
#             temperature=0.3,
#             max_tokens=1024
#         )

#         raw_content = completion.choices[0].message.content
#         quiz_data = json.loads(raw_content)

#         new_quiz = Quiz(
#             lesson_id=target_lesson.id,
#             title=quiz_data.get("title", "AI Adaptive Assessment Module"),
#             description=f"Automated evaluation context derived from: {target_lesson.title}"
#         )
#         db.session.add(new_quiz)
        
#         questions_added = 0
#         for q_item in quiz_data.get("questions", []):
#             if not q_item.get("text") or not q_item.get("options"):
#                 continue

#             packed_answer_data = {
#                 "options": q_item.get("options"),
#                 "correct_index": int(q_item.get("correct_index", 0))
#             }

#             new_question = QuizQuestion(
#                 quiz=new_quiz,
#                 question=q_item.get("text"),
#                 answer=json.dumps(packed_answer_data)
#             )
#             db.session.add(new_question)
#             questions_added += 1

#         if questions_added == 0:
#             db.session.rollback()
#             return jsonify({"error": "AI response did not contain standard quiz structures."}), 500

#         db.session.commit()

#         return jsonify({
#             'message': 'MindBridge AI Twin successfully compiled assessment records.',
#             'quiz_id': new_quiz.id,
#             'questions_count': questions_added
#         }), 201

#     except Exception as e:
#         db.session.rollback()
#         print(f"Groq API Inference/DB processing failure: {str(e)}")
#         return jsonify({"error": f"Failed to parse contextual records: {str(e)}"}), 500


# @revision_bp.route('/deep-dive', methods=['POST', 'OPTIONS'])
# @jwt_required()
# def execute_deep_dive_scan():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     user_id = get_jwt_identity()
#     data = request.get_json() or {}
#     topic_context = data.get("topic", "General Vector Subsystem Optimization")
    
#     print(f"Executing Deep Dive telemetry pipeline scan for User {user_id} over node context: {topic_context}")
#     return jsonify({
#         "status": "success",
#         "message": f"Deep Dive framework target linked successfully for target: {topic_context}"
#     }), 200


# @revision_bp.route('/quizzes/<string:quiz_id>/submit', methods=['POST', 'OPTIONS'])
# @jwt_required()
# def submit_quiz_analytics(quiz_id):
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     user_id = get_jwt_identity()
#     data = request.get_json() or {}
#     score = data.get("score", 0)
#     print(f"User {user_id} submitted Quiz {quiz_id} scoring accuracy parameter: {score}%")
#     return jsonify({"status": "success", "message": "Performance metrics compiled cleanly."}), 200


# @revision_bp.route('/ai-insights', methods=['GET', 'OPTIONS'])
# @jwt_required()
# def get_insights():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     return jsonify([
#         {
#             'id': 'ins_real_1',
#             'type': 'MindBridge AI Twin Insight',
#             'message': "Your concept execution vectors show performance slipping in distributed architectures. Let's shore up those gaps.",
#             'action_text': 'Start Deep Dive'
#         }
#     ]), 200


# @revision_bp.route('/timeline', methods=['GET', 'OPTIONS'])
# @jwt_required()
# def get_timeline():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200
        
#     return jsonify([
#         {'id': 't_real_1', 'title': 'Automated Library Vector Analysis', 'completed': True, 'status_text': 'Completed', 'xp_reward': 50},
#         {'id': 't_real_2', 'title': 'Core Track Adaptive Assessment Run', 'completed': False, 'is_active': True, 'time': 'Ongoing'}
#     ]), 200













# import os
# import json
# import random
# from flask import request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from app.models import Progress, Lesson, Flashcard, User, Quiz, QuizQuestion, StudySession
# from app import db
# from . import revision_bp
# from groq import Groq

# # Initialize the Groq Client
# GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
# groq_client = Groq(api_key=GROQ_API_KEY)

# @revision_bp.route('/weak-topics', methods=['GET', 'OPTIONS'])
# @jwt_required(optional=True)
# def weak_topics():
#     if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
#     user_id = get_jwt_identity()
    
#     # Query lessons where progress is incomplete or non-existent
#     incomplete_lessons = Lesson.query.outerjoin(
#         Progress, (Progress.lesson_id == Lesson.id) & (Progress.user_id == user_id)
#     ).filter((Progress.completed == False) | (Progress.id == None)).limit(5).all()

#     return jsonify([{
#         'lesson_id': lesson.id,
#         'title': lesson.title,
#         'description': lesson.description,
#         'retention_rate': random.randint(35, 68) 
#     } for lesson in incomplete_lessons]), 200

# @revision_bp.route('/flashcards', methods=['GET', 'OPTIONS'])
# @jwt_required()
# def list_flashcards():
#     if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
#     user_id = get_jwt_identity()
#     flashcards = Flashcard.query.filter_by(user_id=user_id).order_by(Flashcard.id.desc()).all()
#     return jsonify([{
#         'id': f.id,
#         'question': f.question,
#         'answer': f.answer,
#         'deck_name': getattr(f, 'deck_name', 'General'),
#         'reviewed_at': f.reviewed_at.isoformat() if hasattr(f, 'reviewed_at') and f.reviewed_at else None,
#     } for f in flashcards]), 200

# @revision_bp.route('/generate-quiz', methods=['POST', 'OPTIONS'])
# @jwt_required()
# def generate_ai_quiz():
#     if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
#     user_id = get_jwt_identity()
    
#     # FIX: Try to find a lesson based on progress, otherwise fallback to any available lesson
#     target_lesson = Lesson.query.join(Progress).filter(Progress.user_id == user_id).first()
#     if not target_lesson:
#         target_lesson = Lesson.query.first()
        
#     if not target_lesson:
#         return jsonify({"error": "No lessons exist in the database to bind a revision quiz to."}), 404

#     context_text = f"{target_lesson.title}: {target_lesson.description or ''}"

#     try:
#         completion = groq_client.chat.completions.create(
#             model="llama3-70b-8192",
#             messages=[
#                 {"role": "system", "content": "You are MindBridge AI. Output strict JSON: {'title': '', 'questions': [{'text': '', 'options': [], 'correct_index': 0}]}"},
#                 {"role": "user", "content": f"Generate 3 challenging questions for: {context_text}"}
#             ],
#             response_format={"type": "json_object"},
#             temperature=0.3
#         )

#         quiz_data = json.loads(completion.choices[0].message.content)
#         new_quiz = Quiz(lesson_id=target_lesson.id, title=quiz_data.get("title", "AI Assessment"))
#         db.session.add(new_quiz)
#         db.session.commit()
        
#         for q_item in quiz_data.get("questions", []):
#             new_question = QuizQuestion(
#                 quiz=new_quiz,
#                 question=q_item.get("text"),
#                 answer=json.dumps({"options": q_item.get("options"), "correct_index": q_item.get("correct_index")})
#             )
#             db.session.add(new_question)
        
#         db.session.commit()
#         return jsonify({'quiz_id': new_quiz.id, 'questions_count': len(quiz_data.get("questions", []))}), 201
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @revision_bp.route('/ai-insights', methods=['GET', 'OPTIONS'])
# @jwt_required()
# def get_insights():
#     if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
#     user_id = get_jwt_identity()
    
#     # Query using model fields 'topic' and 'started_at'
#     sessions = StudySession.query.filter_by(user_id=user_id).order_by(StudySession.started_at.desc()).limit(3).all()
    
#     if not sessions:
#         return jsonify([]), 200
        
#     return jsonify([{
#         'id': f'insight_{s.id}',
#         'type': 'Study Pattern Insight',
#         'message': f"Your recent session on {s.topic or 'study materials'} shows good engagement.",
#         'action_text': 'Continue Deep Dive'
#     } for s in sessions]), 200

# @revision_bp.route('/timeline', methods=['GET', 'OPTIONS'])
# @jwt_required()
# def get_timeline():
#     if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
#     user_id = get_jwt_identity()
    
#     # Corrected to use 'started_at' and checking 'ended_at' for completion status
#     sessions = StudySession.query.filter_by(user_id=user_id).order_by(StudySession.started_at.desc()).limit(5).all()
    
#     return jsonify([{
#         'id': s.id,
#         'title': s.topic or "Study Session",
#         'completed': s.ended_at is not None,
#         'status_text': 'Completed' if s.ended_at else 'Ongoing',
#         'xp_reward': 50
#     } for s in sessions]), 200

# # =========================
# # QUIZZES
# # =========================

# @revision_bp.route('/quizzes', methods=['GET', 'OPTIONS'])
# @jwt_required(optional=True)
# def get_quizzes():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200

#     quizzes = Quiz.query.order_by(Quiz.id.desc()).all()

#     result = []

#     for quiz in quizzes:
#         questions = QuizQuestion.query.filter_by(quiz_id=quiz.id).all()

#         result.append({
#             "id": quiz.id,
#             "title": quiz.title,
#             "lesson_id": quiz.lesson_id,
#             "questions_count": len(questions)
#         })

#     return jsonify(result), 200


# @revision_bp.route('/quizzes/<int:quiz_id>/start', methods=['POST', 'OPTIONS'])
# @jwt_required(optional=True)
# def start_quiz(quiz_id):
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200

#     quiz = Quiz.query.get(quiz_id)

#     if not quiz:
#         return jsonify({"error": "Quiz not found"}), 404

#     questions = QuizQuestion.query.filter_by(quiz_id=quiz.id).all()

#     formatted_questions = []

#     for question in questions:
#         try:
#             answer_data = json.loads(question.answer) if question.answer else {}
#         except:
#             answer_data = {}

#         formatted_questions.append({
#             "id": question.id,
#             "question": question.question,
#             "options": answer_data.get("options", []),
#             "correct_index": answer_data.get("correct_index", 0)
#         })

#     return jsonify({
#         "quiz_id": quiz.id,
#         "title": quiz.title,
#         "questions": formatted_questions
#     }), 200


# # =========================
# # FLASHCARD ACTIONS
# # =========================

# @revision_bp.route('/flashcards/<int:card_id>/known', methods=['POST', 'OPTIONS'])
# @jwt_required(optional=True)
# def mark_flashcard_known(card_id):
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200

#     card = Flashcard.query.get(card_id)

#     if not card:
#         return jsonify({"error": "Flashcard not found"}), 404

#     return jsonify({
#         "success": True,
#         "card_id": card_id,
#         "status": "known"
#     }), 200


# @revision_bp.route('/flashcards/<int:card_id>/unknown', methods=['POST', 'OPTIONS'])
# @jwt_required(optional=True)
# def mark_flashcard_unknown(card_id):
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200

#     card = Flashcard.query.get(card_id)

#     if not card:
#         return jsonify({"error": "Flashcard not found"}), 404

#     return jsonify({
#         "success": True,
#         "card_id": card_id,
#         "status": "unknown"
#     }), 200


# # =========================
# # DEEP DIVE
# # =========================

# @revision_bp.route('/deep-dive', methods=['POST', 'OPTIONS'])
# @jwt_required(optional=True)
# def deep_dive():
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "ok"}), 200

#     data = request.get_json() or {}

#     topic = data.get("topic", "General Study")

#     return jsonify({
#         "success": True,
#         "topic": topic,
#         "message": f"Deep dive session started for {topic}"
#     }), 200










import os
import json
import random
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Progress, Lesson, Flashcard, Quiz, QuizQuestion, StudySession
from app import db
from . import revision_bp
from groq import Groq

# Initialize Groq Client
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
groq_client = Groq(api_key=GROQ_API_KEY)


# =========================
# WEAK TOPICS
# =========================
@revision_bp.route('/weak-topics', methods=['GET', 'OPTIONS'])
@jwt_required(optional=True)
def weak_topics():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    user_id = get_jwt_identity()

    incomplete_lessons = Lesson.query.outerjoin(
        Progress,
        (Progress.lesson_id == Lesson.id) & (Progress.user_id == user_id)
    ).filter(
        (Progress.completed == False) | (Progress.id == None)
    ).limit(5).all()

    return jsonify([{
        'lesson_id': lesson.id,
        'title': lesson.title,
        'description': lesson.description,
        'retention_rate': random.randint(35, 68)
    } for lesson in incomplete_lessons]), 200


# =========================
# FLASHCARDS
# =========================
@revision_bp.route('/flashcards', methods=['GET', 'OPTIONS'])
@jwt_required()
def list_flashcards():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    user_id = get_jwt_identity()

    flashcards = Flashcard.query.filter_by(user_id=user_id)\
        .order_by(Flashcard.id.desc()).all()

    return jsonify([{
        'id': str(f.id),
        'question': f.question,
        'answer': f.answer,
        'deck_name': getattr(f, 'deck_name', 'General'),
        'reviewed_at': f.reviewed_at.isoformat() if f.reviewed_at else None,
    } for f in flashcards]), 200


# =========================
# GENERATE QUIZ (AI)
# =========================
@revision_bp.route('/generate-quiz', methods=['POST', 'OPTIONS'])
@jwt_required()
def generate_ai_quiz():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    user_id = get_jwt_identity()

    target_lesson = Lesson.query.join(Progress)\
        .filter(Progress.user_id == user_id).first()

    if not target_lesson:
        target_lesson = Lesson.query.first()

    if not target_lesson:
        return jsonify({
            "title": "Sample Quiz",
            "questions": [
                {
                    "text": "What is Python?",
                    "options": ["Language", "Snake", "Database", "OS"],
                    "correct_index": 0
                }
            ]
        }), 200

    context_text = f"{target_lesson.title}: {target_lesson.description or ''}"

    try:
        completion = groq_client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {
                    "role": "system",
                    "content": "Return strict JSON: {'title': '', 'questions': [{'text': '', 'options': [], 'correct_index': 0}]}"
                },
                {
                    "role": "user",
                    "content": f"Generate 3 questions for: {context_text}"
                }
            ],
            response_format={"type": "json_object"},
            temperature=0.3
        )

        quiz_data = json.loads(completion.choices[0].message.content)

        new_quiz = Quiz(
            lesson_id=target_lesson.id,
            title=quiz_data.get("title", "AI Quiz")
        )

        db.session.add(new_quiz)
        db.session.commit()

        for q in quiz_data.get("questions", []):
            db.session.add(QuizQuestion(
                quiz=new_quiz,
                question=q.get("text"),
                answer=json.dumps({
                    "options": q.get("options", []),
                    "correct_index": q.get("correct_index", 0)
                })
            ))

        db.session.commit()

        return jsonify({
            "quiz_id": new_quiz.id,
            "questions_count": len(quiz_data.get("questions", []))
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# QUIZZES
# =========================
@revision_bp.route('/quizzes', methods=['GET', 'OPTIONS'])
@jwt_required(optional=True)
def get_quizzes():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    quizzes = Quiz.query.order_by(Quiz.id.desc()).all()

    return jsonify([
        {
            "id": quiz.id,
            "title": quiz.title,
            "lesson_id": quiz.lesson_id,
            "questions_count": QuizQuestion.query.filter_by(quiz_id=quiz.id).count()
        }
        for quiz in quizzes
    ]), 200


# =========================
# START QUIZ
# =========================
@revision_bp.route('/quizzes/<int:quiz_id>/start', methods=['POST', 'OPTIONS'])
@jwt_required(optional=True)
def start_quiz(quiz_id):
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    quiz = Quiz.query.get(quiz_id)

    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404

    questions = QuizQuestion.query.filter_by(quiz_id=quiz.id).all()

    return jsonify({
        "quiz_id": quiz.id,
        "title": quiz.title,
        "questions": [
            {
                "id": q.id,
                "question": q.question,
                **(json.loads(q.answer) if q.answer else {})
            }
            for q in questions
        ]
    }), 200


# =========================
# FLASHCARD ACTIONS (FIXED FOR UUID)
# =========================
@revision_bp.route('/flashcards/<card_id>/known', methods=['POST', 'OPTIONS'])
@jwt_required(optional=True)
def mark_flashcard_known(card_id):
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    card = Flashcard.query.filter_by(id=card_id).first()

    if not card:
        return jsonify({"error": "Flashcard not found"}), 404

    return jsonify({
        "success": True,
        "card_id": card_id,
        "status": "known"
    }), 200


@revision_bp.route('/flashcards/<card_id>/unknown', methods=['POST', 'OPTIONS'])
@jwt_required(optional=True)
def mark_flashcard_unknown(card_id):
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    card = Flashcard.query.filter_by(id=card_id).first()

    if not card:
        return jsonify({"error": "Flashcard not found"}), 404

    return jsonify({
        "success": True,
        "card_id": card_id,
        "status": "unknown"
    }), 200


# =========================
# DEEP DIVE
# =========================
@revision_bp.route('/deep-dive', methods=['POST', 'OPTIONS'])
@jwt_required(optional=True)
def deep_dive():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    data = request.get_json() or {}

    return jsonify({
        "success": True,
        "topic": data.get("topic", "General Study"),
        "message": f"Deep dive session started"
    }), 200


# =========================
# AI INSIGHTS
# =========================
@revision_bp.route('/ai-insights', methods=['GET', 'OPTIONS'])
@jwt_required(optional=True)
def get_insights():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    user_id = get_jwt_identity()

    sessions = StudySession.query.filter_by(user_id=user_id)\
        .order_by(StudySession.started_at.desc()).limit(3).all()

    return jsonify([
        {
            "id": f"insight_{s.id}",
            "type": "Study Insight",
            "message": f"Session on {s.topic or 'study materials'} was strong",
            "action_text": "Continue"
        }
        for s in sessions
    ]), 200


# =========================
# TIMELINE
# =========================
@revision_bp.route('/timeline', methods=['GET', 'OPTIONS'])
@jwt_required(optional=True)
def get_timeline():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    user_id = get_jwt_identity()

    sessions = StudySession.query.filter_by(user_id=user_id)\
        .order_by(StudySession.started_at.desc()).limit(5).all()

    return jsonify([
        {
            "id": s.id,
            "title": s.topic or "Study Session",
            "completed": s.ended_at is not None,
            "status_text": "Completed" if s.ended_at else "Ongoing",
            "xp_reward": 50
        }
        for s in sessions
    ]), 200