import React, {useState} from 'react';
import './index.css';
import SideNav from './SideNav';
import TermsList from './TermsList';


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

    const area_map = {  skeld: ["カフェテリア", "ウェポン", "ナビゲーション", "酸素ルーム", "シールド", "通信室", "ストレージ",
                                "アドミン", "エレクトリカル", "ロワーエンジン", "セキュリティ", "リアクター", "アッパーエンジン",  "メッドベイ" ]
                        ,miraHQ: ["ランチャーパッド", "医療室", "通信", "ロッカールーム", "除染通路", "リアクター", "研究室", 
                                "アドミン", "オフィス", "音質", "カフェテリア", "バルコニー", "ストレージ"]
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


    /* -----------------------------------  */
    /* ----------- NEW Field -------------  */
    /* -----------------------------------  */

    const brandnew = entryCrew.map((crew_color, index) => {
        return (
            <div key={index} id={crew_color}>
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
            <div className="toolbox">
                <button onClick={() => {handleClickNewGame()}}>New Game</button>
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
