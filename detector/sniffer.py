from scapy.all import sniff
from .analyzer import analyze_packet
from .state import alerts


def start_sniff(interface):
    sniff(
        iface=interface,
        prn=lambda pkt: analyze_packet(pkt, alerts),
        store=False
    )