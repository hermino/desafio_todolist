from routes import db
from datetime import datetime

class Nota(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True,
        unique=True
    )
    description = db.Column(
        db.String(255)
    )
    date = db.Column(
        db.DateTime,
        default=datetime.now
    )
    update = db.Column(
        db.DateTime,
        default=datetime.now
    )
    erased = db.Column(
        db.Boolean,
        default=False
    )
    bloco_id = db.Column(
        db.Integer,
        db.ForeignKey('bloco.id'),
        nullable=False
    )