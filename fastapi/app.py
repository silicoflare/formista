from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from pymongo import MongoClient
from hashlib import sha256
from datetime import datetime
import os
import dotenv
dotenv.load_dotenv()

app = FastAPI(title='Formista API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "*"] ,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


client = MongoClient(f'mongodb+srv://silicoflare:{os.getenv("MONGODB_PASS")}@silicoverse.aoepe6c.mongodb.net/?retryWrites=true&w=majority')
form_coll = client['formista']['forms']

_temp_ = {}


def get_hash(password):
    return sha256(password.encode('utf-8')).hexdigest()


@app.get('/')
async def index():
    return { "message": "Hello World!!" }


@app.get('/ping')
async def ping():
    return 'Pong'


@app.get('/exists')
async def exists(formID):
    return str(form_coll.find_one({ "formID": formID }) != None)


@app.post('/new')
async def new_form(data: dict):
    if form_coll.find_one({ "formID": data.get('formID') }):
        return {
            "message": 'Form already exists',
            "formID": data.get('formID')
        }
    else:
        # data['password'] = get_hash(data['password'])
        data['responses'] = []
        form_coll.insert_one(data)
        return {
            "message": 'Created new form',
            "formID": data.get('formID')
        }


@app.post('/respond/{formID}')
async def respond(formID:str, resp:dict):
    resp["timestamp"] = datetime.utcnow()
    form_coll.update_one(
        {"formID": formID},
        {"$push": {"responses": resp}}
    )
    return { "message": 'Form submitted!' }



@app.get('/{formID}')
async def get_form(formID):
    formdata = form_coll.find_one({ "formID": formID })
    del formdata['_id']
    return formdata if formdata != None else { 'message': 'Form not found', 'formID': formID, status: 404 }




@app.post('/storetemp/{formID}')
async def store_temp(formID:str, data:dict):
    if data.get('responses'):
        del data['responses']
    _temp_[formID] = data
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
    form_coll.update_one({ 'formID': formID }, {
        "$set": data
    })
    if _temp_.get(formID):
        del _temp_[formID]
    return { "message": "Updated form" }
