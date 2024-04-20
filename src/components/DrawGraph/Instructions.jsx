export default function Instructions() {
  return (
    <div className="bg-instructions h-full rounded-lg px-4 py-6 shadow-md">
      <h2 className="text-center mb-3 font-bold text-[18px]">Instructions</h2>
      <ul className="flex flex-col gap-3 text-[14px] text-[#384259]">
        <li>1- Cliquez dans un espace vide pour créer un sommet</li>
        <li>
          2- Cliquez sur un sommet, puis cliquez sur un autre pour créer une
          arête
        </li>
        <li>3- Faites glisser les sommets en appuyant et en relâchant</li>
        <li>
          4- Cliquez sur un sommet ou une arête, puis appuyez sur « Supprimer »
          pour les supprimer
        </li>
        <li>
          5- Double-cliquez sur une arête pour changer son poids (si les poids
          sont activés)
        </li>
        <li>
          6- Copiez les données d'exportation et conservez-les, plus tard vous
          pourrez les coller dans la boîte d'importation et récupérer votre
          graphe
        </li>
      </ul>
    </div>
  );
}
