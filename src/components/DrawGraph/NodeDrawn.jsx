/* eslint-disable react/prop-types */
/**
 * Renders a node in a graph.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.position - The position of the node.
 * @param {number} props.id - The ID of the node.
 * @param {number} props.currentNode - The ID of the currently selected node.
 * @param {Function} props.handleClick - The click event handler for the node.
 * @param {boolean} props.isDragged - Indicates whether the node is being dragged.
 * @returns {JSX.Element} The rendered node component.
 */

export default function NodeDrawn({
  position,
  id,
  currentNode,
  handleClick,
  isDragged,
}) {
  return (
    <g
      transform={`translate(${position.x},${position.y})`}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleClick(id);
      }}
      className="cursor-pointer"
      style={{ cursor: `${isDragged ? "move" : ""}` }}
    >
      <circle
        r="20"
        fill={currentNode === id ? "#DBE2EF" : "white"}
        stroke="black"
        strokeWidth="4px"
      ></circle>
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
