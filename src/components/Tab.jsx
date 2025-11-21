import { useState } from "react";
import Profile from "./helpers/Profile";
import Interests from "./helpers/Interests";
import Settings from "./helpers/Settings";

const Tab = () => {
    const [activeTab, setActiveTab] = useState(0);
    //formdata
    const [data, setData] = useState({
        name: "Manju Bhashini",
        age: "20",
        interests: ["Reading", "Travelling", "Coding"],
        email: "sample@gmail.com",
        theme: "dark"
    });
    //error
    const [error, setError] = useState({});
    let tabsList = [
        {
            title: "Profile",
            component: Profile,
            validate: () => {
                const err = {};
                if (!data.name || data.name.length < 2) {
                    err.name = "Name is required and should be at least 2 characters long";
                }
                if (!data.email || !data.email.includes("@")) {
                    err.email = "Valid email is required";
                }
                if (!data.age || data.age <= 18) {
                    err.age = "Age should be greater than 18";
                }
                setError(err);
                return err.name || err.age || err.email ? false : true;
            }
        },
        {
            title: "Interests",
            component: Interests,
            validate: () => {
                const err = {};
                if (data.interests.length < 1) {
                    err.interests = "Select at least one interests";
                }
                setError(err);
                return err.interests ? false : true;
            }
        },
        {
            title: "Settings",
            component: Settings,
            validate: () => true
        }
    ]

    const ActiveTabComponent = tabsList[activeTab].component;
    const handlePrev = () => {
        if (tabsList[activeTab].validate()) {
            setActiveTab((prev) => prev - 1)
        }
    }
    const handleNext = () => {
        if (tabsList[activeTab].validate()) {
            setActiveTab((prev) => prev + 1)
        }
    }
    const handleSubmit = () => {
        console.log(data);
    }
    return (

        <div>
            <div className="flex">
                {tabsList.map((tab, index) => (
                    <div key={tab.title}>
                        <div
                            className={`border-2 rounded-md w-50 p-4 cursor-pointer mr-2 bg-blue-500 text-white
                ${activeTab === index ? "border-black" : ""}
              `}
                            onClick={() => tabsList[activeTab].validate() && setActiveTab(index)}>
                            <p>{tab.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-left p-4 border">
                <ActiveTabComponent data={data} setData={setData} error={error} />
            </div>
            <div>
                {activeTab > 0 && <button className="border m-2 p-2 rounded-md" onClick={handlePrev}>Prev</button>}
                {activeTab < tabsList.length - 1 && <button className="border m-2 p-2 rounded-md" onClick={handleNext}>Next</button>}
                {activeTab === tabsList.length - 1 && <button className="border m-2 p-2 rounded-md" onClick={handleSubmit}>Submit</button>}
            </div>

        </div>

    )
}

export default Tab;