from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-this')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)  # Extended to 7 days

# Image upload configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Create year folders
for year in range(2022, 2026):
    year_folder = os.path.join(UPLOAD_FOLDER, str(year))
    if not os.path.exists(year_folder):
        os.makedirs(year_folder)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Initialize extensions
CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# JWT error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    print(f"JWT token expired: {jwt_payload}")
    return jsonify({'error': 'Token har utgått'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    print(f"Invalid JWT token: {error}")
    return jsonify({'error': 'Ogiltig token'}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    print(f"Missing JWT token: {error}")
    return jsonify({'error': 'Token saknas'}), 401

@jwt.needs_fresh_token_loader
def token_not_fresh_callback(jwt_header, jwt_payload):
    print(f"Token not fresh: {jwt_payload}")
    return jsonify({'error': 'Token behöver vara färsk'}), 401

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    print(f"Token revoked: {jwt_payload}")
    return jsonify({'error': 'Token har återkallats'}), 401

# Global error handler for JWT errors
@app.errorhandler(422)
def handle_422_error(error):
    print(f"422 error occurred: {error}")
    print(f"Request method: {request.method}")
    print(f"Request path: {request.path}")
    print(f"Request headers: {dict(request.headers)}")
    
    # Check if this is a JWT-related error
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header[7:]  # Remove 'Bearer ' prefix
        print(f"Token being used: {token[:20]}...")  # Show first 20 chars for debugging
    
    return jsonify({'error': 'Ogiltig förfrågan - JWT token problem'}), 422

# Additional error handler for JWT validation errors
@app.errorhandler(Exception)
def handle_exception(e):
    print(f"Unhandled exception: {str(e)}")
    if "Subject must be a string" in str(e):
        print("JWT token validation error - Subject must be a string")
        return jsonify({'error': 'JWT token är ogiltig - logga in igen'}), 401
    return jsonify({'error': 'Ett fel uppstod på servern'}), 500

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=True)  # Made optional
    password_hash = db.Column(db.String(120), nullable=False)
    group = db.Column(db.String(20), nullable=False)  # Manägers, Assar, or Gollar
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'group': self.group,
            'created_at': self.created_at.isoformat()
        }

class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Made nullable for anonymous votes
    user_name = db.Column(db.String(100), nullable=False)  # Name for anonymous voters
    vote_option = db.Column(db.String(100), nullable=False)
    vote_value = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('votes', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'vote_option': self.vote_option,
            'vote_value': self.vote_value,
            'created_at': self.created_at.isoformat()
        }

class VotingQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    alternatives = db.Column(db.Text, nullable=False)  # JSON string of alternatives
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    created_by_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    user = db.relationship('User', backref=db.backref('voting_questions', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'alternatives': json.loads(self.alternatives),
            'created_by': self.created_by_name,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    original_filename = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    year = db.Column(db.Integer, nullable=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('photos', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'original_filename': self.original_filename,
            'title': self.title,
            'description': self.description,
            'year': self.year,
            'uploaded_by': self.user.name if self.user else 'Unknown',
            'uploaded_at': self.uploaded_at.isoformat(),
            'url': f'/uploads/{self.year}/{self.filename}'
        }

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running!'})

@app.route('/api/verify-password', methods=['POST'])
def verify_password():
    data = request.get_json()
    password = data.get('password', '')
    
    if password == 'Trellehulla':
        return jsonify({'verified': True, 'message': 'Password correct'})
    else:
        return jsonify({'verified': False, 'message': 'Fel lösenord'}), 401

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    # Return only public information for the Deltagare section
    return jsonify([{
        'id': user.id,
        'name': user.name,
        'group': user.group,
        'created_at': user.created_at.isoformat()
    } for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('username') or not data.get('password') or not data.get('group'):
        return jsonify({'error': 'Alla fält måste fyllas i'}), 400
    
    # Validate group
    valid_groups = ['Manägers', 'Assar', 'Gollar']
    if data['group'] not in valid_groups:
        return jsonify({'error': 'Ogiltig grupp'}), 400
    
    # Check if user already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Användarnamn finns redan'}), 400
    
    # In a real app, you'd hash the password
    new_user = User(
        name=data['name'],
        username=data['username'],
        email=data.get('email', ''), # Make email optional
        password_hash=data['password'],  # This should be hashed!
        group=data['group']
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.to_dict()), 201

@app.route('/api/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@app.route('/api/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if data.get('name'):
        user.name = data['name']
    if data.get('username'):
        # Check if username is already taken by another user
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({'error': 'Användarnamn finns redan'}), 400
        user.username = data['username']
    if data.get('email'):
        user.email = data['email']
    if data.get('group'):
        valid_groups = ['Manägers', 'Assar', 'Gollar']
        if data['group'] in valid_groups:
            user.group = data['group']
    
    db.session.commit()
    return jsonify(user.to_dict())

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    print(f"=== DELETE USER ENDPOINT REACHED ===")
    print(f"Request method: {request.method}")
    print(f"Request path: {request.path}")
    print(f"User ID to delete: {user_id}")
    print(f"Request headers: {dict(request.headers)}")
    
    try:
        current_user_id = get_jwt_identity()
        print(f"Delete user request - User ID: {user_id}, Current user ID: {current_user_id}")
        print(f"Current user ID type: {type(current_user_id)}")
        
        # Convert current_user_id to int for comparison
        current_user_id_int = int(current_user_id) if current_user_id else None
        
        # Ensure user can only delete their own account
        if current_user_id_int != user_id:
            print(f"Permission denied - User {current_user_id_int} trying to delete user {user_id}")
            return jsonify({'error': 'Du kan endast radera ditt eget konto'}), 403
        
        user = User.query.get_or_404(user_id)
        print(f"Deleting user: {user.name} (ID: {user.id})")
        db.session.delete(user)
        db.session.commit()
        print(f"User {user_id} deleted successfully")
        return jsonify({'message': 'Användare raderad'})
    except Exception as e:
        print(f"Error in delete_user: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Användarnamn och lösenord krävs'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.password_hash == data['password']:  # In real app, verify hashed password
        access_token = create_access_token(identity=str(user.id))  # Convert to string
        print(f"Login successful for user {user.username} (ID: {user.id})")
        print(f"Created token with identity: {str(user.id)}")
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        })
    
    return jsonify({'error': 'Felaktiga inloggningsuppgifter'}), 401

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.to_dict())

@app.route('/api/groups', methods=['GET'])
def get_groups():
    return jsonify(['Manägers', 'Assar', 'Gollar'])

@app.route('/api/votes', methods=['GET'])
def get_votes():
    votes = Vote.query.all()
    return jsonify([vote.to_dict() for vote in votes])

@app.route('/api/votes', methods=['POST'])
def create_vote():
    data = request.get_json()
    
    if not data or not data.get('vote_option') or not data.get('vote_value'):
        return jsonify({'error': 'Röstningsalternativ och värde krävs'}), 400
    
    # Check if user is authenticated
    current_user_id = None
    user_name = data.get('user_name', 'Anonym')
    
    try:
        current_user_id = get_jwt_identity()
        if current_user_id:
            user = User.query.get(current_user_id)
            if user:
                user_name = user.name
    except:
        # No valid token, this is an anonymous vote
        pass
    
    # Check if user has already voted on this question
    existing_vote = Vote.query.filter_by(
        vote_option=data['vote_option'],
        user_name=user_name
    ).first()
    
    if existing_vote:
        return jsonify({'error': 'Du har redan röstat på denna fråga'}), 400
    
    new_vote = Vote(
        user_id=current_user_id,
        user_name=user_name,
        vote_option=data['vote_option'],
        vote_value=data['vote_value']
    )
    
    db.session.add(new_vote)
    db.session.commit()
    
    return jsonify({'message': 'Röst registrerad'}), 201

# New voting question endpoints
@app.route('/api/voting-questions', methods=['GET'])
def get_voting_questions():
    questions = VotingQuestion.query.filter_by(is_active=True).order_by(VotingQuestion.created_at.desc()).all()
    return jsonify([question.to_dict() for question in questions])

@app.route('/api/voting-questions', methods=['POST'])
def create_voting_question():
    data = request.get_json()
    
    if not data or not data.get('title') or not data.get('alternatives'):
        return jsonify({'error': 'Titel och alternativ krävs'}), 400
    
    # Check if user is authenticated
    current_user_id = None
    user_name = data.get('user_name', 'Anonym')
    
    try:
        current_user_id = get_jwt_identity()
        if current_user_id:
            user = User.query.get(current_user_id)
            if user:
                user_name = user.name
    except:
        # No valid token, this is an anonymous question
        pass
    
    # Validate alternatives
    alternatives = data['alternatives']
    if not isinstance(alternatives, list) or len(alternatives) < 2:
        return jsonify({'error': 'Minst 2 alternativ krävs'}), 400
    
    new_question = VotingQuestion(
        title=data['title'],
        description=data.get('description', ''),
        alternatives=json.dumps(alternatives),
        created_by=current_user_id,
        created_by_name=user_name
    )
    
    db.session.add(new_question)
    db.session.commit()
    
    return jsonify(new_question.to_dict()), 201

@app.route('/api/voting-questions/<int:question_id>/votes', methods=['GET'])
def get_votes_for_question(question_id):
    question = VotingQuestion.query.get_or_404(question_id)
    votes = Vote.query.filter_by(vote_option=str(question_id)).all()
    
    return jsonify({
        'question': question.to_dict(),
        'votes': [vote.to_dict() for vote in votes]
    })

@app.route('/api/voting-questions/<int:question_id>', methods=['DELETE'])
def delete_voting_question(question_id):
    current_user_id = None
    try:
        current_user_id = get_jwt_identity()
    except:
        pass
    
    question = VotingQuestion.query.get_or_404(question_id)
    
    # Only creator can delete
    if question.created_by != current_user_id:
        return jsonify({'error': 'Du kan bara radera dina egna röstningsfrågor'}), 403
    
    # Delete all votes for this question
    Vote.query.filter_by(vote_option=str(question_id)).delete()
    
    # Delete the question
    db.session.delete(question)
    db.session.commit()
    
    return jsonify({'message': 'Röstningsfråga raderad'})

# Photo upload and management endpoints
@app.route('/api/photos', methods=['GET'])
def get_photos():
    year = request.args.get('year', type=int)
    if year:
        photos = Photo.query.filter_by(year=year).order_by(Photo.uploaded_at.desc()).all()
    else:
        photos = Photo.query.order_by(Photo.uploaded_at.desc()).all()
    
    return jsonify([photo.to_dict() for photo in photos])

@app.route('/api/photos', methods=['POST'])
@jwt_required()
def upload_photo():
    current_user_id = get_jwt_identity()
    
    if 'file' not in request.files:
        return jsonify({'error': 'Ingen fil vald'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Ingen fil vald'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Filtyp inte tillåten'}), 400
    
    # Get form data
    title = request.form.get('title', '')
    description = request.form.get('description', '')
    year = request.form.get('year', type=int)
    
    if not title or not year:
        return jsonify({'error': 'Titel och år krävs'}), 400
    
    if year < 2022 or year > 2025:
        return jsonify({'error': 'År måste vara mellan 2022 och 2025'}), 400
    
    # Secure filename and save
    filename = secure_filename(file.filename)
    # Add timestamp to make filename unique
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    name, ext = os.path.splitext(filename)
    unique_filename = f"{name}_{timestamp}{ext}"
    
    year_folder = os.path.join(app.config['UPLOAD_FOLDER'], str(year))
    file_path = os.path.join(year_folder, unique_filename)
    
    file.save(file_path)
    
    # Save to database
    new_photo = Photo(
        filename=unique_filename,
        original_filename=filename,
        title=title,
        description=description,
        year=year,
        uploaded_by=current_user_id
    )
    
    db.session.add(new_photo)
    db.session.commit()
    
    return jsonify(new_photo.to_dict()), 201

@app.route('/api/photos/<int:photo_id>', methods=['DELETE'])
@jwt_required()
def delete_photo(photo_id):
    current_user_id = get_jwt_identity()
    photo = Photo.query.get_or_404(photo_id)
    
    # Only allow deletion by uploader or admin (you can add admin check later)
    if photo.uploaded_by != current_user_id:
        return jsonify({'error': 'Du kan bara radera dina egna bilder'}), 403
    
    # Delete file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], str(photo.year), photo.filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Delete from database
    db.session.delete(photo)
    db.session.commit()
    
    return jsonify({'message': 'Bild raderad'})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=False, host='0.0.0.0', port=port) 