import json
from sqlalchemy.exc import IntegrityError

from models.models import Nota, db, app
from flask import request, jsonify
from datetime import datetime

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
            }

            notas[nota.id] = nt

        return jsonify(notas)

    if request.method == 'POST':
        body = json.loads(str(request.data, encoding='utf-8'))
        print(body)

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

            }

            return jsonify(nota)

        try:
            nt = Nota(description=str(body['description']))
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

@app.route('/nota/<id>', methods=['GET'])
def nota_by_bloco(id):
    if request.method == 'DELETE':
        print(id)
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

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
