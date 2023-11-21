import { useState, useEffect } from "react";

export default function FormTodo({ data, setData, imports, setImports, keyName, titl, children }) {
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
        <div className="edit-container">
            <span className="text-white text-3xl">{titl}</span><br />
            <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--five]" onClick={addElement} title={`Add ${children}`}>
                + Add {children}
            </button>
            <div className="lg:pl-5 w-full" id="fontlist">
                {imports.map((x, i) => (
                    <span className="flex flex-row items-center my-2" key={i} id={`font-${i}`}>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-full lg:w-11/12 focus:outline-none focus:ring-2 focus:ring-[--one]" value={x || ''} onChange={(e) => updateElement(i, e.target.value)} />
                        <button className="p-2 w-11 h-11 ml-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => removeElement(i)} title={`Delete ${children}`}>×</button>
                    </span>
                ))}
            </div>
        </div>
    );
}
