/* eslint-disable react/prop-types */
/**
 * Renders the pseudocode for Depth-First Search (DFS) algorithm.
 *
 * @param {Object} props - The component props.
 * @param {number} props.focusCodeLine - The line number to highlight in the pseudocode.
 * @returns {JSX.Element} The JSX element representing the pseudocode.
 */

export default function BfsPseudocode({ focusCodeLine }) {
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
      <li className="ml-2">Recursive Dfs: Call DFS(s)</li>
      <li className="ml-2">
        <strong>function</strong> DFS(u) &#123;
      </li>
      <li className="ml-6" style={highlight(3)}>
        <strong>if</strong> ( u is visited )
      </li>
      <li className="ml-10" style={highlight(3)}>
        <strong>return</strong>
      </li>
      <li className="ml-6" style={highlight(5)}>
        visit[u] = 1
      </li>
      <li className="ml-6">
        <strong>for</strong> each v &#8712; G.Adj[u]
      </li>
      <li className="ml-10" style={highlight(7)}>
        DFS(v)
      </li>
      <li className="ml-2">&#125;</li>
    </ul>
  );
}
