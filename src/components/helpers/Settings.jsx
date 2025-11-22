const Settings = ({data, setData}) => {
    const {theme} = data;
    const handleChange = (e) => {
        setData((prev)=>({...prev, theme: e.target.name}));
    }
    return (
        <div>
            <div className="flex gap-4">
                <label>Dark</label>
                <input 
                type="radio" 
                name="dark" 
                checked = {theme==="dark"}
                onChange={handleChange}/>
            </div>
            <div className="flex gap-4">
                <label>Light</label>
                <input 
                type="radio" 
                name="light" 
                checked = {theme==="light"}
                onChange={handleChange}/>
            </div>
        </div>
    )
}

export default Settings;