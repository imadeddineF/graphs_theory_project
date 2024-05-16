/* eslint-disable react/prop-types */
/**
 * Renders a temporal edge component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.x1 - The x-coordinate of the starting point of the edge.
 * @param {number} props.y1 - The y-coordinate of the starting point of the edge.
 * @param {number} props.x2 - The x-coordinate of the ending point of the edge.
 * @param {number} props.y2 - The y-coordinate of the ending point of the edge.
 * @returns {JSX.Element} The rendered temporal edge component.
 */

export default function TemporalEdge({ x1, y1, x2, y2 }) {
  const alfa = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="3px" />
      <path
        d={`M ${x2} ${y2} L ${x2 + 6} ${y2 + 20} 
          L ${x2 - 6} ${y2 + 20} Z`}
        transform={`rotate(${alfa + 90} ${x2} ${y2})`}
      />
    </g>
  );
}
