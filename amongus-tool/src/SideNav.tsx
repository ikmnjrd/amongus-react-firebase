import './index.css';

export default function SideNav(props:any) {
	console.log(props)

	return (
		<div className="ly_side-nav_container">
			<div className="ly_side-nav_items">
			{
				props.crew.map((crew:string, index:number) =>{
					return <a href={"#"+crew} key={index}>{crew}</a>
				})
			}
			</div>
		</div>
	);
}