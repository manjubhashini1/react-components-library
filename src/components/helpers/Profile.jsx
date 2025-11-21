const Profile = ({ data, setData, error }) => {
    const { name, email, age } = data;
    const handleChange = (e, item) => {
        setData((prev) => ({ ...prev, [item]: e.target.value }));
    }
    return (
        <div>
            <div className="flex gap-6 mb-4">
                <label className="w-10">Name:</label>
                <input type="text" className="border rounded-md" placeholder="Enter name" value={name} onChange={(e) => handleChange(e, "name")} />
                {error.name && <p className="text-red-500">{error.name}</p>}
            </div>
            <div className="flex gap-6 mb-4">
                <label className="w-10">Age:</label>
                <input type="number" className="border rounded-md" placeholder="Enter age" value={age} onChange={(e) => handleChange(e, "age")} />
                 {error.age && <p className="text-red-500">{error.age}</p>}
            </div>
            <div className="flex gap-6  mb-4">
                <label className="w-10">Email:</label>
                <input type="text" className="border rounded-md" placeholder="Enter email" value={email} onChange={(e) => handleChange(e, "email")} />
                 {error.email && <p className="text-red-500">{error.email}</p>}
            </div>
        </div>
    )
}

export default Profile;