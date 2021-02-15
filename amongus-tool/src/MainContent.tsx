import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

export default function MainContent() {
    const [term, setTerm] = useState(1);
    const [entryCrew, setEntryCrew] = useState(["black", "blue", "brown", "cyan"]);
    const [deadCrew, setDeadCrew] = useState<string[]>([]);

    const players = ["black", "blue", "brown", "cyan", "green", "lime", "orange", "pink", "purple", "red", "white", "yellow"];

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
        return <img key={index} src={`./img/${crew_color}.png`} width="50" onClick={() => selected_players(crew_color)} />
    });

    const term_headline = [];

    for(let i =1; i<= term; i++){
        term_headline.push(
            <div className="bl_term" key={i}>
                {`Term${i}`}
            </div>
        )
    }


    const entry_crew_main = entryCrew.map((crew, index) =>{
        const terms = [];

        for(let i =1; i<= term; i++){
            if (!deadCrew.includes(crew)){
                terms.push(
                    <div className="bl_term" 
                        key={index * 1000 + i} 
                        onClick={() => {
                            if(i === term){
                                setTerm(term+1);
                                ScrollToBottom();
                            }
                        }}>
                        <TextField
                            id="outlined-textarea"
                            label="free space"
                            placeholder=""
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={deadCrew.includes(crew) ? true : false}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onClick={() => {handleChangeDead(crew)}}
                                />
                            }
                            label="Dead"
                        />
                    </div>
                );
            } else {
                terms.push(<div className="bl_term" key={index * 1000 + i} />)
            }
        }

        return (
            <div className="bl_crew--row" key={index}>
                <div className="bl_crew--headline">
                    <img src={`./img/${deadCrew.includes(crew) ? crew+"-dead" : crew}.png`} width="100" height="130" />
                    <Slider />
                </div>
                {/* bl_crew--headline */}
                {terms}
            </div>
        );
    });

    return (
        <div className="ly_content">
            <div className="bl_select-player">
                {entry_player_buttons}
            </div>

            <button onClick={() => {setTerm(term+1)}}>new term</button>
            <button onClick={() => {setTerm(1); setDeadCrew([]); }}>new game</button>

            <div className="bl_main">
                <div className="bl_crew" >
                    <div className="bl_crew--headline">
                    </div>
                {term_headline}
            </div>
        
            {entry_crew_main}
            </div>
        </div>
    );
}
