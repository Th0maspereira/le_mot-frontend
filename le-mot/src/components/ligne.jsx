import Case from './case.jsx';

function Ligne({ mot = '', status = []}) {
    const cases = Array(5).fill('');

    return (
        <div className='Ligne'>
            {cases.map((_, index) => (
                <Case key= {index} lettre={mot[index] || ''} status={status[index] || ''} />
            ))}
        </div>
    );
}