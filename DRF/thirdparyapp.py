import requests

url = 'http://127.0.0.1:8000/allstudentinfo'

r = requests.get(url=url)

print(r.json())

