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


export default function MainContent() {
    const [term, setTerm] = useState(3);
    const [terms, setTerms] = useState<JSX.Element[]>([]);
    const [entryCrew, setEntryCrew] = useState(["black", "blue", "brown", "cyan", "green"]);
    const [deadCrew, setDeadCrew] = useState<string[]>([]);

    const players = ["black", "blue", "brown", "cyan", "green", "lime", "orange", "pink", "purple", "red", "white", "yellow"];

    const area_map = {  skeld: ["カフェテリア", "ウェポン", "ナビゲーション", "酸素ルーム", "シールド", "通信室", "ストレージ",
                                "アドミン", "エレクトリカル", "ロワーエンジン", "セキュリティ", "リアクター", "アッパーエンジン",  "メッドベイ" ]
                        ,miraHQ: ["ランチャーパッド", "医療室", "通信", "ロッカールーム", "除染通路", "リアクター", "研究室", 
                                "アドミン", "オフィス", "音質", "カフェテリア", "バルコニー", "ストレージ"]
                    };

    React.useEffect(() => {
        generateTermCol();
        ScrollToBottom();
    }, [term]) 

    const selected_players = (color: string) :void => {
        if (!entryCrew.includes(color)){
            setEntryCrew((entryCrew)　=> entryCrew.concat(color));
        } else {
            const new_entryCrew = entryCrew.filter(n => n !== color);
            setEntryCrew(new_entryCrew);
        }
    }

    const handleChangeDead = (color: string):void => {
        if (!deadCrew.includes(color)){
            setDeadCrew((deadCrew)　=> deadCrew.concat(color));
        } else {
            const new_deadCrew = deadCrew.filter(n => n !== color);
            setDeadCrew(new_deadCrew);
        }
    }

    const ScrollToBottom = ():void => {
        window.setTimeout(() => {
            const element = document.documentElement;
            const bottom = element.scrollHeight - element.clientHeight;
            window.scrollTo({top: bottom, behavior: "smooth"});
        }, 400);
        
    }

    const entry_player_buttons = players.map((crew_color, index) => {
        return (
            <img 
                key={index} 
                src={`./img/${crew_color}.png`} 
                width="50" 
                className={ !entryCrew.includes(crew_color) ? "img-mask" : "" }
                onClick={() => selected_players(crew_color)} 
            />);
    });

    const entry_crew_main = entryCrew.map((crew, index) =>{
        return (
            <div className="bl_crew--row" key={index}>
                <div className="bl_crew--headline">
                    <img src={`./img/${deadCrew.includes(crew) ? crew+"-dead" : crew}.png`} width="100" height="130" />
                    <CustomSlider
                        // value={value}
                        // onChange={handleChange}
                        aria-labelledby="continuous-slider"
                    />
                    <Input placeholder="name" inputProps={{ 'aria-label': 'name' }} />
                </div>
                {/* bl_crew--headline */}
            </div>
        );
    });    


    const generateTermCol = () => {
        const term_row: JSX.Element[] = [];

        for(let row=0; row< term ; row++){
            const el = generateTermRows(row);
            term_row.push(el);
        }

        setTerms(term_row);
    }

    let select_box = area_map.skeld.map((room, index) =>{
        return <option value={index}>{room}</option>
    });
    select_box.unshift(<option value="0"></option>);


    const generateTermRows = (col:number) => {        
        const term_row: JSX.Element[] = [];
        const static_term  = term;

        term_row.push(
            <div className="bl_term_cell_wrapper">
                <div className="bl_term_col_head">
                    {`Term${col + 1}`}
                </div>
            </div>
        );

        for(let row=0; row < entryCrew.length; row++){
            term_row.push(
                <div className="bl_term_cell_wrapper">
                    <div className="bl_term_cell" key={row} >
                        <TextField
                            id="outlined-textarea"
                            label="free space"
                            placeholder=""
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <select name="area">
                            {select_box}
                        </select>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onClick={() => {handleChangeDead(entryCrew[row])}}
                                />}
                            label="Dead"
                        />
                    </div>
                </div>
            );
        }

        return (
            col + 1 == term ? 
                <div className={"bl_term_row"} onClick={() => {setTerm(term + 1)}}>
                    {term_row}
                </div> : 
                <div className={"bl_term_row"}>
                    {term_row}
                </div> 
        );
    }

    // main renderer
    return (
        <div className="ly_content">
            <div className="bl_select-player">
                {entry_player_buttons}
            </div>

            <div className="bl_main">
                <div className="bl_main_head">
                    <div className="bl_main_head_button">
                        <button style={{marginTop: 10, marginBottom: 10}} onClick={() => {setTerm(term+1)}}>new term</button>
                        <button onClick={() => {setTerm(1); setDeadCrew([]); }}>new game</button>
                    </div>
                    {entry_crew_main}
                </div>
                <div className="bl_terms_table">
                    { terms }
                </div>
            </div>
        </div>
    );
}
