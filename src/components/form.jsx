import React from "react";
import { validation } from "../config/validator";
import "../styles/Form.css"
import logo from "../img/logo.png"

export default function Form(props) {
	const [userData, setUserData] = React.useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = React.useState({
		username: "",
		password: "",
	});

	function handleInputChange(e) {
		setErrors(
			validation({
				...userData,
				[e.target.name]: e.target.value,
			})
		);

		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.login(userData);
	}

	return (
		<div className="inicioS">
			<form onSubmit={handleSubmit}>
				<img src={logo} alt="logo" />
				<h2>Inicio de sesión</h2>
				<label htmlFor="username">Username:</label>
				<input
					placeholder="Escribe tu usuario..."
					type="text"
					name="username"
					value={userData.username}
					onChange={handleInputChange}
				/>
				{errors.username && <p>{errors.username}</p>}

				<label htmlFor="password">Password:</label>
				<input
				placeholder="Escribe tu contraseña..."
					type="password"
					name="password"
					value={userData.password}
					onChange={handleInputChange}
				/>
				<p>{errors.password && errors.password}</p>

				<button type="submit">Ingresar</button>
			</form>
		</div>
	);
}