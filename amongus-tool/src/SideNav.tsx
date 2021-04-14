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
						<i className="far fa-meh aaaa_test"></i><span className="aaaa_test">{" " + life_count}</span>
					</div>
					<div className="crew-status-button">
						<i className="fas fa-phone aaaa_test"></i><span className="aaaa_test">{" " +button_count}</span>
					</div>
					
				</a>
			{
				props.crew.map((crew:string, index:number) =>{
					let suspicious_degree = props.crewStatuses[crew].term1 === "black" ? 1 : 0;
					suspicious_degree += props.crewStatuses[crew].term2 === "black" ? 1 : 0
					suspicious_degree += props.crewStatuses[crew].term3 === "black" ? 1 : 0
					suspicious_degree += props.crewStatuses[crew].term4 === "black" ? 1 : 0
					suspicious_degree += props.crewStatuses[crew].term5 === "black" ? 1 : 0
					return (
						<a href={"#"+crew} className={crew+"-link"} key={index}>
							<div>
								<span>{props.crewStatuses[crew].name ? props.crewStatuses[crew].name : crew}</span>
							</div>
							<div className="icons-row">
								<span>
									{ props.crewStatuses[crew].life ?  <i className="fas fa-skull-crossbones"></i>　: suspicious_degree > 1 ? <i className="far fa-grin-tongue-wink"></i> : <i className="far fa-meh"></i> }
								</span>
								<span>
									{ props.crewStatuses[crew].button ? <i className="fas fa-phone-slash"></i>　: <i className="fas fa-phone"></i>}
								</span>
							</div>
							
						</a>
					);
				})
			}
			</div>
		</div>
	);
}