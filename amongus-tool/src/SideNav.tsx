import './index.css';

export default function SideNav(props:any) {
	console.log(props)
	console.log(props.crewStatuses["black"].name)
	return (
		<div className="ly_side-nav_container">
			<div className="ly_side-nav_items">
			{
				props.crew.map((crew:string, index:number) =>{
					return (
						<a href={"#"+crew} className={crew+"-link"} key={index}>
							<div>
								{ props.crewStatuses[crew].life ? <i className="fas fa-skull-crossbones"></i>　: <i className="far fa-meh"></i>}
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