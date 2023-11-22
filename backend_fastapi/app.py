from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from pymongo import MongoClient
from hashlib import sha256
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "https://formista.vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGODB_URI = os.getenv('MONGODB_URL')
client = MongoClient(MONGODB_URI)
forms = client['formista']['forms']

try:
    client.admin.command('ping')
    # print("looks good")
except Exception as e:
    print(e)

_temp_ = {}

@app.get("/status")
def status():
    try:
        client.admin.command('ping')
        return "looks good"
    except Exception as e:
        return str(e)

@app.get('/')
async def index():
    return { "message": "Hello World!!" }


@app.get('/ping')
async def ping():
    return 'Pong'


@app.get('/exists')
async def exists(formID):
    return str( forms.find_one({ "formID": formID }) != None)


@app.post('/new')
async def new_form(data: dict):
    data['responses'] = []
    forms.insert_one(data)
    return {
        "message": 'Created new form',
        "formID": data.get('formID')
    }


@app.post('/respond/{formID}')
async def respond(formID:str, resp:dict):
    resp["timestamp"] = datetime.utcnow()
    forms.update_one(
        {"formID": formID},
        {"$push": {"responses": resp}}
    )
    return { "message": 'Form submitted!' }


@app.get('/favicon.ico')
async def get_favicon():
    return 403


@app.get('/{formID}')
async def get_form(formID):
    formdata = forms.find_one({ "formID": formID })
    if formdata:
        formdata = dict(formdata)
        del formdata['_id']
        return formdata
    else:
        return { 'message': 'Form not found', 'formID': formID, status: 404 }




@app.post('/storetemp/{formID}')
async def store_temp(formID:str, data:dict):
    if data.get('responses'):
        del data['responses']
    _temp_[formID] = data
    # print(_temp_[formID])
    return {
        'message': 'Stored successfully',
        'formID': formID
    }


@app.get('/gettemp/{formID}')
async def get_temp(formID:str):
    data = _temp_.get(formID)
    return data if data else JSONResponse(content={'message': 'Not found'}, status_code=404)


@app.post('/{formID}/edit')
async def edit_form(formID:str, data:dict):
    if data.get('responses'):
        del data['responses']
    forms.update_one({ 'formID': formID }, {
        "$set": data
    })
    if _temp_.get(formID):
        del _temp_[formID]
    return { "message": "Updated form" }
