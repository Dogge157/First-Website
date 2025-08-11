from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-this')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize extensions
CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vote_option = db.Column(db.String(100), nullable=False)
    vote_value = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('votes', lazy=True))

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running!'})

@app.route('/api/verify-password', methods=['POST'])
def verify_password():
    data = request.get_json()
    password = data.get('password', '')
    
    if password == 'Trellehulla':
        return jsonify({'valid': True, 'message': 'Password correct'})
    else:
        return jsonify({'valid': False, 'message': 'Fel lösenord'}), 401

@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('username') or not data.get('email') or not data.get('password') or not data.get('group'):
        return jsonify({'error': 'Alla fält måste fyllas i'}), 400
    
    # Validate group
    valid_groups = ['Manägers', 'Assar', 'Gollar']
    if data['group'] not in valid_groups:
        return jsonify({'error': 'Ogiltig grupp'}), 400
    
    # Check if user already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Användarnamn finns redan'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'E-post finns redan'}), 400
    
    # In a real app, you'd hash the password
    new_user = User(
        name=data['name'],
        username=data['username'],
        email=data['email'],
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
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Användare raderad'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Användarnamn och lösenord krävs'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.password_hash == data['password']:  # In real app, verify hashed password
        access_token = create_access_token(identity=user.id)
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
@jwt_required()
def get_votes():
    votes = Vote.query.all()
    return jsonify([{
        'id': vote.id,
        'user_name': vote.user.name,
        'vote_option': vote.vote_option,
        'vote_value': vote.vote_value,
        'created_at': vote.created_at.isoformat()
    } for vote in votes])

@app.route('/api/votes', methods=['POST'])
@jwt_required()
def create_vote():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('vote_option') or not data.get('vote_value'):
        return jsonify({'error': 'Röstningsalternativ och värde krävs'}), 400
    
    new_vote = Vote(
        user_id=current_user_id,
        vote_option=data['vote_option'],
        vote_value=data['vote_value']
    )
    
    db.session.add(new_vote)
    db.session.commit()
    
    return jsonify({'message': 'Röst registrerad'}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000) 