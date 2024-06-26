/* eslint-disable react/prop-types */
/**
 * Renders the pseudocode for the topsort algorithm.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.focusCodeLine - The line number to highlight in the pseudocode.
 * @returns {JSX.Element} The rendered component.
 */

export default function TopsortPseudocode({ focusCodeLine }) {
  /**
   * Highlights a specific line in the pseudocode if it matches the focus code line.
   * @param {number} id - The line number to check for highlighting.
   * @returns {Object} The style object for the line.
   */
  function highlight(id) {
    return { backgroundColor: focusCodeLine === id ? "#06121f" : "" };
  }

  return (
    <ul className="bg-pseudocode w-[60%] rounded-lg py-8 px-8 text-white flex flex-col gap-2">
      <li className="ml-2">
        <strong>for</strong> each vertex u &#8712; G:V
      </li>
      <li className="ml-6">DFS(u)</li>
      <li className="ml-2">
        <strong>function</strong> DFS(u) &#123;
      </li>
      <li className="ml-6" style={highlight(4)}>
        <strong>if</strong> u has <strong>permanent</strong> mark
      </li>
      <li className="ml-10" style={highlight(4)}>
        <strong>return</strong>
      </li>
      <li className="ml-6" style={highlight(6)}>
        <strong>if</strong> u has <strong>temporary</strong> mark
      </li>
      <li className="ml-10" style={highlight(6)}>
        G is not a DAG <strong>(STOP)</strong>
      </li>

      <li className="ml-6" style={highlight(8)}>
        <strong>temporary</strong> mark on u
      </li>
      <li className="ml-6">
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className="ml-10" style={highlight(10)}>
        DFS(v)
      </li>
      <li className="ml-6" style={highlight(11)}>
        <strong>permanent</strong> mark on u
      </li>
      <li className="ml-6" style={highlight(11)}>
        add u to head of List
      </li>
      <li className="ml-2">&#125;</li>
    </ul>
  );
}
