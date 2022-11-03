import falcon
from waitress import serve
from falcon_cors import CORS
import requests
import json
import time
import psycopg2
import re

cors = CORS(allow_all_origins=True, allow_all_headers=True,
            allow_credentials_all_origins=True, allow_all_methods=True)


class getplots(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="agg"
            )
            cursor = connection.cursor()
            print("Successfully connected to AGG DB")
        except (Exception, psycopg2.Error) as error:
            print('Unable to connect to DB', error)
        finally:
            try:
                with connection.cursor() as cursor:
                    cursor.execute("""
                        SELECT object_id, ST_AsGeoJSON(geom)::json FROM plots
                    """)
                    plots = cursor.fetchall()
                    response = {'plots': []}
                    for plot in plots:
                        response['plots'].append({
                            'id': plot[0],
                            'geometry': plot[1]
                        })

            finally:
                resp_body = {}
                resp_body.update(response)
                resp.body = (json.dumps(resp_body))
                print(resp.status)


class getblocks(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="agg"
            )
            cursor = connection.cursor()
            print("Successfully connected to AGG DB")
        except (Exception, psycopg2.Error) as error:
            print('Unable to connect to DB', error)
        finally:
            try:
                with connection.cursor() as cursor:
                    cursor.execute("""
                        SELECT DISTINCT block_name FROM plots
                    """)
                    blocks = cursor.fetchall()
                    response = {'blocks': []}
                    for block in blocks:
                        response['blocks'].append(block[0])

            finally:
                resp_body = {}
                resp_body.update(response)
                resp.body = (json.dumps(resp_body))
                print(resp.status)


class getplotids(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="agg"
            )
            cursor = connection.cursor()
            print("Successfully connected to AGG DB")
        except (Exception, psycopg2.Error) as error:
            print('Unable to connect to DB', error)
        finally:
            block_name = req.params['block_name']
            try:
                with connection.cursor() as cursor:
                    cursor.execute("""
                        SELECT plot_id, object_id FROM PLOTS 
                        where block_name='""" + str(block_name) + """'
                    """)
                    plotids = cursor.fetchall()
                    response = {'plotids': []}
                    for pid in plotids:
                        response['plotids'].append({
                            'pid': pid[0], 'oid': pid[1]
                        })

            finally:
                resp_body = {}
                resp_body.update(response)
                resp.body = (json.dumps(resp_body))
                print(resp.status)


class getplotinfo(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="agg"
            )
            cursor = connection.cursor()
            print("Successfully connected to AGG DB")
        except (Exception, psycopg2.Error) as error:
            print('Unable to connect to DB', error)
        finally:
            plot_id = req.params['plotid']
            try:
                with connection.cursor() as cursor:
                    cursor.execute("""
                        SELECT 
                        object_id, 
                        plot_id, 
                        type, 
                        dimensions,
                        size,
                        status,
                        block_name,
                        ST_AsGeoJSON(ST_Centroid(geom))::json
                        FROM PLOTS 
                        where object_id='""" + str(plot_id) + """'
                    """)
                    plotinfo = cursor.fetchall()[0]
                    response = {
                        'oid': plotinfo[0],
                        'pid': plotinfo[1],
                        'type': plotinfo[2],
                        'dimensions': plotinfo[3],
                        'size': plotinfo[4],
                        'status': plotinfo[5],
                        'block': plotinfo[6],
                        'coordinates': plotinfo[7]['coordinates'],
                    }
                    # for pid in plotids:
                    #     response['plotids'].append({
                    #         'pid': pid[0], 'oid': pid[1]
                    #     })

            finally:
                resp_body = {}
                resp_body.update(response)
                resp.body = (json.dumps(resp_body))
                print(resp.status)


api = falcon.API(middleware=[cors.middleware])
api.add_route('/getplots', getplots())
api.add_route('/getblocks', getblocks())
api.add_route('/getplotids', getplotids())
api.add_route('/getplotinfo', getplotinfo())
# api.add_route('/getsummary', getsummary())
serve(api, host='localhost', port=3000)
