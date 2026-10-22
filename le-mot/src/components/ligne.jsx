import Case from './case.jsx';

export default function Ligne({ mot = '', statuts = [], estActive = false }) {
  const cases = Array(5).fill('');

  return (
    <div className="Ligne">
      {cases.map((_, index) => {
        const laCaseActive = estActive && index === mot.length;

        return (
          <Case 
            key={index} 
            lettre={mot[index] || ''} 
            statuts={statuts[index] || ''} 
            active={laCaseActive} 
          />
        );
      })}
    </div>
  );
}