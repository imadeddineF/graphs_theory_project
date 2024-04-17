export default function Instructions() {
  return (
    <div className="bg-[#dbe2ef] h-full rounded-lg px-4 py-6 shadow-md">
      <h2 className="text-center mb-3 font-bold text-[18px]">Instructions</h2>
      <ul className="flex flex-col gap-3 text-[14px] text-[#384259]">
        <li>1- Click in an empty space to create a node</li>
        <li>2- Click a node and then click another to create an edge</li>
        <li>3- Drag nodes by pressing and releasing</li>
        <li>
          4- Click a node or an edge and then press "Delete" to remove them
        </li>
        <li>
          5- Double click an edge to change its weight (if weights are
          activated)
        </li>
        <li>
          6- Copy the export data and keep it, later on you can paste it into
          the import box and recover your graph
        </li>
      </ul>
    </div>
  );
}
