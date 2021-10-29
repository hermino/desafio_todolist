import json

from sqlalchemy.exc import IntegrityError

from models.models import Bloco, Nota, db, app
from flask import request, jsonify
from datetime import datetime

@app.route('/bloco/', methods=['GET', 'POST', 'DELETE'])
def bloco():
    if request.method == 'GET':
        blocos = {}
        for bloco in Bloco.query.filter_by(erased=False).all():
            blc = {
                'id': bloco.id,
                'description': bloco.description,
                'date': bloco.date,
                'update': bloco.update,
                'erased': bloco.erased
            }

            blocos[bloco.id] = blc

        return jsonify(blocos)

    if request.method == 'POST':
        body = json.loads(str(request.data, encoding='utf-8'))

        search = Bloco.query.get(int(body['id']))

        if search:
            search.description = str(body['description'])
            search.update = datetime.now()
            db.session.commit()

            bloco = {
                'id': search.id,
                'description': search.description,
                'date': search.date,
                'update': search.update,
                'erased': search.erased
            }

            return jsonify(bloco)

        try:
            blc = Bloco(description=str(body['description']))
            db.session.add(blc)
            db.session.commit()
        except IntegrityError or TypeError:
            return {'error': 'A descricao ja exite!'}

        bloco = {
            'id': blc.id,
            'description': blc.description,
            'date': blc.date,
            'update': blc.update,
            'erased': blc.erased
        }

        return jsonify(bloco)

    if request.method == 'DELETE':
        body = json.loads(str(request.data, encoding='utf-8'))

        blc = Bloco.query.get(int(body['id']))

        blc.erased = True
        blc.update = datetime.now()
        db.session.commit()

        bloco = {
            'id': blc.id,
            'description': blc.description,
            'date': blc.date,
            'update': blc.update,
            'erased': blc.erased
        }

        return jsonify(bloco)

@app.route('/nota/', methods=['GET', 'POST', 'DELETE'])
def nota():
    if request.method == 'GET':
        notas = {}

        for nota in Nota.query.filter_by(erased=False).all():
            nt = {
                'id': nota.id,
                'description': nota.description,
                'date': nota.date,
                'update': nota.update,
                'erased': nota.erased,
                'bloco_id': nota.bloco_id
            }

            notas[nota.id] = nt

        return jsonify(notas)

    if request.method == 'POST':
        body = json.loads(str(request.data, encoding='utf-8'))

        try:
            search = Nota.query.get(int(body['id']))
        except:
            search = None

        if search:
            search.description = str(body['description'])
            search.update = datetime.now()
            db.session.commit()

            nota = {
                'id': search.id,
                'description': search.description,
                'date': search.date,
                'update': search.update,
                'erased': search.erased,
                'bloco_id': search.bloco_id

            }

            return jsonify(nota)

        try:
            nt = Nota(description=str(body['description']), bloco_id=int(body['bloco_id']))
            db.session.add(nt)
            db.session.commit()
        except IntegrityError or TypeError:
            return {'error': 'A descricao ja exite!'}

        nota = {
            'id': nt.id,
            'description': nt.description,
            'date': nt.date,
            'update': nt.update,
            'erased': nt.erased
        }

        return jsonify(nota)

    if request.method == 'DELETE':
        body = json.loads(str(request.data, encoding='utf-8'))

        nt = Nota.query.get(int(body['id']))

        nt.erased = True
        nt.update = datetime.now()
        db.session.commit()

        nota = {
            'id': nt.id,
            'description': nt.description,
            'date': nt.date,
            'update': nt.update,
            'erased': nt.erased
        }

        return jsonify(nota)

@app.route('/nota/<id>', methods=['GET'])
def nota_by_bloco(id):
    notas = {}

    for nota in Nota.query.filter_by(erased=False,bloco_id=id).all():
        nt = {
            'id': nota.id,
            'description': nota.description,
            'date': nota.date,
            'update': nota.update,
            'erased': nota.erased,
            'bloco_id': nota.bloco_id
        }

        notas[nota.id] = nt

    return jsonify(notas)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
