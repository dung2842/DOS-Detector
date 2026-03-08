from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/interfaces")
def interfaces():
    from scapy.all import get_if_list
    
    get_if_list()


@app.route("/start", methods=["POST"])
def start():
    iface = request.json["interface"]

    if not state.running:
        t = threading.Thread(target=start_sniff, args=(iface,))
        t.daemon = True
        t.start()
        state.running = True

    return jsonify({"status": "started"})


@app.route("/alerts")
def alerts():
    return jsonify(state.alerts)


if __name__ == "__main__":
    app.run(debug=True)

@app.route("/stop")
def stop():
    state.running = False
    return {"status": "stopped"}