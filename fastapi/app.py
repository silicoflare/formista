from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from pymongo import MongoClient
from hashlib import sha256
from datetime import datetime
import os
import dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, Depends, HTTPException, status

dotenv.load_dotenv()

class MongoDB:
    def __init__(self, db_url: str, db_name: str):
        self.db_url = db_url
        self.db_name = db_name
        self.client = None

    async def connect(self):
        self.client = AsyncIOMotorClient(self.db_url, ssl=True)
        return self.client[self.db_name]

app = FastAPI(title='Formista API')
mongodb_instance = MongoDB(
    db_url=f'mongodb+srv://silicoflare:{os.getenv("MONGODB_PASS")}@silicoverse.aoepe6c.mongodb.net/?retryWrites=true&w=majority',
    db_name='formista'
)

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB dependency
async def get_mongo_db():
    db = await mongodb_instance.connect()
    yield db



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
    return str( app.mongodb.forms.find_one({ "formID": formID }) != None)


@app.post('/new')
async def new_form(data: dict):
    data = await app.mongodb.forms.find_one({ "formID": data.get('formID') })
    if data:
        return {
            "message": 'Form already exists',
            "formID": data.get('formID')
        }
    else:
        # data['password'] = get_hash(data['password'])
        data['responses'] = []
        app.mongodb.forms.insert_one(data)
        return {
            "message": 'Created new form',
            "formID": data.get('formID')
        }


@app.post('/respond/{formID}')
async def respond(formID:str, resp:dict):
    resp["timestamp"] = datetime.utcnow()
    app.mongodb.forms.update_one(
        {"formID": formID},
        {"$push": {"responses": resp}}
    )
    return { "message": 'Form submitted!' }



@app.get('/{formID}')
async def get_form(formID, db=Depends(get_mongo_db)):
    forms = db['forms']
    formdata = await forms.find_one({ "formID": formID })
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
    app.mongodb.forms.update_one({ 'formID': formID }, {
        "$set": data
    })
    if _temp_.get(formID):
        del _temp_[formID]
    return { "message": "Updated form" }
