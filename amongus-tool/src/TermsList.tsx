import './index.css';

export default function TermsList(props:any) {
  const color = props.crewColor;
  const terms_num = props.terms_num
	console.log(props)

  const list = [];

  for(let i=1; i< terms_num+1; i++){
    const term = "term" + i;
    list.push(
      <ul key={i} className={"term-"+i}>
        <li>
            <input 
              type="radio" 
              id={color+"_"+i+"_a"} 
              name={color+i} 
              value="white" 
              checked={props.crewStatuses[color][term] === 'white'}
              onChange={() => props.handleChangeCrewValue(color, term, "white")}
            />
            <label htmlFor={color+"_"+i+"_a"}>
                <span className="check"></span>
            </label>
            
        </li>
        
        <li>
            <input 
              type="radio" 
              id={color+"_"+i+"_b"} 
              name={color+i} 
              value="gray" 
              checked={props.crewStatuses[color][term] === 'gray'}
              onChange={() => props.handleChangeCrewValue(color, term, "gray")}
            />
            <label htmlFor={color+"_"+i+"_b"}>
                <span className="check"></span>
            </label>
            
        </li>
        
        <li>
            <input 
              type="radio" 
              id={color+"_"+i+"_c"} 
              name={color+i} 
              value="black" 
              checked={props.crewStatuses[color][term] === 'black'}
              onChange={() => props.handleChangeCrewValue(color, term, "black")}
            />
            <label htmlFor={color+"_"+i+"_c"}>
                <span className="check"></span>
            </label>
            
        </li>
      </ul>
    )
  }

	return (
    <div>
      {list.map((el, index) => {return <div key={index}>{el}</div>})}
    </div>
	);
}