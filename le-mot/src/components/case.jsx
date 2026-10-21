export default function Case({ lettre = '', status = ''}) {
    return (
        <div className={'case ${status}'} >
            {lettre}
        </div>
    );
}