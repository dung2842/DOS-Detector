from collections import defaultdict
import time

THRESHOLD = 100

ip_counter = defaultdict(int)
last_reset = time.time()


def analyze_packet(pkt, alerts):
    global last_reset

    if pkt.haslayer("IP"):
        src = pkt["IP"].src
        ip_counter[src] += 1

        if ip_counter[src] > THRESHOLD:
            alerts.append({
                "ip": src,
                "type": "Possible DoS"
            })

    if time.time() - last_reset > 10:
        ip_counter.clear()
        last_reset = time.time()