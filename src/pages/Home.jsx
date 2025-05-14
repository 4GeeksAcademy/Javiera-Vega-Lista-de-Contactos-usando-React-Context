import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Home = () => {

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2 mb-3">
						<Link
							className="btn btn-success mt-1"
							type="button"
							to="/add-new-contact">Add new contact</Link>
					</div>
				</div>
			</div>

			<ContactCard />
		</>
	);
}; 