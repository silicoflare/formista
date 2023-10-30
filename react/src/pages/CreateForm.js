import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateForm() {
    const nav = useNavigate();

    function getFormID() {
        let formID = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 1; i <= 10; i++)
            formID += chars.charAt(Math.floor(Math.random() * chars.length));
        return formID;
    }

    const basicData = {
        "formID": "",
        "password": "",
        "title": "New Form",
        "fontImports": [],
        "styles": {
            "header": {
                "backgroundColor": "",
                "color": ""
            },
            "body": {
                "backgroundColor": "",
                "color": ""
            },
            "heading": {
                "backgroundColor": "",
                "color": ""
            },
            "label": {
                "backgroundColor": "",
                "color": ""
            },
            "textbox": {
                "backgroundColor": "",
                "color": ""
            },
            "button": {
                "backgroundColor": "",
                "color": ""
            }
        },
        "metadata": [
            {
                "type": "textbox",
                "id": "name",
                "label": "Name",
                "placeholder": "Enter your name",
                "required": false
            },
            {
                "type": "textarea",
                "id": "message",
                "label": "Message",
                "placeholder": "Enter your message",
                "required": false
            }
        ]
    }


    const formID = getFormID();
    basicData['formID'] = formID;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basicData)
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/storetemp/${formID}`, options)
        .then(response => response.json())
        .then(data => {
            nav(`../${formID}/edit`);
        });
}