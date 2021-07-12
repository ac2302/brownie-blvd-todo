import React from "react";
import "../styles/Layout.css";

import { FaHome, FaPen, FaPlus } from "react-icons/fa";

function Layout({ children }) {
	return (
		<>
			<nav>
				<ul>
					<li className="home">
						<a href="/">
							<FaHome className="icon" />
							Home
						</a>
					</li>
					<li className="new">
						<a href="/new">
							<FaPlus className="icon" />
							<FaPen className="icon" />
						</a>
					</li>
				</ul>
			</nav>
			<div className="nav-space" />

			<main>{children}</main>

			<footer>Brownie Boulevard</footer>
		</>
	);
}

export default Layout;
