from flask import Blueprint, render_template, flash, redirect, url_for, abort

import json, requests
import requests_toolbelt.adapters.appengine

requests_toolbelt.adapters.appengine.monkeypatch()

api = Blueprint('api', __name__)
