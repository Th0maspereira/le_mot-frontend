import Ligne from "./ligne.jsx";

export default function Tableau({ essaisPasses, essaisStatuts, essaiEnCours }) {
  const Lignes = Array(6).fill('');

  return (
    <div className="Tableau">
      {Lignes.map((_, index) => {
        if (index < essaisPasses.length) {
          return <Ligne key={index} mot={essaisPasses[index]} statuts={essaisStatuts[index]} />;
        }
        if (index === essaisPasses.length) {
          return <Ligne key={index} mot={essaiEnCours} />;
        }
        return <Ligne key={index} />;
      })}
    </div>
  );
}