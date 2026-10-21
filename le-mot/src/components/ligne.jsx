import Case from './case.jsx';

function ligne({ mot = '', status = []}) {
    const cases = Array(5).fill('');

    return (
        <div className='ligne'>
            {cases.map((_, index) => (
                <Case key= {index} lettre={mot[index] || ''} status={status[index] || ''} />
            ))}
        </div>
    );
}