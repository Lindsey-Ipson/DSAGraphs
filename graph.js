class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.nodes.add(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    this.nodes.forEach(node => {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    });
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen=[start]) {
    for (let node of start.adjacent) {
      if (!seen.includes(node)) {
        seen.push(node);
        this.depthFirstSearch(node, seen);
      }
    }
    return Array.from(seen).map(node => node.value);
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const seen = new Set([start]);

    while (queue.length) {
      const currentNode = queue.shift();
      for (let node of currentNode.adjacent) {
        if (!seen.has(node)) {
          seen.add(node)
          queue.push(node)
        }
      }
    }
    return Array.from(seen).map(node => node.value);
  }

}

module.exports = {Graph, Node}

