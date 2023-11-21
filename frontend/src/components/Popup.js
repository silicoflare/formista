export default function Popup({ formID, setter, isPass }) {
    function submit()   {
        setter(() => document.getElementById('password').value);
    }

    return (
        <div className="bg-five p-8 rounded shadow-md flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 young-serif text-white">{ formID }</h2>
            <div className="flex flex-row space-x-3 items-center">
                <p className="text-xl montserrat font-bold">Password</p>
                { isPass ?
                    <input type="password" className={`rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]`} id="password"/> :
                    <input type="password" className={`rounded-md p-2 text-lg focus:outline-none ring-2 ring-[red]`} id="password"/>
                }
            </div>
            <button className="mt-4 bg-[--three] hover:bg-[--two] text-white font-bold py-2 px-4 rounded" onClick={submit}>Submit</button>
        </div>
    )
}