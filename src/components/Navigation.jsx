import React from "react";
import { Tablist, SidebarTab, Tab, HomeIcon, DatabaseIcon, FolderOpenIcon, SettingsIcon, KeyIcon} from 'evergreen-ui';
import {useParams, useNavigate, useLocation} from "react-router-dom";
import { useEffect } from "react";

export function Navigation() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const tabs = ['Auth', 'Database',  'Storage', 'Settings']
    const tabIcon = [ <KeyIcon />, <DatabaseIcon />, <FolderOpenIcon />, <SettingsIcon />]

    let navigate = useNavigate();
    let params = useParams().pid;

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split('/');
        let index = tabs.map(tab => tab.toLowerCase()).indexOf(path[3]);
        setSelectedIndex(index == -1 ? 0 : index);
    }, []);

    const switchLink = (index) => {
        let url = '';
        setSelectedIndex(index);
        switch (index) {
            case 0:
                url = `/app/${params}/auth`;
                break;
            case 1:
                url = `/app/${params}/database`;
                break;
            case 2:
                url =`/app/${params}/storage`;
                break;
            case 3:
                url = `/app/${params}/settings`;
                break;
            default:
                url = `/app/${params}/auth`;
                break;
        }

        navigate(url);
    }

    return (
        // <div class = "container">
        //     <div class = "panel" style = {{width: "99%", float:"left"}}>
                <Tablist style={{width: "15%"}}>
                    {tabs.map((tab, index) => (
                    <SidebarTab
                        key={tab}
                        id={tab}
                        onSelect={() => {
                            switchLink(index);
                        }}
                        isSelected={index === selectedIndex}
                        aria-controls={`panel-${tab}`}
                    >
                    <div style={{marginRight:"15%"}}>{tabIcon[index]}</div>
                        {tab}
                    </SidebarTab>
                    ))}
                </Tablist>
        //      </div>
        //     <div style = {{width: "1%", float: "left"}}>
        //         <div style = {{borderRight: "1px solid purple", height: "550px"}} class = "v1"></div>
        //     </div>  
        // </div> 

        
    );
}