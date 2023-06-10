import React, {useState} from "react";
import { Button } from "@/components";
import { Calender } from "@/components";

interface Props {
    title: String;
}

const Sidebar = ({title} : Props) => {
    
    // Function für selected, welche die entsprechende Filterlogik implementiert, basierend auf dem ausgewählten Punkt

    return <div>
        <div>
            <h1>{title}</h1>
        </div>
        <div className="btnGroup">
            <Button size="large" color="lighter" selected={} onClick={} >
                Alle
            </Button>
            <Button size="large" color="lighter" selected={} onClick={} >
                Aufgaben
            </Button>
            <Button size="large" color="lighter" selected={} onClick={} >
                Aufgegeben
            </Button>
        </div>
        <div className="calender">
            <Calender></Calender>
        </div>
        <div className="linkGroup">
            <Button size="small" color="lighter" selected={} onClick={} >
                icon Einstellungen
            </Button>
            <Button size="small" color="lighter" selected={} onClick={} >
                icon Abmelden
            </Button>
        </div>
    </div>;
};

export default Sidebar;