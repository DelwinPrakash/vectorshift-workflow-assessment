// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

// Helper to save to localStorage
const saveToStorage = (nodes, edges, nodeIDs) => {
  try {
    localStorage.setItem("pipeline-nodes", JSON.stringify(nodes));
    localStorage.setItem("pipeline-edges", JSON.stringify(edges));
    localStorage.setItem("pipeline-nodeIDs", JSON.stringify(nodeIDs || {}));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
};

// Helper to load from localStorage
const loadFromStorage = () => {
  try {
    const nodes = localStorage.getItem("pipeline-nodes");
    const edges = localStorage.getItem("pipeline-edges");
    const nodeIDs = localStorage.getItem("pipeline-nodeIDs");
    return {
      nodes: nodes ? JSON.parse(nodes) : [],
      edges: edges ? JSON.parse(edges) : [],
      nodeIDs: nodeIDs ? JSON.parse(nodeIDs) : {},
    };
  } catch (e) {
    console.error("Failed to load from localStorage:", e);
    return { nodes: [], edges: [], nodeIDs: {} };
  }
};

const initialData = loadFromStorage();

export const useStore = create((set, get) => ({
    nodes: initialData.nodes,
    edges: initialData.edges,
    nodeIDs: initialData.nodeIDs,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        saveToStorage(get().nodes, get().edges, newIDs);
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        const newNodes = [...get().nodes, node];
        set({
            nodes: newNodes
        });
        saveToStorage(newNodes, get().edges, get().nodeIDs);
    },
    onNodesChange: (changes) => {
      const newNodes = applyNodeChanges(changes, get().nodes);
      set({
        nodes: newNodes,
      });
      saveToStorage(newNodes, get().edges, get().nodeIDs);
    },
    onEdgesChange: (changes) => {
      const newEdges = applyEdgeChanges(changes, get().edges);
      set({
        edges: newEdges,
      });
      saveToStorage(get().nodes, newEdges, get().nodeIDs);
    },
    onConnect: (connection) => {
      const newEdges = addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges);
      set({
        edges: newEdges,
      });
      saveToStorage(get().nodes, newEdges, get().nodeIDs);
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      const newNodes = get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
  
        return node;
      });
      set({
        nodes: newNodes,
      });
      saveToStorage(newNodes, get().edges, get().nodeIDs);
    },
    resetAll: () => {
      localStorage.removeItem("pipeline-nodes");
      localStorage.removeItem("pipeline-edges");
      localStorage.removeItem("pipeline-nodeIDs");
      set({
        nodes: [],
        edges: [],
        nodeIDs: {},
      });
    }
  }));
