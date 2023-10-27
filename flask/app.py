from flask import Flask
from pymongo import MongoClient
import os
import dotenv

app = Flask(__name__)

MONGODB_URI = f'mongodb+srv://silicoflare:{os.getenv("MONGODB_PASS")}@silicoverse.aoepe6c.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(MONGODB_URI)
forms = client['formista']['forms']

@app.route('/')
def index():
    return 'Hello World!!'

@app.route('/<formID>')
def get_form(formID):
    formdata = forms.find_one({ "formID": formID })
    del formdata['_id']
    return formdata if formdata != None else { 'message': 'Form not found', 'formID': formID, status: 404 }