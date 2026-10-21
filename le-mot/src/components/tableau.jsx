import ligne from "./ligne.jsx";

export default function tableau({ essaisPasses, essaisStatuts, essaiEnCours }) {
  const lignes = Array(6).fill('');

  return (
    <div className="tableau">
      {lignes.map((_, index) => {
        if (index < essaisPasses.length) {
          return <ligne key={index} mot={essaisPasses[index]} statuts={essaisStatuts[index]} />;
        }
        if (index === essaisPasses.length) {
          return <ligne key={index} mot={essaiEnCours} />;
        }
        return <ligne key={index} />;
      })}
    </div>
  );
}