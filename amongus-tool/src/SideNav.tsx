import './index.css';

export default function SideNav(props:any) {
	console.log(props)

	let life_count = 0;
	let button_count = 0;
	
	props.crew.forEach((crew:any) =>{
		if(props.crewStatuses[crew].life === false){
			life_count += 1
			button_count += props.crewStatuses[crew].button === false ? 1 : 0
		}
	})

	return (
		<div className="ly_side-nav_container">
			<div className="ly_side-nav_items">
				<a href="#header" className="crew-status-link">
					<div className="crew-status-life">
						<i className="far fa-meh"></i> | {life_count}
					</div>
					<div className="crew-status-button">
						<i className="fas fa-phone"></i> | {button_count}
					</div>
					
				</a>
			{
				props.crew.map((crew:string, index:number) =>{
					return (
						<a href={"#"+crew} className={crew+"-link"} key={index}>
							<div>
								{ props.crewStatuses[crew].life ? <i className="fas fa-skull-crossbones"></i>　: <i className="far fa-meh"></i>}
								{" | "}
								{ props.crewStatuses[crew].button ? <i className="fas fa-phone-slash"></i>　: <i className="fas fa-phone"></i>}
							</div>
							<span>{props.crewStatuses[crew].name ? props.crewStatuses[crew].name : crew}</span>
							
						</a>
					);
				})
			}
			</div>
		</div>
	);
}