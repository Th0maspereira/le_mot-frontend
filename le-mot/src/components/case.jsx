export default function Case({ lettre = '', status = '', active = false}) {
    return (
        <div className={`Case ${status} ${active ? 'active' : ''}`} >
            {lettre}
        </div>
    );
}