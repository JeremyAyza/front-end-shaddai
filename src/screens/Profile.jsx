import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loadingAuth);

  return (
		<div className="container">
			{isLoading || !user ? (
				<Loader />
			) : (
				<div className="profile-container my-4">
					<div className="profile-header mb-4">
						<h2>Mi perfil</h2>
					</div>
					<div className="profile-body row">
						<div className="col-md-auto">
								<img className="profile-img m-w-250 rounded-circle img-thumbnail" src="https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg" alt="Profile" />
						</div>
						<div className="col">
							<table className="table">
								<thead>
									<tr>
										<th colSpan={2}>
											<h4>Datos personales</h4>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<h5>Nombre:</h5>
										</td>
										<td>
											<div>{user.name}</div>
										</td>
									</tr>
									<tr>
										<td>
											<h5>Apellido:</h5>
										</td>
										<td>
											<div>{user.lastname}</div>
										</td>
									</tr>
									<tr>
										<td>
											<h5>Email:</h5>
										</td>
										<td>
											<div>{user.email}</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>

  );
};

export default Profile;
