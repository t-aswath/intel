import json
from flask import Flask, request
from flask_cors import CORS
from gradio_client import Client

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/api/cimta", methods=["POST"])
def cimta():
    if request.method == "POST":
        o = []
        cimta = Client("aswatht/cimta")
        itas = Client("aswatht/itas")

        data = request.json["data"],

        for doctor in data[0]:
            result = cimta.predict(
                float(doctor["pending_patients_count"]),
                float(doctor["avg_wait_time"]),
                float(doctor["time"]),
                float(doctor["rating"]),
                api_name="/predict",
            )

            doctor["viable"] = result
            crowd = doctor["crowd"]
            print(crowd)
            print(type(crowd[0]))
            ans = itas.predict(crowd[0], crowd[1], crowd[2], crowd[3], crowd[4], crowd[5], crowd[6], api_name="/predict")
            doctor["estimate"] = ans

            o.append(doctor)

        return json.dumps(o)

if __name__ == "__main__":
    app.run()
