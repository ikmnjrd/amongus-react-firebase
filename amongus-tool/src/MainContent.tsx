import React, {useState} from 'react';
import './index.css';
import SideNav from './SideNav';
import TermsList from './TermsList';
import Modal from '@material-ui/core/Modal';

interface StringKeyObject {
    [key: string]: any;
}

export default function MainContent() {
    /* -----------------------------------  */
    /* -----------  変数宣言  -------------  */
    /* -----------------------------------  */
    const [entryCrew, setEntryCrew] = useState(["black", "blue", "brown", "cyan", "green"]);

    const [crewStatuses, setCrewStatuses] = useState<any>({
        black:  {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        blue:   {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        brown:  {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        cyan:   {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        green:  {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        lime:   {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        orange: {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        pink:   {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        purple: {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        red:    {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        white:  {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
        yellow: {entry: true, button: false, life: false, name: "", term1: "gray", term2: "gray", term3: "gray", term4: "gray", term5: "gray"},
    });


    const players = ["black", "blue", "brown", "cyan", "green", "lime", "orange", "pink", "purple", "red", "white", "yellow"];

    const [areaImg, setAreaImg] =useState<string>("skeld.jpg")
    const area_map:StringKeyObject  = {  skeld: "skeld.jpg",
                        miraHQ: "mira-hq.png",
                        polus: "polus.jpg",
                        airship: "airship.png",
                    };

    const terms_num = 5;

    console.log(crewStatuses)

    
    React.useEffect(() => {
        // generateTermCol();
        // ScrollToBottom();
    }, []) 

    /* -----------------------------------  */
    /* -----------  関数宣言  -------------  */
    /* -----------------------------------  */

    const selected_players = (color: string) :void => {
        if (!entryCrew.includes(color)){
            setEntryCrew((entryCrew)　=> entryCrew.concat(color));
        } else {
            const new_entryCrew = entryCrew.filter(n => n !== color);
            setEntryCrew(new_entryCrew);
        }
    }

    const handleClickNewGame = ():void => {
        players.forEach(crew => {
            setCrewStatuses((prev:any) => ({
                ...prev,
                [crew]: Object.assign({
                        entry: crewStatuses[crew].entry, 
                        button: false, 
                        life: false,
                        name: crewStatuses[crew].name,
                        term1: "gray",
                        term2: "gray",
                        term3: "gray",
                        term4: "gray",
                        term5: "gray",
                    }, {}
                )
            }));
        });
    }

    const handleChangeCrewValue = (crew:string, item:string, value:any) => {
        setCrewStatuses((prev:any) => ({
            ...prev,
            [crew]: Object.assign({
                    entry: crewStatuses[crew].entry, 
                    button: crewStatuses[crew].button, 
                    life: crewStatuses[crew].life,
                    name: crewStatuses[crew].name,
                    term1: crewStatuses[crew].term1,
                    term2: crewStatuses[crew].term2,
                    term3: crewStatuses[crew].term3,
                    term4: crewStatuses[crew].term4,
                    term5: crewStatuses[crew].term5,
                }, {[item]: value}
            )
        }));
    }

    const ScrollToBottom = ():void => {
        window.setTimeout(() => {
            const element = document.documentElement;
            const bottom = element.scrollHeight - element.clientHeight;
            window.scrollTo({top: bottom, behavior: "smooth"});
        }, 400);
        
    }
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    /* -----------------------------------  */
    /* ----------- NEW Field -------------  */
    /* -----------------------------------  */

    const brandnew = entryCrew.map((crew_color, index) => {
        return (
            <div key={index} id={crew_color} className="player-area">
                <div className="player-props">
                    <img src={`./img/${crewStatuses[crew_color].life 
                        ? crew_color+"-dead" : crew_color}.png`}
                        width="50"
                        height="67"
                        alt="alt_test"
                    />
                    <div>
                        <input
                            type="text"
                            value={crewStatuses[crew_color].name}
                            onChange={(e) => {
                                handleChangeCrewValue(crew_color, "name", e.target.value);
                            }}
                        />
                    </div>
                    <div className="status-checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                checked={crewStatuses[crew_color].life}
                                onChange={() => {
                                    handleChangeCrewValue(crew_color, "life", !crewStatuses[crew_color].life);
                                }}
                            />
                                Dead
                        </label>
                        <label>
                            <input type="checkbox"
                                name="emergency_button"
                                checked={crewStatuses[crew_color].button}
                                onChange={(e) => {
                                    handleChangeCrewValue(crew_color, "button", !crewStatuses[crew_color].button);
                                }}
                            />
                                Emergency
                        </label>
                    </div>
                    
                </div>

                <TermsList 
                    crewColor={crew_color}
                    num={index}
                    terms_num={terms_num}
                    crewStatuses={crewStatuses}
                    handleChangeCrewValue={handleChangeCrewValue}
                />
            </div>
        );
    })

    /* -----------------------------------  */
    /* -----------JSX.Element-------------  */
    /* -----------------------------------  */

    const entry_player_buttons = players.map((crew_color, index) => {
        return (
            <img 
                key={index} 
                src={`./img/${crew_color}.png`} 
                width="50"
                height="67"
                className={ !entryCrew.includes(crew_color) ? "img-mask" : "" }
                onClick={() => selected_players(crew_color)} 
                alt="selected-player"
            />);
    });

    /* -----------------------------------  */
    /* -----------  Renderer -------------  */
    /* -----------------------------------  */
    return (
        <div className="ly_content">
            <div className="bl_select-player">
                {entry_player_buttons}
            </div>
            <div className="ly_toolbox--container">
                <div>
                    <button type="button" onClick={() => {handleClickNewGame()}}>
                        New Game
                    </button>
                </div>
                <div>
                    <select onChange={(event) => {setAreaImg(area_map[event.target.value])}}>
                        <option value="skeld" >SKELD</option>
                        <option value="miraHQ" >MIRA HQ</option>
                        <option value="polus" >POLUS</option>
                        <option value="airship">AIRSHIP</option>
                    </select>

                    <button type="button" onClick={handleOpen}>
                        Open Map
                    </button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="modal-content">
                        <img src={`./img/${areaImg}`}
                        width={window.innerWidth}

                        alt="alt_test"/>
                    </div>
                </Modal>
            </div>

            <div className="bl_main">
                <div className="test-main">
                    <div className="brandnew">
                        {brandnew}
                    </div>
                    <SideNav crew={entryCrew} crewStatuses={crewStatuses} />
                </div>
            </div>
        </div>
    );
}
