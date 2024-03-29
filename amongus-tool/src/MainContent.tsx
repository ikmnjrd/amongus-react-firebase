import React, { useState } from 'react';
import './index.css';
import SideNav from './SideNav';
import TermsList from './TermsList';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface StringKeyObject {
    [key: string]: any;
}

export default function MainContent() {
    /* -----------------------------------  */
    /* -----------  変数宣言  -------------  */
    /* -----------------------------------  */
    const [open, setOpen] = useState(false);
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
    const [areaName, setAreaName] =useState<string>("skeld")
    const area_map:StringKeyObject  = {
                        skeld: `skeld.jpg`,
                        miraHQ: `mira-hq.png`,
                        polus: `polus.jpg`,
                        airship: `airship.png`,
                    };

    const terms_num = 5;

    console.log(crewStatuses)

    /* -----------------------------------  */
    /* -----------  関数宣言  -------------  */
    /* -----------------------------------  */

    const selected_players = (color: string) :void => {
        if (!entryCrew.includes(color)){
            setEntryCrew((entryCrew) => entryCrew.concat(color));
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

    const handleChangeAreaImg = (val: string):void => {
        const area_image_pic = area_map[val];
        setAreaName(val);
        setAreaImg(area_image_pic);
    }

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
                    <Button variant="contained" onClick={handleClickNewGame}>New Game</Button>
                </div>
                <div>
                    <FormControl id="area-select-box">
                        <InputLabel id="field-select-label">field</InputLabel>
                        <Select
                            onChange={(event:any): void => {handleChangeAreaImg(event.target.value as string)}}
                            value={areaName}
                            labelId="field-select-label"
                            label="field"
                        >
                            <MenuItem value="skeld">SKELD</MenuItem>
                            <MenuItem value={`miraHQ`}>MIRA HQ</MenuItem>
                            <MenuItem value={`polus`}>POLUS</MenuItem>
                            <MenuItem value={`airship`}>AIRSHIP</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleOpen}>Open Map</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="modal-content">
                        <img src={`./img/${areaImg}`}
                            width={window.innerWidth < window.innerHeight ? window.innerWidth : ""}
                            height={window.innerWidth > window.innerHeight ? window.innerHeight / 2 : ""}
                            alt="alt_test"
                        />
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
