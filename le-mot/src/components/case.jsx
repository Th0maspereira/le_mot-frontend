export default function Case({ lettre = '', statuts = '', active = false}) {
    return (
        <div className={`Case ${statuts} ${active ? 'active' : ''}`} >
            {lettre}
        </div>
    );
}