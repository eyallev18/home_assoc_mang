import React from "react";
import Card from "../../components/Card";

const panels = [
    "Add Edit Menus",
    "Resource Management",
    "Asset Management",
    "User Management",
    "Account Management"
];

export default () => (
    <div className="app-container">
        <div className="accordion-container">
            {panels.map(title => (
                <Card key={title} title={title} />
            ))}
        </div>
    </div>
);