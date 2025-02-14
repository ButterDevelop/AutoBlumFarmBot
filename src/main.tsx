import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import "./index.css";
import {AuthProvider} from "./components/common/providers/AuthProvider";
import {AccountsProvider} from "./components/common/providers/AccountsProvider";
import {UserProvider} from "./components/common/providers/UserProvider";
import {GeoProvider} from "./components/common/providers/GeoProvider";
import {ReferralsProvider} from "./components/common/providers/ReferralsProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Router>
        <AuthProvider>
            <AccountsProvider>
                <ReferralsProvider>
                    <UserProvider>
                        <GeoProvider>
                            <App />
                        </GeoProvider>
                    </UserProvider>
                </ReferralsProvider>
            </AccountsProvider>
        </AuthProvider>
    </Router>
);
