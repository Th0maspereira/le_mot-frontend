export default function Case({ lettre = '', status = ''}) {
    return (
        <div className={'Case ${status}'} >
            {lettre}
        </div>
    );
}