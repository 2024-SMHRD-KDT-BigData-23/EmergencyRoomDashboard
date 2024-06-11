#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import psutil

app = Flask(__name__, static_folder='build')
CORS(app)  # 모든 도메인에 대해 CORS 허용

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/system_metrics', methods=['GET'])
def get_system_metrics():
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_info = psutil.virtual_memory()
    disk_usage = psutil.disk_usage('/')

    return jsonify({
        "cpu_usage": cpu_usage,
        "memory_usage": memory_info.percent,
        "disk_usage": disk_usage.percent
    })

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)


# In[ ]:




