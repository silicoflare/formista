import { useState, useEffect } from "react";

export default function FormTodo({ data, setData, keyName, titl, children }) {
    const [imports, setImports] = useState([]);

    useEffect(() => {
        setImports(() => data['fontImports']);
    }, [data]);

    function removeElement(index) {
        setImports((old) => {
          const updatedImports = [...old];
          updatedImports.splice(index, 1); // Remove 1 element at the specified index
          return updatedImports;
        });
    }

    function updateElement(index, newVal) {
        setImports((old) => {
            const updatedImports = [...old];
            updatedImports[index] = newVal;
            return updatedImports;
        });
    }

    function addElement() {
        setImports((old) => [...old, '']);
    }

    return (
        <div className="bg-[--five] py-3 px-5 rounded-md w-3/4 space-y-4">
            <span className="text-white text-3xl">{titl}</span><br />
            <button className="bg-[--three] p-2 text-white rounded-md" onClick={addElement}>
                + Add {children}
            </button>
            <div className="pl-5" id="fontlist">
                {imports.map((x, i) => (
                    <span className="flex flex-row items-center my-2" key={i} id={`font-${i}`}>
                        <input type="text" className="fonts p-2 bg-white text-black text-lg font-mono w-11/12 focus:outline-none focus:ring-2 focus:ring-[--three]" value={x || ''} onChange={(e) => updateElement(i, e.target.value)} />
                        <button className="p-2 w-11 h-11 mx-2 bg-red-700 text-white" onClick={() => removeElement(i)} >×</button>
                    </span>
                ))}
            </div>
        </div>
    );
}
