import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './index.css';
import SideNav from './SideNav';
import TermsList from './TermsList';



/* -----------------------------------  */
/* ----------グローバル変数-------------  */
/* -----------------------------------  */
const CustomSlider = withStyles({
    rail: {
        backgroundImage: "linear-gradient(to left, #000, #fff)"
    },
    track: {
        backgroundImage: "linear-gradient(to left , #999, #fff)"
    },
    thumb: {
        backgroundColor: '#fff',
        border: '2px solid #999',
        '&:focus, &:hover, &$active': {
            boxShadow: '0px 0px 0px 10px rgb(0 0 0 / 10%)'
        },
    },
})(Slider);

type Dict = { [key: string]: number };
type Emer = { [key: string]: boolean };



export default function MainContent() {
    /* -----------------------------------  */
    /* -----------  変数宣言  -------------  */
    /* -----------------------------------  */
    const [term, setTerm] = useState(1);
    const [entryCrew, setEntryCrew] = useState(["black", "blue", "brown", "cyan", "green"]);

    const [crewSlider, setCrewSlider] = useState<Dict>({black : 50, blue : 50, brown : 50, cyan : 50, green : 50, lime : 50,
                                            orange : 50, pink : 50, purple : 50, red : 50, white : 50, yellow : 50 });
    const [crewEmergency, setCrewEmergency] = useState<Emer>({black : false, blue : false, brown : false, cyan : false, green : false, lime : false,
        orange : false, pink : false, purple : false, red : false, white : false, yellow : false });
    const [crewLife, setCrewLife] = useState<Emer>({black : false, blue : false, brown : false, cyan : false, green : false, lime : false,
        orange : false, pink : false, purple : false, red : false, white : false, yellow : false });

    const [crewStatuses, setCrewStatuses] = useState<any>({
        black:  {entry: true, button: false, life: false, name: ""},
        blue:   {entry: true, button: false, life: false, name: ""},
        brown:  {entry: true, button: false, life: false, name: ""},
        cyan:   {entry: true, button: false, life: false, name: ""},
        green:  {entry: true, button: false, life: false, name: ""},
        lime:   {entry: true, button: false, life: false, name: ""},
        orange: {entry: true, button: false, life: false, name: ""},
        pink:   {entry: true, button: false, life: false, name: ""},
        purple: {entry: true, button: false, life: false, name: ""},
        red:    {entry: true, button: false, life: false, name: ""},
        white:  {entry: true, button: false, life: false, name: ""},
        yellow: {entry: true, button: false, life: false, name: ""},
    });


    const players = ["black", "blue", "brown", "cyan", "green", "lime", "orange", "pink", "purple", "red", "white", "yellow"];

    const area_map = {  skeld: ["カフェテリア", "ウェポン", "ナビゲーション", "酸素ルーム", "シールド", "通信室", "ストレージ",
                                "アドミン", "エレクトリカル", "ロワーエンジン", "セキュリティ", "リアクター", "アッパーエンジン",  "メッドベイ" ]
                        ,miraHQ: ["ランチャーパッド", "医療室", "通信", "ロッカールーム", "除染通路", "リアクター", "研究室", 
                                "アドミン", "オフィス", "音質", "カフェテリア", "バルコニー", "ストレージ"]
                    };

    const terms_num = 5;

    
    React.useEffect(() => {
        // generateTermCol();
        // ScrollToBottom();
    }, [term]) 

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
        setTerm(0);
        
        for(let i=0; i < players.length; i++){
            setCrewSlider(prev => ({
                ...prev,
                [players[i]] : 50
            }));
            setCrewEmergency(prev => ({
                ...prev,
                [players[i]]: false
            }));
            setCrewLife((prev) => ({
                ...prev,
                [players[i]] : false
            }));
        }
    }
    // anyで諦めた
    // https://qiita.com/Takepepe/items/f1ba99a7ca7e66290f24
    const handleChangeCrewSlider = (event :any, crew :string ):void => {
        setCrewSlider(prev => ({
            ...prev,
            [crew]: event.target.value
        }));
    }
    const handleChangeCrewEmergency = (event :any, crew :string ):void => {
        setCrewEmergency(prev => ({
            ...prev,
            [crew]: !crewEmergency[crew]
        }));
    }

    const handleChangeCrewValue = (crew:string, item:string, value:any) => {
        setCrewStatuses((prev:any) => ({
            ...prev,
            [crew]: Object.assign({
                    entry: crewStatuses[crew].entry, 
                    button: crewStatuses[crew].button, 
                    life: crewStatuses[crew].life,
                    name: crewStatuses[crew].name
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

    console.log(crewStatuses);

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
                        height="50"
                        alt="alt_test"
                    />
                    <div>
                        <input
                            type="text"
                            onChange={(e) => {
                                handleChangeCrewValue(crew_color, "name", e.target.value);
                            }}
                        />
                    </div>
                    <label>
                        <input
                            type="checkbox"
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

                <TermsList crewColor={crew_color} num={index} terms_num={terms_num} />
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

            <div className="bl_main">
                <div className="test-main">
                    <div className="brandnew">
                        {brandnew}
                    </div>
                    <SideNav crew={entryCrew} crewStatuses={crewStatuses}/>
                </div>
            </div>
        </div>
    );
}
