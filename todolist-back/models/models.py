from configuration import db
from datetime import datetime

'''
class Bloco(db.Model):
    __tablename__ = 'bloco'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    description = db.Column(
        db.String(255),
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
    nota = db.relationship('Nota', backref='nota', lazy=True)
'''

class Nota(db.Model):

    __tablename__ = 'nota'

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
    '''
    bloco_id = db.Column(
        db.Integer,
        db.ForeignKey('bloco.id'),
        nullable=False
    )
    '''