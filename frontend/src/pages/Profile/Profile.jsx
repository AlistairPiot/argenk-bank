import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../../components/Account.jsx";
import User from "../../components/User.jsx";
import AccountCardData from "../../data/AccountCardData.json";
import { userProfile } from "../../redux/actions/userActions";

/* User profile page */
function UserProfile() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    /* Asynchronous function that retrieves user data and updates it with useEffect */
    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    const response = await fetch(
                        "http://localhost:3001/api/v1/user/profile",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName,
                        };
                        /* Return user data in redux state */
                        dispatch(userProfile(userData));
                    } else {
                        console.log("error while retrieving profile");
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            userData();
        }
    }, [dispatch, token]);

    return (
        <div className="profile-page">
            <main className="bg-dark">
                {/* Return user componant */}
                <User />
                {/* Return items from json file with map */}
                {AccountCardData.map((data) => (
                    /* Return account component */
                    <Account
                        key={data.id}
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
        </div>
    );
}

export default UserProfile;
