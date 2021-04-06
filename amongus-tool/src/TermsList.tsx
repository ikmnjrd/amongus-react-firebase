import './index.css';

export default function TermsList(props:any) {
  const color = props.crewColor;
  const terms_num = props.terms_num
	console.log(props)

  const list = [];

  for(let i=0; i< terms_num; i++){
    list.push(
      <ul key={i} className={"term-"+i}>
        <li>
            <input type="radio" id={color+"_"+i+"_a"} name={color+i} value="white"/>
            <label htmlFor={color+"_"+i+"_a"}>
                <span className="check"></span>
            </label>
            
        </li>
        
        <li>
            <input type="radio" id={color+"_"+i+"_b"} name={color+i} value="gray" />
            <label htmlFor={color+"_"+i+"_b"}>
                <span className="check"></span>
            </label>
            
        </li>
        
        <li>
            <input type="radio" id={color+"_"+i+"_c"} name={color+i} value="black" />
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