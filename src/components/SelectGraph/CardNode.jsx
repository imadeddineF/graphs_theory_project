/* eslint-disable react/prop-types */
/**
 * Renders a node on the graph.
 *
 * @param {Object} position - The position of the node on the graph.
 * @param {number} id - The ID of the node.
 * @returns {JSX.Element} - The rendered node.
 */

export default function NodeDrawn({ position, id }) {
  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <circle r="20" fill="white" stroke="black" strokeWidth="4px"></circle>
      <text
        x={-4.5 * (1 + (id > 9))}
        className="unselectable"
        y="5"
        fill="black"
      >
        {Number(id)}
      </text>
    </g>
  );
}
