import os
import sys

# Ensure that the services directory is in sys.path so that local imports work
services_dir = os.path.dirname(os.path.abspath(__file__))
if services_dir not in sys.path:
    sys.path.append(services_dir)
