import time
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import json
from sqlalchemy.ext.declarative import DeclarativeMeta


class AlchemyEncoder(json.JSONEncoder):
    # To serialize SQLalchemy objects
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            model_fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    # this will fail on non-encodable values, like other classes
                    json.dumps(data)
                    model_fields[field] = data
                except TypeError:
                    model_fields[field] = None
            return model_fields
        if isinstance(obj, Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.String(100), nullable=False)

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)


@app.route('/api/add', methods=['POST'])
def index():
    if request.method == 'POST':
        req = request.get_json(force=True)
        comment = req['comment']
        username = req['username']
        try:
            db.session.add(
                Message(comment=comment, userName=username))
            db.session.commit()
            res = make_response(jsonify({'message': 'ok'}), 200)
            return res
        except:
            res = make_response(jsonify({'message': 'debil'}), 400)
            return res


@app.route('/api/posts')
def get_posts():
    items = Message.query.all()
    _items_ = []
    for item in items:
        _items_.append(json.dumps(item, cls=AlchemyEncoder))
    return {'posts': _items_}


@app.route('/api/posts/clear', methods=['POST'])
def clear_posts():
    try:
        db.session.query(Message).delete()
        db.session.commit()
        return make_response(jsonify({'message': 'privet'}), 200)
    except:
        return make_response(400)