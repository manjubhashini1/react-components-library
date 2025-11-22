const Interests = ({ data, setData, error }) => {
    const { interests } = data;
    const handleChange = (e, name) => {
        setData((prev)=>({...prev, 
            interests: e.target.checked ? [...prev.interests, name] : prev.interests.filter((item)=> item!==name)
        }));
    }
    console.log(interests);
    return (
        <div>
            <div className="flex gap-6 mb-4">
                <label className="flex">Coding: </label>
                <input type="checkbox"
                    className="border rounded-md"
                    name="Coding"
                    checked={interests.includes("Coding")}
                    onChange={(e) => handleChange(e, e.target.name)}
                />
            </div>
            <div className="flex gap-6 mb-4">
                <label className="flex">Music: </label>
                <input type="checkbox"
                    className="border rounded-md"
                    name="Music"
                    checked={interests.includes("Music")} 
                    onChange={(e) => handleChange(e, e.target.name)}
                    />
            </div>
            <div className="flex gap-6 mb-4">
                <label className="flex">Reading: </label>
                <input type="checkbox"
                    className="border rounded-md"
                    name="Reading"
                    checked={interests.includes("Reading")} 
                    onChange={(e) => handleChange(e, e.target.name)}/>
            </div>
            <div className="flex gap-6 mb-4">
                <label className="flex">Travelling: </label>
                <input type="checkbox"
                    className="border rounded-md"
                    name="Travelling"
                    checked={interests.includes("Travelling")} 
                    onChange={(e) => handleChange(e, e.target.name)}   />
            </div>
            {error.interests && <p className="text-red-500">{error.interests}</p>}
        </div>
    )
}

export default Interests;