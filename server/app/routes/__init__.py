from flask import Blueprint

# Initialize Blueprint hooks at package root boundary
auth_bp = Blueprint('auth', __name__)
student_bp = Blueprint('student', __name__)
courses_bp = Blueprint('courses', __name__)
admin_bp = Blueprint('admin', __name__)
team_rooms_bp = Blueprint('team_rooms', __name__)
battles_bp = Blueprint('battles', __name__)
library_bp = Blueprint('library', __name__)
revision_bp = Blueprint('revision', __name__)
ai_twin_bp = Blueprint('ai_twin', __name__)

# Load route files down here safely to bypass structural circular dependency limits
from . import auth
from . import student
from . import courses
from . import admin
from . import team_rooms
from . import battles
from . import library
from . import revision
from . import ai_twin