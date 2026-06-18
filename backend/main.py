import json
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for the frontend application (which runs on port 3000 by default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
    except Exception:
        data = {}

    nodes = data.get('nodes', [])
    edges = data.get('edges', [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build adjacency list
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adj and target in adj:
            adj[source].append(target)

    # State tracking: 0 = unvisited, 1 = visiting, 2 = visited
    visited = {}
    
    def has_cycle(u):
        visited[u] = 1 # visiting
        for v in adj[u]:
            if visited.get(v) == 1:
                return True
            elif visited.get(v) != 2:
                if has_cycle(v):
                    return True
        visited[u] = 2 # visited
        return False

    is_dag = True
    for node in nodes:
        node_id = node['id']
        if visited.get(node_id) != 2:
            if has_cycle(node_id):
                is_dag = False
                break

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
